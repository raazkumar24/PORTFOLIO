import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const experienceData = [
  {
    id: '01',
    role: 'Senior Full Stack Engineer',
    company: 'TechFront Agency',
    period: 'Jan 2023 - Present',
    metrics: ['40% increase in conversion', 'Sub 1s page loads', 'Mentored 5 developers'],
    description: 'Spearheaded the technical direction for all major client projects. Transitioned the agency from legacy React SPA builds to heavily optimized Next.js frameworks. Designed and implemented complex GraphQL APIs to serve data to bespoke WebGL frontends. Instituted rigorous CI/CD pipelines that reduced deployment times by 60%.',
  },
  {
    id: '02',
    role: 'Frontend Architect',
    company: 'Innovate Labs',
    period: 'Mar 2021 - Dec 2022',
    metrics: ['Created internal UI library', 'Zero-downtime migrations', '99.9% uptime'],
    description: 'Responsible for the core frontend architecture of an enterprise-level SaaS product used by 10,000+ daily active users. Built a comprehensive component library from scratch using React, TypeScript, and Tailwind, drastically reducing development time for new features. Refactored critical state management to Zustand, resolving long-standing memory leaks.',
  },
  {
    id: '03',
    role: 'Creative Developer',
    company: 'Studio Nu',
    period: 'Jun 2019 - Feb 2021',
    metrics: ['2 Awwwards wins', 'FWA of the day', '10+ launched sites'],
    description: 'Acted as the bridge between the design and engineering teams. Transformed static Figma files into fluid, interactive, and highly animated web experiences. Mastered GSAP, Framer Motion, and basic Three.js to add the "wow" factor to marketing sites for Fortune 500 brands.',
  },
]

export const Experience = () => {
  const [expandedId, setExpandedId] = useState<string | null>(experienceData[0].id)

  return (
    <div className="w-full min-h-screen bg-bg-dark pt-32 text-text-primary pb-32">
      <div className="max-w-5xl mx-auto px-8 md:px-16">
        
        {/* PAGE HEADER */}
        <div className="mb-24">
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase mb-6">
            The <span className="text-outline">Journey.</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl font-sans leading-relaxed">
            Five years of building, breaking, and optimizing. A track record of turning complex problems into elegant, scalable solutions.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="flex flex-col">
          {experienceData.map((item) => {
            const isExpanded = expandedId === item.id

            return (
              <div key={item.id} className="border-b border-white/[0.05] group/item">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full py-12 flex flex-col md:flex-row md:items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-baseline gap-6 md:gap-16 w-full md:w-auto">
                    <span className="text-accent-cyan font-bold text-xs">{item.id}</span>
                    <h3 className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-text-secondary group-hover/item:text-white'}`}>
                      {item.role}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto mt-6 md:mt-0 gap-8">
                    <span className="text-white font-medium text-sm uppercase tracking-widest">{item.company}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/[0.1] transition-colors duration-500 ${isExpanded ? 'bg-white text-black' : 'text-text-secondary group-hover/item:text-white'}`}
                    >
                      <Plus size={20} strokeWidth={2} />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 pl-10 md:pl-24 pr-4 max-w-4xl flex flex-col gap-8">
                        <p className="text-accent-cyan font-bold text-xs uppercase tracking-widest">{item.period}</p>
                        
                        <div className="flex flex-wrap gap-4">
                          {item.metrics.map(metric => (
                            <div key={metric} className="px-4 py-2 glass-card rounded-lg border border-accent-cyan/20 text-accent-cyan text-sm font-medium">
                              {metric}
                            </div>
                          ))}
                        </div>

                        <p className="text-lg md:text-xl text-text-primary font-sans leading-relaxed opacity-90">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* BOTTOM STATS / CTA */}
        <div className="mt-32 pt-16 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-3xl font-bold mb-2">Ready to see my full resume?</h3>
            <p className="text-text-secondary font-sans">Available upon request for serious inquiries.</p>
          </div>
          <a href="mailto:raj@example.com" className="px-8 py-4 rounded-full bg-accent-cyan text-bg-dark font-bold text-sm tracking-wide hover:bg-white transition-colors uppercase">
            Request PDF
          </a>
        </div>

      </div>
    </div>
  )
}
