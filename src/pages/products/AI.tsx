import { ProductTemplate } from '@/templates/ProductTemplate';
import { Sparkles, Brain, TrendingUp, MessageSquare, Calendar, DollarSign, Lightbulb, Zap } from 'lucide-react';

export default function AI() {
  return (
    <ProductTemplate
      productName="AI"
      tagline="Work smarter with AI that understands your business"
      description="Let artificial intelligence handle the busy work. From smart scheduling to revenue forecasting, our AI learns your business patterns and makes intelligent recommendations that grow your bottom line."
      icon={Sparkles}
      path="/products/ai"
      seoKeywords="AI salon software, predictive analytics, smart scheduling, AI automation, business intelligence"
      features={[
        {
          title: 'Smart Scheduling',
          description: 'AI suggests optimal appointment times based on staff skills, client preferences, and historical patterns.',
          icon: Calendar,
        },
        {
          title: 'Predictive Analytics',
          description: 'Forecast revenue, predict busy periods, and identify trends before they happen. Plan with confidence.',
          icon: Brain,
        },
        {
          title: 'Automated Responses',
          description: 'AI handles common client questions via SMS and email. Instant responses, even at 2 AM.',
          icon: MessageSquare,
        },
        {
          title: 'Revenue Forecasting',
          description: 'Predict next month\'s revenue based on bookings, seasonality, and historical data. Make smarter decisions.',
          icon: DollarSign,
        },
        {
          title: 'Smart Recommendations',
          description: 'AI suggests which services to promote, when to offer discounts, and how to maximize each appointment.',
          icon: Lightbulb,
        },
        {
          title: 'Dynamic Pricing',
          description: 'Optimize pricing for peak vs. off-peak hours. Fill slow periods and maximize revenue during high demand.',
          icon: TrendingUp,
        },
      ]}
      benefits={[
        {
          title: 'Increase revenue by 25%',
          description: 'AI-optimized scheduling and pricing maximize earnings from every time slot.',
        },
        {
          title: 'Save 20+ hours per week',
          description: 'Automated responses, smart scheduling, and intelligent recommendations reduce admin work.',
        },
        {
          title: 'Reduce no-shows by 50%',
          description: 'AI predicts which clients are likely to no-show and sends personalized reminders.',
        },
        {
          title: 'Optimize staff schedules',
          description: 'Match the right staff to the right clients based on skills, preferences, and performance.',
        },
        {
          title: 'Make data-driven decisions',
          description: 'Stop guessing. AI analyzes millions of data points to tell you what actually works.',
        },
        {
          title: 'Stay ahead of trends',
          description: 'Spot emerging service demands and client preferences before your competition.',
        },
      ]}
      integrations={[
        { name: 'OpenAI', logo: 'AI' },
        { name: 'TensorFlow', logo: 'TF' },
        { name: 'Analytics', logo: 'AN' },
        { name: 'Stripe', logo: 'ST' },
      ]}
      pricing={{
        startingPrice: '$59/month',
        includedIn: ['Growth', 'Pro'],
      }}
      faqs={[
        {
          q: 'Do I need to know anything about AI to use this?',
          a: 'Nope! AI features work automatically in the background. You just see helpful suggestions and better results—no technical knowledge required.',
        },
        {
          q: 'How accurate are the revenue forecasts?',
          a: 'Our AI achieves 90%+ accuracy after analyzing 3 months of your business data. Accuracy improves over time as it learns your patterns.',
        },
        {
          q: 'Can AI really respond to client messages?',
          a: 'Yes! AI handles common questions like "What are your hours?" or "Do you offer color services?" Complex questions are escalated to your team with suggested responses.',
        },
        {
          q: 'What if AI makes a bad recommendation?',
          a: 'All AI suggestions are just that—suggestions. You always have final approval. Over time, AI learns from your decisions and gets smarter.',
        },
        {
          q: 'Is my business data used to train AI for others?',
          a: 'No. Your data is private and only used to improve AI for your business. We never share client data or business insights with competitors.',
        },
      ]}
      relatedProducts={[
        {
          name: 'Analytics',
          href: '/products/analytics',
          description: 'Deep business insights powered by real-time data',
        },
        {
          name: 'Marketing',
          href: '/products/marketing',
          description: 'AI-optimized campaigns that convert',
        },
        {
          name: 'Appointments',
          href: '/products/appointments',
          description: 'Smart scheduling that maximizes revenue',
        },
      ]}
    />
  );
}
