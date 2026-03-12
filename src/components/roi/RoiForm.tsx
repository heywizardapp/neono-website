import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { RoiInput } from '@/types/roi';
import { DEFAULT_ROI_CONFIG, BUSINESS_TYPE_OPTIONS } from '@/config/roi';
import { PRICING } from '@/config/pricing';

interface RoiFormProps {
  input: RoiInput;
  onChange: (input: RoiInput) => void;
  onLoadPreset: (presetName: keyof typeof DEFAULT_ROI_CONFIG.presets) => void;
}

export function RoiForm({ input, onChange, onLoadPreset }: RoiFormProps) {
  const updateInput = (updates: Partial<RoiInput>) => {
    onChange({ ...input, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Preset Loader */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Start</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLoadPreset('solo')}
              className="touch-44"
            >
              Solo Business
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLoadPreset('growing')}
              className="touch-44"
            >
              Growing Team
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onLoadPreset('multiLocation')}
              className="touch-44"
            >
              Multi-Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="business-type">Business Type</Label>
            <Select value={input.businessType} onValueChange={(value) => updateInput({ businessType: value as RoiInput['businessType'] })}>
              <SelectTrigger id="business-type" className="touch-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_TYPE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="plan">NeonO Plan</Label>
            <RadioGroup 
              value={input.plan} 
              onValueChange={(value) => updateInput({ plan: value as 'starter' | 'growth' })}
              className="flex gap-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="starter" id="starter" />
                <Label htmlFor="starter">Starter ({PRICING.starter.priceDisplay}/mo)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="growth" id="growth" />
                <Label htmlFor="growth">Growth ({PRICING.growth.priceDisplay}/mo)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="team-size">Team Size (with logins)</Label>
            <Input
              id="team-size"
              type="number"
              value={input.teamSize}
              onChange={(e) => updateInput({ teamSize: parseInt(e.target.value) || 1 })}
              min="1"
              max="50"
              className="touch-44"
              aria-describedby="team-size-help"
            />
            <div id="team-size-help" className="text-xs text-muted-foreground mt-1">
              Number of staff needing calendar/booking access
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="aov">Average Order Value</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="aov"
                type="number"
                value={input.aov}
                onChange={(e) => updateInput({ aov: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                className="pl-8 touch-44"
                aria-describedby="aov-help"
              />
            </div>
            <div id="aov-help" className="text-xs text-muted-foreground mt-1">
              Average service + retail per transaction
            </div>
          </div>

          <div>
            <Label htmlFor="monthly-tx">Monthly Transactions</Label>
            <Input
              id="monthly-tx"
              type="number"
              value={input.monthlyTx}
              onChange={(e) => updateInput({ monthlyTx: parseInt(e.target.value) || 0 })}
              min="0"
              className="touch-44"
              aria-describedby="monthly-tx-help"
            />
            <div id="monthly-tx-help" className="text-xs text-muted-foreground mt-1">
              Total card transactions per month
            </div>
          </div>

          <div>
            <Label htmlFor="sms-count">SMS Messages per Month</Label>
            <Input
              id="sms-count"
              type="number"
              value={input.smsPerMonth}
              onChange={(e) => updateInput({ smsPerMonth: parseInt(e.target.value) || 0 })}
              min="0"
              className="touch-44"
              aria-describedby="sms-help"
            />
            <div id="sms-help" className="text-xs text-muted-foreground mt-1">
              Appointment reminders, marketing messages
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Used */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Features You Use</CardTitle>
          <p className="text-sm text-muted-foreground">All included free with NeonO</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="website-cart"
              checked={input.websiteCart}
              onCheckedChange={(checked) => updateInput({ websiteCart: checked })}
            />
            <Label htmlFor="website-cart">Website + Online Store</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="accounting"
              checked={input.accounting}
              onCheckedChange={(checked) => updateInput({ accounting: checked })}
            />
            <Label htmlFor="accounting">QuickBooks Integration</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="ai-automation"
              checked={input.aiAutomation}
              onCheckedChange={(checked) => updateInput({ aiAutomation: checked })}
            />
            <Label htmlFor="ai-automation">AI Tools & Automation</Label>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Competitor Details</CardTitle>
          <p className="text-sm text-muted-foreground">Help us compare accurately</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="competitor-base">Base Plan Cost</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="competitor-base"
                type="number"
                value={input.competitorBase}
                onChange={(e) => updateInput({ competitorBase: parseFloat(e.target.value) || 0 })}
                min="0"
                className="pl-8 touch-44"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="competitor-seats">Included Seats</Label>
            <Input
              id="competitor-seats"
              type="number"
              value={input.competitorIncludedSeats}
              onChange={(e) => updateInput({ competitorIncludedSeats: parseInt(e.target.value) || 1 })}
              min="1"
              className="touch-44"
            />
          </div>

          <div>
            <Label htmlFor="competitor-seat-price">Extra Seat Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="competitor-seat-price"
                type="number"
                value={input.competitorSeatPrice}
                onChange={(e) => updateInput({ competitorSeatPrice: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                className="pl-8 touch-44"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="other-fee">Other Monthly Fees</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="other-fee"
                type="number"
                value={input.otherFixedFee}
                onChange={(e) => updateInput({ otherFixedFee: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                className="pl-8 touch-44"
                aria-describedby="other-fee-help"
              />
            </div>
            <div id="other-fee-help" className="text-xs text-muted-foreground mt-1">
              Any other fixed monthly costs
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Processing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Processing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>NeonO Rate (choose one)</Label>
            <RadioGroup 
              value={`${input.neonORate.percent}-${input.neonORate.perTxCents}`}
              onValueChange={(value) => {
                const [percent, cents] = value.split('-').map(Number);
                updateInput({ neonORate: { percent, perTxCents: cents } });
              }}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2.6-10" id="rate-a" />
                <Label htmlFor="rate-a">2.6% + 10¢ per transaction</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2.5-20" id="rate-b" />
                <Label htmlFor="rate-b">2.5% + 20¢ per transaction</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Competitor Rate</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="comp-percent">Percentage</Label>
                <div className="relative">
                  <Input
                    id="comp-percent"
                    type="number"
                    value={input.competitorRate.percent}
                    onChange={(e) => updateInput({ 
                      competitorRate: { 
                        ...input.competitorRate, 
                        percent: parseFloat(e.target.value) || 0 
                      } 
                    })}
                    min="0"
                    max="10"
                    step="0.1"
                    className="pr-8 touch-44"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>
              <div>
                <Label htmlFor="comp-cents">Per Transaction</Label>
                <div className="relative">
                  <Input
                    id="comp-cents"
                    type="number"
                    value={input.competitorRate.perTxCents}
                    onChange={(e) => updateInput({ 
                      competitorRate: { 
                        ...input.competitorRate, 
                        perTxCents: parseFloat(e.target.value) || 0 
                      } 
                    })}
                    min="0"
                    step="1"
                    className="pr-8 touch-44"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">¢</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}