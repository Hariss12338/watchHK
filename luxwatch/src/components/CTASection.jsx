import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef()
  const headRef = useRef()
  const cardsRef = useRef([])
  const ctaRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(headRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 80%' }
        }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: i * 0.2,
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        )
      })

      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const watches = [
    {
      name: 'Aurum XII',
      sub: 'Rose Gold / Black Dial',
      price: 'CHF 28,400',
      color: 'from-amber-900/30',
      symbol: 'I',
    },
    {
      name: 'Aurum XII Date',
      sub: 'White Gold / Blue Dial',
      price: 'CHF 31,200',
      color: 'from-blue-900/30',
      symbol: 'II',
      featured: true,
    },
    {
      name: 'Aurum XII GMT',
      sub: 'Steel / Silver Dial',
      price: 'CHF 24,600',
      color: 'from-stone-800/30',
      symbol: 'III',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative py-40 bg-black overflow-hidden"
    >
      {/* Top gold line */}
      <div className="gold-line mb-0" />

      {/* Background shimmer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(212,160,23,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-screen-xl mx-auto px-8 md:px-16">

        {/* Heading */}
        <div ref={headRef} className="text-center mb-24">
          <p className="font-accent text-[0.6rem] tracking-[0.5em] text-gold-600 uppercase mb-6">
            05 — The Collection
          </p>
          <h2 className="font-display font-light text-5xl md:text-8xl leading-[0.85] text-white mb-8">
            Choose Your<br />
            <span className="italic text-gold-shimmer">Legacy</span>
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-gold-600/40 to-transparent mx-auto" />
        </div>

        {/* Watch cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {watches.map(({ name, sub, price, color, symbol, featured }, i) => (
            <div
              key={name}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`group relative cursor-pointer transition-all duration-700 ${
                featured ? 'md:-translate-y-6' : ''
              }`}
            >
              {/* Featured badge */}
              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gold-500 px-4 py-1">
                  <span className="font-accent text-[0.55rem] tracking-[0.3em] text-black uppercase">
                    New Release
                  </span>
                </div>
              )}

              <div
                className={`glass-card overflow-hidden group-hover:border-gold-500/40 transition-all duration-500`}
                style={{
                  boxShadow: featured
                    ? '0 0 60px rgba(212,160,23,0.12), 0 0 120px rgba(212,160,23,0.06)'
                    : 'none',
                }}
              >
                {/* Watch visual */}
                <div className={`relative h-72 bg-gradient-to-br ${color} to-black flex items-center justify-center overflow-hidden`}>
                  {/* Decorative rings */}
                  <div className="absolute inset-8 rounded-full border border-gold-600/10 group-hover:border-gold-600/20 transition-colors duration-500" />
                  <div className="absolute inset-16 rounded-full border border-gold-600/10" />

                  {/* Roman numeral */}
                  <span
                    className="font-accent text-[6rem] transition-transform duration-700 group-hover:scale-110"
                    style={{ color: 'rgba(212,160,23,0.15)' }}
                  >
                    {symbol}
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="p-7">
                  <h3 className="font-display text-xl text-white mb-1">{name}</h3>
                  <p className="font-body text-xs text-stone-500 mb-5">{sub}</p>

                  <div className="flex items-center justify-between">
                    <span className="font-display italic text-lg text-gold-400">{price}</span>
                    <button className="btn-luxury border border-gold-600/40 px-4 py-2 text-gold-400 text-[0.6rem]">
                      <span>Configure</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div ref={ctaRef} className="text-center">
          <div className="inline-flex flex-col items-center gap-8">
            <p className="font-display italic text-xl text-stone-400 max-w-lg text-center leading-relaxed">
              Each Aurum is crafted to order. Allow 18–24 weeks for delivery.
              <br />
              <span className="text-gold-400">Schedule a private consultation.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                className="btn-luxury bg-gold-600 border border-gold-500 px-12 py-4 text-black font-semibold"
                style={{ background: 'linear-gradient(135deg, #C9960C, #F5C842, #B8860B)' }}
              >
                <span style={{ color: '#000' }}>Reserve Yours</span>
              </button>
              <button className="btn-luxury border border-stone-800 px-10 py-4 text-stone-400">
                <span>Explore Full Collection</span>
              </button>
            </div>

            <div className="flex items-center gap-8">
              {['Free worldwide shipping', '5-year guarantee', 'Certificate of authenticity'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold-500" />
                  <span className="font-body text-[0.6rem] tracking-[0.1em] text-stone-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
