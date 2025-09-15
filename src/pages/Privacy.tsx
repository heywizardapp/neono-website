import { SEOHead } from '@/components/SEO/SEOHead';

export function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy - NeonO"
        description="Learn how NeonO protects your privacy and handles your personal information. Our comprehensive privacy policy explains our data practices."
        path="/privacy"
      />
      
      <div className="min-h-screen py-20">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: December 15, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us for support.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account information (name, email, phone number)</li>
                  <li>Business information (salon name, address, staff details)</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Usage data (how you interact with our platform)</li>
                  <li>Communications (support tickets, feedback, chat messages)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Communicate with you about products, services, and events</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>Detect, investigate, and prevent fraudulent transactions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described below:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With service providers who assist in our operations</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>256-bit SSL encryption for data transmission</li>
                  <li>SOC 2 Type II certified data centers</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>HIPAA compliance for healthcare-related data</li>
                  <li>PCI DSS compliance for payment data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your information (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability (receive a copy of your data)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Essential cookies for platform functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Marketing cookies for personalized content (with consent)</li>
                </ul>
                <p>
                  You can manage your cookie preferences through our cookie banner or browser settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about this privacy policy or our data practices, contact us:
                </p>
                <ul className="list-none space-y-2">
                  <li>Email: privacy@neono.com</li>
                  <li>Phone: 1-800-NEONO-1</li>
                  <li>Address: 123 Privacy Street, San Francisco, CA 94105</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}