import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type CarouselProps = {
  children: React.ReactNode[]
  autoPlayMs?: number // set to 0 to disable
  ariaLabel?: string
  className?: string
}

export function AccessibleCarousel({ children, autoPlayMs = 0, ariaLabel = 'carousel', className = '' }: CarouselProps) {
  const count = React.Children.count(children)
  const [index, setIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const autoRef = React.useRef<number | null>(null)
  
  // Respect user preferences
  const reducedMotion = React.useMemo(() => 
    typeof window !== 'undefined' && 
    window.matchMedia && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches, []
  )
  
  const reducedData = React.useMemo(() => 
    typeof window !== 'undefined' && 
    window.matchMedia && 
    window.matchMedia('(prefers-reduced-data: reduce)').matches, []
  )

  // autoplay (paused on reduced motion/data, hover, or when tab inactive)
  React.useEffect(() => {
    if (!autoPlayMs || reducedMotion || reducedData) return
    
    function start() { 
      stop()
      autoRef.current = window.setInterval(() => 
        setIndex((i) => (i + 1) % count), autoPlayMs
      ) 
    }
    
    function stop() { 
      if (autoRef.current) { 
        clearInterval(autoRef.current)
        autoRef.current = null 
      } 
    }
    
    const node = containerRef.current
    start()
    
    const onEnter = () => stop()
    const onLeave = () => start()
    const onVisibilityChange = () => document.hidden ? stop() : start()
    
    node?.addEventListener('pointerenter', onEnter)
    node?.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)
    
    return () => { 
      stop()
      node?.removeEventListener('pointerenter', onEnter)
      node?.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [autoPlayMs, count, reducedMotion, reducedData])

  // keyboard navigation
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setIndex((i) => (i + 1) % count)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setIndex((i) => (i - 1 + count) % count)
    }
  }

  // swipe handling (pointer events)
  const startX = React.useRef<number | null>(null)
  const deltaX = React.useRef(0)
  const threshold = 50
  
  function onPointerDown(e: React.PointerEvent) { 
    startX.current = e.clientX
    deltaX.current = 0
    ;(e.target as Element).setPointerCapture?.(e.pointerId) 
  }
  
  function onPointerMove(e: React.PointerEvent) { 
    if (startX.current != null) {
      deltaX.current = e.clientX - startX.current 
    }
  }
  
  function onPointerUp() {
    if (startX.current != null) {
      if (deltaX.current > threshold) {
        setIndex((i) => (i - 1 + count) % count)
      } else if (deltaX.current < -threshold) {
        setIndex((i) => (i + 1) % count)
      }
    }
    startX.current = null
    deltaX.current = 0
  }

  // Announce slide changes for screen readers
  const [announcement, setAnnouncement] = React.useState('')
  React.useEffect(() => {
    setAnnouncement(`Slide ${index + 1} of ${count}`)
  }, [index, count])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="overflow-hidden rounded-2xl">
        <div
          className={`flex will-change-transform ${!reducedMotion ? 'transition-transform duration-300 ease-out' : ''}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {React.Children.map(children, (child, i) => (
            <div 
              key={i}
              className="shrink-0 grow-0 basis-full" 
              aria-hidden={i !== index}
              role="tabpanel"
              aria-label={`Slide ${i + 1} of ${count}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-y-0 left-2 flex items-center">
        <button 
          aria-label="Previous slide" 
          onClick={() => setIndex((i) => (i - 1 + count) % count)} 
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border bg-background/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-2 flex items-center">
        <button 
          aria-label="Next slide" 
          onClick={() => setIndex((i) => (i + 1) % count)} 
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border bg-background/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Slides">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`min-w-[44px] min-h-[44px] p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-200`}
          >
            <div className={`h-2 w-2 rounded-full transition-all duration-200 ${i === index ? 'bg-primary scale-125' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`} />
          </button>
        ))}
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </div>
  )
}