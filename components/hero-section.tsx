'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Copy, Sparkles } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  const [copied, setCopied] = useState(false)

  const handleCopyIp = () => {
    navigator.clipboard.writeText('125.16.185.22:25590')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-[calc(100vh-5rem)] px-4 py-6 md:px-8 md:py-8"
    >
      {/* Main Container with Minecraft Background Image & Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative mx-auto flex min-h-[580px] max-w-7xl flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white p-8 shadow-2xl md:min-h-[640px] md:p-16 text-center"
      >
        {/* Full Background Minecraft Ghibli Artwork */}
        <div className="absolute inset-0 z-0">
          <img
            src="./images/minecraft-warm-bg.jpg"
            alt="Warm Studio Ghibli Minecraft landscape background"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Subtle soft white/cream backdrop gradient overlay for perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/40 backdrop-blur-[2px]" />
        </div>

        {/* Text Layer (Positioned on top of background image) */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          {/* Player Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-md"
          >
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block size-5 rounded-full ring-2 ring-white bg-amber-400 text-[10px] font-bold flex items-center justify-center text-stone-900">
                P1
              </div>
              <div className="inline-block size-5 rounded-full ring-2 ring-white bg-blue-500 text-[10px] font-bold flex items-center justify-center text-white">
                P2
              </div>
              <div className="inline-block size-5 rounded-full ring-2 ring-white bg-emerald-500 text-[10px] font-bold flex items-center justify-center text-white">
                P3
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-700">
              Trusted by <strong className="font-bold text-stone-900">200+ Players</strong> Worldwide
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-balance text-4xl font-extrabold tracking-tight text-stone-900 md:text-6xl md:leading-[1.15]"
          >
            Welcome to <br />
            <span className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent drop-shadow-sm">
              XD VERSE SMP
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-xl text-balance text-sm font-medium leading-relaxed text-stone-700 sm:text-base md:text-lg"
          >
            Experience classic vanilla survival enhanced with essential Quality of Life plugins,
            community events, and custom commands — all in one warm, friendly place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#how-to-join"
              className="group flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:bg-stone-800 hover:shadow-2xl active:scale-95"
            >
              <span>Get Whitelisted Now</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={handleCopyIp}
              className="flex items-center gap-2 rounded-full border border-stone-300/90 bg-white/90 px-7 py-3.5 text-sm font-bold text-stone-900 shadow-md backdrop-blur-md transition-all hover:bg-white hover:border-stone-400 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-600" />
                  <span className="text-emerald-600">IP Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-4 text-blue-600" />
                  <span>Server IP</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
