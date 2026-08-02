'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Sparkles } from 'lucide-react'

// Lightweight synthesized sound effects using Web Audio API for an expert gaming feel
function playToggleSound(toDark: boolean) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    if (toDark) {
      // Sleek ascending futuristic night chime
      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
    } else {
      // Warm descending daylight chime
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(660, now)
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.12)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
    }

    osc.start(now)
    osc.stop(now + 0.15)
  } catch (e) {
    // Ignore audio context restrictions if blocked by browser policy
  }
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const syncState = () => {
      if (typeof document !== 'undefined') {
        const isDarkNow = document.documentElement.classList.contains('dark')
        setTheme(isDarkNow ? 'dark' : 'light')
      }
    }

    syncState()
    setMounted(true)

    const handleThemeChange = () => syncState()
    window.addEventListener('xd-theme-change', handleThemeChange)
    return () => window.removeEventListener('xd-theme-change', handleThemeChange)
  }, [])

  const toggleTheme = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    if (typeof window !== 'undefined' && (window as any).__toggleTheme) {
      (window as any).__toggleTheme()
    } else {
      const isCurrentlyDark = document.documentElement.classList.contains('dark')
      const nextTheme = isCurrentlyDark ? 'light' : 'dark'
      setTheme(nextTheme)
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    playToggleSound(theme === 'light')
  }

  const isDark = mounted ? theme === 'dark' : (typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true)

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`xd-theme-toggle-btn group relative inline-flex h-10 w-20 items-center rounded-full border p-1 shadow-inner transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
        isDark
          ? 'border-indigo-500/40 bg-stone-950 shadow-indigo-950/50'
          : 'border-amber-300 bg-amber-50 shadow-amber-200/50'
      } ${className}`}
    >
      {/* Background glowing stars / sunbeams in track */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        <Sun className={`size-3.5 transition-opacity duration-300 ${isDark ? 'opacity-30 text-stone-500' : 'opacity-100 text-amber-500'}`} />
        <Moon className={`size-3.5 transition-opacity duration-300 ${isDark ? 'opacity-100 text-indigo-400' : 'opacity-30 text-stone-400'}`} />
      </div>

      {/* Sliding Theme Toggle Pill / Knob */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`relative z-10 flex size-8 items-center justify-center rounded-full shadow-md ${
          isDark
            ? 'ml-auto bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-indigo-500/30'
            : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/30'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <Moon className="size-4 fill-current" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <Sun className="size-4 fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtle hover sparkle glow indicator */}
      <span className="absolute -top-1 -right-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Sparkles className={`size-3 ${isDark ? 'text-indigo-400' : 'text-amber-500'}`} />
      </span>
    </motion.button>
  )
}
