'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Users
} from 'lucide-react'

interface Slide {
  id: number
  number: string
  title: string
  subtitle: string
  description: string
  image: string
  metaLabel: string
  metaValue: string
  isDiscord?: boolean
}


const slides: Slide[] = [
  {
    id: 0,
    number: '01',
    title: 'XD VERSE SMP',
    subtitle: 'THE ULTIMATE SURVIVAL EXPERIENCE',
    description:
      'Experience classic Minecraft survival enhanced with essential Quality of Life plugins, custom features, and a warm, active gaming community.',
    image: './images/mc-squad-hero.jpg',
    metaLabel: 'SERVER IP ADDRESS',
    metaValue: '125.16.185.22:25590'
  },
  {
    id: 1,
    number: '02',
    title: 'JOIN OUR DISCORD',
    subtitle: 'OFFICIAL COMMUNITY HUB',
    description:
      'Connect with fellow players, join voice channels, get instant staff support, and stay updated with announcements & giveaways!',
    image: './images/mc-error-desk.jpg',
    metaLabel: 'DISCORD COMMUNITY',
    metaValue: 'Join Discord Server',
    isDiscord: true
  },
  {
    id: 2,
    number: '03',
    title: 'EVENTS & ACTIVE MEMBERS',
    subtitle: 'THRIVING GAMING COMMUNITY',
    description:
      'Active players in exciting community events like Build Battles, Parkour courses, PvP tournaments, and much more with 24/7 uptime!',
    image: './images/mc-library-hub.jpg',
    metaLabel: 'COMMUNITY STATUS',
    metaValue: '300+ Active Members • 24/7'
  }
]

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [copied, setCopied] = useState(false)
  const [copiedDiscord, setCopiedDiscord] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Auto-slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyIp = () => {
    navigator.clipboard.writeText('125.16.185.22:25590')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleCopyDiscord = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText('https://discord.gg/csZuFW2UM3')
    setCopiedDiscord(true)
    setTimeout(() => setCopiedDiscord(false), 2500)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }

  const current = slides[activeSlide]

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative px-4 py-4 md:px-8 md:py-6"
    >
      {/* Cinematic Dark Gaming Card Container (Inspired by Reference Image) */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0d0c11] border border-stone-800/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] transition-colors duration-500">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-[#ff6b00]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 size-96 rounded-full bg-[#ff6b00]/10 blur-[140px]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] md:min-h-[660px]">
          
          {/* LEFT COLUMN: Cinematic Typography, Primary Action & Socials (7 Cols on desktop) */}
          <div className="relative z-20 flex flex-col justify-between p-8 md:p-12 lg:col-span-7 lg:py-14 lg:pl-16 lg:pr-8">
            
            {/* Top Brand Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 px-3.5 py-1.5 text-xs font-black tracking-wider uppercase text-[#ff8c38]">
                <Sparkles className="size-3.5 text-[#ff6b00]" />
                <span>XD VERSE CLUB</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-400">
                <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SMP • v1.20+</span>
              </div>
            </div>

            {/* Main Title & Description Section */}
            <div className="my-8 md:my-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={hasMounted ? { opacity: 0, y: 15 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff6b00]">
                    {current.subtitle}
                  </span>
                  <h1
                    id="hero-title"
                    className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-mono drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-[0.95]"
                    style={{
                      fontFamily: 'Impact, "Arial Black", sans-serif',
                      letterSpacing: '-0.02em',
                      textShadow: '0 2px 0 #ff6b00, 0 8px 25px rgba(0,0,0,0.9)'
                    }}
                  >
                    {current.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-stone-300 font-medium">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Action Bar: Primary Orange CTA + Server Metadata Block */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href="#how-to-join"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#ff6b00] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,107,0,0.4)] transition-all duration-300 hover:bg-[#ff7e22] hover:shadow-[0_0_35px_rgba(255,107,0,0.7)] hover:scale-105 active:scale-95"
                >
                  <span>Get Whitelisted</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>

                {/* Server IP / Discord Action Block */}
                {current.isDiscord ? (
                  <div className="group flex flex-col justify-center border-l-2 border-[#5865F2]/60 pl-4 transition-colors hover:border-[#5865F2]">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      {current.metaLabel}
                    </span>
                    <div className="flex flex-wrap items-center gap-2.5 mt-0.5">
                      <a
                        href="https://discord.gg/csZuFW2UM3"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-sm sm:text-base font-extrabold text-white transition-colors hover:text-[#7289da] hover:underline"
                      >
                        <span>{current.metaValue}</span>
                        <ExternalLink className="size-3.5 text-[#5865F2]" />
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyDiscord}
                        className="inline-flex items-center gap-1 rounded bg-[#5865F2]/20 border border-[#5865F2]/40 px-2 py-0.5 text-[10px] font-bold text-[#7289da] hover:bg-[#5865F2]/30 transition-colors"
                      >
                        {copiedDiscord ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={handleCopyIp}
                    className="group flex cursor-pointer flex-col justify-center border-l-2 border-[#ff6b00]/40 pl-4 transition-colors hover:border-[#ff6b00]"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400 group-hover:text-stone-300">
                      {current.metaLabel}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-sm sm:text-base font-extrabold text-white">
                        {current.metaValue}
                      </span>
                      {copied ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                          <Check className="size-3" /> Copied
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-stone-800 px-1.5 py-0.5 text-[10px] font-bold text-stone-300 group-hover:bg-[#ff6b00]/20 group-hover:text-[#ff8c38]">
                          <Copy className="size-3" /> Copy IP
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Left: Social Icons & Server Status */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-stone-800/80">
              {/* Social Icons (Discord Only) */}
              <div className="flex items-center gap-4">
                <a
                  href="https://discord.gg/csZuFW2UM3"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord"
                  className="flex size-10 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-300 transition-all hover:border-[#ff6b00] hover:text-[#ff6b00] hover:scale-110"
                >
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                  </svg>
                </a>
              </div>

              {/* Online Players Stat */}
              <div className="flex items-center gap-3 rounded-full bg-stone-900/90 border border-stone-800 px-4 py-2">
                <Users className="size-4 text-[#ff6b00]" />
                <span className="text-xs font-bold text-stone-300">
                  <strong className="text-white">300+</strong> REGISTERED PLAYERS
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Massive Cinematic Image Showcase + Slider Counter (5 Cols on desktop) */}
          <div className="relative flex flex-col justify-end overflow-hidden lg:col-span-5 min-h-[380px] lg:min-h-full">
            
            {/* Background Image with Smooth Crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={hasMounted ? { opacity: 0, scale: 1.05 } : false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 z-0"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className={`h-full w-full ${
                    current.image.endsWith('.png')
                      ? 'object-contain p-6 bg-[#0a0a0d]'
                      : 'object-cover object-center'
                  }`}
                />
                {/* Left gradient transition so left text column blends smoothly with right image */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d0c11] to-transparent hidden lg:block" />
                {/* Top/Bottom subtle gradient for framing */}
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0d0c11] via-[#0d0c11]/60 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0d0c11]/60 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Pagination / Carousel Slider Counter at Bottom Right (like <- 01 02 03 ->) */}
            <div className="relative z-20 flex items-center justify-center lg:justify-end gap-3 p-8">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="flex size-9 items-center justify-center rounded-full bg-black/60 border border-stone-800 text-white transition-colors hover:border-[#ff6b00] hover:text-[#ff6b00]"
              >
                <ArrowLeft className="size-4" />
              </button>

              <div className="flex items-center gap-3 font-mono text-base font-extrabold">
                {slides.map((s, idx) => {
                  const isActive = activeSlide === idx
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`transition-all duration-300 ${
                        isActive
                          ? 'text-2xl font-black text-[#ff6b00] scale-110 drop-shadow-[0_0_10px_rgba(255,107,0,0.8)]'
                          : 'text-sm text-stone-500 hover:text-stone-300'
                      }`}
                    >
                      {s.number}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="flex size-9 items-center justify-center rounded-full bg-black/60 border border-stone-800 text-white transition-colors hover:border-[#ff6b00] hover:text-[#ff6b00]"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
