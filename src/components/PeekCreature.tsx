import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const PeekCreature = () => {
  const containerControls = useAnimation()
  const handControls = useAnimation()
  const visorControls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [customMsg, setCustomMsg] = useState("SYSTEM_READY")
  const isAnimating = useRef(false)
  const location = useLocation()

  const isHoveredRef = useRef(false)
  
  // Keep ref in sync with state for timeouts/intervals
  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  // The animation sequence for peeking out
  const triggerPeek = async (msgToSay?: string, isAuto = false, force = false) => {
    if (isHoveredRef.current && isAuto) return 
    
    // If not forcing and already animating, ignore
    if (isAnimating.current && !force) return
    
    isAnimating.current = true

    if (msgToSay) {
      setCustomMsg(msgToSay)
    } else {
      const cuteMessages = ["PEEK_A_BOO! 🥷", "JUST_CHECKING_IN ✨", "NINJA_HUGS 💜", "HI_THERE! 👀"]
      setCustomMsg(cuteMessages[Math.floor(Math.random() * cuteMessages.length)])
    }

    // 1. Ninja pops in with a playful wobble (faster)
    await containerControls.start({ 
      x: -15, 
      rotate: [-10, 3, 0],
      transition: { type: 'spring', stiffness: 280, damping: 16 } 
    })
    
    // 2. Ninja Hand signs (faster wave)
    await handControls.start({ 
      rotate: [0, -35, 20, -15, 0], 
      y: [40, -5, 0, 0, 40],
      x: [0, -8, 4, 0, 0],
      opacity: [0, 1, 1, 1, 0],
      transition: { duration: 1.3, ease: "easeInOut", times: [0, 0.2, 0.4, 0.8, 1] } 
    })
    
    // 3. Show greeting
    setShowMessage(true)
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Hide if not hovered
    if (!isHoveredRef.current) {
      setShowMessage(false)
      // Swift, clean retreat
      await containerControls.start({ 
        x: 120, 
        rotate: 0,
        transition: { type: 'spring', stiffness: 120, damping: 20 } 
      })
    }
    
    isAnimating.current = false
  }

  // Handle route changes
  useEffect(() => {
    const path = location.pathname.toLowerCase()
    
    let msg = "SYSTEM_READY"
    if (path.includes('about')) msg = "SCANNING_ABOUT"
    else if (path.includes('projects')) msg = "LOADING_PROJECTS"
    else if (path.includes('contact')) msg = "COMM_LINK_OPEN"
    else if (path.includes('experience')) msg = "READING_RECORDS"
    else if (path.includes('services')) msg = "ANALYZING_SERVICES"
    else msg = "SYSTEM_READY"

    // Wait a brief moment after route change before peeking
    const routeTimer = setTimeout(() => {
      // Pass force=true so it ALWAYS peeks on a route change
      triggerPeek(msg, false, true)
    }, 500)

    return () => clearTimeout(routeTimer)
  }, [location.pathname])

  // Periodic auto peek
  useEffect(() => {
    // Auto peek every 15 seconds
    const autoPeekInterval = setInterval(() => {
      triggerPeek(undefined, true, false)
    }, 15000)
    
    // Blinking logic
    const blinkInterval = setInterval(async () => {
      if (!isHoveredRef.current) {
        await visorControls.start({ scaleY: 0.1, transition: { duration: 0.1 } })
        await visorControls.start({ scaleY: 1, transition: { duration: 0.1 } })
      }
    }, 4000)

    return () => {
      clearInterval(autoPeekInterval)
      clearInterval(blinkInterval)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowMessage(true)
    setCustomMsg("INTERACTIVE_MODE")
    
    // Pop out fully and tilt excitedly (faster)
    containerControls.start({ x: -25, rotate: -8, y: -5, transition: { type: 'spring', stiffness: 450, damping: 12 } })
    
    // Eyes become happy (purple and squinty)
    visorControls.start({ 
      backgroundColor: "#a855f7", 
      scaleY: 0.5, 
      scaleX: 1.2,
      borderRadius: "50% 50% 10% 10%", 
      transition: { duration: 0.2 } 
    })

    // Quick, energetic hand wave
    handControls.start({ 
      rotate: [0, -40, 25, -20, 0], 
      y: [30, -10, 0, 0, 30],
      opacity: [0, 1, 1, 1, 0],
      transition: { duration: 1.2 } 
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setShowMessage(false)
    
    // Hide fully
    containerControls.start({ x: 120, rotate: 0, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } })
    
    // Reset eyes
    visorControls.start({ 
      backgroundColor: "#3dd8d0", 
      scaleY: 1, 
      scaleX: 1,
      borderRadius: "50%", 
      transition: { duration: 0.3 } 
    })
  }

  const toggleMobileInteraction = () => {
    if (isHovered) {
      handleMouseLeave()
    } else {
      handleMouseEnter()
    }
  }

  return (
    <motion.div
      initial={{ x: 120 }}
      animate={containerControls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleMobileInteraction}
      className="fixed bottom-0 right-0 z-[100] cursor-pointer flex items-end transition-transform duration-1000 ease-in-out"
      style={{ originX: 0.5, originY: 1 }}
    >
      {/* Invisible Hover Hitbox (Allows hovering even when creature is fully off-screen) */}
      <div className="absolute left-[-60px] bottom-0 w-[60px] h-[120px] bg-transparent" />
      
      {/* Right Hitbox to prevent mouse leave when container translates left */}
      <div className="absolute right-[-40px] bottom-0 w-[40px] h-[120px] bg-transparent" />

      {/* Mobile Pull Tab (Visible hint on mobile so users know where to tap) */}
      <div className="sm:hidden absolute left-[-20px] bottom-12 w-5 h-16 bg-[#11131a] border-y border-l border-white/10 rounded-l-md flex flex-col items-center justify-center gap-1 shadow-[-5px_0_15px_rgba(0,0,0,0.8)] z-50">
        <div className="w-1 h-1 rounded-full bg-accent-cyan shadow-[0_0_5px_#3dd8d0]" />
        <div className="w-1 h-1 rounded-full bg-accent-cyan shadow-[0_0_5px_#3dd8d0]" />
        <div className="w-1 h-1 rounded-full bg-accent-cyan shadow-[0_0_5px_#3dd8d0]" />
      </div>

      {/* Dialogue Box (Premium Cyberpunk Style) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: 15, rotate: -10 }}
        animate={{ opacity: showMessage ? 1 : 0, scale: showMessage ? 1 : 0.3, y: showMessage ? -10 : 15, rotate: showMessage ? 0 : -10 }}
        transition={{ type: "spring", stiffness: 250, damping: 14 }}
        className="absolute bottom-[75%] right-20 mb-0 whitespace-nowrap bg-bg-dark/90 backdrop-blur-md border-l-[3px] border-accent-purple text-white px-5 py-3 rounded-r-lg font-mono text-xs shadow-[0_10px_30px_rgba(139,92,246,0.3)] pointer-events-none origin-bottom-right"
      >
        <span className="text-accent-purple font-black mr-2 tracking-widest">&gt;&gt;</span> 
        <span className="tracking-wide">{customMsg}</span>
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
        
        {/* Speech triangle */}
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-bg-dark/90 border-r border-b border-white/10 transform rotate-45" />
      </motion.div>

      {/* Ninja Cyber-Hood Body */}
      <div className="relative w-[110px] h-[120px] bg-gradient-to-b from-[#11131a] to-[#050608] border-t-[2px] border-l-[2px] border-white/5 rounded-tl-[60px] rounded-tr-[10px] shadow-[-15px_0_40px_rgba(0,0,0,0.9)] z-10 overflow-hidden flex flex-col items-center pt-8">
        
        {/* Hood folds/creases (CSS shapes) */}
        <div className="absolute top-0 left-4 w-12 h-16 bg-white/[0.02] rounded-full transform -rotate-45" />
        <div className="absolute top-2 right-2 w-8 h-20 bg-white/[0.01] rounded-full transform rotate-12" />

        {/* Visor Area (Dark Cutout with Eyes) */}
        <div className="relative w-[80%] h-12 bg-black rounded-lg border-t border-b border-white/10 mt-2 flex items-center justify-center gap-4 overflow-hidden shadow-inner">
          
          {/* Scanlines over visor */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay z-20" />
          
          {/* Eyes instead of scanline */}
          <motion.div animate={visorControls} className="w-4 h-5 rounded-full bg-accent-cyan shadow-[0_0_15px_currentColor] z-10" />
          <motion.div animate={visorControls} className="w-4 h-5 rounded-full bg-accent-cyan shadow-[0_0_15px_currentColor] z-10" />
          
        </div>

        {/* Cyberpunk Collar/Tech details */}
        <div className="mt-4 flex flex-col gap-1.5 items-center w-full px-4">
          <div className="w-[60%] h-[1px] bg-white/20" />
          <div className="flex gap-2 w-[80%] justify-center">
            <div className="w-4 h-1 bg-accent-cyan/30" />
            <div className="w-8 h-1 bg-white/10" />
            <div className="w-2 h-1 bg-accent-purple/50" />
          </div>
          {/* Glowing node */}
          <div className="absolute bottom-6 left-4 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
        </div>
      </div>

      {/* Cyber Ninja Hand (Two fingers up / Peace sign) */}
      <motion.div
        initial={{ rotate: 0, y: 30, opacity: 0 }}
        animate={handControls}
        style={{ originX: 1, originY: 1 }}
        className="absolute -left-6 bottom-10 z-20"
      >
        <div className="relative w-8 h-10 bg-[#161821] border border-white/10 rounded-sm shadow-[-5px_5px_15px_rgba(0,0,0,0.8)] flex justify-center pt-1">
          {/* Knuckles/Armor */}
          <div className="absolute top-3 left-1 w-2 h-2 bg-white/5 rounded-sm" />
          <div className="absolute top-3 right-1 w-2 h-2 bg-white/5 rounded-sm" />
          
          {/* Fingers */}
          <div className="absolute -top-3 left-1 w-2.5 h-5 bg-[#161821] border border-white/10 rounded-t-sm" />
          <div className="absolute -top-4 right-1.5 w-2.5 h-6 bg-[#161821] border border-white/10 rounded-t-sm" />
          
          {/* Cyber glowing wire on hand */}
          <div className="absolute bottom-2 left-2 w-4 h-[1px] bg-accent-cyan shadow-[0_0_5px_rgba(61,216,208,0.8)]" />
        </div>
      </motion.div>

    </motion.div>
  )
}
