import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { OrganizationJsonLd } from '@/lib/seo/jsonld';
import { useI18n } from '@/hooks/useI18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const footerLinks = {
  products: [
    { nameKey: 'footer.colourStudio', href: '/products/colour-studio' },
    { nameKey: 'footer.staffManagement', href: '/products/staff-management' },
    { nameKey: 'footer.appointments', href: '/products/appointments' },
    { nameKey: 'footer.onlineBooking', href: '/products/online-booking' },
    { nameKey: 'footer.marketing', href: '/products/marketing' },
    { nameKey: 'footer.ai', href: '/products/ai' },
    { nameKey: 'footer.landingPageBuilder', href: '/products/landing-page-builder' },
    { nameKey: 'footer.analytics', href: '/products/analytics' },
    { nameKey: 'footer.pos', href: '/products/pos' },
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
    { nameKey: 'footer.security', href: '/security' },
    { nameKey: 'footer.contact', href: '/contact' },
  ],
  resources: [
    { nameKey: 'footer.blog', href: '/blog' },
    { nameKey: 'footer.academy', href: '/academy' },
    { nameKey: 'footer.caseStudies', href: '/case-studies/metro-beauty' },
    { nameKey: 'footer.help', href: '/help' },
    { nameKey: 'footer.api', href: '/developers' },
    { nameKey: 'footer.status', href: '/status' },
  ],
  legal: [
    { nameKey: 'footer.privacy', href: '/privacy' },
    { nameKey: 'footer.terms', href: '/terms' },
    { nameKey: 'footer.termsOfService', href: '/terms-of-service' },
    { nameKey: 'footer.security', href: '/security' },
  ],
  comparisons: [
    { nameKey: 'footer.vsFresha', href: '/vs/fresha' },
    { nameKey: 'footer.vsVagaro', href: '/vs/vagaro' },
    { nameKey: 'footer.vsSalonMonster', href: '/vs/salon-monster' },
    { nameKey: 'footer.vsPhorest', href: '/vs/phorest' },
  ],
};

export function Footer() {
  const { t } = useI18n();
  
  return (
    <>
      <OrganizationJsonLd />
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-border/40">
        <div className="container py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
            {/* Brand & Newsletter */}
            <div className="md:col-span-2 lg:col-span-2">
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

            {/* Comparisons */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.comparisons')}</h3>
              <ul className="space-y-3">
                {footerLinks.comparisons.map((link) => (
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

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {t('footer.products')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {footerLinks.products.map((link) => (
                  <DropdownMenuItem key={link.nameKey} asChild>
                    <Link to={link.href} className="cursor-pointer">
                      {t(link.nameKey)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                {t('footer.legal')}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {footerLinks.legal.map((link) => (
                <DropdownMenuItem key={link.nameKey} asChild>
                  <Link to={link.href} className="cursor-pointer">
                    {t(link.nameKey)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}