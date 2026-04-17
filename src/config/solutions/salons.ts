import { BusinessTemplateConfig } from "@/templates/types";
import { PRICING } from "@/config/pricing";

const getSalonsConfig = (t: (key: string) => string): BusinessTemplateConfig => ({
  industry: t("solutions.salons.industry"),
  hero: {
    titleKey: "solutions.salons.hero.title",
    subtitleKey: "solutions.salons.hero.subtitle",
    primaryCtaKey: "solutions.salons.hero.primary",
    secondaryCtaKey: "solutions.salons.hero.secondary",
    primaryHref: "/signup",
    secondaryHref: "/pricing",
    chipsKeys: [
      "solutions.salons.chips.uptime",
      "solutions.salons.chips.checkout",
      "solutions.salons.chips.traps",
      "solutions.salons.chips.colour"
    ],
    image: "https://images.pexels.com/photos/7440054/pexels-photo-7440054.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
  },
  snapshot: [
    { title: t("solutions.salons.snapshot.item1.title"), desc: t("solutions.salons.snapshot.item1.desc"), color: "text-mint" },
    { title: t("solutions.salons.snapshot.item2.title"), desc: t("solutions.salons.snapshot.item2.desc"), color: "text-primary" },
    { title: t("solutions.salons.snapshot.item3.title"), desc: t("solutions.salons.snapshot.item3.desc"), color: "text-accent" },
    { title: t("solutions.salons.snapshot.item4.title"), desc: t("solutions.salons.snapshot.item4.desc"), color: "text-lavender" },
    { title: t("solutions.salons.snapshot.item5.title"), desc: t("solutions.salons.snapshot.item5.desc"), color: "text-mint-dark" },
  ],
  sections: [
    {
      id: "appointments",
      eyebrow: t("solutions.salons.sections.appointments.eyebrow"),
      title: t("solutions.salons.sections.appointments.title"),
      bullets: [
        t("solutions.salons.sections.appointments.bullets.1"),
        t("solutions.salons.sections.appointments.bullets.2"),
        t("solutions.salons.sections.appointments.bullets.3"),
      ],
      media: { src: "/assets/placeholders/appointments.webp", alt: "Appointments UI" },
    },
    {
      id: "pos",
      eyebrow: t("solutions.salons.sections.pos.eyebrow"),
      title: t("solutions.salons.sections.pos.title"),
      bullets: [
        t("solutions.salons.sections.pos.bullets.1"),
        t("solutions.salons.sections.pos.bullets.2"),
        t("solutions.salons.sections.pos.bullets.3"),
      ],
      media: { src: "/assets/placeholders/pos.webp", alt: "POS UI" },
      reversed: true,
    },
    {
      id: "colour",
      eyebrow: t("solutions.salons.sections.colour.eyebrow"),
      title: t("solutions.salons.sections.colour.title"),
      bullets: [
        t("solutions.salons.sections.colour.bullets.1"),
        t("solutions.salons.sections.colour.bullets.2"),
        t("solutions.salons.sections.colour.bullets.3"),
        t("solutions.salons.sections.colour.bullets.4"),
      ],
      media: { src: "/assets/placeholders/colour.webp", alt: "Colour Studio UI" },
    },
    {
      id: "marketing",
      eyebrow: t("solutions.salons.sections.marketing.eyebrow"),
      title: t("solutions.salons.sections.marketing.title"),
      bullets: [
        t("solutions.salons.sections.marketing.bullets.1"),
        t("solutions.salons.sections.marketing.bullets.2"),
        t("solutions.salons.sections.marketing.bullets.3"),
      ],
      media: { src: "/assets/placeholders/marketing.webp", alt: "Marketing UI" },
    },
    {
      id: "booking",
      eyebrow: t("solutions.salons.sections.booking.eyebrow"),
      title: t("solutions.salons.sections.booking.title"),
      bullets: [
        t("solutions.salons.sections.booking.bullets.1"),
        t("solutions.salons.sections.booking.bullets.2"),
        t("solutions.salons.sections.booking.bullets.3"),
      ],
      media: { src: "/assets/placeholders/website.webp", alt: "Website & booking UI" },
      reversed: true,
    },
    {
      id: "team",
      eyebrow: t("solutions.salons.sections.team.eyebrow"),
      title: t("solutions.salons.sections.team.title"),
      bullets: [
        t("solutions.salons.sections.team.bullets.1"),
        t("solutions.salons.sections.team.bullets.2"),
        t("solutions.salons.sections.team.bullets.3"),
      ],
      media: { src: "/assets/placeholders/team.webp", alt: "Team & payroll UI" },
    },
    {
      id: "reports",
      eyebrow: t("solutions.salons.sections.reports.eyebrow"),
      title: t("solutions.salons.sections.reports.title"),
      bullets: [
        t("solutions.salons.sections.reports.bullets.1"),
        t("solutions.salons.sections.reports.bullets.2"),
        t("solutions.salons.sections.reports.bullets.3"),
      ],
      media: { src: "/assets/placeholders/analytics.webp", alt: "Reports & AI UI" },
      reversed: true,
    },
  ],
  beforeAfter: [
    { before: t("solutions.salons.beforeAfter.item1.before"), after: t("solutions.salons.beforeAfter.item1.after") },
    { before: t("solutions.salons.beforeAfter.item2.before"), after: t("solutions.salons.beforeAfter.item2.after") },
    { before: t("solutions.salons.beforeAfter.item3.before"), after: t("solutions.salons.beforeAfter.item3.after") },
    { before: t("solutions.salons.beforeAfter.item4.before"), after: t("solutions.salons.beforeAfter.item4.after") },
  ],
  testimonials: [
    { quote: t("solutions.salons.testimonials.t1.quote"), author: t("solutions.salons.testimonials.t1.author"), rating: 5, stat: t("solutions.salons.testimonials.t1.stat") },
    { quote: t("solutions.salons.testimonials.t2.quote"), author: t("solutions.salons.testimonials.t2.author"), rating: 5 },
    { quote: t("solutions.salons.testimonials.t3.quote"), author: t("solutions.salons.testimonials.t3.author"), rating: 5 },
    { quote: t("solutions.salons.testimonials.t4.quote"), author: t("solutions.salons.testimonials.t4.author"), rating: 5, stat: t("solutions.salons.testimonials.t4.stat") },
  ],
  integrations: [
    { label: "QuickBooks" },
    { label: "Stripe" },
    { label: "Apple Pay" },
    { label: "Google Pay" },
    { label: "Instagram" },
  ],
  pricing: {
    blurb: t("solutions.salons.pricing.blurb").replace("{independentPrice}", PRICING.independent.priceDisplay).replace("{independentSeats}", String(PRICING.independent.seats)).replace("{salonPrice}", PRICING.salon.pricePerChairDisplay).replace("{maxBillableChairs}", String(PRICING.salon.maxBillableChairs)),
    sub: t("solutions.salons.pricing.sub"),
    cta: { label: t("solutions.salons.pricing.ctaLabel"), href: "/pricing" },
  },
  faqs: [
    { q: t("solutions.salons.faqs.q1.q"), a: t("solutions.salons.faqs.q1.a") },
    { q: t("solutions.salons.faqs.q2.q"), a: t("solutions.salons.faqs.q2.a") },
    { q: t("solutions.salons.faqs.q3.q"), a: t("solutions.salons.faqs.q3.a") },
    { q: t("solutions.salons.faqs.q4.q"), a: t("solutions.salons.faqs.q4.a") },
    { q: t("solutions.salons.faqs.q5.q"), a: t("solutions.salons.faqs.q5.a") },
    { q: t("solutions.salons.faqs.q6.q"), a: t("solutions.salons.faqs.q6.a") },
    { q: t("solutions.salons.faqs.q7.q"), a: t("solutions.salons.faqs.q7.a") },
    { q: t("solutions.salons.faqs.q8.q"), a: t("solutions.salons.faqs.q8.a") },
  ],
});

export default getSalonsConfig;
