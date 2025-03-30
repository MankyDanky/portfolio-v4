import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const StarField = () => {
  const meshRef = useRef()
  const count = 800 // Number of capsules
  
  // Create matrices for instanced capsules
  const matrices = useMemo(() => new Array(count).fill().map(() => new THREE.Matrix4()), [count])
  const velocities = useMemo(() => [], [])
  const originalLengths = useMemo(() => [], [])
  
  // Initialize capsules
  useMemo(() => {
    const dummy = new THREE.Object3D()
    
    for (let i = 0; i < count; i++) {
      // Create radial distribution
      const angle = Math.random() * Math.PI * 2
      const radius = Math.sqrt(Math.random()) * 5 + 0.2
      
      // Calculate x and y position
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      // Z position (depth)
      const z = -20 + Math.random() * 15
      
      // Calculate capsule length - faster capsules are longer
      const speed = Math.random() * 0.15 + 0.05
      const length = speed * 5
      originalLengths.push(length)
      
      // Set position
      dummy.position.set(x, y, z)
      
      // Calculate rotation to point toward camera
      // Bias toward camera direction (z-axis)
      const zBias = 0.8
      
      // Calculate direction vector with z-bias
      const directionX = x * (1 - zBias) * (0.8 + Math.random() * 0.4)
      const directionY = y * (1 - zBias) * (0.8 + Math.random() * 0.4) 
      const directionZ = length * zBias
      
      // Make the capsule look at the target point
      dummy.lookAt(x + directionX, y + directionY, z + directionZ)
      
      // Rotate 90 degrees to align capsule with direction of travel
      dummy.rotateX(Math.PI / 2)
      
      // Scale the capsule - thicker for faster ones
      const thickness = 0.01 + speed * 0.2
      dummy.scale.set(thickness, thickness, length)
      
      // Update matrix
      dummy.updateMatrix()
      matrices[i].copy(dummy.matrix)
      
      // Store velocity
      velocities.push(speed)
    }
  }, [count, matrices, originalLengths, velocities])
  
  // Create dummy object for matrix manipulation
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(() => {
    if (!meshRef.current) return
    
    // Update each capsule
    for (let i = 0; i < count; i++) {
      // Extract position and rotation from matrix
      dummy.matrix.copy(matrices[i])
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)
      
      // Move toward camera
      dummy.position.z += velocities[i]
      
      // If this capsule has moved past the camera, reset it
      if (dummy.position.z > 5) {
        // Reset position
        const angle = Math.random() * Math.PI * 2
        const radius = Math.sqrt(Math.random()) * 5 + 0.2
        
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const z = -20
        
        dummy.position.set(x, y, z)
        
        // Bias toward camera direction
        const zBias = 0.8
        
        // Calculate direction
        const directionX = x * (1 - zBias) * (0.8 + Math.random() * 0.4)
        const directionY = y * (1 - zBias) * (0.8 + Math.random() * 0.4) 
        const directionZ = originalLengths[i] * zBias
        
        // Make the capsule look at the target point
        dummy.lookAt(x + directionX, y + directionY, z + directionZ)
        dummy.rotateX(Math.PI / 2)
      }
      
      // Update matrix and apply to instanced mesh
      dummy.updateMatrix()
      matrices[i].copy(dummy.matrix)
      meshRef.current.setMatrixAt(i, matrices[i])
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <capsuleGeometry args={[0.05, 1.0]} />
      <meshBasicMaterial color="#ffffff" opacity={0.8} transparent={true} />
    </instancedMesh>
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