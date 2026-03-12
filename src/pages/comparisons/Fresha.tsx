import * as React from 'react';
import ComparisonTemplate from '@/components/templates/ComparisonTemplate';

export default function FreshaComparison() {
  return (
    <ComparisonTemplate
      competitor={{
        name: 'Fresha',
        tagline: 'Free* (but not really)',
      }}
      seo={{
        title: 'NeonO vs Fresha: No More $1,000+/Year in Hidden Fees | 2026 Comparison',
        description: 'Fresha claims to be free but charges $1,000+/year for essential features. See why NeonO\'s transparent pricing saves salons thousands annually.',
      }}
      hero={{
        headline: 'Say Goodbye to Fresha\'s Hidden Fees',
        subheadline: 'Get all features included for one simple price. No loyalty program upsells. No SMS add-ons. No surprises.',
        painPoints: [
          'Fresha charges $1,000+/year for loyalty programs',
          'SMS marketing costs extra ($10-50/month)',
          'Limited customization without paid tiers',
          'Payment processing fees on top of subscription',
        ],
      }}
      pricing={{
        neono: '$16.99/chair',
        competitor: 'Free* + $1,200/year',
        savingsAnnual: '$1,000+',
      }}
      features={[
        { name: 'Online Booking', neono: true, competitor: true },
        { name: 'Calendar Management', neono: true, competitor: true },
        { name: 'SMS Reminders', neono: 'Included', competitor: 'Add-on ($15/mo)', highlight: true },
        { name: 'Email Marketing', neono: 'Unlimited', competitor: 'Limited' },
        { name: 'Loyalty Program', neono: 'Included', competitor: '$1,000+/year', highlight: true },
        { name: 'Client Database', neono: 'Unlimited', competitor: 'Unlimited' },
        { name: 'POS System', neono: 'Included', competitor: 'Included' },
        { name: 'Payment Processing', neono: '2.9% + 30¢', competitor: '2.9% + 30¢' },
        { name: 'Tip Commissions', neono: '0%', competitor: '1-3%', highlight: true },
        { name: 'Custom Branding', neono: 'Full control', competitor: 'Limited' },
        { name: 'Website Builder', neono: 'Included', competitor: 'Add-on ($25/mo)', highlight: true },
        { name: 'Staff Management', neono: 'Unlimited', competitor: 'Limited' },
        { name: 'Inventory Tracking', neono: 'Included', competitor: 'Add-on' },
        { name: 'AI Insights', neono: 'Included', competitor: 'Not available' },
        { name: 'QuickBooks Sync', neono: 'Included', competitor: 'Add-on' },
        { name: '24/7 Support', neono: true, competitor: 'Business hours only' },
      ]}
      uniqueDifferentiators={[
        {
          icon: '💰',
          title: 'True All-Inclusive Pricing',
          description: 'Everything is included. No upsells for loyalty, SMS, websites, or other "premium" features.',
        },
        {
          icon: '🎯',
          title: 'Zero Tip Commissions',
          description: 'Your staff keeps 100% of tips. Fresha takes 1-3% off every tip, costing you thousands yearly.',
        },
        {
          icon: '🚀',
          title: 'Built for Growth',
          description: 'Unlimited chairs after 7 for the same price. Scale your business without scaling your costs.',
        },
      ]}
      testimonial={{
        quote: 'We were paying Fresha over $1,200/year for features that are included in NeonO. The switch saved us money and gave us better tools.',
        author: 'Sarah Martinez',
        business: 'Luxe Hair Studio',
        switchedFrom: 'Fresha',
      }}
    />
  );
}
