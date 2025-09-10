import BusinessTemplate, { BusinessTemplateConfig } from '@/templates/BusinessTemplate';
import { 
  Calendar, 
  CreditCard, 
  Mail, 
  Globe, 
  Users, 
  BarChart3,
  CheckCircle,
  MessageSquare,
  Smartphone,
  Clock
} from 'lucide-react';

const salonsConfig: BusinessTemplateConfig = {
  industry: "Salons",
  hero: {
    title: "Run your salon on one platform.",
    subtitle: "Appointments, POS, marketing, website, and AI—built in. Faster checkouts, fewer no-shows, happier clients.",
    primaryCta: { label: "Start free trial", href: "/signup" },
    secondaryCta: { label: "See pricing", href: "/pricing" },
    chips: ["99.9% uptime", "2-tap checkout", "No add-on traps"]
  },
  valueSnapshot: [
    {
      icon: CheckCircle,
      title: "Cut no-shows",
      description: "Automatic SMS/email reminders and confirmations.",
      color: "text-mint"
    },
    {
      icon: Clock,
      title: "Fill slow hours",
      description: "Win-back and gap-filler campaigns.",
      color: "text-primary"
    },
    {
      icon: CreditCard,
      title: "Fast checkout",
      description: "Tap to pay, split tips, instant payouts.",
      color: "text-accent"
    },
    {
      icon: Globe,
      title: "Free website",
      description: "Clean booking page + link-in-bio included.",
      color: "text-lavender"
    }
  ],
  sections: [
    {
      id: "appointments",
      title: "A calendar designed for stylists.",
      bullets: [
        "Chair & room views with quick drag-and-drop.",
        "Walk-ins, waitlist, and rebook in two taps.",
        "Service menus per stylist with timing & resources."
      ]
    },
    {
      id: "pos",
      title: "Faster checkout, zero fuss.",
      bullets: [
        "Tap, chip, or phone—no tip commission.",
        "Split bills & tips across services and retail.",
        "Instant payouts optional; clear rates."
      ]
    },
    {
      id: "marketing",
      title: "Keep your calendar full.",
      bullets: [
        "SMS/email campaigns that rebook clients automatically.",
        "Review invites after checkout boost ratings.",
        "Promo codes and bundles for quiet times."
      ]
    },
    {
      id: "booking",
      title: "Be bookable everywhere.",
      bullets: [
        "Free website & link-in-bio with \"Book now\".",
        "Google & Instagram links drive direct bookings.",
        "Mobile-first flows that clients love."
      ]
    },
    {
      id: "team",
      title: "Built for owners and teams.",
      bullets: [
        "Roles and permissions for owners, managers, stylists.",
        "Flexible commission rules by service or retail.",
        "Timesheets export and quick staff onboarding."
      ]
    },
    {
      id: "reports",
      title: "Insights you'll actually use.",
      bullets: [
        "Daily sales, utilization, retention, and product mix.",
        "AI spots gaps and suggests promos.",
        "Role-gated dashboards for owners and team leads."
      ]
    }
  ],
  beforeAfter: {
    items: [
      {
        before: "Manual reminders and constant no-shows",
        after: "Automated SMS confirmations cut no-shows by 30%"
      },
      {
        before: "End-of-day tallies and delayed reporting",
        after: "Instant reports and same-day payouts"
      },
      {
        before: "Empty weekday afternoons hurt revenue",
        after: "Smart promos automatically fill the gaps"
      }
    ]
  },
  testimonials: {
    items: [
      {
        quote: "We rebook faster, and checkout takes seconds.",
        author: "Sarah Johnson",
        business: "Amber & Co. Salon",
        rating: 5
      },
      {
        quote: "Reminders cut our no-shows by a third.",
        author: "Michael Chen",
        business: "Harbor Hair Studio", 
        rating: 5
      },
      {
        quote: "Website + link-in-bio booked our new stylists day one.",
        author: "Emma Rodriguez",
        business: "North & Pine",
        rating: 5
      }
    ]
  },
  integrations: {
    items: [
      { name: "QuickBooks" },
      { name: "Stripe" },
      { name: "Square" },
      { name: "Google Pay" },
      { name: "Apple Pay" },
      { name: "Instagram" },
      { name: "Facebook" },
      { name: "Mailchimp" }
    ]
  },
  pricing: {
    plans: "Starter $29/mo (2 seats) • Growth $59/mo (5 seats) • +$9.99/seat",
    features: "SMS, website, online cart, QuickBooks sync, and AI are included."
  },
  faq: {
    items: [
      {
        question: "Can I migrate from my current system?",
        answer: "Yes—import clients, services, and appointments with our guided steps."
      },
      {
        question: "Do I need hardware?",
        answer: "You can start without it; add a reader later."
      },
      {
        question: "Can staff share a device?",
        answer: "Yes—multi-user POS with role-based permissions."
      },
      {
        question: "Are SMS and the website extra?",
        answer: "No—both are included."
      },
      {
        question: "How do I handle tips and commissions?",
        answer: "Split tips and set commission rules per service or retail."
      },
      {
        question: "Do you support barbershops and spas too?",
        answer: "Yes—this template adapts to your business type."
      }
    ]
  },
  finalCta: {
    title: "Ready to transform your salon?",
    subtitle: "Join thousands of salon owners who've streamlined their business with NeonO.",
    primaryCta: { label: "Start free trial", href: "/signup" },
    secondaryCta: { label: "Book a demo", href: "/demo" }
  }
};

export default function SalonsPage() {
  return <BusinessTemplate config={salonsConfig} />;
}