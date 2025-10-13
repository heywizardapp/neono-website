// Static imports for all blog posts
import hiddenCosts from '@/content/blog/hidden-costs-salon-software.md';
import smsMarketing from '@/content/blog/sms-marketing-campaigns-salons.md';
import clientRetention from '@/content/blog/client-retention-strategies.md';
import commissionFree from '@/content/blog/commission-free-payments.md';
import ultimateGuide from '@/content/blog/ultimate-salon-management-software-guide.md';
import staffScheduling from '@/content/blog/staff-scheduling-best-practices-salons.md';
import localSeo from '@/content/blog/local-seo-barbershops-guide.md';
import calculateRoi from '@/content/blog/calculate-salon-roi-guide.md';
import metroSalon from '@/content/blog/metro-salon-doubled-bookings-case-study.md';
import smsCampaignSetup from '@/content/blog/sms-campaign-setup-video-tutorial.md';

// Map of slug to content
const blogContent: Record<string, string> = {
  'hidden-costs-salon-software': hiddenCosts,
  'sms-marketing-campaigns-salons': smsMarketing,
  'client-retention-strategies': clientRetention,
  'commission-free-payments': commissionFree,
  'ultimate-salon-management-software-guide': ultimateGuide,
  'staff-scheduling-best-practices-salons': staffScheduling,
  'local-seo-barbershops-guide': localSeo,
  'calculate-salon-roi-guide': calculateRoi,
  'metro-salon-doubled-bookings-case-study': metroSalon,
  'sms-campaign-setup-video-tutorial': smsCampaignSetup,
};

export const loadBlogContent = (slug: string): string => {
  const content = blogContent[slug];
  if (!content) {
    console.error(`Blog post not found: ${slug}`);
    return '# Content Unavailable\n\nWe\'re having trouble loading this blog post. Please try refreshing the page or [contact us](/contact) if the issue persists.';
  }
  return content;
};
