import { ProductTemplate } from '@/templates/ProductTemplate';
import { BarChart3, TrendingUp, Users, DollarSign, Download, PieChart, Activity, Target } from 'lucide-react';
import { PRICING } from '@/config/pricing';

export default function Analytics() {
  return (
    <ProductTemplate
      productName="Analytics"
      tagline="Market Intelligence, Website Analytics & Schedule Insights"
      description="Go beyond basic reports with market intelligence, website analytics, and schedule analytics. Understand your market, track your online presence, and optimize your operations with data-driven insights."
      icon={BarChart3}
      path="/products/analytics"
      seoKeywords="business analytics, salon reports, beauty business insights, revenue tracking, performance dashboard"
      sections={[
        {
          id: "insights",
          eyebrow: "MARKET INTELLIGENCE",
          title: "Know your numbers.",
          bullets: [
            "Track revenue by service, staff, location, or time.",
            "Monitor today's bookings and revenue in real-time.",
            "Identify your most profitable offerings instantly."
          ],
          media: {
            src: "/src/assets/placeholders/hero-salon.webp",
            alt: "Analytics dashboard"
          }
        },
        {
          id: "staff",
          eyebrow: "TEAM PERFORMANCE",
          title: "Optimize your operations.",
          bullets: [
            "See which team members drive the most revenue.",
            "Track retention rates and review scores by stylist.",
            "Set revenue goals and track progress automatically."
          ],
          media: {
            src: "/src/assets/placeholders/hero-salon.webp",
            alt: "Staff analytics"
          }
        },
        {
          id: "reporting",
          eyebrow: "REPORTING",
          title: "Reports your way.",
          bullets: [
            "Build custom reports tailored to your business.",
            "Export to Excel, PDF, or CSV with one click.",
            "Schedule automatic report delivery to your inbox."
          ],
          media: {
            src: "/src/assets/placeholders/hero-salon.webp",
            alt: "Custom reporting"
          }
        }
      ]}
      features={[
        {
          title: 'Revenue Analytics',
          description: 'Track revenue by service, staff member, location, or time period. Identify your most profitable offerings instantly.',
          icon: DollarSign,
        },
        {
          title: 'Staff Performance',
          description: 'See which team members drive the most revenue, get the best reviews, and retain clients. Reward top performers.',
          icon: Users,
        },
        {
          title: 'Custom Reports',
          description: 'Build reports tailored to your business. Save favorites and schedule automatic delivery to your inbox.',
          icon: PieChart,
        },
        {
          title: 'Export Capabilities',
          description: 'Export any report to Excel, PDF, or CSV. Share with accountants, investors, or team members with one click.',
          icon: Download,
        },
        {
          title: 'Real-Time Dashboard',
          description: 'Monitor today\'s bookings, revenue, and client activity in real-time. Spot issues and opportunities instantly.',
          icon: Activity,
        },
        {
          title: 'Goal Tracking',
          description: 'Set revenue goals and track progress. See at-a-glance if you\'re on track to hit monthly and yearly targets.',
          icon: Target,
        },
      ]}
      benefits={[
        {
          title: 'Identify your best services',
          description: 'See which services drive the most revenue and book most often. Double down on what works.',
        },
        {
          title: 'Optimize staffing',
          description: 'Know exactly when you need more staff and when you\'re overstaffed. Reduce labor costs by 15%.',
        },
        {
          title: 'Increase client retention',
          description: 'Spot clients at risk of churning. Reach out before they book elsewhere.',
        },
        {
          title: 'Make confident decisions',
          description: 'Every business decision backed by real data, not gut feelings.',
        },
        {
          title: 'Save time on reporting',
          description: 'Automated reports mean no more spreadsheet wrestling. Get insights in seconds, not hours.',
        },
        {
          title: 'Spot trends early',
          description: 'See what\'s working before your competition. Stay ahead of market changes.',
        },
      ]}
      integrations={[
        { name: 'QuickBooks', logo: 'QB' },
        { name: 'Excel', logo: 'EX' },
        { name: 'Google Sheets', logo: 'GS' },
        { name: 'Tableau', logo: 'TB' },
      ]}
      pricing={{
        startingPrice: `${PRICING.independent.priceDisplay}/month`,
        includedIn: ['Independent', 'Salon'],
      }}
      faqs={[
        {
          q: 'What metrics can I track?',
          a: 'Revenue, bookings, client retention, staff performance, service popularity, average ticket size, client lifetime value, busy hours, cancellation rates, review scores, and 50+ other metrics.',
        },
        {
          q: 'Can I give my accountant access to reports?',
          a: 'Yes! Create view-only accounts for accountants, business partners, or investors. They see reports but can\'t access client data or make changes.',
        },
        {
          q: 'How far back does data go?',
          a: 'We store all your data forever. View trends from last week, last year, or since you started using NeonO. Compare any time period to any other.',
        },
        {
          q: 'Can I compare locations?',
          a: 'Absolutely. If you have multiple locations, compare performance side-by-side. See which location needs attention and which is crushing it.',
        },
        {
          q: 'Do I need to be a data person to understand the reports?',
          a: 'Nope! All reports use simple language and visual charts. Hover over any metric for a plain-English explanation of what it means and why it matters.',
        },
      ]}
      relatedProducts={[
        {
          name: 'AI',
          href: '/products/ai',
          description: 'AI-powered predictions and smart recommendations',
        },
        {
          name: 'Staff Management',
          href: '/products/staff-management',
          description: 'Track and optimize team performance',
        },
        {
          name: 'Marketing',
          href: '/products/marketing',
          description: 'Measure campaign ROI and optimize spending',
        },
      ]}
    />
  );
}
