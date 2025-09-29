import { ProductTemplate } from '@/templates/ProductTemplate';
import { Mail, MessageSquare, Star, Users, Zap, Target, TrendingUp, BarChart3 } from 'lucide-react';

export default function Marketing() {
  return (
    <ProductTemplate
      productName="Marketing"
      tagline="Fill your calendar with automated campaigns that actually work"
      description="Stop posting and praying. Send targeted SMS and email campaigns that bring clients back, fill last-minute slots, and turn one-time visitors into regulars—all on autopilot."
      icon={Mail}
      path="/products/marketing"
      seoKeywords="beauty marketing automation, salon email marketing, SMS campaigns, customer retention, review management"
      features={[
        {
          title: 'Automated Campaigns',
          description: 'Set up once, run forever. Birthday offers, win-back campaigns, and re-booking reminders run automatically.',
          icon: Zap,
        },
        {
          title: 'Review Management',
          description: 'Automatically request reviews from happy clients. Respond to feedback and build your online reputation.',
          icon: Star,
        },
        {
          title: 'Customer Segmentation',
          description: 'Group clients by service history, spending, or visit frequency. Send hyper-targeted messages that convert.',
          icon: Target,
        },
        {
          title: 'A/B Testing',
          description: 'Test different messages, timing, and offers. See what works and optimize your campaigns automatically.',
          icon: BarChart3,
        },
        {
          title: 'SMS Marketing',
          description: 'Reach clients instantly with text messages. 98% open rate means your promotions actually get seen.',
          icon: MessageSquare,
        },
        {
          title: 'Referral Programs',
          description: 'Turn clients into brand ambassadors. Track referrals and reward clients who bring new business.',
          icon: Users,
        },
      ]}
      benefits={[
        {
          title: 'Fill last-minute cancellations',
          description: 'Send instant SMS blasts to nearby clients when you have open slots.',
        },
        {
          title: 'Increase rebooking by 65%',
          description: 'Automated reminders bring clients back before they book elsewhere.',
        },
        {
          title: 'Build a 5-star reputation',
          description: 'Smart review requests capture feedback when clients are happiest.',
        },
        {
          title: 'Boost retention by 40%',
          description: 'Win-back campaigns re-engage clients before they\'re lost forever.',
        },
        {
          title: 'Save 15+ hours per week',
          description: 'No more manual posting or campaign management. It all runs automatically.',
        },
        {
          title: 'Measure what works',
          description: 'Track opens, clicks, bookings, and revenue from every campaign.',
        },
      ]}
      screenshots={[
        {
          src: '/src/assets/placeholders/marketing.webp',
          alt: 'Marketing campaign dashboard',
          caption: 'Create and manage campaigns that drive real results',
        },
      ]}
      integrations={[
        { name: 'Mailchimp', logo: 'MC' },
        { name: 'Klaviyo', logo: 'KL' },
        { name: 'Twilio', logo: 'TW' },
        { name: 'Google Reviews', logo: 'GR' },
      ]}
      pricing={{
        startingPrice: '$29/month',
        includedIn: ['Starter', 'Growth', 'Pro'],
      }}
      faqs={[
        {
          q: 'What automated campaigns are included?',
          a: 'Birthday campaigns, win-back campaigns (for clients who haven\'t visited in X days), re-booking reminders, first-visit follow-ups, review requests, and promotional campaigns for slow periods.',
        },
        {
          q: 'How do I collect client emails and phone numbers?',
          a: 'We automatically collect contact info during booking and checkout. You can also import existing client lists or add clients manually.',
        },
        {
          q: 'Can I send to specific groups of clients?',
          a: 'Yes! Segment by service type, visit frequency, lifetime value, location, or any custom criteria. Send highly targeted messages that actually convert.',
        },
        {
          q: 'What\'s the cost of sending SMS?',
          a: 'SMS are billed separately at $0.02 per message (typical US rate). You can set monthly SMS budgets and prioritize high-value clients.',
        },
        {
          q: 'How does review management work?',
          a: 'After appointments, we automatically send review requests via SMS or email. If clients leave positive reviews, we ask them to post on Google or Facebook. Negative feedback goes privately to you first.',
        },
      ]}
      relatedProducts={[
        {
          name: 'Online Booking',
          href: '/products/online-booking',
          description: 'Turn campaign clicks into instant bookings',
        },
        {
          name: 'Analytics',
          href: '/products/analytics',
          description: 'Measure campaign ROI and optimize performance',
        },
        {
          name: 'AI',
          href: '/products/ai',
          description: 'AI-powered campaign optimization and personalization',
        },
      ]}
    />
  );
}
