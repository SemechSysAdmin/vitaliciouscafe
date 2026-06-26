import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, Store, MessageCircle, CreditCard, Plus, Minus, Trash2 } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { PRODUCTS } from "@/lib/products";
import { Helmet } from "react-helmet-async";
import { useCart } from "@/lib/cart-store";
import { usePendingOrder } from "@/lib/pending-order-store";
import { buildOrderMessage, buildWhatsAppUrl, normalizeNigerianPhone } from "@/lib/whatsapp-order";
import { formatNaira } from "@/lib/money";
import type { CustomerDetails, FulfillmentMode } from "@/lib/types";

export const Route = createFileRoute("/order")({
  component: OrderPage,
});

const FREE_DELIVERY_THRESHOLD_KOBO = 1_500_000; // ₦15,000
const DELIVERY_FEE_KOBO = 150_000; // ₦1,500

function OrderPage() {
  const items = useCart((s) => s.items);
  const add = useCart((s) => s.add);
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const removeItem = useCart((s) => s.remove);
  const subtotalKobo = useCart((s) => s.subtotalKobo);
  const clearCart = useCart((s) => s.clear);
  const setPending = usePendingOrder((s) => s.setPending);

  const [mode, setMode] = useState<FulfillmentMode>("delivery");
  const [customer, setCustomer] = useState<CustomerDetails>({ name: "", phone: "", address: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [sentRef, setSentRef] = useState<string | null>(null);

  const qtyFor = (id: string) => items.find((i) => i.id === id)?.quantity ?? 0;

  const subtotal = subtotalKobo();
  const deliveryFeeKobo =
    mode === "delivery" && subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD_KOBO
      ? DELIVERY_FEE_KOBO
      : 0;
  const totalKobo = subtotal + deliveryFeeKobo;

  const handleSendWhatsApp = () => {
    setFormError(null);

    if (!customer.name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    const normalizedPhone = normalizeNigerianPhone(customer.phone);
    if (!normalizedPhone) {
      setFormError("Please enter a valid Nigerian phone number.");
      return;
    }
    if (mode === "delivery" && !customer.address?.trim()) {
      setFormError("Please enter a delivery address.");
      return;
    }

    const normalizedCustomer: CustomerDetails = { ...customer, phone: normalizedPhone };
    const { ref, message } = buildOrderMessage(items, normalizedCustomer, mode, deliveryFeeKobo);
    const url = buildWhatsAppUrl(message);

    setPending({
      ref,
      items,
      customer: normalizedCustomer,
      mode,
      subtotalKobo: subtotal,
      deliveryFeeKobo,
      totalKobo,
      createdAt: Date.now(),
      status: "pending_confirmation",
    });

    window.open(url, "_blank", "noopener,noreferrer");
    setSentRef(ref);
    clearCart();
  };

  return (
    <>
      <Helmet>
        <title>Order Online Vitalicious Cafe | Delivery & Pickup in Abujas</title>
        <meta
          name="description"
          content="Order fresh juices, smoothies and healthy drinks online. Same-day delivery across Abuja or pickup at our Kabusa Garden Estate cafe."
        />
        <meta property="og:title" content="Order Online Vitalicious Cafe" />
        <meta
          property="og:description"
          content="Same-day delivery in Abuja or pickup. Order online or via WhatsApp."
        />
      </Helmet>
      <PageLayout>
        <PageHero
          eyebrow="Order Online"
          title="Your wellness, delivered"
          subtitle="Build your order, choose delivery or pickup, and pay securely or send it straight to WhatsApp."
        />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
          {/* MENU PICKER */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-display text-2xl font-bold mb-3">Choose your drinks</h2>
            {PRODUCTS.map((p) => {
              const qty = qtyFor(p.id);
              return (
                <div
                  key={p.id}
                  className="flex gap-4 items-center bg-card rounded-2xl p-3 shadow-card border border-border/50"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>
                    <p className="mt-1 font-display font-bold text-primary">{p.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {qty > 0 ? (
                      <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
                        <button
                          onClick={() => decrement(p.id)}
                          className="w-8 h-8 grid place-items-center rounded-full bg-background"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                        <button
                          onClick={() => increment(p.id)}
                          className="w-8 h-8 grid place-items-center rounded-full bg-primary text-primary-foreground"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          add({ id: p.id, name: p.name, image: p.image, priceKobo: p.priceKobo })
                        }
                        className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CART */}
          <aside className="lg:sticky lg:top-24 self-start bg-card rounded-3xl p-6 shadow-card border border-border/50">
            <h2 className="font-display text-xl font-bold">Your cart</h2>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode("delivery")}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${mode === "delivery" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
              >
                <Truck className="w-4 h-4" /> Delivery
              </button>
              <button
                onClick={() => setMode("pickup")}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${mode === "pickup" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
              >
                <Store className="w-4 h-4" /> Pickup
              </button>
            </div>

            {items.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground text-center py-8">
                {sentRef
                  ? `Order #${sentRef} sent! We'll confirm via WhatsApp.`
                  : "Your cart is empty. Add some goodness!"}
              </p>
            ) : (
              <>
                <ul className="mt-5 space-y-3 max-h-72 overflow-y-auto pr-1">
                  {items.map((i) => (
                    <li key={i.id} className="flex items-center gap-3 text-sm">
                      <img
                        src={i.image}
                        alt={i.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{i.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {i.quantity} × {formatNaira(i.priceKobo)}
                        </p>
                      </div>
                      <span className="font-semibold">{formatNaira(i.priceKobo * i.quantity)}</span>
                      <button
                        onClick={() => removeItem(i.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatNaira(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {mode === "delivery" ? "Delivery" : "Pickup"}
                    </span>
                    <span>{deliveryFeeKobo === 0 ? "Free" : formatNaira(deliveryFeeKobo)}</span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-lg pt-2">
                    <span>Total</span>
                    <span className="text-primary">{formatNaira(totalKobo)}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <input
                    placeholder="Your name"
                    value={customer.name}
                    onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                    className="w-full rounded-xl bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    placeholder="Phone number"
                    value={customer.phone}
                    onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                    className="w-full rounded-xl bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {mode === "delivery" && (
                    <input
                      placeholder="Delivery address"
                      value={customer.address ?? ""}
                      onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                      className="w-full rounded-xl bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  )}
                </div>

                {formError && (
                  <p className="mt-2 text-xs text-destructive text-center">{formError}</p>
                )}

                <button
                  disabled
                  title="Online payment coming soon — send your order via WhatsApp for now"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary/40 text-primary-foreground py-3 text-sm font-semibold cursor-not-allowed"
                >
                  <CreditCard className="w-4 h-4" /> Checkout {formatNaira(totalKobo)}
                </button>
                <button
                  onClick={handleSendWhatsApp}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[oklch(0.65_0.18_145)] text-white py-3 text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" /> Send order on WhatsApp
                </button>
                <p className="mt-3 text-[10px] text-muted-foreground text-center">
                  Payment options coming soon Card · Transfer · Cash on delivery
                </p>
              </>
            )}
          </aside>
        </section>
      </PageLayout>
    </>
  );
}
