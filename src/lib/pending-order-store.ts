import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PendingOrder } from "./types";

interface PendingOrderState {
  pending: PendingOrder | null;
  setPending: (order: PendingOrder) => void;
  resolve: () => void;
}

export const usePendingOrder = create<PendingOrderState>()(
  persist(
    (set) => ({
      pending: null,
      setPending: (order) => set({ pending: order }),
      resolve: () => set({ pending: null }),
    }),
    {
      name: "shop-pending-order",
      version: 1,
    },
  ),
);
