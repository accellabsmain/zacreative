"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import {
  BookOpen,
  Presentation,
  Megaphone,
  Check,
  Plus,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "layout-buku": BookOpen,
  presentasi: Presentation,
  "poster-kampanye": Megaphone,
};

const SLUGS: Record<string, string> = {
  "layout-buku": "layout-buku-editorial",
  presentasi: "pitch-deck-eksekutif",
  "poster-kampanye": "poster-key-visual",
};

export default function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      className="py-20 sm:py-24 lg:py-28 border-b border-[#E2E8F0] dark:border-zinc-800 transition-colors"
      data-purpose="core-services"
      id="layanan"
      aria-labelledby="layanan-heading"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand dark:text-sky-soft">
              <span className="h-px w-8 bg-sky" aria-hidden="true" />
              Layanan
            </p>
            <h2
              id="layanan-heading"
              className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] text-[#0F172A] dark:text-white"
            >
              Tiga layanan inti, satu standar editorial.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start gap-5">
            <p className="text-base leading-relaxed text-[#475569] dark:text-zinc-400">
              Dari naskah ratusan halaman hingga satu poster kampanye, setiap proyek dikerjakan
              dengan sistem grid, tipografi, dan kontrol kualitas yang sama.
            </p>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A] dark:text-white rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1A54A4]/30 cursor-pointer"
            >
              <span className="border-b border-current pb-0.5">Lihat katalog lengkap</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((service, index) => {
            const isExpanded = expandedId === service.id;
            const slug = SLUGS[service.id] ?? "layout-buku-editorial";
            const Icon = ICONS[service.id] ?? BookOpen;
            const panelId = `service-panel-${service.id}`;

            return (
              <li
                key={service.id}
                data-purpose="service-item"
                className={`group relative flex flex-col rounded-2xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 transition-[border-color,box-shadow] duration-200 hover:border-tint-border dark:hover:border-brand/60 hover:shadow-[0_12px_36px_-16px_rgba(26,84,164,0.28)] ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-tint dark:bg-brand/20 text-brand dark:text-sky-soft transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                    <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-tint-border dark:text-zinc-600 group-hover:text-sky transition-colors duration-200">
                    {service.number}
                  </span>
                </div>

                {/* Body */}
                <h3 className="mt-8 text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                  <Link
                    href={`/products/${slug}`}
                    className="rounded-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1A54A4]/30 hover:text-[#1A54A4] dark:hover:text-[#38BDF8] transition-colors duration-200"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569] dark:text-zinc-400">
                  {service.summary}
                </p>

                <dl className="mt-6 flex items-center gap-2 text-sm">
                  <dt className="text-[#64748B] dark:text-zinc-500">Estimasi</dt>
                  <dd className="font-semibold text-[#0F172A] dark:text-zinc-100">
                    {service.standardTurnaround}
                  </dd>
                </dl>

                {/* Expandable specs */}
                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  aria-hidden={!isExpanded}
                >
                  <div className="overflow-hidden">
                    <div className="mt-6 pt-6 border-t border-[#E2E8F0] dark:border-zinc-800">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B] dark:text-zinc-500">
                        Yang Anda terima
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-[#334155] dark:text-zinc-300">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check
                              className="w-4 h-4 mt-0.5 shrink-0 text-sky dark:text-sky-soft"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Perangkat yang digunakan">
                        {service.tools.map((t) => (
                          <li
                            key={t}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-tint dark:bg-brand/20 text-brand dark:text-sky-soft"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8">
                  <div className="flex items-center justify-between pt-5 border-t border-[#E2E8F0] dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : service.id)}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      className="inline-flex items-center gap-2 min-h-[44px] -ml-1 px-1 text-sm font-medium text-[#475569] dark:text-zinc-400 hover:text-[#0F172A] dark:hover:text-white rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1A54A4]/30 transition-colors duration-200 cursor-pointer"
                    >
                      <Plus
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`}
                        aria-hidden="true"
                      />
                      {isExpanded ? "Tutup rincian" : "Lihat rincian"}
                    </button>
                    <Link
                      href={`/products/${slug}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-tint-border dark:border-zinc-700 text-brand dark:text-white transition-colors duration-200 hover:bg-brand hover:text-white hover:border-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky/40 cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      <span className="sr-only">Buka detail {service.title}</span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
