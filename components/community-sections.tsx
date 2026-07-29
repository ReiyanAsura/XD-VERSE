'use client'

import { useState, useEffect } from 'react'
import initialLeaderboardData from '../public/leaderboard.json'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Crown,
  Dices,
  Gamepad2,
  Gem,
  Ghost,
  Hash,
  Heart,
  Mic,
  Music,
  Pickaxe,
  Shield,
  ShieldAlert,
  Clock,
  Skull,
  Sparkles,
  Star,
  Sword,
  Swords,
  Terminal,
  Trophy,
  UserCheck,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const featuresList = [
  {
    icon: Pickaxe,
    title: 'Vanilla Survival SMP',
    description: 'Classic survival gameplay focused on building, exploration, and community-driven adventures.',
  },
  {
    icon: Gem,
    title: 'Quality of Life Plugin',
    description: 'Infinite villager trading, clicking villager mechanics, and limited mace.',
  },
  {
    icon: Terminal,
    title: 'Custom Commands',
    description: 'Essential player commands like /spawn and /home to quickly return to your base or server hub.',
  },
  {
    icon: Mic,
    title: 'Voice Channels & Chill',
    description: 'Hop in Discord VC to chat, stream your gameplay, and play party minigames.',
  },
  {
    icon: Sparkles,
    title: 'Community Events',
    description: 'Participate in fun events like building contests, PvP battles, and win exciting prizes!',
  },
  {
    icon: Zap,
    title: '24/7 Zero Lag',
    description: 'Hosted on dedicated high-performance hardware for buttery-smooth gameplay.',
  },
]

const rulesList = [
  {
    number: '01',
    title: 'Respect Players & Staff',
    description: 'Treat everyone with kindness. Harassment, toxicity, and disrespect toward players or staff are not tolerated.',
  },
  {
    number: '02',
    title: 'Fair Play (No Hacks)',
    description: 'Cheating, X-Ray, hacking, or exploiting bugs are strictly prohibited and will lead to an immediate ban.',
  },
  {
    number: '03',
    title: 'Family-Friendly Chat',
    description: 'Keep global chat clean and friendly. Avoid profanity, offensive language, or inappropriate topics.',
  },
  {
    number: '04',
    title: 'No Advertising',
    description: 'Self-promotion, sharing external Discord invite links, or advertising other Minecraft servers is not allowed.',
  },
  {
    number: '05',
    title: 'Protect Personal Privacy',
    description: 'Respect privacy. Do not share personal details, sensitive real-world info, or private data of anyone.',
  },
  {
    number: '06',
    title: 'No Chat Spam or Caps',
    description: 'Keep chat clean and easy to read. Avoid repeating messages, spamming, or using excessive ALL-CAPS.',
  },
  {
    number: '07',
    title: 'Follow Staff Instructions',
    description: 'Always respect and follow guidance from staff members—their decisions keep the server safe and fair.',
  },
  {
    number: '08',
    title: 'Report Issues Responsibly',
    description: 'Report bugs, player rule violations, or server issues responsibly to staff via Discord tickets rather than public chat.',
  },
]

