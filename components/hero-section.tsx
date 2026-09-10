'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Sparkles,
  MessageSquare,
  Flame,
  Users,
  Zap,
  ShieldCheck,
  Gamepad2
} from 'lucide-react'

interface Slide {
  id: number
  number: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  subhead: string
  description: string
  image: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText: string
  secondaryCtaHref: string
  isExternalPrimary?: boolean
  isExternalSecondary?: boolean
  microCopy: string
}

const slides: Slide[] = [
  {
    id: 0,
    number: '01',
    eyebrow: '✦ MINECRAFT SURVIVAL SMP',
    titleLine1: 'Ultimate',
    titleLine2: 'SMP Survival',
    subhead: 'Welcome to XD VERSE Minecraft Server.',
    description:
      'Experience classic survival enhanced with custom crafting recipes, land protection, quality of life features, and a thriving gaming community!',
    image: './images/mc-squad-hero.jpg',
    primaryCtaText: 'Get Whitelisted',
    primaryCtaHref: '#how-to-join',
    secondaryCtaText: 'Join Discord',
    secondaryCtaHref: 'https://discord.gg/csZuFW2UM3',
    isExternalSecondary: true,
    microCopy: '✦ Friendly players, custom SMP gameplay & 24/7 uptime.'
  },
  {
    id: 1,
    number: '02',
    eyebrow: '✦ EXCLUSIVE CRAFTING',
    titleLine1: 'Custom',
    titleLine2: 'SMP Recipes',
    subhead: 'Craft Golden Apples, Cobwebs & Special Items.',
    description:
      'Enhance your survival gameplay with server-exclusive custom recipes! Check out our recipe guide right here on the website.',
    image: './images/mc-error-desk.jpg',
    primaryCtaText: 'View Recipes',
    primaryCtaHref: '#recipes',
    secondaryCtaText: 'Join Discord',
    secondaryCtaHref: 'https://discord.gg/csZuFW2UM3',
    isExternalSecondary: true,
    microCopy: '✦ Custom recipes designed for the best survival balance.'
  },
  {
    id: 2,
    number: '03',
    eyebrow: '✦ COMMUNITY & EVENTS',
    titleLine1: 'PvP & Build',
    titleLine2: 'Tournaments',
    subhead: 'Compete in exciting community events.',
    description:
      'Join build battles, parkour challenges, and epic PvP tournaments with active players and 24/7 server performance!',
    image: './images/mc-library-hub.jpg',
    primaryCtaText: 'Explore Features',
    primaryCtaHref: '#features',
    secondaryCtaText: 'Join Discord',
    secondaryCtaHref: 'https://discord.gg/csZuFW2UM3',
    isExternalSecondary: true,
    microCopy: '✦ Active members, anti-cheat protection & helpful staff.'
  }
]

