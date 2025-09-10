import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholderSrc?: string;
  alt: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  srcSet?: string;
}

export function ProgressiveImage({
  src,
  placeholderSrc,
  alt,
  priority = false,
  onLoad,
  onError,
  fallbackSrc,
  aspectRatio,
  objectFit = 'cover',
  sizes,
  srcSet,
  className,
  style,
  ...props
}: ProgressiveImageProps) {
  const [imageState, setImageState] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = React.useState(placeholderSrc || '');
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Load the main image
  React.useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    const handleLoad = () => {
      setCurrentSrc(src);
      setImageState('loaded');
      onLoad?.();
    };

    const handleError = () => {
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setImageState('loaded');
      } else {
        setImageState('error');
      }
      onError?.();
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    
    // Set up srcset and sizes for responsive images
    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc, onLoad, onError, srcSet, sizes]);

  // Generate blur placeholder CSS
  const getPlaceholderStyles = (): React.CSSProperties => {
    if (!placeholderSrc) return {};
    
    return {
      backgroundImage: `url(${placeholderSrc})`,
      backgroundSize: objectFit,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: imageState === 'loading' ? 'blur(10px)' : 'none',
    };
  };

  // Handle intersection observer for lazy loading
  React.useEffect(() => {
    if (priority || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Image is in view, start loading
          observer.unobserve(img);
        }
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    );

    observer.observe(img);

    return () => {
      if (img) observer.unobserve(img);
    };
  }, [priority]);

  const containerStyles: React.CSSProperties = {
    ...style,
    ...(aspectRatio && { aspectRatio }),
    ...getPlaceholderStyles()
  };

  if (imageState === 'error' && !fallbackSrc) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          'border border-border rounded-md',
          className
        )}
        style={containerStyles}
        role="img"
        aria-label={alt}
      >
        <div className="text-center p-4">
          <div className="text-sm">Failed to load image</div>
          <div className="text-xs mt-1 opacity-70">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted',
        className
      )}
      style={containerStyles}
    >
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        className={cn(
          'w-full h-full transition-opacity duration-300',
          imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          objectFit,
          position: aspectRatio ? 'absolute' : 'static',
          top: aspectRatio ? 0 : undefined,
          left: aspectRatio ? 0 : undefined,
          width: aspectRatio ? '100%' : undefined,
          height: aspectRatio ? '100%' : undefined,
        }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...props}
      />
      
      {/* Loading indicator */}
      {imageState === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-muted-foreground/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      {/* Shimmer effect during loading */}
      {imageState === 'loading' && !placeholderSrc && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </div>
  );
}

// Hook for lazy loading images
export function useLazyImage(src: string, options: { threshold?: number; rootMargin?: string } = {}) {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(img);
        }
      },
      {
        threshold: options.threshold || 0.01,
        rootMargin: options.rootMargin || '50px 0px'
      }
    );

    observer.observe(img);

    return () => {
      if (img) observer.unobserve(img);
    };
  }, [options.threshold, options.rootMargin]);

  React.useEffect(() => {
    if (!shouldLoad || !src) return;

    const img = new Image();
    
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [shouldLoad, src]);

  return {
    imgRef,
    shouldLoad,
    isLoaded,
    hasError
  };
}

// Utility for generating blur placeholder from image
export function generateBlurPlaceholder(src: string, quality = 10): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Cannot get canvas context'));
        return;
      }
      
      // Set small dimensions for blur effect
      canvas.width = quality;
      canvas.height = (img.height / img.width) * quality;
      
      // Draw scaled down image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64
      resolve(canvas.toDataURL('image/jpeg', 0.5));
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}