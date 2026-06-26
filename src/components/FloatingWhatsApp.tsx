import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_145)] text-white pl-4 pr-5 py-3 shadow-glow hover:scale-105 transition-transform animate-float"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:inline">Order on WhatsApp</span>
    </a>
  );
}
