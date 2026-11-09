"use client";

import { useState } from "react";
import { Plus, Minus, ChevronDown, ChevronsUpDown } from "lucide-react";
import { FAQ_COPY } from "@/lib/copywriting";

export default function FaqSection() {
  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(true);
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const allFaqsOpen = openIndices.length === FAQ_COPY.items.length;

  const toggleFaq = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleAllFaqs = () => {
    if (allFaqsOpen) {
      setOpenIndices([]);
    } else {
      setOpenIndices(FAQ_COPY.items.map((_, idx) => idx));
    }
  };

  return (
    <section
      className="w-full bg-[#F8FAFC] dark:bg-[#070D18] py-14 sm:py-20 border-b border-[#E2E8F0] dark:border-zinc-800 transition-colors text-left"
      id="faq"
      data-purpose="faq-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Header Bar with Shrink & Expand Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white">
              {FAQ_COPY.heading}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#64748B] dark:text-zinc-400 leading-relaxed">
              {FAQ_COPY.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {isSectionExpanded && (
              <button
                type="button"
                onClick={toggleAllFaqs}
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-zinc-200 hover:border-[#134282] hover:text-[#134282] dark:hover:border-sky-400 dark:hover:text-sky-400 transition-colors cursor-pointer"
              >
                <ChevronsUpDown className="w-4 h-4 shrink-0" />
                <span>{allFaqsOpen ? "Tutup Semua Jawaban" : "Buka Semua Jawaban"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsSectionExpanded((prev) => !prev)}
              aria-expanded={isSectionExpanded}
              aria-controls="faq-list"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#134282] hover:bg-[#0e3263] text-white px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134282]"
            >
              <span>{isSectionExpanded ? "Sembunyikan FAQ" : "Tampilkan FAQ"}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                  isSectionExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Accordion Q&A list (Collapsible Section) */}
        {isSectionExpanded && (
          <div
            id="faq-list"
            className="space-y-3 w-full animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {FAQ_COPY.items.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "border-[#1A54A4] dark:border-[#38BDF8] bg-white dark:bg-zinc-900 shadow-xs"
                      : "border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-white pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#1A54A4] text-white dark:bg-[#38BDF8] dark:text-[#0F172A] border-[#1A54A4]"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-500"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#424751] dark:text-zinc-300 leading-relaxed border-t border-[#E2E8F0] dark:border-zinc-800 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
