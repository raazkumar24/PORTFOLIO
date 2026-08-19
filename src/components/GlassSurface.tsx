import {
  useRef,
  useState,
  useLayoutEffect,
  useId,
  type ElementType,
  type CSSProperties,
  type ReactNode,
  type MouseEvent,
} from 'react'

/* ─────────────────────────────────────────────────────────────────────────
 *  GlassSurface — Real SVG-displacement Liquid Glass with 3D Parallax Tilt
 * ───────────────────────────────────────────────────────────────────────── */

interface GlassSurfaceProps {
  as?: ElementType
  radius?: number
  edgeWidth?: number   // thickness of the "bent rim" in px
  strength?: number    // displacement map scale
  tint?: string        // optional CSS color for glass background tint
  tilt?: boolean       // enable premium 3D mouse hover tilt
  className?: string
  style?: CSSProperties
  children?: ReactNode
  onClick?: () => void
  [key: string]: unknown
}

export function GlassSurface({
  as: Tag = 'div',
  radius = 24,
  edgeWidth = 24,
  strength = 40,
  tint,
  tilt = false,
  className = '',
  style,
  children,
  ...props
}: GlassSurfaceProps) {
  const ref = useRef<HTMLElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({})
  const [useSvgFilter, setUseSvgFilter] = useState(false)
  const rawId = useId()
  const filterId = `glass-${rawId.replace(/:/g, '')}`

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      setSize({ w: Math.round(rect.width), h: Math.round(rect.height) })
    }
    update()

    // Exclude Safari, mobile devices, and touch devices from SVG filters for 60fps scrolling performance
    const ua = navigator.userAgent
    const isSafari = /Safari/.test(ua) && !/Chrome|Edg|Opr/.test(ua)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || window.innerWidth < 768
    setUseSvgFilter(!isSafari && !isMobile && !isTouch)

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { w, h } = size
  const ready = w > 0 && h > 0

  // 3D Parallax Tilt Mouse Handlers
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!tilt || !ref.current) return
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xc = rect.width / 2
    const yc = rect.height / 2
    // Max 8 degrees rotation
    const rx = -(y - yc) / (rect.height / 16)
    const ry = (x - xc) / (rect.width / 16)

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.05s ease-out',
    })
  }

  const handleMouseLeave = () => {
    if (!tilt) return
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out',
    })
  }

  // Bump map: rounded-rect outline, base64 encoded for Firefox compatibility
  const bumpMapSvg = ready
    ? (() => {
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
          <rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" fill="#808080"/>
          <rect x="${edgeWidth / 2}" y="${edgeWidth / 2}"
                width="${w - edgeWidth}" height="${h - edgeWidth}"
                rx="${Math.max(radius - edgeWidth / 2, 0)}"
                fill="none" stroke="white" stroke-width="${edgeWidth}"
                style="filter:blur(${edgeWidth / 2.2}px)"/>
        </svg>`;
        const base64 = typeof window !== 'undefined' ? window.btoa(unescape(encodeURIComponent(svgString))) : '';
        return `data:image/svg+xml;base64,${base64}`;
      })()
    : null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tilt: _t, ...domProps } = { tilt, ...props }

  const Component = Tag as any

  return (
    <Component
      ref={ref}
      className={`lg-surface ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        borderRadius: radius,
        border: tint
          ? `1px solid ${tint.replace(/,[^,]+\)$/, ',0.35)')}`
          : '1px solid rgba(255,255,255,0.18)',
        boxShadow: [
          'inset 0 1px 1px rgba(255,255,255,0.35)',
          'inset 0 -1px 1px rgba(0,0,0,0.15)',
          '0 8px 32px rgba(0,0,0,0.35)',
        ].join(', '),
        backdropFilter: ready && useSvgFilter
          ? `blur(2px) url(#${filterId}) saturate(160%)`
          : 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        background: tint ?? 'rgba(255,255,255,0.055)',
        overflow: 'hidden',
        ...style,
        ...tiltStyle, // Merge 3D tilt styles
      }}
      {...domProps}
    >

      {/* Per-element SVG filter — hidden, 0×0 */}
      {ready && (
        <svg
          style={{ position: 'absolute', width: 0, height: 0 }}
          aria-hidden="true"
        >
          <filter
            id={filterId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={bumpMapSvg!}
              x="0"
              y="0"
              width={w}
              height={h}
              result="bumpMap"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="bumpMap"
              scale={strength}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      {/* Shimmer sweep */}
      <span className="lg-shimmer" aria-hidden="true" />

      {/* Content above the shimmer */}
      <span style={{ position: 'relative', zIndex: 1, display: 'contents' }}>
        {children}
      </span>
    </Component>
  )
}

/* ── Ready-made variants ─────────────────────────────────────────────── */

interface GlassButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  style?: CSSProperties
}

export function GlassButton({
  children,
  onClick,
  className = '',
  type = 'button',
  style,
}: GlassButtonProps) {
  return (
    <GlassSurface
      as="button"
      type={type}
      onClick={onClick}
      radius={999}
      edgeWidth={18}
      strength={28}
      className={className}
      style={{
        padding: '10px 26px',
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: '#fff',
        cursor: 'pointer',
        background: 'rgba(255,255,255,0.07)',
        ...style,
      }}
    >
      {children}
    </GlassSurface>
  )
}

interface GlassTagProps {
  children: ReactNode
  className?: string
}

export function GlassTag({ children, className = '' }: GlassTagProps) {
  return (
    <GlassSurface
      as="span"
      radius={10}
      edgeWidth={10}
      strength={18}
      className={className}
      style={{
        display: 'inline-block',
        padding: '5px 12px',
        fontSize: 12,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.8)',
      }}
    >
      {children}
    </GlassSurface>
  )
}

interface GlassCircleProps {
  children: ReactNode
  size?: number
  className?: string
  style?: CSSProperties
}

export function GlassCircle({
  children,
  size = 40,
  className = '',
  style,
}: GlassCircleProps) {
  return (
    <GlassSurface
      as="span"
      radius={size}
      edgeWidth={Math.round(size * 0.22)}
      strength={22}
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </GlassSurface>
  )
}
