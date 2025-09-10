import * as React from 'react'

export function useInView<T extends HTMLElement>(rootMargin = '0px') {
  const ref = React.useRef<T | null>(null)
  const [inView, setInView] = React.useState(false)
  
  React.useEffect(() => {
    if (!ref.current) return
    
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting), 
      { rootMargin, threshold: 0.15 }
    )
    
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [rootMargin])
  
  return { ref, inView }
}

export function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  
  React.useEffect(() => {
    const observers: IntersectionObserver[] = []
    
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(id)
          })
        },
        { 
          rootMargin: `-${offset}px 0px -60% 0px`, 
          threshold: 0.2 
        }
      )
      
      obs.observe(el)
      observers.push(obs)
    })
    
    return () => observers.forEach((obs) => obs.disconnect())
  }, [ids, offset])
  
  return activeId
}