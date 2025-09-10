import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Share2, Download, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { RoiInput, RoiOutput } from '@/types/roi';

interface RoiResultsProps {
  input: RoiInput;
  output: RoiOutput;
  onShare: () => void;
  onExport: () => void;
}

export function RoiResults({ input, output, onShare, onExport }: RoiResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (decimal: number) => {
    return `${(decimal * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Main Results Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              Monthly with NeonO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(output.neonoTotal)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Software: {formatCurrency(output.neonoSoftware)} • 
              Processing: {formatCurrency(output.neonoProcessing)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-400" />
              Monthly with Competitor Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-700">
              {formatCurrency(output.competitorTotal)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Software: {formatCurrency(output.competitorSoftware)} • 
              Processing: {formatCurrency(output.competitorProcessing)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Highlight */}
      <Card className={`border-2 ${output.monthlySavings > 0 ? 'border-mint bg-mint/5' : 'border-destructive bg-destructive/5'}`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${output.monthlySavings > 0 ? 'text-mint' : 'text-destructive'} flex items-center justify-center gap-2`}>
              {output.monthlySavings > 0 ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
              {output.monthlySavings > 0 ? 'Save ' : 'Extra cost: '}
              {formatCurrency(Math.abs(output.monthlySavings))}
            </div>
            <div className="text-lg text-muted-foreground mt-1">each month</div>
            <div className={`text-2xl font-semibold mt-4 ${output.monthlySavings > 0 ? 'text-mint' : 'text-destructive'}`}>
              {output.monthlySavings > 0 ? 'Save ' : 'Extra cost: '}
              {formatCurrency(Math.abs(output.yearlySavings))} per year
            </div>
            {output.paybackMonths && (
              <Badge variant="secondary" className="mt-3">
                Payback period: {output.paybackMonths} months
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visual Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* NeonO Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">NeonO Total</span>
                <span className="font-semibold">{formatCurrency(output.neonoTotal)}</span>
              </div>
              <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-primary rounded-lg flex items-center justify-end pr-2"
                  style={{ width: `${Math.min(100, (output.neonoTotal / Math.max(output.neonoTotal, output.competitorTotal)) * 100)}%` }}
                  aria-label={`NeonO: ${formatCurrency(output.neonoTotal)}`}
                >
                  <span className="text-xs text-white font-medium">
                    {output.neonoTotal < output.competitorTotal ? formatCurrency(output.neonoTotal) : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Competitor Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Competitor Stack</span>
                <span className="font-semibold">{formatCurrency(output.competitorTotal)}</span>
              </div>
              <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-slate-400 rounded-lg flex items-center justify-end pr-2"
                  style={{ width: `${Math.min(100, (output.competitorTotal / Math.max(output.neonoTotal, output.competitorTotal)) * 100)}%` }}
                  aria-label={`Competitor: ${formatCurrency(output.competitorTotal)}`}
                >
                  <span className="text-xs text-white font-medium">
                    {output.competitorTotal < output.neonoTotal ? formatCurrency(output.competitorTotal) : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap print:hidden">
        <Button onClick={onShare} variant="outline" className="touch-44">
          <Share2 className="h-4 w-4 mr-2" />
          Share Results
        </Button>
        <Button onClick={onExport} variant="outline" className="touch-44">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button asChild className="touch-44">
          <a href="/signup">Start Free Trial</a>
        </Button>
      </div>

      {/* Explanation Accordion */}
      <Card className="print:break-inside-avoid">
        <CardHeader>
          <CardTitle className="text-lg">How We Calculate This</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="software-costs">
              <AccordionTrigger>Software Costs Breakdown</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">NeonO ({input.plan === 'starter' ? 'Starter' : 'Growth'})</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Base plan: {formatCurrency(output.breakdown.neonoBasePlan)}/mo</li>
                      {output.breakdown.neonoExtraSeats > 0 && (
                        <li>Extra seats ({input.teamSize - (input.plan === 'starter' ? 2 : 5)}): {formatCurrency(output.breakdown.neonoExtraSeats)}/mo</li>
                      )}
                      <li>Includes: SMS, Website, Cart, QuickBooks, AI tools</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Competitor Stack</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Base plan: {formatCurrency(output.breakdown.competitorBase)}/mo</li>
                      {output.breakdown.competitorSeats > 0 && (
                        <li>Extra seats: {formatCurrency(output.breakdown.competitorSeats)}/mo</li>
                      )}
                      <li>SMS add-on: {formatCurrency(output.breakdown.competitorSMS)}/mo</li>
                      {output.breakdown.competitorWebsite > 0 && (
                        <li>Website: {formatCurrency(output.breakdown.competitorWebsite)}/mo</li>
                      )}
                      {output.breakdown.competitorCart > 0 && (
                        <li>Online store: {formatCurrency(output.breakdown.competitorCart)}/mo</li>
                      )}
                      {output.breakdown.competitorAccounting > 0 && (
                        <li>QuickBooks: {formatCurrency(output.breakdown.competitorAccounting)}/mo</li>
                      )}
                      {output.breakdown.competitorAI > 0 && (
                        <li>AI tools: {formatCurrency(output.breakdown.competitorAI)}/mo</li>
                      )}
                      {output.breakdown.competitorOther > 0 && (
                        <li>Other fees: {formatCurrency(output.breakdown.competitorOther)}/mo</li>
                      )}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-math">
              <AccordionTrigger>Payment Processing Math</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold">Monthly Processing Estimate</h4>
                    <p className="text-muted-foreground">
                      Based on {input.monthlyTx} transactions × ${input.aov} average order value
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">NeonO Rate</h4>
                    <p className="text-muted-foreground">
                      {formatPercent(input.neonORate.percent / 100)} + {input.neonORate.perTxCents}¢ = {formatCurrency(output.neonoProcessing)}/mo
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Competitor Rate</h4>
                    <p className="text-muted-foreground">
                      {formatPercent(input.competitorRate.percent / 100)} + {input.competitorRate.perTxCents}¢ = {formatCurrency(output.competitorProcessing)}/mo
                    </p>
                  </div>
                  <div className="p-3 bg-mint/10 rounded-lg">
                    <p className="text-sm font-medium text-mint-dark">
                      💡 Tips are excluded from processing fees with NeonO—your team keeps 100%.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="assumptions">
              <AccordionTrigger>Assumptions & Notes</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Competitor pricing based on common industry add-on costs</p>
                  <p>• SMS usage: {input.smsPerMonth} messages/month included with NeonO</p>
                  <p>• Processing rates vary by provider; estimates shown</p>
                  <p>• NeonO includes website, cart, QuickBooks, and AI at no extra cost</p>
                  <p>• Additional seats: NeonO ${9.99}/seat vs competitor ${input.competitorSeatPrice}/seat</p>
                  <p>• Calculations based on your specific inputs and current pricing</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}