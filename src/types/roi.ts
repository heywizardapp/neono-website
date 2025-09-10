export type PaymentRate = { 
  percent: number; 
  perTxCents: number 
};

export type RoiInput = {
  businessType: "Salon" | "Barbershop" | "Spa" | "Nails" | "Aesthetics";
  plan: "starter" | "growth";
  teamSize: number;
  aov: number;                 // average order value in $
  monthlyTx: number;           // transactions
  smsPerMonth: number;
  websiteCart: boolean;
  accounting: boolean;
  aiAutomation: boolean;
  competitorBase: number;      // $
  competitorIncludedSeats: number;
  competitorSeatPrice: number; // $ per extra seat
  neonORate: PaymentRate;      // default {2.6,10} OR {2.5,20}
  competitorRate: PaymentRate; // user-set or same as NeonO
  otherFixedFee: number;       // optional
  hardwareCredit?: number;     // optional
};

export type RoiOutput = {
  neonoSoftware: number;
  competitorSoftware: number;
  neonoProcessing: number;
  competitorProcessing: number;
  neonoTotal: number;
  competitorTotal: number;
  monthlySavings: number;
  yearlySavings: number;
  paybackMonths: number | null;
  breakdown: Record<string, number>;
};

export type SearchDoc = { 
  id: string; 
  title: string; 
  path: string; 
  group: "Pages" | "Products" | "Solutions" | "Resources"; 
  tags?: string[]; 
  boost?: number 
};

export type Crumb = { 
  label: string; 
  href: string 
};

export type PlanKey = "starter" | "growth" | "competitorA";

export type FeatureRow = { 
  id: string; 
  label: string; 
  note?: string; 
  values: Record<PlanKey, boolean | string> 
};

export type FeatureCategory = { 
  id: string; 
  label: string; 
  rows: FeatureRow[] 
};

export type FeatureMatrix = { 
  plans: PlanKey[]; 
  categories: FeatureCategory[] 
};