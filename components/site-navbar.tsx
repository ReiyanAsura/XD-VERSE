'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

const navigation = [
  { label: 'Features', href: '#features' },
  { label: 'How to Join', href: '#how-to-join' },
  { label: 'Rules', href: '#rules' },
  { label: 'About', href: '#about' },
  { label: 'Extra', href: '#extra' },
]

export function SiteNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[100] w-full px-4 pt-4 sm:px-8">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/80 px-6 py-3 shadow-sm backdrop-blur-md border border-stone-200/80"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="flex items-center gap-2 font-bold tracking-tight text-[#2563eb] text-lg sm:text-xl"
          aria-label="XD VERSE home"
        >
          <span className="font-extrabold tracking-wider text-blue-600">XD VERSE</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-stone-700 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            href="https://discord.gg/csZuFW2UM3"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            Join Our Discord
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-full p-2 text-stone-700 hover:text-black md:hidden"
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
            className="mt-2 rounded-2xl border border-stone-200 bg-white/95 p-6 shadow-xl backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-stone-800 hover:text-blue-600"
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
