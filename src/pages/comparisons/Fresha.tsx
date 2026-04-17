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
        title: 'NeonO vs Fresha: Save Up to $9,861/Year in Hidden Fees | 2026 Comparison',
        description: 'Fresha charges $79.95/mo for loyalty, $13.95/member for insights, 20% marketplace fees, and more. NeonO includes everything for $24.99/seat/mo. Compare now.',
      }}
      hero={{
        headline: 'Fresha\'s "Free" Costs You Up to $9,861/Year',
        subheadline: 'Loyalty add-ons, insight fees, marketplace commissions, and processing surcharges add up fast. NeonO is $24.99/seat/month, all features included, capped at 7 seats.',
        painPoints: [
          'Loyalty program costs $79.95/location/month extra',
          'Business insights add-on: $13.95/bookable team member/month',
          'Marketplace takes 20% of first booking from new clients (min $6)',
          'Google Rating Boost: $20.95/location/month extra',
          'In-person processing: 2.29% + $0.20 + $0.15 tap authorization',
          'Clients must create a Fresha account to book',
        ],
      }}
      pricing={{
        neono: '$24.99/seat/mo',
        competitor: 'CA$29.95/mo + add-ons',
        savingsAnnual: '$2,746–$9,861',
      }}
      features={[
        { name: 'Online Booking', neono: true, competitor: true },
        { name: 'Calendar Management', neono: true, competitor: true },
        { name: 'Client Database', neono: 'Unlimited', competitor: 'Unlimited' },
        { name: 'POS System', neono: 'Included', competitor: 'Included' },
        { name: 'Staff Management', neono: 'Unlimited', competitor: 'Limited' },
        { name: 'Loyalty Program', neono: '✅ Included', competitor: '💰 $79.95/location/mo', highlight: true },
        { name: 'Business Insights', neono: '✅ Included', competitor: '💰 $13.95/member/mo', highlight: true },
        { name: 'Google Reviews Automation', neono: '✅ Included', competitor: '💰 $20.95/location/mo', highlight: true },
        { name: 'SMS Marketing', neono: '✅ Included', competitor: '🟡 Limited allowance' },
        { name: 'Colour Cost Tracking', neono: '✅ Included', competitor: '❌ Not available (need SalonScale $99–199/mo)', highlight: true },
        { name: 'Website Builder', neono: '✅ Included', competitor: '❌ Not available', highlight: true },
        { name: 'Online Store', neono: '✅ Included', competitor: '✅ Basic' },
        { name: 'Tip Commission', neono: '✅ 0%', competitor: '💰 Charged at processing rate', highlight: true },
        { name: 'Guest Booking (no account)', neono: '✅ Yes', competitor: '❌ Requires Fresha account', highlight: true },
        { name: 'AI Autopilot', neono: '✅ Included', competitor: '❌ Not available' },
        { name: 'Distributor Integration', neono: '✅ Metro Beauty', competitor: '❌ Not available' },
        { name: 'CASL Compliance', neono: '✅ Native', competitor: '❌ GDPR-focused' },
        { name: 'Landing Page Builder', neono: '✅ Included', competitor: '❌ Not available' },
        { name: 'Link-in-Bio', neono: '✅ Included', competitor: '❌ Not available' },
        { name: 'Payment Processing', neono: 'Transparent', competitor: '2.29% + $0.20 + $0.15 tap (in-person) / 2.79% + $0.20 (online)' },
      ]}
      uniqueDifferentiators={[
        {
          icon: '💰',
          title: 'True All-Inclusive Pricing',
          description: '$24.99/seat/month, capped at 7 seats ($174.93/mo max). Seats 8+ are free. No upsells for loyalty, insights, or Google reviews.',
        },
        {
          icon: '🎯',
          title: 'Zero Tip Commissions',
          description: 'Your staff keeps 100% of tips. Fresha charges processing fees on every tip transaction.',
        },
        {
          icon: '🚀',
          title: 'No Account Needed to Book',
          description: 'Clients book instantly without creating a Fresha account. Less friction means more bookings.',
        },
        {
          icon: '📊',
          title: 'Savings by Team Size',
          description: 'Solo: $2,746/yr saved. 3 staff: $2,900/yr. 7 staff: $5,907/yr. 12 staff: $9,861/yr.',
        },
      ]}
      testimonial={{
        quote: 'Salons switching from marketplace-based platforms typically save $2,000-5,000/year in marketplace fees and add-on costs while gaining features like colour tracking that aren\'t available on those platforms.',
        author: 'NeonO cost analysis, March 2026',
        business: '',
        switchedFrom: 'Fresha',
      }}
    />
  );
}
