import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Truck, Store, MessageCircle, Plus, Minus, Trash2 } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { PRODUCTS } from "@/lib/products";
import { Helmet } from "react-helmet-async";
import { useCart } from "@/lib/cart-store";
import { usePendingOrder } from "@/lib/pending-order-store";
import { buildOrderMessage, buildWhatsAppUrl, normalizeNigerianPhone } from "@/lib/whatsapp-order";
import { formatNaira } from "@/lib/money";
import type { FulfillmentMode } from "@/lib/types";

export const Route = createFileRoute("/order")({
  component: OrderPage,
});

const FREE_DELIVERY_THRESHOLD_KOBO = 15_000 * 100;
const DELIVERY_FEE_KOBO = 1_500 * 100;

function OrderPage() {
  const items = useCart((s) => s.items);
  const add = useCart((s) => s.add);
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  const pending = usePendingOrder((s) => s.pending);
  const setPending = usePendingOrder((s) => s.setPending);
  const resolvePending = usePendingOrder((s) => s.resolve);

  const [mode, setMode] = useState<FulfillmentMode>("delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);

  // If a pending order exists from a previous session (tab killed before
  // confirmation), restore the mode so the confirmation banner has context.
  useEffect(() => {
    if (pending) setMode(pending.mode);
  }, [pending]);

  const subtotalKobo = items.reduce((s, i) => s + i.priceKobo * i.quantity, 0);
  const deliveryFeeKobo =
    mode === "delivery" && subtotalKobo > 0 && subtotalKobo < FREE_DELIVERY_THRESHOLD_KOBO
      ? DELIVERY_FEE_KOBO
      : 0;
  const totalKobo = subtotalKobo + deliveryFeeKobo;

  const normalizedPhone = normalizeNigerianPhone(phone);
  const isValid =
    items.length > 0 &&
    name.trim().length > 0 &&
    normalizedPhone !== null &&
    (mode === "pickup" || address.trim().length > 0);

  const waMessage = isValid
    ? buildOrderMessage(
        items,
        { name: name.trim(), phone: normalizedPhone!, address: address.trim() || undefined },
        mode,
        deliveryFeeKobo,
      )
    : null;
  const waUrl = waMessage ? buildWhatsAppUrl(waMessage.message) : undefined;

  function handleSendClick() {
    setTouched(true);
    if (!isValid || !waMessage) return;
    // The anchor's href does the actual navigation natively (no window.open,
    // no popup-blocker risk). This handler only records that we *initiated*
    // the handoff - it does NOT clear the cart. Only explicit human
    // confirmation below does that.
    setPending({
      ref: waMessage.ref,
      items,
      customer: {
        name: name.trim(),
        phone: normalizedPhone!,
        address: address.trim() || undefined,
      },
      mode,
      subtotalKobo,
      deliveryFeeKobo,
      totalKobo,
      createdAt: Date.now(),
      status: "pending_confirmation",
    });
  }

  function handleConfirmSent() {
    resolvePending();
    clear();
    setName("");
    setPhone("");
    setAddress("");
    setTouched(false);
  }

  function handleNotSent() {
    // User says WhatsApp didn't actually go through, or they backed out.
    // Drop the pending record but deliberately leave the cart intact -
    // they didn't say the order is wrong, just that the handoff failed.
    resolvePending();
  }

  const fmt = formatNaira;

  return (
    <>
      <Helmet>
        <title>Order Online Vitalicious Cafe | Delivery & Pickup in Abuja</title>
        <meta
          name="description"
          content="Order fresh juices, smoothies and healthy drinks online. Same-day delivery across Abuja or pickup at our Kabusa Garden Estate cafe."
        />
      </Helmet>
      <PageLayout>
        <PageHero
          eyebrow="Order Online"
          title="Your wellness, delivered"
          subtitle="Build your order, choose delivery or pickup, then send it straight to WhatsApp."
        />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
          {/* MENU PICKER */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-display text-2xl font-bold mb-3">Choose your drinks</h2>
            {PRODUCTS.map((p) => {
              const cartItem = items.find((i) => i.id === p.id);
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
                    {cartItem ? (
                      <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
                        <button
                          onClick={() => decrement(p.id)}
                          className="w-8 h-8 grid place-items-center rounded-full bg-background"
                          aria-label={`Remove one ${p.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => increment(p.id)}
                          className="w-8 h-8 grid place-items-center rounded-full bg-primary text-primary-foreground"
                          aria-label={`Add one more ${p.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          add({
                            id: p.id,
                            name: p.name,
                            image: p.image,
                            priceKobo: p.priceKobo,
                          })
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

          {/* CART / CHECKOUT */}
          <aside className="lg:sticky lg:top-24 self-start bg-card rounded-3xl p-6 shadow-card border border-border/50">
            {pending ? (
              <PendingConfirmation
                orderRef={pending.ref}
                onConfirm={handleConfirmSent}
                onDeny={handleNotSent}
              />
            ) : (
              <>
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
                    Your cart is empty. Add some goodness!
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
                              {i.quantity} × {fmt(i.priceKobo)}
                            </p>
                          </div>
                          <span className="font-semibold">{fmt(i.priceKobo * i.quantity)}</span>
                          <button
                            onClick={() => remove(i.id)}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label={`Remove ${i.name} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{fmt(subtotalKobo)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {mode === "delivery" ? "Delivery" : "Pickup"}
                        </span>
                        <span>{deliveryFeeKobo === 0 ? "Free" : fmt(deliveryFeeKobo)}</span>
                      </div>
                      <div className="flex justify-between font-display font-bold text-lg pt-2">
                        <span>Total</span>
                        <span className="text-primary">{fmt(totalKobo)}</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-xl bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number (e.g. 0801 234 5678)"
                        className="w-full rounded-xl bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      {touched && phone && !normalizedPhone && (
                        <p className="text-xs text-destructive">Enter a valid Nigerian number.</p>
                      )}
                      {mode === "delivery" && (
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Delivery address"
                          className="w-full rounded-xl bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      )}
                    </div>

                    <a
                      href={waUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!isValid) e.preventDefault();
                        handleSendClick();
                      }}
                      className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all ${
                        isValid
                          ? "bg-[oklch(0.65_0.18_145)] text-white hover:opacity-90"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" /> Send Order via WhatsApp
                    </a>
                    {touched && !isValid && (
                      <p className="mt-2 text-xs text-destructive text-center">
                        {items.length === 0
                          ? "Add at least one item."
                          : "Fill in your name, a valid phone number" +
                            (mode === "delivery" ? ", and delivery address." : ".")}
                      </p>
                    )}
                    <p className="mt-3 text-[10px] text-muted-foreground text-center">
                      This opens WhatsApp with your order pre-filled — you tap Send to confirm.
                    </p>
                  </>
                )}
              </>
            )}
          </aside>
        </section>
      </PageLayout>
    </>
  );
}

function PendingConfirmation({
  orderRef,
  onConfirm,
  onDeny,
}: {
  orderRef: string;
  onConfirm: () => void;
  onDeny: () => void;
}) {
  return (
    <div className="text-center py-4">
      <MessageCircle className="w-10 h-10 text-primary mx-auto" />
      <h2 className="mt-4 font-display text-xl font-bold">Order #{orderRef}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        WhatsApp should have opened with your order typed in.
      </p>
      <p className="mt-1 text-sm font-medium">Did you tap Send in WhatsApp?</p>
      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={onConfirm}
          className="w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-semibold"
        >
          Yes, I sent it
        </button>
        <button
          onClick={onDeny}
          className="w-full rounded-full bg-secondary py-3 text-sm font-semibold"
        >
          No, let me fix something
        </button>
      </div>
    </div>
  );
}
