import { BusinessTemplateConfig } from "@/templates/types";
import { PRICING } from "@/config/pricing";

const aestheticsConfig: BusinessTemplateConfig = {
  industry: "Medical Aesthetics",
  hero: {
    titleKey: "solutions.aesthetics.hero.title",
    subtitleKey: "solutions.aesthetics.hero.subtitle",
    primaryCtaKey: "solutions.aesthetics.hero.primary",
    secondaryCtaKey: "solutions.aesthetics.hero.secondary",
    primaryHref: "/signup",
    secondaryHref: "/pricing",
    chipsKeys: [
      "solutions.aesthetics.chips.deposits",
      "solutions.aesthetics.chips.consults", 
      "solutions.aesthetics.chips.compliance"
    ],
    image: "/assets/placeholders/hero-salon.webp",
  },
  snapshot: [
    { title: "Reduce no-shows", desc: "Automated confirmations & reminders.", color: "text-mint" },
    { title: "Grow repeat visits", desc: "Smart campaigns & memberships.", color: "text-primary" },
    { title: "Fast checkout", desc: "Tap to pay, split tips, instant payouts.", color: "text-accent" },
    { title: "Free website", desc: "Clean booking page included.", color: "text-lavender" },
  ],
  sections: [
    {
      id: "appointments",
      eyebrow: "Appointments & Consents",
      title: "Scheduling for med-aesthetics.",
      bullets: [
        "Custom service timing & resources",
        "Waitlist, deposits, and series",
        "Notes and basic client profiles",
      ],
      media: { src: "/assets/placeholders/appointments.webp", alt: "Appointments UI" },
    },
    {
      id: "pos",
      eyebrow: "POS & Payments",
      title: "Smooth checkout.",
      bullets: [
        "Tap, chip, or phone",
        "Split bills & tips",
        "Instant payouts optional",
      ],
      media: { src: "/assets/placeholders/pos.webp", alt: "POS UI" },
      reversed: true,
    },
    {
      id: "marketing",
      eyebrow: "Marketing & Reviews",
      title: "Keep calendars full.",
      bullets: [
        "Win-back campaigns",
        "Review invites",
        "Promos for quiet times",
      ],
      media: { src: "/assets/placeholders/marketing.webp", alt: "Marketing UI" },
    },
    {
      id: "booking",
      eyebrow: "Online Booking & Website",
      title: "Book from anywhere.",
      bullets: [
        "Free website & link-in-bio",
        "Google & Instagram links",
        "Mobile-first flows",
      ],
      media: { src: "/assets/placeholders/website.webp", alt: "Website & booking UI" },
      reversed: true,
    },
    {
      id: "team",
      eyebrow: "Team & Commissions",
      title: "Built for modern practices.",
      bullets: [
        "Roles for owners and providers",
        "Flexible commission rules",
        "Quick onboarding",
      ],
      media: { src: "/assets/placeholders/team.webp", alt: "Team & payroll UI" },
    },
  ],
  beforeAfter: [
    { before: "Manual reminders", after: "Automated SMS confirmations" },
    { before: "Paper forms", after: "Simple digital flows" },
    { before: "Empty weekday afternoons", after: "Smart promos fill the gaps" },
  ],
  testimonials: [
    { quote: "We grew bookings and cut no-shows in a month.", author: "Renew Aesthetics", rating: 5 },
  ],
  integrations: [
    { label: "QuickBooks", src: "/assets/placeholders/integration-quickbooks.svg" },
    { label: "Stripe", src: "/assets/placeholders/integration-stripe.svg" },
    { label: "Apple Pay", src: "/assets/placeholders/integration-applepay.svg" },
    { label: "Google Pay", src: "/assets/placeholders/integration-googlepay.svg" },
    { label: "Instagram", src: "/assets/placeholders/integration-instagram.svg" },
  ],
  pricing: {
    blurb: `Starter ${PRICING.starter.priceDisplay}/mo (${PRICING.starter.seats} seats) • Growth ${PRICING.growth.priceDisplay}/mo (${PRICING.growth.seats} seats) • Salon ${PRICING.salon.pricePerChairDisplay}/chair`,
    sub: "SMS, website, online cart, QuickBooks sync, and AI are included.",
    cta: { label: "See pricing", href: "/pricing" },
  },
  faqs: [
    { q: "Do you support deposits?", a: "Yes—optional deposits per service help lock appointments in." },
    { q: "Can I migrate my clients?", a: "Yes—guided import of clients and services." },
  ],
};

export default aestheticsConfig;
