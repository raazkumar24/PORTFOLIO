import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float u_time;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = vUv;
    float noise = snoise(st * 2.0 + u_time * 0.1);
    float noise2 = snoise(st * 3.0 - u_time * 0.05 + noise);
    
    // Monochromatic elegant fluid
    float intensity = smoothstep(-1.0, 1.0, noise2) * 0.15;
    vec3 finalColor = vec3(intensity);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

const ShaderBackground = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

export const Contact = () => {
  return (
    <section id="contact" className="h-screen w-full relative overflow-hidden flex items-center justify-center border-t border-white/[0.04]">
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 1.5]} orthographic camera={{ position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1 }}>
          <ShaderBackground />
        </Canvas>
      </div>
      
      <div className="z-10 bg-[#070707]/80 backdrop-blur-2xl border border-white/[0.06] p-12 md:p-16 rounded-2xl max-w-2xl w-full mx-8">
        <h2 className="text-sm font-medium tracking-wide text-text-secondary uppercase mb-8">Initiate Contact</h2>
        
        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium tracking-wide uppercase text-text-secondary">Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-white/[0.1] pb-2 text-white text-lg focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium tracking-wide uppercase text-text-secondary">Email</label>
            <input 
              type="email" 
              className="w-full bg-transparent border-b border-white/[0.1] pb-2 text-white text-lg focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium tracking-wide uppercase text-text-secondary">Message</label>
            <textarea 
              rows={3}
              className="w-full bg-transparent border-b border-white/[0.1] pb-2 text-white text-lg focus:outline-none focus:border-white transition-colors resize-none"
            ></textarea>
          </div>
          
          <button className="self-start mt-4 px-8 py-4 bg-white text-black font-medium text-sm tracking-wide hover:bg-white/90 transition-colors uppercase">
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
