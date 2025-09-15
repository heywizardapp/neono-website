import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  depth?: number;
  scale?: number;
  opacity?: number;
  rotate?: number;
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
  direction = 'up',
  depth = 0,
  scale = 1,
  opacity = 1,
  rotate = 0,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate parallax offset
      const scrollProgress = (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight);
      
      let parallaxOffset = 0;
      switch (direction) {
        case 'up':
          parallaxOffset = scrollProgress * speed * -100;
          break;
        case 'down':
          parallaxOffset = scrollProgress * speed * 100;
          break;
        case 'left':
          parallaxOffset = scrollProgress * speed * -100;
          break;
        case 'right':
          parallaxOffset = scrollProgress * speed * 100;
          break;
      }

      setOffset(parallaxOffset);
    };

    const throttledScroll = throttle(handleScroll, 16); // 60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [speed, direction]);

  const transform = `
    translate3d(
      ${direction === 'left' || direction === 'right' ? offset : 0}px,
      ${direction === 'up' || direction === 'down' ? offset : 0}px,
      ${depth}px
    )
    scale(${scale})
    rotate(${rotate}deg)
  `;

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        transform,
        opacity,
      }}
    >
      {children}
    </div>
  );
}

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
}

export function ParallaxContainer({
  children,
  className,
  perspective = 1000,
}: ParallaxContainerProps) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

// Multi-layer parallax scene
interface ParallaxSceneProps {
  children: ReactNode;
  className?: string;
  layers?: Array<{
    speed: number;
    depth?: number;
    opacity?: number;
    scale?: number;
  }>;
}

export function ParallaxScene({
  children,
  className,
  layers = [
    { speed: 0.2, depth: -100, opacity: 0.3, scale: 1.1 },
    { speed: 0.5, depth: -50, opacity: 0.6, scale: 1.05 },
    { speed: 0.8, depth: 0, opacity: 1, scale: 1 },
  ],
}: ParallaxSceneProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <ParallaxContainer className={className}>
      {childrenArray.map((child, index) => {
        const layerConfig = layers[index] || layers[layers.length - 1];
        return (
          <ParallaxLayer
            key={index}
            speed={layerConfig.speed}
            depth={layerConfig.depth}
            opacity={layerConfig.opacity}
            scale={layerConfig.scale}
            className="absolute inset-0"
          >
            {child}
          </ParallaxLayer>
        );
      })}
    </ParallaxContainer>
  );
}

// Advanced 3D parallax with mouse tracking
interface Parallax3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  mouseTracking?: boolean;
}

export function Parallax3D({
  children,
  className,
  intensity = 20,
  mouseTracking = true,
}: Parallax3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mouseTracking) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      setMousePosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [mouseTracking]);

  const transform = `
    perspective(1000px)
    rotateX(${mousePosition.y * intensity * -1}deg)
    rotateY(${mousePosition.x * intensity}deg)
    translateZ(0)
  `;

  return (
    <div
      ref={ref}
      className={cn('transition-transform duration-300 will-change-transform', className)}
      style={{
        transform,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
}