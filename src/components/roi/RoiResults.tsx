import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Share2, Download, TrendingUp, TrendingDown } from 'lucide-react';
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


  // Software-only savings (no processing fees shown)
  const softwareSavings = output.competitorSoftware - output.neonoSoftware;

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
              {formatCurrency(output.neonoSoftware)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Software + all features included
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
              {formatCurrency(output.competitorSoftware)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Base + required add-ons
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Highlight */}
      <Card className={`border-2 ${softwareSavings > 0 ? 'border-mint bg-mint/5' : 'border-destructive bg-destructive/5'}`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${softwareSavings > 0 ? 'text-mint' : 'text-destructive'} flex items-center justify-center gap-2`}>
              {softwareSavings > 0 ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
              {softwareSavings > 0 ? 'Save ' : 'Extra cost: '}
              {formatCurrency(Math.abs(softwareSavings))}
            </div>
            <div className="text-lg text-muted-foreground mt-1">each month</div>
            <div className={`text-2xl font-semibold mt-4 ${softwareSavings > 0 ? 'text-mint' : 'text-destructive'}`}>
              {softwareSavings > 0 ? 'Save ' : 'Extra cost: '}
              {formatCurrency(Math.abs(softwareSavings * 12))} per year
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
                <span className="font-medium">NeonO</span>
                <span className="font-semibold">{formatCurrency(output.neonoSoftware)}</span>
              </div>
              <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-primary rounded-lg flex items-center justify-end pr-2"
                  style={{ width: `${Math.min(100, (output.neonoSoftware / Math.max(output.neonoSoftware, output.competitorSoftware)) * 100)}%` }}
                  aria-label={`NeonO: ${formatCurrency(output.neonoSoftware)}`}
                >
                  <span className="text-xs text-white font-medium">
                    {output.neonoSoftware < output.competitorSoftware ? formatCurrency(output.neonoSoftware) : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Competitor Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Competitor Stack</span>
                <span className="font-semibold">{formatCurrency(output.competitorSoftware)}</span>
              </div>
              <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-slate-400 rounded-lg flex items-center justify-end pr-2"
                  style={{ width: `${Math.min(100, (output.competitorSoftware / Math.max(output.neonoSoftware, output.competitorSoftware)) * 100)}%` }}
                  aria-label={`Competitor: ${formatCurrency(output.competitorSoftware)}`}
                >
                  <span className="text-xs text-white font-medium">
                    {output.competitorSoftware < output.neonoSoftware ? formatCurrency(output.competitorSoftware) : ''}
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
                    <h4 className="font-semibold mb-2">NeonO ($24.99/seat, capped at 7)</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>{Math.min(input.teamSize, 7)} billable seat{Math.min(input.teamSize, 7) !== 1 ? 's' : ''} x $24.99 = {formatCurrency(output.neonoSoftware)}/mo</li>
                      {input.teamSize > 7 && (
                        <li>{input.teamSize - 7} additional seat{input.teamSize - 7 !== 1 ? 's' : ''}: FREE</li>
                      )}
                      <li>Includes: SMS, Website, Cart, QuickBooks, AI tools, Loyalty, Insights</li>
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
                      <li>Loyalty program: {formatCurrency(output.breakdown.competitorLoyalty)}/mo</li>
                      <li>Insights ({input.teamSize} members): {formatCurrency(output.breakdown.competitorInsights)}/mo</li>
                      <li>Google review boost: {formatCurrency(output.breakdown.competitorGoogleBoost)}/mo</li>
                      {output.breakdown.competitorWebsite > 0 && (
                        <li>Website: {formatCurrency(output.breakdown.competitorWebsite)}/mo</li>
                      )}
                      {output.breakdown.competitorCart > 0 && (
                        <li>Online store: {formatCurrency(output.breakdown.competitorCart)}/mo</li>
                      )}
                      {output.breakdown.competitorAccounting > 0 && (
                        <li>QuickBooks: {formatCurrency(output.breakdown.competitorAccounting)}/mo</li>
                      )}
                      {output.breakdown.competitorOther > 0 && (
                        <li>Other fees: {formatCurrency(output.breakdown.competitorOther)}/mo</li>
                      )}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="assumptions">
              <AccordionTrigger>Assumptions & Notes</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Competitor pricing based on published add-on costs (Fresha, Vagaro pricing pages)</p>
                  <p>• NeonO includes SMS, website, online store, loyalty, insights, and AI at no extra cost</p>
                  <p>• NeonO: $24.99/seat (max 7 billable, seats 8+ free)</p>
                  <p>• Competitor add-ons: loyalty ($79.95/mo), insights ($13.95/member), Google boost ($20.95/mo), SMS ($20/mo)</p>
                  <p>• Payment processing fees excluded — they apply to all platforms similarly</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}