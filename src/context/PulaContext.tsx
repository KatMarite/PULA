import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, isAdminUser, OperationType } from '../firebase';
import {
  BarberChairRange,
  BarberInquiry,
  BarberInquiryStatus,
  BarberRequestType,
  BEARD_STAGES,
  BeardStage,
  CartQuantities,
  clampNumber,
  DEFAULT_EDITIONS,
  Edition,
  FulfillmentMethod,
  generateOrderNumber,
  getTodayDateKey,
  getYesterdayDateKey,
  Order,
  OrderStatus,
  PaymentMethod,
  Review,
  RitualLog,
  sanitizeString,
  UserProfile,
} from '../types/pula';

export type ActiveSection = 'shop' | 'story' | 'formula' | 'ritual' | 'stockists' | 'desk';

interface PlaceOrderInput {
  customerName: string;
  customerArea: string;
  customerPhone: string;
  fulfillment: FulfillmentMethod;
  paymentMethod: PaymentMethod;
  notes: string;
}

interface SubmitBarberInput {
  requestType: BarberRequestType;
  shopName: string;
  contactName: string;
  location: string;
  chairs: BarberChairRange;
  phone: string;
}

interface SubmitReviewInput {
  authorName: string;
  location: string;
  beardStage: BeardStage;
  rating: number;
  comment: string;
}

interface PulaContextValue {
  user: User | null;
  activeUserId: string;
  authReady: boolean;
  isAdmin: boolean;

  editions: Edition[];
  editionsFromDb: boolean;
  profile: UserProfile | null;
  ritualLogs: RitualLog[];
  orders: Order[];
  barberInquiries: BarberInquiry[];
  reviews: Review[];
  syncError: string | null;

  cart: CartQuantities;
  totalCartItems: number;
  selectedStage: BeardStage;
  fulfillment: FulfillmentMethod;
  setFulfillment: (method: FulfillmentMethod) => void;
  selectBeardStage: (stage: BeardStage) => void;
  updateCartQty: (id: Edition['id'], delta: number) => void;
  addToCartAndOpen: (id: Edition['id']) => void;
  clearCart: () => void;

  orderDrawerOpen: boolean;
  openOrderDrawer: () => void;
  closeOrderDrawer: () => void;
  barberModalOpen: boolean;
  barberModalType: BarberRequestType;
  openBarberModal: (type: BarberRequestType) => void;
  closeBarberModal: () => void;

  customPhotos: Record<string, string>;
  setCustomPhoto: (photoId: string, dataUrl: string) => void;

  logDailyRitual: (note?: string) => Promise<boolean>;
  resetBottleCounter: () => Promise<void>;
  deleteRitualLog: (logId: string) => Promise<void>;
  placeOrder: (input: PlaceOrderInput) => Promise<Order | null>;
  cancelOrder: (orderId: string) => Promise<void>;
  submitBarberInquiry: (input: SubmitBarberInput) => Promise<BarberInquiry | null>;
  submitReview: (input: SubmitReviewInput) => Promise<boolean>;
  deleteReview: (reviewId: string) => Promise<void>;

  seedBatchEditions: () => Promise<void>;
  updateEditionInventory: (editionId: Edition['id'], updates: { stockCount?: number; price?: number; active?: boolean }) => Promise<void>;
  updateOrderStatusAdmin: (orderId: string, status: OrderStatus, notes?: string) => Promise<void>;
  updateBarberStatusAdmin: (inquiryId: string, status: BarberInquiryStatus) => Promise<void>;

  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEYS = {
  guestId: 'pula_guest_id_v1',
  profile: 'pula_guest_profile_v1',
  ritualLogs: 'pula_guest_ritual_logs_v1',
  orders: 'pula_guest_orders_v1',
  inquiries: 'pula_guest_inquiries_v1',
  reviews: 'pula_guest_reviews_v1',
} as const;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota / private mode failures
  }
}

