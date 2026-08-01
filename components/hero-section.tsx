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
      <div className="relative mx-auto flex min-h-[580px] max-w-7xl flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/90 p-8 shadow-2xl dark:shadow-stone-950/60 md:min-h-[640px] md:p-16 text-center transition-colors duration-300">
        {/* Full Background Minecraft Ghibli Artwork */}
        <div className="absolute inset-0 z-0">
          <img
            src="./images/minecraft-warm-bg.jpg"
            alt="Warm Studio Ghibli Minecraft landscape background"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Subtle soft white/cream backdrop gradient overlay for perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/40 dark:from-stone-950/95 dark:via-stone-950/85 dark:to-stone-950/50 backdrop-blur-[2px] transition-colors duration-300" />
        </div>

        {/* Text Layer (Positioned on top of background image) */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          {/* Player Trust Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300/80 dark:border-stone-800/80 bg-white/90 dark:bg-stone-900/90 px-4 py-1.5 shadow-sm backdrop-blur-md transition-colors duration-300">
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
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Trusted by <strong className="font-bold text-stone-900 dark:text-white">200+ Players</strong> Worldwide
            </span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-title"
            className="text-balance text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white md:text-6xl md:leading-[1.15]"
          >
            Welcome to <br />
            <span className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent drop-shadow-sm">
              XD VERSE SMP
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl text-balance text-sm font-medium leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base md:text-lg">
            Experience classic vanilla survival enhanced with essential Quality of Life plugins,
            community events, and custom commands — all in one warm, friendly place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#how-to-join"
              className="group flex items-center gap-2 rounded-full bg-black dark:bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:bg-stone-800 dark:hover:bg-blue-500 hover:shadow-2xl active:scale-95"
            >
              <span>Get Whitelisted Now</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={handleCopyIp}
              className="flex items-center gap-2 rounded-full border border-stone-300/90 dark:border-stone-700/80 bg-white/90 dark:bg-stone-800/90 px-7 py-3.5 text-sm font-bold text-stone-900 dark:text-white shadow-md backdrop-blur-md transition-all hover:bg-white dark:hover:bg-stone-800 hover:border-stone-400 active:scale-95"
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
          </div>
        </div>
      </div>
    </section>
  )
}