const bottomPills = [
  {
    icon: Gamepad2,
    title: 'Java & Bedrock',
    subtitle: 'Cross-Play Supported'
  },
  {
    icon: Zap,
    title: 'Custom Recipes',
    subtitle: 'Golden Apples & Cobwebs'
  },
  {
    icon: ShieldCheck,
    title: '24/7 Online',
    subtitle: 'High FPS & Zero Lag'
  },
  {
    icon: Users,
    title: 'Active Community',
    subtitle: 'Events, PvP & Clans'
  }
]

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [copied, setCopied] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const slidesCount = slides.length

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slidesCount)
    }, 7000)
    return () => clearInterval(timer)
  }, [slidesCount])

  const handleCopyIp = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    navigator.clipboard.writeText('125.16.185.22:25590')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slidesCount) % slidesCount)
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slidesCount)
  }

  const currentSlide = slides[activeSlide]

  return (
    <section id="home" className="px-4 py-6 md:px-8 md:py-8 max-w-7xl mx-auto">
      {/* Main Outer Hero Card Container (CherryCraft Reference Card Style) */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#fffdfa] via-[#f8f4eb] to-[#f2ece0] text-stone-900 border border-stone-300/70 shadow-[0_20px_50px_-15px_rgba(255,107,0,0.08)] dark:from-[#111219] dark:via-[#0e0f15] dark:to-[#0a0a0e] dark:text-white dark:border-stone-800/80 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-colors duration-500">
        
        {/* Soft Ambient Radial Background Glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-[#ff6b00]/10 dark:bg-[#ff6b00]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-[#ff6b00]/10 dark:bg-[#ff6b00]/10 blur-[130px]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px] p-6 sm:p-10 md:p-12 lg:p-14 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Display Serif Title, Subtitle, Dual Pill CTAs, Footnote */}
          <div className="relative z-20 flex flex-col justify-between lg:col-span-7 h-full">
            <div>
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#ff6b00] mb-3">
                <Sparkles className="size-3.5 fill-[#ff6b00] text-[#ff6b00]" />
                <span>{currentSlide.eyebrow}</span>
              </div>

              {/* Serif Display Title (CherryCraft Elegance) */}
              <div className="my-2 min-h-[160px] sm:min-h-[190px] flex flex-col justify-center">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-stone-900 dark:text-white leading-[1.02]">
                  <span className="block">{currentSlide.titleLine1}</span>
                  <span className="block text-[#ff6b00]">{currentSlide.titleLine2}</span>
                </h1>
              </div>

              {/* Subhead & Description */}
              <div className="my-3">
                <p className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-200">
                  {currentSlide.subhead}
                </p>
                <p className="mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300 font-medium">
                  {currentSlide.description}
                </p>
              </div>

              {/* Dual Action Pill Buttons & Server IP Copy */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={currentSlide.primaryCtaHref}
                  target={currentSlide.isExternalPrimary ? '_blank' : undefined}
                  rel={currentSlide.isExternalPrimary ? 'noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff6b00] px-7 py-3 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-[#ff6b00]/30 transition-all hover:bg-[#ff7e22] hover:shadow-lg hover:shadow-[#ff6b00]/50 hover:scale-105 active:scale-95"
                >
                  <span>{currentSlide.primaryCtaText}</span>
                  <ArrowRight className="size-4" />
                </a>

                <a
                  href={currentSlide.secondaryCtaHref}
                  target={currentSlide.isExternalSecondary ? '_blank' : undefined}
                  rel={currentSlide.isExternalSecondary ? 'noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 px-6 py-3 text-xs sm:text-sm font-extrabold text-stone-800 dark:text-stone-200 shadow-sm hover:border-[#ff6b00] hover:text-[#ff6b00] dark:hover:text-[#ff6b00] transition-all hover:scale-105"
                >
                  <span>{currentSlide.secondaryCtaText}</span>
                  <MessageSquare className="size-4 text-[#ff6b00]" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyIp}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-stone-800 dark:text-amber-300 hover:bg-amber-500/20 transition-colors"
                  title="Click to copy Server IP"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono">IP Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5 text-[#ff6b00]" />
                      <span className="font-mono text-[11px] text-stone-700 dark:text-stone-300">IP: 125.16.185.22:25590</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Footnote Micro-copy */}
            <div className="mt-8 pt-4 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
              <Sparkles className="size-3.5 text-[#ff6b00]" />
              <span>{currentSlide.microCopy}</span>
            </div>
          </div>

          {/* Right Column: Framed Minecraft Artwork & Carousel Navigation */}
          <div className="relative flex flex-col justify-between lg:col-span-5 h-full min-h-[340px] sm:min-h-[400px]">
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] rounded-3xl overflow-hidden border border-stone-300/70 dark:border-stone-800/80 shadow-2xl bg-stone-900 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={currentSlide.titleLine1}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full object-cover object-center absolute inset-0"
                />
              </AnimatePresence>

              {/* Gradient shading for framing */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Bottom right slide counter controls inside the image frame */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1.5">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="flex size-7 items-center justify-center rounded-full text-white hover:text-[#ff6b00] transition-colors"
                >
                  <ArrowLeft className="size-3.5" />
                </button>

                <div className="flex items-center gap-2 font-mono text-xs font-bold text-white px-1">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`transition-all ${
                        activeSlide === idx
                          ? 'text-[#ff6b00] font-black text-sm'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {s.number}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="flex size-7 items-center justify-center rounded-full text-white hover:text-[#ff6b00] transition-colors"
                >
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Requirement / Feature Cards Grid (CherryCraft Reference Bottom Bar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {bottomPills.map((pill, idx) => {
          const IconComp = pill.icon
          return (
            <div
              key={idx}
              className="group flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white/90 p-4 sm:p-5 shadow-sm transition-all hover:border-[#ff6b00]/50 hover:shadow-md dark:border-stone-800/90 dark:bg-[#111219]/90"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#ff6b00]/10 text-[#ff6b00] transition-transform group-hover:scale-110">
                <IconComp className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-stone-900 dark:text-white text-base sm:text-lg leading-tight group-hover:text-[#ff6b00] transition-colors">
                  {pill.title}
                </span>
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                  {pill.subtitle}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
 )
}
