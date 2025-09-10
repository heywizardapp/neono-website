import * as React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: string; // base64 or blurhash
  onError?: () => void;
}

/**
 * Responsive image component with modern format support and performance optimization
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 100vw, (min-width: 768px) 100vw, 100vw",
  quality = 75,
  placeholder
}: ResponsiveImageProps) {
  // Generate responsive image URLs
  // Note: This assumes a build process that generates these variants
  // In a real implementation, you'd use vite-imagetools or similar
  const generateSrcSet = (format: string) => {
    const widths = [360, 640, 960, 1280, 1600, 1920];
    return widths
      .filter(w => w <= width * 2) // Don't generate larger than 2x original
      .map(w => `${src}?format=${format}&w=${w}&q=${quality} ${w}w`)
      .join(', ');
  };

  const fallbackSrc = `${src}?format=jpeg&w=${Math.min(width, 960)}&q=${quality}`;
  
  return (
    <picture className={cn("block", className)}>
      {/* AVIF - Best compression */}
      <source 
        type="image/avif" 
        srcSet={generateSrcSet('avif')} 
        sizes={sizes}
      />
      
      {/* WebP - Good compression, wide support */}
      <source 
        type="image/webp" 
        srcSet={generateSrcSet('webp')} 
        sizes={sizes}
      />
      
      {/* JPEG/PNG fallback */}
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="w-full h-auto"
        style={{
          aspectRatio: `${width} / ${height}`,
          ...(placeholder && {
            backgroundImage: `url("${placeholder}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          })
        }}
        onError={(e) => {
          // Fallback to original src if optimized versions fail
          const target = e.target as HTMLImageElement;
          if (target.src !== src && !target.dataset.fallback) {
            target.dataset.fallback = 'true';
            target.src = src;
          }
        }}
      />
    </picture>
  );
}

/**
 * Hero image component with preloading and optimized delivery
 */
export function HeroImage({
  src,
  alt,
  width,
  height,
  className,
  overlay = false,
  ...props
}: ResponsiveImageProps & { overlay?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <ResponsiveImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={true} // Hero images are always priority
        sizes="100vw" // Hero images typically full width
        className="object-cover w-full h-full"
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
    </div>
  );
}

/**
 * Avatar image component with fallback
 */
export function Avatar({
  src,
  alt,
  size = 40,
  className,
  fallback,
  ...props
}: Omit<ResponsiveImageProps, 'width' | 'height'> & {
  size?: number;
  fallback?: string;
}) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError && fallback) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground rounded-full",
          className
        )}
        style={{ width: size, height: size }}
      >
        {fallback}
      </div>
    );
  }

  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full object-cover", className)}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}

/**
 * Product image component with aspect ratio preservation
 */
export function ProductImage({
  src,
  alt,
  aspectRatio = "1/1",
  className,
  ...props
}: ResponsiveImageProps & { aspectRatio?: string }) {
  return (
    <div 
      className={cn("relative overflow-hidden rounded-lg", className)}
      style={{ aspectRatio }}
    >
      <ResponsiveImage
        src={src}
        alt={alt}
        width={400} // Default product image size
        height={400}
        className="object-cover w-full h-full"
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        {...props}
      />
    </div>
  );
}

/**
 * Utility to generate image placeholders
 */
export function generatePlaceholder(width: number, height: number): string {
  // Generate a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#9ca3af" font-size="14">
        ${width}×${height}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}