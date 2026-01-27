import { ProductTemplate } from '@/templates/ProductTemplate';
import { PRICING } from '@/config/pricing';
import { Mail, MessageSquare, Star, Users, Zap, Target, BarChart3, Layout, Share2, MapPin, Sparkles, Instagram, Smartphone } from 'lucide-react';

export default function Marketing() {
  return (
    <ProductTemplate
      productName="Marketing Suite"
      tagline="Email, SMS, Social Media & Google—All in One Platform"
      description="The complete marketing toolkit for salons and barbershops. Visual email builder, bulk SMS campaigns, social media scheduling with AI content generation, Google Business management, and landing page builder—all working together to fill your chair."
      icon={Mail}
      path="/products/marketing"
      seoKeywords="beauty marketing automation, salon email marketing, SMS campaigns, social media management, Google My Business, landing page builder, customer retention, review management"
      sections={[
        {
          id: "email",
          eyebrow: "EMAIL MARKETING",
          title: "Beautiful emails that convert.",
          bullets: [
            "Visual drag-and-drop builder with professional templates.",
            "Automated campaigns: welcome, birthday, winback, post-visit.",
            "A/B testing and performance analytics built in.",
            "Smart audience segmentation and unsubscribe management."
          ],
          media: {
           src: "/src/assets/placeholders/marketing.webp",
           alt: "Email marketing builder"
          }
        },
        {
          id: "sms",
          eyebrow: "SMS CAMPAIGNS",
          title: "98% open rate. Instant results.",
          bullets: [
            "Bulk SMS with personalization tokens for each client.",
            "Two-way conversations—clients can reply directly.",
            "Mobile preview, scheduled sending, and delivery tracking.",
            "Response analytics to measure what works."
          ],
          media: {
           src: "/src/assets/placeholders/marketing.webp",
           alt: "SMS campaign interface"
          }
        },
        {
          id: "social",
          eyebrow: "SOCIAL MEDIA",
          title: "Schedule once. Post everywhere.",
          bullets: [
            "Facebook and Instagram post scheduling in one place.",
            "AI-powered content generation creates posts for you.",
            "Social inbox for messages and comments across platforms.",
            "Multi-location social management and engagement tracking."
          ],
          media: {
           src: "/src/assets/placeholders/marketing.webp",
           alt: "Social media management"
          }
        },
        {
          id: "google",
          eyebrow: "GOOGLE BUSINESS",
          title: "Own your Google presence.",
          bullets: [
            "Manage your Google My Business profile directly.",
            "Monitor and respond to Google reviews instantly.",
            "Schedule posts to your Google Business listing.",
            "Multi-location GBP management from one dashboard."
          ],
          media: {
           src: "/src/assets/placeholders/marketing.webp",
           alt: "Google Business integration"
          }
        },
        {
          id: "landing",
          eyebrow: "LANDING PAGES",
          title: "Build pages that book clients.",
          bullets: [
            "Drag-and-drop builder with professional salon themes.",
            "AI-powered page generation in minutes.",
            "Before/after galleries and service showcases.",
            "Online booking integration and custom domains."
          ],
          media: {
           src: "/src/assets/placeholders/marketing.webp",
           alt: "Landing page builder"
          }
        }
      ]}
      features={[
        {
          title: 'Visual Email Builder',
          description: 'Drag-and-drop editor with professional templates. Create stunning emails without any design skills.',
          icon: Layout,
        },
        {
          title: 'Automated Campaigns',
          description: 'Welcome series, birthday offers, winback campaigns, and post-visit follow-ups run on autopilot.',
          icon: Zap,
        },
        {
          title: 'Bulk SMS Marketing',
          description: 'Reach clients instantly with 98% open rates. Personalization tokens, two-way conversations, and delivery tracking.',
          icon: MessageSquare,
        },
        {
          title: 'Social Scheduling',
          description: 'Schedule posts to Facebook and Instagram. AI generates content ideas and captions for you.',
          icon: Instagram,
        },
        {
          title: 'Google Business Manager',
          description: 'Manage your GBP profile, respond to reviews, and post updates—all from one dashboard.',
          icon: MapPin,
        },
        {
          title: 'AI Content Generation',
          description: 'Let AI write your emails, SMS messages, social posts, and landing page copy. Just review and send.',
          icon: Sparkles,
        },
        {
          title: 'Landing Page Builder',
          description: 'Drag-and-drop pages with salon themes, before/after galleries, and integrated online booking.',
          icon: Smartphone,
        },
        {
          title: 'Review Management',
          description: 'Automatically request reviews from happy clients. Monitor and respond across Google and Facebook.',
          icon: Star,
        },
        {
          title: 'Audience Segmentation',
          description: 'Target by service history, spending, visit frequency, or any custom criteria. Send the right message to the right people.',
          icon: Target,
        },
        {
          title: 'A/B Testing',
          description: 'Test subject lines, content, and timing. See what works and optimize campaigns automatically.',
          icon: BarChart3,
        },
        {
          title: 'Social Inbox',
          description: 'All your Facebook and Instagram messages and comments in one place. Never miss a conversation.',
          icon: Share2,
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
          description: 'AI creates content, campaigns run automatically—you focus on clients.',
        },
        {
          title: 'Dominate local search',
          description: 'Optimized Google Business presence drives new clients to your door.',
        },
        {
          title: 'Convert social followers',
          description: 'Turn Instagram scrollers into paying clients with booking links.',
        },
        {
          title: 'Measure everything',
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
        { name: 'Facebook', logo: 'FB' },
        { name: 'Instagram', logo: 'IG' },
        { name: 'Google', logo: 'GO' },
        { name: 'Mailchimp', logo: 'MC' },
        { name: 'Twilio', logo: 'TW' },
        { name: 'Klaviyo', logo: 'KL' },
      ]}
      pricing={{
        startingPrice: `${PRICING.starter.priceDisplay}/month`,
        includedIn: ['Starter', 'Growth'],
      }}
      faqs={[
        {
          q: 'What automated campaigns are included?',
          a: 'Welcome series for new clients, birthday campaigns, win-back campaigns (for clients who haven\'t visited in X days), post-visit follow-ups, re-booking reminders, review requests, and promotional campaigns for slow periods—all ready to go.',
        },
        {
          q: 'How does AI content generation work?',
          a: 'Just tell AI what you want to promote—it generates email copy, SMS messages, social captions, and landing page text. Review, edit if needed, and publish. It learns your brand voice over time.',
        },
        {
          q: 'Can I manage multiple locations?',
          a: 'Yes! Manage social accounts, Google Business profiles, and campaigns for all your locations from one dashboard. Create location-specific content or share across all.',
        },
        {
          q: 'What\'s the cost of sending SMS?',
          a: 'SMS are billed at $0.02 per message (typical US rate). Set monthly budgets to stay in control. Email, social posting, and Google Business management are unlimited.',
        },
        {
          q: 'Do I need separate tools for each channel?',
          a: 'No! NeonO combines email, SMS, social media, Google Business, and landing pages in one platform. No more juggling multiple logins and subscriptions.',
        },
        {
          q: 'How does the landing page builder work?',
          a: 'Choose a professional salon/barbershop theme, customize with drag-and-drop, add your services and portfolio, connect your booking calendar, and publish to your custom domain—no coding required.',
        },
        {
          q: 'Can clients reply to SMS messages?',
          a: 'Yes! Two-way SMS lets clients reply directly. Their responses appear in your inbox so you can continue the conversation or book them in.',
        },
      ]}
      relatedProducts={[
        {
          name: 'Loyalty & Gift Cards',
          href: '/products/loyalty',
          description: 'Reward repeat clients and boost retention',
        },
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
      ]}
    />
  );
}
