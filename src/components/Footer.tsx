import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { OrganizationJsonLd } from '@/lib/seo/jsonld';

const footerLinks = {
  products: [
    { name: 'Appointments', href: '/products/appointments' },
    { name: 'POS & Payments', href: '/products/pos' },
    { name: 'Marketing', href: '/products/marketing' },
    { name: 'Website Builder', href: '/products/website' },
    { name: 'Analytics', href: '/products/analytics' },
  ],
  solutions: [
    { name: 'Salons', href: '/solutions/salons' },
    { name: 'Barbershops', href: '/solutions/barbershops' },
    { name: 'Spas', href: '/solutions/spas' },
    { name: 'Aesthetics', href: '/solutions/aesthetics' },
    { name: 'Nail Salons', href: '/solutions/nails' },
  ],
  company: [
    { name: 'About', href: '/company/about' },
    { name: 'Careers', href: '/company/careers' },
    { name: 'Security', href: '/company/security' },
    { name: 'Contact', href: '/company/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'API Docs', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
  ],
};

export function Footer() {
  return (
    <>
      <OrganizationJsonLd />
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-border/40">
        <div className="container py-16">
          <div className="grid gap-8 lg:grid-cols-6">
            {/* Brand & Newsletter */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
                  <span className="text-lg font-bold text-white">N</span>
                </div>
                <span className="text-xl font-display font-bold text-foreground">NeonO</span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-sm">
                The all-in-one platform for beauty and wellness businesses. 
                Grow faster with smart scheduling, payments, and marketing.
              </p>
              <NewsletterForm variant="footer" className="mb-6" />
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 NeonO. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}