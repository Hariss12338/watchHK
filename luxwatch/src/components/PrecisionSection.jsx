import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * PrecisionSection — animated counter stats + movement diagram.
 */
export default function PrecisionSection() {
  const sectionRef = useRef()
  const headRef = useRef()
  const statsRef = useRef([])
  const dialRef = useRef()
  const linesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Head reveal
      gsap.fromTo(headRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 78%' }
        }
      )

      // Animated counter for stats
      statsRef.current.forEach((el, i) => {
        if (!el) return
        const target = parseFloat(el.dataset.target)
        const isFloat = el.dataset.target.includes('.')
        gsap.fromTo({ val: 0 },
          { val: 0 },
          {
            val: target,
            duration: 2.2,
            ease: 'power2.out',
            delay: i * 0.2,
            onUpdate: function() {
              el.textContent = isFloat
                ? this.targets()[0].val.toFixed(1)
                : Math.floor(this.targets()[0].val).toLocaleString()
            },
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      // Dial spins in
      gsap.fromTo(dialRef.current,
        { rotation: -180, opacity: 0, scale: 0.7 },
        {
          rotation: 0, opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out',
          scrollTrigger: { trigger: dialRef.current, start: 'top 75%' }
        }
      )

      // Lines draw in
      linesRef.current.forEach((line, i) => {
        if (!line) return
        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.8, ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: line, start: 'top 85%' }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: '28800', unit: 'vph', label: 'Beat frequency' },
    { value: '72', unit: 'hr', label: 'Power reserve' },
    { value: '0.5', unit: 'sec/day', label: 'Precision accuracy', isFloat: true },
    { value: '408', unit: 'parts', label: 'Movement components' },
  ]

  const specs = [
    ['Calibre', 'AUR-3186 In-house'],
    ['Functions', 'Hours · Minutes · Seconds'],
    ['Frequency', '28,800 A/h (4 Hz)'],
    ['Jewels', '31 Ruby jewels'],
    ['Finish', 'Côtes de Genève'],
    ['Certification', 'COSC Chronometer'],
  ]

  return (
    <section
      ref={sectionRef}
      id="precision"
      className="relative py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000 0%, #050300 50%, #000 100%)',
      }}
    >
      {/* Marquee strip */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden border-t border-b border-gold-600/10 py-3">
        <div className="marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="font-accent text-[0.55rem] tracking-[0.5em] text-gold-600/30 uppercase mx-10">
              Haute Horlogerie · Precision Engineering · Swiss Made · In-House Manufacture ·
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 md:px-16 pt-16">

        {/* Header */}
        <div ref={headRef} className="mb-24">
          <p className="font-accent text-[0.6rem] tracking-[0.5em] text-gold-600 uppercase mb-6">
            02 — Precision
          </p>
          <h2 className="font-display font-light text-5xl md:text-7xl leading-[0.9] text-white">
            The Art of<br />
            <span className="italic text-gold-shimmer">Absolute Time</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-32 border border-gold-600/10">
          {stats.map(({ value, unit, label, isFloat }, i) => (
            <div key={label} className="p-8 md:p-10 border-r border-gold-600/10 last:border-r-0 text-center">
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span
                  ref={(el) => (statsRef.current[i] = el)}
                  data-target={value}
                  className="stat-number text-4xl md:text-5xl text-white"
                >
                  0
                </span>
                <span className="font-body text-xs text-gold-500">{unit}</span>
              </div>
              <p className="font-body text-[0.6rem] tracking-[0.2em] text-stone-600 uppercase">{label}</p>
            </div>
          ))}
        </div>

        {/* Main content: dial vis + specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: movement diagram */}
          <div ref={dialRef} className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-gold-600/30" />
            <div className="absolute inset-4 rounded-full border border-gold-600/15" />
            <div className="absolute inset-10 rounded-full border border-gold-600/10" />

            {/* Gear teeth (decorative arcs) */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i / 36) * 360
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 origin-bottom"
                  style={{
                    width: '2px',
                    height: i % 3 === 0 ? '16px' : '8px',
                    background: `rgba(212,160,23,${i % 3 === 0 ? 0.6 : 0.2})`,
                    transform: `translate(-50%, -100%) rotate(${angle}deg) translateY(${-140}px)`,
                    borderRadius: '1px',
                  }}
                />
              )
            })}

            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-gold-600/30 to-transparent" />
            </div>

            {/* Central circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-gold-500/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-gold-500/20 flex items-center justify-center">
                  <span className="font-accent text-xs text-gold-500/60 tracking-widest">AUR</span>
                </div>
              </div>
            </div>

            {/* Orbiting dot */}
            <div
              className="absolute inset-0"
              style={{ animation: 'spin 8s linear infinite' }}
            >
              <div
                className="absolute w-2 h-2 rounded-full bg-gold-400"
                style={{ top: '8px', left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 10px #D4A017' }}
              />
            </div>

            {/* Label */}
            <div className="absolute -bottom-10 left-0 right-0 text-center">
              <span className="font-body text-[0.6rem] tracking-[0.3em] text-stone-600 uppercase">
                Calibre AUR-3186 · ø 29.5mm
              </span>
            </div>
          </div>

          {/* Right: specs list */}
          <div>
            <p className="font-body text-sm text-stone-400 leading-relaxed mb-10 max-w-sm">
              Our in-house movement represents three decades of research. Every gear tooth is cut to a tolerance
              of ±2 microns — less than a human red blood cell.
            </p>

            <div className="space-y-0">
              {specs.map(([key, val], i) => (
                <div
                  key={key}
                  ref={(el) => (linesRef.current[i] = el)}
                  className="flex justify-between items-center py-4 border-b border-white/5 origin-left"
                >
                  <span className="font-body text-[0.65rem] tracking-[0.2em] text-stone-600 uppercase">{key}</span>
                  <span className="font-display text-base text-white/80">{val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* CSS spin animation for orbiting dot */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
