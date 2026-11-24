import React, { useState } from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem, GalleryPhotoId } from '../types/pula';
import { usePula } from '../context/PulaContext';
import { StudioMedia } from './ApothecaryArt';

const HERO_GALLERY_ORDER: GalleryPhotoId[] = ['botanicals', 'hero-box', 'gift-kit', 'box-back'];

const HERO_GALLERY_ITEMS: GalleryItem[] = HERO_GALLERY_ORDER
  .map((id) => GALLERY_ITEMS.find((item) => item.id === id))
  .filter((item): item is GalleryItem => Boolean(item));

interface HeroGalleryProps {
  onExploreFormula: () => void;
  onOpenLightbox: (index: number) => void;
}

export function HeroGallery({ onExploreFormula, onOpenLightbox }: HeroGalleryProps) {
  const { editions, addToCartAndOpen } = usePula();
  const [activeIdx, setActiveIdx] = useState(0);

  const singleEdition = editions.find((e) => e.id === 'single') || editions[0];
  const totalBottlesLeft = editions.reduce((acc, ed) => acc + (ed.stockCount || 0), 0);
  const activePhoto = HERO_GALLERY_ITEMS[activeIdx] || HERO_GALLERY_ITEMS[0];
  const activeLightboxIdx = Math.max(
    0,
    GALLERY_ITEMS.findIndex((item) => item.id === activePhoto.id)
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:py-10">
      <div className="border border-charcoal bg-cream rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* LEFT COLUMN: Apothecary Editorial Copy & CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-charcoal">
          {/* Top Metadata Strip (clean unboxed text with typographic separators) */}
          <div className="px-6 sm:px-8 py-3.5 border-b border-charcoal bg-cream-dark/60 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.12em]">
            <span className="text-charcoal font-bold">
              Batch 001 · Maseru, Lesotho
            </span>
            <span className="text-ochre font-bold tabular-nums">
              {totalBottlesLeft} Sets Available
            </span>
          </div>

          {/* Hero Main Content */}
          <div className="px-6 sm:px-8 lg:px-10 py-8 sm:py-12 flex-1 flex flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-stone mb-3">
              Conditioning Beard Oil · 01 Fresh Citrus &amp; Woods
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl xl:text-[52px] leading-[1.06] tracking-tight text-charcoal mb-5">
              Highland-Crafted Botanical Beard Care.
            </h1>
            <p className="text-stone text-base sm:text-[17px] leading-relaxed max-w-xl mb-7">
              Formulated in small batches in Maseru with cold-pressed Southern African{' '}
              <strong className="text-charcoal font-semibold">Marula, Jojoba, and Argan</strong> oils.
              Built to soften coarse hair, calm dry highland skin, and sync your orders live across
              every device.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => addToCartAndOpen('single')}
                className="inline-flex items-center justify-center gap-2.5 bg-ochre text-cream hover:bg-charcoal transition-colors px-6 py-4 min-h-[48px] rounded-sm font-mono text-xs sm:text-[13px] tracking-wider uppercase font-bold whitespace-nowrap cursor-pointer"
              >
                <span className="tabular-nums">
                  Order 01 Fresh Citrus — M{singleEdition?.price ?? 220}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreFormula}
                className="inline-flex items-center justify-center border border-charcoal bg-transparent hover:bg-cream-dark text-charcoal transition-colors px-6 py-4 min-h-[48px] rounded-sm font-mono text-xs sm:text-[13px] tracking-wider uppercase font-bold whitespace-nowrap cursor-pointer"
              >
                Explore Formula
              </button>
            </div>

            {/* Quiet Unboxed Trust Strip */}
            <div className="mt-6 pt-5 border-t border-charcoal/20 flex flex-wrap items-center justify-between gap-3 text-xs text-stone font-mono">
              <span>Hand-poured in Lesotho · Free Maseru CBD Pickup</span>
              <span className="text-charcoal font-bold">M-Pesa · EcoCash · EFT · Cash</span>
            </div>
          </div>

          {/* 3-Cell Apothecary Spec Strip */}
          <div className="grid grid-cols-3 border-t border-charcoal divide-x divide-charcoal bg-cream-dark/40">
            <div className="px-3 sm:px-5 py-4 text-center">
              <p className="font-mono text-[10px] text-stone uppercase tracking-wider mb-1">
                Net Volume
              </p>
              <p className="font-mono text-[11px] sm:text-xs font-bold text-charcoal tabular-nums">
                30 ML / 1.0 FL. OZ.
              </p>
            </div>
            <div className="px-3 sm:px-5 py-4 text-center">
              <p className="font-mono text-[10px] text-stone uppercase tracking-wider mb-1">
                Purity
              </p>
              <p className="font-mono text-[11px] sm:text-xs font-bold text-charcoal">
                100% NATURAL
              </p>
            </div>
            <div className="px-3 sm:px-5 py-4 text-center">
              <p className="font-mono text-[10px] text-stone uppercase tracking-wider mb-1">
                Extraction
              </p>
              <p className="font-mono text-[11px] sm:text-xs font-bold text-charcoal">
                COLD-PRESSED
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Studio Showcase & Interactive 4-View Gallery Switcher */}
        <div className="lg:col-span-6 bg-cream-dark/35 flex flex-col justify-between">
          {/* Top Apothecary Metadata Strip */}
          <div className="px-5 sm:px-6 py-3.5 border-b border-charcoal bg-cream flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em]">
            <span className="text-charcoal font-bold">{activePhoto.metaLeft}</span>
            <span className="text-ochre font-bold">{activePhoto.metaRight}</span>
          </div>

          {/* Primary Framed Studio Stage */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
            <div className="relative w-full aspect-[4/3] border border-charcoal bg-slatebg rounded-sm overflow-hidden group">
              <button
                type="button"
                onClick={() => onOpenLightbox(activeLightboxIdx)}
                className="w-full h-full block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre"
                aria-label={`Zoom ${activePhoto.title}`}
              >
                <StudioMedia photoId={activePhoto.id} alt={activePhoto.caption} />
              </button>

              {/* Measured bottom contrast scrim */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              {/* Top-left view index */}
              <div className="pointer-events-none absolute top-3 left-3 bg-cream/95 border border-charcoal px-2.5 py-1 rounded-sm">
                <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-charcoal uppercase tabular-nums">
                  0{activeIdx + 1} / 0{HERO_GALLERY_ITEMS.length} · {activePhoto.title}
                </span>
              </div>

              {/* Top-right functional action: Fullscreen Zoom */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(activeLightboxIdx)}
                  className="bg-ochre text-cream hover:bg-charcoal border border-cream/25 px-2.5 py-1.5 rounded-sm flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                  aria-label="Open fullscreen gallery"
                >
                  <Maximize2 className="w-3 h-3" aria-hidden="true" />
                  <span>Zoom</span>
                </button>
              </div>

              {/* Caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 py-3">
                <p className="font-mono text-[11px] text-cream/95 leading-snug max-w-md">
                  {activePhoto.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive 4-View Thumbnail Switcher */}
          <div className="px-4 sm:px-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone font-bold">
                Studio Gallery · {HERO_GALLERY_ITEMS.length} Photos
              </span>
              <button
                type="button"
                onClick={() => addToCartAndOpen('single')}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-ochre hover:text-charcoal transition-colors font-bold cursor-pointer tabular-nums"
              >
                + Quick Add (M{singleEdition?.price ?? 220})
              </button>
            </div>

            <div
              className="grid grid-cols-4 gap-1.5"
              role="tablist"
              aria-label="Product gallery views"
            >
              {HERO_GALLERY_ITEMS.map((item, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIdx(idx)}
                    className={`group flex flex-col text-left border rounded-sm overflow-hidden transition-colors cursor-pointer ${
                      isActive
                        ? 'border-ochre ring-1 ring-ochre bg-cream'
                        : 'border-charcoal/40 hover:border-charcoal bg-cream-light'
                    }`}
                  >
                    <div className="w-full aspect-[4/3] bg-slatebg overflow-hidden">
                      <StudioMedia photoId={item.id} alt={item.title} />
                    </div>
                    <span
                      className={`px-1.5 py-1.5 font-mono text-[9px] leading-tight uppercase truncate w-full ${
                        isActive ? 'bg-charcoal text-cream font-bold' : 'text-charcoal'
                      }`}
                    >
                      {item.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
