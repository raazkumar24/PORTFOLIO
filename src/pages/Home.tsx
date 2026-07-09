import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState, Fragment } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { personalInfo, stats, projects } from '../data/portfolio'

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
    <div className="w-full min-h-screen bg-bg-dark text-text-primary" ref={containerRef}>

      {/* ────────────── HERO ────────────── */}
      <section className="min-h-screen w-full relative flex flex-col justify-center px-5 sm:px-8 md:px-16 pt-28 pb-20 overflow-hidden">
        
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full max-w-7xl mx-auto z-10 flex flex-col items-start"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 md:mb-12 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-text-secondary">Available for work</span>
          </motion.div>

          {/* Big headline matched to the brutalist site style */}
          <div className="flex flex-col mb-8 relative">
            <motion.h1
              className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.85] tracking-tighter text-white uppercase break-words mix-blend-difference z-10 relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Building <br className="hidden md:block"/>Digital
            </motion.h1>
            <motion.div
              className="flex items-center gap-4 mt-2 md:mt-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.85] tracking-tighter text-text-secondary uppercase break-words z-10 relative">
                Futures.
              </h1>
            </motion.div>
            
            {/* Abstract geometric shape replacing the aurora */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-accent-cyan/20 blur-[60px] rounded-full z-0 pointer-events-none"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xl sm:text-2xl font-bold tracking-tight text-white mb-16"
          >
            <span>I'm {personalInfo.firstName}.</span>
            <span className="hidden sm:block text-white/30">—</span>
            <span className="text-accent-cyan">{typeText}</span>
            <span className="animate-pulse -ml-2 text-accent-cyan">|</span>
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

            <div className="flex flex-wrap gap-6">
              {[
                ...personalInfo.socialLinks,
                { label: 'Resume', href: personalInfo.resumeUrl },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="text-xs font-bold tracking-[0.15em] uppercase text-text-secondary hover:text-white transition-colors duration-300 pb-1 border-b border-transparent hover:border-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────── STATS STRIP ────────────── */}
      <section className="py-10 border-y border-white/[0.04] bg-surface relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-3xl sm:text-4xl font-black text-white tracking-tighter">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] text-text-secondary mt-1 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
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
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1] tracking-tighter text-white uppercase">
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
              
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-[0.15em] hover:text-accent-cyan transition-colors self-start mt-6"
              >
                <span className="border-b-2 border-white group-hover:border-accent-cyan pb-0.5 transition-colors duration-300">Discover my background</span>
                <ArrowUpRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
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
              <h2 className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] font-black tracking-tighter uppercase text-white">Featured<br />Cases.</h2>
            </motion.div>
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary border border-white/[0.08] px-6 py-3 rounded-full hover:bg-white hover:text-black hover:border-transparent transition-all duration-300"
            >
              View Archive <ArrowUpRight size={14} />
            </Link>
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
                <div className="aspect-[4/3] w-full relative rounded-2xl overflow-hidden mb-6 bg-bg-dark border border-white/[0.05]">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  
                  <div className="absolute top-5 left-5 z-20">
                    <div className="bg-bg-dark/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-xs font-bold tracking-widest text-white uppercase">
                      {project.num}
                    </div>
                  </div>

                  <Link
                    to="/projects"
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={24} />
                    </div>
                  </Link>
                </div>

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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="inline-block text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter uppercase leading-[0.9] text-white hover:text-accent-cyan transition-colors duration-300"
              >
                Start a <br/>Project.
              </Link>
            </motion.div>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-24 pt-8 border-t border-white/[0.06] text-text-secondary text-xs font-bold uppercase tracking-widest gap-6">
            <p>© {new Date().getFullYear()} {personalInfo.firstName} {personalInfo.lastName}.</p>
            <div className="flex gap-6">
              {personalInfo.socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="hover:text-white transition-colors">{s.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
