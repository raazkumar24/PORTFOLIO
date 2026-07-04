import { useState } from 'react'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    budget: '',
    email: ''
  })

  return (
    <div className="w-full min-h-screen pt-32 pb-32 relative overflow-hidden flex flex-col items-center bg-bg-dark text-text-primary">
      
      {/* Background Aurora Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blur w-[600px] h-[600px] bg-accent-purple top-[-10%] left-[-10%] mix-blend-screen opacity-20" />
        <div className="aurora-blur w-[800px] h-[800px] bg-accent-cyan bottom-[-20%] right-[-10%] mix-blend-screen opacity-10" />
      </div>
      
      <div className="max-w-5xl w-full mx-auto px-8 md:px-16 relative z-10 flex flex-col md:flex-row gap-16">
        
        {/* Left Col - Context */}
        <div className="md:w-1/3">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            Let's <br/> <span className="text-outline">Talk.</span>
          </h1>
          <p className="text-lg text-text-secondary font-sans leading-relaxed mb-12">
            I'm currently available for freelance projects and open to discussing full-time roles at innovative companies. 
          </p>
          
          <div className="space-y-6 text-sm font-medium tracking-widest uppercase">
            <div>
              <p className="text-text-secondary mb-1">Email</p>
              <a href="mailto:hello@rajshekhar.dev" className="text-white hover:text-accent-cyan transition-colors">hello@rajshekhar.dev</a>
            </div>
            <div>
              <p className="text-text-secondary mb-1">Socials</p>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-white hover:text-accent-cyan transition-colors">LinkedIn</a>
                <a href="#" className="text-white hover:text-accent-cyan transition-colors">GitHub</a>
                <a href="#" className="text-white hover:text-accent-cyan transition-colors">Twitter / X</a>
              </div>
            </div>
            <div>
              <p className="text-text-secondary mb-1">Local Time</p>
              <p className="text-white">IST (GMT+5:30)</p>
            </div>
          </div>
        </div>

        {/* Right Col - Conversational Form */}
        <div className="md:w-2/3 glass-card p-8 md:p-12 rounded-[2rem]">
          <form className="flex flex-col gap-8 text-2xl md:text-4xl font-bold leading-tight" onSubmit={(e) => e.preventDefault()}>
            
            <div className="flex flex-wrap items-end gap-x-4 gap-y-8">
              <span>Hi Raj, my name is</span>
              <input 
                type="text" 
                placeholder="Your Name"
                className="bg-transparent border-b-2 border-white/[0.2] focus:border-accent-cyan text-white focus:outline-none w-[200px] md:w-[300px] transition-colors placeholder:text-white/[0.2]"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <span>and I have a project about</span>
              <input 
                type="text" 
                placeholder="web app, e-commerce, etc."
                className="bg-transparent border-b-2 border-white/[0.2] focus:border-accent-cyan text-white focus:outline-none w-full transition-colors placeholder:text-white/[0.2]"
                value={formData.project}
                onChange={e => setFormData({...formData, project: e.target.value})}
              />
              <span>I have a budget of around</span>
              <input 
                type="text" 
                placeholder="$10k+"
                className="bg-transparent border-b-2 border-white/[0.2] focus:border-accent-cyan text-white focus:outline-none w-[150px] md:w-[200px] transition-colors placeholder:text-white/[0.2]"
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
              />
              <span>. You can reach me at</span>
              <input 
                type="email" 
                placeholder="email@example.com"
                className="bg-transparent border-b-2 border-white/[0.2] focus:border-accent-cyan text-white focus:outline-none w-full md:w-[400px] transition-colors placeholder:text-white/[0.2]"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <span>to discuss it further.</span>
            </div>
            
            <button className="mt-8 self-start px-10 py-5 rounded-full bg-white text-black font-bold text-sm tracking-widest hover:bg-accent-cyan hover:text-bg-dark transition-colors uppercase shadow-[0_0_40px_rgba(69,162,158,0.3)] hover:shadow-[0_0_60px_rgba(69,162,158,0.6)]">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
