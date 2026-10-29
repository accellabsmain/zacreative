"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICE_PACKAGES, type PackageTier, type ServicePackage } from "@/lib/data/packages";
import { buildWhatsAppLink } from "@/lib/constants";

const tierMessage = (pkg: ServicePackage, tier: PackageTier) =>
  `Halo ZaCreative, saya tertarik dengan paket *${pkg.title} – ${tier.name}* (mulai ${tier.priceRange}${pkg.unit}). Boleh info lebih lanjut untuk proyek saya?`;

const serviceMessage = (pkg: ServicePackage) =>
  `Halo ZaCreative, saya ingin memesan layanan *${pkg.title}*. Boleh dibantu rekomendasi paket yang sesuai?`;

// Short category labels for mobile grid (no trailing, 100% visible)
const MOBILE_CATEGORY_NAMES: Record<string, string> = {
  "layout-buku": "Desain Buku",
  presentasi: "Pitch Deck",
  poster: "Poster Visual",
};

export default function PackagesSection() {
  const [active, setActive] = useState(0);
  const [activeTier, setActiveTier] = useState(1); // default to Silver (popular)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);

  const pkg = SERVICE_PACKAGES[active];
  const total = SERVICE_PACKAGES.length;

  const goTo = useCallback(
    (index: number, focus = false) => {
      const next = (index + total) % total;
      setActive(next);
      if (focus) tabRefs.current[next]?.focus();
    },
    [total]
  );

  const scrollToTier = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.children[index] as HTMLElement | undefined;
    if (!card) return;
    rail.scrollTo({
      left: card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2,
      behavior,
    });
    setActiveTier(index);
  }, []);

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(total - 1, true);
    }
  };

  // When active service changes, scroll mobile rail to the popular tier
  useEffect(() => {
    const popularIdx = Math.max(
      0,
      pkg.tiers.findIndex((t) => t.popular)
    );
    setActiveTier(popularIdx);
    const id = requestAnimationFrame(() => {
      scrollToTier(popularIdx, "instant");
    });
    return () => cancelAnimationFrame(id);
  }, [active, pkg.tiers, scrollToTier]);

  // Track active tier as user swipes on mobile
  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const centre = rail.scrollLeft + rail.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(rail.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - centre);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActiveTier(nearest);
  };

  return (
    <section
      id="paket"
      className="relative py-14 sm:py-20 lg:py-24 border-b border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors"
      data-purpose="packages-pricing"
      aria-labelledby="paket-heading"
    >
      {/* Anchor for #layanan so navigation still targets this section */}
      <span id="layanan" className="absolute -top-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono font-semibold tracking-wider text-brand dark:text-sky-soft uppercase">
                [KATALOG &amp; PAKET LAYANAN]
              </p>

              {/* Mobile Counter and Nav controls */}
              <div className="flex sm:hidden items-center gap-1.5">
                <span className="rounded-md border border-navy/15 dark:border-white/15 bg-tint/60 dark:bg-white/5 px-2 py-0.5 text-[11px] font-mono font-semibold tabular-nums text-navy dark:text-sky-soft shadow-xs">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Layanan sebelumnya"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-navy/15 dark:border-white/15 bg-white dark:bg-zinc-900 text-navy dark:text-white hover:bg-tint dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Layanan berikutnya"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-navy/15 dark:border-white/15 bg-white dark:bg-zinc-900 text-navy dark:text-white hover:bg-tint dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <h2
              id="paket-heading"
              className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold tracking-tight text-navy dark:text-white leading-tight"
            >
              Layanan &amp; Tingkatan Paket
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-navy-soft dark:text-zinc-300 max-w-2xl leading-relaxed">
              Pilih layanan, lalu bandingkan opsi tier sesuai skala kebutuhan proyek Anda.
            </p>
          </div>

          {/* Desktop Counter & Nav Controls */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="rounded-lg border border-navy/15 dark:border-white/15 bg-tint/60 dark:bg-white/5 px-3.5 py-2 text-xs font-mono font-semibold tabular-nums text-navy dark:text-sky-soft shadow-xs">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              id="paket-prev"
              onClick={() => goTo(active - 1)}
              aria-label="Layanan sebelumnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-navy/15 dark:border-white/15 bg-white dark:bg-zinc-900 text-navy dark:text-white transition-colors hover:border-brand hover:text-brand dark:hover:border-sky-soft dark:hover:text-sky-soft shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              id="paket-next"
              onClick={() => goTo(active + 1)}
              aria-label="Layanan berikutnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-navy/15 dark:border-white/15 bg-white dark:bg-zinc-900 text-navy dark:text-white transition-colors hover:border-brand hover:text-brand dark:hover:border-sky-soft dark:hover:text-sky-soft shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Category / Service Selector (3-Column Grid, Zero Trailing, 100% Clear) ── */}
        <div
          role="tablist"
          aria-label="Pilih kategori paket"
          onKeyDown={onTabKeyDown}
          className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          {SERVICE_PACKAGES.map((p, i) => {
            const selected = i === active;
            const mobileShortName = MOBILE_CATEGORY_NAMES[p.id] ?? p.title;

            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`paket-tab-${p.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`paket-panel-${p.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => goTo(i)}
                className={`group relative flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2.5 rounded-xl border p-2 sm:px-4 sm:py-3.5 text-center sm:text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  selected
                    ? "border-navy bg-navy text-white shadow-[0_8px_20px_-8px_rgba(11,28,48,0.5)] dark:border-sky-soft dark:bg-sky-soft dark:text-navy"
                    : "border-tint-border bg-white text-navy hover:border-brand/50 hover:bg-wash dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700"
                }`}
              >
                <span
                  className={`font-mono text-xs sm:text-sm font-bold tabular-nums shrink-0 ${
                    selected ? "opacity-75" : "text-brand dark:text-sky-soft"
                  }`}
                >
                  {p.number}.
                </span>
                <span className="block sm:hidden text-[11px] font-bold leading-tight">
                  {mobileShortName}
                </span>
                <span className="hidden sm:block text-xs sm:text-sm font-semibold truncate">
                  {p.tabLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active Service & Tier Cards Container ── */}
        <div
          key={pkg.id}
          id={`paket-panel-${pkg.id}`}
          role="tabpanel"
          aria-labelledby={`paket-tab-${pkg.id}`}
          className="rounded-2xl sm:rounded-3xl border border-tint-border dark:border-zinc-800 bg-wash/60 dark:bg-zinc-900/40 p-4 sm:p-7 lg:p-9 shadow-sm transition-all"
        >
          {/* Container Header */}
          <div className="flex flex-col gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-tint-border dark:border-zinc-800">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="inline-flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border-2 border-navy text-navy bg-tint/80 dark:border-sky-soft dark:text-sky-soft dark:bg-brand/20 text-sm sm:text-base font-bold font-mono">
                {pkg.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-2xl lg:text-[1.65rem] font-bold tracking-tight text-navy dark:text-white truncate sm:whitespace-normal">
                  {pkg.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-navy-soft dark:text-zinc-300 leading-relaxed max-w-2xl">
                  {pkg.summary}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 sm:pt-0">
              <span className="rounded-lg border border-tint-border dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/60 px-2.5 py-1 text-[11px] sm:text-xs font-mono text-navy-soft dark:text-zinc-300">
                Format: {pkg.formatChip}
              </span>
              <a
                id={`paket-order-${pkg.id}`}
                href={buildWhatsAppLink(serviceMessage(pkg))}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-brand dark:text-sky-soft underline underline-offset-4 decoration-brand/30 hover:decoration-brand dark:decoration-sky-soft/30 dark:hover:decoration-sky-soft transition-colors"
              >
                <span>Pesan Layanan</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Mobile Tier Segmented Switcher (Visible only on mobile screens < md) */}
          <div
            className="grid grid-cols-3 gap-1 bg-tint dark:bg-white/5 p-1 rounded-xl mt-5 mb-1 border border-tint-border dark:border-white/10 md:hidden"
            role="tablist"
            aria-label="Pilih tier paket"
          >
            {pkg.tiers.map((t, idx) => {
              const isSelected = activeTier === idx;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => scrollToTier(idx)}
                  className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
                    isSelected
                      ? "bg-navy text-white shadow-xs dark:bg-sky-soft dark:text-navy"
                      : "text-navy-soft dark:text-zinc-300 hover:text-navy dark:hover:text-white"
                  }`}
                >
                  <span>{t.name.replace("Tier ", "")}</span>
                  {t.popular && <span className="ml-1 text-[10px] text-amber-500 dark:text-amber-400">★</span>}
                </button>
              );
            })}
          </div>

          {/* 3 Tier Cards (Horizontal snap rail on mobile, 3-col grid on desktop) */}
          <div
            ref={railRef}
            onScroll={onRailScroll}
            className="no-scrollbar -mx-4 sm:-mx-7 md:mx-0 flex snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-7 md:px-0 pt-6 pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible lg:gap-6"
          >
            {pkg.tiers.map((tier) => (
              <TierCard key={tier.id} pkg={pkg} tier={tier} />
            ))}
          </div>

          {/* Mobile Tier Dots Indicator */}
          <div className="mt-3 flex justify-center items-center gap-1.5 md:hidden" aria-hidden="true">
            {pkg.tiers.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => scrollToTier(idx)}
                aria-label={`Lihat ${t.name}`}
                className="p-1 cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    activeTier === idx
                      ? "w-5 bg-navy dark:bg-sky-soft"
                      : "w-1.5 bg-navy/20 dark:bg-white/20"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Carousel Dots (Service Switcher) ── */}
        <div className="mt-6 sm:mt-8 flex justify-center items-center gap-2" aria-label="Navigasi layanan">
          {SERVICE_PACKAGES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Pilih layanan ${p.tabLabel}`}
              aria-current={active === i}
              className="p-1.5 cursor-pointer"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-7 bg-navy dark:bg-sky-soft"
                    : "w-2 bg-navy/20 dark:bg-white/20 hover:bg-navy/40 dark:hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-navy-soft dark:text-zinc-400">
          <p>* Harga final menyesuaikan jumlah halaman/slide, kompleksitas, dan tenggat waktu.</p>
          <a
            href={buildWhatsAppLink(
              "Halo ZaCreative, saya butuh paket custom di luar pilihan yang tersedia. Boleh diskusi?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-hover dark:text-sky-soft dark:hover:text-sky"
          >
            <span>Butuh paket custom? Diskusikan via WhatsApp</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function TierCard({ pkg, tier }: { pkg: ServicePackage; tier: PackageTier }) {
  const popular = !!tier.popular;
  const shortName = tier.name.replace("Tier ", "");

  return (
    <article
      className={`relative flex w-[88vw] max-w-[340px] shrink-0 snap-center flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 transition-all duration-200 dark:bg-zinc-900 md:w-auto md:max-w-none ${
        popular
          ? "border-2 border-navy shadow-[0_16px_36px_-12px_rgba(11,28,48,0.22)] dark:border-sky-soft ring-1 ring-navy/10 dark:ring-sky-soft/20"
          : "border border-tint-border hover:border-brand/40 dark:border-zinc-800 dark:hover:border-zinc-700 shadow-xs"
      }`}
    >
      {/* Popular badge pinned to top border */}
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md dark:bg-sky-soft dark:text-navy z-10">
          Paling Populer
        </span>
      )}

      <div>
        {/* Responsive Header:
            - On desktop (md+): Badge on left, "Mulai" & Price on right (wireframe layout)
            - On mobile (< md): Stacked with clear hierarchy, eliminating squished wrapping
        */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2.5 md:gap-3">
          <div className="flex items-center justify-between md:block">
            <span
              className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                popular
                  ? "border border-navy text-navy bg-tint dark:border-sky-soft dark:text-sky-soft dark:bg-brand/20"
                  : "border border-tint-border text-navy-soft dark:border-zinc-700 dark:text-zinc-400"
              }`}
            >
              {tier.label}
            </span>
          </div>

          {/* Price Block */}
          <div className="md:text-right">
            <span className="text-[11px] font-medium uppercase tracking-wider text-navy-soft/70 dark:text-zinc-500 mr-1.5 md:mr-0 md:block md:leading-none">
              Mulai
            </span>
            <span className="inline-block md:block text-xl sm:text-2xl md:text-lg lg:text-xl font-bold tracking-tight text-navy dark:text-white leading-tight">
              {tier.priceRange}
              <span className="text-xs sm:text-sm font-normal text-navy-soft/80 dark:text-zinc-400 ml-0.5">
                {pkg.unit}
              </span>
            </span>
          </div>
        </div>

        {/* Tier Name */}
        <h4 className="mt-3 text-lg sm:text-xl font-bold tracking-tight text-navy dark:text-white">
          {tier.name}
        </h4>

        {/* Description: 14px readable font on mobile */}
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-navy-soft dark:text-zinc-300">
          {tier.description}
        </p>

        {/* Divider */}
        <hr className="my-4 sm:my-5 border-tint-border dark:border-zinc-800" />

        {/* Feature List: 14px font with generous readable line spacing */}
        <ul className="space-y-3 text-xs sm:text-sm text-[#334155] dark:text-zinc-300">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span
                className={`inline-flex items-center justify-center w-4 h-4 rounded-full mt-0.5 shrink-0 ${
                  popular
                    ? "bg-navy text-white dark:bg-sky-soft dark:text-navy"
                    : "bg-tint text-brand dark:bg-brand/20 dark:text-sky-soft"
                }`}
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button: Full 48px comfortable touch target with navy palette */}
      <a
        id={`paket-cta-${pkg.id}-${tier.id}`}
        href={buildWhatsAppLink(tierMessage(pkg, tier))}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 sm:mt-8 inline-flex min-h-[48px] items-center justify-center rounded-xl px-4 text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 cursor-pointer ${
          popular
            ? "bg-navy text-white shadow-md hover:bg-navy-soft dark:bg-sky-soft dark:text-navy dark:hover:bg-sky"
            : "border border-navy text-navy hover:bg-navy hover:text-white dark:border-white/30 dark:text-white dark:hover:bg-white dark:hover:text-navy"
        }`}
      >
        Pilih {shortName} {tier.id === "bronze" ? "→" : ""}
      </a>
    </article>
  );
}
