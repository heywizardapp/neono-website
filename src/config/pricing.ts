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
    price: 24.99,
    priceDisplay: '$24.99',
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

  // Salon Plan (Per-seat pricing)
  salon: {
    id: 'salon',
    name: 'Salon',
    tagline: 'For teams of 2+ \u2022 Seats 8+ are FREE',
    pricePerChair: 24.99,
    pricePerChairDisplay: '$24.99',
    billingPeriod: 'month' as const,
    minChairs: 2,
    maxBillableChairs: 7, // Seats 8+ are free
    maxChairs: 50,
    features: [
      'Multi-chair scheduling',
      'Staff management & permissions',
      'Commission tracking, tip distribution & timesheet export',
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

// Maximum salon price (7 seats)
export const MAX_SALON_PRICE = 24.99 * 7; // $174.93
export const MAX_SALON_PRICE_DISPLAY = '$174.93';

// Minimum salon price (2 seats)
export const MIN_SALON_PRICE = PRICING.salon.pricePerChair * PRICING.salon.minChairs;
export const MIN_SALON_PRICE_DISPLAY = `$${MIN_SALON_PRICE.toFixed(2)}`; // '$49.98'

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
  fresha: {
    id: 'fresha',
    name: 'Fresha',
    independentPrice: 29.95,
    teamPricePerMember: 19.95,
    addOns: {
      loyalty: 79.95,           // per location/month
      insights: 13.95,          // per bookable team member/month
      googleRatingBoost: 20.95, // per location/month
      dataConnector: 305.00,    // per location/month
    },
    marketplaceFee: 0.20,       // 20% of first booking
    marketplaceMinimum: 6.00,   // minimum $6 per new client
    processing: {
      inPerson: { percent: 2.29, perTx: 0.20, tapAuth: 0.15 },
      online: { percent: 2.79, perTx: 0.20 },
      manualEntry: { percent: 3.30, perTx: 0.20 },
    },
    note: 'Add-ons required for loyalty, insights, and reviews',
  },
  vagaro: {
    id: 'vagaro',
    name: 'Vagaro',
    basePrice: 35.00,
    extraCalendarPrice: 10.00,  // per additional calendar
    addOns: {
      textMarketing: 20.00,
      vagaroDrive: 15.00,
      liveStream: 15.00,
      forms: 15.00,
      onlineCart: 15.00,
      checkInApp: 15.00,
      getFeatured: 15.00,
      vagaroMySite: 30.00,
      quickbooks: 40.00,
      xero: 30.00,
      brandedApp: 265.00,
      dataLake: 40.00,
    },
    processing: {
      startingAt: 2.65,
    },
    note: 'Most features are paid add-ons',
  },
  salonScale: {
    id: 'salonScale',
    name: 'SalonScale',
    tiers: {
      small: { stylists: '1-3', price: 99.00 },
      medium: { stylists: '4-7', price: 149.00 },
      unlimited: { stylists: 'Unlimited', price: 199.00 },
    },
    note: 'Colour tracking only \u2014 no booking, POS, or marketing',
  },
} as const;

// ===========================================
// PAYMENT PROCESSING FEES
// ===========================================

export const PROCESSING_FEES = {
  inSalon: { percent: 2.69, perTx: 0.25 },
  inSalonDisplay: '2.69% + $0.25',
  online: { percent: 2.99, perTx: 0.30 },
  onlineDisplay: '2.99% + $0.30',
  dropship: { percent: 3.20, perTx: 0.30 },
  dropshipDisplay: '3.20% + $0.30',
  tipCommission: 0,
  tipCommissionDisplay: '0%',
} as const;

// ===========================================
// DISPLAY HELPERS
// ===========================================

// NeonO cost: $24.99/seat, capped at 7 seats ($174.93)
export function calculateNeonoCost(teamSize: number): number {
  const billableSeats = Math.min(teamSize, 7);
  return billableSeats * 24.99;
}

export function formatPrice(price: number, showDecimals = true): string {
  if (price === 0) return 'Free';
  return showDecimals ? `$${price.toFixed(2)}` : `$${Math.round(price)}`;
}

export function getPlanByTeamSize(teamSize: number): string {
  return teamSize <= 1 ? 'independent' : 'salon';
}
