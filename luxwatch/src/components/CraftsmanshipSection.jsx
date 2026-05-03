import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * CraftsmanshipSection — materials + gold/steel finish storytelling.
 * Uses GSAP ScrollTrigger to reveal content as user scrolls.
 */
export default function CraftsmanshipSection() {
  const sectionRef = useRef()
  const headRef = useRef()
  const contentRef = useRef()
  const cardsRef = useRef([])
  const imageRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Headline reveal
      gsap.fromTo(headRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: headRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Image parallax
      gsap.fromTo(imageRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const materials = [
    {
      title: '18k Rose Gold',
      desc: 'Alloyed in-house with a proprietary formula for unmatched warmth and durability.',
      icon: '◈',
    },
    {
      title: 'Sapphire Crystal',
      desc: 'Scratch-resistant synthetic sapphire with anti-reflective coating on both sides.',
      icon: '◇',
    },
    {
      title: 'Grade 5 Titanium',
      desc: 'Aerospace-grade alloy. Stronger than steel at less than half the weight.',
      icon: '△',
    },
    {
      title: 'Alligator Leather',
      desc: 'Hand-stitched Louisiana alligator. Each strap unique as the creature it came from.',
      icon: '◉',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="craftsmanship"
      className="relative py-40 bg-black overflow-hidden"
    >
      {/* Subtle diagonal gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(180,130,10,0.04) 0%, transparent 50%, rgba(20,30,80,0.06) 100%)'
        }}
      />

      <div className="max-w-screen-xl mx-auto px-8 md:px-16">

        {/* Header */}
        <div ref={headRef} className="mb-20">
          <p className="font-accent text-[0.6rem] tracking-[0.5em] text-gold-600 uppercase mb-6">
            01 — Craftsmanship
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="font-display font-light text-5xl md:text-7xl leading-[0.9] text-white">
              Born from<br />
              <span className="italic text-gold-shimmer">Rare Earth</span>
            </h2>
            <p className="font-body font-light text-sm text-stone-400 max-w-xs leading-relaxed md:text-right"
               style={{ letterSpacing: '0.04em' }}>
              Every Aurum timepiece begins as raw ore and ends as a masterwork.
              The transformation takes 1,840 hours of hand work.
            </p>
          </div>
        </div>

        <hr className="gold mb-20" />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: large visual placeholder */}
          <div ref={imageRef} className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0">
            {/* Decorative box */}
            <div className="absolute inset-0 border border-gold-600/20 rounded-sm" />
            <div className="absolute inset-4 border border-gold-600/10 rounded-sm" />

            {/* Gradient background simulating a macro material shot */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                background: 'radial-gradient(ellipse at 35% 40%, #3d2a00 0%, #1a1000 30%, #0a0800 60%, #000 100%)',
              }}
            />

            {/* Gold texture lines */}
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px"
                style={{
                  top: `${(i / 18) * 100}%`,
                  background: `linear-gradient(90deg, transparent, rgba(212,160,23,${0.03 + Math.sin(i) * 0.03}), transparent)`,
                  transform: `skewY(${Math.sin(i * 0.5) * 2}deg)`,
                }}
              />
            ))}

            {/* Big roman numeral watermark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-accent text-[8rem] font-bold leading-none select-none"
                style={{ color: 'rgba(212,160,23,0.06)' }}
              >
                XII
              </span>
            </div>

            {/* Caption */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-body text-[0.6rem] tracking-[0.25em] text-gold-600/60 uppercase">
                18k Rose Gold — Ref. AUR-XII-RG
              </p>
            </div>

            {/* Gold corner accents */}
            {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-6 h-6`}>
                <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-px h-6 bg-gold-500/60`} />
                <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-6 h-px bg-gold-500/60`} />
              </div>
            ))}
          </div>

          {/* Right: material cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {materials.map((mat, i) => (
              <div
                key={mat.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className="glass-card p-6 group hover:border-gold-500/40 transition-all duration-500 cursor-default"
              >
                <div className="font-accent text-gold-500 text-xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {mat.icon}
                </div>
                <h3 className="font-display font-light text-xl text-white mb-3">
                  {mat.title}
                </h3>
                <p className="font-body text-xs text-stone-500 leading-relaxed">
                  {mat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom quote */}
        <div className="mt-32 text-center">
          <blockquote className="font-display italic text-3xl md:text-4xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            "We do not merely assemble watches.
            <br />
            <span className="text-gold-400">We author time itself."</span>
          </blockquote>
          <p className="mt-6 font-body text-[0.6rem] tracking-[0.3em] text-stone-600 uppercase">
            — Henri Aurum, Founder, 1887
          </p>
        </div>

      </div>
    </section>
  )
}
