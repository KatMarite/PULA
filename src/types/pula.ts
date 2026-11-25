import { Timestamp } from 'firebase/firestore';

export type BeardStage = 'stubble' | 'short' | 'medium' | 'full';
export type FulfillmentMethod = 'pickup' | 'delivery';
export type PaymentMethod = 'mpesa' | 'ecocash' | 'eft' | 'cash';
export type OrderStatus = 'pending' | 'confirmed' | 'pouring' | 'ready' | 'delivered' | 'cancelled';
export type BarberRequestType = 'tester' | 'wholesale';
export type BarberInquiryStatus = 'submitted' | 'contacted' | 'tester_dispatched' | 'partnered' | 'closed';
export type BarberChairRange = '1-2 Chairs' | '3-5 Chairs' | '6+ Chairs';

export interface Edition {
  id: 'single' | 'twin' | 'kit';
  code: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  volume: string;
  badge: string;
  stockCount: number;
  sortOrder: number;
  active: boolean;
  updatedAt?: Timestamp | null;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  beardStage: BeardStage;
  dailyDrops: number;
  bottleDropsRemaining: number;
  streakDays: number;
  lastRitualDate: string;
  savedArea: string;
  fulfillmentPref: FulfillmentMethod;
  cartSingle: number;
  cartTwin: number;
  cartKit: number;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerArea: string;
  customerPhone: string;
  qtySingle: number;
  qtyTwin: number;
  qtyKit: number;
  fulfillment: FulfillmentMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes: string;
  status: OrderStatus;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export interface BarberInquiry {
  id: string;
  userId: string;
  requestType: BarberRequestType;
  shopName: string;
  contactName: string;
  location: string;
  chairs: BarberChairRange;
  phone: string;
  status: BarberInquiryStatus;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export interface Review {
  id: string;
  userId: string;
  authorName: string;
  location: string;
  beardStage: BeardStage;
  rating: number;
  comment: string;
  published: boolean;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export interface CartQuantities {
  single: number;
  twin: number;
  kit: number;
}

export type GalleryPhotoId =
  | 'hero-box'
  | 'bottle-solo'
  | 'twin-pack'
  | 'box-back'
  | 'botanicals'
  | 'ritual'
  | 'gift-kit'
  | 'barbershop';

export interface GalleryItem {
  id: GalleryPhotoId;
  title: string;
  shortLabel: string;
  metaLeft: string;
  metaRight: string;
  caption: string;
  imageSrc: string;
  imageSrcSm?: string;
  imageFallbackSrc?: string;
  width?: number;
  height?: number;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'hero-box',
    title: 'Bottle & Retail Box',
    shortLabel: 'Bottle & Box',
    metaLeft: 'Batch 001 · 30 ml / 1.0 fl. oz.',
    metaRight: '01 · Fresh Citrus & Woods',
    caption:
      '30ml UV-protective amber glass dropper bottle beside matching textured cream retail carton on dark slate.',
    imageSrc: '/assets/studio/hero-box-1200.webp',
    imageSrcSm: '/assets/studio/hero-box-480.webp',
    imageFallbackSrc: '/assets/studio/hero-box.jpg',
    width: 1200,
    height: 896,
  },
  {
    id: 'bottle-solo',
    title: '30ml Amber Bottle',
    shortLabel: '30ml Bottle',
    metaLeft: 'Artisan Apothecary Glass',
    metaRight: 'Cold-Pressed Base',
    caption:
      'UV-protective amber glass with matte cream label, ink charcoal framing, eucalyptus sprig, and Marula nut.',
    imageSrc: '/assets/studio/bottle-solo-1200.webp',
    imageSrcSm: '/assets/studio/bottle-solo-480.webp',
    imageFallbackSrc: '/assets/studio/bottle-solo.jpg',
    width: 1200,
    height: 896,
  },
  {
    id: 'twin-pack',
    title: 'The Twin Pack',
    shortLabel: 'Twin Pack',
    metaLeft: 'Edition 02 · Save M30',
    metaRight: '2 × 30 ml Boxed',
    caption:
      'Two full-size 30ml amber glass dropper bottles with matching textured cream retail cartons on dark highland slate.',
    imageSrc: '/assets/studio/twin-pack-1200.webp',
    imageSrcSm: '/assets/studio/twin-pack-480.webp',
    imageFallbackSrc: '/assets/studio/twin-pack.jpg',
    width: 1200,
    height: 896,
  },
  {
    id: 'box-back',
    title: 'Box Back & INCI',
    shortLabel: 'Box Back',
    metaLeft: 'Full INCI Transparency · 12M PAO',
    metaRight: 'Maseru, Lesotho',
    caption:
      'Complete directions, full botanical INCI declaration, nut-oil caution, and copperplate raincloud side engraving.',
    imageSrc: '/assets/studio/box-back-1200.webp',
    imageSrcSm: '/assets/studio/box-back-480.webp',
    imageFallbackSrc: '/assets/studio/box-back.jpg',
    width: 1200,
    height: 896,
  },
  {
    id: 'botanicals',
    title: 'Raw Botanicals',
    shortLabel: 'Botanicals',
    metaLeft: '100% Plant-Derived · Zero Fillers',
    metaRight: 'Jojoba · Argan · Marula',
    caption:
      'Unrefined Southern African Marula nuts, cedarwood chips, eucalyptus leaves, citrus rind, and golden oil pipette.',
    imageSrc: '/assets/studio/botanicals-1200.webp',
    imageSrcSm: '/assets/studio/botanicals-480.webp',
    imageFallbackSrc: '/assets/studio/botanicals.jpg',
    width: 1200,
    height: 896,
  },
  {
    id: 'ritual',
    title: 'The Daily Ritual',
    shortLabel: 'Daily Ritual',
    metaLeft: 'Morning Routine · 3–5 Drops Daily',
    metaRight: 'Highland Hydration',
    caption:
      'Precision glass pipette dosing golden cold-pressed oil into your palm beside a hardwood beard comb.',
    imageSrc: '/assets/studio/ritual-1200.webp',
    imageSrcSm: '/assets/studio/ritual-480.webp',
    imageFallbackSrc: '/assets/studio/ritual.jpg',
    width: 1200,
    height: 896,
  },
  {
    id: 'gift-kit',
    title: 'The Ritual Gift Kit',
    shortLabel: 'Gift Kit',
    metaLeft: 'Edition 03 · Gift Ready',
    metaRight: 'Oil · Comb · Brush',
    caption:
      'Highland-crafted kraft presentation box housing 30ml Conditioning Beard Oil, engraved hardwood comb, and boar-bristle brush.',
    imageSrc: '/assets/studio/gift-kit-1200.webp',
    imageSrcSm: '/assets/studio/gift-kit-480.webp',
    imageFallbackSrc: '/assets/studio/gift-kit.jpg',
    width: 1200,
    height: 896,
  },
  {
    id: 'barbershop',
    title: 'Maseru Barbershop',
    shortLabel: 'Barbershop',
    metaLeft: 'Barber Approved · Maseru & Roma',
    metaRight: 'Stockist Edition',
    caption:
      'Crafted for barbershop stations across Maseru—high-contrast matte packaging with crisp citrus and cedar finish.',
    imageSrc: '/assets/studio/barbershop-1200.webp',
    imageSrcSm: '/assets/studio/barbershop-480.webp',
    imageFallbackSrc: '/assets/studio/barbershop.jpg',
    width: 1024,
    height: 764,
  },
];

export const EDITION_PHOTO_MAP: Record<Edition['id'], GalleryPhotoId> = {
  single: 'bottle-solo',
  twin: 'twin-pack',
  kit: 'gift-kit',
};

export const DEFAULT_EDITIONS: Edition[] = [
  {
    id: 'single',
    code: 'Edition 01',
    name: 'Single Bottle',
    subtitle: '01 · Fresh Citrus & Woods',
    description:
      'One 30ml UV-protective amber glass dropper bottle in our textured cream retail carton. Ideal for daily grooming (3–4 months supply).',
    price: 220,
    volume: '30 ml / 1.0 fl. oz.',
    badge: '30 ML',
    stockCount: 42,
    sortOrder: 1,
    active: true,
  },
  {
    id: 'twin',
    code: 'Edition 02',
    name: 'The Twin Pack',
    subtitle: '2 × 30ml Fresh Citrus & Woods',
    description:
      'Two full-size 30ml boxed bottles. Keep one on your bathroom vanity and one in your travel bag—or split with a brother.',
    price: 410,
    compareAtPrice: 440,
    volume: '60 ml total',
    badge: 'Save M30',
    stockCount: 18,
    sortOrder: 2,
    active: true,
  },
  {
    id: 'kit',
    code: 'Edition 03',
    name: 'The Ritual Gift Kit',
    subtitle: '30ml Oil + Hardwood Comb & Brush',
    description:
      'Our flagship 30ml boxed oil presented in a kraft highland gift box alongside an engraved hardwood beard comb and boar-bristle brush.',
    price: 550,
    volume: 'Oil + Comb + Brush',
    badge: 'Gift Ready',
    stockCount: 15,
    sortOrder: 3,
    active: true,
  },
];

export interface BeardStageSpec {
  key: BeardStage;
  step: string;
  label: string;
  lengthRange: string;
  dropsLabel: string;
  defaultDrops: number;
  daysLabel: string;
  tip: string;
}

export const BEARD_STAGES: Record<BeardStage, BeardStageSpec> = {
  stubble: {
    key: 'stubble',
    step: 'Stage 01',
    label: 'Stubble',
    lengthRange: '1–4 mm',
    dropsLabel: '2–3 Drops',
    defaultDrops: 3,
    daysLabel: '~200–240 Days',
    tip: 'Focus on massaging straight into your skin to soothe new-growth beard itch, soften prickly tips, and prevent dry highland flaking.',
  },
  short: {
    key: 'short',
    step: 'Stage 02',
    label: 'Short Beard',
    lengthRange: '5–15 mm',
    dropsLabel: '3–4 Drops',
    defaultDrops: 4,
    daysLabel: '~150–180 Days',
    tip: 'Press oil evenly across your cheeks and chin after patting dry. A light pass with a boar-bristle brush trains short hairs to lie neatly.',
  },
  medium: {
    key: 'medium',
    step: 'Stage 03',
    label: 'Medium Beard',
    lengthRange: '1.5–4 cm',
    dropsLabel: '4–5 Drops',
    defaultDrops: 5,
    daysLabel: '~120–150 Days',
    tip: 'Massage 3 drops directly into the skin along your jawline and chin, then run the remaining 1–2 drops over the outer beard with a wooden comb for a satin, non-greasy sheen.',
  },
  full: {
    key: 'full',
    step: 'Stage 04',
    label: 'Full Highland',
    lengthRange: '4 cm+',
    dropsLabel: '6–8 Drops',
    defaultDrops: 7,
    daysLabel: '~75–100 Days',
    tip: 'Split your dose in two: work 4 drops deep to the root and skin underneath, then smooth 2–4 drops downward through the lower length to tame coarse ends and lock in moisture.',
  },
};

export const CARRIER_OILS = [
  {
    code: 'Base 01',
    origin: 'Sebum Match',
    name: 'Golden Jojoba',
    latin: 'Simmondsia Chinensis',
    description:
      "Biologically closest to human skin's natural sebum. Absorbs rapidly without heavy grease to balance dry, flaky skin beneath dense beards.",
    role: 'Weightless Absorption',
  },
  {
    code: 'Base 02',
    origin: 'Southern Africa',
    name: 'Virgin Marula',
    latin: 'Sclerocarya Birrea',
    description:
      "Southern Africa's prized antioxidant-rich elixir. Packed with oleic acid and omega-9 to shield coarse hair from harsh, dry highland wind.",
    role: 'Moisture Lock & Glow',
  },
  {
    code: 'Base 03',
    origin: 'Deep Softener',
    name: 'Moroccan Argan',
    latin: 'Argania Spinosa',
    description:
      'Rich in linoleic acid and sterols that tame wiry flyaways, soften coarse curls, and reduce split ends for easier daily combing.',
    role: 'Coarse Hair Conditioning',
  },
  {
    code: 'Base 04',
    origin: 'Skin Soother',
    name: 'Sweet Almond',
    latin: 'Prunus Amygdalus Dulcis',
    description:
      'Silky, nutrient-dense emollient loaded with magnesium and fatty acids to calm post-trim irritation, beard itch, and redness.',
    role: 'Anti-Itch Relief',
  },
  {
    code: 'Base 05',
    origin: 'Natural Preservative',
    name: 'Natural Vitamin E',
    latin: 'Tocopherol',
    description:
      'Nourishes follicle health while naturally preserving the cold-pressed carrier oils so every bottle stays fresh for 12 months.',
    role: 'Antioxidant Freshness',
  },
];

export const SCENT_NOTES = [
  {
    tier: 'Top Note · First Impression',
    name: 'Calabrian Bergamot',
    latin: 'Citrus Aurantium Bergamia',
    description:
      'Opens immediately with bright, sun-ripened citrus rind and crisp green zest—clean, uplifting, and never sweet or overpowering.',
  },
  {
    tier: 'Heart Note · Mid Dry-Down',
    name: 'Highland Eucalyptus',
    latin: 'Eucalyptus Smithii',
    description:
      'Gentle, crisp botanical freshness reminiscent of cool mountain air after rain. Naturally invigorating for skin underneath the beard.',
  },
  {
    tier: 'Base Note · Lasting Trail',
    name: 'Cedarwood & Frankincense',
    latin: 'Juniperus Virginiana & Boswellia Serrata',
    description:
      'Settles into a refined, dry woody warmth with resinous spice that stays close to the skin for hours—pairing effortlessly with any cologne.',
  },
];

export const ORDER_STATUS_STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'pending', label: 'Received' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'pouring', label: 'Pouring' },
  { key: 'ready', label: 'Ready' },
  { key: 'delivered', label: 'Delivered' },
];

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  mpesa: 'M-Pesa',
  ecocash: 'EcoCash',
  eft: 'Bank EFT',
  cash: 'Cash on Collection',
};

