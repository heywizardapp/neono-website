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
        title: 'NeonO vs Vagaro: All Features Included, No $95+/Month in Add-Ons | 2026 Comparison',
        description: 'Vagaro charges $95+/month in add-ons for features NeonO includes free. Text marketing, website, forms, online cart, storage -- all extra. Compare and save up to $3,349/year.',
      }}
      hero={{
        headline: 'Stop Paying $95+/Month in Vagaro Add-Ons',
        subheadline: 'Text marketing, website, forms, online cart, photo storage -- Vagaro charges extra for all of them. NeonO includes everything for $24.99/seat/month, capped at 7 seats.',
        painPoints: [
          'Text Marketing: $20/mo add-on',
          'Vagaro MySite (website): $30/mo add-on',
          'Online Forms: $15/mo add-on',
          'Online Shopping Cart: $15/mo add-on',
          'Photo/File Storage (Drive): $15/mo add-on',
          'That\'s $95/mo in add-ons before you do anything',
        ],
      }}
      pricing={{
        neono: '$24.99/seat/mo',
        competitor: '$35/mo + $95+ add-ons',
        savingsAnnual: '$2,149–$3,349',
      }}
      features={[
        { name: 'Appointment Scheduling', neono: true, competitor: true },
        { name: 'Online Booking', neono: true, competitor: true },
        { name: 'POS & Payments', neono: true, competitor: true },
        { name: 'Text/SMS Marketing', neono: '✅ Included', competitor: '💰 $20/mo', highlight: true },
        { name: 'Website Builder', neono: '✅ Included', competitor: '💰 $30/mo (MySite)', highlight: true },
        { name: 'Online Forms', neono: '✅ Included (9 templates + AI)', competitor: '💰 $15/mo', highlight: true },
        { name: 'Online Shopping Cart', neono: '✅ Included (3 themes)', competitor: '💰 $15/mo', highlight: true },
        { name: 'Photo/File Storage', neono: '✅ Included', competitor: '💰 $15/mo (Drive)', highlight: true },
        { name: 'QuickBooks Integration', neono: '✅ Planned', competitor: '💰 $40/mo', highlight: true },
        { name: 'Colour Cost Tracking', neono: '✅ Included', competitor: '❌ Not available (need SalonScale $99–199/mo)', highlight: true },
        { name: 'AI Insights', neono: '✅ Included', competitor: '❌ Not available' },
        { name: 'Loyalty (Gamified)', neono: '✅ Tiers/badges', competitor: '🟡 Basic points' },
        { name: 'Guest Booking', neono: '✅ No account needed', competitor: '❌ Account required', highlight: true },
        { name: 'Automatic Tip Splitting', neono: '✅ Built-in', competitor: '🟡 Limited' },
        { name: 'Distributor Integration', neono: '✅ Metro Beauty', competitor: '❌ Not available' },
        { name: 'CASL Compliance', neono: '✅ Native', competitor: '❌ US-focused' },
        { name: 'Landing Page Builder', neono: '✅ Included', competitor: '❌ Not available' },
        { name: 'Branded App', neono: '✅ PWA free', competitor: '💰 $265/mo', highlight: true },
        { name: 'Payment Processing', neono: 'Transparent', competitor: 'Starting at 2.65%' },
      ]}
      uniqueDifferentiators={[
        {
          icon: '📦',
          title: '$95+/Month in Add-Ons -- All Free with NeonO',
          description: 'Text marketing ($20), website ($30), forms ($15), online cart ($15), photo storage ($15) = $95/mo Vagaro charges extra. NeonO includes all of it.',
        },
        {
          icon: '⚡',
          title: '2-Tap Checkout & Built-in Tip Splitting',
          description: 'Faster POS checkout than Vagaro, with automatic tip splitting across your team based on rules you set.',
        },
        {
          icon: '🤖',
          title: 'AI-Powered Insights & Colour Tracking',
          description: 'Predictive analytics, smart scheduling, and built-in colour cost tracking. Vagaro offers none of these.',
        },
        {
          icon: '📊',
          title: 'Savings by Team Size',
          description: 'Solo: $2,628/yr saved. 3 staff: $2,268/yr. 7 staff: $2,149/yr. 12 staff: $3,349/yr.',
        },
      ]}
      testimonial={{
        quote: 'A 5-person salon using Vagaro with essential add-ons (SMS, website, forms, storage) pays approximately $95/month in add-on fees alone -- before the base subscription. NeonO includes all of these at $0 extra.',
        author: 'Based on Vagaro pricing page, March 2026',
        business: '',
        switchedFrom: 'Vagaro',
      }}
    />
  );
}
