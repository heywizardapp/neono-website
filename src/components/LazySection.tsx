import * as React from 'react'
import { useInView } from '@/lib/useInView'

interface LazySectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  rootMargin?: string
}

export function LazySection({ 
  children, 
  fallback = <SectionSkeleton />, 
  className = '',
  rootMargin = '100px'
}: LazySectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>(rootMargin)
  
  return (
    <div ref={ref} className={className}>
      {inView ? children : fallback}
    </div>
  )
}

function SectionSkeleton() {
  return (
    <div className="py-20 lg:py-32">
      <div className="container">
        <div className="space-y-8">
          <div className="h-8 w-1/3 bg-muted rounded animate-pulse mx-auto" />
          <div className="h-4 w-2/3 bg-muted rounded animate-pulse mx-auto" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}