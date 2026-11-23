import React from 'react';
import { ActiveSection, usePula } from '../context/PulaContext';
import { MonogramSealSvg, PaoSymbolSvg } from './ApothecaryArt';

interface FooterProps {
  onNavigate: (section: ActiveSection) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { openOrderDrawer, openBarberModal } = usePula();

  return (
    <footer className="mt-14 border-t border-charcoal bg-cream-dark/60 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center pb-10 border-b border-charcoal/30">
          {/* Left: Circular PŪ Monogram Seal Stamp */}
          <div className="md:col-span-4 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <MonogramSealSvg className="w-28 h-28 sm:w-32 sm:h-32 shrink-0" />
            <div>
              <p className="font-display font-bold text-xl tracking-[0.32em] text-charcoal mb-1">
                PŪLA
              </p>
              <p className="font-mono text-xs text-stone mb-2">Highland-Crafted Grooming</p>
              <p className="font-mono text-[11px] text-ochre font-bold uppercase tracking-wider">
                Maseru, Lesotho
              </p>
            </div>
          </div>

          {/* Middle: Navigation & Account */}
          <div className="md:col-span-5 grid grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal mb-3">
                Apothecary
              </h3>
              <ul className="space-y-2 font-mono text-xs text-stone">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('story')}
                    className="hover:text-ochre transition-colors cursor-pointer"
                  >
                    Brand Story
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('formula')}
                    className="hover:text-ochre transition-colors cursor-pointer"
                  >
                    Formula &amp; INCI
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('ritual')}
                    className="hover:text-ochre transition-colors cursor-pointer"
                  >
                    Drop Calculator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('stockists')}
                    className="hover:text-ochre transition-colors cursor-pointer"
                  >
                    Barber Wholesale
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal mb-3">
                Connect &amp; Orders
              </h3>
              <ul className="space-y-2 font-mono text-xs text-stone">
                <li>
                  <a
                    href="https://instagram.com/pulagrooming"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ochre transition-colors"
                  >
                    Instagram: @pulagrooming
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openOrderDrawer}
                    className="hover:text-ochre transition-colors cursor-pointer text-left"
                  >
                    Order Batch 001
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openBarberModal('wholesale')}
                    className="hover:text-ochre transition-colors cursor-pointer text-left"
                  >
                    Stockist Inquiries
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: 12M PAO Compliance */}
          <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between gap-4">
            <div className="flex items-center gap-3 border border-charcoal bg-cream px-4 py-3 rounded-sm">
              <PaoSymbolSvg className="w-9 h-9 shrink-0" />
              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-charcoal">
                  Period After Opening
                </p>
                <p className="font-mono text-[10px] text-stone">30 ml e · Cruelty-Free</p>
              </div>
            </div>
            <p className="font-mono text-[11px] text-stone md:text-right">
              100% Natural · Zero Synthetics
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-stone">
          <p>© 2026 PŪLA Grooming. Crafted in Maseru, Lesotho.</p>
          <p className="uppercase tracking-[0.14em] font-bold text-charcoal">
            Batch 001 · Small-Batch Grooming
          </p>
        </div>
      </div>
    </footer>
  );
}
