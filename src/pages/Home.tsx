import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

const baseMarqueeItems = [
  "React", "Next.js", "TypeScript", "Node.js", "WebGL", "Three.js", "Framer Motion", "TailwindCSS", "GraphQL", "PostgreSQL"
]
// Duplicate to ensure seamless looping
const marqueeItems = [...baseMarqueeItems, ...baseMarqueeItems, ...baseMarqueeItems, ...baseMarqueeItems]

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div className="w-full min-h-screen bg-bg-dark text-text-primary" ref={containerRef}>
      
      {/* Background Aurora Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blur w-[600px] h-[600px] bg-accent-cyan top-[-20%] left-[-10%] mix-blend-screen" />
        <div className="aurora-blur w-[500px] h-[500px] bg-accent-purple bottom-[-10%] right-[-10%] mix-blend-screen opacity-20" />
      </div>

      {/* HERO SECTION */}
      <section className="min-h-screen w-full relative flex items-center px-8 md:px-16 pt-32 pb-20">
        <motion.div 
          style={{ y: y1, opacity }}
          className="w-full max-w-7xl mx-auto z-10"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase text-accent-cyan">Available for new opportunities</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-[6rem] lg:text-[8rem] xl:text-[9rem] font-black leading-[0.85] tracking-tighter mb-8">
            <span className="block">FULL STACK</span>
            <span className="block text-outline">DEVELOPER</span>
            <span className="block">& CREATIVE.</span>
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-12 md:mt-24 border-t border-white/[0.05] pt-8">
            <div className="max-w-md">
              <p className="text-lg text-text-secondary font-sans leading-relaxed">
                Hi, I'm Raj Shekhar. I build robust, scalable web applications that don't just work flawlessly—they feel incredible to use. Bridging the gap between hardcore engineering and premium design.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-auto px-6 h-12 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white hover:text-black transition-all font-medium text-sm">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-auto px-6 h-12 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white hover:text-black transition-all font-medium text-sm">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-auto px-6 h-12 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white hover:text-black transition-all font-medium text-sm">
                Twitter
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INFINITE MARQUEE */}
      <section className="py-12 border-y border-white/[0.05] bg-surface relative z-10 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex gap-16 items-center px-8 w-max"
        >
          {marqueeItems.map((item, i) => (
            <span key={i} className="text-4xl md:text-6xl font-bold text-outline hover:text-white transition-all cursor-default">
              {item}
            </span>
          ))}
        </motion.div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-16 flex items-center relative z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-accent-cyan mb-6 md:mb-8">( The Philosophy )</h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
              I believe that <br className="hidden md:block"/>
              <span className="text-accent-cyan">great engineering</span> <br className="hidden md:block"/>
              should be invisible.
            </h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center space-y-6 md:space-y-8 text-lg md:text-xl text-text-primary font-sans leading-relaxed"
          >
            <p className="opacity-90">
              Users shouldn't think about the tech stack, the database queries, or the state management. They should simply feel that the application is remarkably fast, fluid, and intuitive.
            </p>
            <p className="opacity-90">
              My approach combines rigorous architectural planning with an obsessive attention to frontend detail. I don't use templates. I don't rely on bloated libraries. I write clean, highly optimized code tailored specifically to the problem at hand.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-white font-bold hover:text-accent-cyan transition-colors self-start mt-4 border-b-2 border-white hover:border-accent-cyan pb-1 text-sm md:text-base uppercase tracking-wider">
              Read my full story <ArrowUpRight size={18} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURED WORK TEASER */}
      <section className="py-32 px-8 md:px-16 bg-surface relative z-10 rounded-t-[3rem] md:rounded-t-[5rem] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-16 md:mb-24">
            <h2 className="text-5xl md:text-7xl font-bold">Featured<br/>Works.</h2>
            <Link to="/projects" className="hidden md:inline-flex items-center gap-2 text-white font-medium border border-white/[0.2] px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all">
              View All Projects <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {[1, 2].map((i) => (
              <div key={i} className="group relative">
                <div className="aspect-[4/5] md:aspect-square bg-bg-dark rounded-3xl overflow-hidden relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop&sig=${i}`} 
                    alt="Project preview" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-8 left-8 z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Link to="/projects" className="inline-flex items-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-full">
                      View Case Study
                    </Link>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Project Name {i}</h3>
                <p className="text-text-secondary">E-Commerce / WebGL</p>
              </div>
            ))}
          </div>
          
          <Link to="/projects" className="md:hidden mt-12 inline-flex w-full justify-center items-center gap-2 text-white font-medium border border-white/[0.2] px-6 py-4 rounded-full hover:bg-white hover:text-black transition-all">
            View All Projects <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* DYNAMIC FOOTER */}
      <footer className="py-32 px-8 md:px-16 relative z-10 border-t border-white/[0.05] overflow-hidden">
        <div className="aurora-blur w-[800px] h-[800px] bg-accent-cyan top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-10" />
        
        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          <p className="text-sm font-medium tracking-wide uppercase text-accent-cyan mb-8">Got a project in mind?</p>
          <Link to="/contact" className="block text-6xl md:text-[8rem] lg:text-[12rem] font-black tracking-tighter hover:text-outline transition-all duration-500">
            LET'S TALK.
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-32 pt-8 border-t border-white/[0.1] text-text-secondary text-sm">
            <p>© {new Date().getFullYear()} Raj Shekhar. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
