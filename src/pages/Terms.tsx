import { SEOHead } from '@/components/SEO/SEOHead';
import { Link } from 'react-router-dom';

export function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Use - NeonO"
        description="Terms of Use governing your access to and use of the NeonO website."
        path="/terms"
      />
      
      <div className="min-h-screen py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Terms of Use</h1>
            <p className="text-xl text-muted-foreground">
              These terms govern all visitors' access to and use of the NeonO website.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Effective date: January 15, 2025
            </p>
            <p className="text-sm text-primary mt-4">
              Looking for our platform Terms of Service? <Link to="/terms-of-service" className="underline hover:no-underline">Click here</Link>
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1) Who we are</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  NeonO Inc. ("NeonO", "we", "us", "our") operates the website at neono.io and related pages (the "Site"). 
                  Our registered office is: NeonO Inc., 123 Business Street, Toronto, Ontario M5V 3A8, Canada. 
                  Contact: <a href="mailto:legal@neono.io" className="text-primary hover:underline">legal@neono.io</a>.
                </p>
                <p>
                  These Terms of Use govern all visitors' access to and use of the Site. If you create a NeonO account 
                  to use our SaaS platform, that use is governed by our <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2) Acceptance</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By using the Site, you agree to these Terms of Use and our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. 
                  If you do not agree, do not use the Site.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3) Site content & IP</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Site (including text, graphics, logos, UI, and software) is owned by NeonO or our licensors and 
                  protected by Canadian and international IP laws. You may not copy, modify, reverse-engineer, or create 
                  derivative works except as permitted by law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4) Permitted / prohibited use</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You may browse the Site for lawful purposes only. You will not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access without authorization</li>
                  <li>Scrape or mine data</li>
                  <li>Test or harm security</li>
                  <li>Upload malware</li>
                  <li>Infringe IP or privacy</li>
                  <li>Use the Site to send unsolicited commercial electronic messages contrary to CASL</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5) Third-party links</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Site may link to third-party sites or services. We do not endorse or control them and are not 
                  responsible for their content, policies, or practices.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6) No warranties</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Site is provided "as is." To the fullest extent permitted by law, we disclaim all warranties 
                  (express or implied), including merchantability, fitness for a particular purpose, and non-infringement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7) Limit of liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To the fullest extent permitted by law, NeonO will not be liable for any indirect, incidental, consequential, 
                  special, exemplary, or punitive damages, or lost profits, arising from your use of the Site. Our total 
                  liability for any claims relating to the Site will not exceed CAD $100.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8) Privacy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We handle personal information in accordance with our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> (PIPEDA-aligned) 
                  and applicable provincial laws. Some features use cookies and similar technologies—see our Cookie section in the Privacy Policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9) Changes</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update these Terms of Use from time to time. If changes are material, we will post a notice 
                  on the Site with the new effective date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10) Governing law & venue</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  These Terms are governed by the laws of Ontario and the federal laws of Canada applicable therein. 
                  The courts of Toronto, Ontario have exclusive jurisdiction, except that consumers located in Quebec 
                  retain any mandatory rights under Quebec law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11) Contact</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Questions: <a href="mailto:legal@neono.io" className="text-primary hover:underline">legal@neono.io</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
