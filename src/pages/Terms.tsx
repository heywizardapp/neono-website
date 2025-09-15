import { SEOHead } from '@/components/SEO/SEOHead';

export function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service - NeonO"
        description="Read NeonO's terms of service to understand your rights and responsibilities when using our salon management platform."
        path="/terms"
      />
      
      <div className="min-h-screen py-20">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              These terms govern your use of NeonO's salon management platform and services.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: December 15, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By accessing or using NeonO's services, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, 
                  you are prohibited from using our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  NeonO provides a comprehensive salon and spa management platform that includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Online appointment scheduling and management</li>
                  <li>Point-of-sale (POS) and payment processing</li>
                  <li>Customer relationship management (CRM)</li>
                  <li>Marketing and communication tools</li>
                  <li>Analytics and reporting features</li>
                  <li>Staff management and payroll integration</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>To use our services, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>Be at least 18 years old or have parental consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our subscription and payment terms include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Monthly or annual subscription fees are billed in advance</li>
                  <li>Free trial periods do not require payment information</li>
                  <li>Transaction processing fees apply to payment processing</li>
                  <li>Refunds are provided according to our refund policy</li>
                  <li>Price changes require 30 days advance notice</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the service for illegal or unauthorized purposes</li>
                  <li>Violate any laws in your jurisdiction</li>
                  <li>Transmit worms, viruses, or malicious code</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the service to send spam or unsolicited communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data and Privacy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your data and privacy are protected as outlined in our Privacy Policy. Key points:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You retain ownership of your business data</li>
                  <li>We provide data export tools upon request</li>
                  <li>We implement industry-standard security measures</li>
                  <li>We comply with GDPR, CCPA, and other privacy regulations</li>
                  <li>Customer data is never sold to third parties</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Level Agreement</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We commit to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>99.9% uptime service level agreement</li>
                  <li>24/7 customer support for paid plans</li>
                  <li>Regular data backups and disaster recovery</li>
                  <li>Advance notice of scheduled maintenance</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To the maximum extent permitted by law, NeonO shall not be liable for any indirect, 
                  incidental, special, or consequential damages resulting from your use of our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibond mb-4">Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Either party may terminate this agreement at any time. Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your access to the service will be suspended</li>
                  <li>You may export your data for 30 days</li>
                  <li>Outstanding fees remain due</li>
                  <li>These terms survive termination where applicable</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  For questions about these terms, contact us:
                </p>
                <ul className="list-none space-y-2">
                  <li>Email: legal@neono.com</li>
                  <li>Phone: 1-800-NEONO-1</li>
                  <li>Address: 123 Legal Street, San Francisco, CA 94105</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}