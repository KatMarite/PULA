import React, { useState } from 'react';
import { Database, Minus, Plus } from 'lucide-react';
import {
  BARBER_STATUS_LABELS,
  BarberInquiryStatus,
  OrderStatus,
  PAYMENT_LABELS,
} from '../types/pula';
import { usePula } from '../context/PulaContext';

export function AdminDesk() {
  const {
    isAdmin,
    editions,
    editionsFromDb,
    orders,
    barberInquiries,
    seedBatchEditions,
    updateEditionInventory,
    updateOrderStatusAdmin,
    updateBarberStatusAdmin,
  } = usePula();

  const [deskTab, setDeskTab] = useState<'orders' | 'inventory' | 'stockists'>('orders');

  if (!isAdmin) return null;

  const pendingOrders = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  ).length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="border border-charcoal bg-cream rounded-sm overflow-hidden">
        {/* Desk Header */}
        <div className="px-6 sm:px-8 py-6 bg-charcoal text-cream border-b border-charcoal flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ochre font-bold mb-1">
              Maseru Apothecary Desk · Real-Time Sync
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              Batch 001 Fulfillment &amp; Inventory
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
            <div>
              <p className="text-cream/60 text-[10px] uppercase">Open Orders</p>
              <p className="text-lg font-bold text-ochre tabular-nums">{pendingOrders}</p>
            </div>
            <div>
              <p className="text-cream/60 text-[10px] uppercase">Batch Revenue</p>
              <p className="text-lg font-bold text-cream tabular-nums">M{totalRevenue}</p>
            </div>
            <div>
              <p className="text-cream/60 text-[10px] uppercase">Barber Leads</p>
              <p className="text-lg font-bold text-cream tabular-nums">{barberInquiries.length}</p>
            </div>
          </div>
        </div>

        {/* Desk Sub-Navigation */}
        <div className="px-6 sm:px-8 py-3.5 border-b border-charcoal bg-cream-dark/50 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex border border-charcoal rounded-sm bg-cream p-1 gap-1">
            {(
              [
                { id: 'orders', label: `Orders (${orders.length})` },
                { id: 'inventory', label: 'Inventory' },
                { id: 'stockists', label: `Barbershops (${barberInquiries.length})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDeskTab(tab.id)}
                className={`px-3.5 py-2 min-h-[38px] rounded-sm font-mono text-[11px] uppercase font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  deskTab === tab.id
                    ? 'bg-charcoal text-cream'
                    : 'text-charcoal hover:bg-cream-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {!editionsFromDb && (
            <button
              type="button"
              onClick={() => void seedBatchEditions()}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] bg-ochre text-cream hover:bg-charcoal transition-colors rounded-sm font-mono text-[11px] uppercase font-bold cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Sync Default Catalog to Firestore</span>
            </button>
          )}
        </div>

        {/* TAB 1: LIVE ORDERS QUEUE */}
        {deskTab === 'orders' && (
          <div className="divide-y divide-charcoal">
            {orders.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-stone">
                No customer orders placed yet. New orders appear here in real time.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <p className="font-mono text-xs font-bold text-ochre tabular-nums">
                      {order.orderNumber} · M{order.total} ({PAYMENT_LABELS[order.paymentMethod]})
                    </p>
                    <p className="font-display font-bold text-base text-charcoal">
                      {order.customerName} — {order.customerArea}
                      {order.customerPhone ? ` · ${order.customerPhone}` : ''}
                    </p>
                    <p className="font-mono text-xs text-stone tabular-nums">
                      {[
                        order.qtySingle > 0 ? `${order.qtySingle}× Single` : null,
                        order.qtyTwin > 0 ? `${order.qtyTwin}× Twin` : null,
                        order.qtyKit > 0 ? `${order.qtyKit}× Gift Kit` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}{' '}
                      · {order.fulfillment === 'pickup' ? 'Maseru Pickup' : 'Delivery (+M30)'}
                    </p>
                    {order.notes && <p className="text-xs text-stone italic">Note: {order.notes}</p>}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label htmlFor={`status-${order.id}`} className="sr-only">
                      Order status
                    </label>
                    <select
                      id={`status-${order.id}`}
                      value={order.status}
                      onChange={(e) =>
                        void updateOrderStatusAdmin(order.id, e.target.value as OrderStatus)
                      }
                      className="px-3 py-2.5 min-h-[42px] bg-cream-light border border-charcoal rounded-sm font-mono text-xs font-bold text-charcoal uppercase cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pouring">Pouring</option>
                      <option value="ready">Ready</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: LIVE BATCH 001 INVENTORY */}
        {deskTab === 'inventory' && (
          <div className="divide-y divide-charcoal">
            {editions.map((ed) => (
              <div
                key={ed.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-mono text-[11px] text-ochre font-bold uppercase">
                    {ed.code} · {ed.volume}
                  </p>
                  <h3 className="font-display font-bold text-lg text-charcoal">{ed.name}</h3>
                  <p className="font-mono text-xs text-stone tabular-nums">
                    Price: M{ed.price} · Current Stock: {ed.stockCount}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      void updateEditionInventory(ed.id, {
                        stockCount: Math.max(0, ed.stockCount - 1),
                      })
                    }
                    className="w-10 h-10 border border-charcoal bg-cream hover:bg-cream-dark rounded-sm flex items-center justify-center cursor-pointer"
                    aria-label={`Decrease stock for ${ed.name}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-14 text-center font-mono text-sm font-bold text-charcoal tabular-nums">
                    {ed.stockCount}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      void updateEditionInventory(ed.id, {
                        stockCount: ed.stockCount + 1,
                      })
                    }
                    className="w-10 h-10 border border-charcoal bg-cream hover:bg-cream-dark rounded-sm flex items-center justify-center cursor-pointer"
                    aria-label={`Increase stock for ${ed.name}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void updateEditionInventory(ed.id, {
                        stockCount: ed.stockCount + 10,
                      })
                    }
                    className="px-3 h-10 border border-ochre bg-ochre text-cream hover:bg-charcoal hover:border-charcoal transition-colors rounded-sm font-mono text-xs font-bold cursor-pointer"
                  >
                    +10
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: BARBERSHOP LEADS */}
        {deskTab === 'stockists' && (
          <div className="divide-y divide-charcoal">
            {barberInquiries.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-stone">
                No barbershop partner inquiries submitted yet.
              </div>
            ) : (
              barberInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-mono text-xs font-bold text-ochre uppercase">
                      {inq.requestType === 'tester' ? 'Free 5ml Tester' : 'Wholesale Rate Card'} ·{' '}
                      {inq.location}
                    </p>
                    <h3 className="font-display font-bold text-base text-charcoal">
                      {inq.shopName} ({inq.chairs})
                    </h3>
                    <p className="font-mono text-xs text-stone">
                      Contact: {inq.contactName}
                      {inq.phone ? ` · ${inq.phone}` : ''}
                    </p>
                  </div>

                  <select
                    value={inq.status}
                    onChange={(e) =>
                      void updateBarberStatusAdmin(inq.id, e.target.value as BarberInquiryStatus)
                    }
                    className="px-3 py-2.5 min-h-[42px] bg-cream-light border border-charcoal rounded-sm font-mono text-xs font-bold text-charcoal uppercase cursor-pointer"
                  >
                    {(Object.keys(BARBER_STATUS_LABELS) as BarberInquiryStatus[]).map((key) => (
                      <option key={key} value={key}>
                        {BARBER_STATUS_LABELS[key]}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
