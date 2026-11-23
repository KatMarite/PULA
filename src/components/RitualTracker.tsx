import React, { useState } from 'react';
import { Check, Droplets, RotateCcw, Trash2 } from 'lucide-react';
import { BEARD_STAGES, BeardStage, getTodayDateKey } from '../types/pula';
import { usePula } from '../context/PulaContext';
import { StudioMedia } from './ApothecaryArt';

interface RitualTrackerProps {
  onOpenLightboxById: (photoId: 'ritual') => void;
}

export function RitualTracker({ onOpenLightboxById }: RitualTrackerProps) {
  const {
    profile,
    ritualLogs,
    selectedStage,
    selectBeardStage,
    logDailyRitual,
    resetBottleCounter,
    deleteRitualLog,
    addToCartAndOpen,
    editions,
  } = usePula();

  const [ritualNote, setRitualNote] = useState('');
  const [logging, setLogging] = useState(false);

  const stageSpec = BEARD_STAGES[selectedStage];
  const todayKey = getTodayDateKey();
  const loggedToday = profile?.lastRitualDate === todayKey;
  const remainingDrops = profile?.bottleDropsRemaining ?? 600;
  const bottlePct = Math.round((remainingDrops / 600) * 100);
  const estDaysLeft = Math.max(0, Math.floor(remainingDrops / stageSpec.defaultDrops));
  const singlePrice = editions.find((e) => e.id === 'single')?.price ?? 220;

  const handleLogRitual = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogging(true);
    try {
      const ok = await logDailyRitual(ritualNote);
      if (ok) setRitualNote('');
    } finally {
      setLogging(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* LEFT COLUMN: 3-Step Apothecary Routine + Real-Time Synced Ritual Check-In */}
        <div className="lg:col-span-6 border border-charcoal bg-cream rounded-sm flex flex-col justify-between overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-charcoal bg-cream-dark/50">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ochre font-bold mb-1">
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
            ].map((item) => (
              <div key={item.step} className="p-5 sm:p-6 flex gap-4">
                <div className="w-10 h-10 rounded-sm border border-charcoal bg-cream-dark flex items-center justify-center font-mono text-xs font-bold text-charcoal shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-charcoal mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Drop Calculator + Live Firebase Ritual & Bottle Sync */}
        <div className="lg:col-span-6 border border-charcoal bg-cream-dark/45 rounded-sm flex flex-col justify-between overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-charcoal bg-charcoal text-cream flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ochre font-bold mb-1">
                Synced Dosage &amp; Bottle Tracker
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
                {(Object.keys(BEARD_STAGES) as BeardStage[]).map((stageKey) => {
                  const spec = BEARD_STAGES[stageKey];
                  const active = selectedStage === stageKey;
                  return (
                    <button
                      key={stageKey}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => selectBeardStage(stageKey)}
                      className={`text-left p-3.5 min-h-[72px] border border-charcoal rounded-sm transition-colors cursor-pointer ${
                        active
                          ? 'bg-charcoal text-cream'
                          : 'bg-cream text-charcoal hover:bg-cream-dark'
                      }`}
                    >
                      <span className="block font-mono text-[10px] text-ochre font-bold uppercase">
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
                  <p className="font-mono font-bold text-lg text-ochre tabular-nums">
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
                      <svg
                        key={i}
                        viewBox="0 0 18 22"
                        className={`w-4 h-5 transition-opacity ${
                          active ? 'opacity-100' : 'opacity-25'
                        }`}
                      >
                        <path
                          d="M9 1.5C9 1.5 2 9.8 2 14.3C2 18.2 5.1 21 9 21C12.9 21 16 18.2 16 14.3C16 9.8 9 1.5 9 1.5Z"
                          fill={active ? '#C86D1F' : 'none'}
                          stroke="#1C1B1B"
                          strokeWidth="1.4"
                        />
                      </svg>
                    );
                  })}
                </div>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal font-bold mb-1">
                Apothecary Tip
              </p>
              <p className="text-sm text-stone leading-relaxed">{stageSpec.tip}</p>
            </div>

            {/* Real-Time Firebase Synced Ritual & Bottle Level Panel */}
            <div className="border border-charcoal bg-cream-light rounded-sm p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ochre font-bold">
                    Daily Ritual Tracker
                  </p>
                  <p className="font-display font-bold text-base text-charcoal">
                    Your 30ml Bottle &amp; Daily Streak
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void resetBottleCounter()}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-stone hover:text-charcoal cursor-pointer"
                  title="Reset counter when opening a new 30ml bottle"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>New Bottle</span>
                </button>
              </div>

              {/* Bottle & Streak Metrics */}
                  <div className="grid grid-cols-3 gap-3 border-y border-charcoal/20 py-3 font-mono">
                    <div>
                      <p className="text-[10px] uppercase text-stone">Streak</p>
                      <p className="text-lg font-bold text-charcoal tabular-nums">
                        {profile?.streakDays ?? 0}d
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-stone">Bottle Left</p>
                      <p className="text-lg font-bold text-ochre tabular-nums">{bottlePct}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-stone">Est. Days</p>
                      <p className="text-lg font-bold text-charcoal tabular-nums">
                        ~{estDaysLeft}d
                      </p>
                    </div>
                  </div>

                  {/* Clean Bottle Level Bar */}
                  <div className="w-full h-2 bg-cream-dark border border-charcoal/30 rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-ochre transition-all duration-300"
                      style={{ width: `${bottlePct}%` }}
                    />
                  </div>

                  {/* Log Today Form */}
                  <form onSubmit={handleLogRitual} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      maxLength={240}
                      value={ritualNote}
                      onChange={(e) => setRitualNote(e.target.value)}
                      placeholder="Optional note (e.g. Post-shower, winter wind)"
                      className="flex-1 px-3 py-2.5 min-h-[44px] bg-cream border border-charcoal rounded-sm text-xs text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-1 focus:ring-ochre"
                    />
                    <button
                      type="submit"
                      disabled={logging}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-ochre text-cream hover:bg-charcoal transition-colors rounded-sm font-mono text-[11px] uppercase tracking-wider font-bold whitespace-nowrap cursor-pointer disabled:opacity-50"
                    >
                      {loggedToday ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Droplets className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {logging
                          ? 'Saving...'
                          : loggedToday
                            ? `Log Again (-${stageSpec.defaultDrops})`
                            : `Log Ritual (-${stageSpec.defaultDrops})`}
                      </span>
                    </button>
                  </form>

                  {/* Recent Synced Logs */}
                  {ritualLogs.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-stone">
                        Recent Check-Ins
                      </p>
                      <div className="divide-y divide-charcoal/15 border border-charcoal/25 bg-cream rounded-sm">
                        {ritualLogs.slice(0, 3).map((log) => (
                          <div
                            key={log.id}
                            className="px-3 py-2 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="min-w-0">
                              <span className="font-mono text-[11px] font-bold text-charcoal tabular-nums">
                                {log.dateKey}
                              </span>
                              <span className="font-mono text-[11px] text-ochre ml-2 tabular-nums">
                                {log.dropsUsed} drops
                              </span>
                              {log.note && (
                                <p className="text-[11px] text-stone truncate">{log.note}</p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => void deleteRitualLog(log.id)}
                              className="p-1.5 text-stone hover:text-charcoal cursor-pointer shrink-0"
                              aria-label="Delete ritual check-in"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="font-mono text-[11px] text-stone">
                {remainingDrops < 80 ? 'Running low on Batch 001?' : 'Ready to start your ritual?'}
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
