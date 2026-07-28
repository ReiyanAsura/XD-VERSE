package io.xdverse.leaderboard;

import com.google.gson.*;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.scheduler.BukkitTask;

import java.io.File;
import java.net.URI;
import java.net.http.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Level;

public class LeaderboardPlugin extends JavaPlugin {

    private BukkitTask updateTask;
    private HttpClient httpClient;

    @Override
    public void onEnable() {
        saveDefaultConfig();
        httpClient = HttpClient.newHttpClient();

        long intervalMinutes = getConfig().getLong("update-interval-minutes", 30);
        long intervalTicks = intervalMinutes * 60L * 20L;

        // First update after 10 seconds, then repeat every X minutes
        updateTask = Bukkit.getScheduler().runTaskTimerAsynchronously(
            this, this::updateLeaderboard, 200L, intervalTicks
        );

        getLogger().info("╔═══════════════════════════════════════╗");
        getLogger().info("║   XD-VERSE Leaderboard Plugin Ready   ║");
        getLogger().info("╚═══════════════════════════════════════╝");
        getLogger().info("Updating every " + intervalMinutes + " min. Use /updateleaderboard to force update.");
    }

    @Override
    public void onDisable() {
        if (updateTask != null) updateTask.cancel();
        getLogger().info("XD-VERSE Leaderboard Plugin disabled.");
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!command.getName().equalsIgnoreCase("updateleaderboard")) return false;

