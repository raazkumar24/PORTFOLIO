import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const experienceData = [
  {
    id: '01',
    role: 'Senior Engineer',
    company: 'Agency XYZ',
    period: '2023 - Present',
    description: 'Leading a team of developers in creating high-end immersive web experiences for global brands. Specializing in WebGL, Three.js, and complex animation choreographies.',
  },
  {
    id: '02',
    role: 'Frontend Developer',
    company: 'TechFlow',
    period: '2021 - 2023',
    description: 'Architected and built scalable React applications. Implemented comprehensive design systems and improved core web vitals across all flagship products.',
  },
  {
    id: '03',
    role: 'Creative Developer',
    company: 'Studio Nu',
    period: '2019 - 2021',
    description: 'Designed and prototyped interactive web concepts. Bridged the gap between design and development by providing production-ready animations and UI components.',
  },
]

export const Experience = () => {
  const [expandedId, setExpandedId] = useState<string | null>(experienceData[0].id)

  return (
    <section id="experience" className="min-h-screen w-full bg-bg-dark py-32 px-8 flex items-center justify-center border-t border-white/[0.04]">
      <div className="max-w-5xl w-full">
        <div className="flex justify-between items-end mb-16 border-b border-white/[0.04] pb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Experience</h2>
          <span className="text-text-secondary font-medium tracking-wide text-sm hidden md:block">Selected History</span>
        </div>
        
        <div className="flex flex-col">
          {experienceData.map((item) => {
            const isExpanded = expandedId === item.id

            return (
              <div key={item.id} className="border-b border-white/[0.04] group/item">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full py-10 flex flex-col md:flex-row md:items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-baseline gap-6 md:gap-16 w-full md:w-auto">
                    <span className="text-text-secondary font-medium text-xs">{item.id}</span>
                    <h3 className={`text-3xl md:text-5xl font-medium tracking-tight transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-text-secondary group-hover/item:text-white'}`}>
                      {item.role}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-8">
                    <span className="text-white font-medium text-sm uppercase tracking-wide">{item.company}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`hidden md:block transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-text-secondary'}`}
                    >
                      <Plus size={24} strokeWidth={1} />
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
                      <div className="pb-10 pl-10 md:pl-24 pr-4 max-w-3xl flex flex-col gap-4">
                        <p className="text-text-secondary font-medium text-xs uppercase tracking-wide">{item.period}</p>
                        <p className="text-lg md:text-xl text-text-primary leading-relaxed opacity-80">
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
      </div>
    </section>
  )
}
