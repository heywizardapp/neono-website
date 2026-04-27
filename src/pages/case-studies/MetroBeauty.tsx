import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';

export default function MetroBeauty() {
  return (
    <>
      <Helmet>
        <title>Metro Beauty Case Study - 67% Revenue Increase | NeonO</title>
        <meta 
          name="description" 
          content="How Metro Beauty Toronto increased salon partner revenue 67% in 90 days with NeonO's all-in-one platform." 
        />
        <meta property="og:title" content="Metro Beauty Case Study - 67% Revenue Increase with NeonO" />
        <meta property="og:description" content="See how Metro Beauty Toronto helped 150+ salon partners increase revenue 67% in 90 days with NeonO's all-in-one platform." />
        <meta property="og:image" content="https://neono.ca/images/case-studies/metro-beauty-og.jpg" />
        <meta property="og:url" content="https://neono.ca/case-studies/metro-beauty" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Metro Beauty Case Study - 67% Revenue Increase" />
        <meta name="twitter:description" content="How Metro Beauty increased salon partner revenue 67% with NeonO" />
        <meta name="twitter:image" content="https://neono.ca/images/case-studies/metro-beauty-og.jpg" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-medium mb-4 opacity-90">
              CASE STUDY
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              How Metro Beauty Increased Salon Partner Revenue 67% in 90 Days
            </h1>
            <p className="text-xl opacity-90 mb-8 font-display">
              Third-generation beauty distributor modernizes 150+ salon partnerships 
              with NeonO's all-in-one platform.
            </p>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold mb-1">67%</div>
                <div className="text-sm opacity-75">Revenue Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">45%</div>
                <div className="text-sm opacity-75">No-Shows Reduced</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">15hrs</div>
                <div className="text-sm opacity-75">Saved Per Week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[hsl(215,85%,8%)] font-display">
                About Metro Beauty Toronto
              </h2>
              <p className="text-gray-600 mb-4">
                Established in 1982, Metro Beauty is a third-generation beauty supply 
                distributor serving 150+ salons across Ontario. As a trusted partner 
                for professional stylists, they needed a modern solution to help their 
                salon clients compete in an increasingly digital marketplace.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-[hsl(165,82%,49%)] mr-2 mt-1 flex-shrink-0" />
                  <span>150+ salon partnerships across Ontario</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-[hsl(165,82%,49%)] mr-2 mt-1 flex-shrink-0" />
                  <span>40+ years serving the professional beauty industry</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-[hsl(165,82%,49%)] mr-2 mt-1 flex-shrink-0" />
                  <span>Family-owned, third-generation business</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏪</div>
                <p className="text-gray-600">Metro Beauty Toronto</p>
                <p className="text-sm text-gray-500 mt-2">Image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-[hsl(215,85%,8%)] font-display">
            The Challenge
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-semibold mb-3 text-lg">Manual Processes</h3>
              <p className="text-gray-600 text-sm">
                Partner salons were using paper appointment books, leading to 
                double-bookings and lost revenue from scheduling conflicts.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👻</span>
              </div>
              <h3 className="font-semibold mb-3 text-lg">High No-Show Rates</h3>
              <p className="text-gray-600 text-sm">
                Without automated reminders, salons experienced 30%+ no-show rates, 
                costing thousands in lost revenue each month.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛍️</span>
              </div>
              <h3 className="font-semibold mb-3 text-lg">Limited Retail Opportunities</h3>
              <p className="text-gray-600 text-sm">
                Salons struggled to stock retail products due to cash flow and storage 
                constraints, missing additional revenue streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-[hsl(215,85%,8%)] font-display">
            The NeonO Solution
          </h2>
          
          <div className="space-y-16">
            {/* Feature 1: Appointments */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[hsl(240,89%,73%)]/10 rounded-lg mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  1. Automated Appointment Management
                </h3>
                <p className="text-gray-600 mb-4">
                  NeonO's AI-powered scheduling eliminated double-bookings and sent 
                  automated SMS reminders 24 hours before appointments.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(165,82%,49%)] mr-2 mt-2 flex-shrink-0"></div>
                    <span>Reduced no-shows from 30% to 8%</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(165,82%,49%)] mr-2 mt-2 flex-shrink-0"></div>
                    <span>Saved 10+ hours per week on manual scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(165,82%,49%)] mr-2 mt-2 flex-shrink-0"></div>
                    <span>Online booking increased client convenience</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-xl p-6 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 font-medium">Appointment Dashboard</p>
                  <p className="text-sm text-gray-400 mt-2">Screenshot placeholder</p>
                </div>
              </div>
            </div>

            {/* Feature 2: POS + Dropshipping */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-gray-100 rounded-xl p-6 aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 font-medium">POS Checkout</p>
                    <p className="text-sm text-gray-400 mt-2">Screenshot placeholder</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[hsl(240,89%,73%)]/10 rounded-lg mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  2. Integrated POS with Dropshipping
                </h3>
                <p className="text-gray-600 mb-4">
                  Metro Beauty's product catalog integrated directly into salon POS systems, 
                  enabling instant retail sales without inventory risk.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(165,82%,49%)] mr-2 mt-2 flex-shrink-0"></div>
                    <span>38% increase in retail revenue</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(165,82%,49%)] mr-2 mt-2 flex-shrink-0"></div>
                    <span>Zero inventory overhead for salons</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(165,82%,49%)] mr-2 mt-2 flex-shrink-0"></div>
                    <span>2-tap checkout speeds up transactions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3: Marketing Automation */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 bg-[hsl(240,89%,73%)]/10 rounded-lg mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  3. Marketing Automation Suite
                </h3>
                <p className="text-gray-600 mb-4">
                  Automated email and SMS campaigns drove repeat bookings and filled 
                  slow periods with targeted promotions.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(165,82%,49%)] mr-2 mt-2 flex-shrink-0"></div>
                    <span>52% increase in repeat bookings</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(165,82%,49%)] mr-2 mt-2 flex-shrink-0"></div>
                    <span>Automated birthday and follow-up campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(165,82%,49%)] mr-2 mt-2 flex-shrink-0"></div>
                    <span>Reduced marketing workload by 15 hours/week</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-xl p-6 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 font-medium">Marketing Dashboard</p>
                  <p className="text-sm text-gray-400 mt-2">Screenshot placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-[hsl(215,85%,8%)] font-display">
            The Results
          </h2>
          
          {/* Before/After Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Before */}
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">❌</span>
                <h3 className="text-lg font-semibold">Before NeonO</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start text-sm">
                  <span className="text-red-500 mr-2 mt-0.5">✗</span>
                  <span>30%+ no-show rate costing $5K+ monthly</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-red-500 mr-2 mt-0.5">✗</span>
                  <span>Manual appointment books and phone scheduling</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-red-500 mr-2 mt-0.5">✗</span>
                  <span>Limited retail sales due to inventory constraints</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-red-500 mr-2 mt-0.5">✗</span>
                  <span>20+ hours/week spent on administrative tasks</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-red-500 mr-2 mt-0.5">✗</span>
                  <span>Inconsistent client communication and follow-ups</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">✓</span>
                <h3 className="text-lg font-semibold">After NeonO</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start text-sm">
                  <span className="mr-2 mt-0.5">✓</span>
                  <span><strong>8% no-show rate</strong> (45% reduction saves $2.8K/month)</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="mr-2 mt-0.5">✓</span>
                  <span>Automated scheduling with SMS/email reminders</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="mr-2 mt-0.5">✓</span>
                  <span><strong>38% retail revenue increase</strong> via dropshipping</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="mr-2 mt-0.5">✓</span>
                  <span><strong>5 hours/week on admin</strong> (15hrs saved weekly)</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="mr-2 mt-0.5">✓</span>
                  <span>52% increase in repeat bookings from automation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="text-6xl text-[hsl(240,89%,73%)] leading-none">"</div>
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-display">
                  NeonO transformed how we support our salon partners. The integrated 
                  platform not only increased their revenue by 67% on average, but also 
                  strengthened our relationships. Salon owners now see us as a technology 
                  partner, not just a supplier. It's a true win-win.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    C
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Chanel Morrison</p>
                    <p className="text-sm text-gray-600">Partner Relations Manager</p>
                    <p className="text-sm text-gray-500">Metro Beauty Toronto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[hsl(240,89%,73%)] to-[hsl(165,82%,49%)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            Ready to Transform Your Salon Business?
          </h2>
          <p className="text-xl opacity-90 mb-4 font-display">
            Join Metro Beauty and 150+ salons growing with NeonO.
          </p>
          <p className="text-lg opacity-75 mb-8">
            Start with a free 14-day trial. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[hsl(240,89%,73%)] rounded-lg font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[hsl(240,89%,73%)] transition-all"
            >
              Book a Demo
            </a>
          </div>

          <p className="text-sm opacity-75 mt-8">
            Questions? <a href="/contact" className="underline hover:opacity-100">Contact our team</a>
          </p>
        </div>
      </section>
    </>
  );
}
