import React from 'react';
import {
  BookOpen,
  Droplets,
  FlaskConical,
  ShoppingBag,
  SlidersHorizontal,
  Store,
} from 'lucide-react';
import { ActiveSection, usePula } from '../context/PulaContext';

interface TopNavProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
}

export function TopNav({ activeSection, onNavigate }: TopNavProps) {
  const { totalCartItems, openOrderDrawer, isAdmin } = usePula();

  const navLinks: { id: ActiveSection; label: string }[] = [
    { id: 'shop', label: 'Shop' },
    { id: 'story', label: 'Story' },
    { id: 'formula', label: 'Formula' },
    { id: 'ritual', label: 'Ritual' },
    { id: 'stockists', label: 'Stockists' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-14 md:h-[68px]">
          {/* Zone 1: Single-element Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="font-display font-bold text-xl sm:text-2xl tracking-[0.32em] text-charcoal hover:text-ochre transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre rounded-sm"
            aria-label="PŪLA Home"
          >
            PŪLA
          </button>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`font-mono text-xs uppercase tracking-[0.14em] py-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-ochre text-ochre font-bold'
                      : 'border-transparent text-charcoal hover:text-ochre'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            {isAdmin && (
              <button
                type="button"
                onClick={() => onNavigate('desk')}
                className={`font-mono text-xs uppercase tracking-[0.14em] py-2 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSection === 'desk'
                    ? 'border-ochre text-ochre font-bold'
                    : 'border-transparent text-ochre hover:text-charcoal'
                }`}
              >
                Desk
              </button>
            )}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={openOrderDrawer}
              className="inline-flex items-center gap-2.5 bg-charcoal text-cream hover:bg-ochre transition-colors px-4 py-2.5 min-h-[40px] rounded-sm font-mono text-xs tracking-[0.14em] uppercase font-bold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              aria-label={`Open order bag, ${totalCartItems} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Order</span>
              <span className="tabular-nums bg-cream text-charcoal px-1.5 py-0.5 rounded-sm text-[11px] leading-none">
                {totalCartItems}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function MobileBottomBar({ activeSection, onNavigate }: TopNavProps) {
  const { isAdmin } = usePula();

  const tabs: {
    id: ActiveSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'formula', label: 'Formula', icon: FlaskConical },
    { id: 'ritual', label: 'Ritual', icon: Droplets },
    { id: 'stockists', label: 'Stockists', icon: Store },
  ];

  if (isAdmin) {
    tabs.push({ id: 'desk', label: 'Desk', icon: SlidersHorizontal });
  }

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-charcoal pb-[env(safe-area-inset-bottom)]"
    >
      <div className={`grid ${isAdmin ? 'grid-cols-6' : 'grid-cols-5'} h-[58px]`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={`relative flex flex-col items-center justify-center min-h-[44px] gap-1 transition-colors cursor-pointer ${
                isActive ? 'text-ochre font-bold' : 'text-stone hover:text-charcoal'
              }`}
            >
              <Icon className="w-[19px] h-[19px]" />
              <span className="font-mono text-[10px] tracking-tight whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
