# AURUM — Premium Luxury Watch Website

A cinematic, award-worthy luxury watch website built with React, Three.js (R3F), GSAP ScrollTrigger, Tailwind CSS, and Lenis smooth scroll.

---

## Quick Start

### 1. Install Dependencies

```bash
cd luxwatch
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## Project Structure

```
luxwatch/
├── index.html                    # Root HTML + Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Root component, layout
    ├── index.css                 # Global styles + Tailwind
    ├── hooks/
    │   ├── useLenis.js           # Smooth scroll + GSAP sync
    │   └── useMouseParallax.js   # Mouse position tracker
    └── components/
        ├── WatchModel.jsx        # Procedural 3D watch geometry
        ├── WatchScene.jsx        # R3F Canvas + lighting rig
        ├── LoadingScreen.jsx     # Cinematic gold progress loader
        ├── CustomCursor.jsx      # Gold dot + follower ring cursor
        ├── Navbar.jsx            # Fixed navigation
        ├── Hero.jsx              # Fullscreen 3D hero
        ├── CraftsmanshipSection.jsx
        ├── PrecisionSection.jsx  # Animated stats + movement diagram
        ├── DesignSection.jsx     # Material detail panels
        ├── ShowcaseSection.jsx   # Pinned scroll-rotated 3D watch
        ├── CTASection.jsx        # Collection grid + buy CTA
        └── Footer.jsx
```

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool |
| Three.js | 0.165 | 3D engine |
| @react-three/fiber | 8 | React renderer for Three.js |
| @react-three/drei | 9 | R3F helpers (Float, ContactShadows, Environment) |
| GSAP + ScrollTrigger | 3.12 | Scroll animations |
| Lenis | 1.1 | Smooth scroll |
| Tailwind CSS | 3 | Utility CSS |

---

## Features

### 🎬 Hero Section
- Fullscreen React Three Fiber canvas with procedural luxury watch
- Real-time clock hands (shows actual current time)
- Mouse parallax — subtle tilt follows cursor
- Cinematic GSAP entrance sequence with staggered reveals
- Stats strip: vibrations, power reserve, water resistance

### ⚙️ 3D Watch Model
- Built entirely from Three.js primitives (no external model file needed)
- 18k rose gold case, bezel, crown — `MeshStandardMaterial` with `metalness: 0.95`
- Sapphire crystal using `MeshPhysicalMaterial` with `transmission`
- Animated clock hands (hours, minutes, seconds) synced to real time
- 12 applied gold hour markers + 48 minute dots
- Environment map IBL for authentic metal reflections
- Contact shadows with gold tint
- Float animation for gentle levitation

### 📜 Scroll Storytelling (GSAP ScrollTrigger)
- **Craftsmanship** — staggered card reveals, parallax image, quote
- **Precision** — animated counter stats (count up on enter), spinning movement diagram
- **Design** — hover-reactive detail panels with gradient backgrounds
- **Showcase** — **pinned section** where scroll rotates watch through 4 viewing angles with panel transitions

### 💎 UI/UX
- Cinematic gold loading screen with progress bar
- Custom cursor: gold dot + lagging ring follower (desktop only)
- Glassmorphism cards with `backdrop-filter: blur`
- Gold shimmer text animation (CSS `background-position` keyframe)
- Noise texture overlay for premium paper-like feel
- Luxury typography: Cinzel (display) + Cormorant Garamond (headline) + Montserrat (body)

---

## Customisation

### Swap watch colors
Edit material colors in `WatchModel.jsx`:
```js
const goldMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#C9960C'),  // Change this
  ...
})
```

### Add a real GLTF model
Replace `<WatchModel />` in `WatchScene.jsx` with:
```jsx
import { useGLTF } from '@react-three/drei'
function RealWatch() {
  const { scene } = useGLTF('/watch.glb')
  return <primitive object={scene} />
}
```

### Change brand name
Search and replace `AURUM` across all files.

---

## Performance Notes

- `AdaptiveDpr` automatically reduces pixel ratio on low-end devices
- `AdaptiveEvents` stops processing events when off-screen
- Canvas uses `powerPreference: 'high-performance'`
- Google Fonts loaded with `rel=preconnect` for speed
- GSAP contexts properly cleaned up on unmount (`ctx.revert()`)
