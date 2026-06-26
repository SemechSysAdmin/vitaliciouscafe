import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Heart, Sprout, Award } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import cafeImg from "@/assets/cafe-interior.jpg";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Vitalicious Cafe | Our Healthy Living Story</title>
        <meta
          name="description"
          content="Learn about Vitalicious Cafe's mission to bring fresh, healthy, locally crafted drinks to Abuja."
        />
        <meta property="og:title" content="About Vitalicious Cafe" />
        <meta
          property="og:description"
          content="Our story, mission, and commitment to fresh ingredients."
        />
      </Helmet>
      <PageLayout>
        <PageHero
          eyebrow="Our Story"
          title="A cafe born from love for healthy living"
          subtitle="We started with one simple belief: that wellness should taste incredible and feel effortless."
        />

        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={cafeImg}
            alt="Inside Vitalicious Cafe"
            loading="lazy"
            className="rounded-[2.5rem] shadow-card w-full"
          />
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              From farm to glass the Vitality way
            </h2>
            <p className="mt-5 text-muted-foreground">
              Vitalicious Cafe began as a small dream in Abuja: to give busy professionals,
              families, fitness lovers and curious minds a place to refuel without compromise. Every
              smoothie, every juice, every parfait is made the way we'd make it for our own family —
              with whole foods, careful sourcing, and zero shortcuts.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today we serve hundreds of customers each week, both at our Kabusa Garden Estate cafe
              and through delivery across Abuja. The mission stays the same: real food, made with
              love, that makes you feel alive.
            </p>
          </div>
        </section>

        <section className="bg-secondary/40 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-3xl sm:text-4xl font-bold">
              What we stand for
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Sprout,
                  title: "Fresh Ingredients",
                  desc: "Sourced from trusted local farms never frozen, never compromised.",
                },
                {
                  icon: Heart,
                  title: "Healthy Living",
                  desc: "Every recipe designed to nourish, energize and fit a busy lifestyle.",
                },
                {
                  icon: Award,
                  title: "Quality First",
                  desc: "Cold-pressed in small batches. If it isn't perfect, it doesn't leave the cafe.",
                },
                {
                  icon: Leaf,
                  title: "Sustainability",
                  desc: "Eco-friendly packaging and a zero-waste kitchen culture.",
                },
              ].map((v) => (
                <div key={v.title} className="bg-card rounded-3xl p-7 shadow-card hover-lift">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-leaf text-primary-foreground">
                    <v.icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Our Mission
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-balance">
            To make healthy living the easiest, most delicious choice in Abuja.
          </h2>
        </section>
      </PageLayout>
    </>
  );
}
