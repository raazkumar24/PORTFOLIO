import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const CubeCluster = () => {
  const groupRef = useRef<THREE.Group>(null)

  // Generate random positions and rotations for a cluster of cubes
  const cubes = useMemo(() => {
    const temp = []
    for (let i = 0; i < 40; i++) {
      // Random position within a sphere
      const radius = 2.5
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = Math.cbrt(Math.random()) * radius

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      // Random scale to make it look organic
      const scale = 0.5 + Math.random() * 0.8

      // Random rotation
      const rotX = Math.random() * Math.PI
      const rotY = Math.random() * Math.PI
      const rotZ = Math.random() * Math.PI

      temp.push({ position: [x, y, z], rotation: [rotX, rotY, rotZ], scale })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate the entire cluster slowly
      groupRef.current.rotation.x += delta * 0.1
      groupRef.current.rotation.y += delta * 0.15

      // Slight floating effect (bobbing)
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <RoundedBox
          key={i}
          args={[1, 1, 1]}
          radius={0.1}
          smoothness={4}
          position={cube.position as [number, number, number]}
          rotation={cube.rotation as [number, number, number]}
          scale={cube.scale}
        >
          <meshPhysicalMaterial
            color="#3dd8d0"
            emissive="#004455"
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.1}
            transmission={0.9} // Glass effect
            thickness={0.5}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>
      ))}
    </group>
  )
}

export const AbstractCubes = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-[60vh] md:w-[60vw] md:h-[80vh] md:right-[-10vw] z-0 pointer-events-none opacity-60 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3dd8d0" />

        <CubeCluster />

        {/* Environment map for realistic glass reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
