import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const skills = [
    'React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Node.js', 
    'WebGL', 'Three.js', 'Framer Motion', 'PostgreSQL', 'GraphQL'
  ];

  return (
    <section id="about" ref={containerRef} className="min-h-screen w-full py-32 px-8 flex flex-col items-center justify-center bg-bg-dark relative z-10 border-t border-white/[0.04] overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left Column - Typography & Story */}
        <motion.div style={{ y: y1 }} className="flex flex-col">
          <h2 className="text-sm font-medium tracking-wide text-text-secondary uppercase mb-8">About & Capabilities</h2>
          <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-8">
            Engineering <br className="hidden lg:block"/>
            <span className="text-text-secondary">meets</span> Design.
          </h3>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl">
            I focus on the intersection of engineering and design, writing clean, robust code while maintaining a sharp eye for aesthetics, typography, and motion. With over 5 years of experience, I build digital experiences that are not only functional but deeply engaging.
          </p>
          
          <div className="mt-12 flex items-center gap-12">
            <div>
              <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">5+</p>
              <p className="text-sm text-text-secondary mt-2 uppercase tracking-wide">Years Exp.</p>
            </div>
            <div className="h-16 w-px bg-white/[0.1]"></div>
            <div>
              <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">50+</p>
              <p className="text-sm text-text-secondary mt-2 uppercase tracking-wide">Projects</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Skills & Capabilities */}
        <motion.div style={{ y: y2 }} className="flex flex-col lg:pl-16">
          <div className="bg-[#0c0c0c] border border-white/[0.04] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h4 className="text-xl font-medium text-white mb-8">Core Capabilities</h4>
            
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span 
                  key={skill} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="px-4 py-2 rounded-full bg-white/[0.03] text-text-primary text-sm border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.2] transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/[0.04]">
              <h4 className="text-xl font-medium text-white mb-6">Our Approach</h4>
              <ul className="space-y-4">
                {[
                  'Performance-first architecture',
                  'Pixel-perfect implementation',
                  'Accessible & inclusive design',
                  'Scalable system architecture'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-text-secondary gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/[0.3]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
