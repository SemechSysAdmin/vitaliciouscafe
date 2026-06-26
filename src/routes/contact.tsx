import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";
import { Helmet } from "react-helmet-async";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Vitalicious Cafe | Visit, Call or WhatsApp Us</title>
        <meta
          name="description"
          content="Visit our Kabusa Garden Estate cafe in Abuja, call, WhatsApp or send a message. We're open Mon–Sat 8am–5pm."
        />
        <meta property="og:title" content="Contact Vitalicious Cafe" />
        <meta
          property="og:description"
          content="Get in touch visit our Abuja cafe or order via WhatsApp."
        />
      </Helmet>
      <PageLayout>
        <PageHero
          eyebrow="Get In Touch"
          title="We'd love to hear from you"
          subtitle="Visit us, call us, WhatsApp us or fill out the form. We respond within 24 hours."
        />

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10">
          {/* INFO + FORM */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, title: "Visit", value: SITE.address },
                { icon: Phone, title: "Call", value: SITE.phone },
                { icon: Mail, title: "Email", value: SITE.email },
                { icon: Clock, title: "Hours", value: SITE.hours },
              ].map((c) => (
                <div
                  key={c.title}
                  className="bg-card rounded-2xl p-5 shadow-card border border-border/50"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-leaf text-primary-foreground">
                    <c.icon className="w-4 h-4" />
                  </span>
                  <p className="mt-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    {c.title}
                  </p>
                  <p className="mt-1 text-sm font-medium">{c.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_145)] text-white px-5 py-3 text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold"
              >
                <Facebook className="w-4 h-4" /> Facebook
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold"
              >
                <Twitter className="w-4 h-4" /> Twitter
              </a>
            </div>
          </div>

          {/* MAP */}
          <div className="lg:sticky lg:top-24 self-start space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-card border border-border/50 aspect-4/3 bg-secondary">
              <iframe
                title="Vitalicious Cafe location"
                src="https://www.google.com/maps?q=Plot+623+Mission+Road,+Abuja&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
            <div className="bg-gradient-leaf text-primary-foreground rounded-3xl p-6 shadow-card">
              <h3 className="font-display text-xl font-bold">Delivery zones</h3>
              <p className="mt-2 text-sm opacity-90">
                We deliver same-day across Abuja: Maitama, Asokoro, Wuse, Garki, Jabi, Gwarinpa,
                Lugbe and surrounding areas.
              </p>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
