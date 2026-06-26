import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./types";

interface CartState {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  // derived, exposed as plain functions (not stored) to avoid stale snapshots
  subtotalKobo: () => number;
  itemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      increment: (id) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
        })),

      decrement: (id) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (!existing) return state;
          if (existing.quantity <= 1) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)),
          };
        }),

      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clear: () => set({ items: [] }),

      subtotalKobo: () => get().items.reduce((sum, i) => sum + i.priceKobo * i.quantity, 0),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "shop-cart", // localStorage key
      version: 1,
    },
  ),
);
