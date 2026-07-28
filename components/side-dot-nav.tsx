'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how-to-join', label: 'Whitelist Guide' },
  { id: 'rules', label: 'Server Rules' },
  { id: 'about', label: 'About Us' },
  { id: 'leaderboard', label: 'Leaderboard' },
]

export function SideDotNav() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id)
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(SECTIONS[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection)

  return (
    <aside
      aria-label="Section navigation"
      className="fixed right-5 md:right-7 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center py-2"
    >
      {/* Permanent Soft Mint Glowing Line Track */}
      <div className="relative h-[270px] w-[3px] flex flex-col justify-between items-center rounded-full bg-gradient-to-b from-transparent via-green-400/80 to-transparent shadow-[0_0_12px_rgba(124,252,0,0.5),0_0_20px_rgba(124,252,0,0.3)]">
        {/* Active Flowing Radiant Mint Bar (Slides dynamically with subtle glow) */}
        <motion.div
          animate={{
            top: `${(activeIndex / (SECTIONS.length - 1)) * 82}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute w-[4.5px] h-[48px] rounded-full bg-gradient-to-b from-green-200 via-green-400 to-green-600 shadow-[0_0_18px_rgba(124,252,0,0.9),0_0_30px_rgba(124,252,0,0.7)]"
        />

        {/* Section Hit Zones (Dotless) */}
        {SECTIONS.map(({ id, label }, index) => {
          const isActive = activeSection === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className="group relative flex items-center justify-center w-6 h-9 focus:outline-none"
              aria-label={`Scroll to ${label}`}
            >
              {/* Hover Tooltip showing Section Name */}
              <span className="absolute right-7 rounded-xl bg-stone-900/95 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-xl backdrop-blur-md whitespace-nowrap opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 pointer-events-none border border-teal-500/30">
                {label}
                {/* Tooltip Arrow */}
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-stone-900/95" />
              </span>

              {/* Line Segment Accent Highlight on Hover */}
              <span
                className={`block h-full w-[2px] rounded-full transition-all duration-300 ${
                  isActive
                    ? 'opacity-0'
                    : 'bg-green-200/50 group-hover:bg-green-400 group-hover:w-[3.5px] group-hover:shadow-[0_0_12px_rgba(124,252,0,0.9)]'
                }`}
              />
            </button>
          )
        })}
      </div>
    </aside>
  )
}
