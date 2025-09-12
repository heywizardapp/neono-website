import { BusinessTemplateConfig } from "@/templates/types";

const spasConfig: BusinessTemplateConfig = {
  industry: "Spas",
  hero: {
    title: "Spa & wellness software that feels effortless.",
    subtitle:
      "Bookings, memberships, POS, marketing, website, and AI—together. Smooth check-ins, serene ops, delighted clients.",
    primary: { label: "Start free trial", href: "/signup" },
    secondary: { label: "See pricing", href: "/pricing" },
    chips: ["Waitlist & rooms", "Memberships", "Gift cards"],
    image: "/assets/placeholders/hero-salon.webp",
  },
  snapshot: [
    { title: "Reduce no-shows", desc: "SMS/email confirmations & reminders.", color: "text-mint" },
    { title: "Fill slow hours", desc: "Smart promos and memberships.", color: "text-primary" },
    { title: "Front desk flow", desc: "Fast check-in & checkout.", color: "text-accent" },
    { title: "Free website", desc: "Clean booking page included.", color: "text-lavender" },
  ],
  sections: [
    {
      id: "appointments",
      eyebrow: "Appointments & Rooms",
      title: "Scheduling built for spas.",
      bullets: [
        "Room and resource scheduling",
        "Packages and add-ons",
        "Custom service durations",
      ],
      media: { src: "/assets/placeholders/appointments.webp", alt: "Appointments UI" },
    },
    {
      id: "pos",
      eyebrow: "POS & Retail",
      title: "Checkout with memberships & gift cards.",
      bullets: [
        "Gift cards and packages",
        "Retail with inventory basics",
        "Instant payouts optional",
      ],
      media: { src: "/assets/placeholders/pos.webp", alt: "POS UI" },
      reversed: true,
    },
    {
      id: "marketing",
      eyebrow: "Marketing & Reviews",
      title: "Automate rebooking.",
      bullets: [
        "Win-back and review invites",
        "Promos for quiet times",
        "Email and SMS built in",
      ],
      media: { src: "/assets/placeholders/marketing.webp", alt: "Marketing UI" },
    },
    {
      id: "booking",
      eyebrow: "Online Booking & Website",
      title: "Make booking soothing.",
      bullets: [
        "Beautiful booking page",
        "Link in bio and Google",
        "Mobile-first flows",
      ],
      media: { src: "/assets/placeholders/website.webp", alt: "Website & booking UI" },
      reversed: true,
    },
    {
      id: "team",
      eyebrow: "Team, Payroll & Commissions",
      title: "Happier teams.",
      bullets: [
        "Roles for desk, therapists, owners",
        "Flexible commission rules",
        "Timesheets export",
      ],
      media: { src: "/assets/placeholders/team.webp", alt: "Team & payroll UI" },
    },
  ],
  beforeAfter: [
    { before: "Manual reminders", after: "Automated SMS confirmations" },
    { before: "Paper gift cards", after: "Digital gift cards with balance" },
    { before: "Empty weekday afternoons", after: "Smart promos fill the gaps" },
  ],
  testimonials: [
    { quote: "Our front desk runs smoother and clients love the reminders.", author: "Serenity Spa", rating: 5 },
  ],
  integrations: [
    { label: "QuickBooks", src: "/assets/placeholders/integration-quickbooks.svg" },
    { label: "Stripe", src: "/assets/placeholders/integration-stripe.svg" },
    { label: "Apple Pay", src: "/assets/placeholders/integration-applepay.svg" },
    { label: "Google Pay", src: "/assets/placeholders/integration-googlepay.svg" },
    { label: "Instagram", src: "/assets/placeholders/integration-instagram.svg" },
  ],
  pricing: {
    blurb: "Starter $29/mo (2 seats) • Growth $59/mo (5 seats) • +$9.99 per extra seat",
    sub: "SMS, website, online cart, QuickBooks sync, and AI are included.",
    cta: { label: "See pricing", href: "/pricing" },
  },
  faqs: [
    { q: "Do you support room scheduling?", a: "Yes—assign rooms/resources per service and staff." },
    { q: "Can I sell gift cards?", a: "Yes—built-in digital gift cards with balance tracking." },
  ],
};

export default spasConfig;