        sender.sendMessage("§6[XD-VERSE] §aFetching stats and pushing to GitHub...");
        Bukkit.getScheduler().runTaskAsynchronously(this, () -> {
            boolean success = updateLeaderboard();
            if (success) {
                sender.sendMessage("§6[XD-VERSE] §a✅ Leaderboard updated successfully!");
            } else {
                sender.sendMessage("§6[XD-VERSE] §c❌ Update failed — check console for details.");
            }
        });
        return true;
    }

    // ─── Core update logic ────────────────────────────────────────────────────

    private boolean updateLeaderboard() {
        getLogger().info("Starting leaderboard update...");
        try {
            Map<String, String> uuidToName = readUsercache();
            List<PlayerStats> players = readAllStats(uuidToName);

            if (players.isEmpty()) {
                getLogger().warning("No player stats found — nothing to push.");
                return false;
            }

            String json = buildLeaderboardJson(players);
            pushToGitHub(json);
            return true;

        } catch (Exception e) {
            getLogger().log(Level.SEVERE, "Failed to update leaderboard", e);
            return false;
        }
    }

    // ─── Read usercache.json ──────────────────────────────────────────────────

    private Map<String, String> readUsercache() {
        Map<String, String> uuidToName = new HashMap<>();
        File usercacheFile = new File("usercache.json");

        if (!usercacheFile.exists()) {
            getLogger().warning("usercache.json not found at server root.");
            return uuidToName;
        }

        try {
            String content = new String(Files.readAllBytes(usercacheFile.toPath()), StandardCharsets.UTF_8);
            JsonArray array = JsonParser.parseString(content).getAsJsonArray();
            for (JsonElement el : array) {
                JsonObject obj = el.getAsJsonObject();
                if (obj.has("uuid") && obj.has("name")) {
                    uuidToName.put(obj.get("uuid").getAsString(), obj.get("name").getAsString());
                }
            }
            getLogger().info("Loaded " + uuidToName.size() + " players from usercache.");
        } catch (Exception e) {
            getLogger().warning("Could not read usercache.json: " + e.getMessage());
        }

        return uuidToName;
    }

    // ─── Read all player stats ────────────────────────────────────────────────

    private List<PlayerStats> readAllStats(Map<String, String> uuidToName) {
        List<PlayerStats> players = new ArrayList<>();
        List<String> excluded = getConfig().getStringList("excluded-players");

        File statsDir = findStatsDir();
        if (statsDir == null) {
            getLogger().severe("Could not find stats directory! Check 'world-name' in config.yml.");
            return players;
        }
        getLogger().info("Reading stats from: " + statsDir.getPath());

        File[] statFiles = statsDir.listFiles((d, name) -> name.endsWith(".json"));
        if (statFiles == null || statFiles.length == 0) {
            getLogger().warning("No stat files found in " + statsDir.getPath());
            return players;
        }

        for (File statFile : statFiles) {
            String uuid = statFile.getName().replace(".json", "");
            String name = uuidToName.getOrDefault(uuid, uuid.substring(0, Math.min(8, uuid.length())));

            // Skip excluded players
            boolean skip = excluded.stream().anyMatch(ex -> name.toLowerCase().contains(ex.toLowerCase()));
            if (skip) continue;

            try {
                String content = new String(Files.readAllBytes(statFile.toPath()), StandardCharsets.UTF_8);
                JsonObject root = JsonParser.parseString(content).getAsJsonObject();

                JsonObject custom = new JsonObject();
                if (root.has("stats") && root.getAsJsonObject("stats").has("minecraft:custom")) {
                    custom = root.getAsJsonObject("stats").getAsJsonObject("minecraft:custom");
                }

                int kills   = getInt(custom, "minecraft:player_kills");
                int deaths  = getInt(custom, "minecraft:deaths");
                long ticks  = getLong(custom, "minecraft:play_time");
                if (ticks == 0) ticks = getLong(custom, "minecraft:play_one_minute");
                double hours = Math.round((ticks / 72000.0) * 10.0) / 10.0;

                players.add(new PlayerStats(name, kills, deaths, hours));

            } catch (Exception e) {
                getLogger().warning("Skipping invalid stats file: " + statFile.getName());
            }
        }

        getLogger().info("Parsed stats for " + players.size() + " players.");
        return players;
    }

    private File findStatsDir() {
        // 1. Try configured world name
        String worldName = getConfig().getString("world-name", "world");
        File configured = new File(worldName + "/stats");
        if (configured.exists()) return configured;

        // 2. Auto-detect by scanning server root for any world/stats folder
        File serverRoot = new File(".");
        File[] dirs = serverRoot.listFiles(File::isDirectory);
        if (dirs != null) {
            for (File dir : dirs) {
                File stats = new File(dir, "stats");
                if (stats.exists() && stats.isDirectory()) {
                    getLogger().info("Auto-detected stats folder: " + stats.getPath());
                    return stats;
                }
            }
        }
        return null;
    }

    // ─── Build leaderboard JSON ───────────────────────────────────────────────

    private String buildLeaderboardJson(List<PlayerStats> allPlayers) {
        String time = new SimpleDateFormat("hh:mm a").format(new Date());

        List<PlayerStats> byKills    = new ArrayList<>(allPlayers);
        List<PlayerStats> byDeaths   = new ArrayList<>(allPlayers);
        List<PlayerStats> byPlaytime = new ArrayList<>(allPlayers);

        byKills.sort((a, b) -> b.kills - a.kills);
        byDeaths.sort((a, b) -> b.deaths - a.deaths);
        byPlaytime.sort((a, b) -> Double.compare(b.hours, a.hours));

        JsonObject output = new JsonObject();
        output.addProperty("updatedAt", time);
        output.add("kills",    buildKillsCategory(byKills));
        output.add("deaths",   buildDeathsCategory(byDeaths));
        output.add("playtime", buildPlaytimeCategory(byPlaytime));

        return new GsonBuilder().setPrettyPrinting().create().toJson(output);
    }

    private JsonArray buildKillsCategory(List<PlayerStats> sorted) {
        JsonArray arr = new JsonArray();
        for (int i = 0; i < Math.min(10, sorted.size()); i++) {
            PlayerStats p = sorted.get(i);
            arr.add(buildEntry(i, p.name, p.kills + " Kills", p.hours + " hrs played"));
        }
        return arr;
    }

    private JsonArray buildDeathsCategory(List<PlayerStats> sorted) {
        JsonArray arr = new JsonArray();
        for (int i = 0; i < Math.min(10, sorted.size()); i++) {
            PlayerStats p = sorted.get(i);
            arr.add(buildEntry(i, p.name, p.deaths + " Deaths", p.hours + " hrs played"));
        }
        return arr;
    }

    private JsonArray buildPlaytimeCategory(List<PlayerStats> sorted) {
        JsonArray arr = new JsonArray();
        for (int i = 0; i < Math.min(10, sorted.size()); i++) {
            PlayerStats p = sorted.get(i);
            arr.add(buildEntry(i, p.name, p.hours + " hrs", p.kills + " Kills"));
        }
        return arr;
    }

    private JsonObject buildEntry(int index, String name, String score, String subtitle) {
        String ribbonBg, cardBg;
        switch (index) {
            case 0  -> { ribbonBg = "from-amber-400 via-yellow-400 to-amber-500";
                         cardBg  = "bg-amber-50/40 border-amber-200/80 hover:border-amber-300 shadow-md hover:shadow-xl"; }
            case 1  -> { ribbonBg = "from-slate-400 via-slate-300 to-slate-400";
                         cardBg  = "bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md"; }
            case 2  -> { ribbonBg = "from-amber-700 via-amber-600 to-amber-700";
                         cardBg  = "bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md"; }
            default -> { ribbonBg = "from-stone-500 to-stone-600";
                         cardBg  = "bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md"; }
        }

        JsonObject obj = new JsonObject();
        obj.addProperty("rank",       (index + 1) + ".");
        obj.addProperty("name",       name);
        obj.addProperty("score",      score);
        obj.addProperty("subtitle",   subtitle);
        obj.addProperty("ribbonBg",   ribbonBg);
        obj.addProperty("ribbonText", "text-white");
        obj.addProperty("cardBg",     cardBg);
        return obj;
    }

    // ─── Push to GitHub API ───────────────────────────────────────────────────

    private void pushToGitHub(String jsonContent) throws Exception {
        String token    = getConfig().getString("github-token", "");
        String owner    = getConfig().getString("github-owner", "ReiyanAsura");
        String repo     = getConfig().getString("github-repo", "XD-VERSE");
        String filePath = getConfig().getString("github-file-path", "leaderboard.json");
        String branch   = getConfig().getString("github-branch", "main");

        if (token.isEmpty() || token.equals("YOUR_GITHUB_TOKEN_HERE")) {
            getLogger().severe("╔══════════════════════════════════════════════════════╗");
            getLogger().severe("║  GitHub token not set!                               ║");
            getLogger().severe("║  Edit: plugins/XDVerseLeaderboard/config.yml         ║");
            getLogger().severe("║  Set: github-token to your Personal Access Token     ║");
            getLogger().severe("╚══════════════════════════════════════════════════════╝");
            return;
        }

        String apiUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + filePath;

        // Step 1: GET current file SHA (needed to update existing file)
        HttpRequest getReq = HttpRequest.newBuilder()
            .uri(URI.create(apiUrl + "?ref=" + branch))
            .header("Authorization", "Bearer " + token)
            .header("Accept", "application/vnd.github+json")
            .header("X-GitHub-Api-Version", "2022-11-28")
            .GET()
            .build();

        HttpResponse<String> getResp = httpClient.send(getReq, HttpResponse.BodyHandlers.ofString());
        String sha = "";
        if (getResp.statusCode() == 200) {
            JsonObject fileInfo = JsonParser.parseString(getResp.body()).getAsJsonObject();
            sha = fileInfo.get("sha").getAsString();
        }

        // Step 2: Build PUT request body
        String encoded = Base64.getEncoder().encodeToString(jsonContent.getBytes(StandardCharsets.UTF_8));
        String message = "🏆 Auto-update leaderboard [" +
            new SimpleDateFormat("yyyy-MM-dd HH:mm 'UTC'").format(new Date()) + "]";

        JsonObject body = new JsonObject();
        body.addProperty("message", message);
        body.addProperty("content", encoded);
        body.addProperty("branch",  branch);
        if (!sha.isEmpty()) body.addProperty("sha", sha);

        // Step 3: PUT the updated file
        HttpRequest putReq = HttpRequest.newBuilder()
            .uri(URI.create(apiUrl))
            .header("Authorization", "Bearer " + token)
            .header("Accept", "application/vnd.github+json")
            .header("Content-Type", "application/json")
            .header("X-GitHub-Api-Version", "2022-11-28")
            .PUT(HttpRequest.BodyPublishers.ofString(body.toString()))
            .build();

        HttpResponse<String> putResp = httpClient.send(putReq, HttpResponse.BodyHandlers.ofString());

        if (putResp.statusCode() == 200 || putResp.statusCode() == 201) {
            getLogger().info("✅ Leaderboard pushed to GitHub! GitHub Actions will rebuild the site now.");
        } else {
            getLogger().severe("❌ GitHub API returned " + putResp.statusCode());
            getLogger().severe("Response: " + putResp.body().substring(0, Math.min(300, putResp.body().length())));
        }
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private int getInt(JsonObject obj, String key) {
        return obj.has(key) ? obj.get(key).getAsInt() : 0;
    }

    private long getLong(JsonObject obj, String key) {
        return obj.has(key) ? obj.get(key).getAsLong() : 0L;
    }

    // ─── Data class ───────────────────────────────────────────────────────────

    static class PlayerStats {
        final String name;
        final int kills, deaths;
        final double hours;

        PlayerStats(String name, int kills, int deaths, double hours) {
            this.name   = name;
            this.kills  = kills;
            this.deaths = deaths;
            this.hours  = hours;
        }
    }
}
