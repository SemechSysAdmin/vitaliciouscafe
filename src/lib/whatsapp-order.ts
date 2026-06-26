import type { CartItem, CustomerDetails, FulfillmentMode } from "./types";
import { formatNaira } from "./money";
import { SITE } from "./site";

// Short, human-readable order ref. Not a database ID - just lets the owner
// and customer both refer to "order #A4F2" in conversation if needed.
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateOrderRef(len = 8): string {
  const out = new Array(len);
  const buf = new Uint8Array(len);
  crypto.getRandomValues(buf);
  for (let i = 0; i < len; i++) out[i] = ALPHA[buf[i] % ALPHA.length];
  return out.join("");
}

// Nigerian local numbers: accepts 080..., 070..., +234..., 234...
// Normalizes to 234XXXXXXXXXX (no +, no leading 0) for wa.me.
export function normalizeNigerianPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("234") && digits.length === 13) return digits;
  if (digits.startsWith("0") && digits.length === 11) return "234" + digits.slice(1);
  if (digits.length === 10) return "234" + digits; // bare 10-digit, no leading 0
  return null; // couldn't confidently normalize - caller should treat as invalid
}

interface BuildOrderMessageResult {
  ref: string;
  message: string;
}

export function buildOrderMessage(
  items: CartItem[],
  customer: CustomerDetails,
  mode: FulfillmentMode,
  deliveryFeeKobo: number,
): BuildOrderMessageResult {
  const ref = generateOrderRef();
  const subtotalKobo = items.reduce((s, i) => s + i.priceKobo * i.quantity, 0);
  const totalKobo = subtotalKobo + deliveryFeeKobo;

  const lines: string[] = [];
  lines.push(`*New Order #${ref}*`);
  lines.push("");
  for (const item of items) {
    lines.push(`${item.quantity} x ${item.name} — ${formatNaira(item.priceKobo * item.quantity)}`);
  }
  lines.push("");
  lines.push(`Subtotal: ${formatNaira(subtotalKobo)}`);
  lines.push(
    mode === "delivery"
      ? `Delivery: ${deliveryFeeKobo === 0 ? "Free" : formatNaira(deliveryFeeKobo)}`
      : "Pickup: Kabusa Garden Estate",
  );
  lines.push(`*Total: ${formatNaira(totalKobo)}*`);
  lines.push("");
  lines.push(`Name: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  if (mode === "delivery" && customer.address) {
    lines.push(`Address: ${customer.address}`);
  }
  lines.push(`Fulfillment: ${mode === "delivery" ? "Delivery" : "Pickup"}`);

  return { ref, message: lines.join("\n") };
}

export function buildWhatsAppUrl(message: string): string {
  // SITE.whatsapp is expected to already be a wa.me URL or similar;
  // this builds a fresh one with the prefilled text regardless,
  // so it doesn't depend on SITE.whatsapp's existing query string.
  const phone = SITE.phoneRaw; // raw number, e.g. "2348012345678" - see note below
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
