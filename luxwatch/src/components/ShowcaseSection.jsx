import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WatchScene from './WatchScene'
import { useMouseParallax } from '../hooks/useMouseParallax'

gsap.registerPlugin(ScrollTrigger)

/**
 * ShowcaseSection — Pinned section where scroll rotates the watch through
 * multiple camera "angles" (driven by scroll progress).
 * The text panels for each angle fade in/out as the user scrolls.
 */
export default function ShowcaseSection() {
  const mouseRef = useMouseParallax()
  const sectionRef = useRef()
  const stickyRef = useRef()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activePanel, setActivePanel] = useState(0)
  const panelRefs = useRef([])

  const panels = [
    {
      tag: '— Front View',
      title: 'The Face of Time',
      body: 'The Aurum XII dial in all its geometry. Twelve applied hour markers in 18k gold plate. Luminova-coated Dauphine hands.',
      angle: '12h position',
    },
    {
      tag: '— Profile',
      title: 'Architectural Form',
      body: 'A 12.4mm case height sculpted for the wrist. The polished center-link bracelet flows into brushed outer edges.',
      angle: '3h position',
    },
    {
      tag: '— Caseback',
      title: 'The Soul Within',
      body: 'A sapphire display caseback reveals the Calibre 3186 oscillating at 28,800 vph. Côtes de Genève finishing visible.',
      angle: 'Caseback',
    },
    {
      tag: '— Detail',
      title: 'Crown & Pushers',
      body: 'The fluted winding crown in 18k gold. Screws down to 300m water resistance. Three correctors at 4, 8, and 10 o\'clock.',
      angle: 'Crown detail',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Pin the showcase and drive scroll progress
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * (panels.length + 0.5)}`,
        pin: true,
        onUpdate: (self) => {
          const prog = self.progress
          setScrollProgress(prog * Math.PI * 3)

          // Determine active panel
          const idx = Math.min(
            Math.floor(prog * (panels.length + 0.5)),
            panels.length - 1
          )
          setActivePanel(idx)
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate panel text when activePanel changes
  useEffect(() => {
    panelRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === activePanel) {
        gsap.fromTo(el,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
        )
      } else {
        gsap.to(el, { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' })
      }
    })
  }, [activePanel])

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative h-screen bg-black overflow-hidden"
    >
      {/* ── 3D Watch canvas ── */}
      <div className="absolute inset-0 z-10 watch-glow">
        <WatchScene
          scrollProgress={scrollProgress}
          mouseRef={mouseRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* ── Header ── */}
      <div className="absolute top-16 left-8 md:left-16 z-20">
        <p className="font-accent text-[0.6rem] tracking-[0.5em] text-gold-600 uppercase mb-3">
          04 — Showcase
        </p>
        <h2 className="font-display font-light text-4xl md:text-5xl text-white leading-tight">
          Every Angle<br />
          <span className="italic text-gold-shimmer">Perfected</span>
        </h2>
      </div>

      {/* ── Text panels (stacked, fade in/out) ── */}
      <div className="absolute bottom-20 left-8 md:left-16 z-20 max-w-xs">
        {panels.map(({ tag, title, body, angle }, i) => (
          <div
            key={i}
            ref={(el) => (panelRefs.current[i] = el)}
            className="absolute bottom-0 left-0 opacity-0"
          >
            <span className="font-accent text-[0.58rem] tracking-[0.3em] text-gold-600/70 uppercase block mb-3">
              {tag}
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-white mb-4">{title}</h3>
            <p className="font-body text-xs text-stone-400 leading-relaxed mb-6">{body}</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gold-500" />
              <span className="font-body text-[0.6rem] tracking-[0.2em] text-gold-500/60 uppercase">{angle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Progress dots ── */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {panels.map((_, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center w-4 h-4"
          >
            <div
              className="rounded-full transition-all duration-500"
              style={{
                width: i === activePanel ? '8px' : '4px',
                height: i === activePanel ? '8px' : '4px',
                background: i === activePanel ? '#D4A017' : 'rgba(212,160,23,0.25)',
                boxShadow: i === activePanel ? '0 0 12px rgba(212,160,23,0.8)' : 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-6 right-10 z-20">
        <p className="font-body text-[0.55rem] tracking-[0.25em] text-stone-600 uppercase">
          Scroll to rotate
        </p>
      </div>

    </section>
  )
}
