import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const WaterSurface = () => {
  const meshRef = useRef()
  
  // Configuration
  const gridSize = 40 // Number of segments
  const width = 100 // Width of the plane
  const height = 30 // Height of the plane
  
  // Create grid geometry
  const [vertices, indices] = useMemo(() => {
    const vertices = []
    const indices = []
    
    // Create vertices
    for (let y = 0; y <= gridSize; y++) {
      for (let x = 0; x <= gridSize; x++) {
        const xPos = (x / gridSize - 0.5) * width
        const yPos = (y / gridSize - 0.5) * height
        
        // Initial flat surface (no randomness)
        const zPos = 0
        
        vertices.push(xPos, yPos, zPos)
      }
    }
    
    // Create indices for wireframe
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const a = x + y * (gridSize + 1)
        const b = x + 1 + y * (gridSize + 1)
        const c = x + (y + 1) * (gridSize + 1)
        const d = x + 1 + (y + 1) * (gridSize + 1)
        
        // First triangle
        indices.push(a, b, c)
        
        // Second triangle
        indices.push(b, d, c)
      }
    }
    
    return [
      new Float32Array(vertices),
      new Uint16Array(indices)
    ]
  }, [gridSize, width, height])
  
  // Original vertex positions
  const originalPositions = useMemo(() => {
    return vertices.slice()
  }, [vertices])
  
  // Animation parameters
  const waveParams = useMemo(() => ({
    speed: 0.8,           
    amplitude: 0.5,       
    frequency: 0.2,       
    time: 0
  }), [])
  
  // Update water surface on each frame
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    const positions = meshRef.current.geometry.attributes.position.array
    
    // Update time for wave animation
    waveParams.time += delta * waveParams.speed
    
    // Update each vertex using original positions (prevents distortion over time)
    for (let i = 0; i < positions.length; i += 3) {
      // Get the original x and y values
      const x = originalPositions[i]
      const y = originalPositions[i + 1]
      
      // Create multiple overlapping waves for more interesting pattern
      const wave1 = Math.sin(x * waveParams.frequency + waveParams.time) * 
                    Math.cos(y * waveParams.frequency * 0.8 + waveParams.time * 0.9) * 
                    waveParams.amplitude
      
      const wave2 = Math.sin((x * 1.3 + y * 0.7) * waveParams.frequency + waveParams.time * 1.2) * 
                    waveParams.amplitude * 0.4
                    
      const wave3 = Math.sin(y * waveParams.frequency * 1.5 + waveParams.time * 0.7) *
                    waveParams.amplitude * 0.3
      
      // Combine waves
      positions[i + 2] = wave1 + wave2 + wave3
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI/3, 0, 0]} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
        />
        <bufferAttribute 
          attach="index"
          array={indices} 
        />
      </bufferGeometry>
      <meshBasicMaterial 
        color="#4a80d9" 
        wireframe={true}
        transparent={true}
        opacity={0.7}
      />
    </mesh>
  )
}

const WaterBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10" style={{ position: 'fixed', zIndex: -10 }}>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} camera={{ position: [0, 0, 10], fov: 60 }}>
        <color attach="background" args={['#050914']} />
        <WaterSurface />
        <EffectComposer>
          <Bloom 
            intensity={0.8} 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.9} 
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default WaterBackground