export const BARBER_STATUS_LABELS: Record<BarberInquiryStatus, string> = {
  submitted: 'Submitted',
  contacted: 'Contacted',
  tester_dispatched: '5ml Tester Dispatched',
  partnered: 'Active Stockist',
  closed: 'Closed',
};

// Synchronized verbatim with firebase-blueprint.json maxLength limits
export function sanitizeString(value: string, maxLength: number): string {
  return value.trim().slice(0, maxLength);
}

export function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function generateOrderNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PULA-001-${suffix}`;
}

export function buildWhatsAppOrderText(params: {
  orderNumber?: string;
  editions: Edition[];
  cart: CartQuantities;
  fulfillment: FulfillmentMethod;
  paymentMethod: PaymentMethod;
  customerName: string;
  customerArea: string;
  customerPhone?: string;
}): string {
  const { orderNumber, editions, cart, fulfillment, paymentMethod, customerName, customerArea, customerPhone } =
    params;

  let subtotal = 0;
  const lines: string[] = [];

  editions.forEach((ed) => {
    const qty = cart[ed.id] || 0;
    if (qty > 0) {
      const lineTotal = qty * ed.price;
      subtotal += lineTotal;
      lines.push(`• ${qty} × ${ed.name} — M${lineTotal}`);
    }
  });

  if (lines.length === 0) {
    return 'Select at least 1 edition above to prepare your PŪLA Batch 001 order.';
  }

  const deliveryFee = fulfillment === 'delivery' ? 30 : 0;
  const total = subtotal + deliveryFee;
  const fulfillLabel =
    fulfillment === 'pickup'
      ? 'Maseru Pickup (Pioneer / CBD — FREE)'
      : 'Local Maseru Delivery (+M30)';

  return [
    'Dumela PŪLA Grooming (@pulagrooming),',
    orderNumber
      ? `I placed Batch 001 Order ${orderNumber}:`
      : 'I would like to place a Batch 001 order:',
    '',
    ...lines,
    '',
    `Fulfillment: ${fulfillLabel}`,
    `Payment: ${PAYMENT_LABELS[paymentMethod]}`,
    `Total: M${total} (LSL)`,
    `Name: ${customerName || '[Your Name]'}`,
    `Area: ${customerArea || '[Maseru Suburb / Area]'}`,
    ...(customerPhone ? [`Phone: ${customerPhone}`] : []),
  ].join('\n');
}
