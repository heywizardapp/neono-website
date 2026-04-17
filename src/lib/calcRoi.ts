import { RoiInput, RoiOutput } from '@/types/roi';
import { DEFAULT_ROI_CONFIG } from '@/config/roi';

export function calcRoi(input: RoiInput): RoiOutput {
  const config = DEFAULT_ROI_CONFIG;

  // NeonO Software Cost: $24.99/seat, capped at 7 seats ($174.93)
  const billableSeats = Math.min(input.teamSize, config.neono.maxBillableSeats);
  const neonoSoftware = billableSeats * config.neono.pricePerSeat;

  // Competitor Software Cost
  const competitorExtraSeats = Math.max(0, input.teamSize - input.competitorIncludedSeats);
  let competitorAddOns = input.competitorBase + (competitorExtraSeats * input.competitorSeatPrice);

  // Always-on competitor add-on costs (NeonO includes these for free)
  // Loyalty program
  competitorAddOns += config.competitor.addOns.loyalty;
  // Insights (per team member)
  competitorAddOns += config.competitor.addOns.insights * input.teamSize;
  // Google rating boost
  competitorAddOns += config.competitor.addOns.googleBoost;
  // SMS is always included with NeonO
  competitorAddOns += config.competitor.addOns.sms;

  // Optional competitor add-on costs
  if (input.websiteCart) {
    competitorAddOns += config.competitor.addOns.onlineStore + config.competitor.addOns.website;
  }
  if (input.accounting) {
    competitorAddOns += config.competitor.addOns.quickbooks;
  }

  const competitorSoftware = competitorAddOns + input.otherFixedFee;

  // Processing Costs
  const neonoProcessing = input.monthlyTx * (
    (input.aov * input.neonORate.percent / 100) + (input.neonORate.perTxCents / 100)
  );

  const competitorProcessing = input.monthlyTx * (
    (input.aov * input.competitorRate.percent / 100) + (input.competitorRate.perTxCents / 100)
  );

  // Totals
  const neonoTotal = neonoSoftware + neonoProcessing;
  const competitorTotal = competitorSoftware + competitorProcessing;
  const monthlySavings = competitorTotal - neonoTotal;
  const yearlySavings = monthlySavings * 12;

  // Payback calculation
  const paybackMonths = input.hardwareCredit && input.hardwareCredit > 0
    ? Math.ceil(input.hardwareCredit / Math.max(1, monthlySavings))
    : null;

  // Breakdown for transparency
  const breakdown = {
    neonoSeats: billableSeats,
    neonoPricePerSeat: config.neono.pricePerSeat,
    neonoSoftwareTotal: neonoSoftware,
    competitorBase: input.competitorBase,
    competitorSeats: competitorExtraSeats * input.competitorSeatPrice,
    competitorSMS: config.competitor.addOns.sms,
    competitorLoyalty: config.competitor.addOns.loyalty,
    competitorInsights: config.competitor.addOns.insights * input.teamSize,
    competitorGoogleBoost: config.competitor.addOns.googleBoost,
    competitorWebsite: input.websiteCart ? config.competitor.addOns.website : 0,
    competitorCart: input.websiteCart ? config.competitor.addOns.onlineStore : 0,
    competitorAccounting: input.accounting ? config.competitor.addOns.quickbooks : 0,
    competitorOther: input.otherFixedFee,
  };

  return {
    neonoSoftware,
    competitorSoftware,
    neonoProcessing,
    competitorProcessing,
    neonoTotal,
    competitorTotal,
    monthlySavings,
    yearlySavings,
    paybackMonths,
    breakdown,
  };
}
