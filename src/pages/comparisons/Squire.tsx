import * as React from 'react';
import ComparisonTemplate from '@/components/templates/ComparisonTemplate';

export default function SquireComparison() {
  return (
    <ComparisonTemplate
      competitor={{
        name: 'Squire',
        tagline: 'Barbershop-only limitations',
      }}
      seo={{
        title: 'NeonO vs Squire: Better for Barbershops and Beyond | 2026 Comparison',
        description: 'Squire is built only for barbershops with limited flexibility. NeonO works for barbershops, salons, spas—all with better pricing.',
      }}
      hero={{
        headline: 'Everything Squire Does, Plus More Flexibility',
        subheadline: 'Squire locks you into barbershop-only features. NeonO adapts to any beauty business without compromise.',
        painPoints: [
          'Squire only works for barbershops (can\'t expand to other services)',
          'Expensive at $110+/month per location',
          'Limited customization options',
          'Payment processing fees higher than competitors',
        ],
      }}
      pricing={{
        neono: '$24.99/seat',
        competitor: '$110+/location',
        savingsAnnual: '$1,000+',
      }}
      features={[
        { name: 'Barbershop Features', neono: true, competitor: true },
        { name: 'Salon Features', neono: true, competitor: false, highlight: true },
        { name: 'Spa/Aesthetics Features', neono: true, competitor: false, highlight: true },
        { name: 'Walk-in Management', neono: 'Smart queue', competitor: 'Basic' },
        { name: 'Online Booking', neono: true, competitor: true },
        { name: 'POS System', neono: '2-tap checkout', competitor: 'Standard' },
        { name: 'Staff Scheduling', neono: 'AI-optimized', competitor: 'Manual' },
        { name: 'Client Management', neono: 'Advanced CRM', competitor: 'Basic' },
        { name: 'Marketing Tools', neono: 'Full suite', competitor: 'Limited' },
        { name: 'Pricing Model', neono: 'Per-chair', competitor: 'Per-location', highlight: true },
        { name: 'Multi-Service Types', neono: 'Unlimited', competitor: 'Barbershop only', highlight: true },
        { name: 'Website Builder', neono: 'Included', competitor: 'Not available' },
        { name: 'Inventory', neono: 'Full tracking', competitor: 'Basic' },
        { name: 'AI Analytics', neono: true, competitor: false },
      ]}
      uniqueDifferentiators={[
        {
          icon: '🔄',
          title: 'Multi-Business Flexibility',
          description: 'Start as a barbershop, expand to salon services later. NeonO adapts. Squire locks you in.',
        },
        {
          icon: '💵',
          title: 'Per-Chair vs Per-Location',
          description: 'Pay only for active chairs, not entire locations. Scale up without massive cost jumps.',
        },
        {
          icon: '🏆',
          title: 'Best of Both Worlds',
          description: 'All of Squire\'s barbershop features + salon, spa, and aesthetics capabilities you can grow into.',
        },
      ]}
      testimonial={{
        quote: 'Squire is barbershop-only. Businesses that want to expand into spa services, aesthetics, or multi-service offerings need a platform that supports all verticals from day one -- without migrating systems.',
        author: 'NeonO platform analysis, March 2026',
        business: '',
        switchedFrom: 'Squire',
      }}
    />
  );
}
