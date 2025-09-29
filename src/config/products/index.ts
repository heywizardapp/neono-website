import { Users, Calendar, Globe, Mail, Sparkles, Smartphone, BarChart3, CreditCard, LucideIcon } from 'lucide-react';

export interface ProductConfig {
  id: string;
  name: string;
  tagline: string;
  path: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const productsConfig: Record<string, ProductConfig> = {
  staffManagement: {
    id: 'staff-management',
    name: 'Staff Management',
    tagline: 'Empower your team with smart scheduling and performance tracking',
    path: '/products/staff-management',
    icon: Users,
    color: 'text-primary',
    description: 'Manage schedules, permissions, commissions, and team performance.',
  },
  appointments: {
    id: 'appointments',
    name: 'Appointments',
    tagline: 'Smart scheduling that fills your calendar automatically',
    path: '/products/appointments',
    icon: Calendar,
    color: 'text-accent',
    description: 'Smart scheduling with real-time availability and automated reminders.',
  },
  onlineBooking: {
    id: 'online-booking',
    name: 'Online Booking',
    tagline: 'Book while you sleep with 24/7 online scheduling',
    path: '/products/online-booking',
    icon: Globe,
    color: 'text-mint',
    description: '24/7 online booking with marketplace exposure.',
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing',
    tagline: 'Fill your calendar with automated campaigns that actually work',
    path: '/products/marketing',
    icon: Mail,
    color: 'text-lavender',
    description: 'SMS and email campaigns that fill your calendar automatically.',
  },
  ai: {
    id: 'ai',
    name: 'AI',
    tagline: 'Work smarter with AI that understands your business',
    path: '/products/ai',
    icon: Sparkles,
    color: 'text-primary',
    description: 'AI-powered automations and intelligent business insights.',
  },
  landingPageBuilder: {
    id: 'landing-page-builder',
    name: 'Landing Page Builder',
    tagline: 'Create a stunning website and link-in-bio in minutes',
    path: '/products/landing-page-builder',
    icon: Smartphone,
    color: 'text-accent',
    description: 'Build beautiful websites and link-in-bio pages in minutes.',
  },
  analytics: {
    id: 'analytics',
    name: 'Analytics',
    tagline: 'Make smarter decisions with real-time business insights',
    path: '/products/analytics',
    icon: BarChart3,
    color: 'text-mint',
    description: 'Role-based dashboards with real-time business insights.',
  },
  pos: {
    id: 'pos',
    name: 'PoS',
    tagline: 'Lightning-fast checkout with fair tips and instant payouts',
    path: '/products/pos',
    icon: CreditCard,
    color: 'text-lavender',
    description: 'Fast payments, tip splitting, and instant payouts.',
  },
};

export const productsList = Object.values(productsConfig);
