import { ProductTemplate } from '@/templates/ProductTemplate';
import { Users, Shield, DollarSign, BarChart3, Calendar, Clock, Award, UserCheck } from 'lucide-react';
import { PRICING } from '@/config/pricing';

export default function StaffManagement() {
  return (
    <ProductTemplate
      productName="Staff Management"
      tagline="Team Invitations, Authentication, Dashboard & Payroll"
      description="Complete team management with email invitations, secure team authentication, individual staff dashboards, and integrated payroll with commission tracking. Everything your team needs in one system."
      icon={Users}
      path="/products/staff-management"
      seoKeywords="staff management software, team scheduling, commission tracking, employee performance, role-based access"
      sections={[
        {
          id: "access",
          eyebrow: "TEAM CONTROLS",
          title: "Secure access for everyone.",
          bullets: [
            "Create custom roles with specific permissions.",
            "Control exactly what each team member can see.",
            "Secure authentication and individual dashboards."
          ],
          media: {
            src: "/src/assets/placeholders/team.webp",
            alt: "Role based access"
          }
        },
        {
          id: "payroll",
          eyebrow: "PAYROLL & COMMISSIONS",
          title: "Payroll made painless.",
          bullets: [
            "Automatically calculate commissions on services and retail.",
            "Track clock-ins, breaks, and overtime accurately.",
            "Export clean data directly to your payroll provider."
          ],
          media: {
            src: "/src/assets/placeholders/team.webp",
            alt: "Payroll dashboard"
          }
        },
        {
          id: "performance",
          eyebrow: "PERFORMANCE",
          title: "Motivate your best talent.",
          bullets: [
            "Monitor retention, revenue, and conversion metrics.",
            "Celebrate top performers with built-in leaderboards.",
            "Build optimized schedules based on team availability."
          ],
          media: {
            src: "/src/assets/placeholders/team.webp",
            alt: "Staff performance"
          }
        }
      ]}
      features={[
        {
          title: 'Role-Based Access',
          description: 'Create custom roles with specific permissions. Control what each team member can see and do in the system.',
          icon: Shield,
        },
        {
          title: 'Commission Tracking',
          description: 'Automatically calculate commissions based on services, products, and custom rules. Track earnings in real-time.',
          icon: DollarSign,
        },
        {
          title: 'Schedule Management',
          description: 'Build optimized schedules that match staff availability, skills, and business needs. Handle shift swaps easily.',
          icon: Calendar,
        },
        {
          title: 'Performance Metrics',
          description: 'Monitor key metrics like client retention, revenue per service, and booking conversion rates for each team member.',
          icon: BarChart3,
        },
        {
          title: 'Time Tracking',
          description: 'Track clock-ins, breaks, and overtime. Ensure accurate payroll and identify scheduling gaps.',
          icon: Clock,
        },
        {
          title: 'Staff Recognition',
          description: 'Celebrate top performers with built-in leaderboards and achievement badges to boost morale.',
          icon: Award,
        },
      ]}
      benefits={[
        {
          title: 'Reduce admin time by 70%',
          description: 'Automate scheduling, payroll calculations, and performance reporting.',
        },
        {
          title: 'Increase accountability',
          description: 'Clear roles and transparent metrics keep everyone aligned and motivated.',
        },
        {
          title: 'Streamline payroll',
          description: 'Export accurate time and commission data directly to your payroll system.',
        },
        {
          title: 'Improve retention',
          description: 'Fair commission tracking and recognition programs keep your best talent.',
        },
        {
          title: 'Scale confidently',
          description: 'Add new team members and locations without increasing complexity.',
        },
        {
          title: 'Make data-driven decisions',
          description: 'Identify your MVPs and optimize staffing based on real performance data.',
        },
      ]}
      screenshots={[
        {
          src: '/src/assets/placeholders/team.webp',
          alt: 'Staff management dashboard showing team performance',
          caption: 'Real-time view of team performance and schedules',
        },
      ]}
      integrations={[
        { name: 'QuickBooks', logo: 'QB' },
        { name: 'Gusto', logo: 'GU' },
        { name: 'ADP', logo: 'AD' },
        { name: 'Slack', logo: 'SL' },
      ]}
      pricing={{
        startingPrice: `${PRICING.independent.priceDisplay}/month`,
        includedIn: ['Independent', 'Salon'],
      }}
      faqs={[
        {
          q: 'Can I set different commission rates for different staff members?',
          a: 'Yes! You can create custom commission structures for each team member based on services, products, or performance tiers.',
        },
        {
          q: 'How does role-based access work?',
          a: 'You create roles (like Manager, Stylist, Receptionist) and assign specific permissions to each role. Staff members inherit permissions from their assigned role.',
        },
        {
          q: 'Can staff view their own schedules and earnings?',
          a: 'Absolutely. Each team member gets a personalized dashboard showing their schedule, upcoming appointments, and real-time commission earnings.',
        },
        {
          q: 'What if a staff member needs to swap shifts?',
          a: 'Staff can request shift swaps directly in the app. Managers receive notifications and can approve or deny requests with one click.',
        },
        {
          q: 'Does it integrate with payroll systems?',
          a: 'Yes! We integrate with QuickBooks, Gusto, ADP, and other major payroll providers. You can also export data as CSV.',
        },
      ]}
      relatedProducts={[
        {
          name: 'Appointments',
          href: '/products/appointments',
          description: 'Smart scheduling with real-time availability',
        },
        {
          name: 'Analytics',
          href: '/products/analytics',
          description: 'Deep insights into team and business performance',
        },
        {
          name: 'PoS',
          href: '/products/pos',
          description: 'Fast checkout with automated tip splitting',
        },
      ]}
    />
  );
}
