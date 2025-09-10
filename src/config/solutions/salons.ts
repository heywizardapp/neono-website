import { BusinessTemplateConfig } from "@/templates/types";

const salonsConfig: BusinessTemplateConfig = {
  industry: "Salons",
  hero: {
    title: "Run your salon on one platform.",
    subtitle: "Appointments, POS, marketing, website, and AI—built in. Faster checkouts, fewer no-shows, happier clients.",
    primary: { label: "Start free trial", href: "/signup" },
    secondary: { label: "See pricing", href: "/pricing" },
    chips: ["99.9% uptime", "2-tap checkout", "No add-on traps"],
    image: "/assets/placeholders/hero-salon.webp",
  },
  snapshot: [
    { title: "Cut no-shows", desc: "Automatic SMS/email confirmations & reminders.", color: "text-mint" },
    { title: "Fill slow hours", desc: "Win-back and gap-filler campaigns.", color: "text-primary" },
    { title: "Fast checkout", desc: "Tap to pay, split tips, instant payouts.", color: "text-accent" },
    { title: "Free website", desc: "Clean booking page + link-in-bio included.", color: "text-lavender" },
  ],
  sections: [
    {
      id: "appointments",
      eyebrow: "Appointments & Calendar",
      title: "A calendar designed for stylists.",
      bullets: [
        "Chair & room views with quick drag-and-drop",
        "Walk-ins, waitlist, and two-tap rebooking",
        "Service menus per stylist with timing & resources",
      ],
      media: { src: "/assets/placeholders/appointments.webp", alt: "Appointments UI" },
    },
    {
      id: "pos",
      eyebrow: "POS & Payments",
      title: "Faster checkout, zero fuss.",
      bullets: [
        "Tap, chip, or phone—no tip commission",
        "Split bills & tips across services and retail",
        "Instant payouts optional; clear rates",
      ],
      media: { src: "/assets/placeholders/pos.webp", alt: "POS UI" },
      reversed: true,
    },
    {
      id: "marketing",
      eyebrow: "Marketing & Reviews",
      title: "Keep your calendar full.",
      bullets: [
        "SMS/email campaigns that rebook clients automatically",
        "Review invites after checkout boost ratings",
        "Promo codes and bundles for quiet times",
      ],
      media: { src: "/assets/placeholders/marketing.webp", alt: "Marketing UI" },
    },
    {
      id: "booking",
      eyebrow: "Online Booking & Website",
      title: "Be bookable everywhere.",
      bullets: [
        "Free website & link-in-bio with \"Book now\"",
        "Google & Instagram links drive direct bookings",
        "Mobile-first flows that clients love",
      ],
      media: { src: "/assets/placeholders/website.webp", alt: "Website & booking UI" },
      reversed: true,
    },
    {
      id: "team",
      eyebrow: "Team, Commissions & Payroll",
      title: "Built for owners and teams.",
      bullets: [
        "Roles and permissions for owners, managers, stylists",
        "Flexible commission rules by service or retail",
        "Timesheets export and quick staff onboarding",
      ],
      media: { src: "/assets/placeholders/team.webp", alt: "Team & payroll UI" },
    },
    {
      id: "reports",
      eyebrow: "Reports & AI",
      title: "Insights you'll actually use.",
      bullets: [
        "Daily sales, utilization, retention, product mix",
        "AI spots gaps and suggests promos",
        "Role-gated dashboards for owners and team leads",
      ],
      media: { src: "/assets/placeholders/analytics.webp", alt: "Reports & AI UI" },
      reversed: true,
    },
  ],
  beforeAfter: [
    { before: "Manual reminders", after: "Automated SMS confirmations" },
    { before: "End-of-day tally", after: "Instant reports & payouts" },
    { before: "Empty weekday afternoons", after: "Smart promos fill the gaps" },
  ],
  testimonials: [
    { quote: "We rebook faster, and checkout takes seconds.", author: "Amber & Co. Salon", rating: 5, stat: "+18% repeat bookings" },
    { quote: "Reminders cut our no-shows by a third.", author: "Harbor Hair Studio", rating: 5 },
    { quote: "Website + link-in-bio booked our new stylists day one.", author: "North & Pine", rating: 5 },
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
    { q: "Are SMS and the website extra?", a: "No—both are included with your plan." },
    { q: "How do tips and commissions work?", a: "Split tips at checkout and set commission rules per service or retail." },
    { q: "Do you support multi-location?", a: "Yes—central reporting and location-level controls." },
    { q: "Does this work for barbers and spas too?", a: "Yes—use the same template with industry-specific copy and media." },
  ],
};

export default salonsConfig;