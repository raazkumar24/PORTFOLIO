import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, ShieldCheck, Zap, Code2 } from 'lucide-react'
import { services, process } from '../data/portfolio'
import { GlassSurface } from '../components/GlassSurface'
import { MagneticButton } from '../components/MagneticButton'

export const Services = () => {
  return (
    <div
      className="w-full min-h-screen pt-28 sm:pt-32 pb-24 md:pb-40 relative overflow-hidden"
      style={{ background: 'var(--theme-bg)', color: 'var(--theme-text)' }}
    >
      {/* Background patterns & ambient orbs */}
      <div className="absolute inset-0 bg-blueprint-tech pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-vignette-radial pointer-events-none z-0" />
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-accent-cyan/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-accent-purple/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan block">( What I Do )</span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-mono text-text-secondary uppercase">Production Capabilities</span>
          </div>

          <h1 className="text-[clamp(1.5rem,8vw,8rem)] font-black tracking-tighter uppercase mb-6 leading-[0.9] text-white break-normal">
            My <span className="text-white/40">Services.</span>
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <p className="text-base sm:text-xl text-text-secondary max-w-2xl font-sans leading-relaxed">
              End-to-end web engineering — from custom UI design to resilient backend microservices and zero-downtime deployment. Every project gets my dedicated attention.
            </p>

            <MagneticButton>
              <Link
                to="/contact"
                className="shrink-0 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-white/[0.04] border border-white/[0.1] hover:bg-accent-cyan hover:text-black hover:border-accent-cyan text-white transition-all duration-300 flex items-center gap-2"
              >
                <span>Request Custom Quote</span>
                <ArrowUpRight size={14} />
              </Link>
            </MagneticButton>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-white/[0.1] to-transparent" />
        </motion.div>

        {/* ── CORE VALUES / GUARANTEES STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 md:mb-24"
        >
          {[
            { icon: Zap, label: 'Sub-Second Speed', desc: 'Optimized render cycles & 95+ Core Web Vitals' },
            { icon: Code2, label: 'Clean Architecture', desc: '100% typed, maintainable & modular code' },
            { icon: ShieldCheck, label: 'Direct Communication', desc: 'No middlemen — work directly with the engineer' },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <GlassSurface
                key={idx}
                radius={20}
                edgeWidth={12}
                strength={18}
                tint="rgba(255,255,255,0.02)"
                className="p-5 flex items-center gap-4 border-white/[0.07] hover:border-accent-cyan/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center shrink-0 text-accent-cyan">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-0.5">{item.label}</h4>
                  <p className="text-[11px] text-text-secondary font-sans leading-tight">{item.desc}</p>
                </div>
              </GlassSurface>
            )
          })}
        </motion.div>

        {/* ── SERVICES CARDS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-36">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="h-full group flex flex-col"
              >
                <GlassSurface
                  radius={28}
                  edgeWidth={22}
                  strength={32}
                  tilt={true}
                  className="relative flex flex-col justify-between h-full min-h-[460px] p-7 sm:p-8 hover:border-white/20 transition-all duration-500 overflow-hidden"
                >
                  {/* Top glowing accent line */}
                  <div
                    className="absolute inset-x-8 top-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
                  />

                  {/* Corner ambient glow */}
                  <div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[70px] opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
                    style={{ background: service.accent }}
                  />

                  <div>
                    {/* Top row: Icon Badge & ID Number */}
                    <div className="flex justify-between items-center mb-7 relative z-10">
                      <div
                        className="w-13 h-13 rounded-2xl border flex items-center justify-center bg-black/40 transition-transform duration-300 group-hover:scale-105"
                        style={{
                          borderColor: `${service.accent}40`,
                          backgroundColor: `${service.accent}12`,
                        }}
                      >
                        <Icon size={24} style={{ color: service.accent }} />
                      </div>
                      <span className="text-xs font-mono font-black text-white/30 group-hover:text-white/70 transition-colors">
                        /{service.id}
                      </span>
                    </div>

                    {/* Service Title & Subtitle */}
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 relative z-10 transition-colors duration-300" style={{ color: undefined }}>
                      <span className="group-hover:text-accent-cyan transition-colors duration-300">{service.title}</span>
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider mb-4 relative z-10" style={{ color: service.accent }}>
                      {service.short}
                    </p>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-6 relative z-10 font-sans">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2.5 mb-8 relative z-10 border-t border-white/[0.06] pt-5">
                      {service.features.map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: `${service.accent}20`, color: service.accent }}
                          >
                            <Check size={10} strokeWidth={3} />
                          </span>
                          <span className="text-xs text-text-secondary group-hover:text-white/90 transition-colors duration-300 font-sans">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Row: Price & Action */}
                  <div className="pt-6 border-t border-white/[0.06] flex justify-between items-center mt-auto relative z-10">
                    <div>
                      <span className="block text-[10px] text-text-secondary/60 uppercase tracking-widest font-bold mb-1">Estimated Scope</span>
                      <span className="text-sm font-bold text-white font-mono">{service.price}</span>
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] group-hover:bg-accent-cyan text-white group-hover:text-black border border-white/[0.08] group-hover:border-accent-cyan text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </GlassSurface>
              </motion.div>
            )
          })}
        </div>

        {/* ── HOW I WORK (PROCESS ROADMAP) ── */}
        <section className="border-t border-white/[0.06] pt-16 md:pt-24 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16"
          >
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-4 block">( Structured Execution )</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white uppercase">How I Work.</h2>
            <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-xl font-sans">
              From the first conversation to product deployment, every project follows a transparent 4-stage delivery roadmap.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full"
              >
                {/* Connector line for desktop */}
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-[calc(100%+1px)] w-6 h-px bg-gradient-to-r from-accent-cyan/40 to-transparent -translate-y-1/2 z-20" />
                )}
                <GlassSurface radius={24} edgeWidth={16} strength={24} tilt={true} className="p-6 sm:p-7 h-full flex flex-col justify-between hover:border-accent-cyan/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-accent-cyan">/{step.num}</span>
                      <span className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-xs font-mono text-text-secondary">
                        {i === 0 ? '01' : i === 1 ? '02' : i === 2 ? '03' : '04'}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white uppercase tracking-tight mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">{step.desc}</p>
                  </div>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
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
            style={{ padding: 'clamp(36px, 5vw, 60px) clamp(20px, 4vw, 48px)', textAlign: 'center', position: 'relative' }}
          >
            {/* Ambient glows */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-accent-cyan/15 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-accent-purple/15 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-4 block">( Let's Work Together )</span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white mb-5 leading-[0.95]">
                Got a project <br className="hidden sm:block" />
                <span className="gradient-text">in mind?</span>
              </h2>
              <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed font-sans">
                I'm currently booking new freelance projects and contract engagements. Drop me a message with your requirements.
              </p>
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-cyan text-[#060709] font-black text-xs sm:text-sm tracking-widest uppercase hover:shadow-[0_0_50px_rgba(61,216,208,0.4)] transition-all duration-300"
                >
                  Start a Project <ArrowUpRight size={16} />
                </Link>
              </MagneticButton>
            </div>
          </GlassSurface>
        </motion.section>

      </div>
    </div>
  )
}
