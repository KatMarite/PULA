import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Copy, ExternalLink, Minus, Plus, X } from 'lucide-react';
import {
  buildWhatsAppOrderText,
  Order,
  PAYMENT_LABELS,
  PaymentMethod,
} from '../types/pula';
import { usePula } from '../context/PulaContext';
import { useDialogAccessibility } from '../hooks/useDialogAccessibility';

export function OrderDrawer() {
  const {
    orderDrawerOpen,
    closeOrderDrawer,
    editions,
    cart,
    totalCartItems,
    updateCartQty,
    fulfillment,
    setFulfillment,
    user,
    profile,
    placeOrder,
    showToast,
  } = usePula();

  const [customerName, setCustomerName] = useState('');
  const [customerArea, setCustomerArea] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useDialogAccessibility(orderDrawerOpen, closeOrderDrawer, drawerRef);

  useEffect(() => {
    if (orderDrawerOpen) {
      setValidationMsg(null);
      if (!customerName && (profile?.displayName || user?.displayName)) {
        setCustomerName(profile?.displayName || user?.displayName || '');
      }
      if (!customerArea && profile?.savedArea) {
        setCustomerArea(profile.savedArea);
      }
    } else {
      setPlacedOrder(null);
    }
  }, [orderDrawerOpen, profile, user, customerName, customerArea]);

  const subtotal = editions.reduce((sum, ed) => sum + (cart[ed.id] || 0) * ed.price, 0);
  const deliveryFee = totalCartItems > 0 && fulfillment === 'delivery' ? 30 : 0;
  const grandTotal = subtotal + deliveryFee;

  const activeOrderText = placedOrder
    ? buildWhatsAppOrderText({
        orderNumber: placedOrder.orderNumber,
        editions,
        cart: {
          single: placedOrder.qtySingle,
          twin: placedOrder.qtyTwin,
          kit: placedOrder.qtyKit,
        },
        fulfillment: placedOrder.fulfillment,
        paymentMethod: placedOrder.paymentMethod,
        customerName: placedOrder.customerName,
        customerArea: placedOrder.customerArea,
        customerPhone: placedOrder.customerPhone,
      })
    : buildWhatsAppOrderText({
        editions,
        cart,
        fulfillment,
        paymentMethod,
        customerName,
        customerArea,
        customerPhone,
      });

  const waUrl = `https://wa.me/?text=${encodeURIComponent(activeOrderText)}`;

  const handleCopy = () => {
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(activeOrderText).then(() => {
        showToast('Order summary copied for WhatsApp / IG DM');
      });
    } else {
      showToast('Copy unavailable in this browser');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationMsg(null);

    if (totalCartItems === 0) {
      setValidationMsg('Add at least 1 edition before placing your order.');
      return;
    }

    if (customerName.trim().length < 2 || customerArea.trim().length < 2) {
      setValidationMsg('Enter your name and Maseru / Lesotho suburb.');
      return;
    }

    setSubmitting(true);
    try {
      const created = await placeOrder({
        customerName,
        customerArea,
        customerPhone,
        fulfillment,
        paymentMethod,
        notes,
      });
      if (created) {
        setPlacedOrder(created);
        setNotes('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {orderDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pula-order-drawer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOrderDrawer}
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-xs"
          />

          {/* Drawer / Mobile Bottom Sheet */}
          <motion.div
            ref={drawerRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:w-[470px] max-h-[92dvh] sm:max-h-full bg-cream border-t sm:border-t-0 sm:border-l border-charcoal rounded-t-2xl sm:rounded-none shadow-2xl flex flex-col overflow-hidden focus:outline-none"
          >
        {/* Mobile grab handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-charcoal rounded-t-2xl">
          <div className="w-10 h-1 bg-cream/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-charcoal bg-charcoal text-cream flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ochre font-bold">
              Batch 001 · Real-Time Checkout
            </p>
            <h2 id="pula-order-drawer-title" className="font-display font-bold text-lg">
              {placedOrder ? `Order ${placedOrder.orderNumber}` : 'Your PŪLA Order'}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeOrderDrawer}
            className="p-2.5 min-h-[40px] min-w-[40px] border border-cream/30 hover:bg-cream/10 rounded-sm text-cream flex items-center justify-center cursor-pointer"
            aria-label="Close order bag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {placedOrder ? (
          /* CONFIRMED REAL-TIME ORDER RECEIPT */
          <div className="flex-1 min-h-0 overflow-y-auto p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-6 space-y-5">
            <div className="p-5 border border-charcoal bg-cream-light rounded-sm space-y-3">
              <div className="flex items-center gap-2.5 text-ochre-dark">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-mono text-xs uppercase font-bold tracking-wider">
                  Order Synced Live · Status: Received
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-charcoal">
                Ke a leboha, {placedOrder.customerName}.
              </h3>
              <p className="text-sm text-stone leading-relaxed">
                Your order <strong className="font-mono text-charcoal">{placedOrder.orderNumber}</strong>{' '}
                is now received in our Maseru apothecary queue. Copy your receipt or message us
                directly on WhatsApp to arrange {PAYMENT_LABELS[placedOrder.paymentMethod]}.
              </p>
            </div>

            <pre className="p-4 bg-cream-dark/70 border border-charcoal/40 rounded-sm font-mono text-[11px] leading-relaxed text-charcoal whitespace-pre-wrap break-words">
              {activeOrderText}
            </pre>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 min-h-[44px] border border-charcoal bg-cream hover:bg-cream-light text-charcoal rounded-sm font-mono text-xs uppercase font-bold cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Receipt</span>
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 min-h-[44px] bg-ochre hover:bg-charcoal text-cream rounded-sm font-mono text-xs uppercase font-bold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
              {/* Edition Quantity Selectors */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone font-bold mb-3">
                  Select Editions &amp; Quantities
                </p>
                <div className="space-y-2.5">
                  {editions.map((ed) => {
                    const qty = cart[ed.id] || 0;
                    const maxQty = ed.active ? Math.min(20, Math.max(0, ed.stockCount)) : 0;
                    const selected = qty > 0;
                    return (
                      <div
                        key={ed.id}
                        className={`p-3.5 border rounded-sm flex items-center justify-between gap-3 transition-colors ${
                          selected
                            ? 'border-charcoal bg-cream-light'
                            : 'border-charcoal/35 bg-cream'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="font-display font-bold text-sm text-charcoal truncate">
                            {ed.name}
                          </p>
                          <p className="font-mono text-[11px] text-stone truncate">{ed.subtitle}</p>
                          <p className="font-mono text-xs font-bold text-ochre-dark mt-1 tabular-nums">
                            M{ed.price} · {ed.stockCount > 0 ? `${ed.stockCount} in stock` : 'Sold out'}
                          </p>
                        </div>
                        <div className="flex items-center border border-charcoal rounded-sm bg-cream shrink-0">
                          <button
                            type="button"
                            disabled={qty <= 0}
                            onClick={() => updateCartQty(ed.id, -1)}
                            className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-cream-dark cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label={`Decrease ${ed.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-bold text-charcoal tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            disabled={qty >= maxQty}
                            onClick={() => updateCartQty(ed.id, 1)}
                            className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-cream-dark cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label={`Increase ${ed.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fulfillment in Lesotho */}
              <div className="pt-4 border-t border-charcoal/25">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone font-bold mb-2.5">
                  Fulfillment in Lesotho
                </p>
                <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="Fulfillment method">
                  <button
                    type="button"
                    aria-pressed={fulfillment === 'pickup'}
                    onClick={() => setFulfillment('pickup')}
                    className={`p-3 min-h-[56px] border border-charcoal rounded-sm text-left transition-colors cursor-pointer ${
                      fulfillment === 'pickup'
                        ? 'bg-charcoal text-cream'
                        : 'bg-cream hover:bg-cream-dark text-charcoal'
                    }`}
                  >
                    <span className="block font-mono text-xs font-bold uppercase">Maseru Pickup</span>
                    <span
                      className={`block font-mono text-[10px] mt-0.5 ${
                        fulfillment === 'pickup' ? 'text-cream/80' : 'text-stone'
                      }`}
                    >
                      Pioneer / CBD · FREE
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={fulfillment === 'delivery'}
                    onClick={() => setFulfillment('delivery')}
                    className={`p-3 min-h-[56px] border border-charcoal rounded-sm text-left transition-colors cursor-pointer ${
                      fulfillment === 'delivery'
                        ? 'bg-charcoal text-cream'
                        : 'bg-cream hover:bg-cream-dark text-charcoal'
                    }`}
                  >
                    <span className="block font-mono text-xs font-bold uppercase">
                      Local Delivery
                    </span>
                    <span
                      className={`block font-mono text-[10px] mt-0.5 tabular-nums ${
                        fulfillment === 'delivery' ? 'text-cream/80' : 'text-stone'
                      }`}
                    >
                      Maseru Area · +M30
                    </span>
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone font-bold mb-2">
                  Payment Method
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Payment method">
                  {(['mpesa', 'ecocash', 'eft', 'cash'] as PaymentMethod[]).map((method) => (
                    <button
                      key={method}
                      type="button"
                      aria-pressed={paymentMethod === method}
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2.5 px-2 min-h-[40px] border border-charcoal rounded-sm font-mono text-[10px] uppercase font-bold transition-colors cursor-pointer ${
                        paymentMethod === method
                          ? 'bg-ochre text-cream border-ochre'
                          : 'bg-cream text-charcoal hover:bg-cream-dark'
                      }`}
                    >
                      {method === 'cash' ? 'Cash' : PAYMENT_LABELS[method]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Verification Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="drawer-name"
                    className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="drawer-name"
                    type="text"
                    required
                    maxLength={80}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Thabo M."
                    className="w-full px-3 py-2.5 bg-cream-light border border-charcoal rounded-sm text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-ochre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="drawer-area"
                    className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-1"
                  >
                    Area / Suburb *
                  </label>
                  <input
                    id="drawer-area"
                    type="text"
                    required
                    maxLength={100}
                    value={customerArea}
                    onChange={(e) => setCustomerArea(e.target.value)}
                    placeholder="e.g. Maseru West / Roma"
                    className="w-full px-3 py-2.5 bg-cream-light border border-charcoal rounded-sm text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-ochre"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="drawer-phone"
                    className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-1"
                  >
                    WhatsApp / Phone Number
                  </label>
                  <input
                    id="drawer-phone"
                    type="tel"
                    maxLength={30}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +266 5800 0000"
                    className="w-full px-3 py-2.5 bg-cream-light border border-charcoal rounded-sm text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-ochre"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="drawer-notes"
                    className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-1"
                  >
                    Delivery / Pickup Note (Optional)
                  </label>
                  <input
                    id="drawer-notes"
                    type="text"
                    maxLength={300}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Pioneer Mall pickup after 16:00"
                    className="w-full px-3 py-2.5 bg-cream-light border border-charcoal rounded-sm text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-ochre"
                  />
                </div>
              </div>

              {validationMsg && (
                <div
                  role="alert"
                  className="p-3 border border-ochre bg-ochre/10 rounded-sm font-mono text-xs text-ochre-dark font-bold"
                >
                  {validationMsg}
                </div>
              )}
            </div>

            {/* Sticky Checkout Footer */}
            <div className="px-5 sm:px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-4 border-t border-charcoal bg-cream-dark space-y-3 shrink-0">
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between text-stone">
                  <span>Items Subtotal</span>
                  <span className="tabular-nums">M{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone">
                  <span>
                    {fulfillment === 'pickup' ? 'Maseru Pickup (CBD)' : 'Local Maseru Delivery'}
                  </span>
                  <span className="tabular-nums">
                    {deliveryFee > 0 ? `M${deliveryFee}` : 'FREE'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-charcoal pt-2 border-t border-charcoal/30">
                  <span>Total (LSL)</span>
                  <span className="tabular-nums">M{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || totalCartItems === 0}
                className="w-full py-3.5 px-4 min-h-[48px] bg-ochre hover:bg-charcoal text-cream rounded-sm font-mono text-xs uppercase tracking-[0.12em] font-bold transition-colors cursor-pointer disabled:opacity-50 tabular-nums"
              >
                {submitting ? 'Placing Order...' : `Place Order — M${grandTotal}`}
              </button>

              <div className="flex items-center justify-between gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="font-mono text-[10px] uppercase tracking-wider text-stone hover:text-charcoal underline underline-offset-2 cursor-pointer"
                >
                  Copy WhatsApp Text
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-wider text-ochre-dark hover:text-charcoal font-bold underline underline-offset-2"
                >
                  Direct WhatsApp →
                </a>
              </div>
            </div>
          </form>
        )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
