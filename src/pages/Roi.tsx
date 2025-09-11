import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { H1, Lead } from '@/components/ResponsiveTypography';
import { RoiForm } from '@/components/roi/RoiForm';
import { RoiResults } from '@/components/roi/RoiResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoiInput } from '@/types/roi';
import { calcRoi } from '@/lib/calcRoi';
import { DEFAULT_ROI_CONFIG } from '@/config/roi';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';

export default function RoiPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  // Initialize state from URL params or defaults
  const [roiInput, setRoiInput] = React.useState<RoiInput>(() => {
    const teamSize = parseInt(searchParams.get('team') || '3');
    const monthlyTx = parseInt(searchParams.get('tx') || '800');
    const smsPerMonth = parseInt(searchParams.get('sms') || '1500');
    const plan = (searchParams.get('plan') || 'growth') as 'starter' | 'growth';

    return {
      businessType: "Salon",
      plan,
      teamSize,
      aov: 65,
      monthlyTx,
      smsPerMonth,
      websiteCart: true,
      accounting: true,
      aiAutomation: true,
      competitorBase: DEFAULT_ROI_CONFIG.competitor.basePrice,
      competitorIncludedSeats: DEFAULT_ROI_CONFIG.competitor.includedSeats,
      competitorSeatPrice: DEFAULT_ROI_CONFIG.competitor.seatPrice,
      neonORate: DEFAULT_ROI_CONFIG.paymentRates.optionA,
      competitorRate: DEFAULT_ROI_CONFIG.paymentRates.optionA,
      otherFixedFee: 0,
    };
  });

  // Debounced calculation
  const [roiOutput, setRoiOutput] = React.useState(() => calcRoi(roiInput));
  const calcTimeoutRef = React.useRef<number>();

  React.useEffect(() => {
    clearTimeout(calcTimeoutRef.current);
    calcTimeoutRef.current = window.setTimeout(() => {
      const output = calcRoi(roiInput);
      setRoiOutput(output);
    }, 150);

    return () => clearTimeout(calcTimeoutRef.current);
  }, [roiInput]);

  // Update URL when inputs change
  React.useEffect(() => {
    const params = new URLSearchParams();
    params.set('team', roiInput.teamSize.toString());
    params.set('tx', roiInput.monthlyTx.toString());
    params.set('sms', roiInput.smsPerMonth.toString());
    params.set('plan', roiInput.plan);
    
    setSearchParams(params, { replace: true });
  }, [roiInput.teamSize, roiInput.monthlyTx, roiInput.smsPerMonth, roiInput.plan, setSearchParams]);

  // Store in localStorage
  React.useEffect(() => {
    localStorage.setItem('neonoRoiInput', JSON.stringify(roiInput));
  }, [roiInput]);

  const handleLoadPreset = (presetName: keyof typeof DEFAULT_ROI_CONFIG.presets) => {
    const preset = DEFAULT_ROI_CONFIG.presets[presetName];
    setRoiInput(current => ({ ...current, ...preset }));
    
    toast({
      title: "Preset loaded",
      description: `Applied ${presetName.replace(/([A-Z])/g, ' $1').toLowerCase()} scenario settings.`,
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NeonO ROI Calculator Results',
          text: `See how much you could save with NeonO`,
          url: url,
        });
      } catch (err) {
        // User cancelled or error occurred
        handleCopyUrl();
      }
    } else {
      handleCopyUrl();
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "ROI calculator link copied to clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast({
        title: "Copy failed",
        description: "Please copy the URL manually from your browser.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    // Simple print-to-PDF functionality
    const printStyles = `
      <style>
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:break-inside-avoid { break-inside: avoid; }
          body { font-size: 12pt; }
          h1 { font-size: 18pt; }
          h2 { font-size: 16pt; }
          .card { border: 1px solid #ccc; margin-bottom: 1rem; }
        }
      </style>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>NeonO ROI Calculator Results</title>
            ${printStyles}
          </head>
          <body>
            <h1>NeonO ROI Calculator Results</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            ${document.querySelector('[data-results]')?.innerHTML || ''}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  React.useEffect(() => {
    document.title = 'ROI Calculator | NeonO - See Your Savings';
  }, []);

  return (
    <>
      <SEOHead
        title="ROI Calculator — See Your Savings with NeonO"
        description="Calculate how much you could save with NeonO vs. competitors. Compare total costs including seats, SMS, website, accounting, and payment processing."
        path="/roi"
        keywords="salon software cost calculator, ROI calculator, salon software savings, barbershop software pricing"
        structuredData={[
          {
            type: 'organization',
            data: generateStructuredData('organization', {})
          }
        ]}
      />
      <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-hero flex items-center justify-center">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <H1>Calculate your savings with NeonO</H1>
            <Lead className="max-w-3xl mx-auto">
              Competitors look cheaper up front, but common essentials add $65–$95/mo. See your real total cost—seats, SMS, website, cart, accounting, and payments.
            </Lead>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Form Column */}
            <div>
              <RoiForm
                input={roiInput}
                onChange={setRoiInput}
                onLoadPreset={handleLoadPreset}
              />
            </div>

            {/* Results Column */}
            <div className="lg:sticky lg:top-24 lg:self-start" data-results>
              <RoiResults
                input={roiInput}
                output={roiOutput}
                onShare={handleShare}
                onExport={handleExport}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <Card className="bg-gradient-hero text-white border-0 shadow-glow">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Ready to start saving?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of beauty and wellness businesses already using NeonO to streamline operations and reduce costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="touch-44" asChild>
                  <Link to="/signup">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="touch-44 border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/demo">Book a Demo</Link>
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      </div>
    </>
  );
}