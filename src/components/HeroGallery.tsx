import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem, GalleryPhotoId } from '../types/pula';
import { usePula } from '../context/PulaContext';
import { StudioMedia } from './ApothecaryArt';

const HERO_GALLERY_ORDER: GalleryPhotoId[] = ['botanicals', 'hero-box', 'gift-kit', 'box-back'];
const SLIDE_INTERVAL_MS = 4500;

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
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const singleEdition = editions.find((e) => e.id === 'single') || editions[0];
  const activePhoto = HERO_GALLERY_ITEMS[activeIdx] || HERO_GALLERY_ITEMS[0];

  const stepSlide = useCallback((delta: number) => {
    setActiveIdx((prev) => (prev + delta + HERO_GALLERY_ITEMS.length) % HERO_GALLERY_ITEMS.length);
  }, []);

  useEffect(() => {
    if (isPaused || isHovered) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => {
      stepSlide(1);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, isHovered, stepSlide]);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-6 sm:py-10">
      <div className="border border-charcoal bg-cream rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* LEFT COLUMN: Apothecary Editorial Copy & CTAs */}
        <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-between lg:border-r border-charcoal">
          {/* Top Metadata Strip (clean unboxed text with typographic separators) */}
          <div className="px-6 sm:px-8 py-3.5 border-b border-charcoal bg-cream-dark/60 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.12em]">
            <span className="text-charcoal font-bold">
              Batch 001
            </span>
          </div>

          {/* Hero Main Content */}
          <div className="px-6 sm:px-8 lg:px-10 py-8 sm:py-12 flex-1 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs uppercase tracking-[0.14em] text-stone mb-3"
            >
              Conditioning Beard Oil · 01 Fresh Citrus &amp; Woods
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-3xl sm:text-5xl xl:text-[52px] leading-[1.06] tracking-tight text-charcoal mb-5"
            >
              Highland-Crafted Botanical Beard Care.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-stone text-base sm:text-[17px] leading-relaxed max-w-xl mb-7"
            >
              Formulated with cold-pressed Southern African{' '}
              <strong className="text-charcoal font-semibold">Marula, Jojoba, and Argan</strong>{' '}
              oils. Built to soften coarse hair, calm dry highland skin.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCartAndOpen('single')}
                className="inline-flex items-center justify-center gap-2.5 bg-ochre text-cream hover:bg-charcoal transition-colors px-5 sm:px-6 py-4 min-h-[48px] rounded-sm font-mono text-xs sm:text-[13px] tracking-wider uppercase font-bold text-center sm:whitespace-nowrap cursor-pointer"
              >
                <span className="tabular-nums">
                  Order 01 Fresh Citrus — M{singleEdition?.price ?? 220}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={onExploreFormula}
                className="inline-flex items-center justify-center border border-charcoal bg-transparent hover:bg-cream-dark text-charcoal transition-colors px-5 sm:px-6 py-4 min-h-[48px] rounded-sm font-mono text-xs sm:text-[13px] tracking-wider uppercase font-bold text-center sm:whitespace-nowrap cursor-pointer"
              >
                Explore Formula
              </motion.button>
            </motion.div>

            {/* Quiet Unboxed Trust Strip */}
            <div className="mt-6 pt-5 border-t border-charcoal/20 flex flex-wrap items-center justify-between gap-3 text-xs text-stone font-mono">
              <span>Hand-poured in Lesotho · Free Maseru CBD Pickup</span>
              <span className="text-charcoal font-bold">M-Pesa · EcoCash · EFT · Cash</span>
            </div>
          </div>

          {/* 3-Cell Apothecary Spec Strip */}
          <div className="grid grid-cols-3 border-t border-charcoal divide-x divide-charcoal bg-cream-dark/40">
            <div className="px-2 sm:px-5 py-3.5 sm:py-4 text-center">
              <p className="font-mono text-[9px] sm:text-[10px] text-stone uppercase tracking-wider mb-1">
                Net Volume
              </p>
              <p className="font-mono text-[10px] sm:text-xs font-bold text-charcoal tabular-nums">
                30 ML / 1.0 FL. OZ.
              </p>
            </div>
            <div className="px-2 sm:px-5 py-3.5 sm:py-4 text-center">
              <p className="font-mono text-[9px] sm:text-[10px] text-stone uppercase tracking-wider mb-1">
                Purity
              </p>
              <p className="font-mono text-[10px] sm:text-xs font-bold text-charcoal">
                100% NATURAL
              </p>
            </div>
            <div className="px-2 sm:px-5 py-3.5 sm:py-4 text-center">
              <p className="font-mono text-[9px] sm:text-[10px] text-stone uppercase tracking-wider mb-1">
                Extraction
              </p>
              <p className="font-mono text-[10px] sm:text-xs font-bold text-charcoal">
                COLD-PRESSED
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Studio Showcase & Interactive 4-View Slideshow */}
        <div
          className="order-1 lg:order-2 lg:col-span-6 bg-cream-dark/35 flex flex-col justify-between border-b lg:border-b-0 border-charcoal"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') stepSlide(-1);
            if (e.key === 'ArrowRight') stepSlide(1);
          }}
          aria-roledescription="carousel"
          aria-label="Studio Gallery slideshow"
        >
          {/* Top Apothecary Metadata Strip */}
          <div className="px-5 sm:px-6 py-3.5 border-b border-charcoal bg-cream flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={`left-${activePhoto.id}`}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
                className="text-charcoal font-bold"
              >
                {activePhoto.metaLeft}
              </motion.span>
            </AnimatePresence>
            <span className="text-ochre-dark font-bold">
              01 · Fresh Citrus &amp; Woods
            </span>
          </div>

          {/* Primary Framed Studio Stage */}
          <div className="p-0 sm:p-5 flex-1 flex flex-col justify-center">
            <div
              className="relative w-full aspect-[4/5] sm:aspect-[4/3] border-b sm:border border-charcoal bg-slatebg rounded-none sm:rounded-sm overflow-hidden group"
              aria-live="off"
            >
              <div
                className="flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{ transform: `translateX(-${activeIdx * 100}%)` }}
              >
                {HERO_GALLERY_ITEMS.map((item, idx) => {
                  const lightboxIdx = Math.max(
                    0,
                    GALLERY_ITEMS.findIndex((entry) => entry.id === item.id)
                  );
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onOpenLightbox(lightboxIdx)}
                      tabIndex={idx === activeIdx ? 0 : -1}
                      aria-hidden={idx !== activeIdx}
                      className="w-full h-full shrink-0 block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre"
                      aria-label={`Zoom ${item.title}`}
                    >
                      <StudioMedia
                        photoId={item.id}
                        alt={item.caption}
                        priority={idx === 0}
                        sizes="(min-width: 1024px) 46vw, 96vw"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Measured bottom contrast scrim (desktop/tablet only) */}
              <div className="hidden sm:block pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              {/* Top-left view index */}
              <div className="pointer-events-none absolute top-3 left-3 bg-cream/95 border border-charcoal px-2.5 py-1 rounded-sm">
                <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-charcoal uppercase tabular-nums">
                  0{activeIdx + 1} / 0{HERO_GALLERY_ITEMS.length} · {activePhoto.title}
                </span>
              </div>

              {/* Top-right functional action: Play/Pause */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="bg-charcoal/85 text-cream hover:bg-ochre border border-cream/25 px-2.5 py-1.5 rounded-sm flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                  aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
                  aria-pressed={isPaused}
                >
                  {isPaused ? (
                    <Play className="w-3 h-3" aria-hidden="true" />
                  ) : (
                    <Pause className="w-3 h-3" aria-hidden="true" />
                  )}
                  <span className="hidden sm:inline">{isPaused ? 'Play' : 'Pause'}</span>
                </button>
              </div>

              {/* Caption (hidden on mobile) */}
              <div className="hidden sm:flex pointer-events-none absolute inset-x-0 bottom-0 px-4 py-3 items-end justify-between gap-3">
                <p className="font-mono text-[11px] text-cream/95 leading-snug max-w-md">
                  {activePhoto.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive 4-View Slideshow Switcher */}
          <div className="px-3.5 sm:px-5 pt-3 sm:pt-0 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone font-bold">
                  Studio Slideshow · {HERO_GALLERY_ITEMS.length} Photos
                </span>
                <div className="flex items-center gap-1" aria-hidden="true">
                  {HERO_GALLERY_ITEMS.map((item, idx) => (
                    <span
                      key={item.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIdx ? 'w-4 bg-ochre' : 'w-1.5 bg-charcoal/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => addToCartAndOpen('single')}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-ochre-dark hover:text-charcoal transition-colors font-bold cursor-pointer tabular-nums"
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
                      <StudioMedia
                        photoId={item.id}
                        alt={item.title}
                        sizes="(min-width: 640px) 140px, 24vw"
                      />
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
