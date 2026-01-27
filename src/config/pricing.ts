/**
 * Central Pricing Configuration
 * All pricing across the platform should reference this file
 * to ensure consistency.
 */

export interface PlanConfig {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceDisplay: string;
  billingPeriod: 'month' | 'year';
  seats: number;
  seatsLabel: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export interface HardwareConfig {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  description: string;
}

export interface CompetitorConfig {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  seats: number;
  note: string;
}

// ===========================================
// NEONO SUBSCRIPTION PLANS
// ===========================================

export const PRICING = {
  // Independent Plan (Solo practitioners)
  independent: {
    id: 'independent',
    name: 'Independent',
    tagline: 'Everything you need to run your independent business',
    price: 19.99,
    priceDisplay: '$19.99',
    billingPeriod: 'month' as const,
    seats: 1,
    seatsLabel: '1 seat included',
    features: [
      'Online booking & scheduling',
      'Point of sale & payments',
      'Client management & history',
      'SMS & email notifications',
      'Free booking website',
      'Marketing tools & campaigns',
      'Reports & analytics',
      'Mobile app access',
      'Email support',
    ],
    ctaText: 'Start Free Trial',
    ctaHref: '/signup',
  },

  // Starter Plan (Small teams)
  starter: {
    id: 'starter',
    name: 'NeonO Starter',
    tagline: 'Perfect for small teams getting started',
    price: 29,
    priceDisplay: '$29',
    billingPeriod: 'month' as const,
    seats: 2,
    seatsLabel: '2 seats included',
    features: [
      'Everything in Independent',
      'Multi-chair scheduling',
      'Basic staff management',
      'Commission tracking',
      'Team calendar view',
      'Basic analytics',
    ],
    ctaText: 'Start Free Trial',
    ctaHref: '/signup',
  },

  // Growth Plan (Growing salons)  
  growth: {
    id: 'growth',
    name: 'NeonO Growth',
    tagline: 'For growing salons that need more power',
    price: 59,
    priceDisplay: '$59',
    billingPeriod: 'month' as const,
    seats: 5,
    seatsLabel: '5 seats included',
    popular: true,
    features: [
      'Everything in Starter',
      'Advanced staff permissions',
      'AI insights & forecasting',
      'Loyalty program',
      'Referral tracking',
      'Priority support',
      'Custom reports',
      'API access',
    ],
    ctaText: 'Start Free Trial',
    ctaHref: '/signup',
  },

  // Salon Plan (Per-chair pricing)
  salon: {
    id: 'salon',
    name: 'Salon',
    tagline: 'Perfect for teams of 2+ • Chairs 8+ are FREE',
    pricePerChair: 16.99,
    pricePerChairDisplay: '$16.99',
    billingPeriod: 'month' as const,
    minChairs: 2,
    maxBillableChairs: 7, // Chairs 8+ are free
    maxChairs: 50,
    features: [
      'Multi-chair scheduling',
      'Staff management & permissions',
      'Commission & payroll tracking',
      'Online booking & scheduling',
      'Point of sale & payments',
      'Client management & history',
      'SMS & email marketing',
      'Free booking website',
      'Advanced reports & analytics',
      'Mobile app access',
      'Priority support',
    ],
    ctaText: 'Start Free Trial',
    ctaHref: '/signup',
  },
} as const;

// Helper function to calculate salon pricing
export function calculateSalonPrice(chairs: number): {
  total: number;
  billableChairs: number;
  freeChairs: number;
  savings: number;
} {
  const { pricePerChair, maxBillableChairs } = PRICING.salon;
  const billableChairs = Math.min(chairs, maxBillableChairs);
  const freeChairs = Math.max(0, chairs - maxBillableChairs);
  const total = billableChairs * pricePerChair;
  const savings = freeChairs * pricePerChair;
  
  return { total, billableChairs, freeChairs, savings };
}

// Maximum salon price (7 chairs)
export const MAX_SALON_PRICE = PRICING.salon.pricePerChair * PRICING.salon.maxBillableChairs; // $118.93
export const MAX_SALON_PRICE_DISPLAY = `$${MAX_SALON_PRICE.toFixed(2)}`; // '$118.93'

// Minimum salon price (2 chairs)
export const MIN_SALON_PRICE = PRICING.salon.pricePerChair * PRICING.salon.minChairs;
export const MIN_SALON_PRICE_DISPLAY = `$${MIN_SALON_PRICE.toFixed(2)}`; // '$33.98'

// ===========================================
// HARDWARE PRICING
// ===========================================

export const HARDWARE = {
  stripeTerminalS700: {
    id: 'stripe-terminal-s700',
    name: 'Stripe Terminal S700',
    price: 349,
    priceDisplay: '$349',
    description: 'All-in-one smart handheld device. Manage appointments, check out clients, and accept payments right from the chair.',
  },
  wisePosE: {
    id: 'wisepos-e',
    name: 'WisePOS E',
    price: 299,
    priceDisplay: '$299',
    description: 'Smart countertop reader with a 5-inch touchscreen. Perfect for your front desk reception area.',
  },
  stripeReaderM2: {
    id: 'stripe-reader-m2',
    name: 'Stripe Reader M2',
    price: 59,
    priceDisplay: '$59',
    description: 'Compact Bluetooth reader for mobile payments. Perfect for on-the-go or booth rentals.',
  },
  tapToPayIphone: {
    id: 'tap-to-pay-iphone',
    name: 'Tap to Pay on iPhone',
    price: 0,
    priceDisplay: 'Free',
    description: 'Accept contactless payments with just your iPhone. No extra hardware required.',
  },
  tapToPayAndroid: {
    id: 'tap-to-pay-android', 
    name: 'Tap to Pay on Android',
    price: 0,
    priceDisplay: 'Free',
    description: 'Turn your Android device into a payment terminal. Accept chip and contactless payments instantly.',
  },
} as const;

// ===========================================
// COMPETITOR COMPARISON
// ===========================================

export const COMPETITORS = {
  competitorA: {
    id: 'competitorA',
    name: 'Competitor A',
    price: 35,
    priceDisplay: '$35',
    seats: 1,
    note: 'Base plan, add-ons extra',
  },
  fresha: {
    id: 'fresha',
    name: 'Fresha',
    loyaltyProgramCost: 1000, // Per year
    loyaltyProgramCostDisplay: '$1,000+/year',
    note: 'Charges separately for loyalty features',
  },
} as const;

// ===========================================
// PAYMENT PROCESSING FEES
// ===========================================

export const PROCESSING_FEES = {
  cardRate: 2.6,
  cardRateDisplay: '2.6%',
  perTransaction: 0.10,
  perTransactionDisplay: '$0.10',
  smsRate: 0.02,
  smsRateDisplay: '$0.02',
  tipCommission: 0, // We never take tips
  tipCommissionDisplay: '0%',
} as const;

// ===========================================
// FEATURE AVAILABILITY BY PLAN
// ===========================================

export const PLAN_FEATURES = {
  loyalty: {
    starter: false,
    growth: true,
    enterprise: true,
  },
  aiInsights: {
    starter: false,
    growth: true,
    enterprise: true,
  },
  customReports: {
    starter: false,
    growth: true,
    enterprise: true,
  },
  apiAccess: {
    starter: false,
    growth: true,
    enterprise: true,
  },
} as const;

// ===========================================
// DISPLAY HELPERS
// ===========================================

export function formatPrice(price: number, showDecimals = true): string {
  if (price === 0) return 'Free';
  return showDecimals ? `$${price.toFixed(2)}` : `$${Math.round(price)}`;
}

export function getPlanByPrice(monthlyPrice: number): string {
  if (monthlyPrice <= PRICING.independent.price) return 'independent';
  if (monthlyPrice <= PRICING.starter.price) return 'starter';
  if (monthlyPrice <= PRICING.growth.price) return 'growth';
  return 'salon';
}
