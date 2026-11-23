import React, { useCallback, useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from './types/pula';
import { ActiveSection, PulaProvider, usePula } from './context/PulaContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MobileBottomBar, TopNav } from './components/TopNav';
import { HeroGallery } from './components/HeroGallery';
import { StoryAndFormula } from './components/StoryAndFormula';
import { RitualTracker } from './components/RitualTracker';
import { ShopAndReviews } from './components/ShopAndReviews';
import { OrdersAndStockists } from './components/OrdersAndStockists';
import { AdminDesk } from './components/AdminDesk';
import { OrderDrawer } from './components/OrderDrawer';
import { BarberModal } from './components/BarberModal';
import { LightboxModal } from './components/LightboxModal';
import { Footer } from './components/Footer';

function PulaAppShell() {
  const { toastMessage, syncError, isAdmin } = usePula();
  const [activeSection, setActiveSection] = useState<ActiveSection>('shop');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNavigate = useCallback((section: ActiveSection) => {
    setActiveSection(section);
    const el = document.getElementById(`section-${section}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'shop') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleOpenLightboxById = useCallback((photoId: GalleryItem['id']) => {
    const idx = GALLERY_ITEMS.findIndex((item) => item.id === photoId);
    setLightboxIndex(idx >= 0 ? idx : 0);
  }, []);

  const handleStepLightbox = useCallback((delta: number) => {
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return (prev + delta + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    });
  }, []);

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans flex flex-col">
      <TopNav activeSection={activeSection} onNavigate={handleNavigate} />

      {syncError && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
          <div className="px-4 py-3 border border-ochre bg-ochre/10 rounded-sm font-mono text-xs text-ochre font-bold">
            {syncError}
          </div>
        </div>
      )}

      <main className="flex-1 space-y-10 sm:space-y-14">
        <div id="section-shop" className="scroll-mt-20">
          <HeroGallery
            onExploreFormula={() => handleNavigate('formula')}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
          />
        </div>

        <div id="section-editions" className="scroll-mt-20">
          <ShopAndReviews onOpenLightboxById={handleOpenLightboxById} />
        </div>

        <StoryAndFormula onOpenLightboxById={handleOpenLightboxById} />

        <div id="section-ritual" className="scroll-mt-20">
          <RitualTracker onOpenLightboxById={handleOpenLightboxById} />
        </div>

        <OrdersAndStockists onOpenLightboxById={handleOpenLightboxById} />

        {isAdmin && (
          <div id="section-desk" className="scroll-mt-20">
            <AdminDesk />
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <MobileBottomBar activeSection={activeSection} onNavigate={handleNavigate} />

      <OrderDrawer />
      <BarberModal />
      <LightboxModal
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onStep={handleStepLightbox}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-charcoal text-cream border border-ochre px-5 py-3 rounded-sm shadow-xl font-mono text-xs tracking-wider uppercase whitespace-nowrap animate-fade-up"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <PulaProvider>
        <PulaAppShell />
      </PulaProvider>
    </ErrorBoundary>
  );
}
