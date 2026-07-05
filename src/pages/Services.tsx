import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Code2, Palette, Smartphone, ShoppingCart, Gauge, Globe } from 'lucide-react'

const services = [
  {
    id: '01',
    icon: Code2,
    title: 'Web Application Development',
    short: 'Full-stack apps that scale.',
    accent: '#3dd8d0',
    description:
      'End-to-end development of modern web applications. From simple CRUD apps to complex dashboards — I handle frontend UI, backend APIs, database design, and deployment.',
    features: ['React / Next.js frontends', 'REST & GraphQL APIs', 'Database design (SQL / NoSQL)', 'Auth & user management', 'Cloud deployment (Vercel, AWS)'],
    price: 'Starting ₹15,000',
  },
  {
    id: '02',
    icon: Palette,
    title: 'Landing Page & Portfolio Design',
    short: 'First impressions that convert.',
    accent: '#8b5cf6',
    description:
      'Beautiful, fast-loading landing pages and personal portfolios that make a strong first impression. Designed to convert visitors into clients with pixel-perfect UI and smooth animations.',
    features: ['Custom UI design', 'Smooth animations (Framer Motion)', 'SEO optimized', 'Mobile-first responsive', 'Fast load times'],
    price: 'Starting ₹8,000',
  },
  {
    id: '03',
    icon: ShoppingCart,
    title: 'E-Commerce Store',
    short: 'Stores built to sell.',
    accent: '#ec4899',
    description:
      'Custom e-commerce websites with product listings, cart, checkout, and payment gateway integration. Built for performance and a smooth shopping experience.',
    features: ['Product catalog & cart', 'Payment gateway (Razorpay / Stripe)', 'Order management', 'Admin dashboard', 'Mobile optimized'],
    price: 'Starting ₹25,000',
  },
  {
    id: '04',
    icon: Smartphone,
    title: 'Responsive UI Design',
    short: 'Looks great on every screen.',
    accent: '#f59e0b',
    description:
      'Converting your existing website or Figma design into a pixel-perfect, fully responsive web interface. Works flawlessly on mobile, tablet, and desktop.',
    features: ['Figma to code', 'Mobile-first approach', 'Cross-browser compatible', 'Tailwind / Custom CSS', 'Smooth micro-interactions'],
    price: 'Starting ₹5,000',
  },
  {
    id: '05',
    icon: Gauge,
    title: 'Website Speed Optimization',
    short: 'Faster sites, better results.',
    accent: '#10b981',
    description:
      'Is your website slow? I audit and optimize performance — reducing load times, fixing Core Web Vitals, and improving your Google ranking.',
    features: ['Performance audit', 'Image & asset optimization', 'Code splitting & lazy loading', 'Core Web Vitals fix', 'Lighthouse score improvement'],
    price: 'Starting ₹6,000',
  },
  {
    id: '06',
    icon: Globe,
    title: 'Website Maintenance & Support',
    short: 'Keep your site running smooth.',
    accent: '#6366f1',
    description:
      'Ongoing monthly support for your website — bug fixes, content updates, feature additions, and making sure everything stays up-to-date and secure.',
    features: ['Bug fixes & updates', 'New feature additions', 'Content updates', 'Security patches', 'Monthly reporting'],
    price: 'Starting ₹3,000/mo',
  },
]

const process = [
  { num: '01', title: 'Discovery Call', desc: 'We talk about your project, goals, and requirements. Free 30-minute call.' },
  { num: '02', title: 'Proposal & Quote', desc: 'I send a detailed proposal with timeline, deliverables, and pricing.' },
  { num: '03', title: 'Design & Build', desc: 'I start building with regular updates so you always know what\'s happening.' },
  { num: '04', title: 'Review & Launch', desc: 'You review, we refine, then we launch. Simple.' },
]

export const Services = () => {
  return (
    <div className="w-full min-h-screen bg-bg-dark pt-28 sm:pt-32 text-text-primary pb-24 md:pb-40">

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur w-[700px] h-[700px] bg-accent-cyan top-[-10%] left-[-20%] mix-blend-screen opacity-[0.08]" />
        <div className="aurora-blur w-[600px] h-[600px] bg-accent-purple bottom-[-10%] right-[-15%] mix-blend-screen opacity-[0.08]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( What I Do )</span>
          <h1 className="text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter uppercase mb-6 leading-[0.9]">
            My <span className="text-outline">Services.</span>
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
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative glass-card rounded-[1.5rem] p-6 sm:p-7 border border-white/[0.05] hover:border-white/[0.10] transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${service.accent}0d 0%, transparent 60%)` }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${service.accent}15`, border: `1px solid ${service.accent}30` }}
                >
                  <Icon size={20} style={{ color: service.accent }} />
                </div>

                {/* Number */}
                <span className="text-[10px] font-black tracking-widest uppercase text-text-secondary/40 mb-3">{service.id}</span>

                {/* Title & short */}
                <h2 className="text-xl font-black text-white tracking-tight mb-1 group-hover:text-white transition-colors">{service.title}</h2>
                <p className="text-sm font-medium mb-4" style={{ color: service.accent }}>{service.short}</p>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-7">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-white/[0.05]">
                  <span className="text-sm font-black text-white">{service.price}</span>
                  <Link
                    to="/contact"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                    style={{ color: service.accent }}
                  >
                    Hire Me <ArrowUpRight size={12} />
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
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-cyan text-bg-dark font-black text-sm tracking-widest uppercase hover:shadow-[0_0_50px_rgba(61,216,208,0.4)] hover:scale-105 transition-all duration-300"
          >
            Start a Project <ArrowUpRight size={16} />
          </Link>
        </motion.section>

      </div>
    </div>
  )
}
