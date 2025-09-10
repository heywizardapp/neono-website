import { RoiInput, RoiOutput } from '@/types/roi';
import { DEFAULT_ROI_CONFIG } from '@/config/roi';

export function calcRoi(input: RoiInput): RoiOutput {
  const config = DEFAULT_ROI_CONFIG;
  
  // NeonO Software Cost
  const planConfig = input.plan === "starter" ? config.starter : config.growth;
  const extraSeats = Math.max(0, input.teamSize - planConfig.includedSeats);
  const neonoSoftware = planConfig.basePrice + (extraSeats * config.extraSeatPrice);
  
  // Competitor Software Cost
  const competitorExtraSeats = Math.max(0, input.teamSize - input.competitorIncludedSeats);
  let competitorAddOns = input.competitorBase + (competitorExtraSeats * input.competitorSeatPrice);
  
  // Add competitor add-on costs (NeonO includes these for free)
  if (input.websiteCart) {
    competitorAddOns += config.competitor.addOns.onlineStore + config.competitor.addOns.website;
  }
  if (input.accounting) {
    competitorAddOns += config.competitor.addOns.quickbooks;
  }
  if (input.aiAutomation) {
    competitorAddOns += config.competitor.addOns.ai;
  }
  // SMS is always included with NeonO, so always add competitor SMS cost
  competitorAddOns += config.competitor.addOns.sms;
  
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
    neonoBasePlan: planConfig.basePrice,
    neonoExtraSeats: extraSeats * config.extraSeatPrice,
    competitorBase: input.competitorBase,
    competitorSeats: competitorExtraSeats * input.competitorSeatPrice,
    competitorSMS: config.competitor.addOns.sms,
    competitorWebsite: input.websiteCart ? config.competitor.addOns.website : 0,
    competitorCart: input.websiteCart ? config.competitor.addOns.onlineStore : 0,
    competitorAccounting: input.accounting ? config.competitor.addOns.quickbooks : 0,
    competitorAI: input.aiAutomation ? config.competitor.addOns.ai : 0,
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