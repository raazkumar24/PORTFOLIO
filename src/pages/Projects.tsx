import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projectsData = [
  {
    id: 1,
    title: 'NEXUS',
    client: 'Fintech Startup',
    role: 'Lead Architect',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    description: 'A complete overhaul of a legacy financial dashboard. The challenge was rendering tens of thousands of data points in real-time without dropping frames. We implemented a custom WebGL renderer paired with a Next.js frontend, resulting in a 300% performance increase.',
    stack: ['Next.js', 'WebGL', 'TypeScript', 'Tailwind', 'Zustand']
  },
  {
    id: 2,
    title: 'AURA',
    client: 'Luxury Brand',
    role: 'Creative Developer',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop',
    description: 'An award-winning e-commerce experience that feels more like an editorial magazine than a store. Features include smooth page transitions, complex scroll-linked animations, and a bespoke headless Shopify integration.',
    stack: ['React', 'Framer Motion', 'Shopify Storefront API', 'GSAP']
  },
  {
    id: 3,
    title: 'SYNAPSE',
    client: 'AI Research Lab',
    role: 'Full Stack Engineer',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1600&auto=format&fit=crop',
    description: 'Developed the user interface and API middleware for a complex machine learning visualization tool. Users can upload datasets and watch neural networks train in real-time via websockets.',
    stack: ['Vue.js', 'Node.js', 'WebSockets', 'Python', 'D3.js']
  },
]

export const Projects = () => {
  return (
    <div className="w-full min-h-screen bg-bg-dark pt-32 text-text-primary pb-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        
        {/* PAGE HEADER */}
        <div className="mb-32">
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter uppercase mb-6">
            Selected <br/> <span className="text-outline">Works.</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl font-sans leading-relaxed">
            A curated collection of projects that demonstrate my approach to engineering and design. No fluff, just results.
          </p>
        </div>

        {/* EDITORIAL VERTICAL LAYOUT */}
        <div className="flex flex-col gap-32 md:gap-48">
          {projectsData.map((project, index) => (
            <div key={project.id} className="project-container flex flex-col relative">
              
              {/* Project Meta */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">{project.title}</h2>
                  <p className="text-accent-cyan font-bold tracking-widest text-sm uppercase">{project.client}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-white font-medium">{project.role}</p>
                  <p className="text-text-secondary">{project.year}</p>
                </div>
              </div>

              {/* Project Image */}
              <div className="w-full aspect-video md:aspect-[21/9] relative rounded-[2rem] overflow-hidden glass-card p-2 mb-12 group">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold text-white mb-6">The Challenge</h3>
                  <p className="text-text-secondary text-lg font-sans leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold text-white mb-6">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-4 py-2 rounded-lg bg-surface border border-white/[0.05] text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <button className="mt-12 px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-accent-cyan hover:text-bg-dark transition-colors uppercase">
                    View Live Site
                  </button>
                </div>
              </div>
              
              {/* Divider */}
              {index !== projectsData.length - 1 && (
                <div className="w-full h-px bg-white/[0.05] mt-32" />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
