export type Cta = { label: string; href: string };
export type Chip = string;

export type HeroConfig = {
  title: string;
  subtitle: string;
  primary: Cta;
  secondary?: Cta;
  chips?: Chip[];
  image?: string; // path to placeholder
};

export type SnapshotCard = { 
  icon?: string; 
  title: string; 
  desc?: string;
  color?: string;
};

export type MediaRowBlock = {
  id: string;            // anchor id
  eyebrow?: string;
  title: string;
  bullets: string[];
  media: { src: string; alt: string; variant?: "image"|"video" };
  reversed?: boolean;    // swap media/text
};

export type BeforeAfterCard = { before: string; after: string };

export type Testimonial = { 
  quote: string; 
  author: string; 
  stat?: string; 
  rating?: number;
  business?: string;
};

export type IntegrationLogo = { label: string; src?: string };

export type PricingRibbonConfig = {
  blurb: string; // e.g., "Starter $29… • Growth $59… • +$9.99/seat"
  sub?: string;  // "SMS, website, cart, QuickBooks, AI included."
  cta?: Cta;
};

export type FaqItem = { q: string; a: string };

export type BusinessTemplateConfig = {
  industry: string; // "Salons"
  hero: HeroConfig;
  snapshot: SnapshotCard[];
  sections: MediaRowBlock[];
  beforeAfter: BeforeAfterCard[];
  testimonials: Testimonial[];
  integrations: IntegrationLogo[];
  pricing: PricingRibbonConfig;
  faqs: FaqItem[];
};