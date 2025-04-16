import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// Vertex shader for water animation
const waterVertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform float uSpeed;
  varying vec3 vPosition;
  
  void main() {
    // Original position
    vec3 pos = position;
    
    // Create multiple overlapping waves
    float wave1 = sin(position.x * uFrequency + uTime * uSpeed) * 
                 cos(position.y * uFrequency * 0.8 + uTime * uSpeed * 0.9) * 
                 uAmplitude;
    
    float wave2 = sin((position.x * 1.3 + position.y * 0.7) * uFrequency + uTime * uSpeed * 1.2) * 
                 uAmplitude * 0.4;
                 
    float wave3 = sin(position.y * uFrequency * 1.5 + uTime * uSpeed * 0.7) *
                 uAmplitude * 0.3;
    
    // Apply waves to z-position
    pos.z = wave1 + wave2 + wave3;
    
    // Pass position to fragment shader
    vPosition = pos;
    
    // Standard transformations
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Simple fragment shader
const waterFragmentShader = `
  uniform vec3 diffuse;
  uniform float opacity;
  varying vec3 vPosition;
  
  void main() {
    // Simple color based on position for a water-like effect
    vec3 color = diffuse;
    gl_FragColor = vec4(color, opacity);
  }
`

const WaterSurface = () => {
  const meshRef = useRef()
  
  // Configuration
  const gridSize = 40 // Number of segments
  const width = 100 // Width of the plane
  const height = 30 // Height of the plane
  
  // Create plane geometry
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(width, height, gridSize, gridSize)
  }, [gridSize, width, height])
  
  // Set up uniforms for the shader
  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: 0.5 },
    uFrequency: { value: 0.2 },
    uSpeed: { value: 0.8 },
    diffuse: { value: new THREE.Color("#4a80d9") },
    opacity: { value: 0.7 }
  }).current
  
  // Material with custom shaders
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      wireframe: true,
      transparent: true,
      uniforms: uniforms
    })
  }, [uniforms])
  
  // Update time uniform each frame
  useFrame((state, delta) => {
    uniforms.uTime.value += delta
  })
  
  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI/3, 0, 0]} 
      position={[0, -2, 0]}
      geometry={geometry}
      material={material}
    />
  )
}

const WaterBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10" style={{ position: 'fixed', zIndex: -10 }}>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: "black"}} camera={{ position: [0, 0, 10], fov: 60 }}>
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