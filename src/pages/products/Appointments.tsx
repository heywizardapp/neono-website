import { ProductTemplate } from '@/templates/ProductTemplate';
import { Calendar, Bell, Users, Repeat, MapPin, Clock, CheckCircle, Smartphone } from 'lucide-react';
import { PRICING } from '@/config/pricing';

export default function Appointments() {
  return (
    <ProductTemplate
      productName="Appointments"
      tagline="Smart Scheduling with Waitlists, Resources & Analytics"
      description="Complete appointment management with smart waitlists, resource scheduling, closed period management, and schedule analytics. Automated reminders at 24 hours, 2 hours, and 30 minutes keep clients on time."
      icon={Calendar}
      path="/products/appointments"
      seoKeywords="appointment scheduling software, booking calendar, automated reminders, salon appointments, beauty booking system"
      sections={[
        {
          id: "scheduling",
          eyebrow: "SMART CALENDAR",
          title: "A calendar designed for stylists.",
          bullets: [
            "Clients see live availability across your entire team.",
            "Set up weekly, monthly, or custom recurring bookings.",
            "No more double bookings or scheduling conflicts."
          ],
          media: {
            src: "/src/assets/placeholders/appointments.webp",
            alt: "Appointment calendar"
          }
        },
        {
          id: "automation",
          eyebrow: "AUTOMATION",
          title: "Reduce no-shows by 80%.",
          bullets: [
            "Send SMS and email reminders automatically.",
            "Handle party bookings and group services easily.",
            "Smart reminder sequences keep clients on time."
          ],
          media: {
            src: "/src/assets/placeholders/appointments.webp",
            alt: "Automated reminders"
          }
        },
        {
          id: "management",
          eyebrow: "MANAGEMENT",
          title: "Manage your business anywhere.",
          bullets: [
            "Manage appointments across multiple locations from one dashboard.",
            "Your team can manage their schedules from any device.",
            "Perfect for growing businesses and franchises."
          ],
          media: {
            src: "/src/assets/placeholders/appointments.webp",
            alt: "Mobile management"
          }
        }
      ]}
      features={[
        {
          title: 'Real-Time Availability',
          description: 'Clients see live availability across your entire team. No more double bookings or scheduling conflicts.',
          icon: Clock,
        },
        {
          title: 'Automated Reminders',
          description: 'Send SMS and email reminders automatically. Reduce no-shows by up to 80% with smart reminder sequences.',
          icon: Bell,
        },
        {
          title: 'Multi-Location Support',
          description: 'Manage appointments across multiple locations from one dashboard. Perfect for growing businesses.',
          icon: MapPin,
        },
        {
          title: 'Recurring Appointments',
          description: 'Set up weekly, monthly, or custom recurring bookings for regular clients. Automate repeat business.',
          icon: Repeat,
        },
        {
          title: 'Group Bookings',
          description: 'Handle party bookings, couples appointments, and group services with coordinated scheduling.',
          icon: Users,
        },
        {
          title: 'Mobile Friendly',
          description: 'Your team can manage their schedules from anywhere. Clients can book from any device.',
          icon: Smartphone,
        },
      ]}
      benefits={[
        {
          title: 'Reduce no-shows by 80%',
          description: 'Automated reminders ensure clients show up for their appointments.',
        },
        {
          title: 'Fill last-minute cancellations',
          description: 'Smart waitlists automatically notify clients when slots open up.',
        },
        {
          title: 'Increase bookings by 35%',
          description: 'Real-time availability and easy booking increase conversion rates.',
        },
        {
          title: 'Save 10+ hours per week',
          description: 'Eliminate phone tag and manual scheduling with self-service booking.',
        },
        {
          title: 'Optimize your schedule',
          description: 'AI-powered suggestions help you fill gaps and maximize revenue.',
        },
        {
          title: 'Delight your clients',
          description: 'Make booking effortless with a beautiful, intuitive experience.',
        },
      ]}
      screenshots={[
        {
          src: '/src/assets/placeholders/appointments.webp',
          alt: 'Appointment calendar showing team schedules',
          caption: 'Beautiful calendar view with drag-and-drop scheduling',
        },
      ]}
      integrations={[
        { name: 'Google Calendar', logo: 'GC' },
        { name: 'Outlook', logo: 'OL' },
        { name: 'Zoom', logo: 'ZM' },
        { name: 'iCal', logo: 'IC' },
      ]}
      pricing={{
        startingPrice: `${PRICING.independent.priceDisplay}/month`,
        includedIn: ['Independent', 'Salon'],
      }}
      faqs={[
        {
          q: 'Can clients book online 24/7?',
          a: 'Yes! Your booking calendar is always available online. Clients can book anytime from your website, Instagram, or directly through their NeonO account.',
        },
        {
          q: 'How do automated reminders work?',
          a: 'You set up your reminder preferences (like 24 hours before + 2 hours before). We automatically send SMS and/or email reminders to clients. You can customize the message and timing.',
        },
        {
          q: 'What happens if I get a last-minute cancellation?',
          a: 'Our smart waitlist feature automatically notifies clients who wanted that time slot. The first person to book gets it—filling your schedule instantly.',
        },
        {
          q: 'Can I block off time for breaks or events?',
          a: 'Absolutely. You can block time for any reason—lunch breaks, staff meetings, personal time, or special events. Blocked time won\'t show as available for booking.',
        },
        {
          q: 'Does it sync with my personal calendar?',
          a: 'Yes! We sync two-way with Google Calendar, Outlook, and Apple Calendar. Your personal appointments automatically block off time in NeonO.',
        },
      ]}
      relatedProducts={[
        {
          name: 'Online Booking',
          href: '/products/online-booking',
          description: '24/7 bookings with marketplace exposure',
        },
        {
          name: 'Marketing',
          href: '/products/marketing',
          description: 'Fill empty slots with automated campaigns',
        },
        {
          name: 'Staff Management',
          href: '/products/staff-management',
          description: 'Optimize team schedules and availability',
        },
      ]}
    />
  );
}
