import { SEOHead } from '@/components/SEO/SEOHead';
import { Link } from 'react-router-dom';

export function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy - NeonO"
        description="Learn how NeonO protects your privacy and handles your personal information in accordance with PIPEDA and Canadian privacy laws."
        path="/privacy"
      />
      
      <div className="min-h-screen py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              NeonO Inc. is committed to protecting personal information in accordance with PIPEDA and applicable provincial laws.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Effective date: January 15, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1) Scope</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>This Policy applies to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Visitors to our Site (neono.io)</li>
                  <li>Business customers (salons) and their personnel using our platform</li>
                  <li>End-consumers who book services through NeonO-powered pages</li>
                </ul>
                <p>
                  If you are a business customer, your agreements with NeonO may include additional privacy or data processing terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2) Personal information we collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account & profile data:</strong> name, business name, role, emails, phone numbers, addresses, login metadata</li>
                  <li><strong>Booking & transaction data:</strong> appointments, services, staff selection, notes you supply, prices, payment status (we do not store full card numbers; payment processors store those)</li>
                  <li><strong>Communications:</strong> emails, SMS, in-app messages, support chats</li>
                  <li><strong>Device & usage data:</strong> IP address, identifiers, browser type, pages viewed, actions taken; approximate location derived from IP; cookies and similar technologies</li>
                  <li><strong>Marketing preferences & consent</strong> (including CASL consent states)</li>
                  <li><strong>Support content</strong> you submit (attachments, logs)</li>
                </ul>
                <p>
                  Sensitive information (e.g., health details) should not be entered into free-text fields unless explicitly 
                  requested and consented to by the consumer and permitted by law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3) How we use personal information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use personal information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, secure, and improve the Services (account creation, authentication, appointments, reminders, messaging, analytics, fraud prevention)</li>
                  <li>Operate our Site and respond to inquiries</li>
                  <li>Send service communications and (with consent) marketing communications</li>
                  <li>Comply with legal obligations and enforce our agreements</li>
                </ul>
                <p>
                  <strong>Legal bases (where applicable):</strong> consent, performance of a contract, legitimate interests 
                  (e.g., security, product improvement), and compliance with law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4) Cookies & similar tech</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use necessary cookies and, with consent where required, analytics/marketing cookies. Browser controls 
                  can limit cookies; some features may not function without them.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5) Disclosure to third parties</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may disclose personal information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers/subprocessors (hosting, analytics, communications, payments, customer support) under contractual confidentiality and security obligations</li>
                  <li>Business customers (salons) for bookings and client management</li>
                  <li>Legal authorities where required by law or to protect rights, safety, or security</li>
                  <li>Corporate transactions (merger, acquisition) subject to appropriate safeguards</li>
                </ul>
                <p><strong>We do not sell personal information.</strong></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6) International transfers</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our infrastructure and providers may be located outside Canada (e.g., the United States). We implement 
                  contractual (Standard Contractual Clauses where applicable), organizational, and technical safeguards to 
                  protect data during cross-border transfers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7) Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We employ administrative, technical, and physical safeguards appropriate to the sensitivity of the information 
                  (encryption in transit, access controls, logging, RLS). No system is perfectly secure; please keep your 
                  credentials safe and notify us of any suspected unauthorized access.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8) Retention</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We retain personal information only as long as necessary for the purposes described or as required by law. 
                  When no longer needed, information is securely deleted or anonymized.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9) Your rights & choices</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Subject to applicable law, you may:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and request correction of your personal information</li>
                  <li>Withdraw marketing consent (unsubscribe/opt-out) at any time</li>
                  <li>Request deletion, portability, or restriction, where available</li>
                  <li>Set cookie preferences in your browser</li>
                </ul>
                <p>
                  <strong>Requests:</strong> <a href="mailto:privacy@neono.io" className="text-primary hover:underline">privacy@neono.io</a>. 
                  We may need to verify identity and may refuse requests where permitted by law (we'll explain why).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10) CASL (anti-spam)</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We send commercial electronic messages only with appropriate express or implied consent, and include clear 
                  identification and an unsubscribe mechanism. Unsubscribe requests are honoured promptly.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11) Children</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Services are not directed to children under 13. We do not knowingly collect personal information from 
                  children without appropriate consent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12) Third-party services</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  When you interact with third-party services (e.g., Google, Meta, payment processors), their privacy policies 
                  apply. We are not responsible for their practices.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13) Changes</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Policy. We will post the revised Policy with a new effective date and, if changes are 
                  material, provide additional notice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14) Contact & complaints</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Questions or complaints about privacy: <a href="mailto:privacy@neono.io" className="text-primary hover:underline">privacy@neono.io</a> or 
                  NeonO Inc., 123 Business Street, Toronto, Ontario M5V 3A8, Canada.
                </p>
                <p>
                  You may also contact the Office of the Privacy Commissioner of Canada (OPC) or your provincial privacy regulator.
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-border/40">
              <p className="text-sm text-muted-foreground text-center">
                See also: <Link to="/terms" className="text-primary hover:underline">Terms of Use</Link> | <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}