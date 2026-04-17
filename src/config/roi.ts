import { RoiInput } from '@/types/roi';

export const DEFAULT_ROI_CONFIG = {
  // NeonO unified pricing: $24.99/seat/month, capped at 7 seats ($174.93 max)
  neono: {
    pricePerSeat: 24.99,
    maxBillableSeats: 7,
    maxPrice: 174.93,
  },

  // Default Payment Rates (in-salon)
  paymentRates: {
    optionA: { percent: 2.69, perTxCents: 25 },
    optionB: { percent: 2.99, perTxCents: 30 },
  },

  // Competitor Defaults (Fresha — most common comparison)
  competitor: {
    basePrice: 29.95,
    includedSeats: 1,
    seatPrice: 19.95,
    addOns: {
      sms: 20,
      loyalty: 79.95,
      insights: 13.95,      // per member
      googleBoost: 20.95,
      website: 30,
      onlineStore: 15,
      forms: 15,
      photoStorage: 15,
      quickbooks: 40,
      colourTracking: 99,   // SalonScale 1-3
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
