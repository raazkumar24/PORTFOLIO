import { useEffect, useRef } from 'react'

/**
 * CursorSpotlight — Premium mouse-follow radial gradient overlay
 * Creates a "light source" effect that follows the cursor across the page.
 */
export const CursorSpotlight = () => {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const el = overlayRef.current
    if (!el) return

    let rafId: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let currentX = mouseX
    let currentY = mouseY

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Smooth lerp follow
      currentX += (mouseX - currentX) * 0.08
      currentY += (mouseY - currentY) * 0.08

      el.style.background = `radial-gradient(
        600px circle at ${currentX}px ${currentY}px,
        rgba(61, 216, 208, 0.045) 0%,
        rgba(139, 92, 246, 0.025) 35%,
        transparent 70%
      )`

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'background 0.1s ease',
      }}
    />
  )
}
