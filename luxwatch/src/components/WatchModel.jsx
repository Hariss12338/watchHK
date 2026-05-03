import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * WatchModel — procedural luxury watch built from primitive geometries.
 *
 * Structure:
 *   • Case    — flat cylinder (the main body)
 *   • Bezel   — torus ring around the case
 *   • Crown   — small cylinder on the right side
 *   • Crystal — thin glass-like disc on top
 *   • Dial    — textured inner face
 *   • Hands   — hour, minute, seconds
 *   • Lugs    — 4 connecting pieces for the strap
 *   • Strap   — top and bottom rectangles
 */
export default function WatchModel({ scrollProgress = 0, mouseX = 0, mouseY = 0 }) {
  const groupRef = useRef()
  const handsRef = useRef()
  const secondsRef = useRef()
  const crystalRef = useRef()

  // Gold material
  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C9960C'),
    metalness: 0.95,
    roughness: 0.15,
    envMapIntensity: 2.0,
  }), [])

  // Brushed steel (case side)
  const steelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C0C0C0'),
    metalness: 0.9,
    roughness: 0.3,
    envMapIntensity: 1.5,
  }), [])

  // Dark dial
  const dialMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0a0a0f'),
    metalness: 0.4,
    roughness: 0.6,
    emissive: new THREE.Color('#0d0d20'),
    emissiveIntensity: 0.3,
  }), [])

  // Crystal glass
  const crystalMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#aaccff'),
    metalness: 0,
    roughness: 0,
    transmission: 0.92,
    thickness: 0.04,
    transparent: true,
    opacity: 0.15,
    ior: 1.5,
    reflectivity: 0.5,
    envMapIntensity: 3,
  }), [])

  // Hour markers material (gold)
  const markerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D4A017'),
    metalness: 0.9,
    roughness: 0.1,
    emissive: new THREE.Color('#a07800'),
    emissiveIntensity: 0.4,
  }), [])

  // Hand material
  const handMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e8d090'),
    metalness: 0.95,
    roughness: 0.05,
    emissive: new THREE.Color('#806020'),
    emissiveIntensity: 0.2,
  }), [])

  // Seconds hand — red accent
  const secondHandMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cc2200'),
    metalness: 0.7,
    roughness: 0.2,
    emissive: new THREE.Color('#aa1100'),
    emissiveIntensity: 0.5,
  }), [])

  // Strap material
  const strapMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1008'),
    metalness: 0.0,
    roughness: 0.9,
  }), [])

  // Generate hour markers (12 rectangles around the dial)
  const hourMarkers = useMemo(() => {
    const markers = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const r = 0.38
      markers.push({
        key: i,
        x: Math.sin(angle) * r,
        z: Math.cos(angle) * r,
        angle,
        isMain: i % 3 === 0, // 12, 3, 6, 9 are larger
      })
    }
    return markers
  }, [])

  // Animate: slow base rotation + mouse parallax + scroll-driven rotation
  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.elapsedTime

    // Slow idle Y rotation
    const idleRotY = t * 0.12

    // Mouse-driven tilt (subtle)
    const targetX = mouseY * 0.25
    const targetY = idleRotY + mouseX * 0.35 + scrollProgress * Math.PI * 4

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03

    // Slight bob
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.03

    // Animate clock hands in real time
    if (handsRef.current) {
      const now = new Date()
      const seconds = now.getSeconds() + now.getMilliseconds() / 1000
      const minutes = now.getMinutes() + seconds / 60
      const hours = (now.getHours() % 12) + minutes / 60

      // Hour hand (shorter, rotates once in 12h)
      handsRef.current.children[0].rotation.z = -(hours / 12) * Math.PI * 2
      // Minute hand
      handsRef.current.children[1].rotation.z = -(minutes / 60) * Math.PI * 2
    }
    if (secondsRef.current) {
      const now = new Date()
      const secs = now.getSeconds() + now.getMilliseconds() / 1000
      secondsRef.current.rotation.z = -(secs / 60) * Math.PI * 2
    }

    // Crystal subtle shimmer
    if (crystalRef.current) {
      crystalRef.current.material.opacity = 0.12 + Math.sin(t * 2) * 0.04
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ── Strap — Top ── */}
      <mesh position={[0, 0.88, 0]} material={strapMat} castShadow>
        <boxGeometry args={[0.28, 0.7, 0.06]} />
      </mesh>
      {/* Strap — Bottom */}
      <mesh position={[0, -0.88, 0]} material={strapMat} castShadow>
        <boxGeometry args={[0.28, 0.7, 0.06]} />
      </mesh>

      {/* ── Case body ── */}
      <mesh material={steelMat} castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.14, 64]} />
      </mesh>

      {/* ── Case top cap (slightly larger) ── */}
      <mesh position={[0, 0.072, 0]} material={steelMat}>
        <cylinderGeometry args={[0.525, 0.525, 0.005, 64]} />
      </mesh>

      {/* ── Bezel (outer gold ring) ── */}
      <mesh position={[0, 0.07, 0]} material={goldMat} castShadow>
        <torusGeometry args={[0.52, 0.04, 24, 96]} />
      </mesh>

      {/* ── Inner bezel ring ── */}
      <mesh position={[0, 0.075, 0]} material={goldMat}>
        <torusGeometry args={[0.48, 0.008, 16, 96]} />
      </mesh>

      {/* ── Dial face ── */}
      <mesh position={[0, 0.075, 0]} rotation={[Math.PI / 2, 0, 0]} material={dialMat}>
        <circleGeometry args={[0.47, 128]} />
      </mesh>

      {/* ── Subdial (small circle at 6 o'clock position) ── */}
      <mesh position={[0, 0.076, 0.22]} rotation={[Math.PI / 2, 0, 0]} material={dialMat}>
        <circleGeometry args={[0.09, 48]} />
      </mesh>
      <mesh position={[0, 0.077, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.085, 0.09, 48]} />
        <meshStandardMaterial color="#D4A017" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* ── Hour markers ── */}
      {hourMarkers.map(({ key, x, z, isMain }) => (
        <mesh
          key={key}
          position={[x, 0.078, z]}
          rotation={[Math.PI / 2, 0, 0]}
          material={markerMat}
        >
          {isMain
            ? <boxGeometry args={[0.025, 0.065, 0.002]} />
            : <boxGeometry args={[0.012, 0.04, 0.002]} />
          }
        </mesh>
      ))}

      {/* ── Minute track dots (60 marks) ── */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i / 60) * Math.PI * 2
        const r = 0.43
        if (i % 5 === 0) return null // skip where hour markers are
        return (
          <mesh
            key={`min-${i}`}
            position={[Math.sin(angle) * r, 0.078, Math.cos(angle) * r]}
            rotation={[Math.PI / 2, 0, 0]}
            material={markerMat}
          >
            <circleGeometry args={[0.005, 8]} />
          </mesh>
        )
      })}

      {/* ── Hands group (rotated in useFrame) ── */}
      <group ref={handsRef} position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Hour hand */}
        <mesh position={[0, 0.13, 0]} material={handMat}>
          <boxGeometry args={[0.022, 0.25, 0.008]} />
        </mesh>
        {/* Minute hand */}
        <mesh position={[0, 0.175, 0]} material={handMat}>
          <boxGeometry args={[0.014, 0.34, 0.006]} />
        </mesh>
      </group>

      {/* ── Seconds hand ── */}
      <group ref={secondsRef} position={[0, 0.082, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[0, 0.19, 0]} material={secondHandMat}>
          <boxGeometry args={[0.006, 0.37, 0.004]} />
        </mesh>
        {/* Counter-weight */}
        <mesh position={[0, -0.08, 0]} material={secondHandMat}>
          <boxGeometry args={[0.01, 0.12, 0.004]} />
        </mesh>
      </group>

      {/* ── Center cap ── */}
      <mesh position={[0, 0.084, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.022, 32]} />
        <meshStandardMaterial color="#D4A017" metalness={1} roughness={0.05} />
      </mesh>

      {/* ── Crystal (sapphire glass) ── */}
      <mesh ref={crystalRef} position={[0, 0.085, 0]} rotation={[Math.PI / 2, 0, 0]} material={crystalMat}>
        <circleGeometry args={[0.47, 128]} />
      </mesh>

      {/* ── Crown (winding crown on right side) ── */}
      <mesh position={[0.56, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} material={goldMat}>
        <cylinderGeometry args={[0.025, 0.02, 0.07, 24]} />
      </mesh>
      <mesh position={[0.595, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} material={goldMat}>
        <torusGeometry args={[0.025, 0.007, 12, 32]} />
      </mesh>

      {/* ── Lugs (4 case attachments) ── */}
      {[
        [0.18, 0.5, 0],
        [-0.18, 0.5, 0],
        [0.18, -0.5, 0],
        [-0.18, -0.5, 0],
      ].map(([x, y, z], i) => (
        <mesh key={`lug-${i}`} position={[x, y, z]} material={steelMat} castShadow>
          <boxGeometry args={[0.12, 0.18, 0.09]} />
        </mesh>
      ))}

    </group>
  )
}
