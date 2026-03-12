import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronDown } from 'lucide-react';

const faqCategories = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I get started with NeonO?',
        a: 'Sign up for a free 14-day trial at neono.ca/signup. No credit card required. After signing up, you\'ll complete a quick onboarding to set up your business profile, then you can start adding services, staff, and appointments immediately.',
      },
      {
        q: 'How long does setup take?',
        a: 'Most salons are fully operational within 2-4 hours. Our guided setup walks you through: business details, service menu, staff profiles, and calendar configuration. We also offer free migration assistance if you\'re switching from another platform.',
      },
      {
        q: 'Can I import data from my current system?',
        a: 'Yes! We support data imports from Fresha, Vagaro, Square, and most other platforms. Contact our support team after signup and we\'ll handle the migration for free.',
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    questions: [
      {
        q: 'How does per-chair pricing work?',
        a: 'You pay $16.99/month per active chair or service station. If you have 4 chairs, that\'s $67.96/month. After 7 chairs, all additional chairs are FREE—so 8+ chairs is still just $118.93/month total.',
      },
      {
        q: 'Are there any hidden fees?',
        a: 'No. Everything is included: appointments, POS, marketing, SMS, email, website builder, AI analytics, and more. The only additional cost is payment processing (2.9% + 30¢ per transaction), which goes to Stripe, not us.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Absolutely. We\'re month-to-month with no long-term contracts. Cancel anytime from your account settings. No cancellation fees, no questions asked.',
      },
      {
        q: 'Do you charge commissions on tips?',
        a: 'Never. Your staff keeps 100% of their tips. We don\'t take a cut like some competitors do.',
      },
    ],
  },
  {
    category: 'Features & Capabilities',
    questions: [
      {
        q: 'Does NeonO work for barbershops and spas, or just salons?',
        a: 'NeonO works for all beauty and wellness businesses: hair salons, barbershops, nail salons, spas, medical aesthetics, and more. The platform adapts to your specific business type.',
      },
      {
        q: 'Can clients book online 24/7?',
        a: 'Yes. Your clients can book appointments anytime through your custom booking page or embedded widget on your website. They\'ll receive automatic confirmations and reminders via SMS and email.',
      },
      {
        q: 'Does NeonO have a mobile app?',
        a: 'Yes, NeonO works perfectly on mobile browsers and can be installed as a Progressive Web App (PWA) on iOS and Android. Your staff can manage appointments, check out clients, and view schedules from their phones.',
      },
      {
        q: 'Can I manage multiple locations?',
        a: 'Yes. Multi-location management is included. You can view all locations from one dashboard or switch between locations. Each location has its own calendar, staff, and settings.',
      },
    ],
  },
  {
    category: 'Technical Support',
    questions: [
      {
        q: 'What kind of support do you offer?',
        a: '24/7 support via live chat and email. We also have a comprehensive knowledge base with video tutorials. Most questions are answered within 2 hours, critical issues within 30 minutes.',
      },
      {
        q: 'Do you offer training?',
        a: 'Yes. All plans include free onboarding training. We provide video tutorials, live webinars, and one-on-one setup calls if needed. Your staff will be comfortable using NeonO within a day.',
      },
      {
        q: 'What if I need help migrating from another platform?',
        a: 'We handle it for free. Our team will migrate your client data, appointment history, and service menu from your old system. Typical migration takes 2-3 business days.',
      },
    ],
  },
  {
    category: 'Security & Compliance',
    questions: [
      {
        q: 'Is my data secure?',
        a: 'Yes. NeonO is SOC 2 Type II certified and PCI DSS Level 1 compliant. We use bank-level encryption, secure cloud infrastructure, and daily backups. Your data is safer with us than on local computers.',
      },
      {
        q: 'Are you HIPAA compliant?',
        a: 'Yes. For medical spas and aesthetics clinics handling protected health information, we offer HIPAA-compliant configurations and sign Business Associate Agreements (BAAs).',
      },
      {
        q: 'Who owns my data?',
        a: 'You do. You can export all your data anytime in standard formats (CSV, PDF). If you cancel, you retain full access to download your data for 30 days.',
      },
    ],
  },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openQuestion, setOpenQuestion] = React.useState<string | null>(null);

  const filteredFAQs = React.useMemo(() => {
    if (!searchQuery) return faqCategories;
    
    const query = searchQuery.toLowerCase();
    return faqCategories
      .map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q => q.q.toLowerCase().includes(query) || q.a.toLowerCase().includes(query)
        ),
      }))
      .filter(cat => cat.questions.length > 0);
  }, [searchQuery]);

  return (
    <>
      <Helmet>
        <title>Help Center - NeonO Support & FAQs</title>
        <meta 
          name="description" 
          content="Get help with NeonO. Find answers to common questions about pricing, features, setup, and support." 
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Can We Help?
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Search our knowledge base or browse common questions below
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No results found for "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[hsl(240,89%,73%)] hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredFAQs.map((category) => (
              <div key={category.category} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-[hsl(215,85%,8%)]">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, idx) => {
                    const questionId = `${category.category}-${idx}`;
                    const isOpen = openQuestion === questionId;
                    
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenQuestion(isOpen ? null : questionId)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                        >
                          <span className="font-semibold text-lg pr-4">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[hsl(215,85%,8%)]">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[hsl(240,89%,73%)] text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Contact Support
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[hsl(240,89%,73%)] text-[hsl(240,89%,73%)] rounded-lg font-semibold hover:bg-[hsl(240,89%,73%)] hover:text-white transition"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
