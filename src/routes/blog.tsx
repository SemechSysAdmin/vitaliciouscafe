import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import smoothie from "@/assets/product-smoothie.jpg";
import detox from "@/assets/product-detox.jpg";
import protein from "@/assets/product-protein.jpg";
import fruitbowl from "@/assets/product-fruitbowl.jpg";
import ginger from "@/assets/product-ginger.jpg";
import parfait from "@/assets/product-parfait.jpg";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

const POSTS = [
  {
    id: "1",
    title: "5 Reasons Cold-Pressed Juice Is a Game-Changer",
    excerpt: "Discover why cold-pressed beats centrifugal and what it means for your body.",
    image: smoothie,
    category: "Juice Benefits",
    date: "May 8, 2026",
    read: "4 min",
  },
  {
    id: "2",
    title: "The Beginner's Guide to a 3-Day Juice Cleanse",
    excerpt: "Everything you need to know before starting your first reset.",
    image: detox,
    category: "Detox",
    date: "May 1, 2026",
    read: "6 min",
  },
  {
    id: "3",
    title: "Pre vs Post-Workout: What to Drink and When",
    excerpt: "Optimize your performance with the right fuel at the right time.",
    image: protein,
    category: "Fitness",
    date: "Apr 24, 2026",
    read: "5 min",
  },
  {
    id: "4",
    title: "10 Smoothie Recipes for Glowing Skin",
    excerpt: "Antioxidant-packed blends your skin will thank you for.",
    image: fruitbowl,
    category: "Recipes",
    date: "Apr 17, 2026",
    read: "7 min",
  },
  {
    id: "5",
    title: "Why Your Mornings Need a Ginger Shot",
    excerpt: "The tiny ritual making a huge difference in immunity.",
    image: ginger,
    category: "Wellness",
    date: "Apr 10, 2026",
    read: "3 min",
  },
  {
    id: "6",
    title: "Building a Healthier Breakfast in 5 Minutes",
    excerpt: "Parfaits, bowls and quick wins for busy mornings.",
    image: parfait,
    category: "Nutrition",
    date: "Apr 3, 2026",
    read: "5 min",
  },
];

const CATS = ["All", "Juice Benefits", "Detox", "Fitness", "Recipes", "Wellness", "Nutrition"];

function BlogPage() {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      POSTS.filter(
        (p) =>
          (active === "All" || p.category === active) &&
          (q === "" || p.title.toLowerCase().includes(q.toLowerCase())),
      ),
    [active, q],
  );

  return (
    <>
      <Helmet>
        <title>Wellness Journal Vitalicious Cafe | Healthy Living Blog</title>
        <meta
          name="description"
          content="Healthy living articles, smoothie recipes, fitness tips and nutrition insights from Vitalicious Cafe."
        />
        <meta property="og:title" content="Wellness Journal Vitalicious Cafe" />
        <meta
          property="og:description"
          content="Healthy living tips, recipes and nutrition advice."
        />
      </Helmet>
      <PageLayout>
        <PageHero
          eyebrow="Wellness Journal"
          title="Stories, recipes & healthy living tips"
          subtitle="Practical insights to help you eat better, move stronger and live more vibrantly."
        />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-10">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles…"
                className="w-full rounded-full bg-card border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    active === c
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary hover:bg-muted"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group hover-lift bg-card rounded-3xl overflow-hidden shadow-card border border-border/50"
              >
                <div className="aspect-16/10 overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 font-semibold">
                      {p.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {p.date}
                    </span>
                    <span>· {p.read}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </PageLayout>
    </>
  );
}
