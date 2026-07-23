import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

export function Animate({ children, delay = 0, direction = 'up', style = {}, as: Tag = 'div' }) {
  const [ref, inView] = useInView()
  const yOffset = direction === 'up' ? 28 : direction === 'down' ? -28 : 0
  const xOffset = direction === 'left' ? 28 : direction === 'right' ? -28 : 0
  return (
    <Tag
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0,0)' : `translate(${xOffset}px, ${yOffset}px)`,
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
