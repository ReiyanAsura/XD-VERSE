'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const navigation = [
  { label: 'Features', href: '#features' },
  { label: 'How to Join', href: '#how-to-join' },
  { label: 'Rules', href: '#rules' },
  { label: 'About', href: '#about' },
  { label: 'Leaderboard', href: '#leaderboard' },
]

export function SiteNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[100] w-full px-4 pt-4 sm:px-8">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/80 dark:bg-stone-900/85 dark:border-stone-800/80 dark:shadow-stone-950/50 px-6 py-3 shadow-sm backdrop-blur-md border border-stone-200/80 transition-colors duration-300"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="flex items-center gap-2 font-bold tracking-tight text-[#ff6b00] text-lg sm:text-xl"
          aria-label="XD VERSE home"
        >
          <span className="font-black tracking-wider text-[#ff6b00]">XD VERSE</span>
          <span className="rounded bg-[#ff6b00]/15 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider text-[#ff8c38] border border-[#ff6b00]/30">
            SMP
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-stone-700 dark:text-stone-300 transition-colors hover:text-[#ff6b00] dark:hover:text-[#ff6b00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6b00]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />

          <motion.a
            href="https://discord.gg/csZuFW2UM3"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[#ff6b00] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-[#ff6b00]/20 transition-all hover:bg-[#ff7e22] hover:shadow-lg hover:shadow-[#ff6b00]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6b00]"
          >
            Join Our Discord
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-full p-2 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 p-6 shadow-xl backdrop-blur-lg md:hidden transition-colors duration-300"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 sm:hidden">
                <span className="text-sm font-bold text-stone-700 dark:text-stone-300">Theme</span>
                <ThemeToggle />
              </div>

              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-stone-800 dark:text-stone-200 hover:text-[#ff6b00] dark:hover:text-[#ff6b00]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
