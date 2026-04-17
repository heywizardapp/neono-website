import { Users, Calendar, Globe, Mail, Sparkles, Smartphone, BarChart3, CreditCard, Palette, LucideIcon } from 'lucide-react';

export interface ProductConfig {
  id: string;
  name: string;
  tagline: string;
  path: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const getProductsConfig = (t: (key: string) => string): Record<string, ProductConfig> => ({
  colourStudio: {
    id: 'colour-studio',
    name: t('products.colourStudio.name'),
    tagline: t('products.colourStudio.tagline'),
    path: '/products/colour-studio',
    icon: Palette,
    color: 'text-mint',
    description: t('products.colourStudio.description'),
  },
  staffManagement: {
    id: 'staff-management',
    name: t('products.staffManagement.name'),
    tagline: t('products.staffManagement.tagline'),
    path: '/products/staff-management',
    icon: Users,
    color: 'text-primary',
    description: t('products.staffManagement.description'),
  },
  appointments: {
    id: 'appointments',
    name: t('products.appointments.name'),
    tagline: t('products.appointments.tagline'),
    path: '/products/appointments',
    icon: Calendar,
    color: 'text-accent',
    description: t('products.appointments.description'),
  },
  onlineBooking: {
    id: 'online-booking',
    name: t('products.onlineBooking.name'),
    tagline: t('products.onlineBooking.tagline'),
    path: '/products/online-booking',
    icon: Globe,
    color: 'text-mint',
    description: t('products.onlineBooking.description'),
  },
  marketing: {
    id: 'marketing',
    name: t('products.marketing.name'),
    tagline: t('products.marketing.tagline'),
    path: '/products/marketing',
    icon: Mail,
    color: 'text-lavender',
    description: t('products.marketing.description'),
  },
  ai: {
    id: 'ai',
    name: t('products.ai.name'),
    tagline: t('products.ai.tagline'),
    path: '/products/ai',
    icon: Sparkles,
    color: 'text-primary',
    description: t('products.ai.description'),
  },
  landingPageBuilder: {
    id: 'landing-page-builder',
    name: t('products.landingPageBuilder.name'),
    tagline: t('products.landingPageBuilder.tagline'),
    path: '/products/landing-page-builder',
    icon: Smartphone,
    color: 'text-accent',
    description: t('products.landingPageBuilder.description'),
  },
  analytics: {
    id: 'analytics',
    name: t('products.analytics.name'),
    tagline: t('products.analytics.tagline'),
    path: '/products/analytics',
    icon: BarChart3,
    color: 'text-mint',
    description: t('products.analytics.description'),
  },
  pos: {
    id: 'pos',
    name: t('products.pos.name'),
    tagline: t('products.pos.tagline'),
    path: '/products/pos',
    icon: CreditCard,
    color: 'text-lavender',
    description: t('products.pos.description'),
  },
});

export const getProductsList = (t: (key: string) => string) => Object.values(getProductsConfig(t));

// Legacy exports for backward compatibility (uses English defaults)
export const productsConfig = getProductsConfig((key: string) => key);
export const productsList = Object.values(productsConfig);
