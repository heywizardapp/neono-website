/**
 * Static Site Generation (SSG) configuration and utilities
 * Ensures critical routes are prerendered with SEO meta and JSON-LD
 */

// Routes that should be prerendered for SEO
export const PRERENDER_ROUTES = [
  '/',
  '/pricing',
  '/products',
  '/solutions/salons',
  '/roi',
  '/blog',
  '/resources'
] as const;

// Route-specific configurations
export const ROUTE_CONFIGS = {
  '/': {
    priority: 1.0,
    changefreq: 'weekly' as const,
    generateOG: true,
    structuredData: ['organization']
  },
  '/pricing': {
    priority: 0.9,
    changefreq: 'monthly' as const,
    generateOG: true,
    structuredData: ['product', 'faq']
  },
  '/products': {
    priority: 0.8,
    changefreq: 'monthly' as const,
    generateOG: true,
    structuredData: ['product']
  },
  '/solutions/salons': {
    priority: 0.8,
    changefreq: 'monthly' as const,
    generateOG: true,
    structuredData: ['faq', 'breadcrumb']
  },
  '/roi': {
    priority: 0.7,
    changefreq: 'monthly' as const,
    generateOG: false,
    structuredData: []
  },
  '/blog': {
    priority: 0.7,
    changefreq: 'weekly' as const,
    generateOG: true,
    structuredData: ['breadcrumb']
  },
  '/resources': {
    priority: 0.6,
    changefreq: 'weekly' as const,
    generateOG: true,
    structuredData: ['breadcrumb']
  }
} as const;

/**
 * Critical CSS configuration per route
 */
export const CRITICAL_CSS_CONFIG = {
  '/': {
    viewport: { width: 1200, height: 800 },
    inlineCritical: true,
    deferNonCritical: true
  },
  '/pricing': {
    viewport: { width: 1200, height: 800 },
    inlineCritical: true,
    deferNonCritical: true
  },
  '/solutions/salons': {
    viewport: { width: 1200, height: 800 },
    inlineCritical: true,
    deferNonCritical: true
  }
};

/**
 * Resource preloading configuration
 */
export const RESOURCE_PRELOAD_CONFIG = {
  fonts: [
    {
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous'
    }
  ],
  images: {
    '/': [
      {
        href: '/assets/hero-salon.webp',
        as: 'image',
        type: 'image/webp',
        imageSizes: '100vw',
        imageSrcset: '/assets/hero-salon.webp 1920w'
      }
    ]
  },
  scripts: []
};

/**
 * Performance budgets per route
 */
export const PERFORMANCE_BUDGETS = {
  maxLCP: 2500, // ms
  maxCLS: 0.05,
  maxTBT: 150, // ms
  maxFCP: 1800, // ms
  maxBundle: 200, // KB
  maxImages: 500 // KB total
};

/**
 * Generate preload links for a route
 */
export function generatePreloadLinks(route: string): Array<{
  rel: string;
  href: string;
  as?: string;
  type?: string;
  crossorigin?: string;
  imageSizes?: string;
  imageSrcset?: string;
}> {
  const links = [];

  // Add font preloads
  for (const font of RESOURCE_PRELOAD_CONFIG.fonts) {
    links.push({
      rel: 'preload',
      ...font
    });
  }

  // Add DNS prefetch
  links.push(
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  );

  // Add route-specific image preloads
  const routeImages = RESOURCE_PRELOAD_CONFIG.images[route as keyof typeof RESOURCE_PRELOAD_CONFIG.images];
  if (routeImages) {
    for (const image of routeImages) {
      links.push({
        rel: 'preload',
        ...image
      });
    }
  }

  return links;
}

/**
 * Check if route should be prerendered
 */
export function shouldPrerenderRoute(route: string): boolean {
  return PRERENDER_ROUTES.includes(route as any);
}

/**
 * Get route configuration
 */
export function getRouteConfig(route: string) {
  return ROUTE_CONFIGS[route as keyof typeof ROUTE_CONFIGS];
}