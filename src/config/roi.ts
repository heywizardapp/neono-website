import { RoiInput } from '@/types/roi';

export const DEFAULT_ROI_CONFIG = {
  // NeonO Plan Pricing (New)
  independent: {
    basePrice: 19.99,
    includedSeats: 1,
  },
  salon: {
    pricePerChair: 16.99,
  },
  // Legacy pricing for ROI calculator (to be updated)
  starter: {
    basePrice: 19.99,
    includedSeats: 1,
  },
  growth: {
    basePrice: 16.99,
    includedSeats: 1,
  },
  extraSeatPrice: 16.99,

  // Default Payment Rates
  paymentRates: {
    optionA: { percent: 2.6, perTxCents: 10 },
    optionB: { percent: 2.5, perTxCents: 20 },
  },

  // Competitor Defaults (editable)
  competitor: {
    basePrice: 35,
    includedSeats: 1,
    seatPrice: 12,
    addOns: {
      sms: 20,
      onlineStore: 15,
      website: 30,
      quickbooks: 40,
      ai: 15,
    },
  },

  // Preset Scenarios
  presets: {
    solo: {
      teamSize: 1,
      aov: 45,
      monthlyTx: 300,
      smsPerMonth: 500,
    } as Partial<RoiInput>,
    growing: {
      teamSize: 3,
      aov: 65,
      monthlyTx: 800,
      smsPerMonth: 1500,
    } as Partial<RoiInput>,
    multiLocation: {
      teamSize: 8,
      aov: 85,
      monthlyTx: 2200,
      smsPerMonth: 4000,
    } as Partial<RoiInput>,
  },
};

export const BUSINESS_TYPE_OPTIONS = [
  { value: "Salon", label: "Hair Salon" },
  { value: "Barbershop", label: "Barbershop" },
  { value: "Spa", label: "Day Spa" },
  { value: "Nails", label: "Nail Salon" },
  { value: "Aesthetics", label: "Medical Aesthetics" },
] as const;