import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * DesignSection — horizontal scroll panel + design language storytelling.
 */
export default function DesignSection() {
  const sectionRef = useRef()
  const headRef = useRef()
  const panelsRef = useRef([])
  const glowRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(headRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 80%' }
        }
      )

      // Stagger panel reveals
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return
        gsap.fromTo(panel,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 1.1, ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: panel,
              start: 'top 88%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      // Glow pulses on scroll
      gsap.fromTo(glowRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 1.5,
          scrollTrigger: { trigger: glowRef.current, start: 'top 70%' }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const details = [
    {
      tag: 'Crown',
      title: 'Fluted Bezel',
      body: 'The signature Aurum fluting. Cut at 45° on a 6-axis CNC, then hand-polished for 3 hours to achieve mirror perfection.',
      accent: '#D4A017',
      gradient: 'radial-gradient(ellipse at 40% 40%, #2d1e00 0%, #0a0800 60%, #000 100%)',
    },
    {
      tag: 'Dial',
      title: 'Sunburst Finish',
      body: 'Achieved by brushing the raw dial in concentric circles from the centre outward. Each dial takes 40 minutes to finish.',
      accent: '#9090ff',
      gradient: 'radial-gradient(ellipse at 60% 30%, #000820 0%, #000010 60%, #000 100%)',
    },
    {
      tag: 'Hands',
      title: 'Dauphine Cut',
      body: 'The signature arrowhead hand profile. Requires 7 distinct polishing angles to achieve the sharp ridge that catches light.',
      accent: '#D4A017',
      gradient: 'radial-gradient(ellipse at 50% 60%, #1a1200 0%, #080600 60%, #000 100%)',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="design"
      className="relative py-40 bg-black overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(212,160,23,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-screen-xl mx-auto px-8 md:px-16">

        {/* Header */}
        <div ref={headRef} className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-accent text-[0.6rem] tracking-[0.5em] text-gold-600 uppercase mb-6">
              03 — Design
            </p>
            <h2 className="font-display font-light text-5xl md:text-7xl leading-[0.9] text-white">
              Light as<br />
              <span className="italic text-gold-shimmer">Medium</span>
            </h2>
          </div>
          <p className="font-body text-sm text-stone-400 max-w-xs leading-relaxed">
            Every surface angle is engineered to direct light. The Aurum XII speaks before it is worn.
          </p>
        </div>

        {/* Detail panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {details.map(({ tag, title, body, accent, gradient }, i) => (
            <div
              key={tag}
              ref={(el) => (panelsRef.current[i] = el)}
              className="group relative aspect-[3/4] rounded-sm overflow-hidden cursor-default"
              style={{ background: gradient }}
            >
              {/* Border that lights up on hover */}
              <div
                className="absolute inset-0 border border-transparent group-hover:border-gold-600/30 transition-colors duration-500 rounded-sm"
              />

              {/* Scan lines */}
              {Array.from({ length: 20 }).map((_, j) => (
                <div
                  key={j}
                  className="absolute left-0 right-0 h-px"
                  style={{
                    top: `${j * 5}%`,
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.01), transparent)`,
                  }}
                />
              ))}

              {/* Large decorative symbol */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-accent text-[7rem] select-none transition-transform duration-700 group-hover:scale-110"
                  style={{ color: `${accent}0a` }}
                >
                  {i === 0 ? '◈' : i === 1 ? '◎' : '◆'}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="mb-4">
                  <div
                    className="w-8 h-px mb-3"
                    style={{ background: accent }}
                  />
                  <span className="font-accent text-[0.55rem] tracking-[0.4em] uppercase"
                        style={{ color: accent }}>
                    {tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-white mb-3">{title}</h3>
                <p className="font-body text-xs text-stone-500 leading-relaxed">{body}</p>
              </div>

              {/* Hover shimmer overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,160,23,0.04) 0%, transparent 60%)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Full-width design language strip */}
        <div className="border border-gold-600/10 p-10 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { label: 'Dial Diameter', value: '41 mm' },
              { label: 'Case Height', value: '12.4 mm' },
              { label: 'Lug-to-lug', value: '48.5 mm' },
              { label: 'Crystal', value: 'Sapphire' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="font-display italic text-3xl text-white mb-2">{value}</div>
                <div className="font-body text-[0.6rem] tracking-[0.2em] text-stone-600 uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