const leaderboardCategories = {
  kills: {
    id: 'kills',
    label: 'Kills',
    icon: Swords,
    players: [
      {
        rank: '1.',
        name: 'PROBotX11',
        score: '10 Kills',
        subtitle: '7.3 hrs played',
        ribbonBg: 'from-amber-400 via-yellow-400 to-amber-500',
        ribbonText: 'text-white',
        cardBg: 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300 shadow-md hover:shadow-xl',
      },
      {
        rank: '2.',
        name: 'DudeVedant_pro',
        score: '10 Kills',
        subtitle: '12.6 hrs played',
        ribbonBg: 'from-slate-400 via-slate-300 to-slate-400',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md',
      },
      {
        rank: '3.',
        name: 'Spidyy_xD',
        score: '9 Kills',
        subtitle: '5.9 hrs played',
        ribbonBg: 'from-amber-700 via-amber-600 to-amber-700',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-amber-200 shadow-sm hover:shadow-md',
      },
      {
        rank: '4.',
        name: 'speedboost44',
        score: '8 Kills',
        subtitle: '2.4 hrs played',
        ribbonBg: 'from-stone-500 to-stone-600',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md',
      },
      {
        rank: '5.',
        name: 'NOT_INVIXEE',
        score: '5 Kills',
        subtitle: '9.3 hrs played',
        ribbonBg: 'from-stone-500 to-stone-600',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md',
      },
    ],
  },
  deaths: {
    id: 'deaths',
    label: 'Deaths',
    icon: Skull,
    players: [
      {
        rank: '1.',
        name: 'Spidyy_xD',
        score: '38 Deaths',
        subtitle: '5.9 hrs played',
        ribbonBg: 'from-amber-400 via-yellow-400 to-amber-500',
        ribbonText: 'text-white',
        cardBg: 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300 shadow-md hover:shadow-xl',
      },
      {
        rank: '2.',
        name: 'NOT_INVIXEE',
        score: '25 Deaths',
        subtitle: '9.3 hrs played',
        ribbonBg: 'from-slate-400 via-slate-300 to-slate-400',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md',
      },
      {
        rank: '3.',
        name: 'DudeVedant_pro',
        score: '12 Deaths',
        subtitle: '12.6 hrs played',
        ribbonBg: 'from-amber-700 via-amber-600 to-amber-700',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-amber-200 shadow-sm hover:shadow-md',
      },
      {
        rank: '4.',
        name: 'speedboost44',
        score: '12 Deaths',
        subtitle: '2.4 hrs played',
        ribbonBg: 'from-stone-500 to-stone-600',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md',
      },
      {
        rank: '5.',
        name: 'G6Gamer7',
        score: '10 Deaths',
        subtitle: '3.4 hrs played',
        ribbonBg: 'from-stone-500 to-stone-600',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md',
      },
    ],
  },
  playtime: {
    id: 'playtime',
    label: 'PlayTime',
    icon: Clock,
    players: [
      {
        rank: '1.',
        name: 'DudeVedant_pro',
        score: '12.6 hrs',
        subtitle: '10 Kills',
        ribbonBg: 'from-amber-400 via-yellow-400 to-amber-500',
        ribbonText: 'text-white',
        cardBg: 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300 shadow-md hover:shadow-xl',
      },
      {
        rank: '2.',
        name: 'NOT_INVIXEE',
        score: '9.3 hrs',
        subtitle: '5 Kills',
        ribbonBg: 'from-slate-400 via-slate-300 to-slate-400',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md',
      },
      {
        rank: '3.',
        name: 'PROBotX11',
        score: '7.2 hrs',
        subtitle: '10 Kills',
        ribbonBg: 'from-amber-700 via-amber-600 to-amber-700',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-amber-200 shadow-sm hover:shadow-md',
      },
      {
        rank: '4.',
        name: 'Spidyy_xD',
        score: '5.9 hrs',
        subtitle: '9 Kills',
        ribbonBg: 'from-stone-500 to-stone-600',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md',
      },
      {
        rank: '5.',
        name: 'ARENTOIS',
        score: '4.4 hrs',
        subtitle: '2 Kills',
        ribbonBg: 'from-stone-500 to-stone-600',
        ribbonText: 'text-white',
        cardBg: 'bg-white border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md',
      },
    ],
  },
}

const shopPackages = [
  {
    name: 'VIP Rank',
    price: '$4.99/mo',
    features: ['Colored Chat Tag', 'Fly in Hub', 'Exclusive Cosmetics', '2x XP Boost'],
    popular: false,
  },
  {
    name: 'LEGEND Rank',
    price: '$12.99/mo',
    features: ['All VIP Features', 'Custom Particle Trails', 'Priority Server Join', '3x XP Boost', '5 Home Warps'],
    popular: true,
  },
  {
    name: 'GOD Rank',
    price: '$24.99/mo',
    features: ['All LEGEND Features', 'Custom Prefix', 'Access to Beta Features', '5x XP Boost', 'Unlimited Warps'],
    popular: false,
  },
]

