import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BEARD_STAGES, BeardStage } from '../types/pula';
import { usePula } from '../context/PulaContext';
import { StudioMedia } from './ApothecaryArt';

interface RitualTrackerProps {
  onOpenLightboxById: (photoId: 'ritual') => void;
}

export function RitualTracker({ onOpenLightboxById }: RitualTrackerProps) {
  const {
    selectedStage,
    selectBeardStage,
    addToCartAndOpen,
    editions,
  } = usePula();

  const stageSpec = BEARD_STAGES[selectedStage];
  const singlePrice = editions.find((e) => e.id === 'single')?.price ?? 220;

  const stageKeys = Object.keys(BEARD_STAGES) as BeardStage[];

  const handleStageKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowUp') {
      return;
    }
    e.preventDefault();
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const nextIdx = (idx + delta + stageKeys.length) % stageKeys.length;
    selectBeardStage(stageKeys[nextIdx]);
    const nextEl = document.getElementById(`beard-stage-${stageKeys[nextIdx]}`);
    nextEl?.focus();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* LEFT COLUMN: 3-Step Apothecary Routine */}
        <div className="lg:col-span-6 border border-charcoal bg-cream rounded-sm flex flex-col justify-between overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-charcoal bg-cream-dark/50">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ochre-dark font-bold mb-1">
              03. The Daily Ritual
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-charcoal tracking-tight">
              Three Steps After Every Shower.
            </h2>
          </div>

          <div className="p-4 sm:p-5 border-b border-charcoal bg-cream-dark/25">
            <button
              type="button"
              onClick={() => onOpenLightboxById('ritual')}
              className="relative w-full aspect-[16/10] border border-charcoal rounded-sm overflow-hidden bg-slatebg group cursor-zoom-in block text-left"
              aria-label="Zoom Daily Ritual studio scene"
            >
              <StudioMedia photoId="ritual" alt="PŪLA bottle beside hardwood comb on stone vanity" />
              <div className="pointer-events-none absolute top-2.5 left-2.5 bg-cream/95 border border-charcoal px-2.5 py-0.5 rounded-sm">
                <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-charcoal uppercase">
                  Morning Ritual · Damp Application
                </span>
              </div>
            </button>
          </div>

          <div className="divide-y divide-charcoal flex-1">
            {[
              {
                step: '01',
                title: 'Cleanse & Dampen',
                desc: 'Pat your beard towel-dry after a warm shower. Slightly damp hair and open pores allow cold-pressed oils to lock in hydration up to twice as effectively.',
              },
              {
                step: '02',
                title: 'Warm Between Palms',
                desc: 'Measure your recommended drops with the glass pipette into your palm. Rub hands together briskly for 3 seconds to awaken bergamot and cedar notes.',
              },
              {
                step: '03',
                title: 'Massage & Comb',
                desc: 'Work fingers upward into the skin beneath your beard first, then smooth downward through the length with a wooden comb or boar-bristle brush.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 sm:p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-sm border border-charcoal bg-cream-dark flex items-center justify-center font-mono text-xs font-bold text-charcoal shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-charcoal mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Drop Calculator */}
        <div className="lg:col-span-6 border border-charcoal bg-cream-dark/45 rounded-sm flex flex-col justify-between overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-charcoal bg-charcoal text-cream flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ochre font-bold mb-1">
                Dosage Guide &amp; Calculator
              </p>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                Beard Length Drop Calculator
              </h2>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-cream/80 tabular-nums whitespace-nowrap">
              30ml ≈ 600 drops
            </span>
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
            {/* Stage Selector */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone font-bold mb-3">
                Select Your Current Beard Stage
              </p>
              <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Beard length stage">
                {stageKeys.map((stageKey, idx) => {
                  const spec = BEARD_STAGES[stageKey];
                  const active = selectedStage === stageKey;
                  return (
                    <button
                      id={`beard-stage-${stageKey}`}
                      key={stageKey}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      tabIndex={active ? 0 : -1}
                      onKeyDown={(e) => handleStageKeyDown(e, idx)}
                      onClick={() => selectBeardStage(stageKey)}
                      className={`text-left p-3.5 min-h-[72px] border border-charcoal rounded-sm transition-colors cursor-pointer ${
                        active
                          ? 'bg-charcoal text-cream'
                          : 'bg-cream text-charcoal hover:bg-cream-dark'
                      }`}
                    >
                      <span
                        className={`block font-mono text-[10px] font-bold uppercase ${
                          active ? 'text-ochre' : 'text-ochre-dark'
                        }`}
                      >
                        {spec.step}
                      </span>
                      <span className="block font-display font-bold text-sm sm:text-base">
                        {spec.label}
                      </span>
                      <span
                        className={`block font-mono text-[10px] tabular-nums ${
                          active ? 'text-cream/75' : 'text-stone'
                        }`}
                      >
                        {spec.lengthRange}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Dosage Readout */}
            <div className="border border-charcoal bg-cream rounded-sm p-5">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-charcoal/25">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone mb-1">
                    Recommended Daily Dose
                  </p>
                  <p className="font-display font-extrabold text-3xl text-charcoal tabular-nums">
                    {stageSpec.dropsLabel}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone mb-1">
                    30ml Bottle Lasts
                  </p>
                  <p className="font-mono font-bold text-lg text-ochre-dark tabular-nums">
                    {stageSpec.daysLabel}
                  </p>
                </div>
              </div>

              {/* Droplet Visual */}
              <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                <span className="font-mono text-[10px] uppercase text-stone mr-1">Pipette</span>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const active = i < stageSpec.defaultDrops;
                    return (
                      <motion.svg
                        key={i}
                        viewBox="0 0 18 22"
                        animate={{
                          scale: active ? 1 : 0.85,
                          opacity: active ? 1 : 0.25,
                        }}
                        transition={{ duration: 0.22, delay: active ? i * 0.03 : 0 }}
                        className="w-4 h-5"
                      >
                        <path
                          d="M9 1.5C9 1.5 2 9.8 2 14.3C2 18.2 5.1 21 9 21C12.9 21 16 18.2 16 14.3C16 9.8 9 1.5 9 1.5Z"
                          fill={active ? '#C86D1F' : 'none'}
                          stroke="#1C1B1B"
                          strokeWidth="1.4"
                        />
                      </motion.svg>
                    );
                  })}
                </div>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal font-bold mb-1">
                Apothecary Tip
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={stageSpec.key}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="text-sm text-stone leading-relaxed"
                >
                  {stageSpec.tip}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="font-mono text-[11px] text-stone">
                Ready to start your ritual?
              </span>
              <button
                type="button"
                onClick={() => addToCartAndOpen('single')}
                className="font-mono text-xs uppercase tracking-wider font-bold text-charcoal hover:text-ochre underline underline-offset-4 cursor-pointer tabular-nums"
              >
                Add 30ml Bottle (M{singlePrice}) →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
