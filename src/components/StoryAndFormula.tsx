import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CARRIER_OILS, SCENT_NOTES } from '../types/pula';
import { EucalyptusSvg, MalotiMountainsSvg, RaincloudSvg, StudioMedia } from './ApothecaryArt';

interface StoryAndFormulaProps {
  onOpenLightboxById: (photoId: 'botanicals') => void;
}

export function StoryAndFormula({ onOpenLightboxById }: StoryAndFormulaProps) {
  const [formulaTab, setFormulaTab] = useState<'carrier' | 'scent'>('carrier');
  const [inciOpen, setInciOpen] = useState(false);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. BRAND PHILOSOPHY STRIP */}
      <section id="section-story" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-charcoal bg-cream-dark/45 rounded-sm overflow-hidden">
          <div className="px-6 sm:px-8 py-4 border-b border-charcoal flex flex-wrap items-center justify-between gap-2 bg-cream-dark">
            <span className="font-mono text-xs uppercase tracking-[0.14em] font-bold text-charcoal">
              01. Brand Philosophy &amp; Highland Heritage
            </span>
            <span className="font-mono text-xs text-ochre-dark font-bold tabular-nums">
              29.3151° S, 27.4869° E · Maseru
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-charcoal">
            <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col items-center justify-center bg-cream text-center">
              <MalotiMountainsSvg className="w-44 sm:w-48 h-auto mb-3" />
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-stone">
                Fig 01 · Maloti Escarpment
              </span>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-cream">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-wide text-charcoal">
                  PŪLA{' '}
                  <span className="font-mono font-normal text-base sm:text-lg text-stone tracking-normal">
                    [POO-LAH]
                  </span>
                </h2>
                <span className="font-mono italic text-sm sm:text-base text-ochre-dark font-bold">
                  — Sesotho for &ldquo;Rain&rdquo;
                </span>
              </div>
              <p className="text-stone text-base leading-relaxed mb-4">
                In the Mountain Kingdom, rain is more than weather—it is renewal, blessing, and life
                returning to dry earth. High-altitude winters and dry winds in Lesotho demand more
                than perfumed mineral oils that merely coat the surface.
              </p>
              <p className="text-stone text-base leading-relaxed">
                Every bottle of{' '}
                <strong className="text-charcoal font-semibold">PŪLA Conditioning Beard Oil</strong>{' '}
                is blended by hand in Maseru using unrefined, cold-pressed Southern African and
                botanical oils that mimic your skin&apos;s natural sebum—hydrating deeply from
                follicle to tip while leaving a crisp aroma of bergamot, eucalyptus, and cedarwood.
              </p>
            </div>

            <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col items-center justify-center bg-cream text-center">
              <RaincloudSvg className="w-44 sm:w-48 h-auto mb-3" />
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-stone">
                Fig 02 · Highland Rain (Pūla)
              </span>
            </div>
          </div>

          {/* 4 Brand Pillars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-charcoal bg-cream-dark/50">
            {[
              {
                num: '01',
                title: 'Zero Silicones',
                body: 'No dimethicone or synthetic film-formers that suffocate follicles.',
              },
              {
                num: '02',
                title: 'Zero Mineral Oil',
                body: 'Free from petroleum byproducts and pore-clogging cheap fillers.',
              },
              {
                num: '03',
                title: '100% Plant-Derived',
                body: 'Pure cold-pressed nut & seed oils scented strictly with essential oils.',
              },
              {
                num: '04',
                title: 'Small-Batch Craft',
                body: 'Measured, blended, and bottled fresh in Maseru for peak potency.',
              },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`p-4 sm:p-6 border-charcoal ${
                  idx < 2 ? 'border-b lg:border-b-0' : ''
                } ${
                  idx % 2 === 0 ? 'border-r' : 'lg:border-r lg:last:border-r-0'
                }`}
              >
                <p className="font-mono text-[11px] text-ochre-dark font-bold mb-1">{pillar.num}</p>
                <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE FORMULA & SCENT PROFILE EXPLORER */}
      <section id="section-formula" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-charcoal bg-cream rounded-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-charcoal bg-cream-dark/50 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ochre-dark font-bold mb-2">
                02. Apothecary Formulation
              </p>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-charcoal tracking-tight">
                Nothing Hidden. Every Drop Earns Its Place.
              </h2>
            </div>

            {/* Interactive Segmented Tab Control */}
            <div
              className="grid grid-cols-2 sm:inline-flex border border-charcoal rounded-sm bg-cream p-1 gap-1 w-full sm:w-auto"
              role="tablist"
              aria-label="Formula explorer tabs"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                  e.preventDefault();
                  setFormulaTab((prev) => (prev === 'carrier' ? 'scent' : 'carrier'));
                }
              }}
            >
              <button
                id="tab-carrier"
                type="button"
                role="tab"
                aria-selected={formulaTab === 'carrier'}
                aria-controls="formula-tabpanel"
                onClick={() => setFormulaTab('carrier')}
                className={`px-4 py-2.5 min-h-[40px] rounded-sm font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  formulaTab === 'carrier'
                    ? 'bg-[#c86d1f] text-cream'
                    : 'text-charcoal hover:bg-cream-dark'
                }`}
              >
                Carrier Oils
              </button>
              <button
                id="tab-scent"
                type="button"
                role="tab"
                aria-selected={formulaTab === 'scent'}
                aria-controls="formula-tabpanel"
                onClick={() => setFormulaTab('scent')}
                className={`px-4 py-2.5 min-h-[40px] rounded-sm font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  formulaTab === 'scent'
                    ? 'bg-charcoal text-cream'
                    : 'text-charcoal hover:bg-cream-dark'
                }`}
              >
                01 Scent Notes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-charcoal">
            {/* Left Raw Botanicals Visual */}
            <div className="lg:col-span-4 bg-cream-dark/30 flex flex-col justify-between">
              <div className="p-5 sm:p-6">
                <button
                  type="button"
                  onClick={() => onOpenLightboxById('botanicals')}
                  className="relative w-full aspect-[4/3] border border-charcoal rounded-sm overflow-hidden bg-slatebg group cursor-zoom-in block text-left"
                  aria-label="Zoom raw botanicals study"
                >
                  <StudioMedia photoId="botanicals" alt="Raw botanical ingredients flat lay" />
                  <div className="pointer-events-none absolute top-2.5 left-2.5 bg-cream/95 border border-charcoal px-2 py-0.5 rounded-sm">
                    <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-charcoal uppercase">
                      Raw Botanicals
                    </span>
                  </div>
                </button>

                <div className="mt-4 space-y-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-stone">
                    Cold-Pressed Proof · <span className="text-ochre-dark font-bold">Zero Fillers</span>
                  </p>
                  <p className="text-sm text-stone leading-relaxed">
                    Unrefined Southern African Marula, golden Jojoba, Moroccan Argan, fresh
                    Eucalyptus leaves, Calabrian Bergamot rind, and Virginian Cedarwood—nothing
                    synthetic touches the glass.
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-3.5 border-t border-charcoal/30 bg-cream-dark/50 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
                <span className="text-charcoal font-bold">100% Plant-Derived Oils</span>
                <span className="text-stone">30 ml Amber Glass</span>
              </div>
            </div>

            {/* Right Tab Panel */}
            <div
              id="formula-tabpanel"
              role="tabpanel"
              aria-labelledby={formulaTab === 'carrier' ? 'tab-carrier' : 'tab-scent'}
              className="lg:col-span-8"
            >
              <AnimatePresence mode="wait">
                {formulaTab === 'carrier' ? (
                  <motion.div
                    key="carrier"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 sm:grid-cols-2 h-full"
                  >
                  {CARRIER_OILS.slice(0, 4).map((oil, idx) => (
                    <article
                      key={oil.code}
                      className={`p-6 flex flex-col justify-between border-b border-charcoal hover:bg-cream-dark/30 transition-colors ${
                        idx % 2 === 0 ? 'sm:border-r' : ''
                      }`}
                    >
                      <div>
                        <p className="font-mono text-[11px] text-stone uppercase tracking-wider mb-2">
                          <span className="text-ochre-dark font-bold">{oil.code}</span> · {oil.origin}
                        </p>
                        <h3 className="font-display font-bold text-lg text-charcoal mb-0.5">
                          {oil.name}
                        </h3>
                        <p className="font-mono italic text-[11px] text-stone mb-2.5">{oil.latin}</p>
                        <p className="text-sm text-stone leading-relaxed">{oil.description}</p>
                      </div>
                      <p className="mt-4 pt-3 border-t border-charcoal/20 font-mono text-[10px] uppercase tracking-wider text-charcoal font-bold">
                        Role: {oil.role}
                      </p>
                    </article>
                  ))}

                  {/* 5th Carrier: Full-width bottom row */}
                  <article className="p-6 sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-cream-dark/30 transition-colors">
                    <div>
                      <p className="font-mono text-[11px] text-stone uppercase tracking-wider mb-1">
                        <span className="text-ochre-dark font-bold">{CARRIER_OILS[4].code}</span> ·{' '}
                        {CARRIER_OILS[4].latin}
                      </p>
                      <h3 className="font-display font-bold text-lg text-charcoal mb-1">
                        {CARRIER_OILS[4].name}
                      </h3>
                      <p className="text-sm text-stone leading-relaxed max-w-2xl">
                        {CARRIER_OILS[4].description}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-charcoal font-bold">
                      Role: {CARRIER_OILS[4].role}
                    </span>
                  </article>
                  </motion.div>
                ) : (
                  <motion.div
                    key="scent"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-charcoal h-full"
                  >
                  <div className="md:col-span-4 p-6 flex flex-col items-center justify-center bg-cream-dark/25 text-center">
                    <EucalyptusSvg className="w-36 sm:w-40 h-auto mb-3" />
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-stone mb-1">
                      Fig 03 · Eucalyptus Smithii
                    </span>
                    <p className="font-mono text-[11px] text-ochre-dark font-bold">
                      Pure Essential Oils Only
                    </p>
                  </div>
                  <div className="md:col-span-8 divide-y divide-charcoal flex flex-col justify-between">
                    {SCENT_NOTES.map((note) => (
                      <div key={note.name} className="p-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ochre-dark font-bold mb-1.5">
                          {note.tier}
                        </p>
                        <div className="flex flex-wrap items-baseline gap-x-2 mb-1.5">
                          <h3 className="font-display font-bold text-lg text-charcoal">
                            {note.name}
                          </h3>
                          <span className="font-mono italic text-[11px] text-stone">
                            {note.latin}
                          </span>
                        </div>
                        <p className="text-sm text-stone leading-relaxed">{note.description}</p>
                      </div>
                    ))}
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Expandable Full INCI Transparency & Caution Accordion */}
          <div className="border-t border-charcoal bg-cream-dark/40">
            <button
              type="button"
              onClick={() => setInciOpen((prev) => !prev)}
              aria-expanded={inciOpen}
              aria-controls="inci-panel"
              className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left hover:bg-cream-dark/80 transition-colors cursor-pointer"
            >
              <div>
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-charcoal">
                  Full INCI Transparency &amp; Safety Caution
                </span>
                <span className="hidden sm:inline font-mono text-[11px] text-stone ml-3">
                  · Exact Label Declaration
                </span>
              </div>
              {inciOpen ? (
                <ChevronUp className="w-5 h-5 text-charcoal shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-charcoal shrink-0" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {inciOpen && (
                <motion.div
                  id="inci-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-t border-charcoal/30 bg-cream"
                >
                  <div className="px-6 sm:px-8 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                  <div className="lg:col-span-7">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-charcoal mb-2">
                      Ingredients (INCI)
                    </h4>
                    <p className="font-mono text-xs sm:text-[13px] leading-relaxed text-charcoal">
                      Simmondsia Chinensis (Jojoba) Seed Oil, Prunus Amygdalus Dulcis (Sweet
                      Almond) Oil, Argania Spinosa (Argan) Kernel Oil, Sclerocarya Birrea (Marula)
                      Seed Oil, Tocopherol, Citrus Aurantium Bergamia (Bergamot) Fruit Oil,
                      Juniperus Virginiana (Cedarwood) Wood Oil, Eucalyptus Smithii (Eucalyptus)
                      Leaf Oil, Boswellia Serrata (Frankincense) Oil, <em>Limonene*</em>,{' '}
                      <em>Linalool*</em>.
                    </p>
                    <p className="mt-2.5 font-mono italic text-[11px] text-stone">
                      *Naturally occurring aromatic components in pure essential oils.
                    </p>
                  </div>
                  <div className="lg:col-span-5 lg:border-l lg:border-charcoal/30 lg:pl-8">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ochre-dark mb-2">
                      Caution &amp; Storage
                    </h4>
                    <p className="text-xs sm:text-sm text-stone leading-relaxed">
                      For external use only.{' '}
                      <strong className="text-charcoal font-semibold">
                        Contains tree nut oils (Sweet Almond).
                      </strong>{' '}
                      Perform a patch test on your inner forearm 24 hours before first use;
                      discontinue if irritation occurs. Avoid direct eye contact. Store tightly
                      sealed in a cool, dark place away from direct sunlight. Best used within 12
                      months of opening (12M PAO).
                    </p>
                  </div>
                </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
