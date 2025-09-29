import { ProductTemplate } from '@/templates/ProductTemplate';
import { Globe, Star, Package, Gift, Share2, TrendingUp, Heart, Award } from 'lucide-react';

export default function OnlineBooking() {
  return (
    <ProductTemplate
      productName="Online Booking"
      tagline="Book while you sleep with 24/7 online scheduling"
      description="Get discovered by new clients through our marketplace and make it effortless for them to book. Accept bookings 24/7, even when you're closed, and grow your business on autopilot."
      icon={Globe}
      path="/products/online-booking"
      seoKeywords="online booking system, beauty marketplace, 24/7 booking, salon booking, automated scheduling"
      features={[
        {
          title: 'Marketplace Listing',
          description: 'Get discovered by thousands of beauty seekers browsing our marketplace. Show up in local search results automatically.',
          icon: Star,
        },
        {
          title: 'Real-Time Booking',
          description: 'Clients see live availability and book instantly. No waiting for confirmation—they get an immediate confirmation.',
          icon: Globe,
        },
        {
          title: 'Service Packages',
          description: 'Create bundled services at discounted rates. Increase your average ticket size with smart package deals.',
          icon: Package,
        },
        {
          title: 'Gift Cards',
          description: 'Sell digital gift cards that clients can purchase and send instantly. Perfect for last-minute gifters.',
          icon: Gift,
        },
        {
          title: 'Social Booking',
          description: 'Add a "Book Now" button to Instagram, Facebook, and TikTok. Turn social followers into paying clients.',
          icon: Share2,
        },
        {
          title: 'Reviews & Ratings',
          description: 'Build trust with verified reviews from real clients. Show off your 5-star reputation to attract new bookings.',
          icon: Award,
        },
      ]}
      benefits={[
        {
          title: 'Book while you sleep',
          description: 'Accept appointments 24/7, even outside business hours and on holidays.',
        },
        {
          title: 'Attract new clients',
          description: 'Get discovered by beauty seekers actively looking for services in your area.',
        },
        {
          title: 'Increase revenue by 40%',
          description: 'More bookings from new clients and higher average tickets with packages.',
        },
        {
          title: 'Reduce phone interruptions',
          description: '80% of clients prefer booking online. Let them self-serve while you focus on service.',
        },
        {
          title: 'Build your brand',
          description: 'Professional booking experience that showcases your business beautifully.',
        },
        {
          title: 'Capture impulse bookings',
          description: 'Make it so easy to book that clients do it on the spot, before they change their mind.',
        },
      ]}
      screenshots={[
        {
          src: '/src/assets/placeholders/website.webp',
          alt: 'Online booking interface showing services',
          caption: 'Beautiful booking experience that works on any device',
        },
      ]}
      integrations={[
        { name: 'Instagram', logo: 'IG' },
        { name: 'Facebook', logo: 'FB' },
        { name: 'Google My Business', logo: 'GB' },
        { name: 'TikTok', logo: 'TT' },
      ]}
      pricing={{
        startingPrice: '$29/month',
        includedIn: ['Starter', 'Growth', 'Pro'],
      }}
      faqs={[
        {
          q: 'How do clients find my business in the marketplace?',
          a: 'Clients search by service type, location, and availability. Your business appears in results based on proximity, ratings, and availability. You can boost visibility with our premium placement options.',
        },
        {
          q: 'Do I pay commission on marketplace bookings?',
          a: 'No! Unlike other platforms, we don\'t take a cut of your bookings. You pay a flat monthly fee and keep 100% of your revenue.',
        },
        {
          q: 'Can I customize my booking page?',
          a: 'Yes! Upload your logo, choose your brand colors, add photos, and write custom service descriptions. Make it uniquely yours.',
        },
        {
          q: 'What if I get booked when I\'m actually unavailable?',
          a: 'You control your availability calendar. Block off time whenever you need. Real-time syncing ensures clients only see genuine availability.',
        },
        {
          q: 'Can I require deposits for online bookings?',
          a: 'Absolutely. Set deposit requirements per service. Clients pay a small deposit to secure their booking, reducing no-shows significantly.',
        },
      ]}
      relatedProducts={[
        {
          name: 'Appointments',
          href: '/products/appointments',
          description: 'Smart scheduling with automated reminders',
        },
        {
          name: 'Landing Page Builder',
          href: '/products/landing-page-builder',
          description: 'Create a stunning website in minutes',
        },
        {
          name: 'Marketing',
          href: '/products/marketing',
          description: 'Drive more bookings with automated campaigns',
        },
      ]}
    />
  );
}
