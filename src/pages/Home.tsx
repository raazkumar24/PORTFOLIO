import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
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
const techItems = [
  { label: "React" }, { label: "Next.js" }, { label: "TypeScript" }, { label: "Node.js" },
  { label: "WebGL" }, { label: "Three.js" }, { label: "Framer Motion" }, { label: "TailwindCSS" },
  { label: "GraphQL" }, { label: "PostgreSQL" }, { label: "AWS" }, { label: "Docker" },
]
const marqueeItems = [...techItems, ...techItems, ...techItems, ...techItems]

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
  const typeText = useTypewriter(['FULL STACK', 'CREATIVE', 'FRONTEND', 'BACKEND'])

  return (
    <div className="w-full min-h-screen bg-bg-dark text-text-primary" ref={containerRef}>

      {/* ── Fixed Aurora Background ── */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur w-[700px] h-[700px] bg-accent-cyan top-[-25%] left-[-15%] mix-blend-screen animate-float" />
        <div className="aurora-blur w-[600px] h-[600px] bg-accent-purple bottom-[-15%] right-[-15%] mix-blend-screen opacity-[0.10]" style={{ animationDelay: '2s' }} />
        <div className="aurora-blur w-[400px] h-[400px] bg-accent-pink bottom-[20%] left-[30%] mix-blend-screen opacity-[0.05]" style={{ animationDelay: '4s' }} />
      </div> */}

      {/* ────────────── HERO ────────────── */}
      <section className="min-h-screen w-full relative flex flex-col justify-center px-5 sm:px-8 md:px-16 pt-28 pb-20 overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full max-w-7xl mx-auto z-10"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex items-center gap-3 w-fit"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-accent-cyan">Available for work</span>
            </div>
          </motion.div>

          {/* Big headline */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-[clamp(2.5rem,10vw,10rem)] font-black leading-[0.88] tracking-tighter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {['RAJ', 'SHEKHAR'].map((word, i) => (
                <motion.span
                  key={word}
                  className="block overflow-hidden"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className={i === 1 ? 'text-outline' : 'text-white'}>{word}</span>
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 flex items-center gap-4"
          >
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-accent-cyan to-transparent" />
            <span className="text-sm sm:text-base font-mono font-medium text-accent-cyan tracking-wider">
              {typeText}
              <span className="inline-block w-[2px] h-[1em] bg-accent-cyan ml-[2px] align-middle animate-pulse" />
              &nbsp;DEVELOPER
            </span>
          </motion.div>

          {/* Intro + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-t border-white/[0.06] pt-8"
          >
            <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed max-w-sm">
              Building robust, scalable web applications that don't just work—they <em className="text-white not-italic">feel incredible</em> to use. Bridging hardcore engineering with premium design.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { label: 'GitHub', href: 'https://github.com' },
                { label: 'LinkedIn', href: 'https://linkedin.com' },
                { label: 'Resume ↓', href: '#' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group px-5 py-2.5 rounded-full border border-white/[0.08] text-sm font-medium text-text-secondary hover:text-black hover:bg-white hover:border-transparent transition-all duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-text-secondary">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} className="text-text-secondary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────── STATS STRIP ────────────── */}
      <section className="py-10 border-y border-white/[0.04] bg-surface relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: 5, suffix: '+', label: 'Years Experience' },
              { value: 50, suffix: '+', label: 'Projects Shipped' },
              { value: 40, suffix: '%', label: 'Avg. Perf. Gain' },
              { value: 99, suffix: '.9%', label: 'Uptime Delivered' },
            ].map((stat) => (
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
            {[
              {
                title: 'NEXUS Dashboard',
                category: 'Fintech · WebGL',
                num: '01',
                img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
                accent: '#3dd8d0'
              },
              {
                title: 'AURA E-Commerce',
                category: 'Luxury · Editorial',
                num: '02',
                img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop',
                accent: '#8b5cf6'
              },
            ].map((project, i) => (
              <motion.div
                key={project.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.08] filter grayscale group-hover:grayscale-0"
                    />

                    {/* Number badge */}
                    <div className="absolute top-5 left-5 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-xs font-black text-white border border-white/10">
                      {project.num}
                    </div>

                    {/* CTA on hover */}
                    <div className="absolute bottom-7 left-7 right-7 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                      <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 bg-white text-black font-bold px-5 py-2.5 rounded-full text-sm hover:bg-accent-cyan transition-colors duration-300"
                      >
                        View Case Study <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start px-1">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors duration-300">{project.title}</h3>
                    <p className="text-sm text-text-secondary">{project.category}</p>
                  </div>
                  <Link to="/projects" className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black">
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <Link to="/projects" className="sm:hidden mt-10 flex w-full justify-center items-center gap-2 text-sm font-medium border border-white/[0.08] px-5 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            View All Projects <ArrowUpRight size={14} />
          </Link>
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
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-accent-cyan mb-6">Got a project in mind?</p>
            <Link
              to="/contact"
              className="group block text-[clamp(2.5rem,12vw,10rem)] font-black tracking-tighter leading-none hover:text-outline transition-all duration-700 pb-2"
            >
              LET'S<br className="sm:hidden" /> TALK.
            </Link>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-20 pt-8 border-t border-white/[0.06] text-text-secondary text-xs gap-4">
            <p>© {new Date().getFullYear()} Raj Shekhar. All rights reserved.</p>
            <div className="flex gap-6">
              {['LinkedIn', 'GitHub', 'Twitter'].map((s) => (
                <a key={s} href="#" className="hover:text-white transition-colors hover-underline">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
