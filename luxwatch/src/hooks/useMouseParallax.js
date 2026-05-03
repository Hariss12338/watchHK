import { useEffect, useRef } from 'react'

/**
 * useMouseParallax — tracks normalised mouse position (-1 to 1)
 * Returns a ref {x, y} updated on mousemove — no re-renders.
 */
export function useMouseParallax() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return mouse
}
