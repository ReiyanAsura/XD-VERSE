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
    ctaText: 'Get Whitelisted',
    ctaHref: '#how-to-join',
    isExternal: false,
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
    ctaText: 'Join Discord Server',
    ctaHref: 'https://discord.gg/csZuFW2UM3',
    isExternal: true,
    metaLabel: 'DISCORD INVITE',
    metaValue: 'discord.gg/csZuFW2UM3',
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
    ctaText: 'Explore Community',
    ctaHref: 'https://discord.gg/csZuFW2UM3',
    isExternal: true,
    metaLabel: 'COMMUNITY STATUS',
    metaValue: '300+ Active Members • 24/7'
  }
]

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [copied, setCopied] = useState(false)
  const [copiedDiscord, setCopiedDiscord] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const slidesCount = slides.length

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Auto-rotate hero slides every 7 seconds
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

  const handleCopyDiscord = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    navigator.clipboard.writeText('https://discord.gg/csZuFW2UM3')
    setCopiedDiscord(true)
    setTimeout(() => setCopiedDiscord(false), 2000)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slidesCount) % slidesCount)
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slidesCount)
  }

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative px-4 py-4 md:px-8 md:py-6"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0d0c11] border border-stone-800/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] transition-colors duration-500">
        
        <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-[#ff6b00]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 size-96 rounded-full bg-[#ff6b00]/10 blur-[140px]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] md:min-h-[660px]">
          
          <div className="relative z-20 flex flex-col justify-between p-8 md:p-12 lg:col-span-7 lg:py-14 lg:pl-16 lg:pr-8">
            
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

            <div className="relative my-8 md:my-10 min-h-[340px] sm:min-h-[360px] flex flex-col justify-center">
              {slides.map((s, i) => {
                const isFirst = i === 0
                return (
                  <div
                    key={s.id}
                    id={`hero-slide-text-${i}`}
                    className={`transition-all duration-700 ease-out ${
                      isFirst
                        ? 'relative z-10 opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'absolute top-0 left-0 w-full z-0 opacity-0 translate-y-5 scale-95 pointer-events-none'
                    }`}
                    style={{
                      transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff6b00]">
                      {s.subtitle}
                    </span>
                    <h1
                      className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-mono drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-[0.95]"
                      style={{
                        fontFamily: 'Impact, "Arial Black", sans-serif',
                        letterSpacing: '-0.02em',
                        textShadow: '0 2px 0 #ff6b00, 0 8px 25px rgba(0,0,0,0.9)'
                      }}
                    >
                      {s.title}
                    </h1>
                    <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-stone-300 font-medium">
                      {s.description}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-6 pointer-events-auto">
                      <a
                        href={s.ctaHref}
                        target={s.isExternal ? '_blank' : undefined}
                        rel={s.isExternal ? 'noreferrer' : undefined}
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#ff6b00] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,107,0,0.4)] transition-all duration-300 hover:bg-[#ff7e22] hover:shadow-[0_0_35px_rgba(255,107,0,0.7)] hover:scale-105 active:scale-95"
                      >
                        <span>{s.ctaText}</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>

                      {s.isDiscord ? (
                        <div className="group flex flex-col justify-center border-l-2 border-[#5865F2]/60 pl-4 transition-colors hover:border-[#5865F2]">
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                            {s.metaLabel}
                          </span>
                          <div className="flex flex-wrap items-center gap-2.5 mt-0.5">
                            <a
                              href="https://discord.gg/csZuFW2UM3"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-sm sm:text-base font-extrabold text-white transition-colors hover:text-[#7289da] hover:underline"
                            >
                              <span>{s.metaValue}</span>
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
                      ) : s.id === 0 ? (
                        <div
                          onClick={handleCopyIp}
                          className="group flex cursor-pointer flex-col justify-center border-l-2 border-[#ff6b00]/40 pl-4 transition-colors hover:border-[#ff6b00]"
                        >
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 group-hover:text-stone-300">
                            {s.metaLabel}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-sm sm:text-base font-extrabold text-white">
                              {s.metaValue}
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
                      ) : (
                        <div className="group flex flex-col justify-center border-l-2 border-emerald-500/60 pl-4 transition-colors hover:border-emerald-400">
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                            {s.metaLabel}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-sm sm:text-base font-extrabold text-emerald-400">
                              {s.metaValue}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative flex flex-col justify-end overflow-hidden lg:col-span-5 min-h-[380px] lg:min-h-full">
            
            <div className="absolute inset-0 z-0 overflow-hidden">
              {slides.map((s, i) => {
                const isFirst = i === 0
                return (
                  <div
                    key={s.id}
                    id={`hero-slide-img-${i}`}
                    className={`absolute inset-0 transition-all duration-700 ${
                      isFirst ? 'z-10 opacity-100 scale-100' : 'z-0 opacity-0 scale-105'
                    }`}
                    style={{
                      transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      className={`h-full w-full ${
                        s.image.endsWith('.png')
                          ? 'object-contain p-6 bg-[#0a0a0d]'
                          : 'object-cover object-center'
                      }`}
                    />
                    {/* Left gradient transition so left text column blends smoothly with right image */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d0c11] to-transparent hidden lg:block" />
                    {/* Top/Bottom subtle gradient for framing */}
                    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0d0c11] via-[#0d0c11]/60 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0d0c11]/60 to-transparent" />
                  </div>
                )
              })}
            </div>

            {/* Pagination / Carousel Slider Counter at Bottom Right (like <- 01 02 03 ->) */}
            <div className="relative z-20 flex items-center justify-center lg:justify-end gap-3 p-8">
              <button
                id="hero-btn-prev"
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
                      id={`hero-num-btn-${idx}`}
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setActiveSlide(idx)
                        if (typeof window !== 'undefined' && (window as any).__switchHeroSlide) {
                          (window as any).__switchHeroSlide(idx)
                        }
                      }}
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
                id="hero-btn-next"
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
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (typeof window === 'undefined') return;
              var slidesData = [
                { title: 'XD VERSE SMP' },
                { title: 'JOIN OUR DISCORD' },
                { title: 'EVENTS & ACTIVE MEMBERS' }
              ];

              window.__heroActiveIndex = 0;
              window.__switchHeroSlide = function(index) {
                if (index < 0) index = slidesData.length - 1;
                if (index >= slidesData.length) index = 0;
                window.__heroActiveIndex = index;

                [0, 1, 2].forEach(function(i) {
                  var textEl = document.getElementById('hero-slide-text-' + i);
                  var imgEl = document.getElementById('hero-slide-img-' + i);
                  var btnEl = document.getElementById('hero-num-btn-' + i);

                  if (i === index) {
                    if (textEl) {
                      textEl.style.opacity = '1';
                      textEl.style.transform = 'translateY(0px) scale(1)';
                      textEl.style.pointerEvents = 'auto';
                      textEl.style.zIndex = '10';
                    }
                    if (imgEl) {
                      imgEl.style.opacity = '1';
                      imgEl.style.transform = 'scale(1)';
                      imgEl.style.zIndex = '10';
                    }
                    if (btnEl) {
                      btnEl.className = 'transition-all duration-300 text-2xl font-black text-[#ff6b00] scale-110 drop-shadow-[0_0_10px_rgba(255,107,0,0.8)]';
                    }
                  } else {
                    if (textEl) {
                      textEl.style.opacity = '0';
                      textEl.style.transform = 'translateY(16px) scale(0.96)';
                      textEl.style.pointerEvents = 'none';
                      textEl.style.zIndex = '0';
                    }
                    if (imgEl) {
                      imgEl.style.opacity = '0';
                      imgEl.style.transform = 'scale(1.05)';
                      imgEl.style.zIndex = '0';
                    }
                    if (btnEl) {
                      btnEl.className = 'transition-all duration-300 text-sm text-stone-500 hover:text-stone-300';
                    }
                  }
                });
              };

              document.addEventListener('click', function(e) {
                var numBtn = e.target ? e.target.closest('[id^="hero-num-btn-"]') : null;
                if (numBtn && numBtn.id) {
                  var idx = parseInt(numBtn.id.replace('hero-num-btn-', ''), 10);
                  if (!isNaN(idx)) window.__switchHeroSlide(idx);
                }
                var prevBtn = e.target ? e.target.closest('#hero-btn-prev') : null;
                if (prevBtn) {
                  window.__switchHeroSlide(window.__heroActiveIndex - 1);
                }
                var nextBtn = e.target ? e.target.closest('#hero-btn-next') : null;
                if (nextBtn) {
                  window.__switchHeroSlide(window.__heroActiveIndex + 1);
                }
              });

              if (!window.__heroTimer) {
                window.__heroTimer = setInterval(function() {
                  window.__switchHeroSlide((window.__heroActiveIndex + 1) % 3);
                }, 7000);
              }
            })();
          `,
        }}
      />
    </section>
  )
}
