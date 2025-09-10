import * as React from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className,
  ...props 
}: OptimizedImageProps) {
  const [loaded, setLoaded] = React.useState(false)
  const [error, setError] = React.useState(false)
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded && !error && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted animate-pulse"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        />
      )}
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          error && "hidden"
        )}
        {...props}
      />
      
      {error && (
        <div 
          className="flex items-center justify-center bg-muted/20 text-muted-foreground text-sm"
          style={{ 
            aspectRatio: width && height ? `${width}/${height}` : "16/9",
            minHeight: height || 200
          }}
        >
          Image unavailable
        </div>
      )}
    </div>
  )
}