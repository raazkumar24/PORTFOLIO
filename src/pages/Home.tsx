import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { ArrowUpRight, FileText, Briefcase, Rocket, Zap, ShieldCheck } from 'lucide-react'
import { personalInfo, stats, projects, techItems } from '../data/portfolio'
import { MagneticButton } from '../components/MagneticButton'
import { GlassSurface } from '../components/GlassSurface'

const getSocialIcon = (label: string, size = 12) => {
  switch (label.toLowerCase()) {
    case 'github':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline mr-1.5 align-middle"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline mr-1.5 align-middle"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'twitter':
    case 'x':
    case 'twitter / x':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="inline mr-1.5 align-middle"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'resume':
      return <FileText size={size} className="inline mr-1.5 align-middle" />
    default:
      return null
  }
}

const SOCIAL_CONFIG: Record<string, { tint: string; hoverTint: string; color: string; glow: string }> = {
  github: {
    tint: 'rgba(61,216,208,0.04)',
    hoverTint: 'rgba(61,216,208,0.12)',
    color: '#3dd8d0',
    glow: '0 0 20px rgba(61,216,208,0.25), 0 0 0 1px rgba(61,216,208,0.4)',
  },
  linkedin: {
    tint: 'rgba(139,92,246,0.04)',
    hoverTint: 'rgba(139,92,246,0.12)',
    color: '#8b5cf6',
    glow: '0 0 20px rgba(139,92,246,0.25), 0 0 0 1px rgba(139,92,246,0.4)',
  },
  twitter: {
    tint: 'rgba(255,255,255,0.04)',
    hoverTint: 'rgba(255,255,255,0.12)',
    color: '#ffffff',
    glow: '0 0 20px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.3)',
  },
  x: {
    tint: 'rgba(255,255,255,0.04)',
    hoverTint: 'rgba(255,255,255,0.12)',
    color: '#ffffff',
    glow: '0 0 20px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.3)',
  },
  resume: {
    tint: 'rgba(236,72,153,0.04)',
    hoverTint: 'rgba(236,72,153,0.12)',
    color: '#ec4899',
    glow: '0 0 20px rgba(236,72,153,0.25), 0 0 0 1px rgba(236,72,153,0.4)',
  },
}

const STATS_CONFIG = [
  {
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #3dd8d0 0%, #8b5cf6 100%)',
    desc: 'Continuous industry growth',
    glow: 'rgba(61,216,208,0.2)',
    tint: 'rgba(61,216,208,0.05)',
    border: 'rgba(61,216,208,0.18)'
  },
  {
    icon: Rocket,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    desc: 'Delivered production-ready',
    glow: 'rgba(139,92,246,0.2)',
    tint: 'rgba(139,92,246,0.05)',
    border: 'rgba(139,92,246,0.18)'
  },
  {
    icon: Zap,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
    desc: 'Optimized runtime speed',
    glow: 'rgba(236,72,153,0.2)',
    tint: 'rgba(236,72,153,0.05)',
    border: 'rgba(236,72,153,0.18)'
  },
  {
    icon: ShieldCheck,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #3dd8d0 100%)',
    desc: 'Highly available systems',
    glow: 'rgba(245,158,11,0.2)',
    tint: 'rgba(245,158,11,0.05)',
    border: 'rgba(245,158,11,0.18)'
  },
]

const APPROACH_CARDS = [
  {
    num: '01',
    title: 'Rigorous Architecture',
    desc: 'Building scalable, maintainable systems from day one. I don\'t just patch libraries — I engineer solutions built for the long haul.',
    tint: 'rgba(61,216,208,0.05)',
    border: 'rgba(61,216,208,0.18)',
    glow: 'rgba(61,216,208,0.12)',
    accent: '#3dd8d0',
  },
  {
    num: '02',
    title: 'Obsessive Detail',
    desc: 'Micro-interactions, flawless responsive states, millisecond-level performance. The difference between good and great is in the details.',
    tint: 'rgba(139,92,246,0.05)',
    border: 'rgba(139,92,246,0.18)',
    glow: 'rgba(139,92,246,0.12)',
    accent: '#8b5cf6',
  },
  {
    num: '03',
    title: 'Pixel-Perfect UI',
    desc: 'Design is not decoration — it\'s function. Every pixel is intentional, every animation purposeful, every layout considered.',
    tint: 'rgba(236,72,153,0.05)',
    border: 'rgba(236,72,153,0.18)',
    glow: 'rgba(236,72,153,0.12)',
    accent: '#ec4899',
  },
]

