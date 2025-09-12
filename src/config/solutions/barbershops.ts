import { BusinessTemplateConfig } from "@/templates/types";

const barbersConfig: BusinessTemplateConfig = {
  industry: "Barbershops",
  hero: {
    title: "Run your barbershop on one platform.",
    subtitle:
      "Walk-ins, appointments, POS, marketing, website, and AI—built in. Faster checkouts, fewer no-shows, loyal clients.",
    primary: { label: "Start free trial", href: "/signup" },
    secondary: { label: "See pricing", href: "/pricing" },
    chips: ["99.9% uptime", "2-tap checkout", "No add-on traps"],
    image: "/assets/placeholders/hero-salon.webp",
  },
  snapshot: [
    { title: "Cut no-shows", desc: "Automatic SMS/email confirmations & reminders.", color: "text-mint" },
    { title: "Keep chairs full", desc: "Win-back and gap-filler campaigns.", color: "text-primary" },
    { title: "Fast checkout", desc: "Tap to pay, split tips, instant payouts.", color: "text-accent" },
    { title: "Free website", desc: "Clean booking page + link-in-bio included.", color: "text-lavender" },
  ],
  sections: [
    {
      id: "appointments",
      eyebrow: "Appointments & Walk‑ins",
      title: "Built for barber flow.",
      bullets: [
        "Walk-ins, waitlist, and quick rebooking",
        "Chair views with drag-and-drop",
        "Service menus per barber with timing",
      ],
      media: { src: "/assets/placeholders/appointments.webp", alt: "Appointments UI" },
    },
    {
      id: "pos",
      eyebrow: "POS & Payments",
      title: "Faster checkout, zero fuss.",
      bullets: [
        "Tap, chip, or phone—no tip commission",
        "Split bills & tips by service",
        "Instant payouts optional; clear rates",
      ],
      media: { src: "/assets/placeholders/pos.webp", alt: "POS UI" },
      reversed: true,
    },
    {
      id: "marketing",
      eyebrow: "Marketing & Reviews",
      title: "Keep the week packed.",
      bullets: [
        "SMS/email rebook campaigns",
        "Review invites after checkout",
        "Promo codes for quiet times",
      ],
      media: { src: "/assets/placeholders/marketing.webp", alt: "Marketing UI" },
    },
    {
      id: "booking",
      eyebrow: "Online Booking & Website",
      title: "Bookable everywhere.",
      bullets: [
        "Free website & link-in-bio",
        "Google & Instagram links",
        "Mobile-first flows clients love",
      ],
      media: { src: "/assets/placeholders/website.webp", alt: "Website & booking UI" },
      reversed: true,
    },
    {
      id: "team",
      eyebrow: "Team & Commissions",
      title: "Built for owners and teams.",
      bullets: [
        "Roles for owners, managers, barbers",
        "Flexible commission rules",
        "Quick onboarding",
      ],
      media: { src: "/assets/placeholders/team.webp", alt: "Team & payroll UI" },
    },
  ],
  beforeAfter: [
    { before: "Manual reminders", after: "Automated SMS confirmations" },
    { before: "End-of-day tally", after: "Instant reports & payouts" },
    { before: "Empty weekday afternoons", after: "Smart promos fill the gaps" },
  ],
  testimonials: [
    { quote: "Checkout is fast and tips are up.", author: "Kings & Fades", rating: 5, stat: "+12% tips" },
    { quote: "Walk-in flow is finally organized.", author: "Beacon Barbers", rating: 5 },
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
    { q: "Can I migrate from my current system?", a: "Yes—import clients, services, and appointments with guided steps." },
    { q: "Do I need hardware?", a: "You can start without it; add a reader later for faster checkout." },
  ],
};

export default barbersConfig;
