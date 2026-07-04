import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projectsData = [
  {
    id: 1,
    title: 'AESTHETICA',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'MONOLITH',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'LUMINA',
    category: 'Lighting Design',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'OBLIVION',
    category: 'Concept Art',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop',
  },
]

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return

    const sections = gsap.utils.toArray('.project-panel')
    
    // Use matchMedia to only pin on larger screens or just handle it cleanly
    const ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5, // Reduced scrub time for tighter response
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.5,
            delay: 0.1,
            ease: "power1.inOut"
          },
          end: () => `+=${wrapperRef.current?.offsetWidth || 0}`,
        },
      })
    }, containerRef)

    return () => {
      ctx.revert() // Cleaner cleanup
    }
  }, [])

  return (
    <section id="projects" ref={containerRef} className="h-screen w-full bg-[#050505] overflow-hidden relative border-t border-white/[0.04]">
      <div className="absolute top-12 left-12 z-10">
        <h2 className="text-sm font-medium tracking-wide text-text-secondary uppercase">Selected Works</h2>
      </div>
      
      <div ref={wrapperRef} className="h-full w-[400vw] flex will-change-transform">
        {projectsData.map((project, index) => (
          <div 
            key={project.id} 
            className="project-panel w-screen h-full flex items-center justify-center relative px-8 md:px-24"
          >
            <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 z-10 order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-text-secondary font-medium text-sm">0{index + 1}</span>
                  <div className="h-[1px] w-12 bg-white/20"></div>
                  <p className="text-text-secondary font-medium text-sm uppercase">{project.category}</p>
                </div>
                <h3 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black leading-none text-white tracking-tighter mix-blend-difference">
                  {project.title}
                </h3>
              </div>
              <div className="flex-1 w-full aspect-[4/3] md:aspect-[3/4] relative overflow-hidden order-1 md:order-2 group bg-surface">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
