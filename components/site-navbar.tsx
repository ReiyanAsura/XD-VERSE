'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageSquare, Flame } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const navigation = [
  { label: 'Home', href: '#home', active: true },
  { label: 'Features', href: '#features' },
  { label: 'How to Join', href: '#how-to-join' },
  { label: 'Recipes', href: '#recipes' },
  { label: 'Rules', href: '#rules' },
  { label: 'Leaderboard', href: '#leaderboard' },
]

export function SiteNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Home')

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-stone-200/80 bg-white/90 dark:bg-[#0c0b0e]/90 dark:border-stone-800/80 backdrop-blur-md transition-colors duration-300">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Brand Logo & Subtitle */}
        <a
          href="#home"
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-3 group"
          aria-label="XD VERSE home"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b00] to-[#ff8c38] text-white shadow-md shadow-[#ff6b00]/30 transition-transform group-hover:scale-105">
            <Flame className="size-5 fill-white text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif font-black tracking-tight text-stone-900 dark:text-white text-xl group-hover:text-[#ff6b00] transition-colors">
              XD VERSE
            </span>
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#ff6b00]">
              MINECRAFT SERVER
            </span>
          </div>
        </a>

        {/* Navigation Items (Desktop) */}
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const isActive = activeTab === item.label
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveTab(item.label)}
                className={`relative py-1 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6b00] ${
                  isActive
                    ? 'text-[#ff6b00] font-bold'
                    : 'text-stone-600 dark:text-stone-300 hover:text-[#ff6b00] dark:hover:text-[#ff6b00]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-[#ff6b00]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />

          <motion.a
            href="https://discord.gg/csZuFW2UM3"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full bg-[#ff6b00] px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-[#ff6b00]/25 transition-all hover:bg-[#ff7e22] hover:shadow-lg hover:shadow-[#ff6b00]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6b00]"
          >
            <span>Join Discord</span>
            <MessageSquare className="size-4 fill-white/20" />
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

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-[#0c0b0e]/95 px-6 py-4 shadow-xl backdrop-blur-lg md:hidden transition-colors duration-300"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 sm:hidden">
                <span className="text-sm font-bold text-stone-700 dark:text-stone-300">Theme</span>
                <ThemeToggle />
              </div>

              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveTab(item.label)
                    setMobileMenuOpen(false)
                  }}
                  className={`text-base font-semibold py-1.5 transition-colors ${
                    activeTab === item.label
                      ? 'text-[#ff6b00] font-bold'
                      : 'text-stone-800 dark:text-stone-200 hover:text-[#ff6b00]'
                  }`}
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

