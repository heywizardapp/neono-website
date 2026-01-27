import * as React from 'react';
import ComparisonTemplate from '@/components/templates/ComparisonTemplate';

export default function PhorestComparison() {
  return (
    <ComparisonTemplate
      competitor={{
        name: 'Phorest',
        tagline: 'Enterprise pricing for SMB needs',
      }}
      seo={{
        title: 'NeonO vs Phorest: Better Features, Lower Cost | 2026 Comparison',
        description: 'Phorest charges enterprise prices for features NeonO includes at a fraction of the cost. Compare and see why salons are switching.',
      }}
      hero={{
        headline: 'Enterprise Features Without Enterprise Pricing',
        subheadline: 'Phorest targets large chains with pricing to match. NeonO gives you the same power for small-to-medium salons.',
        painPoints: [
          'Phorest costs $150-300+/month per location',
          'Overwhelming features most salons never use',
          'Complex setup requiring paid consultants',
          'Long-term contracts with cancellation penalties',
        ],
      }}
      pricing={{
        neono: '$16.99/chair',
        competitor: '$150-300+/mo',
        savingsAnnual: '$2,000+',
      }}
      features={[
        { name: 'Appointment Scheduling', neono: true, competitor: true },
        { name: 'Online Booking', neono: true, competitor: true },
        { name: 'Client Management', neono: 'Advanced CRM', competitor: 'Enterprise CRM' },
        { name: 'Marketing Automation', neono: 'Included', competitor: 'Included (complex)' },
        { name: 'SMS Marketing', neono: 'Included', competitor: 'Included' },
        { name: 'Loyalty Program', neono: 'Simple setup', competitor: 'Complex setup' },
        { name: 'POS System', neono: true, competitor: true },
        { name: 'Setup Complexity', neono: 'Self-serve', competitor: 'Requires consultant', highlight: true },
        { name: 'Pricing', neono: 'Per-chair', competitor: 'Per-location', highlight: true },
        { name: 'Contract Terms', neono: 'Month-to-month', competitor: '12-24 month', highlight: true },
        { name: 'Training Required', neono: 'Minimal', competitor: 'Extensive' },
        { name: 'Website Builder', neono: 'Included', competitor: 'Add-on' },
        { name: 'AI Insights', neono: 'Included', competitor: 'Enterprise tier' },
        { name: 'Support', neono: '24/7 included', competitor: 'Business hours' },
      ]}
      uniqueDifferentiators={[
        {
          icon: '🎯',
          title: 'Right-Sized for SMBs',
          description: 'Powerful features without enterprise complexity or price tags. Built for salons with 1-20 chairs.',
        },
        {
          icon: '🚀',
          title: 'Self-Service Setup',
          description: 'No consultants needed. Get up and running in hours, not weeks. No hidden implementation fees.',
        },
        {
          icon: '🔓',
          title: 'No Lock-In Contracts',
          description: 'Month-to-month flexibility. Phorest locks you into 12-24 month contracts with penalties.',
        },
      ]}
      testimonial={{
        quote: 'Phorest wanted $250/month and a 2-year contract. NeonO gave us the same features for $68/month with no commitment.',
        author: 'Jessica Park',
        business: 'Bloom Hair Salon',
        switchedFrom: 'Phorest',
      }}
    />
  );
}
