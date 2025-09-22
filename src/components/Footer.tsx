import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { OrganizationJsonLd } from '@/lib/seo/jsonld';
import { useI18n } from '@/hooks/useI18n';

const footerLinks = {
  products: [
    { nameKey: 'footer.appointments', href: '/products/appointments' },
    { nameKey: 'footer.pos', href: '/products/pos' },
    { nameKey: 'footer.marketing', href: '/products/marketing' },
    { nameKey: 'footer.website', href: '/products/website' },
    { nameKey: 'footer.analytics', href: '/products/analytics' },
  ],
  solutions: [
    { nameKey: 'footer.salons', href: '/solutions/salons' },
    { nameKey: 'footer.barbershops', href: '/solutions/barbershops' },
    { nameKey: 'footer.spas', href: '/solutions/spas' },
    { nameKey: 'footer.aesthetics', href: '/solutions/aesthetics' },
    { nameKey: 'footer.nails', href: '/solutions/nails' },
  ],
  company: [
    { nameKey: 'footer.about', href: '/company/about' },
    { nameKey: 'footer.careers', href: '/company/careers' },
    { nameKey: 'footer.security', href: '/company/security' },
    { nameKey: 'footer.contact', href: '/company/contact' },
  ],
  resources: [
    { nameKey: 'footer.blog', href: '/blog' },
    { nameKey: 'footer.help', href: '/help' },
    { nameKey: 'footer.api', href: '/developers' },
    { nameKey: 'footer.status', href: '/status' },
  ],
  legal: [
    { nameKey: 'footer.privacy', href: '/privacy' },
    { nameKey: 'footer.terms', href: '/terms' },
    { nameKey: 'footer.security', href: '/security' },
  ],
};

export function Footer() {
  const { t } = useI18n();
  
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
                {t('footer.description')}
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
            <h3 className="font-semibold mb-4">{t('footer.products')}</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.solutions')}</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.nameKey}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(link.nameKey)}
              </Link>
            ))}
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}