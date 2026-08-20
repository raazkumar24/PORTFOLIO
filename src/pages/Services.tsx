import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { services, process } from '../data/portfolio'
import { GlassSurface } from '../components/GlassSurface'

export const Services = () => {
  return (
    <div
      className="w-full min-h-screen pt-28 sm:pt-32 pb-24 md:pb-40 relative overflow-hidden"
      style={{ background: 'var(--theme-bg)', color: 'var(--theme-text)' }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-diagonal-cyber pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-vignette-radial pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( What I Do )</span>
          <h1 className="text-[clamp(1.5rem,8vw,8rem)] font-black tracking-tighter uppercase mb-6 leading-[0.9] text-white break-normal">
            My <span className="text-white/40">Services.</span>
          </h1>
          <p className="text-base sm:text-xl text-text-secondary max-w-2xl font-sans leading-relaxed">
            As a freelance developer, I offer end-to-end web solutions — from design to deployment. Every project gets my full attention, clean code, and on-time delivery.
          </p>
        </motion.div>

        {/* ── SERVICES GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12 mb-24 md:mb-36">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="service-card-wrap group h-full"
              >
                <GlassSurface
                  radius={999}
                  edgeWidth={14}
                  strength={22}
                  tilt={false}
                  className="service-floating-icon flex items-center justify-center bg-black/70"
                >
                  <Icon size={26} style={{ color: service.accent }} className="opacity-85 group-hover:opacity-100 transition-opacity" />
                </GlassSurface>
                <GlassSurface
                  radius={28}
                  edgeWidth={24}
                  strength={36}
                  tilt={false}
                  className="relative flex flex-col h-full min-h-[440px] px-6 pt-12 pb-8 sm:px-8 sm:pt-14 sm:pb-10"
                >
                  {/* Corner glow */}
                  <div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[70px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                    style={{ background: service.accent }}
                  />

                  <div className="flex justify-end items-start mb-7 relative z-10">
                    <span className="text-sm font-mono font-bold text-white/20 group-hover:text-white/60 transition-colors duration-500">
                      /{service.id}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight mb-2 relative z-10 pr-3">{service.title}</h3>
                  <p className="text-sm font-semibold tracking-wide mb-6 relative z-10" style={{ color: service.accent }}>{service.short}</p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-8 relative z-10">{service.description}</p>

                  <div className="space-y-3 mb-8 relative z-10 flex-1">
                    {service.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/80 transition-colors duration-300" />
                        <span className="text-sm text-text-secondary/80 group-hover:text-white/90 transition-colors duration-300">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-px bg-white/[0.04] mb-6 relative z-10 group-hover:bg-white/[0.08] transition-colors duration-500" />

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
                </GlassSurface>
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
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Connector line */}
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(100%+1px)] w-full h-px bg-gradient-to-r from-white/[0.08] to-transparent -translate-y-1/2" />
                )}
                <GlassSurface radius={20} edgeWidth={16} strength={24} tilt={true} style={{ padding: 24, height: '100%' }}>
                  <span className="text-3xl font-black text-accent-cyan/20 block mb-3">{step.num}</span>
                  <h3 className="text-base font-black text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </GlassSurface>
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
        >
          <GlassSurface
            radius={32}
            edgeWidth={28}
            strength={42}
            tilt={true}
            style={{ padding: '48px 32px', textAlign: 'center', position: 'relative' }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 pointer-events-none rounded-[32px]" />

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
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-cyan text-[#060709] font-black text-sm tracking-widest uppercase hover:shadow-[0_0_50px_rgba(61,216,208,0.4)] transition-all duration-300"
              >
                Start a Project <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </GlassSurface>
        </motion.section>

      </div>
    </div>
  )
}
