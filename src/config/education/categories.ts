import { BookOpen, Calendar, CreditCard, Users, Settings, TrendingUp, MessageSquare, Globe } from 'lucide-react';

export interface CategoryConfig {
  id: string;
  name: string;
  icon: any;
  description: string;
  subcategories?: string[];
}

export const educationCategories: CategoryConfig[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: BookOpen,
    description: 'Essential guides to get up and running with NeonO',
    subcategories: ['Account Setup', 'First Steps', 'Quick Start']
  },
  {
    id: 'appointments',
    name: 'Appointments',
    icon: Calendar,
    description: 'Managing bookings, schedules, and availability',
    subcategories: ['Online Booking', 'Calendar Management', 'Reminders', 'Cancellations']
  },
  {
    id: 'sales',
    name: 'Sales & Payments',
    icon: CreditCard,
    description: 'Processing transactions and managing sales',
    subcategories: ['POS System', 'Payment Methods', 'Invoicing', 'Split Payments']
  },
  {
    id: 'clients',
    name: 'Client Management',
    icon: Users,
    description: 'Building and managing your client database',
    subcategories: ['Client Profiles', 'History', 'Loyalty Programs', 'Communication']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: TrendingUp,
    description: 'Grow your business with marketing tools',
    subcategories: ['Email Campaigns', 'SMS Marketing', 'Social Media', 'Promotions']
  },
  {
    id: 'team',
    name: 'Team & Staff',
    icon: Users,
    description: 'Managing your team and permissions',
    subcategories: ['Staff Accounts', 'Permissions', 'Schedules', 'Performance']
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    description: 'Configure and customize your NeonO account',
    subcategories: ['Business Info', 'Services', 'Integrations', 'Notifications']
  },
  {
    id: 'website',
    name: 'Website Builder',
    icon: Globe,
    description: 'Create and manage your business website',
    subcategories: ['Design', 'SEO', 'Domain', 'Content']
  },
  {
    id: 'support',
    name: 'Support',
    icon: MessageSquare,
    description: 'Get help and troubleshooting',
    subcategories: ['FAQs', 'Troubleshooting', 'Contact Support']
  }
];

export function getCategoryById(id: string): CategoryConfig | undefined {
  return educationCategories.find(cat => cat.id === id);
}

export function getCategoryPath(categoryId: string, subcategory?: string): string[] {
  const category = getCategoryById(categoryId);
  if (!category) return [];
  
  const path = [category.name];
  if (subcategory) path.push(subcategory);
  
  return path;
}