const fadeUp = {
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative z-40 px-6 py-20 md:py-28"
      aria-labelledby="features-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
            Features
          </span>
          <motion.h2
            id="features-title"
            {...fadeUp}
            className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 md:text-5xl"
          >
            Everything You Need for Adventure
          </motion.h2>
          <p className="mt-4 text-sm text-stone-600 md:text-base max-w-xl mx-auto">
            Discover a refined Minecraft SMP experience designed for community, fair play, and endless fun.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuresList.map(({ icon: Icon, title, description }) => (
            <motion.article
              key={title}
              {...fadeUp}
              whileHover={{ y: -6 }}
              className="flex flex-col gap-4 rounded-3xl border border-stone-200/80 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Icon className="size-6" aria-hidden="true" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-stone-900">{title}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function JoinGuideSection() {
  const [copied, setCopied] = useState(false)

  const handleCopyIp = () => {
    navigator.clipboard.writeText('125.16.185.22:25590')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section
      id="how-to-join"
      className="relative z-40 bg-[#f5f2eb]/60 px-6 py-20 md:py-28"
      aria-labelledby="join-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
            Whitelist Guide
          </span>
          <motion.h2
            id="join-title"
            {...fadeUp}
            className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 md:text-5xl"
          >
            How to Get Whitelisted & Join
          </motion.h2>
          <p className="mt-4 text-sm font-medium text-stone-600 md:text-base max-w-xl mx-auto">
            Get whitelisted in 4 easy steps to start your survival adventure on XD VERSE SMP.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Step 1: Join Discord */}
          <motion.div
            {...fadeUp}
            whileHover={{ y: -6 }}
            className="flex flex-col justify-between rounded-[2.25rem] border border-stone-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-indigo-300/80 hover:shadow-xl"
          >
            <div>
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-indigo-50 font-black text-indigo-600 text-sm tracking-wider">
                01
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Join Our Discord</h3>
              <p className="text-sm leading-relaxed text-stone-600 mb-6">
                Click below to join the official XD VERSE Discord community server.
              </p>
            </div>
            <a
              href="https://discord.gg/csZuFW2UM3"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5865F2] px-5 py-3 text-xs font-bold text-white shadow-md shadow-indigo-100 transition-all hover:bg-[#4752C4] active:scale-95"
            >
              <span>Join Discord</span>
              <ArrowRight className="size-3.5" />
            </a>
          </motion.div>

          {/* Step 2: Open Whitelist Channel */}
          <motion.div
            {...fadeUp}
            whileHover={{ y: -6 }}
            className="flex flex-col justify-between rounded-[2.25rem] border border-stone-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-300/80 hover:shadow-xl"
          >
            <div>
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-blue-50 font-black text-blue-600 text-sm tracking-wider">
                02
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Open Whitelist</h3>
              <p className="text-sm leading-relaxed text-stone-600 mb-6">
                Inside Discord, locate and click the <strong className="text-stone-900 font-bold">whitelist channel</strong>.
              </p>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-800">
              <Hash className="size-4 text-indigo-500 shrink-0" />
              <span className="font-mono text-xs font-bold tracking-wide text-stone-700">whitelist</span>
              <span className="ml-auto inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Step 3: Enter Username */}
          <motion.div
            {...fadeUp}
            whileHover={{ y: -6 }}
            className="flex flex-col justify-between rounded-[2.25rem] border border-stone-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-amber-300/80 hover:shadow-xl"
          >
            <div>
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-amber-50 font-black text-amber-700 text-sm tracking-wider">
                03
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Send Username</h3>
              <p className="text-sm leading-relaxed text-stone-600 mb-6">
                Type your exact Minecraft in-game username in the <span className="font-bold text-stone-900">whitelist channel</span>.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="size-4 text-amber-600" />
                <span className="font-mono text-xs font-bold text-stone-800">YourUsername</span>
              </div>
              <span className="rounded-md bg-amber-200/80 px-2 py-0.5 text-[10px] font-extrabold text-amber-900 uppercase">
                SEND
              </span>
            </div>
          </motion.div>

          {/* Step 4: Connect IP & Play */}
          <motion.div
            {...fadeUp}
            whileHover={{ y: -6 }}
            className="flex flex-col justify-between rounded-[2.25rem] border border-stone-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-emerald-300/80 hover:shadow-xl"
          >
            <div>
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-emerald-50 font-black text-emerald-700 text-sm tracking-wider">
                04
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Join & Play</h3>
              <p className="text-sm leading-relaxed text-stone-600 mb-6">
                Launch Minecraft, add our server IP, and enter the SMP world!
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyIp}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-stone-800 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-400" />
                  <span>IP Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Server IP</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function RulesSection() {
  return (
    <section
      id="rules"
      className="relative z-40 px-6 py-20 md:py-28"
      aria-labelledby="rules-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
            Community Guidelines
          </span>
          <motion.h2
            id="rules-title"
            {...fadeUp}
            className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 md:text-5xl"
          >
            Server Rules
          </motion.h2>
          <p className="mt-4 text-sm text-stone-600 md:text-base max-w-xl mx-auto">
            Keeping XD VERSE SMP safe, friendly, and enjoyable for all players.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {rulesList.map((rule) => (
            <motion.div
              key={rule.number}
              {...fadeUp}
              whileHover={{ scale: 1.01 }}
              className="flex gap-6 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
            >
              <span className="text-2xl font-black text-blue-600">{rule.number}</span>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{rule.title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{rule.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-40 px-6 py-20 md:py-28"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-4xl text-center">
        <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
          About Us
        </span>
        <motion.h2
          id="about-title"
          {...fadeUp}
          className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 md:text-5xl"
        >
          The Warm Hangout Spot
        </motion.h2>
        <motion.p
          {...fadeUp}
          className="mt-6 text-base font-normal leading-relaxed text-stone-600 md:text-lg"
        >
          XD VERSE is a cozy, casual Minecraft SMP community built for hanging out, building epic bases,
          and making lifelong friends. Whether you love quiet survival building, chaotic minigames,
          or late-night voice calls, everyone is welcome.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <span className="text-3xl font-black text-stone-900">300+</span>
            <p className="mt-1 text-xs font-semibold text-stone-500">Registered Players</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <span className="text-3xl font-black text-blue-600">24/7</span>
            <p className="mt-1 text-xs font-semibold text-stone-500">Active Uptime</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <span className="text-3xl font-black text-emerald-600">99.9%</span>
            <p className="mt-1 text-xs font-semibold text-stone-500">Zero Lag Score</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const leaderboardCategoriesConfig = {
  kills: {
    id: 'kills',
    label: 'Kills',
    icon: Swords,
  },
  deaths: {
    id: 'deaths',
    label: 'Deaths',
    icon: Skull,
  },
  playtime: {
    id: 'playtime',
    label: 'PlayTime',
    icon: Clock,
  },
}

export function LeaderboardSection() {
  const [activeCategory, setActiveCategory] = useState<'kills' | 'deaths' | 'playtime'>('kills')
  const [leaderboardData, setLeaderboardData] = useState<any>(initialLeaderboardData)
  const [liveStatus, setLiveStatus] = useState<string>(
    initialLeaderboardData?.updatedAt ? `Live Stats Synced • ${initialLeaderboardData.updatedAt}` : 'Live Sync Active'
  )

  useEffect(() => {
    // Fetch local or deployed leaderboard.json feed generated from Minecraft stats
    const fetchLiveLeaderboard = async () => {
      try {
        let res = await fetch('./leaderboard.json?t=' + Date.now())
        if (!res.ok) {
          res = await fetch('/XD-VERSE/leaderboard.json?t=' + Date.now())
        }
        if (!res.ok) {
          res = await fetch('leaderboard.json?t=' + Date.now())
        }
        if (res.ok) {
          const data = await res.json()
          if (data && (data.kills || data.deaths || data.playtime)) {
            setLeaderboardData(data)
          }
          if (data.updatedAt) {
            setLiveStatus(`Live Stats Synced • ${data.updatedAt}`)
          }
        }
      } catch (err) {
        console.log('Using static fallback statistics')
      }
    }

    fetchLiveLeaderboard()
  }, [])

  return (
    <section
      id="leaderboard"
      className="relative z-40 bg-[#f5f2eb]/60 px-6 py-20 md:py-28"
      aria-labelledby="leaderboard-title"
    >
      <style>{`
        .lb-tab-button {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          border-radius: 9999px;
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.95);
          color: #44403c;
          border: 1px solid rgba(229, 231, 235, 1);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .lb-tab-button:hover {
          background-color: #ffffff;
          color: #000000;
        }
        .lb-tab-button .lb-tab-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #2563eb;
          transition: color 0.2s ease;
          flex-shrink: 0;
        }
        .lb-tab-button.lb-tab-active {
          background-color: #2563eb !important;
          color: #ffffff !important;
          border-color: #2563eb !important;
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3) !important;
          transform: scale(1.05);
        }
        .lb-tab-button.lb-tab-active .lb-tab-icon {
          color: #ffffff !important;
        }
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (typeof window === 'undefined') return;
              window.__switchLbTab = function(targetKey) {
                var keys = ['kills', 'deaths', 'playtime'];
                keys.forEach(function(k) {
                  var el = document.getElementById('lb-cat-' + k);
                  var b = document.getElementById('lb-btn-' + k);
                  if (el) el.style.display = (k === targetKey) ? 'flex' : 'none';
                  if (b) {
                    if (k === targetKey) {
                      b.className = 'inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 cursor-pointer border shadow-sm bg-blue-600 text-white border-blue-600 shadow-blue-500/30 scale-105';
                    } else {
                      b.className = 'inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 cursor-pointer border shadow-sm bg-white/95 text-stone-700 border-stone-200 hover:bg-white hover:text-black';
                    }
                  }
                });
              };
              document.addEventListener('click', function(e) {
                var btn = e.target ? e.target.closest('[id^="lb-btn-"]') : null;
                if (btn && btn.id) {
                  var targetKey = btn.id.replace('lb-btn-', '');
                  window.__switchLbTab(targetKey);
                }
              });
            })();
          `,
        }}
      />
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-800">
            <span className="inline-block size-2 rounded-full bg-purple-600 animate-pulse"></span>
            <span>{liveStatus}</span>
          </div>
          <h2
            id="leaderboard-title"
            className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 md:text-5xl"
          >
            Top Server Players
          </h2>
          <p className="mt-4 text-sm font-medium text-stone-600 md:text-base max-w-xl mx-auto">
            Honoring Season legends with custom rank badges on XD VERSE SMP.
          </p>

          {/* Category Switcher Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {(Object.keys(leaderboardCategoriesConfig) as Array<keyof typeof leaderboardCategoriesConfig>).map((catKey) => {
              const cat = leaderboardCategoriesConfig[catKey]
              const Icon = cat.icon
              const isActive = activeCategory === catKey
              return (
                <button
                  key={catKey}
                  id={`lb-btn-${catKey}`}
                  type="button"
                  onClick={() => {
                    setActiveCategory(catKey)
                    if (typeof window !== 'undefined' && (window as any).__switchLbTab) {
                      ;(window as any).__switchLbTab(catKey)
                    }
                  }}
                  className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 cursor-pointer border shadow-sm ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/30 scale-105'
                      : 'bg-white/95 text-stone-700 border-stone-200 hover:bg-white hover:text-black'
                  }`}
                >
                  <Icon className={`size-5 transition-colors ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Vertical Stacked Leaderboard Rows for Each Category */}
        {(Object.keys(leaderboardCategoriesConfig) as Array<keyof typeof leaderboardCategoriesConfig>).map((catKey) => {
          const isSelected = activeCategory === catKey
          const playerList = leaderboardData?.[catKey] || []

          return (
            <div
              key={catKey}
              id={`lb-cat-${catKey}`}
              style={{ display: isSelected ? 'flex' : 'none' }}
              className="flex-col gap-4 max-w-3xl mx-auto w-full"
            >
              {Array.isArray(playerList) && playerList.length > 0 ? (
                playerList.slice(0, 10).map((player: any, idx: number) => (
                  <div
                    key={player.name + (player.rank || idx)}
                    className={`relative flex items-center overflow-hidden rounded-2xl border transition-all duration-300 ${player.cardBg || 'bg-white border-stone-200'}`}
                  >
                    {/* Left: Angled Ribbon with Rank Number */}
                    <div
                      className={`relative flex items-center shrink-0 h-[76px] md:h-[88px] w-[110px] md:w-[130px] bg-gradient-to-r ${player.ribbonBg || 'from-stone-500 to-stone-600'}`}
                      style={{ clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0 100%)' }}
                    >
                      <span className={`ml-6 md:ml-8 font-mono text-3xl md:text-4xl font-black italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] ${player.ribbonText || 'text-white'}`}>
                        {player.rank || `${idx + 1}.`}
                      </span>
                    </div>

                    {/* Center & Right: Player Name, Subtitle, Score */}
                    <div className="flex flex-1 items-center justify-between px-5 md:px-8 py-4">
                      <div className="flex flex-col">
                        <h3 className="text-lg md:text-xl font-extrabold text-stone-900 leading-tight">
                          {player.name}
                        </h3>
                        {player.subtitle && (
                          <span className="text-xs font-semibold text-stone-500 mt-0.5">
                            {player.subtitle}
                          </span>
                        )}
                      </div>
                      <span className="text-base md:text-lg font-black text-stone-900 tabular-nums">
                        {player.score}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-stone-500 font-semibold">
                  No player statistics available.
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative z-40 border-t border-stone-200/80 bg-white px-6 py-10 text-center">
      <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-extrabold tracking-wider text-blue-600 text-lg">XD VERSE</span>
        <p className="text-xs text-stone-500">
          © 2026 XD VERSE SMP. All rights reserved. A friendly Minecraft Community.
        </p>
        <div className="flex gap-6 text-xs font-semibold text-stone-600">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#rules" className="hover:text-blue-600">Rules</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#leaderboard" className="hover:text-blue-600">Leaderboard</a>
        </div>
      </div>
    </footer>
  )
}
