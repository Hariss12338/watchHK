import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import WatchScene from './WatchScene'
import { useMouseParallax } from '../hooks/useMouseParallax'

export default function Hero() {
  const mouseRef = useMouseParallax()
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef()
  const headlineRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  const scrollIndicatorRef = useRef()
  const lineRef = useRef()
  const taglineRef = useRef()
  const labelRef = useRef()

  useEffect(() => {
    // Track scroll progress for 3D model rotation
    const handleScroll = () => {
      const el = heroRef.current
      if (!el) return
      const progress = window.scrollY / (window.innerHeight * 0.8)
      setScrollProgress(Math.min(progress, 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Cinematic entrance sequence
    const tl = gsap.timeline({ delay: 0.3 })

    // Label slides in
    tl.fromTo(labelRef.current,
      { y: 30, opacity: 0, letterSpacing: '0.1em' },
      { y: 0, opacity: 1, letterSpacing: '0.4em', duration: 1.2, ease: 'power3.out' }
    )

    // Line expands
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.0, ease: 'power2.inOut' },
      '-=0.5'
    )

    // Headline splits in
    tl.fromTo(headlineRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' },
      '-=0.6'
    )

    // Subtitle
    tl.fromTo(subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
      '-=0.8'
    )

    // CTA
    tl.fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.6'
    )

    // Tagline
    tl.fromTo(taglineRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )

    // Scroll indicator bounces
    tl.fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    )

    // Looping scroll indicator animation
    gsap.to(scrollIndicatorRef.current, {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    })

    return () => tl.kill()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* ── Radial gradient background ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(180,130,10,0.08) 0%, rgba(0,0,0,0) 70%), radial-gradient(ellipse 50% 80% at 20% 50%, rgba(20,30,80,0.12) 0%, transparent 60%)',
        }}
      />

      {/* ── Three.js Watch (full-screen canvas) ── */}
      <div className="absolute inset-0 z-10 watch-glow">
        <WatchScene
          scrollProgress={scrollProgress}
          mouseRef={mouseRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* ── Left content panel ── */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex flex-col justify-center px-10 md:px-20 max-w-2xl">

        {/* Collection label */}
        <div ref={labelRef} className="mb-6 opacity-0">
          <span className="font-accent text-[0.6rem] tracking-[0.4em] text-gold-500 uppercase">
            Collection XII — 2025
          </span>
        </div>

        {/* Decorative line */}
        <div ref={lineRef} className="w-16 h-px bg-gold-500 mb-8 origin-left" style={{ scaleX: 0 }} />

        {/* Main headline */}
        <div ref={headlineRef} className="overflow-hidden opacity-0">
          <h1 className="font-display font-light leading-[0.9] mb-0">
            <span className="block text-7xl md:text-8xl lg:text-[7rem] text-white">Timeless</span>
            <span className="block text-7xl md:text-8xl lg:text-[7rem] text-gold-shimmer italic">Precision</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 font-body font-light text-sm md:text-base text-stone-400 leading-relaxed max-w-sm opacity-0"
          style={{ letterSpacing: '0.05em' }}
        >
          Engineered to the thousandth of a millimetre.
          <br />
          Every component a testament to perfection.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-10 flex items-center gap-6 opacity-0">
          <button className="btn-luxury border border-gold-500 px-8 py-3.5 text-gold-300">
            <span>Explore Collection</span>
          </button>
          <button className="flex items-center gap-3 font-body text-[0.65rem] tracking-[0.2em] text-stone-400 uppercase hover:text-gold-400 transition-colors group">
            <span className="w-8 h-px bg-stone-600 group-hover:bg-gold-400 group-hover:w-12 transition-all duration-300" />
            Our Story
          </button>
        </div>

        {/* Bottom tagline */}
        <div ref={taglineRef} className="mt-16 opacity-0">
          <p className="font-body text-[0.6rem] tracking-[0.3em] text-stone-600 uppercase">
            Since 1887 · Geneva, Switzerland
          </p>
        </div>
      </div>

      {/* ── Right: vertical text ── */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-4">
        <div
          className="font-accent text-[0.55rem] tracking-[0.3em] text-stone-600 uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Haute Horlogerie
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-600/40 to-transparent" />
        <div
          className="font-accent text-[0.55rem] tracking-[0.3em] text-stone-600 uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          AURUM XII
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="font-body text-[0.55rem] tracking-[0.3em] text-stone-600 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold-600/60 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
      </div>

      {/* ── Stats strip at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 hidden md:grid grid-cols-3 border-t border-white/5">
        {[
          { value: '28,800', label: 'Vibrations per hour' },
          { value: '72h', label: 'Power reserve' },
          { value: '300m', label: 'Water resistance' },
        ].map(({ value, label }) => (
          <div key={label} className="px-10 py-5 border-r border-white/5 last:border-r-0">
            <div className="stat-number text-2xl text-gold-400">{value}</div>
            <div className="font-body text-[0.58rem] tracking-[0.2em] text-stone-600 uppercase mt-1">{label}</div>
          </div>
        ))}
      </div>

    </section>
  )
}
