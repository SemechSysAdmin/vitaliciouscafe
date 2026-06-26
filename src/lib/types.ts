// All money handled in kobo (integer) to avoid float/string-parsing bugs.
// 1 naira = 100 kobo. Format with formatNaira() at display time only.

export interface CartItem {
  id: string;
  name: string;
  image: string;
  priceKobo: number;
  quantity: number;
}

export type FulfillmentMode = "delivery" | "pickup";

export interface CustomerDetails {
  name: string;
  phone: string; // E.164-ish, Nigerian local format normalized before use
  address?: string; // required for delivery, absent for pickup
}

export type PendingOrderStatus = "pending_confirmation";

export interface PendingOrder {
  ref: string;
  items: CartItem[];
  customer: CustomerDetails;
  mode: FulfillmentMode;
  subtotalKobo: number;
  deliveryFeeKobo: number;
  totalKobo: number;
  createdAt: number;
  status: PendingOrderStatus;
}
