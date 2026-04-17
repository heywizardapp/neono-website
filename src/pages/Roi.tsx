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
import { useI18n } from '@/hooks/useI18n';
import { SEOHead } from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/lib/seo/meta';

export default function RoiPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const { t } = useI18n();

  // Initialize state from URL params or defaults
  const [roiInput, setRoiInput] = React.useState<RoiInput>(() => {
    const teamSize = parseInt(searchParams.get('team') || '3');
    const monthlyTx = parseInt(searchParams.get('tx') || '800');
    const smsPerMonth = parseInt(searchParams.get('sms') || '1500');

    return {
      businessType: "Salon",
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
    setSearchParams(params, { replace: true });
  }, [roiInput.teamSize, roiInput.monthlyTx, roiInput.smsPerMonth, setSearchParams]);

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
    // Safe print-to-PDF: render from computed state, not raw DOM innerHTML
    const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const doc = printWindow.document;
      doc.open();
      doc.write('<!DOCTYPE html><html><head><title>NeonO ROI Calculator Results</title>');
      doc.write('<style>body{font-family:system-ui,sans-serif;max-width:700px;margin:2rem auto;color:#333}h1{font-size:1.5rem}table{width:100%;border-collapse:collapse;margin:1rem 0}td,th{text-align:left;padding:8px;border-bottom:1px solid #eee}th{font-weight:600}.highlight{color:#4f46e5;font-weight:700;font-size:1.25rem}@media print{body{font-size:12pt}}</style>');
      doc.write('</head><body>');
      doc.write('<h1>NeonO ROI Calculator Results</h1>');
      doc.write(`<p>Generated on ${doc.createTextNode(new Date().toLocaleDateString()).textContent}</p>`);
      doc.write('<table>');
      doc.write(`<tr><td>Team Size</td><td>${Number(roiInput.teamSize)}</td></tr>`);
      doc.write(`<tr><td>Monthly Transactions</td><td>${Number(roiInput.monthlyTx)}</td></tr>`);
      doc.write(`<tr><td>Plan</td><td>NeonO ($24.99/seat)</td></tr>`);
      doc.write(`<tr><td>NeonO Monthly Cost</td><td>${fmt(roiOutput.neonoTotal)}</td></tr>`);
      doc.write(`<tr><td>Competitor Monthly Cost</td><td>${fmt(roiOutput.competitorTotal)}</td></tr>`);
      doc.write(`<tr><td><strong>Monthly Savings</strong></td><td class="highlight">${fmt(roiOutput.monthlySavings)}</td></tr>`);
      doc.write(`<tr><td><strong>Annual Savings</strong></td><td class="highlight">${fmt(roiOutput.annualSavings)}</td></tr>`);
      doc.write('</table>');
      doc.write('</body></html>');
      doc.close();
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
            <H1 className="font-serif">{t('roiPage.title')}</H1>
            <Lead className="max-w-3xl mx-auto">
              {t('roiPage.subtitle')}
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
              <h2 className="text-3xl font-serif font-bold mb-4">
                {t('roiPage.ctaTitle')}
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t('roiPage.ctaDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="touch-44" asChild>
                  <Link to="/signup">
                    {t('roiPage.startFreeTrial')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="touch-44 border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/demo">{t('roiPage.bookDemo')}</Link>
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-4">
                {t('roiPage.trialInfo')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      </div>
    </>
  );
}