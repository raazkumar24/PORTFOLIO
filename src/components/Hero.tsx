import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, TorusKnot } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import { MagneticText } from './MagneticText'

const AbstractShape = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <TorusKnot ref={meshRef} args={[1.5, 0.4, 64, 16]} scale={1.5}>
        <meshStandardMaterial
          color="#333333"
          roughness={0.1}
          metalness={0.9}
          wireframe={true}
        />
      </TorusKnot>
    </Float>
  )
}

export const Hero = () => {
  return (
    <section id="home" className="h-screen w-full relative overflow-hidden bg-bg-dark flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Environment preset="studio" />
          <AbstractShape />
        </Canvas>
      </div>
      
      <div className="z-10 flex flex-col items-center pointer-events-none w-full px-8">
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white mix-blend-difference pointer-events-auto uppercase tracking-tighter w-full max-w-7xl flex flex-col items-start">
          <MagneticText>SOFTWARE</MagneticText>
          <div className="self-end mt-[-2%]"><MagneticText>ENGINEER</MagneticText></div>
        </h1>
        
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-text-secondary text-sm font-medium tracking-wide uppercase pointer-events-auto">
          <p>Portfolio <br/> 2026</p>
          <p className="text-right max-w-xs normal-case tracking-normal">
            Building digital experiences with focus on performance, design, and interactions.
          </p>
        </div>
      </div>
    </section>
  )
}
