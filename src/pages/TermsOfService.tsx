import { SEOHead } from '@/components/SEO/SEOHead';
import { Link } from 'react-router-dom';

export function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Service - NeonO Platform"
        description="Terms of Service for business customers using the NeonO salon management platform."
        path="/terms-of-service"
      />
      
      <div className="min-h-screen py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              These Terms of Service govern access to and use of the NeonO platform by business customers.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Effective date: January 15, 2025
            </p>
            <p className="text-sm text-primary mt-4">
              These terms apply to business customers. For website terms, see <Link to="/terms" className="underline hover:no-underline">Terms of Use</Link>
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1) Account & scope</h2>
              <div className="space-y-4 text-muted-foreground">
                <p><strong>1.1 Account creation.</strong> You must provide accurate business details and maintain the security of your credentials.</p>
                <p><strong>1.2 Authorized users.</strong> You control who in your organization gets access ("Seats" or "Users"). You are responsible for Users' actions.</p>
                <p><strong>1.3 Eligibility.</strong> Customer must be legally able to enter into contracts and operate in Canada (or your jurisdiction, if different).</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2) Subscription, seats & pricing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p><strong>2.1 Plans.</strong> Pricing is as published in your NeonO checkout/order form. Current default pricing: CAD $19.99 per seat/month; after the first 5 seats per account, additional seats are CAD $9.99 per seat/month. Taxes extra.</p>
                <p><strong>2.2 Annual option.</strong> Annual plans receive 1 month free (billed annually).</p>
                <p><strong>2.3 Overages & add-ons.</strong> SMS, email, and other metered services may incur additional fees (see your plan details).</p>
                <p><strong>2.4 Upgrades/downgrades.</strong> Prorated per billing cycle where applicable.</p>
                <p><strong>2.5 Payment.</strong> By card or other approved method. Late amounts may accrue interest (1.5% per month, 19.56% per year) or the maximum allowed by law.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3) Term & termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p><strong>3.1 Term.</strong> Month-to-month or annual, as selected.</p>
                <p><strong>3.2 Cancellation.</strong> You may cancel at any time; cancellation takes effect at end of the current paid term. No refunds except where required by law.</p>
                <p><strong>3.3 Suspension/termination.</strong> We may suspend or terminate for non-payment, violation of these Terms, or risk to the Services.</p>
                <p><strong>3.4 Data export.</strong> Upon termination, you may export your data for 30 days (self-service tools or support). After that, we may delete or archive according to our retention policies and law.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4) Acceptable use</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You and your Users will not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the Services for unlawful purposes</li>
                  <li>Infringe IP or privacy rights</li>
                  <li>Upload harmful code</li>
                  <li>Send messages in violation of CASL</li>
                  <li>Misrepresent services to consumers</li>
                  <li>Attempt to bypass security or RLS (row-level security)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5) Merchant-consumer relationship</h2>
              <div className="space-y-4 text-muted-foreground">
                <p><strong>5.1 You are the merchant of record.</strong> Bookings, services, prices, policies, and customer service are your responsibility.</p>
                <p><strong>5.2 Consumer law.</strong> You must comply with applicable consumer protection laws (including Ontario's Consumer Protection Act, 2002), advertising rules, gift card rules, and receipts/refunds where applicable.</p>
                <p><strong>5.3 Disputes.</strong> Disputes between you and your clients are your responsibility unless caused by NeonO's breach of these Terms.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6) Data & privacy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p><strong>6.1 Your data.</strong> You retain ownership of Customer Data (business, staff, client, and appointment records). You grant NeonO a worldwide, non-exclusive, royalty-free license to host, process, transmit, and display Customer Data solely to provide and improve the Services.</p>
                <p><strong>6.2 Personal information.</strong> We process personal information under our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and in compliance with PIPEDA and applicable provincial rules.</p>
                <p><strong>6.3 Security.</strong> NeonO implements administrative, technical, and physical safeguards appropriate to the risk (including RLS, encryption in transit, access controls).</p>
                <p><strong>6.4 Subprocessors & cross-border transfers.</strong> We may use vetted subprocessors (including outside Canada) with appropriate contractual and technical protections.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7) Confidentiality</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Each party will protect the other's Confidential Information and use it only for performance of these Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8) Intellectual property</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Services and related IP are owned by NeonO and licensors. Suggestions/feedback may be used by NeonO without obligation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9) Service changes & availability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may modify features, provide updates, or discontinue components while maintaining overall functionality. 
                  We aim for high availability but do not guarantee uninterrupted service. Planned maintenance will be 
                  communicated when practicable.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10) Disclaimers</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Except as expressly stated, the Services are provided "as is" without warranties of any kind. NeonO disclaims 
                  all implied warranties to the fullest extent permitted by law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11) Limitation of liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To the fullest extent permitted by law, NeonO's total aggregate liability arising out of or relating to 
                  the Services will not exceed the fees paid by you to NeonO in the 12 months preceding the event giving rise 
                  to liability. NeonO is not liable for indirect, incidental, special, consequential, exemplary, or punitive 
                  damages or loss of profits/revenue.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12) Indemnity</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You will defend and indemnify NeonO against third-party claims arising from (a) your breach of these Terms 
                  or law; (b) your offerings to clients; or (c) Customer Data (except to the extent caused by NeonO's breach).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13) Consumer (end-user) terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If consumers interact with NeonO tools (e.g., booking pages), they do so to transact with you. NeonO is a 
                  platform provider. Consumers' personal information is processed under our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and 
                  your salon's policies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14) Communications & CASL</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By using messaging features, you represent that you have proper CASL consent (express or implied) from 
                  recipients and that you will honour unsubscribe/opt-out requirements. You are the sender of record; NeonO 
                  is a service provider.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">15) Governing law; disputes</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ontario law and the federal laws of Canada govern these Terms. The courts of Toronto, Ontario have exclusive 
                  jurisdiction. Each party may seek injunctive or equitable relief in any competent court.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">16) Changes</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update these Terms. Material changes will be notified in-app or by email. Continued use after the 
                  effective date constitutes acceptance.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">17) General</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Assignment (with notice, not unreasonably withheld), force majeure, severability, entire agreement 
                  (including Order/Plan, Privacy Policy, and any DPA), and no waiver.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <a href="mailto:legal@neono.io" className="text-primary hover:underline">legal@neono.io</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
