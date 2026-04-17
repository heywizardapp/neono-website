import * as React from 'react';
import { useI18n } from '@/hooks/useI18n';

interface Ingredient {
  nameKey: string;
  weight: string;
  cost: number;
  colour: string;
}

const INGREDIENTS: Ingredient[] = [
  { nameKey: 'colourDemo.ingredient1.name', weight: '30g', cost: 12.60, colour: '#8B6914' },
  { nameKey: 'colourDemo.ingredient2.name', weight: '45g', cost: 3.55, colour: '#C4A96A' },
  { nameKey: 'colourDemo.ingredient3.name', weight: '5ml', cost: 2.25, colour: '#D4C89A' },
];

const FILL_LEVELS = [0, 40, 80, 95];
const CUMULATIVE_COSTS = [0, 12.60, 16.15, 18.40];
const CLIENT_CHARGE = 27.60;
const MARGIN = 9.20;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}

function AnimatedCost({ target, duration = 600 }: { target: number; duration?: number }) {
  const [display, setDisplay] = React.useState(0);
  const rafRef = React.useRef<number>();
  const prevTarget = React.useRef(0);

  React.useEffect(() => {
    const start = prevTarget.current;
    const diff = target - start;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + diff * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevTarget.current = target;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return <>{display.toFixed(2)}</>;
}

export function ColourBowlDemo() {
  const { t } = useI18n();
  const reducedMotion = usePrefersReducedMotion();

  // Animation state: 0 = idle, 1-3 = ingredient added, 4 = margin shown, 5 = waste shown
  const [step, setStep] = React.useState(reducedMotion ? 5 : 0);
  const [hasTriggered, setHasTriggered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timersRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  // IntersectionObserver to trigger animation on scroll
  React.useEffect(() => {
    if (reducedMotion) {
      setStep(5);
      setHasTriggered(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered, reducedMotion]);

  // Clean up timers on unmount
  React.useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  function startAnimation() {
    const delays = [1000, 2500, 4000, 5500, 7000];
    delays.forEach((delay, i) => {
      const timer = setTimeout(() => setStep(i + 1), delay);
      timersRef.current.push(timer);
    });
  }

  const visibleIngredients = Math.min(step, 3);
  const fillLevel = FILL_LEVELS[visibleIngredients];
  const currentCost = CUMULATIVE_COSTS[visibleIngredients];
  const showMargin = step >= 4;
  const showWaste = step >= 5;

  // Bowl gradient colours based on how many ingredients are in
  const bowlGradient = React.useMemo(() => {
    if (visibleIngredients === 0) return 'transparent';
    const colours = INGREDIENTS.slice(0, visibleIngredients).map((ing) => ing.colour);
    if (colours.length === 1) return colours[0];
    return `linear-gradient(135deg, ${colours.join(', ')})`;
  }, [visibleIngredients]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink to-slate-900 p-6 sm:p-8 lg:p-10"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lavender/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-mint/5 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        {/* Left: Bowl Visual */}
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-slate-400">
            {t('colourDemo.title')}
          </p>

          {/* Mixing Bowl */}
          <div className="relative mx-auto h-52 w-52 sm:h-60 sm:w-60">
            {/* Bowl outline */}
            <div className="absolute inset-0 rounded-[40%_40%_50%_50%] border-2 border-slate-600/60 bg-slate-800/40 shadow-inner overflow-hidden">
              {/* Fill level */}
              <div
                className="absolute bottom-0 left-0 right-0 rounded-b-[45%] transition-all duration-1000 ease-out"
                style={{
                  height: `${fillLevel}%`,
                  background: bowlGradient,
                  opacity: fillLevel > 0 ? 0.85 : 0,
                }}
              />
              {/* Surface shimmer */}
              {fillLevel > 0 && (
                <div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 ease-out"
                  style={{ bottom: `${fillLevel}%` }}
                />
              )}
            </div>
            {/* Bowl rim highlight */}
            <div className="absolute -inset-px rounded-[40%_40%_50%_50%] border border-slate-500/20" />
          </div>

          {/* Cost counter below bowl */}
          <div className="mt-6 text-center">
            {!showMargin ? (
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  {t('colourDemo.productCost')}
                </p>
                <p className="text-3xl font-display font-bold text-white tabular-nums">
                  $<AnimatedCost target={currentCost} />
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-4 sm:gap-6 text-center">
                <div className="space-y-0.5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                    {t('colourDemo.productCost')}
                  </p>
                  <p className="text-lg font-display font-semibold text-slate-300 tabular-nums">
                    ${CUMULATIVE_COSTS[3].toFixed(2)}
                  </p>
                </div>
                <span className="text-slate-600 text-lg">&rarr;</span>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                    {t('colourDemo.clientCharge')}
                  </p>
                  <p className="text-lg font-display font-semibold text-slate-300 tabular-nums">
                    ${CLIENT_CHARGE.toFixed(2)}
                  </p>
                </div>
                <span className="text-slate-600 text-lg">&rarr;</span>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-mint uppercase tracking-wide">
                    {t('colourDemo.yourMargin')}
                  </p>
                  <p
                    className={`text-xl font-display font-bold text-mint tabular-nums ${
                      step === 4 ? 'animate-pulse' : ''
                    }`}
                  >
                    ${MARGIN.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Ingredient List */}
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-slate-400">
            {t('colourDemo.ingredients')}
          </p>

          <div className="space-y-3">
            {INGREDIENTS.map((ingredient, index) => {
              const isVisible = index < visibleIngredients;
              return (
                <div
                  key={ingredient.nameKey}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-500 ease-out ${
                    isVisible
                      ? 'translate-x-0 border-slate-700/80 bg-slate-800/60 opacity-100'
                      : 'translate-x-8 border-transparent bg-transparent opacity-0'
                  }`}
                  aria-hidden={!isVisible}
                >
                  {/* Colour swatch */}
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full ring-1 ring-white/10"
                      style={{ backgroundColor: ingredient.colour }}
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        {t(ingredient.nameKey)}
                      </p>
                      <p className="text-xs text-slate-500">{ingredient.weight}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white tabular-nums">
                    +${ingredient.cost.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Waste Indicator */}
          <div
            className={`mt-6 flex items-center gap-2 transition-all duration-700 ease-out ${
              showWaste
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            aria-hidden={!showWaste}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
            <p className="text-xs text-mint">
              {t('colourDemo.waste')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
