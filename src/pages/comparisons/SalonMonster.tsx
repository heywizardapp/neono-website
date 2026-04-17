import * as React from 'react';
import ComparisonTemplate from '@/components/templates/ComparisonTemplate';

export default function SalonMonsterComparison() {
  return (
    <ComparisonTemplate
      competitor={{
        name: 'Salon Monster',
        tagline: 'Outdated and overpriced',
      }}
      seo={{
        title: 'NeonO vs Salon Monster: Modern Platform, Better Price | 2026 Comparison',
        description: 'Salon Monster\'s outdated interface and high costs are holding salons back. See why NeonO is the modern alternative.',
      }}
      hero={{
        headline: 'Modern Platform. Modern Pricing. Modern Results.',
        subheadline: 'Salon Monster hasn\'t kept up with the times. NeonO gives you cutting-edge features at a fraction of the cost.',
        painPoints: [
          'Salon Monster charges $99-199/month for basic features',
          'Clunky interface frustrates staff and clients',
          'Limited mobile functionality',
          'Expensive onboarding and setup fees',
        ],
      }}
      pricing={{
        neono: '$24.99/seat',
        competitor: '$99-199/mo',
        savingsAnnual: '$1,800+',
      }}
      features={[
        { name: 'Appointment Scheduling', neono: true, competitor: true },
        { name: 'Online Booking', neono: 'Mobile-optimized', competitor: 'Desktop-focused' },
        { name: 'SMS Marketing', neono: 'Included', competitor: 'Add-on or limited', highlight: true },
        { name: 'Modern UI/UX', neono: 'Intuitive', competitor: 'Outdated', highlight: true },
        { name: 'Mobile App', neono: 'Full-featured', competitor: 'Limited' },
        { name: 'POS System', neono: '2-tap checkout', competitor: 'Multi-step process' },
        { name: 'Setup Fee', neono: '$0', competitor: '$200-500', highlight: true },
        { name: 'Client Portal', neono: 'Self-service', competitor: 'Basic' },
        { name: 'Reporting', neono: 'AI-powered', competitor: 'Manual reports' },
        { name: 'Integrations', neono: 'QuickBooks, Stripe, Google', competitor: 'Limited' },
        { name: 'Website Builder', neono: 'Included', competitor: 'Not available' },
        { name: 'Loyalty Program', neono: 'Included', competitor: 'Add-on' },
        { name: 'Training & Support', neono: 'Free 24/7', competitor: 'Paid training' },
      ]}
      uniqueDifferentiators={[
        {
          icon: '📱',
          title: 'Mobile-First Design',
          description: 'Built for how salons actually work today—on the go, on your phone, not chained to a desktop.',
        },
        {
          icon: '💸',
          title: 'No Setup Fees',
          description: 'Salon Monster charges $200-500 just to get started. We don\'t. Start for free today.',
        },
        {
          icon: '🎨',
          title: 'Modern Interface',
          description: 'Clean, intuitive design your staff will actually enjoy using. No more frustrated employees.',
        },
      ]}
      testimonial={{
        quote: 'Salon Monster lacks modern features like colour cost tracking, AI insights, and integrated marketing automation. NeonO includes all of these at a lower price point with a modern interface.',
        author: 'NeonO feature comparison, March 2026',
        business: '',
        switchedFrom: 'Salon Monster',
      }}
    />
  );
}
