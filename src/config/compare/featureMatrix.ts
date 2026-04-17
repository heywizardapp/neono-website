import { FeatureMatrix, PlanKey } from '@/types/roi';
import { PRICING, COMPETITORS } from '@/config/pricing';

export const featureMatrix: FeatureMatrix = {
  plans: ['independent', 'salon', 'competitorA'],
  categories: [
    {
      id: 'appointments',
      label: 'featureMatrix.appointments',
      rows: [
        { id: 'online_booking', label: 'featureMatrix.onlineBooking', values: { independent: true, salon: true, competitorA: 'Add-on' } },
        { id: 'calendar_sync', label: 'featureMatrix.calendarSync', values: { independent: true, salon: true, competitorA: false } },
        { id: 'waitlist', label: 'featureMatrix.waitlistManagement', values: { independent: true, salon: true, competitorA: 'Add-on' } },
        { id: 'recurring', label: 'featureMatrix.recurringAppointments', values: { independent: true, salon: true, competitorA: true } },
        { id: 'staff_scheduling', label: 'featureMatrix.staffScheduling', values: { independent: `${PRICING.independent.seats} seat`, salon: 'Up to 50 seats', competitorA: '1 + add-ons' } },
      ],
    },
    {
      id: 'payments',
      label: 'featureMatrix.payments',
      rows: [
        { id: 'card_reader', label: 'featureMatrix.cardReader', values: { independent: true, salon: true, competitorA: 'Extra cost' } },
        { id: 'tip_splitting', label: 'featureMatrix.tipSplitting', values: { independent: true, salon: true, competitorA: false } },
        { id: 'inventory', label: 'featureMatrix.inventoryTracking', values: { independent: true, salon: 'Advanced', competitorA: 'Add-on' } },
        { id: 'reporting', label: 'featureMatrix.salesReporting', values: { independent: true, salon: true, competitorA: 'Basic' } },
        { id: 'tax_reporting', label: 'featureMatrix.taxReporting', values: { independent: true, salon: true, competitorA: 'Add-on' } },
      ],
    },
    {
      id: 'marketing',
      label: 'featureMatrix.marketing',
      rows: [
        { id: 'sms_marketing', label: 'featureMatrix.smsMarketing', values: { independent: true, salon: true, competitorA: 'Add-on' } },
        { id: 'email_marketing', label: 'featureMatrix.emailCampaigns', values: { independent: true, salon: true, competitorA: 'Add-on' } },
        { id: 'review_requests', label: 'featureMatrix.reviewRequests', values: { independent: true, salon: true, competitorA: false } },
        { id: 'loyalty_program', label: 'featureMatrix.loyaltyProgram', values: { independent: true, salon: true, competitorA: 'Add-on' } },
        { id: 'referral_tracking', label: 'featureMatrix.referralTracking', values: { independent: true, salon: true, competitorA: false } },
      ],
    },
    {
      id: 'website',
      label: 'featureMatrix.website',
      rows: [
        { id: 'website_builder', label: 'featureMatrix.websiteBuilder', values: { independent: true, salon: true, competitorA: 'Add-on' } },
        { id: 'online_store', label: 'featureMatrix.onlineStore', values: { independent: true, salon: true, competitorA: 'Add-on' } },
        { id: 'link_in_bio', label: 'featureMatrix.linkInBio', values: { independent: true, salon: true, competitorA: false } },
        { id: 'seo_tools', label: 'featureMatrix.seoOptimization', values: { independent: true, salon: 'Advanced', competitorA: false } },
        { id: 'social_integration', label: 'featureMatrix.socialMediaIntegration', values: { independent: true, salon: true, competitorA: 'Add-on' } },
      ],
    },
    {
      id: 'analytics',
      label: 'featureMatrix.analytics',
      rows: [
        { id: 'business_analytics', label: 'featureMatrix.businessAnalytics', values: { independent: true, salon: 'Advanced', competitorA: 'Add-on' } },
        { id: 'ai_insights', label: 'featureMatrix.aiInsights', values: { independent: true, salon: true, competitorA: 'Add-on' } },
        { id: 'forecasting', label: 'featureMatrix.revenueForecasting', values: { independent: true, salon: true, competitorA: false } },
        { id: 'competitor_analysis', label: 'featureMatrix.competitorAnalysis', values: { independent: true, salon: true, competitorA: false } },
        { id: 'custom_reports', label: 'featureMatrix.customReports', values: { independent: true, salon: true, competitorA: 'Add-on' } },
      ],
    },
    {
      id: 'integrations',
      label: 'featureMatrix.integrations',
      rows: [
        { id: 'quickbooks', label: 'featureMatrix.quickbooksSync', values: { independent: true, salon: true, competitorA: 'Add-on' } },
        { id: 'api_access', label: 'featureMatrix.apiAccess', values: { independent: true, salon: true, competitorA: 'Enterprise' } },
        { id: 'support', label: 'featureMatrix.customerSupport', values: { independent: 'Email', salon: 'Priority', competitorA: 'Basic' } },
        { id: 'training', label: 'featureMatrix.trainingIncluded', values: { independent: 'Self-serve', salon: 'Live training', competitorA: 'Extra cost' } },
        { id: 'data_export', label: 'featureMatrix.dataExport', values: { independent: true, salon: true, competitorA: 'Limited' } },
      ],
    },
  ],
};

export const planLabels: Record<PlanKey, string> = {
  independent: PRICING.independent.name,
  salon: PRICING.salon.name,
  competitorA: 'Competitor A',
};

export const planPricing: Record<PlanKey, { price: number; seats: number; note?: string }> = {
  independent: { price: PRICING.independent.price, seats: PRICING.independent.seats },
  salon: { price: PRICING.salon.pricePerChair, seats: PRICING.salon.maxBillableChairs, note: '$24.99/seat, seats 8+ free' },
  competitorA: { price: COMPETITORS.vagaro.basePrice, seats: 1, note: COMPETITORS.vagaro.note },
};
