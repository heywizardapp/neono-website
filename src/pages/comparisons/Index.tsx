import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';

export default function ComparisonsHub() {
  const competitors = [
    {
      name: 'Fresha',
      url: '/vs/fresha',
      issue: 'Hidden fees of $2,746–$9,861/year',
      savings: '$9,861',
    },
    {
      name: 'Vagaro',
      url: '/vs/vagaro',
      issue: 'Add-on costs of $95+/month',
      savings: '$3,349',
    },
    {
      name: 'Salon Monster',
      url: '/vs/salon-monster',
      issue: 'Outdated interface, high cost',
      savings: '$1,800+',
    },
    {
      name: 'Squire',
      url: '/vs/squire',
      issue: 'Barbershop-only limitations',
      savings: '$1,000+',
    },
    {
      name: 'Phorest',
      url: '/vs/phorest',
      issue: 'Enterprise pricing for SMBs',
      savings: '$2,000+',
    },
  ];

  return (
    <>
      <Helmet>
        <title>NeonO Comparisons - See How We Compare to Fresha, Vagaro & More</title>
        <meta 
          name="description" 
          content="Compare NeonO to Fresha, Vagaro, Salon Monster, Squire, and Phorest. See features, pricing, and why salons are switching." 
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            How NeonO Compares
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-serif italic">
            See side-by-side feature and pricing comparisons with leading salon software platforms
          </p>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((comp) => (
              <a
                key={comp.url}
                href={comp.url}
                className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-[hsl(240,89%,73%)] hover:shadow-lg transition-all group"
              >
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[hsl(240,89%,73%)]">
                  NeonO vs {comp.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  <strong>Their issue:</strong> {comp.issue}
                </p>
                <div className="flex items-center justify-between">
                  <div className="bg-[hsl(165,82%,49%)]/10 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-[hsl(165,82%,49%)]">
                      Save {comp.savings}/year
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[hsl(240,89%,73%)] group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[hsl(215,85%,8%)] font-serif">
            Ready to Switch?
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-serif italic">
            Join salons saving thousands by switching to NeonO
          </p>
          <a
            href="/signup"
            className="inline-flex items-center px-8 py-4 bg-[hsl(240,89%,73%)] text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </>
  );
}
