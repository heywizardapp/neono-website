# SEO Implementation Guide

This document explains the SEO system implemented for NeonO's marketing website.

## 🎯 Overview

The SEO system provides:
- **Structured Data**: JSON-LD for rich snippets (Product, FAQ, Organization, etc.)
- **International SEO**: hreflang and canonical tags
- **Performance**: Critical CSS inlining, image optimization
- **Sitemaps**: Multi-sitemap architecture with automatic generation
- **Meta Tags**: Dynamic Open Graph and Twitter Card support

## 📁 File Structure

```
src/
├── lib/seo/
│   ├── jsonld.tsx          # Structured data builders
│   ├── meta.tsx            # Meta tag utilities
│   ├── hreflang.ts         # International SEO
│   └── prerender.ts        # SSG configuration
├── components/
│   ├── SEO/
│   │   └── SEOHead.tsx     # Main SEO component
│   └── media/
│       └── ResponsiveImage.tsx  # Optimized images
scripts/
├── generate-sitemaps.ts    # Sitemap generation
└── post-build.js          # Build optimizations
public/
├── robots.txt             # Search engine directives
└── og/                    # Open Graph images
```

## 🚀 Quick Start

### 1. Adding SEO to a Page

```tsx
import { SEOHead, SEO_PRESETS } from '@/components/SEO/SEOHead';

function PricingPage() {
  return (
    <>
      <SEOHead
        {...SEO_PRESETS.pricing}
        path="/pricing"
        structuredData={[
          {
            type: 'product',
            data: {
              name: "NeonO Starter",
              price: 29,
              currency: "USD",
              description: "Complete salon software",
              url: "https://www.neono.com/pricing"
            }
          }
        ]}
      />
      {/* Page content */}
    </>
  );
}
```

### 2. Adding Structured Data

```tsx
// Product schema
const productData = {
  name: "NeonO Growth Plan",
  description: "Advanced salon management software",
  url: "https://www.neono.com/pricing",
  image: "https://www.neono.com/og/pricing.png",
  price: 59,
  currency: "USD"
};

// FAQ schema
const faqData = [
  {
    q: "What's included in the Growth plan?",
    a: "Advanced reporting, team management, and priority support."
  }
];

// Usage in component
<SEOHead
  structuredData={[
    { type: 'product', data: productData },
    { type: 'faq', data: faqData }
  ]}
/>
```

### 3. Optimized Images

```tsx
import { ResponsiveImage, HeroImage } from '@/components/media/ResponsiveImage';

// Regular responsive image
<ResponsiveImage
  src="/assets/feature-image.jpg"
  alt="Salon management dashboard"
  width={800}
  height={600}
  sizes="(min-width: 1024px) 50vw, 100vw"
/>

// Hero image with preloading
<HeroImage
  src="/assets/hero.jpg"
  alt="Modern salon interior"
  width={1920}
  height={1080}
  priority={true}
  overlay={true}
/>
```

## 📊 Structured Data Types

### Organization Schema
```tsx
import { orgSchema } from '@/lib/seo/jsonld';

const orgData = orgSchema({
  name: "NeonO",
  url: "https://www.neono.com",
  logo: "https://www.neono.com/logo.png"
});
```

### Product Schema
```tsx
import { productSchema } from '@/lib/seo/jsonld';

const productData = productSchema({
  name: "NeonO Starter",
  description: "Complete salon software for small businesses",
  url: "https://www.neono.com/pricing",
  image: "https://www.neono.com/og/pricing.png",
  price: 29,
  currency: "USD"
});
```

### FAQ Schema
```tsx
import { faqSchema } from '@/lib/seo/jsonld';

const faqData = faqSchema([
  {
    q: "How much does NeonO cost?",
    a: "NeonO starts at $29/month for the Starter plan."
  },
  {
    q: "Is there a free trial?",
    a: "Yes, we offer a 14-day free trial with full access."
  }
]);
```

### Breadcrumb Schema
```tsx
import { breadcrumbSchema } from '@/lib/seo/jsonld';

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: "https://www.neono.com/" },
  { name: "Solutions", url: "https://www.neono.com/solutions" },
  { name: "Salons", url: "https://www.neono.com/solutions/salons" }
]);
```

## 🌐 International SEO

### Current Setup
- **Default**: English Canada (en-CA) - no URL prefix
- **Future**: English US (en-US) - `/us/` prefix
- **Future**: French Canada (fr-CA) - `/fr/` prefix

### Adding New Locales

1. Update `src/lib/seo/hreflang.ts`:
```tsx
const LOCALES: Locale[] = ["en-CA", "en-US", "fr-CA"];
```

