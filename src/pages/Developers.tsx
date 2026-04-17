import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Code, BookOpen, Zap, Shield, ArrowRight } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function Developers() {
  const { t } = useI18n();
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to newsletter_signups table with 'developer' tag
    console.log('Developer email signup:', email);
    setSubmitted(true);
  };

  const apiEndpoints = [
    { title: t('developers.apiAppointments'), desc: t('developers.apiAppointmentsDesc') },
    { title: t('developers.apiClients'), desc: t('developers.apiClientsDesc') },
    { title: t('developers.apiServices'), desc: t('developers.apiServicesDesc') },
    { title: t('developers.apiStaff'), desc: t('developers.apiStaffDesc') },
    { title: t('developers.apiPayments'), desc: t('developers.apiPaymentsDesc') },
    { title: t('developers.apiAnalytics'), desc: t('developers.apiAnalyticsDesc') },
    { title: t('developers.apiWebhooks'), desc: t('developers.apiWebhooksDesc') },
    { title: t('developers.apiInventory'), desc: t('developers.apiInventoryDesc') },
  ];

  return (
    <>
      <Helmet>
        <title>NeonO API - Developer Documentation (Coming Soon)</title>
        <meta
          name="description"
          content="NeonO API documentation for developers. Build custom integrations with our salon management platform. Coming Q2 2026."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              {t('developers.comingSoon')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              {t('developers.title')}
            </h1>
            <p className="text-xl opacity-90 mb-8 font-serif italic">
              {t('developers.subtitle')}
            </p>

            {/* Email Signup */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('developers.emailPlaceholder')}
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-[hsl(240,89%,73%)] rounded-lg font-semibold hover:shadow-2xl transition whitespace-nowrap"
                >
                  {t('developers.getNotified')}
                </button>
              </form>
            ) : (
              <div className="bg-white/20 px-6 py-4 rounded-lg max-w-xl">
                <p className="font-semibold">{t('developers.thankYou')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Planned Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(215,85%,8%)] font-serif">
            {t('developers.whatYoullBuild')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[hsl(240,89%,73%)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-[hsl(240,89%,73%)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('developers.customIntegrations')}</h3>
              <p className="text-gray-600">
                {t('developers.customIntegrationsDesc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[hsl(240,89%,73%)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[hsl(240,89%,73%)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('developers.whiteLabel')}</h3>
              <p className="text-gray-600">
                {t('developers.whiteLabelDesc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[hsl(240,89%,73%)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[hsl(240,89%,73%)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('developers.enterpriseTools')}</h3>
              <p className="text-gray-600">
                {t('developers.enterpriseToolsDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planned API Endpoints */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[hsl(215,85%,8%)] font-serif">
            {t('developers.plannedCapabilities')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {apiEndpoints.map((endpoint, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">{endpoint.title}</h3>
                <p className="text-gray-600 text-sm">{endpoint.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-[hsl(215,85%,8%)] font-serif">
            {t('developers.apiDesign')}
          </h2>
          <div className="bg-[hsl(215,85%,8%)] text-white p-8 rounded-2xl font-mono text-sm overflow-x-auto">
            <pre>{`// Create a new appointment
POST https://api.neono.ca/v1/appointments

{
  "client_id": "clt_abc123",
  "service_id": "svc_xyz789",
  "staff_id": "stf_def456",
  "start_time": "2026-03-15T14:00:00Z",
  "notes": "First-time client, prefers quiet music"
}

// Response
{
  "id": "apt_123456",
  "status": "confirmed",
  "confirmation_sent": true
}`}</pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            {t('developers.earlyAccess')}
          </h2>
          <p className="text-xl opacity-90 mb-8 font-serif italic">
            {t('developers.earlyAccessDesc')}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[hsl(240,89%,73%)] rounded-lg font-semibold hover:shadow-2xl transition-all"
          >
            {t('developers.requestAccess')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </>
  );
}
