import { ProductTemplate } from '@/templates/ProductTemplate';
import { Smartphone, Layout, Share2, Search, Palette, Zap, Image, Link2 } from 'lucide-react';
import { PRICING } from '@/config/pricing';

export default function LandingPageBuilder() {
  return (
    <ProductTemplate
      productName="Landing Page Builder"
      tagline="Theme System, AI Page Generator & Link-in-Bio"
      description="Create stunning landing pages with our theme system, generate pages instantly with AI, and build a professional link-in-bio. No designers needed—just beautiful pages that convert visitors into bookings."
      icon={Smartphone}
      path="/products/landing-page-builder"
      seoKeywords="website builder, link in bio, salon website, beauty website builder, no code website"
      sections={[
        {
          id: "design",
          eyebrow: "NO-CODE DESIGN",
          title: "Build without boundaries.",
          bullets: [
            "Drag & drop builder—no coding or designers needed.",
            "Upload your logo, colors, and fonts for custom branding.",
            "Create stunning landing pages in minutes."
          ],
          media: {
           src: "/src/assets/placeholders/website.webp",
           alt: "Website builder"
          }
        },
        {
          id: "performance",
          eyebrow: "PERFORMANCE",
          title: "Fast, mobile, and found.",
          bullets: [
            "Every page looks perfect on any device automatically.",
            "Built-in SEO helps you rank on Google search.",
            "Lightning fast loading speeds keep visitors engaged."
          ],
          media: {
           src: "/src/assets/placeholders/website.webp",
           alt: "Mobile responsiveness"
          }
        },
        {
          id: "social",
          eyebrow: "SOCIAL INTEGRATION",
          title: "Connect your world.",
          bullets: [
            "Embed Instagram feeds and 'Book Now' buttons.",
            "Showcase your portfolio directly from social media.",
            "Create a professional link-in-bio for your profiles."
          ],
          media: {
           src: "/src/assets/placeholders/website.webp",
           alt: "Social integration"
          }
        }
      ]}
      features={[
        {
          title: 'Drag & Drop Builder',
          description: 'Build your dream website by dragging and dropping elements. No coding, no complexity—just beautiful results.',
          icon: Layout,
        },
        {
          title: 'Mobile Optimized',
          description: 'Every page looks perfect on phones, tablets, and desktops. Your site adapts automatically to any screen size.',
          icon: Smartphone,
        },
        {
          title: 'SEO Ready',
          description: 'Built-in SEO optimization helps you rank on Google. Show up when people search for services in your area.',
          icon: Search,
        },
        {
          title: 'Social Integration',
          description: 'Embed Instagram feeds, add "Book Now" buttons, and showcase your work directly from social media.',
          icon: Share2,
        },
        {
          title: 'Custom Branding',
          description: 'Upload your logo, choose brand colors, and pick fonts. Make every page uniquely yours.',
          icon: Palette,
        },
        {
          title: 'Lightning Fast',
          description: 'Your site loads in under 2 seconds. Fast loading means better Google rankings and happier visitors.',
          icon: Zap,
        },
      ]}
      benefits={[
        {
          title: 'Launch in under 30 minutes',
          description: 'Choose a template, add your content, and go live. It\'s that simple.',
        },
        {
          title: 'Increase bookings by 50%',
          description: 'A professional online presence converts more browsers into bookers.',
        },
        {
          title: 'Save $3,000+ per year',
          description: 'No need for expensive web designers or developers. Update your site yourself anytime.',
        },
        {
          title: 'Showcase your best work',
          description: 'Beautiful galleries highlight your portfolio and attract ideal clients.',
        },
        {
          title: 'Capture leads 24/7',
          description: 'Booking buttons and contact forms work around the clock to grow your business.',
        },
        {
          title: 'Own your online presence',
          description: 'Stop relying solely on social media. Build an asset you actually own.',
        },
      ]}
      screenshots={[
        {
          src: '/src/assets/placeholders/website.webp',
          alt: 'Website builder interface',
          caption: 'Drag-and-drop editor makes building websites effortless',
        },
      ]}
      integrations={[
        { name: 'Instagram', logo: 'IG' },
        { name: 'Facebook', logo: 'FB' },
        { name: 'TikTok', logo: 'TT' },
        { name: 'Pinterest', logo: 'PI' },
      ]}
      pricing={{
        startingPrice: `${PRICING.independent.priceDisplay}/month`,
        includedIn: ['Independent', 'Salon'],
      }}
      faqs={[
        {
          q: 'Do I need design or coding skills?',
          a: 'Not at all! Our drag-and-drop builder is designed for anyone to use. If you can use Instagram, you can build a website with NeonO.',
        },
        {
          q: 'Can I use my own domain name?',
          a: 'Yes! Connect your existing domain (like yourname.com) or purchase a new one through us. We\'ll handle all the technical setup.',
        },
        {
          q: 'What\'s the difference between a website and link-in-bio?',
          a: 'Link-in-bio is a single-page landing page perfect for Instagram bios. It lists all your important links. A full website has multiple pages and is better for Google search.',
        },
        {
          q: 'Can I add my own photos and videos?',
          a: 'Absolutely! Upload unlimited photos and videos. Show off your best work to attract your dream clients.',
        },
        {
          q: 'Will my site show up on Google?',
          a: 'Yes! All NeonO sites are optimized for search engines. You\'ll show up when people search for services like yours in your area. Pro tip: Add location-specific keywords to rank even higher.',
        },
      ]}
      relatedProducts={[
        {
          name: 'Online Booking',
          href: '/products/online-booking',
          description: 'Accept bookings 24/7 from your website',
        },
        {
          name: 'Marketing',
          href: '/products/marketing',
          description: 'Drive traffic to your site with automated campaigns',
        },
        {
          name: 'Analytics',
          href: '/products/analytics',
          description: 'Track website visitors and conversion rates',
        },
      ]}
    />
  );
}
