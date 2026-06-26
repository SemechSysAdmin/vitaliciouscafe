import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter(
      (p) =>
        (active === "All" || p.category === active) &&
        (query === "" ||
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())),
    );
  }, [active, query]);

  return (
    <>
      <Helmet>
        <title>Menu Vitalicious Cafe | Smoothies, Juices & Healthy Drinks</title>
        <meta
          name="description"
          content="Browse our full menu of cold-pressed juices, smoothies, parfaits, protein shakes, ginger shots and wellness drinks."
        />
        <meta property="og:title" content="Menu Vitalicious Cafe" />
        <meta
          property="og:description"
          content="Cold-pressed juices, smoothies, parfaits, protein shakes and more."
        />
      </Helmet>
      <PageLayout>
        <PageHero
          eyebrow="Our Menu"
          title="Crafted fresh, sip after sip"
          subtitle="From cold-pressed juices to protein-packed shakes every drink is made with whole, locally sourced ingredients."
        />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search drinks…"
                className="w-full rounded-full bg-card border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    active === c
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center py-20 text-muted-foreground">No drinks match your search.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </PageLayout>
    </>
  );
}
