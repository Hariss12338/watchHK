import { useEffect, useRef } from 'react'

/**
 * CustomCursor — small gold dot + larger ring follower.
 * Scales up on hoverable elements. Hidden on mobile.
 */
export default function CustomCursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Direct position (no lag)
    const handleMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
    }

    // Ring follows with lerp (done in rAF)
    let rafId
    const lerp = (a, b, t) => a + (b - a) * t
    const follow = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12)
      ring.style.left = `${ringPos.current.x}px`
      ring.style.top = `${ringPos.current.y}px`
      rafId = requestAnimationFrame(follow)
    }
    rafId = requestAnimationFrame(follow)

    // Hover effect
    const addHover = () => dot.classList.add('hovered')
    const removeHover = () => dot.classList.remove('hovered')

    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    // Hide default cursor
    document.body.style.cursor = 'none'

    window.addEventListener('mousemove', handleMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafId)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-follower hidden md:block" />
    </>
  )
}
