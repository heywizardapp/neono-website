import { FeatureMatrix, PlanKey } from '@/types/roi';
import { PRICING, COMPETITORS } from '@/config/pricing';

export const featureMatrix: FeatureMatrix = {
  plans: ['starter', 'growth', 'competitorA'],
  categories: [
    {
      id: 'appointments',
      label: 'Appointments & Scheduling',
      rows: [
        { id: 'online_booking', label: 'Online booking', values: { starter: true, growth: true, competitorA: 'Add-on' } },
        { id: 'calendar_sync', label: 'Calendar sync', values: { starter: true, growth: true, competitorA: false } },
        { id: 'waitlist', label: 'Waitlist management', values: { starter: true, growth: true, competitorA: 'Add-on' } },
        { id: 'recurring', label: 'Recurring appointments', values: { starter: true, growth: true, competitorA: true } },
        { id: 'staff_scheduling', label: 'Staff scheduling', values: { starter: `${PRICING.starter.seats} staff`, growth: `${PRICING.growth.seats} staff`, competitorA: `${COMPETITORS.competitorA.seats} staff` } },
      ],
    },
    {
      id: 'payments',
      label: 'POS & Payments',
      rows: [
        { id: 'card_reader', label: 'Card reader included', values: { starter: true, growth: true, competitorA: 'Extra cost' } },
        { id: 'tip_splitting', label: 'Tip splitting', values: { starter: true, growth: true, competitorA: false } },
        { id: 'inventory', label: 'Inventory tracking', values: { starter: 'Basic', growth: 'Advanced', competitorA: 'Add-on' } },
        { id: 'reporting', label: 'Sales reporting', values: { starter: true, growth: true, competitorA: 'Basic' } },
        { id: 'tax_reporting', label: 'Tax reporting', values: { starter: true, growth: true, competitorA: 'Add-on' } },
      ],
    },
    {
      id: 'marketing',
      label: 'Marketing & Communication',
      rows: [
        { id: 'sms_marketing', label: 'SMS marketing', values: { starter: true, growth: true, competitorA: 'Add-on' } },
        { id: 'email_marketing', label: 'Email campaigns', values: { starter: true, growth: true, competitorA: 'Add-on' } },
        { id: 'review_requests', label: 'Review requests', values: { starter: true, growth: true, competitorA: false } },
        { id: 'loyalty_program', label: 'Loyalty program', values: { starter: true, growth: true, competitorA: 'Add-on' } },
        { id: 'referral_tracking', label: 'Referral tracking', values: { starter: true, growth: true, competitorA: false } },
      ],
    },
    {
      id: 'website',
      label: 'Website & Online Presence',
      rows: [
        { id: 'website_builder', label: 'Website builder', values: { starter: true, growth: true, competitorA: 'Add-on' } },
        { id: 'online_store', label: 'Online store', values: { starter: true, growth: true, competitorA: 'Add-on' } },
        { id: 'link_in_bio', label: 'Link-in-bio page', values: { starter: true, growth: true, competitorA: false } },
        { id: 'seo_tools', label: 'SEO optimization', values: { starter: 'Basic', growth: 'Advanced', competitorA: false } },
        { id: 'social_integration', label: 'Social media integration', values: { starter: true, growth: true, competitorA: 'Add-on' } },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics & AI',
      rows: [
        { id: 'business_analytics', label: 'Business analytics', values: { starter: 'Basic', growth: 'Advanced', competitorA: 'Add-on' } },
        { id: 'ai_insights', label: 'AI insights', values: { starter: false, growth: true, competitorA: 'Add-on' } },
        { id: 'forecasting', label: 'Revenue forecasting', values: { starter: false, growth: true, competitorA: false } },
        { id: 'competitor_analysis', label: 'Competitor analysis', values: { starter: false, growth: true, competitorA: false } },
        { id: 'custom_reports', label: 'Custom reports', values: { starter: false, growth: true, competitorA: 'Add-on' } },
      ],
    },
    {
      id: 'integrations',
      label: 'Integrations & Support',
      rows: [
        { id: 'quickbooks', label: 'QuickBooks sync', values: { starter: true, growth: true, competitorA: 'Add-on' } },
        { id: 'api_access', label: 'API access', values: { starter: false, growth: true, competitorA: 'Enterprise' } },
        { id: 'support', label: 'Customer support', values: { starter: 'Email', growth: 'Priority', competitorA: 'Basic' } },
        { id: 'training', label: 'Training included', values: { starter: 'Self-serve', growth: 'Live training', competitorA: 'Extra cost' } },
        { id: 'data_export', label: 'Data export', values: { starter: true, growth: true, competitorA: 'Limited' } },
      ],
    },
  ],
};

export const planLabels: Record<PlanKey, string> = {
  starter: PRICING.starter.name,
  growth: PRICING.growth.name,
  competitorA: COMPETITORS.competitorA.name,
};

export const planPricing: Record<PlanKey, { price: number; seats: number; note?: string }> = {
  starter: { price: PRICING.starter.price, seats: PRICING.starter.seats },
  growth: { price: PRICING.growth.price, seats: PRICING.growth.seats },
  competitorA: { price: COMPETITORS.competitorA.price, seats: COMPETITORS.competitorA.seats, note: COMPETITORS.competitorA.note },
};