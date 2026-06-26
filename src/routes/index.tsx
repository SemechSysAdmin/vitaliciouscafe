import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MessageCircle,
  Leaf,
  Sparkles,
  Truck,
  Heart,
  Star,
  Quote,
  Instagram,
} from "lucide-react";
import heroImg from "@/assets/hero-drinks.jpg";
import cafeImg from "@/assets/cafe-interior.jpg";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { PageLayout } from "@/components/PageLayout";
import { SITE } from "@/lib/site";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <>
      <Helmet>
        <title>Vitalicious Cafe Freshly Made Healthy Drinks Delivered</title>
        <meta
          name="description"
          content="Refreshing smoothies, juices, parfaits & wellness drinks crafted in Abuja. Order online for delivery or pickup."
        />
        <meta property="og:title" content="Vitalicious Cafe Healthy Drinks Delivered" />
        <meta
          property="og:description"
          content="Cold-pressed juices, smoothies & wellness drinks crafted to energize your day."
        />
      </Helmet>
      <PageLayout>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/25 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Fresh · Local · Cold-Pressed
              </span>
              <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
                Freshly Made <span className="text-primary">Healthy Drinks</span> Delivered To You
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl text-balance">
                Refreshing smoothies, juices, parfaits and wellness drinks crafted to energize your
                day blended with love in the heart of Abuja.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/order"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold shadow-soft hover:shadow-glow transition-all"
                >
                  Order Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-6 py-3.5 text-sm font-semibold hover:bg-secondary transition"
                >
                  View Menu
                </Link>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_145)] text-white px-6 py-3.5 text-sm font-semibold hover:opacity-90 transition"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                  <span className="ml-1 font-semibold text-foreground">4.9</span>
                </div>
                <span>500+ happy customers</span>
              </div>
            </div>

            <div className="relative animate-fade-up">
              <div className="absolute inset-0 bg-gradient-leaf rounded-[3rem] rotate-3 opacity-20 blur-2xl" />
              <img
                src={heroImg}
                alt="Fresh smoothies and juices in elegant glasses"
                width={1536}
                height={1024}
                className="relative w-full rounded-[2.5rem] shadow-glow object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-card p-4 flex items-center gap-3 animate-float">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-gradient-leaf text-primary-foreground">
                  <Leaf className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Made fresh</p>
                  <p className="font-semibold text-sm">Every single morning</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROMO BANNER */}
        <section className="bg-gradient-leaf text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Free delivery within Abuja on orders above ₦15,000 try our 7-Day Detox Plan</span>
            <Link to="/subscriptions" className="underline underline-offset-4 font-semibold">
              Learn more →
            </Link>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Bestsellers
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
                Popular drinks our customers love
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              See full menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-secondary/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Why Vitalicious
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
                Wellness in every sip
              </h2>
              <p className="mt-4 text-muted-foreground">
                We source the freshest local produce and craft each drink with intention no
                shortcuts, no compromises.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Leaf,
                  title: "100% Natural",
                  desc: "Real fruits, vegetables and superfoods. Never any artificial additives or refined sugars.",
                },
                {
                  icon: Sparkles,
                  title: "Cold-Pressed Daily",
                  desc: "We press every juice the same morning so vitamins, enzymes and flavor stay alive.",
                },
                {
                  icon: Truck,
                  title: "Fast Delivery",
                  desc: "Same-day delivery across Abuja so your wellness reaches you ice-cold and ready.",
                },
              ].map((f) => (
                <div key={f.title} className="bg-card rounded-3xl p-8 shadow-card hover-lift">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-leaf text-primary-foreground">
                    <f.icon className="w-6 h-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIFESTYLE SPLIT */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={cafeImg}
            alt="Vitalicious Cafe interior in Abuja"
            loading="lazy"
            width={1280}
            height={832}
            className="rounded-[2.5rem] shadow-card object-cover w-full"
          />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Healthy Lifestyle
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
              Fuel your day, the vitality way
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you're heading to the gym, powering through deadlines, or simply choosing
              better our drinks are designed to fit seamlessly into the rhythm of busy, modern life.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Locally sourced fruits & vegetables",
                "No refined sugars or preservatives",
                "Vegan, dairy-free & high-protein options",
                "Reusable, eco-friendly packaging",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-primary/10 text-primary mt-0.5">
                    <Heart className="w-3 h-3 fill-current" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              Our story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-gradient-hero py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Loved by locals
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
                Words from our community
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Aisha O.",
                  role: "Fitness Coach",
                  quote:
                    "The Berry Protein Shake is my go-to after every session. Real ingredients, real results.",
                },
                {
                  name: "David M.",
                  role: "Office Manager",
                  quote:
                    "I subscribe to their weekly juice plan best decision for my energy levels and skin.",
                },
                {
                  name: "Chiamaka E.",
                  role: "Student",
                  quote:
                    "Beautiful cafe, friendly staff, and the green smoothie is everything. 10/10.",
                },
              ].map((t) => (
                <div key={t.name} className="bg-card rounded-3xl p-7 shadow-card relative">
                  <Quote className="w-8 h-8 text-primary/20 absolute top-5 right-5" />
                  <p className="text-sm leading-relaxed">{t.quote}</p>
                  <div className="mt-5 pt-5 border-t border-border">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERY INFO */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-card rounded-[2.5rem] p-8 sm:p-12 shadow-card border border-border/50 text-center">
            <Truck className="w-10 h-10 text-primary mx-auto" />
            <h2 className="mt-4 font-display text-3xl font-bold">Same-day delivery across Abuja</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Order before 2 PM and we'll deliver chilled and ready to enjoy the same day. Pickup
              also available at our Kabusa Garden Estate cafe.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/order"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-soft hover:shadow-glow transition-all"
              >
                Start your order
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary transition"
              >
                Delivery zones
              </Link>
            </div>
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                @vitaliciouscafe
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold">Follow the freshness</h2>
            </div>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <Instagram className="w-4 h-4" /> Follow on Instagram
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PRODUCTS.slice(0, 6).map((p) => (
              <a
                key={p.id}
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl bg-secondary"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition grid place-items-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </PageLayout>
    </>
  );
}
