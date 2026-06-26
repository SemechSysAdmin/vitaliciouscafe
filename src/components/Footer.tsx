import { Link } from "@tanstack/react-router";
import { Leaf, Instagram, Phone, MapPin, Clock, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-leaf text-primary-foreground">
              <Leaf className="w-4 h-4" />
            </span>
            <span className="font-display text-xl font-bold">{SITE.name}</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Cold-pressed juices, smoothies, and wellness drinks crafted fresh in Abuja — delivered
            straight to your door.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base font-bold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/menu", "Menu"],
              ["/about", "Our Story"],
              ["/subscriptions", "Subscriptions"],
              ["/blog", "Wellness Journal"],
              ["/order", "Order Online"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-bold mb-4">Visit Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              {SITE.address}
            </li>
            <li className="flex gap-2">
              <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              {SITE.phone}
            </li>
            <li className="flex gap-2">
              <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              {SITE.email}
            </li>
            <li className="flex gap-2">
              <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              {SITE.hours}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-bold mb-4">Stay Fresh</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Get weekly wellness tips & exclusive offers.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
              Join
            </button>
          </form>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground"
          >
            <Instagram className="w-4 h-4" /> @vitaliciouscafe
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Made with 🌱 in Abuja</p>
        </div>
      </div>
    </footer>
  );
}
