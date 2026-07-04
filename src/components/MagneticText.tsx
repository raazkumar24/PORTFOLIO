import { useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticTextProps {
  children: ReactNode
  className?: string
}

export const MagneticText = ({ children, className = '' }: MagneticTextProps) => {
  const magneticRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = magneticRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = element.getBoundingClientRect()
      
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)

      gsap.to(element, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 1,
        ease: 'power3.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={magneticRef} className={`inline-block cursor-pointer ${className}`}>
      {children}
    </div>
  )
}
