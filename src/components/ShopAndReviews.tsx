import React from 'react';
import { EDITION_PHOTO_MAP, GalleryPhotoId } from '../types/pula';
import { usePula } from '../context/PulaContext';
import { StudioMedia } from './ApothecaryArt';

interface ShopAndReviewsProps {
  onOpenLightboxById: (photoId: GalleryPhotoId) => void;
}

export function ShopAndReviews({ onOpenLightboxById }: ShopAndReviewsProps) {
  const { editions, addToCartAndOpen } = usePula();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border border-charcoal bg-cream rounded-sm overflow-hidden">
        <div className="px-6 sm:px-8 py-6 border-b border-charcoal bg-cream-dark/50 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ochre font-bold mb-2">
              04. Order Batch 001
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-tight">
              Choose Your Set.
            </h2>
          </div>
          <p className="font-mono text-xs text-stone">
            Prices in Lesotho Loti (M) · Free Maseru Pickup Available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-charcoal">
          {editions.map((edition) => {
            const isHighlighted = edition.id === 'twin';
            const outOfStock = edition.stockCount <= 0;
            const photoId = EDITION_PHOTO_MAP[edition.id];

            return (
              <div
                key={edition.id}
                className={`flex flex-col justify-between transition-colors ${
                  isHighlighted
                    ? 'bg-cream-dark/35 hover:bg-cream-dark/55'
                    : 'hover:bg-cream-dark/25'
                }`}
              >
                <div>
                  {/* Product Photography Lead */}
                  <button
                    type="button"
                    onClick={() => onOpenLightboxById(photoId)}
                    className="block w-full aspect-[4/3] bg-slatebg border-b border-charcoal overflow-hidden group cursor-zoom-in text-left"
                    aria-label={`View ${edition.name} photograph`}
                  >
                    <StudioMedia
                      photoId={photoId}
                      alt={`${edition.name} — ${edition.subtitle}`}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </button>

                  <div className="p-6 sm:p-7 pb-0">
                    <div className="flex items-center justify-between gap-2 mb-3 font-mono text-[11px] uppercase tracking-wider">
                      <span className={isHighlighted ? 'text-ochre font-bold' : 'text-stone'}>
                        {edition.code} · {edition.badge}
                      </span>
                      <span
                        className={`tabular-nums font-bold ${
                          outOfStock ? 'text-stone' : 'text-charcoal'
                        }`}
                      >
                        {outOfStock ? 'Sold Out' : `${edition.stockCount} left`}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-charcoal mb-1">
                      {edition.name}
                    </h3>
                    <p className="font-mono text-xs text-ochre font-bold mb-3">
                      {edition.subtitle}
                    </p>
                    <p className="text-sm text-stone leading-relaxed mb-6">
                      {edition.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 sm:pb-7">
                  <div className="flex items-baseline justify-between mb-4 pt-4 border-t border-charcoal/20">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-extrabold text-2xl text-charcoal tabular-nums">
                        M{edition.price}
                      </span>
                      {edition.compareAtPrice && edition.compareAtPrice > edition.price && (
                        <span className="font-mono text-xs text-stone line-through tabular-nums">
                          M{edition.compareAtPrice}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-stone">{edition.volume}</span>
                  </div>

                  <button
                    type="button"
                    disabled={outOfStock}
                    onClick={() => addToCartAndOpen(edition.id)}
                    className={`w-full py-3.5 px-4 min-h-[46px] rounded-sm font-mono text-xs uppercase tracking-[0.12em] font-bold transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed tabular-nums ${
                      isHighlighted
                        ? 'bg-ochre text-cream hover:bg-charcoal'
                        : 'bg-charcoal text-cream hover:bg-ochre'
                    }`}
                  >
                    {outOfStock ? 'Batch 001 Exhausted' : `Add to Order — M${edition.price}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
