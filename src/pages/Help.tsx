import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronDown } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function Help() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openQuestion, setOpenQuestion] = React.useState<string | null>(null);

  const faqCategories = React.useMemo(() => [
    {
      category: t('help.cat.gettingStarted'),
      questions: [
        { q: t('help.gs.q1'), a: t('help.gs.a1') },
        { q: t('help.gs.q2'), a: t('help.gs.a2') },
        { q: t('help.gs.q3'), a: t('help.gs.a3') },
      ],
    },
    {
      category: t('help.cat.pricingBilling'),
      questions: [
        { q: t('help.pb.q1'), a: t('help.pb.a1') },
        { q: t('help.pb.q2'), a: t('help.pb.a2') },
        { q: t('help.pb.q3'), a: t('help.pb.a3') },
        { q: t('help.pb.q4'), a: t('help.pb.a4') },
      ],
    },
    {
      category: t('help.cat.featuresCapabilities'),
      questions: [
        { q: t('help.fc.q1'), a: t('help.fc.a1') },
        { q: t('help.fc.q2'), a: t('help.fc.a2') },
        { q: t('help.fc.q3'), a: t('help.fc.a3') },
        { q: t('help.fc.q4'), a: t('help.fc.a4') },
      ],
    },
    {
      category: t('help.cat.technicalSupport'),
      questions: [
        { q: t('help.ts.q1'), a: t('help.ts.a1') },
        { q: t('help.ts.q2'), a: t('help.ts.a2') },
        { q: t('help.ts.q3'), a: t('help.ts.a3') },
      ],
    },
    {
      category: t('help.cat.securityCompliance'),
      questions: [
        { q: t('help.sc.q1'), a: t('help.sc.a1') },
        { q: t('help.sc.q2'), a: t('help.sc.a2') },
        { q: t('help.sc.q3'), a: t('help.sc.a3') },
      ],
    },
  ], [t]);

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
  }, [searchQuery, faqCategories]);

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
            {t('help.title')}
          </h1>
          <p className="text-xl opacity-90 mb-8">
            {t('help.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('help.searchPlaceholder')}
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
                {t('help.noResults')} "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[hsl(240,89%,73%)] hover:underline"
              >
                {t('help.clearSearch')}
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
            {t('help.stillNeedHelp')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('help.supportAvailable')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[hsl(240,89%,73%)] text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              {t('help.contactSupport')}
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[hsl(240,89%,73%)] text-[hsl(240,89%,73%)] rounded-lg font-semibold hover:bg-[hsl(240,89%,73%)] hover:text-white transition"
            >
              {t('help.scheduleCall')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
