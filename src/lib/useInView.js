import { useEffect, useRef } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold }
    )

    const el = ref.current
    if (el) {
      const targets = el.querySelectorAll('.fade-up')
      targets.forEach((t) => observer.observe(t))
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
