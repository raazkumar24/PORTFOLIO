import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Clock } from 'lucide-react'
import { MagneticButton } from '../components/MagneticButton'
import { GlassSurface } from '../components/GlassSurface'
import { personalInfo } from '../data/portfolio'

const getSocialIcon = (type: string, size = 15) => {
  switch (type) {
    case 'linkedin':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline align-middle"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    case 'github':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="inline align-middle"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      )
    case 'twitter':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="inline align-middle"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    default:
      return null
  }
}

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    budget: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const socialLinks = [
    { name: 'LinkedIn', type: 'linkedin', href: 'https://linkedin.com', hoverColor: '#8b5cf6' },
    { name: 'GitHub', type: 'github', href: 'https://github.com', hoverColor: '#3dd8d0' },
    { name: 'Twitter / X', type: 'twitter', href: 'https://x.com', hoverColor: '#ffffff' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputBase =
    'bg-transparent border-b border-white/[0.15] focus:border-accent-cyan focus:outline-none text-white placeholder:text-white/[0.2] transition-all duration-300 w-full py-1'

  const contactInfo = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: MapPin, label: 'Location', value: 'India · Remote', href: null },
    { icon: Clock, label: 'Timezone', value: 'IST (GMT+5:30)', href: null },
  ]

  return (
    <div
      className="w-full min-h-screen pt-28 sm:pt-32 pb-24 md:pb-40 relative overflow-hidden flex flex-col"
      style={{ background: 'var(--theme-bg)', color: 'var(--theme-text)' }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dots-matrix pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-vignette-radial pointer-events-none z-0" />

      <div className="max-w-6xl w-full mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( Get In Touch )</span>
          <h1 className="text-[clamp(1.5rem,8vw,8rem)] font-black tracking-tighter uppercase mb-6 leading-[0.9] text-white break-normal">
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
                  <GlassSurface
                    as="div"
                    radius={999}
                    edgeWidth={14}
                    strength={18}
                    style={{
                      width: 36, height: 36,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} className="text-accent-cyan" />
                  </GlassSurface>
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
                {socialLinks.map((s) => {
                  const isHovered = hoveredSocial === s.name;
                  return (
                    <MagneticButton key={s.name}>
                      <a
                        href={s.href}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        onMouseEnter={() => setHoveredSocial(s.name)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        className="group/link flex items-center justify-between text-sm font-medium transition-colors py-1"
                        style={{ color: isHovered ? '#ffffff' : 'var(--theme-text-muted)' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="transition-all duration-300 group-hover/link:scale-110 flex items-center justify-center" 
                            style={{ color: isHovered ? s.hoverColor : 'var(--theme-text-muted)', opacity: isHovered ? 1 : 0.65 }} 
                          >
                            {getSocialIcon(s.type, 15)}
                          </span>
                          <span>{s.name}</span>
                        </div>
                        <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </MagneticButton>
                  );
                })}
              </div>
            </div>

            {/* Availability badge */}
            <GlassSurface
              radius={20}
              edgeWidth={16}
              strength={22}
              tint="rgba(61,216,208,0.09)"
              style={{ padding: 16 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
                </span>
                <p className="text-xs font-bold text-accent-cyan uppercase tracking-widest">Available Now</p>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">Open for new projects. Typical response within 24 hours.</p>
            </GlassSurface>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassSurface
              radius={32}
              edgeWidth={28}
              strength={40}
              tilt={true}
              className="px-6 py-8 sm:px-8 sm:py-10"
            >
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

                  {/* Desktop sentence layout */}
                  <div className="hidden sm:flex flex-wrap items-end gap-x-3 gap-y-7 text-xl sm:text-2xl md:text-3xl font-black leading-snug tracking-tight">
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

                  {/* Mobile stacked layout */}
                  <div className="flex sm:hidden flex-col gap-6 w-full text-left">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">My Name Is</label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className={`${inputBase} text-lg font-bold`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">I Need Help With</label>
                      <input
                        type="text"
                        placeholder="web app, e-commerce, etc."
                        className={`${inputBase} text-lg font-bold`}
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">My Budget Is</label>
                      <input
                        type="text"
                        placeholder="$5k – $20k"
                        className={`${inputBase} text-lg font-bold`}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-secondary">Reach Me At</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className={`${inputBase} text-lg font-bold`}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <MagneticButton className="mt-12 self-start">
                    <GlassSurface
                      as="button"
                      type="submit"
                      radius={999}
                      edgeWidth={16}
                      strength={24}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '14px 28px',
                        fontWeight: 900,
                        fontSize: 12,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#060709',
                        background: 'rgba(61,216,208,0.9)',
                        borderColor: 'rgba(61,216,208,0.6)',
                        cursor: 'pointer',
                      }}
                    >
                      Send Message
                      <ArrowUpRight size={14} />
                    </GlassSurface>
                  </MagneticButton>
                </form>
              )}
            </GlassSurface>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
