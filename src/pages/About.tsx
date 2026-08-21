import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import profileImg from '../assets/profile.jpeg';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const getSocialIcon = (label: string, size = 12) => {
  switch (label.toLowerCase()) {
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
          className="inline mr-1.5 align-middle"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
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
          className="inline mr-1.5 align-middle"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'twitter':
    case 'x':
    case 'twitter / x':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="inline mr-1.5 align-middle"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
};
import { personalInfo } from '../data/portfolio';
import { GlassSurface } from '../components/GlassSurface';


export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div
      className="w-full min-h-screen pt-28 sm:pt-32 pb-24 md:pb-40 relative overflow-hidden"
      style={{ background: 'var(--theme-bg)', color: 'var(--theme-text)' }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-blueprint-tech pointer-events-none z-0 opacity-40" />
      <div className="absolute inset-0 bg-vignette-radial pointer-events-none z-0" />

      {/* Aurora Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur aurora-drift" style={{ width: '50vw', height: '50vw', background: '#3dd8d0', top: '-10%', left: '-10%', opacity: 0.06 }} />
        <div className="aurora-blur aurora-drift-reverse" style={{ width: '40vw', height: '40vw', background: '#8b5cf6', bottom: '0%', right: '-8%', opacity: 0.05 }} />
      </div>


      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( Who I Am )</span>
          <h1 className="text-[clamp(1.5rem,8vw,8rem)] font-black tracking-tighter uppercase mb-6 leading-[0.9] text-white break-normal">
            About <span className="text-white/40">Me.</span>
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-white/[0.1] to-transparent" />
        </motion.div>

        {/* ── PROFILE + STORY ── */}
        <section ref={containerRef} className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-24 md:mb-40">

          {/* Image column */}
          <motion.div style={{ y: isMobile ? 0 : imgY }} className="w-full lg:w-5/12 lg:sticky lg:top-28 flex-shrink-0">
            <GlassSurface
              radius={32}
              edgeWidth={28}
              strength={40}
              tilt={true}
              style={{ padding: 10 }}
              className="group"
            >
              <div className="rounded-[1.6rem] overflow-hidden relative aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity duration-700" />
                <img
                  src={profileImg}
                  alt="Raj Shekhar"
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[1.1]"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="text-white font-black text-3xl sm:text-4xl tracking-tighter mix-blend-difference">{personalInfo.firstName} {personalInfo.lastName}</p>
                  <p className="gradient-text text-xs font-bold tracking-widest uppercase mt-1">Full Stack Developer</p>
                </div>

                {/* Floating badge — liquid glass pill */}
                <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <GlassSurface
                    as="div"
                    radius={12}
                    edgeWidth={10}
                    strength={16}
                    style={{ display: 'inline-block', padding: '6px 12px' }}
                  >
                    <p className="text-[10px] font-bold text-accent-cyan tracking-widest uppercase">Open to Work</p>
                  </GlassSurface>
                </div>
              </div>
            </GlassSurface>

            {/* Social pills row */}
            <div className="mt-4 flex gap-2.5">
              {personalInfo.socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-xs font-bold text-text-secondary text-center hover:text-white hover:border-accent-cyan/40 hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  {getSocialIcon(s.label, 13)}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>

            {/* Architectural Profile Details Card */}
            <div className="mt-4">
              <GlassSurface
                radius={24}
                edgeWidth={14}
                strength={24}
                tint="rgba(255,255,255,0.02)"
                className="p-5 sm:p-6 flex flex-col gap-4 border-white/[0.08]"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase text-accent-cyan flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                    Specifications
                  </span>
                  <span className="text-[10px] font-mono text-white/30">/01</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary uppercase tracking-wider font-bold text-[10px]">Location</span>
                    <span className="text-white font-mono font-medium">India · Remote</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary uppercase tracking-wider font-bold text-[10px]">Core Stack</span>
                    <span className="text-white font-mono font-medium">React · Next.js · TS</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary uppercase tracking-wider font-bold text-[10px]">Direct Email</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-accent-cyan font-mono hover:underline font-medium truncate max-w-[150px]"
                    >
                      {personalInfo.email}
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary uppercase tracking-wider font-bold text-[10px]">Status</span>
                    <span className="text-accent-cyan font-mono font-bold">Open for Work</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white text-white hover:text-black border border-white/10 hover:border-transparent text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <span>Download CV / Resume</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </GlassSurface>
            </div>
          </motion.div>

          {/* Story column */}
          <motion.div style={{ y: isMobile ? 0 : textY }} className="w-full lg:w-7/12 flex flex-col pt-0 lg:pt-8">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-6 block">Backstory</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-10">
              I don't just write code.<br />
              <span className="text-text-secondary">I engineer digital experiences.</span>
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-text-secondary font-sans leading-relaxed">
              <p>
                My journey didn't start with drag-and-drop templates. It started with a deep curiosity about how things work under the hood. For me, software development is an art form requiring both rigorous logic and uncompromising creativity.
              </p>
              <p>
                With over 5 years of professional experience, I've navigated the chaotic landscape of modern web development—from wrestling with legacy codebases to architecting pristine Next.js applications from scratch.
              </p>

              <blockquote className="relative pl-6 my-8 py-1 border-l-2 border-accent-cyan">
                <p className="text-white font-medium italic text-lg sm:text-xl leading-snug">
                  "A great application is like a swan—graceful on the surface, powered by furious, precise engineering underneath."
                </p>
              </blockquote>

              <p>
                When I'm not optimizing render cycles, I'm exploring new interaction patterns, studying motion design, and pushing what's possible in the browser. The web is evolving, and I aim to be at the forefront.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-14 pt-10 border-t border-white/[0.05] grid grid-cols-3 gap-3 sm:gap-8">
              {[
                { num: '2+', label: 'Years Freelancing' },
                { num: '20+', label: 'Projects' },
                { num: '15+', label: 'Happy Clients' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">{s.num}</p>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-text-secondary mt-2 font-bold uppercase tracking-wider sm:tracking-widest leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Skills Kinetic Marquee */}
            <div className="mt-16 w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  Technical Arsenal
                </h3>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest hidden sm:inline">
                  ( Hover to pause )
                </span>
              </div>

              {/* Row 1 - Scroll Left */}
              <div className="w-full overflow-hidden py-1 mask-marquee-edges">
                <div className="animate-marquee gap-2.5 flex">
                  {[
                    { name: 'React', accent: '#3dd8d0' },
                    { name: 'Next.js 15', accent: '#ffffff' },
                    { name: 'TypeScript', accent: '#38bdf8' },
                    { name: 'TailwindCSS', accent: '#3dd8d0' },
                    { name: 'WebGL & Three.js', accent: '#ec4899' },
                    { name: 'Framer Motion', accent: '#8b5cf6' },
                    { name: 'GSAP', accent: '#10b981' },
                    { name: 'Node.js', accent: '#22c55e' },
                    { name: 'React', accent: '#3dd8d0' },
                    { name: 'Next.js 15', accent: '#ffffff' },
                    { name: 'TypeScript', accent: '#38bdf8' },
                    { name: 'TailwindCSS', accent: '#3dd8d0' },
                    { name: 'WebGL & Three.js', accent: '#ec4899' },
                    { name: 'Framer Motion', accent: '#8b5cf6' },
                    { name: 'GSAP', accent: '#10b981' },
                    { name: 'Node.js', accent: '#22c55e' },
                  ].map((skill, i) => (
                    <GlassSurface
                      key={`r1-${skill.name}-${i}`}
                      as="span"
                      radius={999}
                      edgeWidth={10}
                      strength={16}
                      tint="rgba(255,255,255,0.03)"
                      className="hover:border-accent-cyan/40 transition-all duration-300 shrink-0 cursor-default"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '7px 16px',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--theme-text)',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: skill.accent, boxShadow: `0 0 8px ${skill.accent}` }}
                      />
                      <span>{skill.name}</span>
                    </GlassSurface>
                  ))}
                </div>
              </div>

              {/* Row 2 - Scroll Right */}
              <div className="w-full overflow-hidden py-1 mt-2.5 mask-marquee-edges">
                <div className="animate-marquee-reverse gap-2.5 flex">
                  {[
                    { name: 'PostgreSQL', accent: '#38bdf8' },
                    { name: 'GraphQL', accent: '#ec4899' },
                    { name: 'Supabase', accent: '#3dd8d0' },
                    { name: 'Docker', accent: '#0db7ed' },
                    { name: 'AWS Cloud', accent: '#f59e0b' },
                    { name: 'REST & WebSockets', accent: '#8b5cf6' },
                    { name: 'Figma UI/UX', accent: '#ec4899' },
                    { name: 'Core Web Vitals', accent: '#10b981' },
                    { name: 'PostgreSQL', accent: '#38bdf8' },
                    { name: 'GraphQL', accent: '#ec4899' },
                    { name: 'Supabase', accent: '#3dd8d0' },
                    { name: 'Docker', accent: '#0db7ed' },
                    { name: 'AWS Cloud', accent: '#f59e0b' },
                    { name: 'REST & WebSockets', accent: '#8b5cf6' },
                    { name: 'Figma UI/UX', accent: '#ec4899' },
                    { name: 'Core Web Vitals', accent: '#10b981' },
                  ].map((skill, i) => (
                    <GlassSurface
                      key={`r2-${skill.name}-${i}`}
                      as="span"
                      radius={999}
                      edgeWidth={10}
                      strength={16}
                      tint="rgba(255,255,255,0.03)"
                      className="hover:border-purple-400/40 transition-all duration-300 shrink-0 cursor-default"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '7px 16px',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--theme-text)',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: skill.accent, boxShadow: `0 0 8px ${skill.accent}` }}
                      />
                      <span>{skill.name}</span>
                    </GlassSurface>
                  ))}
                </div>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="self-start mt-12">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3"
              >
                <span className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:bg-accent-cyan group-hover:border-accent-cyan transition-all duration-300">
                  <ArrowUpRight size={16} className="group-hover:text-black transition-colors" />
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-text-secondary group-hover:text-white transition-colors duration-300">Work with me</span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── TIMELINE (commented out — add real experience later) ── */}
        {/* <section className="pt-16 md:pt-24 border-t border-white/[0.05]">
          ... timeline JSX here ...
        </section> */}

      </div>
    </div>
  );
};
