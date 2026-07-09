import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState, Fragment } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

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

/* ── Marquee items ── */
import { personalInfo, stats, techItems as baseTechItems, projects } from '../data/portfolio'

const marqueeItems = [...baseTechItems, ...baseTechItems, ...baseTechItems, ...baseTechItems]

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

      {/* ── Fixed Aurora Background ── */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur w-[700px] h-[700px] bg-accent-cyan top-[-25%] left-[-15%] mix-blend-screen animate-float" />
        <div className="aurora-blur w-[600px] h-[600px] bg-accent-purple bottom-[-15%] right-[-15%] mix-blend-screen opacity-[0.10]" style={{ animationDelay: '2s' }} />
        <div className="aurora-blur w-[400px] h-[400px] bg-accent-pink bottom-[20%] left-[30%] mix-blend-screen opacity-[0.05]" style={{ animationDelay: '4s' }} />
      </div> */}

      {/* ────────────── HERO ────────────── */}
      <section className="min-h-screen w-full relative flex flex-col justify-center px-5 sm:px-8 md:px-16 pt-28 pb-20">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full max-w-7xl mx-auto z-10 flex flex-col items-start"
        >
          {/* Status badge - Minimal raw text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-text-secondary">Available for work</span>
            </div>
          </motion.div>

          {/* Big headline */}
          <div className="flex flex-col">
            <motion.h1
              className="text-[clamp(2.2rem,11vw,7rem)] font-black leading-[0.9] tracking-tighter text-white uppercase break-words"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {personalInfo.firstName}
            </motion.h1>
            <motion.h1
              className="text-[clamp(2.2rem,11vw,7rem)] font-black leading-[0.9] tracking-tighter text-text-secondary uppercase break-words"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {personalInfo.lastName}.
            </motion.h1>
          </div>

          {/* Intro + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 md:mt-24 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-t border-white/[0.08] pt-8"
          >
            <div className="max-w-md">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-4">Web Developer</p>
              <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed">
                {personalInfo.introText.split('—').map((part, i, arr) => i === 0 ? <Fragment key={i}>{part}—<br/><em className="text-white not-italic">{arr[1].split('.')[0]}</em>.</Fragment> : null)} Bridging hardcore engineering with premium design.
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
                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-text-secondary mt-1 font-medium uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── INFINITE MARQUEE ────────────── */}
      <section className="py-14 overflow-hidden relative z-10 flex whitespace-nowrap group">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 35 }}
          className="group-hover:[animation-play-state:paused] flex gap-12 items-center px-6 w-max"
        >
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-2xl sm:text-4xl md:text-5xl font-black text-outline hover:text-white transition-all duration-300 cursor-default select-none"
            >
              {item.label}
              <span className="text-accent-cyan text-lg sm:text-2xl opacity-30">✦</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ────────────── PHILOSOPHY ────────────── */}
      <section className="py-20 md:py-32 px-5 sm:px-8 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-6 block">( Philosophy )</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tighter text-white">
                I believe <br />
                <span className="gradient-text">great engineering</span><br />
                should be invisible.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center space-y-6 lg:pt-8"
            >
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                Users shouldn't think about the tech stack, database queries, or state management. They should simply feel the application is <span className="text-white font-medium">remarkably fast, fluid, and intuitive.</span>
              </p>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                My approach combines rigorous architectural planning with an obsessive attention to frontend detail. I write clean, highly optimized code tailored specifically to the problem at hand.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest hover:text-accent-cyan transition-colors self-start mt-2"
              >
                <span className="border-b-2 border-white group-hover:border-accent-cyan pb-0.5 transition-colors duration-300">My full story</span>
                <ArrowUpRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────── FEATURED WORK ────────────── */}
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
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Featured<br />Works.</h2>
            </motion.div>
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-text-secondary border border-white/[0.08] px-5 py-2.5 rounded-full hover:bg-white hover:text-black hover:border-transparent transition-all duration-300"
            >
              View All <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.filter(p => p.isFeatured).slice(0, 2).map((project, i) => (
              <motion.div
                key={project.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div
                  className="aspect-[4/5] sm:aspect-[5/6] md:aspect-[4/5] relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden mb-5 glass-card p-2"
                  style={{ '--proj-accent': project.accent } as React.CSSProperties}
                >
                  <div className="w-full h-full rounded-[1.2rem] sm:rounded-[1.6rem] overflow-hidden relative">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                    {/* Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.08] filter grayscale group-hover:grayscale-0"
                    />

                    {/* Number badge */}
                    <div className="absolute top-5 left-5 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-xs font-black text-white border border-white/10">
                      {project.num}
                    </div>

                    {/* CTA on hover */}
                    <div className="absolute bottom-7 left-7 right-7 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          to="/projects"
                          className="inline-flex items-center gap-2 bg-white text-black font-bold px-5 py-2.5 rounded-full text-sm hover:bg-accent-cyan transition-colors duration-300"
                        >
                          View Case Study <ArrowUpRight size={14} />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start px-1">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors duration-300">{project.title}</h3>
                    <p className="text-sm text-text-secondary">{project.featuredCategory}</p>
                  </div>
                  <Link to="/projects" className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black">
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sm:hidden mt-10">
            <Link to="/projects" className="flex w-full justify-center items-center gap-2 text-sm font-medium border border-white/[0.08] px-5 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300">
              View All Projects <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ────────────── FOOTER / CTA ────────────── */}
      <footer className="py-24 md:py-36 px-5 sm:px-8 md:px-16 relative z-10 border-t border-white/[0.04] overflow-hidden">
        <div className="aurora-blur w-[700px] h-[700px] bg-accent-cyan top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-[0.07]" />

        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-6">Got a project in mind?</p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="group inline-block text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter uppercase leading-[0.9] text-white hover:opacity-80 transition-opacity duration-300 pb-2"
              >
                Let's <span className="text-white/40">Talk.</span>
              </Link>
            </motion.div>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-20 pt-8 border-t border-white/[0.06] text-text-secondary text-xs gap-4">
            <p>© {new Date().getFullYear()} {personalInfo.firstName} {personalInfo.lastName.charAt(0) + personalInfo.lastName.slice(1).toLowerCase()}. All rights reserved.</p>
            <div className="flex gap-6">
              {personalInfo.socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="hover:text-white transition-colors hover-underline">{s.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
