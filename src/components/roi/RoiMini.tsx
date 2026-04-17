import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calcRoi } from '@/lib/calcRoi';
import { RoiInput } from '@/types/roi';
import { DEFAULT_ROI_CONFIG } from '@/config/roi';

interface RoiMiniProps {
  title?: string;
  description?: string;
}

export function RoiMini({ 
  title = "See your savings", 
  description = "Quick estimate based on your business" 
}: RoiMiniProps) {
  const [teamSize, setTeamSize] = React.useState(3);
  const [monthlyTx, setMonthlyTx] = React.useState(800);
  const [smsPerMonth, setSmsPerMonth] = React.useState(1500);

  // Create a basic ROI input with defaults
  const roiInput: RoiInput = {
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

  const results = React.useMemo(() => calcRoi(roiInput), [roiInput]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const createRoiUrl = () => {
    const params = new URLSearchParams({
      team: teamSize.toString(),
      tx: monthlyTx.toString(),
      sms: smsPerMonth.toString(),
    });
    return `/roi?${params.toString()}`;
  };

  return (
    <Card className="bg-gradient-card border-primary/20 shadow-glow">
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor="mini-team" className="text-xs">Team Size</Label>
            <Input
              id="mini-team"
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
              min="1"
              max="20"
              className="h-10 text-center touch-44"
            />
          </div>
          <div>
            <Label htmlFor="mini-tx" className="text-xs">Monthly Transactions</Label>
            <Input
              id="mini-tx"
              type="number"
              value={monthlyTx}
              onChange={(e) => setMonthlyTx(parseInt(e.target.value) || 0)}
              min="0"
              className="h-10 text-center touch-44"
            />
          </div>
          <div>
            <Label htmlFor="mini-sms" className="text-xs">SMS/Month</Label>
            <Input
              id="mini-sms"
              type="number"
              value={smsPerMonth}
              onChange={(e) => setSmsPerMonth(parseInt(e.target.value) || 0)}
              min="0"
              className="h-10 text-center touch-44"
            />
          </div>
        </div>

        <div className="text-center py-4 bg-mint/10 rounded-lg" role="region" aria-live="polite">
          <div className="text-2xl font-bold text-mint">
            {results.monthlySavings > 0 ? 'Save ' : 'Extra: '}
            {formatCurrency(Math.abs(results.monthlySavings))}
          </div>
          <div className="text-sm text-muted-foreground">per month vs typical stack</div>
          <div className="text-lg font-semibold text-mint mt-1">
            {formatCurrency(Math.abs(results.yearlySavings))} per year
          </div>
        </div>

        <Button asChild className="w-full touch-44" size="lg">
          <Link to={createRoiUrl()}>
            View Full Results <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Includes website, SMS, QuickBooks, AI tools—free with NeonO
        </p>
      </CardContent>
    </Card>
  );
}

export default RoiMini;