import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * LoadingScreen — cinematic black loader with gold progress line.
 * Hides after ~2.5s and reveals main content.
 */
export default function LoadingScreen({ onComplete }) {
  const overlayRef = useRef()
  const lineRef = useRef()
  const textRef = useRef()
  const percentRef = useRef()
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up and reveal
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete,
        })
      }
    })

    // Animate percentage counter
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: function() {
        const v = Math.floor(this.targets()[0].val)
        setPct(v)
        if (lineRef.current) {
          lineRef.current.style.width = `${v}%`
        }
      }
    }, 0)

    // Fade in text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0
    )

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      {/* Brand */}
      <div ref={textRef} className="text-center mb-16 opacity-0">
        <div className="font-accent text-3xl tracking-[0.6em] text-gold-400 mb-3">AURUM</div>
        <p className="font-body text-[0.6rem] tracking-[0.4em] text-stone-700 uppercase">
          Maison d'Horlogerie · Geneva
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-48 relative">
        <div className="w-full h-px bg-stone-900">
          <div
            ref={lineRef}
            className="h-full bg-gold-500 transition-none"
            style={{ width: '0%', boxShadow: '0 0 8px rgba(212,160,23,0.8)' }}
          />
        </div>
        <div className="mt-4 text-center">
          <span
            ref={percentRef}
            className="font-body text-[0.6rem] tracking-[0.2em] text-stone-700"
          >
            {pct}
          </span>
        </div>
      </div>
    </div>
  )
}
