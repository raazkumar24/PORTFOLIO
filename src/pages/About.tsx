import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import profileImg from '../assets/profile.jpeg';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const skills = [
  { name: 'React & React Native', level: 95 },
  { name: 'Next.js 14', level: 92 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js & Express', level: 88 },
  { name: 'WebGL & Three.js', level: 75 },
  { name: 'Framer Motion', level: 85 },
  { name: 'GSAP', level: 80 },
  { name: 'PostgreSQL', level: 82 },
  { name: 'GraphQL', level: 78 },
  { name: 'AWS', level: 72 },
  { name: 'Docker', level: 70 },
  { name: 'TailwindCSS', level: 96 },
];

/* TODO: Add real timeline later
const timeline = [
  {
    year: '2023 – Present',
    title: 'Senior Full Stack Engineer',
    company: 'TechFront Agency',
    desc: 'Leading transition from legacy monoliths to Next.js micro-frontends. Orchestrated a team of 5 to deliver a bespoke e-commerce platform that increased conversion rates by 40%.',
    highlights: ['40% conversion boost', 'Sub-1s loads', '5-person team'],
  },
  {
    year: '2021 – 2023',
    title: 'Frontend Architect',
    company: 'Innovate Labs',
    desc: 'Responsible for the core frontend architecture of an enterprise SaaS product with 10,000+ daily active users. Built a comprehensive component library from scratch.',
    highlights: ['10k+ daily users', 'Zero-downtime migrations', '99.9% uptime'],
  },
  {
    year: '2019 – 2021',
    title: 'Creative Developer',
    company: 'Studio Nu',
    desc: 'Bridged design and engineering. Created award-winning promotional sites using WebGL and advanced CSS animations for Fortune 500 brands.',
    highlights: ['2× Awwwards wins', 'FWA of the day', '10+ launches'],
  },
];
*/

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div className="w-full min-h-screen bg-bg-dark pt-28 sm:pt-32 text-text-primary pb-24 md:pb-40">

      {/* Background */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur w-[700px] h-[700px] bg-accent-purple top-[5%] right-[-20%] mix-blend-screen opacity-[0.09]" />
        <div className="aurora-blur w-[500px] h-[500px] bg-accent-cyan bottom-[10%] left-[-15%] mix-blend-screen opacity-[0.07]" />
      </div> */}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">

        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent-cyan mb-5 block">( About Me )</span>
          <h1 className="text-[clamp(2.5rem,10vw,10rem)] font-black tracking-tighter uppercase mb-6 leading-[0.9]">
            About <span className="text-outline">Raj.</span>
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-white/[0.1] to-transparent" />
        </motion.div>

        {/* ── PROFILE + STORY ── */}
        <section ref={containerRef} className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-24 md:mb-40">

          {/* Image column */}
          <motion.div style={{ y: imgY }} className="w-full lg:w-5/12 lg:sticky lg:top-28 flex-shrink-0">
            <div className="relative rounded-[2rem] overflow-hidden glass-card p-2.5 group">
              <div className="rounded-[1.6rem] overflow-hidden relative aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity duration-700" />
                <img
                  src={profileImg}
                  alt="Raj Shekhar"
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[1.1]"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <p className="text-white font-black text-3xl sm:text-4xl tracking-tighter mix-blend-difference">RAJ SHEKHAR</p>
                  <p className="gradient-text text-xs font-bold tracking-widest uppercase mt-1">Full Stack Developer</p>
                </div>

                {/* Floating badge */}
                <div className="absolute top-5 right-5 z-20 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-[10px] font-bold text-accent-cyan tracking-widest uppercase">Open to Work</p>
                </div>
              </div>
            </div>

            {/* Social links below image */}
            <div className="mt-5 flex gap-3">
              {['GitHub', 'LinkedIn', 'Twitter'].map((s) => (
                <a key={s} href="#" className="flex-1 py-2.5 rounded-xl border border-white/[0.06] text-xs font-medium text-text-secondary text-center hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Story column */}
          <motion.div style={{ y: textY }} className="w-full lg:w-7/12 flex flex-col pt-0 lg:pt-8">
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
            <div className="mt-14 pt-10 border-t border-white/[0.05] grid grid-cols-3 gap-4 sm:gap-8">
              {[
                { num: '2+', label: 'Years Freelancing' },
                { num: '20+', label: 'Projects' },
                { num: '15+', label: 'Happy Clients' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter">{s.num}</p>
                  <p className="text-[10px] sm:text-xs text-text-secondary mt-2 font-bold uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mt-16">
              <h3 className="text-sm font-bold tracking-widest uppercase text-accent-cyan mb-8">Technical Arsenal</h3>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-xl glass-card text-text-primary text-sm font-medium hover:bg-accent-cyan/10 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300 cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="group mt-12 inline-flex items-center gap-3 self-start"
            >
              <span className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:bg-accent-cyan group-hover:border-accent-cyan transition-all duration-300">
                <ArrowUpRight size={16} className="group-hover:text-black transition-colors" />
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-text-secondary group-hover:text-white transition-colors duration-300">Work with me</span>
            </Link>
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
