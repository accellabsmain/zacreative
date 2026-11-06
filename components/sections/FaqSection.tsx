"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildWhatsAppLink } from "@/lib/constants";
import { FAQ_COPY } from "@/lib/copywriting";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      className="w-full bg-[#F8FAFC] dark:bg-[#070D18] py-16 sm:py-24 border-b border-[#E2E8F0] dark:border-zinc-800 transition-colors text-left"
      id="faq"
      data-purpose="faq-section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: FAQ Context & Green Gradient WhatsApp Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                {FAQ_COPY.heading}
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-zinc-400 leading-relaxed">
                {FAQ_COPY.description}
              </p>
            </div>

            {/* Fast WhatsApp Box (Green Gradient matching WhatsApp CTA palette) */}
            <div
              id="kontak"
              className="relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-leaf-deep via-leaf-strong to-[#239c57] text-white border border-leaf/30 shadow-[0_20px_45px_-15px_rgba(15,92,51,0.45)] space-y-4 scroll-mt-28"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-12 h-48 w-48 rounded-full bg-leaf/35 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-12 h-44 w-44 rounded-full bg-black/20 blur-3xl"
              />

              <div className="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-xs">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-80" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7ef0a6]" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-white font-bold">
                  {FAQ_COPY.whatsappBox.badge}
                </span>
              </div>

              <h3 className="relative font-bold text-base sm:text-lg text-white leading-snug">
                {FAQ_COPY.whatsappBox.heading}
              </h3>

              <p className="relative text-xs sm:text-sm text-white/90 leading-relaxed">
                {FAQ_COPY.whatsappBox.description}
              </p>

              <a
                className="relative group w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-leaf-tint text-leaf-deep text-xs sm:text-sm font-bold transition-all duration-200 shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                href={buildWhatsAppLink(FAQ_COPY.whatsappBox.whatsappMessage)}
                rel="noopener noreferrer"
                target="_blank"
              >
                <WhatsAppIcon className="w-4 h-4 text-leaf-strong shrink-0" />
                <span>{FAQ_COPY.whatsappBox.ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Q&A list */}
          <div className="lg:col-span-7 space-y-3">
            {FAQ_COPY.items.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${isOpen
                      ? "border-[#1A54A4] dark:border-[#38BDF8] bg-white dark:bg-zinc-900 shadow-xs"
                      : "border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-white pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${isOpen
                          ? "bg-[#1A54A4] text-white dark:bg-[#38BDF8] dark:text-[#0F172A] border-[#1A54A4]"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-500"
                        }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#424751] dark:text-zinc-300 leading-relaxed border-t border-[#E2E8F0] dark:border-zinc-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
