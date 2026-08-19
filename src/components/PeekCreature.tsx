import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/* ──────────────────────────────────────────────────────────────
 *  PeekCreature — Cyberpunk Ninja (improved, glass-matched)
 *  Matches the portfolio's dark + cyan/purple glass aesthetic.
 * ────────────────────────────────────────────────────────────── */

const PAGE_MESSAGES: Record<string, string> = {
  '/':           'SYSTEM_READY',
  '/about':      'SCANNING_PROFILE',
  '/projects':   'LOADING_PROJECTS',
  '/contact':    'COMM_LINK_OPEN',
  '/experience': 'READING_RECORDS',
  '/services':   'ANALYZING_SERVICES',
}

const IDLE_MESSAGES = [
  'PEEK_A_BOO 🥷',
  'STILL_WATCHING 👀',
  'NINJA_HUGS 💜',
  'HI_THERE ✨',
  'JUST_CHECKING 🔍',
]

const HOVER_MESSAGES = [
  'INTERACTIVE_MODE',
  'HELLO_HUMAN 👾',
  'ACCESS_GRANTED',
  'ENGAGED 💜',
]

export const PeekCreature = () => {
  const containerControls = useAnimation()
  const handControls      = useAnimation()
  const visorControls     = useAnimation()

  const [isHovered, setIsHovered]     = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage]         = useState('SYSTEM_READY')

  const isHoveredRef   = useRef(false)
  const isAnimatingRef = useRef(false)
  const location       = useLocation()

  useEffect(() => { isHoveredRef.current = isHovered }, [isHovered])

  /* ── Blink loop ── */
  useEffect(() => {
    const t = setInterval(async () => {
      if (!isHoveredRef.current) {
        await visorControls.start({ scaleY: 0.08, transition: { duration: 0.08 } })
        await visorControls.start({ scaleY: 1,    transition: { duration: 0.08 } })
      }
    }, 4000)
    return () => clearInterval(t)
  }, [visorControls])

  /* ── Core peek sequence ── */
  const peek = async (msg: string, force = false) => {
    if (isHoveredRef.current && !force) return
    if (isAnimatingRef.current && !force) return
    isAnimatingRef.current = true

    setMessage(msg)

    await containerControls.start({
      x: -18,
      rotate: [-8, 2, 0],
      transition: { type: 'spring', stiffness: 280, damping: 16 },
    })

    // Quick wave
    await handControls.start({
      rotate: [0, -35, 20, -15, 0],
      y:      [40, -5,   0,   0, 40],
      x:      [0,  -8,   4,   0,  0],
      opacity:[0,   1,   1,   1,  0],
      transition: { duration: 1.3, ease: 'easeInOut', times: [0, 0.2, 0.4, 0.8, 1] },
    })

    setShowMessage(true)
    await new Promise(r => setTimeout(r, 3000))

    if (!isHoveredRef.current) {
      setShowMessage(false)
      await containerControls.start({
        x: 120,
        rotate: 0,
        transition: { type: 'spring', stiffness: 120, damping: 20 },
      })
    }
    isAnimatingRef.current = false
  }

  /* ── Route change ── */
  useEffect(() => {
    const msg = PAGE_MESSAGES[location.pathname] ?? 'SYSTEM_READY'
    const t = setTimeout(() => peek(msg, true), 500)
    return () => clearTimeout(t)
  }, [location.pathname])

  /* ── Auto peek every 16s ── */
  useEffect(() => {
    const t = setInterval(() => {
      const msg = IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)]
      peek(msg)
    }, 16000)
    return () => clearInterval(t)
  }, [])

  /* ── Hover in ── */
  const handleEnter = () => {
    setIsHovered(true)
    isHoveredRef.current = true

    const msg = HOVER_MESSAGES[Math.floor(Math.random() * HOVER_MESSAGES.length)]
    setMessage(msg)
    setShowMessage(true)

    containerControls.start({
      x: -28, y: -6,
      rotate: -6,
      transition: { type: 'spring', stiffness: 420, damping: 12 },
    })
    visorControls.start({
      backgroundColor: '#a855f7',
      scaleY: 0.45,
      scaleX: 1.25,
      borderRadius: '50% 50% 10% 10%',
      transition: { duration: 0.22 },
    })
    handControls.start({
      rotate:  [0, -40, 25, -20, 0],
      y:       [30, -10,  0,   0, 30],
      opacity: [0,   1,  1,   1,  0],
      transition: { duration: 1.2 },
    })
  }

  /* ── Hover out ── */
  const handleLeave = () => {
    setIsHovered(false)
    isHoveredRef.current = false
    setShowMessage(false)

    containerControls.start({
      x: 120, y: 0, rotate: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    })
    visorControls.start({
      backgroundColor: '#3dd8d0',
      scaleY: 1, scaleX: 1,
      borderRadius: '50%',
      transition: { duration: 0.3 },
    })
  }

  const handleClick = () => isHovered ? handleLeave() : handleEnter()

  return (
    <motion.div
      initial={{ x: 120 }}
      animate={containerControls}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className="fixed bottom-0 right-0 z-[100] cursor-pointer flex items-end"
      style={{ originX: 0.5, originY: 1 }}
    >
      {/* Hover hitbox extensions */}
      <div className="absolute left-[-64px] bottom-0 w-[64px] h-[140px] bg-transparent" />
      <div className="absolute right-[-36px] bottom-0 w-[36px] h-[140px] bg-transparent" />

      {/* Mobile pull tab */}
      <div className="sm:hidden absolute left-[-20px] bottom-14 w-5 h-16 rounded-l-lg flex flex-col items-center justify-center gap-1.5 shadow-[-4px_0_14px_rgba(0,0,0,0.7)]"
        style={{ background: '#0d0f18', border: '1px solid rgba(61,216,208,0.2)', borderRight: 'none' }}
      >
        <div className="w-1 h-1 rounded-full bg-accent-cyan" style={{ boxShadow: '0 0 5px #3dd8d0' }} />
        <div className="w-1 h-1 rounded-full bg-accent-cyan" style={{ boxShadow: '0 0 5px #3dd8d0' }} />
        <div className="w-1 h-1 rounded-full bg-accent-cyan" style={{ boxShadow: '0 0 5px #3dd8d0' }} />
      </div>

      {/* ── Speech bubble ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: 16, rotate: -12 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          scale:   showMessage ? 1 : 0.3,
          y:       showMessage ? -10 : 16,
          rotate:  showMessage ? 0 : -12,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        className="absolute bottom-[75%] right-[115px] pointer-events-none whitespace-nowrap origin-bottom-right"
        style={{
          background: 'rgba(6,7,9,0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(139,92,246,0.35)',
          borderLeft: '3px solid #8b5cf6',
          borderRadius: '0 10px 10px 0',
          padding: '9px 16px',
          boxShadow: '0 8px 28px rgba(139,92,246,0.25), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <span className="font-mono text-xs font-black tracking-widest" style={{ color: '#8b5cf6' }}>&gt;&gt; </span>
        <span className="font-mono text-xs tracking-wide text-white">{message}</span>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/15" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/15" />

        {/* Speech tail */}
        <div
          className="absolute -bottom-[7px] right-6 w-3.5 h-3.5"
          style={{
            background: 'rgba(6,7,9,0.88)',
            border: '1px solid rgba(139,92,246,0.25)',
            borderTop: 'none',
            borderLeft: 'none',
            transform: 'rotate(45deg)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          }}
        />
      </motion.div>

      {/* ── Ninja Hood Body ── */}
      <div
        className="relative z-10 flex flex-col items-center overflow-hidden"
        style={{
          width: 110,
          height: 120,
          borderRadius: '60px 12px 0 0',
          background: 'linear-gradient(170deg, #12141e 0%, #07090f 100%)',
          border: '1.5px solid rgba(255,255,255,0.07)',
          borderBottom: 'none',
          boxShadow: [
            '-14px 0 40px rgba(0,0,0,0.85)',
            'inset 0 1px 0 rgba(255,255,255,0.08)',
            'inset 0 0 40px rgba(61,216,208,0.03)',
          ].join(', '),
        }}
      >
        {/* Hood crease shading */}
        <div className="absolute top-0 left-3 w-10 h-20 rounded-full opacity-[0.03]"
          style={{ background: 'white', transform: 'rotate(-40deg)' }} />
        <div className="absolute top-1 right-2 w-7 h-24 rounded-full opacity-[0.02]"
          style={{ background: 'white', transform: 'rotate(14deg)' }} />

        {/* Subtle cyan rim glow on the curved top */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(61,216,208,0.18), transparent)' }}
        />

        {/* Visor — dark cutout with glowing eyes */}
        <div
          className="relative flex items-center justify-center gap-5 mt-10"
          style={{
            width: '82%',
            height: 48,
            background: '#040507',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8), inset 0 0 20px rgba(61,216,208,0.04)',
            overflow: 'hidden',
          }}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              background: 'repeating-linear-gradient(transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)',
            }}
          />

          {/* Eye left */}
          <motion.div
            animate={visorControls}
            style={{
              width: 15, height: 18,
              borderRadius: '50%',
              background: '#3dd8d0',
              boxShadow: '0 0 10px #3dd8d0, 0 0 24px rgba(61,216,208,0.5)',
              transformOrigin: 'center',
              zIndex: 10,
            }}
          />
          {/* Eye right */}
          <motion.div
            animate={visorControls}
            style={{
              width: 15, height: 18,
              borderRadius: '50%',
              background: '#3dd8d0',
              boxShadow: '0 0 10px #3dd8d0, 0 0 24px rgba(61,216,208,0.5)',
              transformOrigin: 'center',
              zIndex: 10,
            }}
          />
        </div>

        {/* Collar / tech strip */}
        <div className="mt-5 flex flex-col gap-1.5 items-center w-full px-4">
          <div className="w-3/5 h-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="flex gap-2 items-center">
            <div className="w-4 h-[3px] rounded-full" style={{ background: 'rgba(61,216,208,0.4)' }} />
            <div className="w-7 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="w-2 h-[3px] rounded-full" style={{ background: 'rgba(139,92,246,0.5)' }} />
          </div>
        </div>

        {/* Status LED */}
        <div
          className="absolute bottom-5 left-4 w-2 h-2 rounded-full animate-pulse"
          style={{
            background: '#ef4444',
            boxShadow: '0 0 8px rgba(239,68,68,0.85)',
          }}
        />

        {/* Purple accent line (right edge) */}
        <div
          className="absolute right-0 top-8 bottom-0 w-[2px]"
          style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.4), transparent)' }}
        />
      </div>

      {/* ── Ninja Hand ── */}
      <motion.div
        initial={{ rotate: 0, y: 40, opacity: 0 }}
        animate={handControls}
        style={{ originX: 1, originY: 1 }}
        className="absolute -left-7 bottom-10 z-20"
      >
        <div
          className="relative"
          style={{
            width: 32, height: 40,
            background: 'linear-gradient(145deg, #181a24, #0d0f18)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 4,
            boxShadow: '-4px 6px 16px rgba(0,0,0,0.8)',
          }}
        >
          {/* Knuckle plates */}
          <div className="absolute top-3 left-1 w-2 h-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="absolute top-3 right-1 w-2 h-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.05)' }} />

          {/* Two fingers (peace sign) */}
          <div
            className="absolute -top-4 left-1"
            style={{
              width: 10, height: 20,
              background: 'linear-gradient(145deg, #181a24, #0d0f18)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px 4px 0 0',
            }}
          />
          <div
            className="absolute -top-5 right-1.5"
            style={{
              width: 10, height: 22,
              background: 'linear-gradient(145deg, #181a24, #0d0f18)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px 4px 0 0',
            }}
          />

          {/* Cyber wire glow */}
          <div
            className="absolute bottom-2 left-2"
            style={{
              width: 18, height: 1,
              background: '#3dd8d0',
              boxShadow: '0 0 6px rgba(61,216,208,0.9)',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
