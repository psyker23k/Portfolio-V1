"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Sphere, Box, Torus } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"

function FloatingGeometry({
  position,
  geometry,
  color,
}: { position: [number, number, number]; geometry: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  const GeometryComponent = () => {
    switch (geometry) {
      case "sphere":
        return (
          <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
            <meshStandardMaterial color={color} transparent opacity={0.6} />
          </Sphere>
        )
      case "box":
        return (
          <Box ref={meshRef} args={[0.8, 0.8, 0.8]} position={position}>
            <meshStandardMaterial color={color} transparent opacity={0.6} />
          </Box>
        )
      case "torus":
        return (
          <Torus ref={meshRef} args={[0.6, 0.2, 16, 32]} position={position}>
            <meshStandardMaterial color={color} transparent opacity={0.6} />
          </Torus>
        )
      default:
        return null
    }
  }

  return <GeometryComponent />
}

function Stars() {
  const ref = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const colors = new Float32Array(2000 * 3)

    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.5)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial transparent vertexColors size={0.02} sizeAttenuation={true} depthWrite={false} />
    </Points>
  )
}

function Scene() {
  const geometries = [
    { position: [-4, 2, -2], geometry: "sphere", color: "#06b6d4" },
    { position: [4, -1, -3], geometry: "box", color: "#3b82f6" },
    { position: [-2, -3, -1], geometry: "torus", color: "#0ea5e9" },
    { position: [3, 3, -4], geometry: "sphere", color: "#22d3ee" },
    { position: [-5, -2, -5], geometry: "box", color: "#0284c7" },
    { position: [2, -4, -2], geometry: "torus", color: "#0891b2" },
  ]

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

      <Stars />

      {geometries.map((geo, index) => (
        <FloatingGeometry
          key={index}
          position={geo.position as [number, number, number]}
          geometry={geo.geometry}
          color={geo.color}
        />
      ))}
    </>
  )
}

export default function ThreeDBackground({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: "transparent" }}>
        <Scene />
      </Canvas>
    </motion.div>
  )
}
