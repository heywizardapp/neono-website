/**
 * Intersection Observer utilities for scroll-based animations and lazy loading
 */

type ObserverCallback = (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;

// Global observer instance for better performance
let globalObserver: IntersectionObserver | null = null;
const observedElements = new Map<Element, ObserverCallback>();

/**
 * Create or get the global intersection observer
 */
function getGlobalObserver(): IntersectionObserver {
  if (!globalObserver && typeof window !== 'undefined') {
    globalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = observedElements.get(entry.target);
          if (callback) {
            callback(entry.isIntersecting, entry);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
      }
    );
  }
  return globalObserver!;
}

/**
 * Observe an element for intersection changes
 */
export function observeInView(
  element: Element,
  callback: ObserverCallback,
  options?: IntersectionObserverInit
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  // Use global observer if no custom options provided
  if (!options) {
    const observer = getGlobalObserver();
    observedElements.set(element, callback);
    observer.observe(element);
    
    return () => {
      observedElements.delete(element);
      observer.unobserve(element);
    };
  }

  // Create custom observer for specific options
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry) {
        callback(entry.isIntersecting, entry);
      }
    },
    options
  );

  observer.observe(element);
  
  return () => {
    observer.unobserve(element);
    observer.disconnect();
  };
}

/**
 * Simple hook-like function to trigger reveal animations
 */
export function setupRevealAnimation(
  element: Element,
  animationClass: string = 'animate-fade-in'
): () => void {
  const callback = (isIntersecting: boolean) => {
    if (isIntersecting) {
      element.setAttribute('data-revealed', 'true');
      element.classList.add(animationClass);
    }
  };

  return observeInView(element, callback, {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  });
}

/**
 * Lazy load images when they come into view
 */
export function setupLazyImage(img: HTMLImageElement): () => void {
  const dataSrc = img.dataset.src;
  if (!dataSrc) return () => {};

  const callback = (isIntersecting: boolean) => {
    if (isIntersecting) {
      img.src = dataSrc;
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    }
  };

  return observeInView(img, callback, {
    rootMargin: '200px 0px',
    threshold: 0.01
  });
}

/**
 * Setup parallax effect for an element
 */
export function setupParallax(
  element: HTMLElement,
  speed: number = 0.5,
  direction: 'up' | 'down' = 'up'
): () => void {
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  let animationFrame: number;
  
  const callback = (isIntersecting: boolean, entry: IntersectionObserverEntry) => {
    if (isIntersecting) {
      const updateParallax = () => {
        const rect = element.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        const yPos = direction === 'up' ? -rate : rate;
        
        element.style.transform = `translateY(${yPos}px)`;
        
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          animationFrame = requestAnimationFrame(updateParallax);
        }
      };
      
      updateParallax();
    } else {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    }
  };

  return observeInView(element, callback, {
    rootMargin: '100px 0px',
    threshold: 0
  });
}

/**
 * Track section visibility for analytics
 */
export function trackSectionVisibility(
  element: Element,
  sectionName: string,
  onVisible?: (sectionName: string, duration: number) => void
): () => void {
  let startTime: number;
  
  const callback = (isIntersecting: boolean) => {
    if (isIntersecting) {
      startTime = Date.now();
    } else if (startTime && onVisible) {
      const duration = Date.now() - startTime;
      if (duration > 1000) { // Only track if viewed for more than 1 second
        onVisible(sectionName, duration);
      }
    }
  };

  return observeInView(element, callback, {
    rootMargin: '-20% 0px',
    threshold: 0.5
  });
}

/**
 * Cleanup all observers
 */
export function cleanup() {
  if (globalObserver) {
    globalObserver.disconnect();
    globalObserver = null;
  }
  observedElements.clear();
}

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', cleanup);
}