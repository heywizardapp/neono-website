import { ProductTemplate } from '@/templates/ProductTemplate';
import { Gift, Star, Award, Trophy, Users, TrendingUp, DollarSign, Sparkles, Target, Crown, Percent, BarChart3 } from 'lucide-react';

export default function Loyalty() {
  return (
    <ProductTemplate
      productName="Loyalty & Gift Cards"
      tagline="Reward Your Best Clients. Grow Repeat Business."
      description="Turn one-time visitors into lifelong clients with a loyalty program that actually works. Points for every purchase, tiered rewards, achievement badges, and digital gift cards—all included free with NeonO. While competitors like Fresha charge $1,000+ per year for loyalty features, ours is built in at no extra cost."
      icon={Gift}
      path="/products/loyalty"
      seoKeywords="salon loyalty program, barbershop rewards, gift cards, client retention, loyalty points, beauty business rewards, free loyalty program"
      sections={[
        {
          id: "earning",
          eyebrow: "EARN POINTS",
          title: "Every visit counts.",
          bullets: [
            "Clients earn points for every dollar spent automatically.",
            "Bonus points for specific services you want to promote.",
            "Referral bonuses when they bring friends.",
            "Birthday and anniversary rewards that delight."
          ],
          media: {
            src: "/src/assets/placeholders/hero-salon.webp",
            alt: "Loyalty points earning"
          }
        },
        {
          id: "rewards",
          eyebrow: "FLEXIBLE REWARDS",
          title: "Rewards they actually want.",
          bullets: [
            "Dollar-off discounts, percentage off, or free services.",
            "Create custom reward tiers (Bronze, Silver, Gold, Platinum).",
            "Instant POS redemption—no awkward fumbling at checkout.",
            "Product rewards to boost retail sales."
          ],
          media: {
            src: "/src/assets/placeholders/hero-salon.webp",
            alt: "Reward redemption"
          }
        },
        {
          id: "gamification",
          eyebrow: "GAMIFICATION",
          title: "Make loyalty fun.",
          bullets: [
            "Achievement badges celebrate milestones and behaviors.",
            "Client tiers with exclusive perks for top members.",
            "Progress tracking shows clients how close they are to rewards.",
            "Leaderboards create friendly competition (optional)."
          ],
          media: {
            src: "/src/assets/placeholders/hero-salon.webp",
            alt: "Gamification features"
          }
        },
        {
          id: "giftcards",
          eyebrow: "DIGITAL GIFT CARDS",
          title: "The gift that fills your chair.",
          bullets: [
            "Beautiful digital gift cards clients can send instantly.",
            "Custom designs with your branding and logo.",
            "Works seamlessly at checkout—no special codes needed.",
            "Track balances, purchases, and redemptions easily."
          ],
          media: {
            src: "/src/assets/placeholders/hero-salon.webp",
            alt: "Digital gift cards"
          }
        },
        {
          id: "comparison",
          eyebrow: "WHY NEONO",
          title: "Free loyalty. Seriously.",
          bullets: [
            "Competitors like Fresha charge $1,000+ per year for loyalty.",
            "Most platforms don't even offer rewards programs.",
            "NeonO includes full loyalty & gift cards in every plan.",
            "No per-transaction fees, no hidden costs, no gotchas."
          ],
          media: {
            src: "/src/assets/placeholders/hero-salon.webp",
            alt: "Cost comparison"
          }
        }
      ]}
      features={[
        {
          title: 'Points Per Dollar',
          description: 'Clients automatically earn points on every purchase. Set your own earning rate to match your margins.',
          icon: DollarSign,
        },
        {
          title: 'Service Bonuses',
          description: 'Offer bonus points on specific services you want to promote. Drive demand for high-margin offerings.',
          icon: Sparkles,
        },
        {
          title: 'Referral Rewards',
          description: 'Reward clients who refer friends. Both referrer and new client get bonus points—everyone wins.',
          icon: Users,
        },
        {
          title: 'Birthday & Anniversary',
          description: 'Automatic rewards on birthdays and client anniversaries. Personal touches that build loyalty.',
          icon: Gift,
        },
        {
          title: 'Customizable Tiers',
          description: 'Create Bronze, Silver, Gold, Platinum tiers with escalating perks. VIPs feel special, spend more.',
          icon: Crown,
        },
        {
          title: 'Flexible Redemption',
          description: 'Offer dollar-off, percentage discounts, free services, or product rewards. Mix and match as you like.',
          icon: Percent,
        },
        {
          title: 'Achievement Badges',
          description: 'Celebrate milestones with collectible badges. "First Visit," "Loyal 10," "Product Pro"—make loyalty fun.',
          icon: Award,
        },
        {
          title: 'Progress Tracking',
          description: 'Clients see exactly how close they are to their next reward. Anticipation drives repeat visits.',
          icon: Target,
        },
        {
          title: 'Digital Gift Cards',
          description: 'Sell beautiful branded gift cards online. Clients send them instantly—perfect for last-minute gifters.',
          icon: Gift,
        },
        {
          title: 'POS Integration',
          description: 'Earn and redeem points right at checkout. No separate apps, no awkward workflows.',
          icon: Star,
        },
        {
          title: 'Leaderboards',
          description: 'Optional leaderboards create friendly competition. Top clients love seeing their VIP status.',
          icon: Trophy,
        },
        {
          title: 'Program Analytics',
          description: 'Track participation, redemption rates, ROI, and member engagement. Know exactly what works.',
          icon: BarChart3,
        },
      ]}
      benefits={[
        {
          title: 'Increase visit frequency by 35%',
          description: 'Clients with points to redeem come back faster and more often.',
        },
        {
          title: 'Boost average ticket by 20%',
          description: 'Earning points encourages clients to add services and products.',
        },
        {
          title: 'Reduce client churn by 50%',
          description: 'Loyalty members are 5x less likely to switch to a competitor.',
        },
        {
          title: 'Generate referral revenue',
          description: 'Happy clients bring friends when there\'s something in it for them.',
        },
        {
          title: 'Sell gift cards 24/7',
          description: 'Digital gift cards sell while you sleep—instant revenue, future bookings.',
        },
        {
          title: 'Save $1,000+ per year',
          description: 'NeonO includes loyalty free. Competitors charge separately—often over $1,000/year.',
        },
        {
          title: 'Differentiate from competitors',
          description: 'Most salons don\'t have loyalty programs. Stand out with rewards that matter.',
        },
        {
          title: 'Create emotional connection',
          description: 'Badges and tiers make clients feel like insiders, not just customers.',
        },
      ]}
      screenshots={[
        {
          src: '/src/assets/placeholders/hero-salon.webp',
          alt: 'Loyalty program dashboard showing member tiers and rewards',
          caption: 'Beautiful dashboard shows program performance at a glance',
        },
      ]}
      integrations={[
        { name: 'Stripe', logo: 'ST' },
        { name: 'Square', logo: 'SQ' },
        { name: 'QuickBooks', logo: 'QB' },
        { name: 'Mailchimp', logo: 'MC' },
      ]}
      pricing={{
        startingPrice: '$0/month',
        includedIn: ['Starter', 'Growth', 'Pro'],
      }}
      faqs={[
        {
          q: 'Is the loyalty program really free?',
          a: 'Yes! Loyalty & Gift Cards are included in all NeonO plans at no extra cost. Unlike Fresha (which charges $1,000+/year) or platforms that don\'t offer loyalty at all, we believe rewards should be standard.',
        },
        {
          q: 'How do clients earn points?',
          a: 'Clients automatically earn points on every purchase—services and products. You set the earning rate (e.g., 1 point per dollar). You can also add bonus points for specific services, referrals, birthdays, and anniversaries.',
        },
        {
          q: 'What rewards can I offer?',
          a: 'Anything you want! Dollar-off discounts ($10 off), percentage discounts (20% off), free services (free blowout), product rewards, or custom perks. Create as many reward options as you like.',
        },
        {
          q: 'How do tiers work?',
          a: 'Create tiers like Bronze (0-500 points), Silver (500-1000), Gold (1000-2500), and Platinum (2500+). Each tier can unlock exclusive perks like priority booking, higher earning rates, or special discounts.',
        },
        {
          q: 'Can clients see their points balance?',
          a: 'Yes! Clients see their balance, tier status, and available rewards in their client portal, on receipts, and via automated balance reminders. Transparency drives engagement.',
        },
        {
          q: 'How do digital gift cards work?',
          a: 'Clients purchase gift cards from your booking site or in-salon. They can send them instantly via email or text. Recipients redeem at checkout—the balance is tracked automatically.',
        },
        {
          q: 'Can I import existing loyalty members?',
          a: 'Absolutely. If you have an existing program, we\'ll help you import member balances and history. No client loses their hard-earned points.',
        },
        {
          q: 'Do points expire?',
          a: 'You control expiration rules. Set points to expire after 12 months of inactivity, or never expire—your choice. We\'ll send automated reminders before expiration.',
        },
      ]}
      relatedProducts={[
        {
          name: 'Marketing Suite',
          href: '/products/marketing',
          description: 'Promote your loyalty program with email & SMS',
        },
        {
          name: 'PoS',
          href: '/products/pos',
          description: 'Seamless points earning and redemption at checkout',
        },
        {
          name: 'Online Booking',
          href: '/products/online-booking',
          description: 'Sell gift cards and show loyalty status online',
        },
      ]}
    />
  );
}
