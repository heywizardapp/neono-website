# NeonO Business Solutions Template

## Overview

The BusinessTemplate system allows you to create industry-specific solutions pages using a config-driven approach. Simply create a new config file and page to launch a new industry solution.

## Creating New Industry Pages

### 1. Create Config File

Create a new config file in `/src/config/solutions/[industry].ts`:

```typescript
import { BusinessTemplateConfig } from "@/templates/types";

const industryConfig: BusinessTemplateConfig = {
  industry: "Industry Name",
  hero: {
    title: "Your industry-specific title",
    subtitle: "Your industry-specific subtitle",
    primary: { label: "Start free trial", href: "/signup" },
    secondary: { label: "See pricing", href: "/pricing" },
    chips: ["99.9% uptime", "2-tap checkout", "No add-on traps"],
    image: "/assets/placeholders/hero-industry.webp",
  },
  snapshot: [
    { title: "Key Benefit 1", desc: "Brief description", color: "text-mint" },
    { title: "Key Benefit 2", desc: "Brief description", color: "text-primary" },
    // Add 2-4 snapshot cards
  ],
  sections: [
    {
      id: "appointments",
      eyebrow: "Appointments & Calendar",
      title: "Industry-specific calendar title",
      bullets: [
        "Industry-specific feature 1",
        "Industry-specific feature 2",
        "Industry-specific feature 3",
      ],
      media: { src: "/assets/placeholders/appointments.webp", alt: "Appointments UI" },
    },
    // Add all 6 sections: appointments, pos, marketing, booking, team, reports
  ],
  beforeAfter: [
    { before: "Old way", after: "New way with NeonO" },
    // Add 3 before/after comparisons
  ],
  testimonials: [
    { quote: "Customer quote", author: "Business Name", rating: 5, stat: "Optional stat" },
    // Add 2-3 testimonials
  ],
  integrations: [
    { label: "Integration Name", src: "/assets/placeholders/integration.svg" },
    // Add 5-8 integrations
  ],
  pricing: {
    blurb: "Starter $29/mo (2 seats) • Growth $59/mo (5 seats) • +$9.99 per extra seat",
    sub: "SMS, website, online cart, QuickBooks sync, and AI are included.",
    cta: { label: "See pricing", href: "/pricing" },
  },
  faqs: [
    { q: "Question?", a: "Answer." },
    // Add 5-8 FAQs
  ],
};

export default industryConfig;
```

### 2. Create Page File

Create a new page file in `/src/pages/solutions/[Industry].tsx`:

```typescript
import BusinessTemplate from '@/templates/BusinessTemplate';
import industryConfig from '@/config/solutions/industry';

export default function IndustryPage() {
  return <BusinessTemplate {...industryConfig} />;
}
```

### 3. Add Route (if using React Router)

Add the new route to your router configuration.

## File Structure

```
src/
├── templates/
│   ├── BusinessTemplate.tsx     # Main template component
│   └── types.ts                 # TypeScript interfaces
├── config/
│   └── solutions/
│       ├── salons.ts           # Salons config (example)
│       ├── barbershops.ts      # Add new industries here
│       └── spas.ts
├── components/
│   ├── IndustryHero.tsx
│   ├── StickySubnav.tsx
│   ├── ValueSnapshot.tsx
│   ├── MediaRow.tsx
│   ├── BeforeAfterGrid.tsx
│   ├── TestimonialsCarousel.tsx
│   ├── IntegrationsStrip.tsx
│   ├── PricingRibbon.tsx
│   └── FaqAccordion.tsx
└── pages/
    └── solutions/
        ├── Salons.tsx
        └── [NewIndustry].tsx
```

## Features

- **Fully Responsive**: Mobile-first design with perfect desktop experience
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Accessible**: WCAG 2.2 AA compliant with keyboard navigation
- **Performance**: Optimized for Core Web Vitals and Lighthouse scores
- **Sticky Navigation**: Scrollspy navigation that highlights active sections
- **Smooth Animations**: Framer Motion with reduced motion support

## Section Structure

Each industry page follows this exact structure:

1. **Hero** - Industry-specific headline with CTAs
2. **Sticky Sub-Nav** - Anchored navigation to page sections
3. **Value Snapshot** - 4 compact benefit cards
4. **6 Feature Sections** - Alternating media rows covering core features
5. **Before/After Grid** - 3 comparison cards
6. **Testimonials** - Customer quotes carousel
7. **Integrations** - Partner logos strip
8. **Pricing Ribbon** - Simplified pricing teaser
9. **FAQ Accordion** - Industry-specific questions
10. **Final CTA** - Conversion-focused end section

## Customization Tips

- Keep the same section order and general structure
- Customize bullets, headlines, and testimonials per industry
- Use industry-specific terminology while maintaining clarity
- Ensure all media placeholders are properly sized to avoid CLS
- Test keyboard navigation and screen reader compatibility

## Performance Targets

- Lighthouse Performance: ≥95
- Lighthouse Accessibility: ≥95
- Lighthouse Best Practices: ≥95
- Lighthouse SEO: ≥100
- Cumulative Layout Shift: <0.05