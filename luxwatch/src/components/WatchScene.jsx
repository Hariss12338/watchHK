import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Float, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import WatchModel from './WatchModel'

/**
 * WatchScene — React Three Fiber Canvas with premium lighting rig.
 *
 * Lighting setup:
 *   • Ambient: very low, just to lift shadows
 *   • Key light: warm gold from top-left — gives the main highlight
 *   • Fill light: cool-tinted from right — separates from background
 *   • Rim light: subtle from behind — creates edge glow
 *   • Point lights: gold and blue for luxurious reflections
 *   • Environment: studio preset for metallic IBL
 */
export default function WatchScene({ scrollProgress = 0, mouseRef, style }) {
  return (
    <Canvas
      style={style}
      camera={{ position: [0, 0.5, 2.8], fov: 38 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: 2, // ACESFilmicToneMapping
        toneMappingExposure: 1.2,
      }}
      shadows
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* ── Fog for depth ── */}
      <fog attach="fog" args={['#000000', 4, 12]} />

      {/* ── Lighting ── */}

      {/* Ambient — very dim */}
      <ambientLight intensity={0.08} />

      {/* Key light — warm gold from upper-left */}
      <directionalLight
        position={[-2, 3, 2]}
        intensity={3.5}
        color="#f0d070"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />

      {/* Fill light — cool blue-white from right */}
      <directionalLight
        position={[3, 1, -1]}
        intensity={1.2}
        color="#8ab4ff"
      />

      {/* Rim light — warm from behind */}
      <directionalLight
        position={[0, -2, -3]}
        intensity={0.8}
        color="#c09030"
      />

      {/* Gold point light — close, strong reflection */}
      <pointLight position={[1.5, 1.5, 1.5]} intensity={4} color="#D4A017" distance={6} decay={2} />

      {/* Blue accent point — luxury depth */}
      <pointLight position={[-1.5, -1, 2]} intensity={1.5} color="#3060ff" distance={5} decay={2} />

      {/* Backlight halo */}
      <pointLight position={[0, 0, -3]} intensity={2} color="#a07020" distance={8} decay={2} />

      {/* ── Environment map for IBL metallic reflections ── */}
      <Environment preset="studio" background={false} />

      {/* ── Ground contact shadow ── */}
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.4}
        scale={3}
        blur={2.5}
        far={2}
        color="#D4A017"
      />

      {/* ── Subtle float animation ── */}
      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.3}>
        <Suspense fallback={null}>
          <WatchModel
            scrollProgress={scrollProgress}
            mouseX={mouseRef?.current?.x ?? 0}
            mouseY={mouseRef?.current?.y ?? 0}
          />
        </Suspense>
      </Float>

    </Canvas>
  )
}
