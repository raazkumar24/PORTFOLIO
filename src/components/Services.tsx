import { motion } from 'framer-motion';
import { Monitor, Code, Smartphone, Palette } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Frontend Architecture',
    description: 'Building scalable, high-performance web applications using modern frameworks like React and Next.js. Focusing on clean code, reusable components, and state management.',
    icon: <Monitor className="w-12 h-12" />,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: '02',
    title: 'Creative Development',
    description: 'Crafting immersive digital experiences with WebGL and advanced animations. Turning static designs into dynamic, interactive interfaces that captivate users.',
    icon: <Palette className="w-12 h-12" />,
    skills: ['Three.js', 'Framer Motion', 'GSAP', 'WebGL']
  },
  {
    id: '03',
    title: 'Backend Integration',
    description: 'Connecting seamless frontends to robust backend architectures. Ensuring secure, fast, and reliable data flow through RESTful APIs and GraphQL endpoints.',
    icon: <Code className="w-12 h-12" />,
    skills: ['Node.js', 'REST APIs', 'GraphQL', 'PostgreSQL']
  },
  {
    id: '04',
    title: 'Responsive Design',
    description: 'Ensuring pixel-perfect implementation across all devices. Mobile-first approach with focus on fluid layouts, responsive typography, and accessibility.',
    icon: <Smartphone className="w-12 h-12" />,
    skills: ['Mobile-First', 'Accessibility', 'CSS Architecture']
  }
];

export const Services = () => {
  return (
    <section id="services" className="min-h-screen w-full bg-bg-dark py-32 px-8 flex flex-col items-center justify-center border-t border-white/[0.04]">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">Specialties</h2>
          </div>
          <p className="text-text-secondary max-w-sm text-sm leading-relaxed">
            Delivering end-to-end digital solutions with a focus on performance, aesthetics, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 md:p-12 rounded-3xl bg-[#0c0c0c] border border-white/[0.04] overflow-hidden hover:bg-[#111111] transition-colors duration-500"
            >
              <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 text-white">
                {service.icon}
              </div>
              
              <span className="text-text-secondary font-medium text-xs mb-8 block tracking-wide">{service.id}</span>
              <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-4 relative z-10">{service.title}</h3>
              <p className="text-text-secondary leading-relaxed mb-12 text-sm md:text-base max-w-md relative z-10">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-8 border-t border-white/[0.04] relative z-10">
                {service.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-full bg-white/[0.03] text-text-primary text-xs border border-white/[0.05]">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