/* ── Typewriter hook ── */
const useTypewriter = (words: string[], speed = 80, pause = 1800) => {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const delay = isDeleting ? speed / 2 : speed

    const timer = setTimeout(() => {
      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), pause)
        return
      }
      if (isDeleting && text === '') {
        setIsDeleting(false)
        setWordIdx((i) => (i + 1) % words.length)
        return
      }
      setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, delay)

    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIdx, words, speed, pause])

  return text
}

/* ── Number counter ── */
const Counter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1600
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current = Math.min(current + increment, target)
          setCount(Math.floor(current))
          if (current >= target) clearInterval(timer)
        }, duration / steps)
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Tech Marquee Items ── */
const MARQUEE_ITEMS = [
  ...(techItems || [
    { label: 'React' }, { label: 'Next.js' }, { label: 'TypeScript' }, { label: 'Node.js' },
    { label: 'WebGL' }, { label: 'Three.js' }, { label: 'Framer Motion' }, { label: 'TailwindCSS' },
    { label: 'GraphQL' }, { label: 'PostgreSQL' }, { label: 'AWS' }, { label: 'Docker' },
  ])
]

export const Home = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const typeText = useTypewriter(personalInfo.roles)

  return (
    <div
      className="w-full min-h-screen relative overflow-hidden"
      style={{ background: 'var(--theme-bg)', color: 'var(--theme-text)' }}
      ref={containerRef}
    >
      {/* ── Background: Grid + Vignette ── */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-0 opacity-45" />
      <div className="absolute inset-0 bg-vignette-radial pointer-events-none z-0" />

      {/* ── Drifting Aurora Orbs ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="aurora-blur aurora-drift"
          style={{
            width: '55vw', height: '55vw',
            background: '#3dd8d0',
            top: '-15%', left: '-10%',
            opacity: 0.07,
          }}
        />
        <div
          className="aurora-blur aurora-drift-reverse"
          style={{
            width: '45vw', height: '45vw',
            background: '#8b5cf6',
            top: '10%', right: '-15%',
            opacity: 0.06,
          }}
        />
        <div
          className="aurora-blur aurora-drift-slow"
          style={{
            width: '30vw', height: '30vw',
            background: '#ec4899',
            bottom: '10%', left: '30%',
            opacity: 0.04,
          }}
        />
      </div>

      {/* ────────────── HERO ────────────── */}
      <section className="min-h-screen w-full relative flex flex-col justify-center px-5 sm:px-8 md:px-16 pt-28 pb-20 overflow-hidden">

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full max-w-7xl mx-auto z-10 flex flex-col items-start"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 md:mb-12"
          >
            <GlassSurface
              as="span"
              radius={999}
              edgeWidth={12}
              strength={18}
              tilt={true}
              tint="rgba(61,216,208,0.09)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 16px',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-text-secondary">Available for work</span>
            </GlassSurface>
          </motion.div>

          {/* Big headline */}
          <div className="flex flex-col mb-8 relative">
            <motion.h1
              className="text-[clamp(1.5rem,11vw,9rem)] font-black leading-[0.85] tracking-tighter text-white uppercase break-normal mix-blend-difference z-10 relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Building <br className="sm:hidden block md:block" />Digital
            </motion.h1>
            <motion.div
              className="flex items-center gap-4 mt-2 md:mt-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[clamp(1.5rem,11vw,9rem)] font-black leading-[0.85] tracking-tighter text-text-secondary uppercase break-normal z-10 relative">
                Futures.
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xl sm:text-2xl font-bold tracking-tight text-white mb-16"
          >
            <span>I'm {personalInfo.firstName}.</span>
            <span className="hidden sm:block text-white/30">—</span>
            <div className="flex items-center">
              <span className="text-accent-cyan">{typeText}</span>
              <span className="animate-pulse text-accent-cyan">|</span>
            </div>
          </motion.div>

          {/* Intro + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-t border-white/[0.08] pt-8"
          >
            <div className="max-w-md">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4">Engineering &amp; Design</p>
              <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed">
                {personalInfo.introText} I engineer robust architectures while obsessed with pixel-perfect interfaces. No generic templates, just uncompromising quality.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[
                ...personalInfo.socialLinks,
                { label: 'Resume', href: personalInfo.resumeUrl },
              ].map((item) => {
                const labelKey = item.label.toLowerCase();
                const config = SOCIAL_CONFIG[labelKey] || SOCIAL_CONFIG.github;
                const isHovered = hoveredSocial === labelKey;
                return (
                  <MagneticButton key={item.label}>
                    <div
                      onMouseEnter={() => setHoveredSocial(labelKey)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <GlassSurface
                        as="a"
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        radius={999}
                        edgeWidth={12}
                        strength={20}
                        tint={isHovered ? config.hoverTint : 'rgba(255,255,255,0.03)'}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 18px',
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: isHovered ? config.color : 'var(--theme-text-muted)',
                          textDecoration: 'none',
                          boxShadow: isHovered ? config.glow : '0 4px 16px rgba(0,0,0,0.2)',
                          borderColor: isHovered ? config.color : 'rgba(255,255,255,0.08)',
                          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: isHovered ? config.color : 'rgba(255,255,255,0.3)',
                            boxShadow: isHovered ? `0 0 10px ${config.color}` : 'none',
                          }}
                        />
                        {getSocialIcon(item.label, 13)}
                        <span>{item.label}</span>
                      </GlassSurface>
                    </div>
                  </MagneticButton>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────── TECH MARQUEE TICKER ────────────── */}
      <section className="py-6 relative z-10 overflow-hidden">
        {/* Divider top */}
        <div className="section-divider mb-6" />

        <div className="overflow-hidden mask-marquee-edges">
          <div className="animate-marquee gap-0" style={{ gap: 0 }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 px-6 text-[11px] font-black tracking-[0.22em] uppercase whitespace-nowrap"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{
                    background: i % 4 === 0 ? '#3dd8d0' : i % 4 === 1 ? '#8b5cf6' : i % 4 === 2 ? '#ec4899' : '#f59e0b',
                    boxShadow: i % 4 === 0 ? '0 0 6px #3dd8d0' : i % 4 === 1 ? '0 0 6px #8b5cf6' : i % 4 === 2 ? '0 0 6px #ec4899' : '0 0 6px #f59e0b',
                  }}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Divider bottom */}
        <div className="section-divider mt-6" />
      </section>

      {/* ────────────── STATS STRIP ────────────── */}
      <section className="py-14 md:py-18 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16">
          <GlassSurface
            radius={30}
            edgeWidth={18}
            strength={28}
            tint="rgba(255,255,255,0.025)"
            className="w-full relative overflow-hidden shimmer-border"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.16), 0 18px 60px rgba(0,0,0,0.38)',
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-[0.025] pointer-events-none" />
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent-cyan/50 to-transparent" />
            <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent-purple/40 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_3fr]">
              <div className="border-b lg:border-b-0 lg:border-r border-white/[0.07] p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-8">
                <div>
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase text-accent-cyan block mb-4">( Impact )</span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase leading-none text-white">
                    Proof in <span className="text-text-secondary">numbers.</span>
                  </h2>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-text-secondary max-w-xs">
                  A quick read on delivery, momentum, and the kind of product quality I optimize for.
                </p>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, idx) => {
                  const config = STATS_CONFIG[idx] || STATS_CONFIG[0];
                  const Icon = config.icon;
                  return (
                    <div
                      key={stat.label}
                      className="group relative min-h-[200px] p-5 sm:p-7 md:p-8 border-white/[0.07] odd:border-r xl:border-r xl:last:border-r-0 border-b xl:border-b-0 last:border-b-0 [&:nth-last-child(2)]:border-b-0 transition-all duration-300"
                      style={{
                        background: 'transparent',
                        transition: 'background 0.4s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = config.tint
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = 'transparent'
                      }}
                    >
                      {/* Top gradient highlight on hover */}
                      <div
                        className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: config.gradient }}
                      />

                      {/* Ambient hover glow */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: config.glow }}
                      />

                      <div className="flex items-start justify-between gap-4 mb-7 relative z-10">
                        <span className="text-[11px] font-black font-mono text-white/30 group-hover:text-accent-cyan transition-colors">
                          /0{idx + 1}
                        </span>
                        <span
                          className="w-10 h-10 rounded-full border flex items-center justify-center bg-black/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/70"
                          style={{
                            borderColor: config.border,
                            boxShadow: `0 0 24px ${config.glow}, inset 0 1px 1px rgba(255,255,255,0.1)`,
                          }}
                        >
                          <Icon size={16} style={{ color: idx === 0 ? '#3dd8d0' : idx === 1 ? '#8b5cf6' : idx === 2 ? '#ec4899' : '#f59e0b' }} />
                        </span>
                      </div>

                      <p
                        className="text-4xl sm:text-5xl font-black leading-none text-white mb-3 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
                        style={{ textShadow: `0 0 30px ${config.glow}` }}
                      >
                        <Counter target={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white mb-1.5 leading-tight relative z-10">
                        {stat.label}
                      </p>
                      <p className="text-xs leading-relaxed text-text-secondary font-sans relative z-10">
                        {config.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassSurface>
        </div>
      </section>

      {/* ────────────── APPROACH — Glass Cards Grid ────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto w-full">

          {/* Section header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-6 block">( Method )</span>
              <h2 className="text-[clamp(1.5rem,8vw,4rem)] font-black leading-[1] tracking-tighter text-white uppercase break-normal">
                Zero Compromise. <br />
                <span className="text-text-secondary">Pure Performance.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-[0.15em] hover:text-accent-cyan transition-colors"
                >
                  <span className="border-b-2 border-white group-hover:border-accent-cyan pb-0.5 transition-colors duration-300">Discover my background</span>
                  <ArrowUpRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* 3 Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {APPROACH_CARDS.map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassSurface
                  radius={24}
                  edgeWidth={16}
                  strength={22}
                  tilt={true}
                  tint={card.tint}
                  className="group h-full"
                  style={{
                    padding: '32px 28px',
                    borderColor: card.border,
                    boxShadow: `inset 0 1px 1px rgba(255,255,255,0.14), 0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${card.border}`,
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    minHeight: 260,
                  }}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${card.glow} 0%, transparent 70%)` }}
                  />

                  {/* Top bar accent */}
                  <div
                    className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }}
                  />

                  <div className="flex items-center justify-between relative z-10">
                    <span className="glass-number" style={{ borderColor: card.border, color: card.accent }}>
                      {card.num}
                    </span>
                    <ArrowUpRight
                      size={18}
                      style={{ color: card.accent, opacity: 0.5 }}
                      className="group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    />
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col justify-end gap-3">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{card.title}</h3>
                    <p className="text-sm text-text-secondary font-sans leading-relaxed">{card.desc}</p>
                  </div>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider mx-5 sm:mx-8 md:mx-16 max-w-7xl xl:mx-auto" />

      {/* ────────────── FEATURED WORK ────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 md:mb-20 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-4 block">( Selected Work )</span>
              <h2 className="text-[clamp(1.5rem,11vw,6rem)] leading-[0.9] font-black tracking-tighter uppercase text-white break-normal">Featured<br />Cases.</h2>
            </motion.div>
            <MagneticButton className="hidden sm:block">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary border border-white/[0.08] px-6 py-3 rounded-full hover:bg-white hover:text-black hover:border-transparent transition-all duration-300"
              >
                View Archive <ArrowUpRight size={14} />
              </Link>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            {projects.filter(p => p.isFeatured).slice(0, 2).map((project, i) => (
              <motion.div
                key={project.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col"
              >
                <GlassSurface
                  radius={20}
                  edgeWidth={16}
                  strength={24}
                  tilt={true}
                  className="w-full aspect-[4/3] relative overflow-hidden mb-6 group/img cursor-pointer"
                  style={{
                    padding: 4,
                    boxShadow: `inset 0 1px 1px rgba(255,255,255,0.18), 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)`,
                  }}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/40 group-hover/img:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Project number tag */}
                    <div className="absolute top-5 left-5 z-20 pointer-events-none">
                      <GlassSurface
                        as="div"
                        radius={10}
                        edgeWidth={10}
                        strength={16}
                        style={{ display: 'inline-block', padding: '6px 14px' }}
                      >
                        <span className="text-xs font-bold tracking-widest text-white uppercase">
                          {project.num}
                        </span>
                      </GlassSurface>
                    </div>

                    {/* Stack tags in bottom left */}
                    <div className="absolute bottom-5 left-5 z-20 pointer-events-none flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.stack.slice(0, 3).map(tech => (
                        <GlassSurface
                          key={tech}
                          as="span"
                          radius={6}
                          edgeWidth={8}
                          strength={14}
                          tint="rgba(0,0,0,0.4)"
                          style={{ display: 'inline-block', padding: '4px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}
                        >
                          {tech}
                        </GlassSurface>
                      ))}
                    </div>

                    <Link
                      to="/projects"
                      className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
                        <ArrowUpRight size={28} />
                      </div>
                    </Link>
                  </div>
                </GlassSurface>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{project.title}</h3>
                    <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">{project.featuredCategory}</p>
                  </div>
                  <span className="text-xs font-black font-mono text-white/20 mt-1">{project.year}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sm:hidden mt-12">
            <Link to="/projects" className="flex w-full justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest border border-white/[0.08] px-6 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300">
              View Archive <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ────────────── BOTTOM CTA — Giant Glass Panel ────────────── */}
      <section className="py-16 md:py-24 px-5 sm:px-8 md:px-16 relative z-10 pb-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassSurface
              radius={32}
              edgeWidth={20}
              strength={32}
              tilt={true}
              tint="rgba(61,216,208,0.03)"
              className="w-full group shimmer-border"
              style={{
                padding: 'clamp(40px, 8vw, 80px)',
                textAlign: 'center',
                borderColor: 'rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.14), 0 30px 80px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 32,
                overflow: 'visible',
              }}
            >
              {/* Radial glow bg */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(61,216,208,0.06) 0%, transparent 70%)' }}
              />

              <div className="relative z-10">
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-text-secondary mb-4">( Next Steps )</p>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                  <Link
                    to="/contact"
                    className="inline-block text-[clamp(1.5rem,10vw,7rem)] font-black tracking-tighter uppercase leading-[0.9] text-white hover:text-outline transition-all duration-300 break-normal"
                  >
                    Start a <br />Project.
                  </Link>
                </motion.div>
              </div>

              <div className="relative z-10 flex flex-wrap justify-center gap-4">
                <MagneticButton>
                  <Link to="/contact">
                    <GlassSurface
                      as="span"
                      radius={999}
                      edgeWidth={14}
                      strength={22}
                      tint="rgba(61,216,208,0.1)"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '12px 28px',
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#3dd8d0',
                        borderColor: 'rgba(61,216,208,0.3)',
                        cursor: 'pointer',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                      Get In Touch
                      <ArrowUpRight size={14} />
                    </GlassSurface>
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <Link to="/projects">
                    <GlassSurface
                      as="span"
                      radius={999}
                      edgeWidth={14}
                      strength={22}
                      tint="rgba(255,255,255,0.03)"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '12px 28px',
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.6)',
                        borderColor: 'rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                      }}
                    >
                      View Work
                      <ArrowUpRight size={14} />
                    </GlassSurface>
                  </Link>
                </MagneticButton>
              </div>
            </GlassSurface>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
