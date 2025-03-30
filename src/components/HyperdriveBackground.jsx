import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const StarField = () => {
  const linesRef = useRef()
  
  // Create lines with varying lengths and angles
  const [positions, velocities, originalLengths] = useMemo(() => {
    const positions = []
    const velocities = []
    const originalLengths = []
    const count = 1000
    
    for (let i = 0; i < count; i++) {
      // Create radial distribution
      const angle = Math.random() * Math.PI * 2
      
      // Use square root distribution to distribute stars more evenly visually
      // This creates more stars in the outer regions than a linear distribution
      const radius = Math.sqrt(Math.random()) * 5 + 0.2
      
      // Calculate x and y position
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      // Z position (depth)
      const z = -20 + Math.random() * 15
      
      // Calculate line length - faster lines are longer
      const speed = Math.random() * 0.15 + 0.05
      const length = speed * 5
      originalLengths.push(length)
      
      // Bias toward camera direction (z-axis)
      // Higher zBias = more directly toward camera
      const zBias = 0.8
      
      // Calculate direction vector with z-bias
      const directionX = x * (1 - zBias) * (0.8 + Math.random() * 0.4)
      const directionY = y * (1 - zBias) * (0.8 + Math.random() * 0.4) 
      const directionZ = length * zBias // Heavily weighted toward Z (camera)
      
      // Normalize vector length
      const totalLength = Math.sqrt(directionX*directionX + directionY*directionY + directionZ*directionZ)
      const normalizedDX = (directionX / totalLength) * length
      const normalizedDY = (directionY / totalLength) * length
      const normalizedDZ = (directionZ / totalLength) * length
      
      // Add start and end points of line
      positions.push(
        x, y, z,                                   // Starting point
        x + normalizedDX, y + normalizedDY, z + normalizedDZ  // End point
      )
      
      velocities.push(speed)
    }
    
    return [new Float32Array(positions), velocities, originalLengths]
  }, [])

  useFrame(() => {
    const positions = linesRef.current.geometry.attributes.position.array
    
    // Update each line segment
    for (let i = 0; i < positions.length; i += 6) {
      const index = Math.floor(i / 6)
      const speed = velocities[index]
      
      // Move both start and end points toward camera
      positions[i + 2] += speed // Move start point z
      positions[i + 5] += speed // Move end point z
      
      // If this line segment has moved past the camera, reset it
      if (positions[i + 2] > 5) {
        const angle = Math.random() * Math.PI * 2
        
        // Use square root distribution for resets too
        const radius = Math.sqrt(Math.random()) * 5 + 0.2
        
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const z = -20
        
        // Reset start point
        positions[i] = x
        positions[i + 1] = y
        positions[i + 2] = z
        
        // Bias toward camera direction (z-axis)
        const zBias = 0.8
        
        // Calculate new direction with z-bias
        const directionX = x * (1 - zBias) * (0.8 + Math.random() * 0.4)
        const directionY = y * (1 - zBias) * (0.8 + Math.random() * 0.4)
        const directionZ = originalLengths[index] * zBias
        
        // Normalize vector length
        const totalLength = Math.sqrt(directionX*directionX + directionY*directionY + directionZ*directionZ)
        const normalizedDX = (directionX / totalLength) * originalLengths[index]
        const normalizedDY = (directionY / totalLength) * originalLengths[index]
        const normalizedDZ = (directionZ / totalLength) * originalLengths[index]
        
        // Reset end point
        positions[i + 3] = x + normalizedDX
        positions[i + 4] = y + normalizedDY
        positions[i + 5] = z + normalizedDZ
      }
    }
    
    linesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#ffffff"
        opacity={0.8}
        transparent={true}
        linewidth={1}
        vertexColors={false}
      />
    </lineSegments>
  )
}

const HyperdriveBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10" style={{ position: 'fixed', zIndex: -10 }}>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} camera={{ position: [0, 0, 1], fov: 80 }}>
        <color attach="background" args={['#050914']} />
        <StarField />
        <EffectComposer>
          <Bloom 
            intensity={1.5} 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.9} 
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default HyperdriveBackground