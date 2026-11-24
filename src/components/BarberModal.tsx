import React, { useEffect, useState } from 'react';
import { CheckCircle2, Copy, ExternalLink, X } from 'lucide-react';
import { BarberChairRange, BarberInquiry, BarberRequestType } from '../types/pula';
import { usePula } from '../context/PulaContext';

export function BarberModal() {
  const {
    barberModalOpen,
    barberModalType,
    closeBarberModal,
    user,
    submitBarberInquiry,
    showToast,
  } = usePula();

  const [requestType, setRequestType] = useState<BarberRequestType>(barberModalType);
  const [shopName, setShopName] = useState('');
  const [contactName, setContactName] = useState('');
  const [location, setLocation] = useState('Maseru CBD');
  const [chairs, setChairs] = useState<BarberChairRange>('3-5 Chairs');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<BarberInquiry | null>(null);

  useEffect(() => {
    setRequestType(barberModalType);
    if (!barberModalOpen) {
      setSubmitted(null);
    } else if (!contactName && user?.displayName) {
      setContactName(user.displayName);
    }
  }, [barberModalOpen, barberModalType, user, contactName]);

  if (!barberModalOpen) return null;

  const formattedMessage = submitted
    ? [
        'Dumela PŪLA Trade Desk (@pulagrooming),',
        `Request: ${submitted.requestType === 'tester' ? 'Free 5ml Barber Chair Tester' : 'Wholesale & Consignment Rate Card'}`,
        `Barbershop: ${submitted.shopName}`,
        `Contact: ${submitted.contactName}`,
        `Location: ${submitted.location}`,
        `Scale: ${submitted.chairs}`,
        ...(submitted.phone ? [`Phone: ${submitted.phone}`] : []),
        'Looking forward to trying Batch 001 at our shop.',
      ].join('\n')
    : '';

  const waUrl = `https://wa.me/?text=${encodeURIComponent(formattedMessage)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const created = await submitBarberInquiry({
        requestType,
        shopName,
        contactName,
        location,
        chairs,
        phone,
      });
      if (created) {
        setSubmitted(created);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!formattedMessage) return;
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(formattedMessage).then(() => {
        showToast('Barbershop inquiry copied');
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pula-barber-modal-title"
    >
      <div onClick={closeBarberModal} className="fixed inset-0 bg-charcoal/75 backdrop-blur-xs" />

      <div className="relative z-10 w-full max-w-lg max-h-[90dvh] bg-cream border border-charcoal rounded-sm shadow-2xl flex flex-col overflow-hidden animate-fade-up">
        <div className="px-5 sm:px-6 py-4 bg-charcoal text-cream border-b border-charcoal flex items-center justify-between shrink-0">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ochre font-bold">
              Maseru &amp; Roma Trade Desk
            </p>
            <h3 id="pula-barber-modal-title" className="font-display font-bold text-lg">
              Barbershop Partner Inquiry
            </h3>
          </div>
          <button
            type="button"
            onClick={closeBarberModal}
            className="p-2 border border-cream/30 hover:bg-cream/10 rounded-sm text-cream cursor-pointer"
            aria-label="Close partner modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
            <div className="flex items-center gap-2 text-ochre font-mono text-xs uppercase font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved Live to PŪLA Trade Desk</span>
            </div>
            <pre className="p-4 border border-charcoal/30 bg-cream-dark/70 rounded-sm font-mono text-[11px] text-charcoal whitespace-pre-wrap leading-relaxed">
              {formattedMessage}
            </pre>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 min-h-[44px] border border-charcoal bg-cream hover:bg-cream-light rounded-sm font-mono text-xs uppercase font-bold cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Inquiry</span>
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 min-h-[44px] bg-ochre hover:bg-charcoal text-cream rounded-sm font-mono text-xs uppercase font-bold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-2">
                What would you like to request?
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRequestType('tester')}
                  className={`py-2.5 px-3 min-h-[44px] border border-charcoal rounded-sm font-mono text-[11px] uppercase font-bold cursor-pointer ${
                    requestType === 'tester'
                      ? 'bg-charcoal text-cream'
                      : 'bg-cream text-charcoal hover:bg-cream-dark'
                  }`}
                >
                  Free 5ml Tester
                </button>
                <button
                  type="button"
                  onClick={() => setRequestType('wholesale')}
                  className={`py-2.5 px-3 min-h-[44px] border border-charcoal rounded-sm font-mono text-[11px] uppercase font-bold cursor-pointer ${
                    requestType === 'wholesale'
                      ? 'bg-charcoal text-cream'
                      : 'bg-cream text-charcoal hover:bg-cream-dark'
                  }`}
                >
                  Wholesale Rates
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="barber-shop"
                  className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-1"
                >
                  Barbershop Name *
                </label>
                <input
                  id="barber-shop"
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. Kingdom Cuts"
                  className="w-full px-3 py-2.5 bg-cream-light border border-charcoal rounded-sm text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-ochre"
                />
              </div>
              <div>
                <label
                  htmlFor="barber-contact"
                  className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-1"
                >
                  Your Name *
                </label>
                <input
                  id="barber-contact"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Lerato / Master Barber"
                  className="w-full px-3 py-2.5 bg-cream-light border border-charcoal rounded-sm text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-ochre"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="barber-loc"
                  className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-1"
                >
                  Location *
                </label>
                <select
                  id="barber-loc"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 bg-cream-light border border-charcoal rounded-sm text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-ochre"
                >
                  <option value="Maseru CBD">Maseru CBD</option>
                  <option value="Pioneer / Maseru West">Pioneer / Maseru West</option>
                  <option value="Hillsview / Europa">Hillsview / Europa</option>
                  <option value="Roma">Roma</option>
                  <option value="Mazenod">Mazenod</option>
                  <option value="Other Lesotho Town">Other Lesotho Town</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="barber-chairs"
                  className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-1"
                >
                  Active Barber Chairs
                </label>
                <select
                  id="barber-chairs"
                  value={chairs}
                  onChange={(e) => setChairs(e.target.value as BarberChairRange)}
                  className="w-full px-3 py-2.5 bg-cream-light border border-charcoal rounded-sm text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-ochre"
                >
                  <option value="1-2 Chairs">1-2 Chairs</option>
                  <option value="3-5 Chairs">3-5 Chairs</option>
                  <option value="6+ Chairs">6+ Chairs</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="barber-phone"
                className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-1"
              >
                Shop WhatsApp / Phone
              </label>
              <input
                id="barber-phone"
                type="tel"
                maxLength={30}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +266 5800 0000"
                className="w-full px-3 py-2.5 bg-cream-light border border-charcoal rounded-sm text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-ochre"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 min-h-[48px] bg-ochre hover:bg-charcoal text-cream rounded-sm font-mono text-xs uppercase tracking-[0.12em] font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Submitting Request...' : 'Submit Partner Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