2. Configure URL structure:
```tsx
function getLocalePrefix(locale: Locale): string {
  switch (locale) {
    case "en-CA": return "";     // Default
    case "en-US": return "us";   // /us/pricing
    case "fr-CA": return "fr";   // /fr/pricing
  }
}
```

## 🗺️ Sitemap Management

### Automatic Generation

Sitemaps are generated during build:
```bash
npm run build  # Includes sitemap generation
```

### Manual Generation
```bash
npm run generate-sitemaps
```

### Adding New Routes

1. **Static Pages**: Update `scripts/generate-sitemaps.ts`
```tsx
const staticPages: SitemapUrl[] = [
  {
    loc: '/new-page',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  }
];
```

2. **Dynamic Content**: Use the `addUrlToSitemap` function
```tsx
import { addUrlToSitemap } from '../scripts/generate-sitemaps';

addUrlToSitemap('/blog/new-post', {
  type: 'blog',
  changefreq: 'monthly',
  priority: 0.6
});
```

## 🎨 Open Graph Images

### Naming Convention
- Default: `/og/og-default.png` (1200x630)
- Home: `/og/home.png`
- Pricing: `/og/pricing.png`
- Solutions: `/og/solutions.png`

### Requirements
- Dimensions: 1200x630 pixels
- Format: PNG or JPG
- Size: < 300KB
- Include brand elements and page-specific content

### Dynamic OG Generation (Future)
For dynamic content, consider implementing OG image generation:
```tsx
// Example API route for dynamic OG images
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  
  // Generate image using Satori/Canvas API
  const image = await generateOGImage({ title });
  
  return new Response(image, {
    headers: { 'Content-Type': 'image/png' }
  });
}
```

## ⚡ Performance Optimization

### Critical CSS
Critical CSS is automatically inlined during build for routes:
- `/` (homepage)
- `/pricing`
- `/solutions/salons`

### Resource Preloading
Configured in `src/lib/seo/prerender.ts`:
```tsx
export const RESOURCE_PRELOAD_CONFIG = {
  fonts: [
    // Preload critical fonts
  ],
  images: {
    '/': [
      // Preload hero image for homepage
    ]
  }
};
```

### Image Optimization
- **Formats**: AVIF → WebP → JPEG/PNG fallback
- **Responsive**: Multiple sizes with `srcset`
- **Lazy Loading**: All images except LCP
- **Preloading**: Hero images have `priority={true}`

## 🧪 Testing & Validation

### Rich Results Testing
1. Use [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Test URLs:
   - `https://yoursite.com/` (Organization)
   - `https://yoursite.com/pricing` (Product)
   - `https://yoursite.com/solutions/salons` (FAQ)

### Performance Testing
1. Lighthouse CI in development:
```bash
npx lighthouse-ci autorun
```

2. Performance budgets are enforced:
   - LCP < 2.5s
   - CLS < 0.05
   - TBT < 150ms

### Sitemap Validation
1. Check XML validity: `https://yoursite.com/sitemap.xml`
2. Submit to Google Search Console
3. Monitor indexing status

## 🔧 Configuration

### Environment Variables
```env
VITE_BUILD_VERSION=1.0.0
VITE_BUILD_TIME=2024-01-01T00:00:00Z
```

### Build Configuration
Update `vite.config.ts` for additional optimizations:
```tsx
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'seo': ['./src/lib/seo/jsonld.tsx', './src/lib/seo/meta.tsx']
        }
      }
    }
  }
});
```

## 📈 Monitoring

### Analytics Integration
SEO events are tracked via the analytics system:
```tsx
import { analytics } from '@/lib/analytics/core';

// Track SEO-related events
analytics.track('page_view', {
  title: document.title,
  canonical: canonical(window.location.pathname)
});
```

### Key Metrics to Monitor
- **Organic Traffic**: Google Analytics
- **Search Console**: Impressions, clicks, CTR
- **Core Web Vitals**: Real User Monitoring
- **Rich Results**: Search Console Enhancement reports

## 🚨 Troubleshooting

### Common Issues

1. **Missing structured data**
   - Check browser dev tools for JSON-LD scripts
   - Validate with Rich Results Test

2. **Duplicate meta tags**
   - Ensure only one SEOHead component per page
   - Check for conflicting meta in index.html

3. **Images not optimizing**
   - Verify vite-imagetools configuration
   - Check network tab for format serving

4. **Sitemap not updating**
   - Run `npm run generate-sitemaps` manually
   - Check build logs for errors

### Debug Mode
Enable SEO debugging in development:
```tsx
// Add to local storage
localStorage.setItem('seo-debug', 'true');

// Or URL parameter
https://localhost:3000/?seo-debug=1
```

## 📚 Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Web Vitals](https://web.dev/vitals/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)