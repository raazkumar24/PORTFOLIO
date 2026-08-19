import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { ArrowUpRight, FileText } from 'lucide-react'
import { personalInfo, stats, projects } from '../data/portfolio'
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

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const typeText = useTypewriter(personalInfo.roles)

  return (
    <div
      className="w-full min-h-screen"
      style={{ background: 'var(--theme-bg)', color: 'var(--theme-text)' }}
      ref={containerRef}
    >

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

          {/* Big headline matched to the brutalist site style */}
          <div className="flex flex-col mb-8 relative">
            <motion.h1
              className="text-[clamp(1.5rem,11vw,9rem)] font-black leading-[0.85] tracking-tighter text-white uppercase break-words mix-blend-difference z-10 relative"
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
              <h1 className="text-[clamp(1.5rem,11vw,9rem)] font-black leading-[0.85] tracking-tighter text-text-secondary uppercase break-words z-10 relative">
                Futures.
              </h1>
            </motion.div>

            {/* Interactive 3D element replacing simple blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0"
            >
              {/* <AbstractCubes /> */}
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
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4">Engineering & Design</p>
              <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed">
                {personalInfo.introText} I engineer robust architectures while obsessed with pixel-perfect interfaces. No generic templates, just uncompromising quality.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                ...personalInfo.socialLinks,
                { label: 'Resume', href: personalInfo.resumeUrl },
              ].map((item) => (
                <MagneticButton key={item.label}>
                  <GlassSurface
                    as="a"
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    radius={999}
                    edgeWidth={12}
                    strength={18}
                    tint="rgba(255,255,255,0.06)"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '7px 16px',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--theme-text-muted)',
                      textDecoration: 'none',
                    }}
                  >
                    {getSocialIcon(item.label)}
                    {item.label}
                  </GlassSurface>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────── STATS STRIP ────────────── */}
      <section className="py-10 border-y border-white/[0.04] bg-surface relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <GlassSurface
                key={stat.label}
                radius={20}
                edgeWidth={18}
                strength={28}
                tilt={true}
                tint="rgba(139,92,246,0.07)"
                style={{ padding: '20px 12px', textAlign: 'center' }}
              >
                <p className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tighter" style={{ color: 'var(--theme-text)' }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p style={{ color: 'var(--theme-text-muted)' }} className="text-[10px] mt-1 font-bold uppercase tracking-widest">{stat.label}</p>
              </GlassSurface>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── APPROACH (Replaced generic philosophy) ────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-6 block">( Method )</span>
              <h2 className="text-[clamp(1.5rem,8vw,4rem)] sm:text-5xl md:text-6xl font-black leading-[1] tracking-tighter text-white uppercase break-words">
                Zero Compromise. <br />
                <span className="text-text-secondary">Pure Performance.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center space-y-6 lg:pt-2"
            >
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-white">01</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Rigorous Architecture</h3>
                  <p className="text-text-secondary font-sans leading-relaxed">
                    Building scalable, maintainable systems from day one. I don't just patch together libraries; I engineer solutions designed for the long haul.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-white">02</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Obsessive Detail</h3>
                  <p className="text-text-secondary font-sans leading-relaxed">
                    Micro-interactions, flawless responsive states, and millisecond-level performance optimizations. The difference between good and great is in the details.
                  </p>
                </div>
              </div>

              <MagneticButton>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-[0.15em] hover:text-accent-cyan transition-colors self-start mt-6"
                >
                  <span className="border-b-2 border-white group-hover:border-accent-cyan pb-0.5 transition-colors duration-300">Discover my background</span>
                  <ArrowUpRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────── FEATURED WORK (Cleaner layout) ────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 md:px-16 bg-surface relative z-10 rounded-t-[2.5rem] md:rounded-t-[4rem] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 md:mb-20 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-4 block">( Selected Work )</span>
              <h2 className="text-[clamp(1.5rem,11vw,6rem)] leading-[0.9] font-black tracking-tighter uppercase text-white break-words">Featured<br />Cases.</h2>
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
                  style={{ padding: 4 }}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/40 group-hover/img:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

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

      {/* ────────────── FOOTER / CTA ────────────── */}
      <footer className="py-24 md:py-36 px-5 sm:px-8 md:px-16 relative z-10 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-text-secondary mb-6">( Next Steps )</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                to="/contact"
                className="inline-block text-[clamp(1.5rem,10vw,7rem)] font-black tracking-tighter uppercase leading-[0.9] text-white hover:text-outline transition-all duration-300 break-words"
              >
                Start a <br />Project.
              </Link>
            </motion.div>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-24 pt-8 border-t border-white/[0.06] text-text-secondary text-xs font-bold uppercase tracking-widest gap-6">
            <p>© {new Date().getFullYear()} {personalInfo.firstName} {personalInfo.lastName}.</p>
            <div className="flex gap-6">
              {personalInfo.socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="hover:text-white transition-colors flex items-center gap-1.5">
                  {getSocialIcon(s.label, 14)}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
