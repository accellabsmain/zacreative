"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildWhatsAppLink } from "@/lib/constants";

const SHOW_AFTER_PX = 420;

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed z-40 bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <a
        id="floating-whatsapp-cta"
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat konsultasi via WhatsApp"
        tabIndex={visible ? 0 : -1}
        className="group relative inline-flex items-center gap-2.5 rounded-full bg-leaf-strong hover:bg-leaf-hover text-white p-3.5 sm:px-5 sm:py-3.5 shadow-[0_14px_32px_-6px_rgba(31,143,80,0.55)] ring-1 ring-white/25 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-leaf/50 cursor-pointer"
      >
        {/* Subtle pulse ring — automatically disabled under prefers-reduced-motion */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-leaf animate-wa-ring motion-reduce:hidden"
        />
        <WhatsAppIcon className="relative h-6 w-6 sm:h-5 sm:w-5 shrink-0" />
        <span className="relative hidden sm:inline text-sm font-semibold tracking-tight pr-0.5">
          Chat WhatsApp
        </span>
      </a>
    </div>
  );
}

