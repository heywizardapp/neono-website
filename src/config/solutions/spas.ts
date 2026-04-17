import { BusinessTemplateConfig } from "@/templates/types";
import { PRICING } from "@/config/pricing";

const getSpasConfig = (t: (key: string) => string): BusinessTemplateConfig => ({
  industry: t("solutions.spas.industry"),
  hero: {
    titleKey: "solutions.spas.hero.title",
    subtitleKey: "solutions.spas.hero.subtitle",
    primaryCtaKey: "solutions.spas.hero.primary",
    secondaryCtaKey: "solutions.spas.hero.secondary",
    primaryHref: "/signup",
    secondaryHref: "/pricing",
    chipsKeys: [
      "solutions.spas.chips.waitlist",
      "solutions.spas.chips.memberships",
      "solutions.spas.chips.giftcards"
    ],
    image: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
  },
  snapshot: [
    { title: t("solutions.spas.snapshot.item1.title"), desc: t("solutions.spas.snapshot.item1.desc"), color: "text-mint" },
    { title: t("solutions.spas.snapshot.item2.title"), desc: t("solutions.spas.snapshot.item2.desc"), color: "text-primary" },
    { title: t("solutions.spas.snapshot.item3.title"), desc: t("solutions.spas.snapshot.item3.desc"), color: "text-accent" },
    { title: t("solutions.spas.snapshot.item4.title"), desc: t("solutions.spas.snapshot.item4.desc"), color: "text-lavender" },
  ],
  sections: [
    {
      id: "appointments",
      eyebrow: t("solutions.spas.sections.appointments.eyebrow"),
      title: t("solutions.spas.sections.appointments.title"),
      bullets: [
        t("solutions.spas.sections.appointments.bullets.1"),
        t("solutions.spas.sections.appointments.bullets.2"),
        t("solutions.spas.sections.appointments.bullets.3"),
      ],
      media: { src: "/assets/placeholders/appointments.webp", alt: "Appointments UI" },
    },
    {
      id: "pos",
      eyebrow: t("solutions.spas.sections.pos.eyebrow"),
      title: t("solutions.spas.sections.pos.title"),
      bullets: [
        t("solutions.spas.sections.pos.bullets.1"),
        t("solutions.spas.sections.pos.bullets.2"),
        t("solutions.spas.sections.pos.bullets.3"),
      ],
      media: { src: "/assets/placeholders/pos.webp", alt: "POS UI" },
      reversed: true,
    },
    {
      id: "marketing",
      eyebrow: t("solutions.spas.sections.marketing.eyebrow"),
      title: t("solutions.spas.sections.marketing.title"),
      bullets: [
        t("solutions.spas.sections.marketing.bullets.1"),
        t("solutions.spas.sections.marketing.bullets.2"),
        t("solutions.spas.sections.marketing.bullets.3"),
      ],
      media: { src: "/assets/placeholders/marketing.webp", alt: "Marketing UI" },
    },
    {
      id: "booking",
      eyebrow: t("solutions.spas.sections.booking.eyebrow"),
      title: t("solutions.spas.sections.booking.title"),
      bullets: [
        t("solutions.spas.sections.booking.bullets.1"),
        t("solutions.spas.sections.booking.bullets.2"),
        t("solutions.spas.sections.booking.bullets.3"),
      ],
      media: { src: "/assets/placeholders/website.webp", alt: "Website & booking UI" },
      reversed: true,
    },
    {
      id: "team",
      eyebrow: t("solutions.spas.sections.team.eyebrow"),
      title: t("solutions.spas.sections.team.title"),
      bullets: [
        t("solutions.spas.sections.team.bullets.1"),
        t("solutions.spas.sections.team.bullets.2"),
        t("solutions.spas.sections.team.bullets.3"),
      ],
      media: { src: "/assets/placeholders/team.webp", alt: "Team & payroll UI" },
    },
  ],
  beforeAfter: [
    { before: t("solutions.spas.beforeAfter.item1.before"), after: t("solutions.spas.beforeAfter.item1.after") },
    { before: t("solutions.spas.beforeAfter.item2.before"), after: t("solutions.spas.beforeAfter.item2.after") },
    { before: t("solutions.spas.beforeAfter.item3.before"), after: t("solutions.spas.beforeAfter.item3.after") },
  ],
  testimonials: [
    { quote: t("solutions.spas.testimonials.t1.quote"), author: t("solutions.spas.testimonials.t1.author"), rating: 5 },
  ],
  integrations: [
    { label: "QuickBooks" },
    { label: "Stripe" },
    { label: "Apple Pay" },
    { label: "Google Pay" },
    { label: "Instagram" },
  ],
  pricing: {
    blurb: t("solutions.spas.pricing.blurb").replace("{independentPrice}", PRICING.independent.priceDisplay).replace("{independentSeats}", String(PRICING.independent.seats)).replace("{salonPrice}", PRICING.salon.pricePerChairDisplay).replace("{maxBillableChairs}", String(PRICING.salon.maxBillableChairs)),
    sub: t("solutions.spas.pricing.sub"),
    cta: { label: t("solutions.spas.pricing.ctaLabel"), href: "/pricing" },
  },
  faqs: [
    { q: t("solutions.spas.faqs.q1.q"), a: t("solutions.spas.faqs.q1.a") },
    { q: t("solutions.spas.faqs.q2.q"), a: t("solutions.spas.faqs.q2.a") },
  ],
});

export default getSpasConfig;
