import { ProductTemplate } from '@/templates/ProductTemplate';
import { CreditCard, Zap, DollarSign, Users, Package, Smartphone, Receipt, TrendingUp } from 'lucide-react';

export default function Pos() {
  return (
    <ProductTemplate
      productName="PoS"
      tagline="Lightning-fast checkout with fair tips and instant payouts"
      description="Check out clients in seconds with contactless payments, split tips fairly across your team, and get your money the same day—all with no hidden fees or surprise charges."
      icon={CreditCard}
      path="/products/pos"
      seoKeywords="point of sale, salon POS, beauty payment processing, contactless payments, tip splitting"
      features={[
        {
          title: 'Contactless Payments',
          description: 'Accept tap-to-pay, chip cards, mobile wallets, and traditional swipes. Every payment method your clients want.',
          icon: Smartphone,
        },
        {
          title: 'Tip Splitting',
          description: 'Automatically split tips based on custom rules. Fair distribution across assistants, stylists, and support staff.',
          icon: Users,
        },
        {
          title: 'Same-Day Payouts',
          description: 'Get your money deposited the same day. No more waiting 2-3 business days for funds to clear.',
          icon: Zap,
        },
        {
          title: 'Inventory Tracking',
          description: 'Track product sales and stock levels in real-time. Get alerts when inventory runs low.',
          icon: Package,
        },
        {
          title: 'Digital Receipts',
          description: 'Email or text receipts instantly. Save paper, reduce waste, and keep clients informed.',
          icon: Receipt,
        },
        {
          title: 'Upsell Prompts',
          description: 'See smart suggestions for products or services to recommend based on what the client just purchased.',
          icon: TrendingUp,
        },
      ]}
      benefits={[
        {
          title: 'Check out in under 30 seconds',
          description: 'Fast payments mean shorter wait times and happier clients.',
        },
        {
          title: 'Increase tip amounts by 25%',
          description: 'Digital tip prompts with suggested amounts result in higher tips.',
        },
        {
          title: 'Fair tip distribution',
          description: 'Eliminate tip disputes with transparent, automated splitting.',
        },
        {
          title: 'Boost product sales by 35%',
          description: 'Smart upsell suggestions help staff recommend the right products.',
        },
        {
          title: 'Improve cash flow',
          description: 'Same-day payouts mean money in your account faster.',
        },
        {
          title: 'Reduce fraud risk',
          description: 'Bank-level security and encrypted transactions protect your business.',
        },
      ]}
      screenshots={[
        {
          src: '/src/assets/placeholders/pos.webp',
          alt: 'Point of sale checkout interface',
          caption: 'Fast, beautiful checkout that works on any device',
        },
      ]}
      integrations={[
        { name: 'Stripe', logo: 'ST' },
        { name: 'Square', logo: 'SQ' },
        { name: 'QuickBooks', logo: 'QB' },
        { name: 'Xero', logo: 'XE' },
      ]}
      pricing={{
        startingPrice: '$29/month',
        includedIn: ['Starter', 'Growth', 'Pro'],
      }}
      faqs={[
        {
          q: 'What\'s your processing rate?',
          a: 'We charge 2.6% + $0.10 per transaction for card payments. No monthly fees, setup fees, or hidden charges. That\'s it.',
        },
        {
          q: 'Do you take a cut of tips?',
          a: 'Never! Unlike other platforms, we don\'t touch tips. 100% of tips go to your team. We believe tips belong to the people who earned them.',
        },
        {
          q: 'How does tip splitting work?',
          a: 'You set up custom rules (like 70% to stylist, 20% to assistant, 10% to front desk). Tips are automatically split according to your rules at checkout.',
        },
        {
          q: 'Can I accept cash payments?',
          a: 'Yes! Track cash payments alongside card payments. All transactions sync to your accounting software automatically.',
        },
        {
          q: 'What if a client disputes a charge?',
          a: 'We handle all disputes on your behalf. You\'ll be notified if a dispute occurs, and we provide evidence (appointment records, signed receipts) to protect you.',
        },
      ]}
      relatedProducts={[
        {
          name: 'Staff Management',
          href: '/products/staff-management',
          description: 'Track commissions and team earnings',
        },
        {
          name: 'Analytics',
          href: '/products/analytics',
          description: 'Monitor revenue and product sales',
        },
        {
          name: 'Appointments',
          href: '/products/appointments',
          description: 'Seamless checkout after appointments',
        },
      ]}
    />
  );
}
