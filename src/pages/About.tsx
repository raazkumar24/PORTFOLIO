import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
// We use profile.png based on the user's uploaded photo choice
import profileImg from '../assets/profile.png';

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const skills = [
    'React & React Native', 'Next.js 14', 'TypeScript', 'Node.js & Express', 
    'WebGL & Three.js', 'Framer Motion', 'GSAP', 'TailwindCSS', 
    'PostgreSQL', 'GraphQL', 'AWS', 'Docker'
  ];

  const timeline = [
    {
      year: "2023 - Present",
      title: "Senior Full Stack Engineer",
      company: "TechFront Agency",
      desc: "Leading the transition from legacy monoliths to highly performant Next.js micro-frontends. Orchestrated a team of 5 to deliver a bespoke e-commerce platform that increased conversion rates by 40%."
    },
    {
      year: "2021 - 2023",
      title: "Frontend Developer",
      company: "Innovate Labs",
      desc: "Specialized in complex state management and interactive data visualizations. Built internal dashboards used by over 10,000 employees daily."
    },
    {
      year: "2019 - 2021",
      title: "Creative Developer",
      company: "Studio Nu",
      desc: "Bridged the gap between design and engineering. Created award-winning promotional sites using WebGL and advanced CSS animations."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-bg-dark pt-32 text-text-primary pb-32">
      {/* Background Aurora */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur w-[800px] h-[800px] bg-accent-purple top-[10%] right-[-20%] mix-blend-screen opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        
        {/* PAGE HEADER */}
        <div className="mb-24">
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase mb-6">
            About <span className="text-outline">Raj.</span>
          </h1>
          <div className="h-px w-full bg-white/[0.1]" />
        </div>

        <section ref={containerRef} className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-32">
          
          {/* Left Column - Image (Sticky) */}
          <motion.div style={{ y: y1 }} className="w-full lg:w-5/12 lg:sticky lg:top-32">
            <div className="w-full aspect-[4/5] relative rounded-[2.5rem] overflow-hidden glass-card group p-2">
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                <img 
                  src={profileImg} 
                  alt="Raj Shekhar" 
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter contrast-125"
                  onError={(e) => {
                    // Fallback to png if jpg fails
                    const target = e.target as HTMLImageElement;
                    if (target.src.endsWith('.jpg')) {
                      target.src = target.src.replace('.jpg', '.png');
                    }
                  }}
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-white font-black text-4xl tracking-tighter mix-blend-difference mb-2">RAJ SHEKHAR</p>
                  <p className="text-accent-cyan text-sm font-bold tracking-widest uppercase">Web Developer</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Deep Story */}
          <motion.div style={{ y: y2 }} className="w-full lg:w-7/12 flex flex-col pt-8">
            <h2 className="text-sm font-bold tracking-widest text-accent-cyan uppercase mb-8">The Backstory</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-12">
              I don't just write code. <br />
              <span className="text-text-secondary">I engineer digital experiences.</span>
            </h3>
            
            <div className="space-y-8 text-lg md:text-xl text-text-secondary font-sans leading-relaxed">
              <p>
                My journey didn't start with dragging and dropping templates. It started with a deep curiosity about how things work under the hood. For me, software development is an art form that requires both rigorous logic and uncompromising creativity.
              </p>
              <p>
                With over 5 years of professional experience, I've navigated the chaotic landscape of modern web development. From wrestling with legacy codebases to architecting pristine Next.js applications from the ground up, I've seen it all. I specialize in the sweet spot where backend stability meets frontend brilliance.
              </p>
              <p className="text-white font-medium border-l-4 border-accent-cyan pl-6 my-12 py-2">
                "A great application is like a swan—graceful and effortless on the surface, powered by furious, precise engineering underneath."
              </p>
              <p>
                When I'm not optimizing render cycles or designing database schemas, I'm constantly exploring new interaction patterns. I believe the web is evolving, and I aim to be at the forefront of that evolution, building sites that users genuinely enjoy interacting with.
              </p>
            </div>
            
            {/* Stats */}
            <div className="mt-16 pt-16 border-t border-white/[0.05] grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">5+</p>
                <p className="text-xs text-text-secondary mt-3 font-bold uppercase tracking-widest">Years Exp.</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">50+</p>
                <p className="text-xs text-text-secondary mt-3 font-bold uppercase tracking-widest">Projects</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">1M+</p>
                <p className="text-xs text-text-secondary mt-3 font-bold uppercase tracking-widest">Lines of Code</p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-24">
              <h4 className="text-xl font-bold text-white mb-8">Technical Arsenal</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span 
                    key={skill} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="px-5 py-3 rounded-xl glass-card text-text-primary text-sm font-medium hover:bg-white hover:text-black transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

          </motion.div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="mt-32 pt-32 border-t border-white/[0.05]">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The Timeline.</h2>
          </div>
          
          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-16 group">
                <div className="md:w-1/4">
                  <p className="text-accent-cyan font-bold tracking-widest text-sm uppercase mt-1">{item.year}</p>
                </div>
                <div className="md:w-3/4 pb-12 border-b border-white/[0.05] group-last:border-none">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-lg text-white/[0.5] mb-6 font-medium">{item.company}</p>
                  <p className="text-text-secondary font-sans leading-relaxed text-lg max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
