import { BusinessTemplateConfig } from "@/templates/types";
import { PRICING } from "@/config/pricing";

const getBarbershopsConfig = (t: (key: string) => string): BusinessTemplateConfig => ({
  industry: t("solutions.barbershops.industry"),
  hero: {
    titleKey: "solutions.barbershops.hero.title",
    subtitleKey: "solutions.barbershops.hero.subtitle",
    primaryCtaKey: "solutions.barbershops.hero.primary",
    secondaryCtaKey: "solutions.barbershops.hero.secondary",
    primaryHref: "/signup",
    secondaryHref: "/pricing",
    chipsKeys: [
      "solutions.barbershops.chips.uptime",
      "solutions.barbershops.chips.checkout",
      "solutions.barbershops.chips.traps"
    ],
    image: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
  },
  snapshot: [
    { title: t("solutions.barbershops.snapshot.item1.title"), desc: t("solutions.barbershops.snapshot.item1.desc"), color: "text-mint" },
    { title: t("solutions.barbershops.snapshot.item2.title"), desc: t("solutions.barbershops.snapshot.item2.desc"), color: "text-primary" },
    { title: t("solutions.barbershops.snapshot.item3.title"), desc: t("solutions.barbershops.snapshot.item3.desc"), color: "text-accent" },
    { title: t("solutions.barbershops.snapshot.item4.title"), desc: t("solutions.barbershops.snapshot.item4.desc"), color: "text-lavender" },
  ],
  sections: [
    {
      id: "appointments",
      eyebrow: t("solutions.barbershops.sections.appointments.eyebrow"),
      title: t("solutions.barbershops.sections.appointments.title"),
      bullets: [
        t("solutions.barbershops.sections.appointments.bullets.1"),
        t("solutions.barbershops.sections.appointments.bullets.2"),
        t("solutions.barbershops.sections.appointments.bullets.3"),
      ],
      media: { src: "/assets/placeholders/appointments.webp", alt: "Appointments UI" },
    },
    {
      id: "pos",
      eyebrow: t("solutions.barbershops.sections.pos.eyebrow"),
      title: t("solutions.barbershops.sections.pos.title"),
      bullets: [
        t("solutions.barbershops.sections.pos.bullets.1"),
        t("solutions.barbershops.sections.pos.bullets.2"),
        t("solutions.barbershops.sections.pos.bullets.3"),
      ],
      media: { src: "/assets/placeholders/pos.webp", alt: "POS UI" },
      reversed: true,
    },
    {
      id: "marketing",
      eyebrow: t("solutions.barbershops.sections.marketing.eyebrow"),
      title: t("solutions.barbershops.sections.marketing.title"),
      bullets: [
        t("solutions.barbershops.sections.marketing.bullets.1"),
        t("solutions.barbershops.sections.marketing.bullets.2"),
        t("solutions.barbershops.sections.marketing.bullets.3"),
      ],
      media: { src: "/assets/placeholders/marketing.webp", alt: "Marketing UI" },
    },
    {
      id: "booking",
      eyebrow: t("solutions.barbershops.sections.booking.eyebrow"),
      title: t("solutions.barbershops.sections.booking.title"),
      bullets: [
        t("solutions.barbershops.sections.booking.bullets.1"),
        t("solutions.barbershops.sections.booking.bullets.2"),
        t("solutions.barbershops.sections.booking.bullets.3"),
      ],
      media: { src: "/assets/placeholders/website.webp", alt: "Website & booking UI" },
      reversed: true,
    },
    {
      id: "team",
      eyebrow: t("solutions.barbershops.sections.team.eyebrow"),
      title: t("solutions.barbershops.sections.team.title"),
      bullets: [
        t("solutions.barbershops.sections.team.bullets.1"),
        t("solutions.barbershops.sections.team.bullets.2"),
        t("solutions.barbershops.sections.team.bullets.3"),
      ],
      media: { src: "/assets/placeholders/team.webp", alt: "Team & payroll UI" },
    },
  ],
  beforeAfter: [
    { before: t("solutions.barbershops.beforeAfter.item1.before"), after: t("solutions.barbershops.beforeAfter.item1.after") },
    { before: t("solutions.barbershops.beforeAfter.item2.before"), after: t("solutions.barbershops.beforeAfter.item2.after") },
    { before: t("solutions.barbershops.beforeAfter.item3.before"), after: t("solutions.barbershops.beforeAfter.item3.after") },
  ],
  testimonials: [
    { quote: t("solutions.barbershops.testimonials.t1.quote"), author: t("solutions.barbershops.testimonials.t1.author"), rating: 5, stat: t("solutions.barbershops.testimonials.t1.stat") },
    { quote: t("solutions.barbershops.testimonials.t2.quote"), author: t("solutions.barbershops.testimonials.t2.author"), rating: 5 },
  ],
  integrations: [
    { label: "QuickBooks" },
    { label: "Stripe" },
    { label: "Apple Pay" },
    { label: "Google Pay" },
    { label: "Instagram" },
  ],
  pricing: {
    blurb: t("solutions.barbershops.pricing.blurb").replace("{independentPrice}", PRICING.independent.priceDisplay).replace("{independentSeats}", String(PRICING.independent.seats)).replace("{salonPrice}", PRICING.salon.pricePerChairDisplay).replace("{maxBillableChairs}", String(PRICING.salon.maxBillableChairs)),
    sub: t("solutions.barbershops.pricing.sub"),
    cta: { label: t("solutions.barbershops.pricing.ctaLabel"), href: "/pricing" },
  },
  faqs: [
    { q: t("solutions.barbershops.faqs.q1.q"), a: t("solutions.barbershops.faqs.q1.a") },
    { q: t("solutions.barbershops.faqs.q2.q"), a: t("solutions.barbershops.faqs.q2.a") },
  ],
});

export default getBarbershopsConfig;
