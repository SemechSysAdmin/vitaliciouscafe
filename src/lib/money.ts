export function formatNaira(kobo: number): string {
  const naira = kobo / 100;
  return "₦" + naira.toLocaleString("en-NG", { maximumFractionDigits: 2 });
}

// Parses a display string like "₦2,500" or "₦2,500.50" into integer kobo.
// Use this ONLY at the data-authoring boundary (e.g. migrating PRODUCTS),
// never at render time should read priceKobo directly.
export function parseNairaStringToKobo(display: string): number {
  const cleaned = display.replace(/[^\d.]/g, "");
  const naira = parseFloat(cleaned);
  if (Number.isNaN(naira)) {
    throw new Error(`Cannot parse price string: "${display}"`);
  }
  return Math.round(naira * 100);
}
