import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, GitBranch } from 'lucide-react'
import { useState } from 'react'

const projects = [
  {
    id: 1,
    num: '01',
    title: 'NEXUS',
    client: 'Fintech Startup',
    role: 'Lead Architect',
    year: '2025',
    accent: '#3dd8d0',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    description:
      'A complete overhaul of a legacy financial dashboard. We implemented a custom WebGL renderer paired with a Next.js frontend, resulting in a 300% performance increase and real-time data at scale.',
    stack: ['Next.js', 'WebGL', 'TypeScript', 'Tailwind', 'Zustand'],
    metrics: ['300% faster', '50k+ data pts/s', 'Sub 200ms load'],
  },
  {
    id: 2,
    num: '02',
    title: 'AURA',
    client: 'Luxury Brand',
    role: 'Creative Developer',
    year: '2024',
    accent: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop',
    description:
      'An award-winning e-commerce experience that feels more like an editorial magazine than a store. Features smooth page transitions, complex scroll-linked animations, and a bespoke headless Shopify integration.',
    stack: ['React', 'Framer Motion', 'Shopify API', 'GSAP', 'Sanity'],
    metrics: ['Awwwards SOTD', '180% AOV increase', 'FWA nominated'],
  },
  {
    id: 3,
    num: '03',
    title: 'SYNAPSE',
    client: 'AI Research Lab',
    role: 'Full Stack Engineer',
    year: '2024',
    accent: '#ec4899',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1600&auto=format&fit=crop',
    description:
      'User interface and API middleware for a complex ML visualization tool. Users can upload datasets and watch neural networks train in real-time via WebSockets with interactive D3.js charts.',
    stack: ['Vue.js', 'Node.js', 'WebSockets', 'Python', 'D3.js'],
    metrics: ['Real-time viz', '10k dataset pts', '99.9% uptime'],
  },
]

export const Projects = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="w-full min-h-screen bg-bg-dark pt-28 sm:pt-32 text-text-primary pb-24 md:pb-40">

      {/* Background */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur w-[600px] h-[600px] bg-accent-cyan top-[-10%] right-[-15%] mix-blend-screen opacity-[0.08]" />
        <div className="aurora-blur w-[500px] h-[500px] bg-accent-purple bottom-[-10%] left-[-15%] mix-blend-screen opacity-[0.07]" />
      </div> */}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( Portfolio )</span>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter uppercase mb-8 leading-[0.9]">
            Selected<br />
            <span className="text-outline">Works.</span>
          </h1>
          <p className="text-base sm:text-xl text-text-secondary max-w-xl font-sans leading-relaxed">
            A curated collection demonstrating my approach to engineering and design. No fluff—just results.
          </p>
        </motion.div>

        {/* ── PROJECT LIST ── */}
        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group"
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Meta row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                <div className="flex items-baseline gap-5">
                  <span className="text-xs font-black text-text-secondary">{project.num}</span>
                  <div>
                    <h2
                      className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter transition-colors duration-500"
                      style={{ color: hovered === project.id ? project.accent : 'white' }}
                    >
                      {project.title}
                    </h2>
                    <p className="text-sm font-bold tracking-widest uppercase mt-1" style={{ color: project.accent }}>
                      {project.client}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-white font-semibold text-sm">{project.role}</p>
                  <p className="text-text-secondary text-sm">{project.year}</p>
                </div>
              </div>

              {/* Image */}
              <div className="w-full aspect-video sm:aspect-[21/9] relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden glass-card p-2 mb-10 group/img">
                <div className="w-full h-full rounded-[1.2rem] sm:rounded-[1.6rem] overflow-hidden relative">
                  {/* Color tint overlay */}
                  <div
                    className="absolute inset-0 z-10 opacity-0 group-hover/img:opacity-10 transition-opacity duration-700 mix-blend-overlay"
                    style={{ background: project.accent }}
                  />
                  <div className="absolute inset-0 bg-black/30 z-[5] group-hover/img:bg-transparent transition-colors duration-700" />

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale-[60%] group-hover/img:grayscale-0 transition-all duration-[1.2s] ease-out group-hover/img:scale-[1.04]"
                  />

                  {/* Corner badge */}
                  <div className="absolute top-5 right-5 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500">
                    <div className="flex gap-2">
                      <a href="#" className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
                        <GitBranch size={14} />
                      </a>
                      <a href="#" className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 md:gap-16">
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-text-secondary mb-4">The Challenge</h3>
                  <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-text-secondary mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold glass-card border-white/[0.05] text-text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-text-secondary mb-4">Results</h3>
                    <div className="flex flex-col gap-2">
                      {project.metrics.map((m) => (
                        <div key={m} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                          <span className="text-sm font-medium text-white">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#"
                    className="mt-2 inline-flex items-center gap-2 self-start px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                    style={{
                      background: project.accent,
                      color: '#060709',
                    }}
                  >
                    View Live <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Divider */}
              {index < projects.length - 1 && (
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mt-24 md:mt-40" />
              )}
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  )
}
