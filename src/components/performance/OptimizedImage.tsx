import * as React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  priority = false,
  sizes = '100vw',
  onLoad,
  onError,
  placeholder,
  quality = 75,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState(placeholder || '');
  
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Generate responsive image sources
  const generateSources = (baseSrc: string) => {
    if (!baseSrc || baseSrc.startsWith('data:')) return [];
    
    const formats = ['avif', 'webp'];
    const breakpoints = [320, 640, 768, 1024, 1280, 1536];
    
    return formats.map(format => ({
      format,
      srcSet: breakpoints
        .map(bp => `${baseSrc}?w=${bp}&f=${format}&q=${quality} ${bp}w`)
        .join(', ')
    }));
  };

  const sources = generateSources(src);

  React.useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    
    // Intersection Observer for lazy loading
    if (loading === 'lazy' && !priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentSrc(src);
            observer.disconnect();
          }
        },
        { 
          rootMargin: '50px',
          threshold: 0.01
        }
      );

      observer.observe(img);
      return () => observer.disconnect();
    } else {
      setCurrentSrc(src);
    }
  }, [src, loading, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-muted flex items-center justify-center text-muted-foreground text-sm',
          className
        )}
        style={{ width, height }}
      >
        Image failed to load
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder while loading */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && !placeholder && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      <picture>
        {/* Modern formats */}
        {sources.map(({ format, srcSet }) => (
          <source
            key={format}
            type={`image/${format}`}
            srcSet={srcSet}
            sizes={sizes}
          />
        ))}
        
        {/* Fallback */}
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            'w-full h-full object-cover'
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
          {...props}
        />
      </picture>
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// Progressive enhancement wrapper
export function ProgressiveImage({ 
  src, 
  alt, 
  className,
  lowResSrc,
  ...props 
}: OptimizedImageProps & { lowResSrc?: string }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      placeholder={lowResSrc}
      {...props}
    />
  );
}