function getOrCreateGuestId(): string {
  try {
    const existing = window.localStorage.getItem(STORAGE_KEYS.guestId);
    if (existing) return existing;
    const created = `guest_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
    window.localStorage.setItem(STORAGE_KEYS.guestId, created);
    return created;
  } catch {
    return 'guest_local';
  }
}

function createDefaultGuestProfile(guestId: string): UserProfile {
  return {
    userId: guestId,
    displayName: '',
    beardStage: 'medium',
    dailyDrops: BEARD_STAGES.medium.defaultDrops,
    bottleDropsRemaining: 600,
    streakDays: 0,
    lastRitualDate: '',
    savedArea: '',
    fulfillmentPref: 'pickup',
    cartSingle: 0,
    cartTwin: 0,
    cartKit: 0,
    createdAt: null,
    updatedAt: null,
  };
}

const PulaContext = createContext<PulaContextValue | null>(null);

export function PulaProvider({ children }: { children: React.ReactNode }) {
  const [guestId] = useState<string>(() => getOrCreateGuestId());
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const [editions, setEditions] = useState<Edition[]>(DEFAULT_EDITIONS);
  const [editionsFromDb, setEditionsFromDb] = useState(false);

  const [guestProfile, setGuestProfile] = useState<UserProfile>(() =>
    readStorage<UserProfile>(STORAGE_KEYS.profile, createDefaultGuestProfile(guestId))
  );
  const [guestRitualLogs, setGuestRitualLogs] = useState<RitualLog[]>(() =>
    readStorage<RitualLog[]>(STORAGE_KEYS.ritualLogs, [])
  );
  const [guestOrders, setGuestOrders] = useState<Order[]>(() =>
    readStorage<Order[]>(STORAGE_KEYS.orders, [])
  );
  const [guestInquiries, setGuestInquiries] = useState<BarberInquiry[]>(() =>
    readStorage<BarberInquiry[]>(STORAGE_KEYS.inquiries, [])
  );
  const [guestReviews, setGuestReviews] = useState<Review[]>(() =>
    readStorage<Review[]>(STORAGE_KEYS.reviews, [])
  );

  const [dbProfile, setDbProfile] = useState<UserProfile | null>(null);
  const [dbRitualLogs, setDbRitualLogs] = useState<RitualLog[]>([]);
  const [dbOrders, setDbOrders] = useState<Order[]>([]);
  const [dbBarberInquiries, setDbBarberInquiries] = useState<BarberInquiry[]>([]);
  const [dbReviews, setDbReviews] = useState<Review[]>([]);
  const [syncError, setSyncError] = useState<string | null>(null);

  const [localCart, setLocalCart] = useState<CartQuantities>(() => ({
    single: guestProfile.cartSingle || 0,
    twin: guestProfile.cartTwin || 0,
    kit: guestProfile.cartKit || 0,
  }));
  const [localStage, setLocalStage] = useState<BeardStage>(() => guestProfile.beardStage || 'medium');
  const [localFulfillment, setLocalFulfillment] = useState<FulfillmentMethod>(
    () => guestProfile.fulfillmentPref || 'pickup'
  );
  const [initializedBag, setInitializedBag] = useState(false);

  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const [barberModalOpen, setBarberModalOpen] = useState(false);
  const [barberModalType, setBarberModalType] = useState<BarberRequestType>('tester');
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const isAdmin = useMemo(() => isAdminUser(user), [user]);
  const activeUserId = user?.uid || guestId;

  const profile = user ? dbProfile ?? guestProfile : guestProfile;
  const ritualLogs = user ? dbRitualLogs : guestRitualLogs;
  const orders = user ? dbOrders : guestOrders;
  const barberInquiries = user ? dbBarberInquiries : guestInquiries;
  const reviews = useMemo(() => {
    const dbIds = new Set(dbReviews.map((r) => r.id));
    const merged = [...guestReviews.filter((r) => !dbIds.has(r.id)), ...dbReviews];
    return merged;
  }, [dbReviews, guestReviews]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.profile, guestProfile);
  }, [guestProfile]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.ritualLogs, guestRitualLogs);
  }, [guestRitualLogs]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.orders, guestOrders);
  }, [guestOrders]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.inquiries, guestInquiries);
  }, [guestInquiries]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.reviews, guestReviews);
  }, [guestReviews]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3400);
  }, []);

  // 1. Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
      if (!nextUser) {
        setDbProfile(null);
        setDbRitualLogs([]);
        setDbOrders([]);
        setDbBarberInquiries([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Public real-time Batch 001 Editions listener
  useEffect(() => {
    const editionsQuery = isAdmin
      ? collection(db, 'editions')
      : query(collection(db, 'editions'), where('active', '==', true));

    const unsubscribe = onSnapshot(
      editionsQuery,
      (snap) => {
        if (snap.empty) {
          setEditions(DEFAULT_EDITIONS);
          setEditionsFromDb(false);
        } else {
          const loaded: Edition[] = snap.docs
            .map((d) => {
              const data = d.data();
              return {
                id: data.id as Edition['id'],
                code: String(data.code || ''),
                name: String(data.name || ''),
                subtitle: String(data.subtitle || ''),
                description: String(data.description || ''),
                price: Number(data.price || 0),
                compareAtPrice: typeof data.compareAtPrice === 'number' ? data.compareAtPrice : undefined,
                volume: String(data.volume || ''),
                badge: String(data.badge || ''),
                stockCount: Number(data.stockCount ?? 0),
                sortOrder: Number(data.sortOrder ?? 99),
                active: Boolean(data.active),
                updatedAt: data.updatedAt ?? null,
              };
            })
            .sort((a, b) => a.sortOrder - b.sortOrder);
          setEditions(loaded);
          setEditionsFromDb(true);
        }
      },
      (error) => {
        console.error('Editions listener error:', error);
        setSyncError('Unable to sync live inventory right now.');
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  // 3. Public real-time Customer Reviews listener
  useEffect(() => {
    const reviewsQuery = query(collection(db, 'reviews'), where('published', '==', true));
    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snap) => {
        const list: Review[] = snap.docs
          .map((d) => {
            const data = d.data();
            return {
              id: d.id,
              userId: String(data.userId || ''),
              authorName: String(data.authorName || ''),
              location: String(data.location || ''),
              beardStage: (data.beardStage as BeardStage) || 'medium',
              rating: Number(data.rating || 5),
              comment: String(data.comment || ''),
              published: Boolean(data.published),
              createdAt: data.createdAt ?? null,
              updatedAt: data.updatedAt ?? null,
            };
          })
          .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));
        setDbReviews(list);
      },
      (error) => {
        console.error('Reviews listener error:', error);
      }
    );
    return () => unsubscribe();
  }, []);

  // 4. Authenticated-only Real-Time Sync: Profile, Ritual Logs, Orders, Barber Inquiries
  useEffect(() => {
    if (!authReady || !user) return;

    const uid = user.uid;
    const profileRef = doc(db, 'users', uid);

    const unsubProfile = onSnapshot(
      profileRef,
      async (snap) => {
        if (!snap.exists()) {
          if (!user.emailVerified) return;
          try {
            const initialPayload = {
              userId: uid,
              displayName: sanitizeString(user.displayName || 'Highland Member', 80),
              beardStage: localStage,
              dailyDrops: BEARD_STAGES[localStage].defaultDrops,
              bottleDropsRemaining: 600,
              streakDays: 0,
              lastRitualDate: '',
              savedArea: '',
              fulfillmentPref: localFulfillment,
              cartSingle: clampNumber(localCart.single, 0, 20),
              cartTwin: clampNumber(localCart.twin, 0, 20),
              cartKit: clampNumber(localCart.kit, 0, 20),
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            await setDoc(profileRef, initialPayload);
          } catch (error) {
            handleFirestoreError(error, OperationType.CREATE, `users/${uid}`);
          }
        } else {
          const data = snap.data();
          const loaded: UserProfile = {
            userId: String(data.userId || uid),
            displayName: String(data.displayName || ''),
            beardStage: (data.beardStage as BeardStage) || 'medium',
            dailyDrops: Number(data.dailyDrops || 5),
            bottleDropsRemaining: Number(data.bottleDropsRemaining ?? 600),
            streakDays: Number(data.streakDays || 0),
            lastRitualDate: String(data.lastRitualDate || ''),
            savedArea: String(data.savedArea || ''),
            fulfillmentPref: (data.fulfillmentPref as FulfillmentMethod) || 'pickup',
            cartSingle: Number(data.cartSingle || 0),
            cartTwin: Number(data.cartTwin || 0),
            cartKit: Number(data.cartKit || 0),
            createdAt: data.createdAt ?? null,
            updatedAt: data.updatedAt ?? null,
          };
          setDbProfile(loaded);
          setLocalStage(loaded.beardStage);
          setLocalFulfillment(loaded.fulfillmentPref);
          setLocalCart({
            single: loaded.cartSingle,
            twin: loaded.cartTwin,
            kit: loaded.cartKit,
          });
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${uid}`);
      }
    );

    const logsQuery = query(
      collection(db, 'users', uid, 'ritualLogs'),
      where('userId', '==', uid)
    );
    const unsubLogs = onSnapshot(
      logsQuery,
      (snap) => {
        const items: RitualLog[] = snap.docs
          .map((d) => {
            const data = d.data();
            return {
              id: d.id,
              userId: String(data.userId || uid),
              dateKey: String(data.dateKey || ''),
              beardStage: (data.beardStage as BeardStage) || 'medium',
              dropsUsed: Number(data.dropsUsed || 5),
              note: String(data.note || ''),
              createdAt: data.createdAt ?? null,
            };
          })
          .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));
        setDbRitualLogs(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, `users/${uid}/ritualLogs`);
      }
    );

    const ordersQuery = isAdmin
      ? collection(db, 'orders')
      : query(collection(db, 'orders'), where('userId', '==', uid));

    const unsubOrders = onSnapshot(
      ordersQuery,
      (snap) => {
        const items: Order[] = snap.docs
          .map((d) => {
            const data = d.data();
            return {
              id: d.id,
              orderNumber: String(data.orderNumber || ''),
              userId: String(data.userId || ''),
              customerName: String(data.customerName || ''),
              customerArea: String(data.customerArea || ''),
              customerPhone: String(data.customerPhone || ''),
              qtySingle: Number(data.qtySingle || 0),
              qtyTwin: Number(data.qtyTwin || 0),
              qtyKit: Number(data.qtyKit || 0),
              fulfillment: (data.fulfillment as FulfillmentMethod) || 'pickup',
              paymentMethod: (data.paymentMethod as PaymentMethod) || 'mpesa',
              subtotal: Number(data.subtotal || 0),
              deliveryFee: Number(data.deliveryFee || 0),
              total: Number(data.total || 0),
              notes: String(data.notes || ''),
              status: (data.status as OrderStatus) || 'pending',
              createdAt: data.createdAt ?? null,
              updatedAt: data.updatedAt ?? null,
            };
          })
          .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));
        setDbOrders(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'orders');
      }
    );

    const inquiriesQuery = isAdmin
      ? collection(db, 'barberInquiries')
      : query(collection(db, 'barberInquiries'), where('userId', '==', uid));

    const unsubInquiries = onSnapshot(
      inquiriesQuery,
      (snap) => {
        const items: BarberInquiry[] = snap.docs
          .map((d) => {
            const data = d.data();
            return {
              id: d.id,
              userId: String(data.userId || ''),
              requestType: (data.requestType as BarberRequestType) || 'tester',
              shopName: String(data.shopName || ''),
              contactName: String(data.contactName || ''),
              location: String(data.location || ''),
              chairs: (data.chairs as BarberChairRange) || '3-5 Chairs',
              phone: String(data.phone || ''),
              status: (data.status as BarberInquiryStatus) || 'submitted',
              createdAt: data.createdAt ?? null,
              updatedAt: data.updatedAt ?? null,
            };
          })
          .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0));
        setDbBarberInquiries(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'barberInquiries');
      }
    );

    return () => {
      unsubProfile();
      unsubLogs();
      unsubOrders();
      unsubInquiries();
    };
  }, [authReady, user, isAdmin]);

  // Helper to persist partial updates to UserProfile
  const syncProfileFields = useCallback(
    async (partial: Partial<UserProfile>) => {
      if (user && dbProfile) {
        const profileRef = doc(db, 'users', user.uid);
        try {
          await updateDoc(profileRef, {
            ...partial,
            updatedAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
        }
      } else {
        setGuestProfile((prev) => ({
          ...prev,
          ...partial,
        }));
      }
    },
    [user, dbProfile]
  );

  const selectBeardStage = useCallback(
    (stage: BeardStage) => {
      setLocalStage(stage);
      void syncProfileFields({
        beardStage: stage,
        dailyDrops: BEARD_STAGES[stage].defaultDrops,
      });
    },
    [syncProfileFields]
  );

  const setFulfillment = useCallback(
    (method: FulfillmentMethod) => {
      setLocalFulfillment(method);
      void syncProfileFields({ fulfillmentPref: method });
    },
    [syncProfileFields]
  );

  const updateCartQty = useCallback(
    (id: Edition['id'], delta: number) => {
      setInitializedBag(true);
      setLocalCart((prev) => {
        const nextQty = clampNumber((prev[id] || 0) + delta, 0, 20);
        const next = { ...prev, [id]: nextQty };
        void syncProfileFields({
          cartSingle: next.single,
          cartTwin: next.twin,
          cartKit: next.kit,
        });
        return next;
      });
    },
    [syncProfileFields]
  );

  const addToCartAndOpen = useCallback(
    (id: Edition['id']) => {
      updateCartQty(id, 1);
      setOrderDrawerOpen(true);
      const ed = editions.find((item) => item.id === id);
      if (ed) showToast(`Added ${ed.name} to bag`);
    },
    [updateCartQty, editions, showToast]
  );

  const clearCart = useCallback(() => {
    setLocalCart({ single: 0, twin: 0, kit: 0 });
    void syncProfileFields({ cartSingle: 0, cartTwin: 0, cartKit: 0 });
  }, [syncProfileFields]);

  const totalCartItems = localCart.single + localCart.twin + localCart.kit;

  const openOrderDrawer = useCallback(() => {
    if (totalCartItems === 0 && !initializedBag) {
      updateCartQty('single', 1);
    }
    setOrderDrawerOpen(true);
  }, [totalCartItems, initializedBag, updateCartQty]);

  const closeOrderDrawer = useCallback(() => setOrderDrawerOpen(false), []);

  const openBarberModal = useCallback((type: BarberRequestType) => {
    setBarberModalType(type);
    setBarberModalOpen(true);
  }, []);

  const closeBarberModal = useCallback(() => setBarberModalOpen(false), []);

  const setCustomPhoto = useCallback(
    (photoId: string, dataUrl: string) => {
      setCustomPhotos((prev) => ({ ...prev, [photoId]: dataUrl }));
      showToast('Updated studio photo preview');
    },
    [showToast]
  );

  // Daily Ritual Logging
  const logDailyRitual = useCallback(
    async (note = ''): Promise<boolean> => {
      const activeProfile = profile ?? guestProfile;
      const today = getTodayDateKey();
      const yesterday = getYesterdayDateKey();
      const dropsUsed = clampNumber(BEARD_STAGES[localStage].defaultDrops, 1, 20);
      const nextRemaining = clampNumber(activeProfile.bottleDropsRemaining - dropsUsed, 0, 600);
      const nextStreak =
        activeProfile.lastRitualDate === today
          ? activeProfile.streakDays
          : activeProfile.lastRitualDate === yesterday
            ? clampNumber(activeProfile.streakDays + 1, 1, 3650)
            : 1;
      const cleanNote = sanitizeString(note, 240);

      if (user && dbProfile) {
        try {
          await addDoc(collection(db, 'users', user.uid, 'ritualLogs'), {
            userId: user.uid,
            dateKey: today,
            beardStage: localStage,
            dropsUsed,
            note: cleanNote,
            createdAt: serverTimestamp(),
          });

          await updateDoc(doc(db, 'users', user.uid), {
            beardStage: localStage,
            dailyDrops: dropsUsed,
            bottleDropsRemaining: nextRemaining,
            streakDays: nextStreak,
            lastRitualDate: today,
            updatedAt: serverTimestamp(),
          });

          showToast(`Logged ${dropsUsed} drops · ${nextStreak}-day streak`);
          return true;
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/ritualLogs`);
        }
      }

      const newLog: RitualLog = {
        id: `log_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        userId: guestId,
        dateKey: today,
        beardStage: localStage,
        dropsUsed,
        note: cleanNote,
        createdAt: null,
      };
      setGuestRitualLogs((prev) => [newLog, ...prev]);
      setGuestProfile((prev) => ({
        ...prev,
        beardStage: localStage,
        dailyDrops: dropsUsed,
        bottleDropsRemaining: nextRemaining,
        streakDays: nextStreak,
        lastRitualDate: today,
      }));
      showToast(`Logged ${dropsUsed} drops · ${nextStreak}-day streak`);
      return true;
    },
    [user, dbProfile, profile, guestProfile, guestId, localStage, showToast]
  );

  const resetBottleCounter = useCallback(async () => {
    await syncProfileFields({ bottleDropsRemaining: 600 });
    showToast('Fresh 30ml bottle started (600 drops)');
  }, [syncProfileFields, showToast]);

  const deleteRitualLog = useCallback(
    async (logId: string) => {
      if (user) {
        try {
          await deleteDoc(doc(db, 'users', user.uid, 'ritualLogs', logId));
          showToast('Removed ritual entry');
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/ritualLogs/${logId}`);
        }
        return;
      }
      setGuestRitualLogs((prev) => prev.filter((item) => item.id !== logId));
      showToast('Removed ritual entry');
    },
    [user, showToast]
  );

  // Place Order
  const placeOrder = useCallback(
    async (input: PlaceOrderInput): Promise<Order | null> => {
      const qtySingle = clampNumber(localCart.single, 0, 20);
      const qtyTwin = clampNumber(localCart.twin, 0, 20);
      const qtyKit = clampNumber(localCart.kit, 0, 20);

      if (qtySingle + qtyTwin + qtyKit < 1) {
        showToast('Add at least 1 edition to your bag');
        return null;
      }

      const singlePrice = editions.find((e) => e.id === 'single')?.price ?? 220;
      const twinPrice = editions.find((e) => e.id === 'twin')?.price ?? 410;
      const kitPrice = editions.find((e) => e.id === 'kit')?.price ?? 320;

      const subtotal = qtySingle * singlePrice + qtyTwin * twinPrice + qtyKit * kitPrice;
      const deliveryFee = input.fulfillment === 'delivery' ? 30 : 0;
      const total = subtotal + deliveryFee;
      const orderNumber = generateOrderNumber();

      const customerName = sanitizeString(input.customerName, 80);
      const customerArea = sanitizeString(input.customerArea, 100);
      const customerPhone = sanitizeString(input.customerPhone, 30);
      const notes = sanitizeString(input.notes, 300);

      if (customerName.length < 2 || customerArea.length < 2) {
        showToast('Please enter your name and Maseru/Lesotho area');
        return null;
      }

      if (user) {
        const payload = {
          orderNumber,
          userId: user.uid,
          customerName,
          customerArea,
          customerPhone,
          qtySingle,
          qtyTwin,
          qtyKit,
          fulfillment: input.fulfillment,
          paymentMethod: input.paymentMethod,
          subtotal,
          deliveryFee,
          total,
          notes,
          status: 'pending' as OrderStatus,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        try {
          const ref = await addDoc(collection(db, 'orders'), payload);

          if (dbProfile) {
            await updateDoc(doc(db, 'users', user.uid), {
              displayName: customerName,
              savedArea: customerArea,
              fulfillmentPref: input.fulfillment,
              cartSingle: 0,
              cartTwin: 0,
              cartKit: 0,
              updatedAt: serverTimestamp(),
            });
          } else {
            setLocalCart({ single: 0, twin: 0, kit: 0 });
          }

          showToast(`Order ${orderNumber} placed!`);
          return {
            ...payload,
            id: ref.id,
            createdAt: null,
            updatedAt: null,
          };
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, 'orders');
        }
      }

      const localOrder: Order = {
        id: `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        orderNumber,
        userId: guestId,
        customerName,
        customerArea,
        customerPhone,
        qtySingle,
        qtyTwin,
        qtyKit,
        fulfillment: input.fulfillment,
        paymentMethod: input.paymentMethod,
        subtotal,
        deliveryFee,
        total,
        notes,
        status: 'pending',
        createdAt: null,
        updatedAt: null,
      };
      setGuestOrders((prev) => [localOrder, ...prev]);
      setLocalCart({ single: 0, twin: 0, kit: 0 });
      setGuestProfile((prev) => ({
        ...prev,
        displayName: customerName,
        savedArea: customerArea,
        fulfillmentPref: input.fulfillment,
        cartSingle: 0,
        cartTwin: 0,
        cartKit: 0,
      }));
      showToast(`Order ${orderNumber} placed!`);
      return localOrder;
    },
    [user, guestId, localCart, editions, dbProfile, showToast]
  );

  const cancelOrder = useCallback(
    async (orderId: string) => {
      if (user) {
        try {
          await updateDoc(doc(db, 'orders', orderId), {
            status: 'cancelled',
            updatedAt: serverTimestamp(),
          });
          showToast('Order cancelled');
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
        }
        return;
      }
      setGuestOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' as OrderStatus } : o))
      );
      showToast('Order cancelled');
    },
    [user, showToast]
  );

  // Submit Barbershop Partner Inquiry
  const submitBarberInquiry = useCallback(
    async (input: SubmitBarberInput): Promise<BarberInquiry | null> => {
      const shopName = sanitizeString(input.shopName, 100);
      const contactName = sanitizeString(input.contactName, 80);
      const location = sanitizeString(input.location, 80);
      const phone = sanitizeString(input.phone, 30);

      if (shopName.length < 2 || contactName.length < 2) {
        showToast('Please enter your barbershop and contact name');
        return null;
      }

      if (user) {
        const payload = {
          userId: user.uid,
          requestType: input.requestType,
          shopName,
          contactName,
          location,
          chairs: input.chairs,
          phone,
          status: 'submitted' as BarberInquiryStatus,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        try {
          const ref = await addDoc(collection(db, 'barberInquiries'), payload);
          showToast('Partner request saved to Maseru Trade Desk');
          return {
            ...payload,
            id: ref.id,
            createdAt: null,
            updatedAt: null,
          };
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, 'barberInquiries');
        }
      }

      const localInquiry: BarberInquiry = {
        id: `inq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        userId: guestId,
        requestType: input.requestType,
        shopName,
        contactName,
        location,
        chairs: input.chairs,
        phone,
        status: 'submitted',
        createdAt: null,
        updatedAt: null,
      };
      setGuestInquiries((prev) => [localInquiry, ...prev]);
      showToast('Partner request saved to Maseru Trade Desk');
      return localInquiry;
    },
    [user, guestId, showToast]
  );

  // Customer Reviews
  const submitReview = useCallback(
    async (input: SubmitReviewInput): Promise<boolean> => {
      const authorName = sanitizeString(input.authorName, 60);
      const location = sanitizeString(input.location, 60);
      const comment = sanitizeString(input.comment, 500);
      const rating = clampNumber(input.rating, 1, 5);

      if (authorName.length < 2 || comment.length < 5) {
        showToast('Please include your name and at least 5 characters');
        return false;
      }

      if (user) {
        try {
          await addDoc(collection(db, 'reviews'), {
            userId: user.uid,
            authorName,
            location: location || 'Maseru, Lesotho',
            beardStage: input.beardStage,
            rating,
            comment,
            published: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          showToast('Review published');
          return true;
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, 'reviews');
        }
      }

      const localReview: Review = {
        id: `rev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        userId: guestId,
        authorName,
        location: location || 'Maseru, Lesotho',
        beardStage: input.beardStage,
        rating,
        comment,
        published: true,
        createdAt: null,
        updatedAt: null,
      };
      setGuestReviews((prev) => [localReview, ...prev]);
      showToast('Review published');
      return true;
    },
    [user, guestId, showToast]
  );

  const deleteReview = useCallback(
    async (reviewId: string) => {
      if (guestReviews.some((r) => r.id === reviewId)) {
        setGuestReviews((prev) => prev.filter((r) => r.id !== reviewId));
        showToast('Review removed');
        return;
      }
      if (!user) return;
      try {
        await deleteDoc(doc(db, 'reviews', reviewId));
        showToast('Review removed');
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `reviews/${reviewId}`);
      }
    },
    [user, guestReviews, showToast]
  );

  // Admin Operations
  const seedBatchEditions = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const batch = writeBatch(db);
      DEFAULT_EDITIONS.forEach((ed) => {
        const ref = doc(db, 'editions', ed.id);
        const payload: Record<string, unknown> = {
          id: ed.id,
          code: ed.code,
          name: ed.name,
          subtitle: ed.subtitle,
          description: ed.description,
          price: ed.price,
          volume: ed.volume,
          badge: ed.badge,
          stockCount: ed.stockCount,
          sortOrder: ed.sortOrder,
          active: true,
          updatedAt: serverTimestamp(),
        };
        if (typeof ed.compareAtPrice === 'number') {
          payload.compareAtPrice = ed.compareAtPrice;
        }
        batch.set(ref, payload);
      });
      await batch.commit();
      showToast('Batch 001 catalog synced to Firestore');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'editions');
    }
  }, [isAdmin, showToast]);

  const updateEditionInventory = useCallback(
    async (
      editionId: Edition['id'],
      updates: { stockCount?: number; price?: number; active?: boolean }
    ) => {
      if (!isAdmin) return;
      const existing = editions.find((e) => e.id === editionId);
      if (!existing) return;

      const ref = doc(db, 'editions', editionId);
      try {
        if (!editionsFromDb) {
          await seedBatchEditions();
        }
        const nextUpdates: Record<string, unknown> = {
          updatedAt: serverTimestamp(),
        };
        if (typeof updates.stockCount === 'number') {
          nextUpdates.stockCount = clampNumber(updates.stockCount, 0, 10000);
        }
        if (typeof updates.price === 'number') {
          nextUpdates.price = clampNumber(updates.price, 1, 100000);
        }
        if (typeof updates.active === 'boolean') {
          nextUpdates.active = updates.active;
        }
        await updateDoc(ref, nextUpdates);
        showToast(`Updated ${existing.name} inventory`);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `editions/${editionId}`);
      }
    },
    [isAdmin, editions, editionsFromDb, seedBatchEditions, showToast]
  );

  const updateOrderStatusAdmin = useCallback(
    async (orderId: string, status: OrderStatus, notes?: string) => {
      if (!isAdmin) return;
      try {
        const updatePayload: Record<string, unknown> = {
          status,
          updatedAt: serverTimestamp(),
        };
        if (typeof notes === 'string') {
          updatePayload.notes = sanitizeString(notes, 300);
        }
        await updateDoc(doc(db, 'orders', orderId), updatePayload);
        showToast(`Order marked ${status}`);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
      }
    },
    [isAdmin, showToast]
  );

  const updateBarberStatusAdmin = useCallback(
    async (inquiryId: string, status: BarberInquiryStatus) => {
      if (!isAdmin) return;
      try {
        await updateDoc(doc(db, 'barberInquiries', inquiryId), {
          status,
          updatedAt: serverTimestamp(),
        });
        showToast(`Trade inquiry marked ${status.replace('_', ' ')}`);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `barberInquiries/${inquiryId}`);
      }
    },
    [isAdmin, showToast]
  );

  const value: PulaContextValue = {
    user,
    activeUserId,
    authReady,
    isAdmin,
    editions,
    editionsFromDb,
    profile,
    ritualLogs,
    orders,
    barberInquiries,
    reviews,
    syncError,
    cart: localCart,
    totalCartItems,
    selectedStage: localStage,
    fulfillment: localFulfillment,
    setFulfillment,
    selectBeardStage,
    updateCartQty,
    addToCartAndOpen,
    clearCart,
    orderDrawerOpen,
    openOrderDrawer,
    closeOrderDrawer,
    barberModalOpen,
    barberModalType,
    openBarberModal,
    closeBarberModal,
    customPhotos,
    setCustomPhoto,
    logDailyRitual,
    resetBottleCounter,
    deleteRitualLog,
    placeOrder,
    cancelOrder,
    submitBarberInquiry,
    submitReview,
    deleteReview,
    seedBatchEditions,
    updateEditionInventory,
    updateOrderStatusAdmin,
    updateBarberStatusAdmin,
    toastMessage,
    showToast,
  };

  return <PulaContext.Provider value={value}>{children}</PulaContext.Provider>;
}

export function usePula() {
  const ctx = useContext(PulaContext);
  if (!ctx) throw new Error('usePula must be used within PulaProvider');
  return ctx;
}
