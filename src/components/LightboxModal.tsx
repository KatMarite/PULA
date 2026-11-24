import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../types/pula';
import { StudioMedia } from './ApothecaryArt';
import { useDialogAccessibility } from '../hooks/useDialogAccessibility';

interface LightboxModalProps {
  activeIndex: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}

export function LightboxModal({ activeIndex, onClose, onStep }: LightboxModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useDialogAccessibility(activeIndex !== null, onClose, modalRef);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, onStep]);

  const photo = activeIndex !== null ? GALLERY_ITEMS[activeIndex] || GALLERY_ITEMS[0] : null;

  return (
    <AnimatePresence>
      {activeIndex !== null && photo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pula-lightbox-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm"
          />

          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[92dvh] bg-cream border border-charcoal rounded-sm shadow-2xl overflow-hidden flex flex-col focus:outline-none"
          >
            <div className="px-4 sm:px-6 py-3 bg-charcoal text-cream border-b border-charcoal flex items-center justify-between gap-4 shrink-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-[11px] text-ochre font-bold uppercase tracking-[0.14em] tabular-nums">
                  0{activeIndex + 1} / 0{GALLERY_ITEMS.length}
                </span>
                <h3 id="pula-lightbox-title" className="font-display font-bold text-sm sm:text-base">
                  {photo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 border border-cream/30 hover:bg-cream/10 rounded-sm text-cream cursor-pointer"
                aria-label="Close fullscreen gallery"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative bg-slatebg flex items-center justify-center aspect-[4/3] max-h-[65dvh] w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <StudioMedia photoId={photo.id} alt={photo.caption} className="w-full h-full object-contain" />
                </motion.div>
              </AnimatePresence>

          <button
            type="button"
            onClick={() => onStep(-1)}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-sm bg-ochre/90 hover:bg-charcoal text-cream border border-cream/25 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous view"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-sm bg-ochre/90 hover:bg-charcoal text-cream border border-cream/25 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next view"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-3.5 bg-cream border-t border-charcoal flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs sm:text-sm text-stone leading-snug">{photo.caption}</p>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ochre-dark font-bold shrink-0">
            {photo.metaLeft}
          </span>
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
