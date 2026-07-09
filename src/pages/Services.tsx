import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { services, process } from '../data/portfolio'

export const Services = () => {
  return (
    <div className="w-full min-h-screen bg-bg-dark pt-28 sm:pt-32 text-text-primary pb-24 md:pb-40">

      {/* Background */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur w-[700px] h-[700px] bg-accent-cyan top-[-10%] left-[-20%] mix-blend-screen opacity-[0.08]" />
        <div className="aurora-blur w-[600px] h-[600px] bg-accent-purple bottom-[-10%] right-[-15%] mix-blend-screen opacity-[0.08]" />
      </div> */}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( What I Do )</span>
          <h1 className="text-[clamp(2.2rem,8vw,8rem)] font-black tracking-tighter uppercase mb-6 leading-[0.9] text-white break-words">
            My <span className="text-white/40">Services.</span>
          </h1>
          <p className="text-base sm:text-xl text-text-secondary max-w-2xl font-sans leading-relaxed">
            As a freelance developer, I offer end-to-end web solutions — from design to deployment. Every project gets my full attention, clean code, and on-time delivery.
          </p>
        </motion.div>

        {/* ── SERVICES GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-24 md:mb-36">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col p-8 sm:p-10 bg-surface/40 hover:bg-surface/80 rounded-[2rem] border border-white/[0.04] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
              >
                {/* Minimal corner glow */}
                <div 
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[70px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                  style={{ background: service.accent }}
                />

                <div className="flex justify-between items-start mb-8 relative z-10">
                  {/* Clean Icon Container */}
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center border border-white/[0.08] bg-black/50 group-hover:bg-black transition-all duration-500 group-hover:scale-110"
                  >
                    <Icon size={22} style={{ color: service.accent }} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {/* Subtle Number */}
                  <span className="text-sm font-mono font-bold text-white/20 group-hover:text-white/60 transition-colors duration-500">
                    /{service.id}
                  </span>
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-black text-white tracking-tight mb-2 relative z-10">{service.title}</h3>
                <p className="text-sm font-semibold tracking-wide mb-6 relative z-10" style={{ color: service.accent }}>{service.short}</p>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-1 relative z-10">{service.description}</p>

                {/* Clean Feature List */}
                <div className="space-y-3 mb-8 relative z-10">
                  {service.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                      <span className="text-sm text-text-secondary/80 group-hover:text-white/90 transition-colors duration-300">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full h-px bg-white/[0.04] mb-6 relative z-10 group-hover:bg-white/[0.08] transition-colors duration-500" />

                {/* Footer / CTA */}
                <div className="flex justify-between items-center mt-auto relative z-10">
                  <div>
                    <span className="block text-[10px] text-text-secondary/50 uppercase tracking-widest font-bold mb-1">Starting At</span>
                    <span className="text-sm font-bold text-white">{service.price}</span>
                  </div>
                  <Link 
                    to="/contact"
                    className="w-12 h-12 rounded-full bg-white/[0.03] group-hover:bg-white flex items-center justify-center transition-all duration-500 border border-white/[0.05]"
                  >
                    <ArrowUpRight size={18} className="text-white/50 group-hover:text-black group-hover:rotate-45 transition-all duration-500" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── HOW I WORK ── */}
        <section className="border-t border-white/[0.05] pt-16 md:pt-24 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16"
          >
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-4 block">( Process )</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter">How I Work.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Connector line */}
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(100%+1px)] w-full h-px bg-gradient-to-r from-white/[0.08] to-transparent -translate-y-1/2" />
                )}
                <div className="glass-card rounded-2xl p-6 border border-white/[0.05] h-full">
                  <span className="text-3xl font-black text-accent-cyan/20 block mb-3">{step.num}</span>
                  <h3 className="text-base font-black text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] overflow-hidden glass-card border border-white/[0.06] p-8 sm:p-12 md:p-16 text-center"
        >
          {/* Gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 pointer-events-none" />

          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( Let's Work Together )</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Got a project <br className="hidden sm:block" />
            <span className="gradient-text">in mind?</span>
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            I'm currently available for new freelance projects. Drop me a message and let's discuss what we can build together.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-cyan text-bg-dark font-black text-sm tracking-widest uppercase hover:shadow-[0_0_50px_rgba(61,216,208,0.4)] transition-all duration-300"
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </motion.section>

      </div>
    </div>
  )
}
