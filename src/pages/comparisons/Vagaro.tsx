import * as React from 'react';
import ComparisonTemplate from '@/components/templates/ComparisonTemplate';

export default function VagaroComparison() {
  return (
    <ComparisonTemplate
      competitor={{
        name: 'Vagaro',
        tagline: 'Nickel-and-dimed to death',
      }}
      seo={{
        title: 'NeonO vs Vagaro: All Features Included, Not Add-Ons | 2026 Comparison',
        description: 'Vagaro charges $10-50/month for each additional feature. NeonO includes everything in one simple price. Compare features and save.',
      }}
      hero={{
        headline: 'One Platform, One Price. No Add-On Traps.',
        subheadline: 'Unlike Vagaro\'s endless add-on fees, NeonO includes all features for one transparent price.',
        painPoints: [
          'Vagaro charges $25/month for email marketing',
          'Text reminders cost extra ($10-30/month)',
          'Payroll integration is an add-on ($50/month)',
          'Final cost can exceed $100+/month per location',
        ],
      }}
      pricing={{
        neono: '$16.99/chair',
        competitor: '$25/mo + add-ons',
        savingsAnnual: '$800+',
      }}
      features={[
        { name: 'Appointment Scheduling', neono: true, competitor: true },
        { name: 'Online Booking', neono: true, competitor: true },
        { name: 'SMS Reminders', neono: 'Included', competitor: 'Add-on ($10-30/mo)', highlight: true },
        { name: 'Email Marketing', neono: 'Unlimited', competitor: 'Add-on ($25/mo)', highlight: true },
        { name: 'Loyalty & Rewards', neono: 'Included', competitor: 'Add-on ($15/mo)' },
        { name: 'Website Builder', neono: 'Included', competitor: 'Add-on ($20/mo)', highlight: true },
        { name: 'POS & Payments', neono: true, competitor: true },
        { name: 'Inventory Management', neono: 'Included', competitor: 'Add-on' },
        { name: 'Payroll Integration', neono: 'Included', competitor: 'Add-on ($50/mo)', highlight: true },
        { name: 'Gift Cards', neono: 'Included', competitor: 'Add-on' },
        { name: 'Marketing Automation', neono: 'Included', competitor: 'Limited' },
        { name: 'AI Analytics', neono: 'Included', competitor: 'Not available' },
        { name: 'Staff Commissions', neono: 'Automated', competitor: 'Manual' },
        { name: 'Multi-Location', neono: 'Included', competitor: 'Extra cost' },
        { name: 'Custom Reports', neono: 'Unlimited', competitor: 'Limited' },
      ]}
      uniqueDifferentiators={[
        {
          icon: '📦',
          title: 'Everything Built In',
          description: 'Marketing, payroll, inventory, AI—all included. No add-on fees that add up to $100+/month.',
        },
        {
          icon: '⚡',
          title: '2-Tap Checkout',
          description: 'Faster POS checkout than Vagaro. Turn tables quicker and serve more clients per day.',
        },
        {
          icon: '🤖',
          title: 'AI-Powered Insights',
          description: 'Predictive analytics and smart scheduling recommendations. Vagaro doesn\'t offer this.',
        },
      ]}
      testimonial={{
        quote: 'With Vagaro, we were paying for 5 different add-ons totaling $90/month. NeonO gave us everything for less than half that price.',
        author: 'Mike Chen',
        business: 'Urban Cuts Barbershop',
        switchedFrom: 'Vagaro',
      }}
    />
  );
}
