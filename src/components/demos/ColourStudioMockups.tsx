import * as React from 'react';

const MockupContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full h-full min-h-[300px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 mx-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md max-w-xs" />
      </div>
    </div>
    <div className="p-4 h-[calc(100%-52px)] overflow-hidden">
      {children}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  1. WeighMockup — Bowl builder with ingredients                    */
/* ------------------------------------------------------------------ */
export const WeighMockup = () => (
  <MockupContainer>
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary">Bowl 1 — Roots</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">Active</span>
        </div>
        <span className="text-xs font-mono text-slate-400">00:00</span>
      </div>

      {/* Ingredient rows */}
      <div className="space-y-2">
        {[
          { colour: 'bg-amber-700', name: 'Davines Mask 7.1', qty: '30g', cost: '$12.60' },
          { colour: 'bg-slate-300', name: '20 Vol Developer', qty: '45g', cost: '$3.55' },
          { colour: 'bg-sky-400', name: 'Olaplex No.1', qty: '5ml', cost: '$2.25' },
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${row.colour} ring-1 ring-black/10`} />
              <div>
                <div className="text-xs font-medium">{row.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500">{row.qty}</span>
              <span className="text-xs font-semibold">{row.cost}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
        <span className="text-xs text-slate-500">Bowl Cost</span>
        <span className="text-sm font-bold text-primary">$18.40</span>
      </div>

      {/* Add button */}
      <button className="w-full py-2 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
        + Add Ingredient
      </button>
    </div>
  </MockupContainer>
);

/* ------------------------------------------------------------------ */
/*  2. TrackMockup — Waste reweigh                                    */
/* ------------------------------------------------------------------ */
export const TrackMockup = () => (
  <MockupContainer>
    <div className="space-y-3">
      <div className="text-sm font-semibold text-primary">Waste Reweigh</div>

      {/* Table header */}
      <div className="grid grid-cols-4 gap-2 text-[10px] font-medium text-slate-400 px-2">
        <span>Product</span>
        <span className="text-right">Used</span>
        <span className="text-right">Waste</span>
        <span className="text-right">Cost</span>
      </div>

      {/* Rows */}
      {[
        { name: 'Davines Mask 7.1', used: '30g', waste: '3g', cost: '$1.26' },
        { name: '20 Vol Developer', used: '45g', waste: '4g', cost: '$0.32' },
        { name: 'Olaplex No.1', used: '5ml', waste: '1ml', cost: '$0.45' },
      ].map((row, i) => (
        <div key={i} className="grid grid-cols-4 gap-2 items-center p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <span className="text-xs font-medium truncate">{row.name}</span>
          <span className="text-xs text-slate-500 text-right">{row.used}</span>
          <span className="text-xs text-amber-600 dark:text-amber-400 text-right">{row.waste}</span>
          <span className="text-xs font-semibold text-right">{row.cost}</span>
        </div>
      ))}

      {/* Summary */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
        <span className="text-xs text-slate-500">Total Waste: 8g (10%)</span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <span>↓</span> improving
        </span>
      </div>
    </div>
  </MockupContainer>
);

/* ------------------------------------------------------------------ */
/*  3. BillMockup — POS checkout with colour charge                   */
/* ------------------------------------------------------------------ */
export const BillMockup = () => (
  <MockupContainer>
    <div className="space-y-3">
      <div className="text-sm font-semibold text-primary">Checkout — Sarah M.</div>

      {/* Line items */}
      <div className="space-y-2">
        {[
          { name: 'Balayage & Cut', price: '$185.00', badge: null },
          { name: 'Colour Products Used', price: '$27.60', badge: 'Colour Studio' },
          { name: 'Deep Conditioning', price: '$25.00', badge: null },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">{item.name}</span>
              {item.badge && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold">{item.price}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Subtotal</span>
          <span>$237.60</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Tip (18%)</span>
          <span>$42.77</span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-1">
          <span>Total</span>
          <span className="text-primary">$280.37</span>
        </div>
      </div>

      {/* POS badge */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-medium">
          Push to POS ✓
        </span>
      </div>
    </div>
  </MockupContainer>
);

/* ------------------------------------------------------------------ */
/*  4. SaveMockup — Formula saved confirmation                        */
/* ------------------------------------------------------------------ */
export const SaveMockup = () => (
  <MockupContainer>
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Formula Saved ✓</span>
      </div>

      {/* Client & service */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Client</span>
          <span className="font-medium">Sarah Martinez</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Service</span>
          <span className="font-medium">Balayage — v3</span>
        </div>
      </div>

      {/* Formula breakdown */}
      <div className="space-y-2 pt-1">
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Bowl 1 — Roots</div>
          <div className="text-xs text-slate-600 dark:text-slate-300">Davines Mask 7.1, 20 Vol Developer, Olaplex No.1</div>
        </div>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Bowl 2 — Ends</div>
          <div className="text-xs text-slate-600 dark:text-slate-300">Davines Mask 9.0, 30 Vol Developer</div>
        </div>
      </div>

      {/* Photo thumbnails */}
      <div className="space-y-1">
        <div className="text-[10px] font-medium text-slate-400">Photos</div>
        <div className="flex gap-2">
          {['Before', 'Bowl', 'After'].map((label) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full aspect-square rounded-md bg-slate-200 dark:bg-slate-700" />
              <span className="text-[9px] text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Cost: <span className="font-medium text-slate-700 dark:text-slate-200">$18.40</span></span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Waste: 10% ↓</span>
        </div>
        <span className="text-[10px] px-2 py-1 rounded bg-primary/10 text-primary font-medium">Repeat next visit</span>
      </div>
    </div>
  </MockupContainer>
);

/* ------------------------------------------------------------------ */
/*  Step 5 — Client Self-Checkout via SMS                             */
/* ------------------------------------------------------------------ */
const SendMockup = () => (
  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden max-w-[280px] mx-auto">
    {/* Phone frame */}
    <div className="bg-slate-800 px-4 py-2 flex justify-between items-center">
      <span className="text-white text-xs">9:41 AM</span>
      <div className="flex gap-1">
        <div className="w-3 h-3 rounded-full border border-white/40" />
        <div className="w-4 h-3 rounded-sm border border-white/40" />
      </div>
    </div>
    <div className="bg-white dark:bg-slate-900 p-5 space-y-4">
      <div className="text-center space-y-1">
        <div className="w-10 h-10 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
          <span className="text-primary font-bold text-sm">N</span>
        </div>
        <p className="text-xs text-slate-500">Luxe Hair Studio</p>
      </div>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Balayage & Cut</span>
          <span className="font-medium">$185.00</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Colour Products</span>
          <span className="font-medium">$27.60</span>
        </div>
        <div className="border-t pt-2 flex justify-between text-xs font-bold">
          <span>Total</span>
          <span className="text-primary">$212.60</span>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-slate-500 text-center">Add a tip</p>
        <div className="flex gap-2 justify-center">
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-medium">15%</button>
          <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold ring-1 ring-primary/30">20%</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-medium">25%</button>
        </div>
      </div>
      <button className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-semibold">
        Pay $255.12
      </button>
      <p className="text-[10px] text-slate-400 text-center">Secured by Stripe</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Mapping helper                                                    */
/* ------------------------------------------------------------------ */
export function getColourMockup(step: string) {
  switch (step) {
    case 'weigh': return <WeighMockup />;
    case 'track': return <TrackMockup />;
    case 'bill':  return <BillMockup />;
    case 'save':  return <SaveMockup />;
    case 'send':  return <SendMockup />;
    default:      return <WeighMockup />;
  }
}
