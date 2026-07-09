import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Clock } from 'lucide-react'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    budget: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputBase =
    'bg-transparent border-b border-white/[0.15] focus:border-accent-cyan focus:outline-none text-white placeholder:text-white/[0.2] transition-all duration-300 w-full py-1'

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@rajshekhar.dev', href: 'mailto:hello@rajshekhar.dev' },
    { icon: MapPin, label: 'Location', value: 'India · Remote', href: null },
    { icon: Clock, label: 'Timezone', value: 'IST (GMT+5:30)', href: null },
  ]

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-24 md:pb-40 relative overflow-hidden flex flex-col bg-bg-dark text-text-primary">

      {/* Brutalist Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-6xl w-full mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( Get In Touch )</span>
          <h1 className="text-[clamp(1.5rem,8vw,8rem)] font-black tracking-tighter uppercase mb-6 leading-[0.9] text-white break-words">
            Let's <span className="text-white/40">Talk.</span>
          </h1>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-12 md:gap-16">

          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10"
          >
            <p className="text-base text-text-secondary font-sans leading-relaxed">
              I'm currently available for freelance projects and open to full-time roles at innovative companies. Let's build something incredible together.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 group">
                  <div className="w-9 h-9 rounded-xl glass-card flex items-center justify-center flex-shrink-0 border border-white/[0.06] group-hover:border-accent-cyan/30 group-hover:bg-accent-cyan/5 transition-all duration-300">
                    <Icon size={14} className="text-accent-cyan" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-text-secondary/60 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-white hover:text-accent-cyan transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-medium text-white">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-text-secondary/60 mb-4">Socials</p>
              <div className="flex flex-col gap-3">
                {['LinkedIn', 'GitHub', 'Twitter / X'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="group/link flex items-center justify-between text-sm font-medium text-text-secondary hover:text-white transition-colors"
                  >
                    {s}
                    <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="p-4 rounded-2xl glass-card border border-accent-cyan/15 bg-accent-cyan/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
                </span>
                <p className="text-xs font-bold text-accent-cyan uppercase tracking-widest">Available Now</p>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">Open for new projects. Typical response within 24 hours.</p>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card rounded-[2rem] p-7 sm:p-10 md:p-12 border border-white/[0.06]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-64 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center mb-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3dd8d0" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Message Sent!</h3>
                  <p className="text-text-secondary text-sm">I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-0"
                >
                  <p className="text-xs font-bold tracking-widest uppercase text-text-secondary/60 mb-8">Tell me about your project</p>

                  <div className="text-xl sm:text-2xl md:text-3xl font-black leading-snug tracking-tight flex flex-wrap items-end gap-x-3 gap-y-7">
                    <span className="text-text-secondary">Hi Raj, my name is</span>
                    <div className="relative group/input">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className={`${inputBase} text-xl sm:text-2xl md:text-3xl font-black tracking-tight w-40 sm:w-52`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <span className="text-text-secondary">and I need help with</span>
                    <input
                      type="text"
                      placeholder="web app, e-commerce, etc."
                      className={`${inputBase} text-xl sm:text-2xl md:text-3xl font-black tracking-tight flex-1 min-w-[200px]`}
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      required
                    />

                    <span className="text-text-secondary">Budget:</span>
                    <input
                      type="text"
                      placeholder="$5k – $20k"
                      className={`${inputBase} text-xl sm:text-2xl md:text-3xl font-black tracking-tight w-32 sm:w-40`}
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />

                    <span className="text-text-secondary">Reach me at</span>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className={`${inputBase} text-xl sm:text-2xl md:text-3xl font-black tracking-tight flex-1 min-w-[200px]`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <span className="text-text-secondary">to discuss further.</span>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-12 self-start group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-xs tracking-widest uppercase hover:bg-accent-cyan transition-all duration-300 hover:shadow-[0_0_40px_rgba(61,216,208,0.4)]"
                  >
                    Send Message
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
