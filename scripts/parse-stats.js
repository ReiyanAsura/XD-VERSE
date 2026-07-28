// scripts/parse-stats.js
// Automatically parses Minecraft world/stats/*.json and usercache.json into public/leaderboard.json
const fs = require('fs')
const path = require('path')

function parseMinecraftStats(serverPath) {
  const usercachePath = path.join(serverPath, 'usercache.json')

  let uuidToName = {}
  if (fs.existsSync(usercachePath)) {
    try {
      const usercache = JSON.parse(fs.readFileSync(usercachePath, 'utf8'))
      usercache.forEach((entry) => {
        if (entry.uuid && entry.name) {
          uuidToName[entry.uuid] = entry.name
        }
      })
    } catch (e) {
      console.warn('Warning: Could not parse usercache.json')
    }
  }

  let statsDir = path.join(serverPath, 'stats')
  if (!fs.existsSync(statsDir)) {
    statsDir = path.join(serverPath, 'world', 'stats')
  }

  if (!fs.existsSync(statsDir)) {
    console.error(`Error: stats directory not found at ${serverPath}`)
    return
  }

  const files = fs.readdirSync(statsDir).filter((f) => f.endsWith('.json'))
  const playersData = []

  files.forEach((file) => {
    const rawUuid = file.replace('.json', '')
    // Format formatted UUID with dashes for matching usercache
    const name = uuidToName[rawUuid] || rawUuid.substring(0, 8)
    if (name.toLowerCase().includes('pandaplayz')) return

    try {
      const content = JSON.parse(fs.readFileSync(path.join(statsDir, file), 'utf8'))
      const custom = content.stats ? content.stats['minecraft:custom'] || {} : {}
      const kills = custom['minecraft:player_kills'] || 0
      const deaths = custom['minecraft:deaths'] || 0
      const ticks = custom['minecraft:play_time'] || custom['minecraft:play_one_minute'] || 0
      const hours = Math.round((ticks / 72000) * 10) / 10 // 72,000 ticks = 1 hour

      playersData.push({ name, kills, deaths, hours })
    } catch (e) {
      console.warn(`Skipping invalid stats file: ${file}`)
    }
  })

  // Sort & Top 10 Kills
  const killsList = [...playersData]
    .sort((a, b) => b.kills - a.kills)
    .slice(0, 10)
    .map((p, i) => ({
      rank: `${i + 1}.`,
      name: p.name,
      score: `${p.kills.toLocaleString()} Kills`,
      subtitle: `${p.hours} hrs played`,
      ribbonBg: i === 0 ? 'from-amber-400 via-yellow-400 to-amber-500' : i === 1 ? 'from-slate-400 via-slate-300 to-slate-400' : i === 2 ? 'from-amber-700 via-amber-600 to-amber-700' : 'from-stone-500 to-stone-600',
      ribbonText: 'text-white',
      cardBg: i === 0 ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300 shadow-md hover:shadow-xl' : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md'
    }))

  // Sort & Top 10 Deaths
  const deathsList = [...playersData]
    .sort((a, b) => b.deaths - a.deaths)
    .slice(0, 10)
    .map((p, i) => ({
      rank: `${i + 1}.`,
      name: p.name,
      score: `${p.deaths.toLocaleString()} Deaths`,
      subtitle: `${p.hours} hrs played`,
      ribbonBg: i === 0 ? 'from-amber-400 via-yellow-400 to-amber-500' : i === 1 ? 'from-slate-400 via-slate-300 to-slate-400' : i === 2 ? 'from-amber-700 via-amber-600 to-amber-700' : 'from-stone-500 to-stone-600',
      ribbonText: 'text-white',
      cardBg: i === 0 ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300 shadow-md hover:shadow-xl' : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md'
    }))

  // Sort & Top 10 PlayTime
  const playtimeList = [...playersData]
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 10)
    .map((p, i) => ({
      rank: `${i + 1}.`,
      name: p.name,
      score: `${p.hours} hrs`,
      subtitle: `${p.kills} Kills`,
      ribbonBg: i === 0 ? 'from-amber-400 via-yellow-400 to-amber-500' : i === 1 ? 'from-slate-400 via-slate-300 to-slate-400' : i === 2 ? 'from-amber-700 via-amber-600 to-amber-700' : 'from-stone-500 to-stone-600',
      ribbonText: 'text-white',
      cardBg: i === 0 ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300 shadow-md hover:shadow-xl' : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md'
    }))

  const output = {
    updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    kills: killsList,
    deaths: deathsList,
    playtime: playtimeList
  }

  const rootOutputPath = path.join(__dirname, '..', 'leaderboard.json')
  const publicOutputPath = path.join(__dirname, '..', 'public', 'leaderboard.json')

  const json = JSON.stringify(output, null, 2)
  fs.writeFileSync(rootOutputPath, json)
  console.log(`✅ Leaderboard written to: ${rootOutputPath}`)

  // Also write to public/ if it exists
  const publicDir = path.join(__dirname, '..', 'public')
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(publicOutputPath, json)
    console.log(`✅ Leaderboard also written to: ${publicOutputPath}`)
  }
}

// Take server folder path from command line arg
const targetServerPath = process.argv[2] || './mc-server'
parseMinecraftStats(targetServerPath)
