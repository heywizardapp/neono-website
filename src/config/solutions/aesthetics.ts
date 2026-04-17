import { BusinessTemplateConfig } from "@/templates/types";
import { PRICING } from "@/config/pricing";

const getAestheticsConfig = (t: (key: string) => string): BusinessTemplateConfig => ({
  industry: t("solutions.aesthetics.industry"),
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
    image: "https://images.pexels.com/photos/4586741/pexels-photo-4586741.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
  },
  snapshot: [
    { title: t("solutions.aesthetics.snapshot.item1.title"), desc: t("solutions.aesthetics.snapshot.item1.desc"), color: "text-mint" },
    { title: t("solutions.aesthetics.snapshot.item2.title"), desc: t("solutions.aesthetics.snapshot.item2.desc"), color: "text-primary" },
    { title: t("solutions.aesthetics.snapshot.item3.title"), desc: t("solutions.aesthetics.snapshot.item3.desc"), color: "text-accent" },
    { title: t("solutions.aesthetics.snapshot.item4.title"), desc: t("solutions.aesthetics.snapshot.item4.desc"), color: "text-lavender" },
  ],
  sections: [
    {
      id: "appointments",
      eyebrow: t("solutions.aesthetics.sections.appointments.eyebrow"),
      title: t("solutions.aesthetics.sections.appointments.title"),
      bullets: [
        t("solutions.aesthetics.sections.appointments.bullets.1"),
        t("solutions.aesthetics.sections.appointments.bullets.2"),
        t("solutions.aesthetics.sections.appointments.bullets.3"),
      ],
      media: { src: "/assets/placeholders/appointments.webp", alt: "Appointments UI" },
    },
    {
      id: "pos",
      eyebrow: t("solutions.aesthetics.sections.pos.eyebrow"),
      title: t("solutions.aesthetics.sections.pos.title"),
      bullets: [
        t("solutions.aesthetics.sections.pos.bullets.1"),
        t("solutions.aesthetics.sections.pos.bullets.2"),
        t("solutions.aesthetics.sections.pos.bullets.3"),
      ],
      media: { src: "/assets/placeholders/pos.webp", alt: "POS UI" },
      reversed: true,
    },
    {
      id: "marketing",
      eyebrow: t("solutions.aesthetics.sections.marketing.eyebrow"),
      title: t("solutions.aesthetics.sections.marketing.title"),
      bullets: [
        t("solutions.aesthetics.sections.marketing.bullets.1"),
        t("solutions.aesthetics.sections.marketing.bullets.2"),
        t("solutions.aesthetics.sections.marketing.bullets.3"),
      ],
      media: { src: "/assets/placeholders/marketing.webp", alt: "Marketing UI" },
    },
    {
      id: "booking",
      eyebrow: t("solutions.aesthetics.sections.booking.eyebrow"),
      title: t("solutions.aesthetics.sections.booking.title"),
      bullets: [
        t("solutions.aesthetics.sections.booking.bullets.1"),
        t("solutions.aesthetics.sections.booking.bullets.2"),
        t("solutions.aesthetics.sections.booking.bullets.3"),
      ],
      media: { src: "/assets/placeholders/website.webp", alt: "Website & booking UI" },
      reversed: true,
    },
    {
      id: "team",
      eyebrow: t("solutions.aesthetics.sections.team.eyebrow"),
      title: t("solutions.aesthetics.sections.team.title"),
      bullets: [
        t("solutions.aesthetics.sections.team.bullets.1"),
        t("solutions.aesthetics.sections.team.bullets.2"),
        t("solutions.aesthetics.sections.team.bullets.3"),
      ],
      media: { src: "/assets/placeholders/team.webp", alt: "Team & payroll UI" },
    },
  ],
  beforeAfter: [
    { before: t("solutions.aesthetics.beforeAfter.item1.before"), after: t("solutions.aesthetics.beforeAfter.item1.after") },
    { before: t("solutions.aesthetics.beforeAfter.item2.before"), after: t("solutions.aesthetics.beforeAfter.item2.after") },
    { before: t("solutions.aesthetics.beforeAfter.item3.before"), after: t("solutions.aesthetics.beforeAfter.item3.after") },
  ],
  testimonials: [
    { quote: t("solutions.aesthetics.testimonials.t1.quote"), author: t("solutions.aesthetics.testimonials.t1.author"), rating: 5 },
  ],
  integrations: [
    { label: "QuickBooks" },
    { label: "Stripe" },
    { label: "Apple Pay" },
    { label: "Google Pay" },
    { label: "Instagram" },
  ],
  pricing: {
    blurb: t("solutions.aesthetics.pricing.blurb").replace("{independentPrice}", PRICING.independent.priceDisplay).replace("{independentSeats}", String(PRICING.independent.seats)).replace("{salonPrice}", PRICING.salon.pricePerChairDisplay).replace("{maxBillableChairs}", String(PRICING.salon.maxBillableChairs)),
    sub: t("solutions.aesthetics.pricing.sub"),
    cta: { label: t("solutions.aesthetics.pricing.ctaLabel"), href: "/pricing" },
  },
  faqs: [
    { q: t("solutions.aesthetics.faqs.q1.q"), a: t("solutions.aesthetics.faqs.q1.a") },
    { q: t("solutions.aesthetics.faqs.q2.q"), a: t("solutions.aesthetics.faqs.q2.a") },
  ],
});

export default getAestheticsConfig;
