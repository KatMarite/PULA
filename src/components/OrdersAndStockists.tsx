import React from 'react';
import { motion } from 'motion/react';
import { BARBER_STATUS_LABELS } from '../types/pula';
import { usePula } from '../context/PulaContext';
import { StudioMedia } from './ApothecaryArt';

interface OrdersAndStockistsProps {
  onOpenLightboxById: (photoId: 'barbershop') => void;
}

export function OrdersAndStockists({ onOpenLightboxById }: OrdersAndStockistsProps) {
  const { user, barberInquiries, openBarberModal } = usePula();

  const myInquiries = user
    ? barberInquiries.filter((inq) => inq.userId === user.uid)
    : barberInquiries;

  return (
    <section id="section-stockists" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="border border-charcoal bg-charcoal text-cream rounded-sm overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Trade Pitch */}
          <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-cream/20 flex flex-col justify-between space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ochre font-bold mb-2">
                05. Barbershop Partners
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide text-cream mb-4">
                Stock PŪLA on Your Barber Station.
              </h2>
              <p className="text-cream/80 text-base leading-relaxed max-w-xl mb-6">
                Give your clients a crisp, 100% natural finish after every fade and beard lineup.
                We offer flexible wholesale pricing, low minimum starter cases (from 5 boxed
                bottles), and complimentary 5ml chair testers for barbershops in Lesotho.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-cream/20 font-mono text-xs">
                <div>
                  <p className="text-ochre font-bold uppercase mb-1">Free 5ml Chair Tester</p>
                  <p className="text-cream/75 font-sans text-xs leading-relaxed">
                    Test 01 Fresh Citrus &amp; Woods on live clients before stocking a single
                    retail unit.
                  </p>
                </div>
                <div>
                  <p className="text-ochre font-bold uppercase mb-1">Retail &amp; Consignment</p>
                  <p className="text-cream/75 font-sans text-xs leading-relaxed">
                    Generous barbershop margin with direct local restocking across Maseru.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => openBarberModal('tester')}
                className="px-6 py-3.5 min-h-[48px] bg-ochre text-cream hover:bg-cream hover:text-charcoal transition-colors rounded-sm font-mono text-xs uppercase tracking-[0.12em] font-bold whitespace-nowrap cursor-pointer"
              >
                Request Free 5ml Tester
              </button>
              <button
                type="button"
                onClick={() => openBarberModal('wholesale')}
                className="px-6 py-3.5 min-h-[48px] border border-cream/40 text-cream hover:bg-cream/10 transition-colors rounded-sm font-mono text-xs uppercase tracking-[0.12em] font-bold whitespace-nowrap cursor-pointer"
              >
                Wholesale Rate Card
              </button>
            </div>

            {/* Live Trade Inquiries */}
            {myInquiries.length > 0 && (
              <div className="pt-4 border-t border-cream/20 space-y-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ochre font-bold">
                  Your Trade Requests
                </p>
                <div className="space-y-2">
                  {myInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-3 bg-cream/5 border border-cream/20 rounded-sm flex flex-wrap items-center justify-between gap-2 font-mono text-xs"
                    >
                      <div>
                        <span className="font-bold text-cream">{inq.shopName}</span>
                        <span className="text-cream/65 ml-2">
                          · {inq.requestType === 'tester' ? '5ml Tester' : 'Wholesale'} ·{' '}
                          {inq.location}
                        </span>
                      </div>
                      <span className="text-ochre font-bold uppercase">
                        {BARBER_STATUS_LABELS[inq.status]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Barbershop Photo + Spec Sheet */}
          <div className="lg:col-span-5 bg-cream/5 flex flex-col justify-between">
            <div className="p-6 sm:p-7 pb-0">
              <button
                type="button"
                onClick={() => onOpenLightboxById('barbershop')}
                className="relative w-full aspect-[16/10] border border-cream/30 rounded-sm overflow-hidden bg-slatebg group cursor-zoom-in block text-left"
                aria-label="Zoom Maseru Barbershop station showcase"
              >
                <StudioMedia
                  photoId="barbershop"
                  alt="PŪLA Conditioning Beard Oil displayed on a wooden Maseru barbershop station"
                />
                <div className="pointer-events-none absolute top-2.5 left-2.5 bg-charcoal/90 border border-cream/30 px-2.5 py-0.5 rounded-sm">
                  <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-ochre uppercase">
                    On The Station · Maseru
                  </span>
                </div>
              </button>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/60 mb-4 pb-3 border-b border-cream/20">
                  Stockist Spec Sheet · Batch 001
                </p>
                <dl className="space-y-3 font-mono text-xs">
                  <div className="flex items-baseline justify-between gap-4 border-b border-cream/15 pb-2.5">
                    <dt className="text-cream/65 shrink-0">RETAIL RRP</dt>
                    <dd className="text-cream font-bold tabular-nums text-right">M220 / 30ml Boxed</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-cream/15 pb-2.5">
                    <dt className="text-cream/65 shrink-0">SHELF FOOTPRINT</dt>
                    <dd className="text-cream font-bold tabular-nums text-right">38 × 38 × 110 mm</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-cream/15 pb-2.5">
                    <dt className="text-cream/65 shrink-0">STARTER CASE</dt>
                    <dd className="text-cream font-bold text-right">5 Units + 1 Tester</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-cream/15 pb-2.5">
                    <dt className="text-cream/65 shrink-0">DELIVERY ZONES</dt>
                    <dd className="text-cream font-bold text-right">Maseru, Roma, Mazenod</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-cream/65 shrink-0">DIRECT TRADE DESK</dt>
                    <dd className="text-ochre font-bold text-right">@pulagrooming</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 pt-5 border-t border-cream/20 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full border border-cream/40 flex items-center justify-center font-display font-bold text-sm tracking-widest text-cream shrink-0">
                  PŪ
                </div>
                <p className="text-xs text-cream/75 leading-relaxed">
                  &ldquo;Clean matte packaging that stands out on a barber station—and
                  smells like fresh citrus and cedar, not synthetic perfume.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
