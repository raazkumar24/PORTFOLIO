import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

const experienceData = [
  {
    id: '01',
    role: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    period: '2024 – Present',
    type: 'Freelance',
    location: 'Remote',
    accent: '#3dd8d0',
    metrics: ['20+ projects delivered', 'Multiple happy clients', 'End-to-end ownership'],
    description:
      'Working independently with clients across various industries to build modern, performant web applications. From ideation to deployment — I handle the full stack: UI design, frontend development, backend APIs, database design, and hosting. Focused on delivering real business value, not just writing code.',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'MongoDB', 'PostgreSQL'],
  },
  {
    id: '02',
    role: 'Frontend Developer',
    company: 'Freelance Projects',
    period: '2023 – 2024',
    type: 'Freelance',
    location: 'Remote',
    accent: '#8b5cf6',
    metrics: ['Landing pages', 'React web apps', 'Responsive design'],
    description:
      'Started freelancing by building landing pages, portfolio websites, and small web apps for local businesses and startups. Focused heavily on learning and applying modern frontend practices — clean code, smooth animations, and mobile-first design. This is where the passion for premium web experiences began.',
    tech: ['React', 'JavaScript', 'CSS', 'HTML', 'Figma'],
  },
]

export const Experience = () => {
  const [expandedId, setExpandedId] = useState<string | null>(experienceData[0].id)

  return (
    <div className="w-full min-h-screen bg-bg-dark pt-28 sm:pt-32 text-text-primary pb-24 md:pb-40">

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur w-[600px] h-[600px] bg-accent-purple top-[-5%] left-[-15%] mix-blend-screen opacity-[0.09]" />
        <div className="aurora-blur w-[500px] h-[500px] bg-accent-cyan bottom-[-15%] right-[-10%] mix-blend-screen opacity-[0.07]" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( Freelance Journey )</span>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter uppercase mb-6 leading-[0.9]">
            The <span className="text-outline">Journey.</span>
          </h1>
          <p className="text-base sm:text-xl text-text-secondary max-w-xl font-sans leading-relaxed">
            2 years of freelancing — learning by doing, building real products for real clients, and growing with every project.
          </p>
        </motion.div>

        {/* ── ACCORDION ── */}
        <div className="flex flex-col border-t border-white/[0.05]">
          {experienceData.map((item, index) => {
            const isExpanded = expandedId === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-white/[0.05]"
              >
                {/* Trigger */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between text-left gap-4 group focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-black text-xs tabular-nums" style={{ color: item.accent }}>{item.id}</span>
                    <div>
                      <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight transition-colors duration-400 ${
                        isExpanded ? 'text-white' : 'text-text-secondary group-hover:text-white'
                      }`}>
                        {item.role}
                      </h2>
                      <p className="text-sm font-bold uppercase tracking-widest text-white/40 mt-1">{item.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-6 sm:ml-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-medium text-text-secondary">{item.period}</p>
                      <p className="text-xs text-text-secondary/60 mt-0.5">{item.type} · {item.location}</p>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-400 ${
                        isExpanded
                          ? 'border-transparent text-black'
                          : 'border-white/[0.08] text-text-secondary group-hover:text-white group-hover:border-white/20'
                      }`}
                      style={isExpanded ? { background: item.accent } : {}}
                    >
                      <ChevronDown size={18} strokeWidth={2} />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 sm:pb-12 pl-6 sm:pl-14 md:pl-20 pr-2 sm:pr-4 flex flex-col gap-8">

                        {/* Mobile period */}
                        <div className="sm:hidden">
                          <p className="text-xs font-medium text-text-secondary">{item.period}</p>
                          <p className="text-xs text-text-secondary/60">{item.type} · {item.location}</p>
                        </div>

                        {/* Metrics */}
                        <div className="flex flex-wrap gap-2.5">
                          {item.metrics.map((metric) => (
                            <span
                              key={metric}
                              className="px-3.5 py-1.5 rounded-full text-xs font-semibold border"
                              style={{
                                borderColor: `${item.accent}33`,
                                background: `${item.accent}0d`,
                                color: item.accent,
                              }}
                            >
                              {metric}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed max-w-2xl">
                          {item.description}
                        </p>

                        {/* Tech */}
                        <div>
                          <p className="text-[10px] font-bold tracking-widest uppercase text-text-secondary/60 mb-3">Technologies Used</p>
                          <div className="flex flex-wrap gap-2">
                            {item.tech.map((t) => (
                              <span key={t} className="px-3 py-1.5 rounded-lg glass-card text-xs font-medium text-text-primary">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-28 pt-12 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">Open to new projects!</h3>
            <p className="text-text-secondary font-sans text-sm sm:text-base">Available for freelance work. Let's build something great.</p>
          </div>
          <a
            href="mailto:hello@rajshekhar.dev"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent-cyan text-bg-dark font-black text-xs tracking-widest uppercase hover:shadow-[0_0_40px_rgba(61,216,208,0.4)] hover:scale-105 transition-all duration-300"
          >
            Let's Talk
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </div>
  )
}
