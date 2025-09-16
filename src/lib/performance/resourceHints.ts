// Resource hints and preloading utilities for better performance

export function addResourceHints() {
  if (typeof window === 'undefined') return;

  const head = document.head;

  // DNS prefetch for external domains
  const externalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://api.github.com'
  ];

  externalDomains.forEach(domain => {
    if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      head.appendChild(link);
    }
  });

  // Preconnect to critical resources
  const preconnectDomains = [
    { href: 'https://fonts.googleapis.com', crossorigin: false },
    { href: 'https://fonts.gstatic.com', crossorigin: true }
  ];

  preconnectDomains.forEach(({ href, crossorigin }) => {
    if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      if (crossorigin) link.crossOrigin = 'anonymous';
      head.appendChild(link);
    }
  });
}

// Preload critical resources based on route
export function preloadRouteResources(route: string) {
  const routeResourceMap: Record<string, string[]> = {
    '/': [
      '/src/pages/Index.tsx',
      '/src/components/Hero.tsx'
    ],
    '/pricing': [
      '/src/pages/Pricing.tsx',
      '/src/components/PricingRibbon.tsx'
    ],
    '/solutions/salons': [
      '/src/pages/solutions/Salons.tsx',
      '/src/config/solutions/salons.ts'
    ]
  };

  const resources = routeResourceMap[route] || [];
  
  resources.forEach(resource => {
    if (!document.querySelector(`link[rel="modulepreload"][href="${resource}"]`)) {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = resource;
      document.head.appendChild(link);
    }
  });
}

// Prefetch next likely resources
export function prefetchNextResources(currentRoute: string) {
  const nextRouteMap: Record<string, string[]> = {
    '/': ['/pricing', '/solutions/salons'],
    '/pricing': ['/signup', '/demo'],
    '/solutions/salons': ['/pricing', '/solutions/barbershops']
  };

  const nextRoutes = nextRouteMap[currentRoute] || [];
  
  nextRoutes.forEach(route => {
    preloadRouteResources(route);
  });
}

// Image optimization utilities
export function optimizeImages() {
  // Convert images to WebP/AVIF on-the-fly for supported browsers
  const images = document.querySelectorAll('img[src]');
  
  images.forEach(img => {
    const originalSrc = (img as HTMLImageElement).src;
    
    // Skip if already optimized or external
    if (originalSrc.includes('webp') || originalSrc.includes('avif') || 
        originalSrc.startsWith('http') || originalSrc.startsWith('data:')) {
      return;
    }

    // Check browser support and create optimized source
    if ('loading' in HTMLImageElement.prototype) {
      // Modern browsers - use native lazy loading
      (img as HTMLImageElement).loading = 'lazy';
    }

    // Add intersection observer for additional optimization
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement;
          
          // Create WebP version if browser supports it
          if (supportsWebP()) {
            const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            testImageExists(webpSrc).then(exists => {
              if (exists) target.src = webpSrc;
            });
          }
          
          observer.unobserve(target);
        }
      });
    });

    observer.observe(img);
  });
}

// Test if WebP is supported
function supportsWebP(): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// Test if image exists
function testImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Initialize all performance optimizations
export function initPerformanceOptimizations() {
  // Add resource hints immediately
  addResourceHints();
  
  // Optimize images when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeImages);
  } else {
    optimizeImages();
  }
  
  // Prefetch resources based on user interaction
  let prefetchTimer: number;
  
  ['mouseenter', 'touchstart'].forEach(event => {
    document.addEventListener(event, (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.hostname === window.location.hostname) {
        clearTimeout(prefetchTimer);
        prefetchTimer = window.setTimeout(() => {
          preloadRouteResources(link.pathname);
        }, 100);
      }
    }, { passive: true });
  });
}

// Call on app initialization
if (typeof window !== 'undefined') {
  initPerformanceOptimizations();
}