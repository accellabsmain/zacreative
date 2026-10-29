"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Crown,
  Gem,
  Medal,
  type LucideIcon,
} from "lucide-react";
import {
  SERVICE_PACKAGES,
  type PackageTier,
  type ServicePackage,
  type TierId,
} from "@/lib/data/packages";
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

interface TierStyleConfig {
  shortTitle: string;
  Icon: LucideIcon;
  topBar: string;
  dot: string;
  // Selected state (following tier color with high-readability gradient / solid accents)
  selectedCard: string;
  selectedBadge: string;
  selectedEmblem: string;
  selectedPriceBox: string;
  selectedPriceLabel: string;
  selectedPriceValue: string;
  selectedUnitPill: string;
  selectedCheck: string;
  selectedCta: string;
  selectedFloatingPill: string;
  // Unselected state (clean, modern solid)
  unselectedCard: string;
  unselectedBadge: string;
  unselectedEmblem: string;
  unselectedPriceBox: string;
  unselectedPriceLabel: string;
  unselectedPriceValue: string;
  unselectedUnitPill: string;
  unselectedCheck: string;
  unselectedCta: string;
}

const TIER_STYLES: Record<TierId, TierStyleConfig> = {
  bronze: {
    shortTitle: "Bronze",
    Icon: Medal,
    topBar: "bg-[#B45309]",
    dot: "bg-[#B45309]",

    // Selected: Bronze theme
    selectedCard:
      "border-2 border-[#B45309] bg-gradient-to-b from-[#FFF7ED] via-white to-white dark:border-amber-600 dark:from-amber-950/30 dark:via-zinc-900 dark:to-zinc-900",
    selectedBadge:
      "border-[#FDBA74] bg-[#FFEDD5] text-[#9A3412] dark:border-amber-700/60 dark:bg-amber-950/60 dark:text-amber-300",
    selectedEmblem:
      "border-[#FDBA74] bg-[#FFEDD5] text-[#B45309] dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300",
    selectedPriceBox:
      "border border-[#FDBA74] bg-[#FFEDD5]/70 dark:border-amber-700/60 dark:bg-amber-950/50",
    selectedPriceLabel: "text-[#9A3412] dark:text-amber-400",
    selectedPriceValue: "text-[#7C2D12] dark:text-amber-200",
    selectedUnitPill: "bg-[#FDBA74]/50 text-[#7C2D12] dark:bg-amber-900/50 dark:text-amber-200",
    selectedCheck: "bg-[#B45309] text-white dark:bg-amber-600 dark:text-white",
    selectedCta:
      "border-2 border-[#B45309] bg-[#B45309] hover:bg-[#9A3412] text-white dark:border-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500",
    selectedFloatingPill:
      "border border-[#9A3412] bg-[#B45309] text-white dark:border-amber-500 dark:bg-amber-600",

    // Unselected: Neutral solid with bronze hover
    unselectedCard:
      "border border-slate-200 bg-white hover:border-[#B45309] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-600",
    unselectedBadge:
      "border-slate-200 bg-slate-100 text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    unselectedEmblem:
      "border-slate-200 bg-slate-50 text-[#B45309] dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-amber-400",
    unselectedPriceBox:
      "border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-800/50",
    unselectedPriceLabel: "text-slate-500 dark:text-zinc-400",
    unselectedPriceValue: "text-slate-900 dark:text-white",
    unselectedUnitPill: "bg-slate-200/80 text-slate-700 dark:bg-zinc-700 dark:text-zinc-300",
    unselectedCheck:
      "border border-slate-300 bg-slate-100 text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
    unselectedCta:
      "border border-slate-300 bg-white text-slate-800 hover:border-[#B45309] hover:text-[#B45309] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-amber-600 dark:hover:text-amber-400",
  },

  silver: {
    shortTitle: "Silver",
    Icon: Gem,
    topBar: "bg-[#475569]",
    dot: "bg-[#64748B]",

    // Selected: Silver/Slate theme
    selectedCard:
      "border-2 border-[#334155] bg-gradient-to-b from-[#F1F5F9] via-white to-white dark:border-slate-400 dark:from-slate-900/40 dark:via-zinc-900 dark:to-zinc-900",
    selectedBadge:
      "border-[#CBD5E1] bg-[#E2E8F0] text-[#1E293B] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200",
    selectedEmblem:
      "border-[#CBD5E1] bg-[#E2E8F0] text-[#334155] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200",
    selectedPriceBox:
      "border border-[#CBD5E1] bg-[#E2E8F0]/70 dark:border-slate-700 dark:bg-slate-800/50",
    selectedPriceLabel: "text-[#334155] dark:text-slate-400",
    selectedPriceValue: "text-[#0F172A] dark:text-white",
    selectedUnitPill: "bg-[#CBD5E1]/70 text-[#1E293B] dark:bg-slate-700 dark:text-slate-200",
    selectedCheck: "bg-[#334155] text-white dark:bg-slate-200 dark:text-slate-900",
    selectedCta:
      "border-2 border-[#1E293B] bg-[#1E293B] hover:bg-[#0F172A] text-white dark:border-slate-200 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white",
    selectedFloatingPill:
      "border border-[#0F172A] bg-[#1E293B] text-white dark:border-slate-400 dark:bg-slate-800 dark:text-white",

    // Unselected: Neutral solid with silver hover
    unselectedCard:
      "border border-slate-200 bg-white hover:border-[#334155] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-slate-400",
    unselectedBadge:
      "border-slate-200 bg-slate-100 text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    unselectedEmblem:
      "border-slate-200 bg-slate-50 text-[#475569] dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-slate-300",
    unselectedPriceBox:
      "border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-800/50",
    unselectedPriceLabel: "text-slate-500 dark:text-zinc-400",
    unselectedPriceValue: "text-slate-900 dark:text-white",
    unselectedUnitPill: "bg-slate-200/80 text-slate-700 dark:bg-zinc-700 dark:text-zinc-300",
    unselectedCheck:
      "border border-slate-300 bg-slate-100 text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
    unselectedCta:
      "border border-slate-300 bg-white text-slate-800 hover:border-[#334155] hover:text-[#334155] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-slate-400 dark:hover:text-slate-200",
  },

  gold: {
    shortTitle: "Gold",
    Icon: Crown,
    topBar: "bg-[#D97706]",
    dot: "bg-[#D97706]",

    // Selected: Gold theme
    selectedCard:
      "border-2 border-[#D97706] bg-gradient-to-b from-[#FEFCE8] via-white to-white dark:border-amber-500 dark:from-yellow-950/30 dark:via-zinc-900 dark:to-zinc-900",
    selectedBadge:
      "border-[#FDE047] bg-[#FEF08A]/70 text-[#713F12] dark:border-yellow-600/60 dark:bg-yellow-950/60 dark:text-yellow-300",
    selectedEmblem:
      "border-[#FDE047] bg-[#FEF08A]/70 text-[#854D0E] dark:border-yellow-600 dark:bg-yellow-950 dark:text-yellow-300",
    selectedPriceBox:
      "border border-[#FDE047] bg-[#FEF08A]/50 dark:border-yellow-600/60 dark:bg-yellow-950/50",
    selectedPriceLabel: "text-[#854D0E] dark:text-yellow-400",
    selectedPriceValue: "text-[#713F12] dark:text-yellow-200",
    selectedUnitPill: "bg-[#FDE047]/60 text-[#713F12] dark:bg-yellow-900/50 dark:text-yellow-200",
    selectedCheck: "bg-[#D97706] text-white dark:bg-yellow-500 dark:text-zinc-950",
    selectedCta:
      "border-2 border-[#D97706] bg-[#D97706] hover:bg-[#B45309] text-white dark:border-yellow-500 dark:bg-yellow-500 dark:text-zinc-950 dark:hover:bg-yellow-400",
    selectedFloatingPill:
      "border border-[#B45309] bg-[#D97706] text-white dark:border-yellow-500 dark:bg-yellow-500 dark:text-zinc-950",

    // Unselected: Neutral solid with gold hover
    unselectedCard:
      "border border-slate-200 bg-white hover:border-[#D97706] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-500",
    unselectedBadge:
      "border-slate-200 bg-slate-100 text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    unselectedEmblem:
      "border-slate-200 bg-slate-50 text-[#D97706] dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-yellow-400",
    unselectedPriceBox:
      "border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-800/50",
    unselectedPriceLabel: "text-slate-500 dark:text-zinc-400",
    unselectedPriceValue: "text-slate-900 dark:text-white",
    unselectedUnitPill: "bg-slate-200/80 text-slate-700 dark:bg-zinc-700 dark:text-zinc-300",
    unselectedCheck:
      "border border-slate-300 bg-slate-100 text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
    unselectedCta:
      "border border-slate-300 bg-white text-slate-800 hover:border-[#D97706] hover:text-[#D97706] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-amber-500 dark:hover:text-amber-400",
  },
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
      const popularIdx = Math.max(
        0,
        SERVICE_PACKAGES[next].tiers.findIndex((t) => t.popular)
      );
      setActive(next);
      setActiveTier(popularIdx);
      if (focus) tabRefs.current[next]?.focus();
    },
    [total]
  );

  const scrollRailToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const rail = railRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth + 4) return;
    const card = rail.children[index] as HTMLElement | undefined;
    if (!card) return;
    rail.scrollTo({
      left: card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2,
      behavior,
    });
  }, []);

  const scrollToTier = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      scrollRailToIndex(index, behavior);
      setActiveTier(index);
    },
    [scrollRailToIndex]
  );

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
    const id = requestAnimationFrame(() => {
      scrollRailToIndex(popularIdx, "instant");
    });
    return () => cancelAnimationFrame(id);
  }, [active, pkg.tiers, scrollRailToIndex]);

  // Track active tier as user swipes on mobile (only when rail overflows horizontally)
  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth + 4) return;
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
      suppressHydrationWarning
      className="relative py-14 sm:py-20 lg:py-24 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors"
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
              <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-slate-700 uppercase dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                [KATALOG &amp; PAKET LAYANAN]
              </span>

              {/* Mobile Counter and Nav controls */}
              <div className="flex sm:hidden items-center gap-1.5">
                <span className="rounded-md border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-mono font-semibold tabular-nums text-slate-700 dark:text-zinc-300">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Layanan sebelumnya"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Layanan berikutnya"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
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
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
              Pilih layanan, lalu bandingkan opsi tier{" "}
              <span className="font-bold text-[#B45309] dark:text-amber-400">Bronze</span>,{" "}
              <span className="font-bold text-[#334155] dark:text-slate-300">Silver</span>, dan{" "}
              <span className="font-bold text-[#D97706] dark:text-amber-400">Gold</span> sesuai
              kebutuhan proyek Anda.
            </p>
          </div>

          {/* Desktop Counter & Nav Controls */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 px-3.5 py-2 text-xs font-mono font-semibold tabular-nums text-slate-700 dark:text-zinc-300">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              id="paket-prev"
              onClick={() => goTo(active - 1)}
              aria-label="Layanan sebelumnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-800 dark:text-white hover:border-slate-400 hover:bg-slate-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              id="paket-next"
              onClick={() => goTo(active + 1)}
              aria-label="Layanan berikutnya"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-800 dark:text-white hover:border-slate-400 hover:bg-slate-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Category / Service Selector (Biru Terang Solid pada Kategori Terpilih) ── */}
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
                className={`group relative flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2.5 rounded-xl p-2.5 sm:px-4 sm:py-3.5 text-center sm:text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                  selected
                    ? "border-2 border-[#0284C7] bg-[#0284C7] text-white dark:border-[#38BDF8] dark:bg-[#0284C7] dark:text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-850"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center rounded-md px-1.5 py-0.5 font-mono text-[11px] sm:text-xs font-bold tabular-nums shrink-0 ${
                    selected
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {p.number}
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

        {/* ── Active Service & Tier Cards Container (Modern Solid) ── */}
        <div
          key={pkg.id}
          id={`paket-panel-${pkg.id}`}
          role="tabpanel"
          aria-labelledby={`paket-tab-${pkg.id}`}
          className="animate-panel-in rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-7 lg:p-9 transition-all"
        >
          {/* Container Header */}
          <div className="flex flex-col gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-slate-200 dark:border-zinc-800">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="inline-flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white text-[#0284C7] dark:border-zinc-700 dark:bg-zinc-800 dark:text-[#38BDF8] text-sm sm:text-base font-bold font-mono">
                {pkg.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-2xl lg:text-[1.65rem] font-bold tracking-tight text-navy dark:text-white truncate sm:whitespace-normal">
                  {pkg.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                  {pkg.summary}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 sm:pt-0">
              <span className="rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1 text-[11px] sm:text-xs font-mono font-medium text-slate-600 dark:text-zinc-300">
                Format: {pkg.formatChip}
              </span>
              <a
                id={`paket-order-${pkg.id}`}
                href={buildWhatsAppLink(serviceMessage(pkg))}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-colors"
              >
                <span>Pesan Layanan</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Mobile Tier Segmented Switcher (Visible only on mobile screens < md) */}
          <div
            className="grid grid-cols-3 gap-1 bg-slate-200/70 dark:bg-zinc-800 p-1 rounded-xl mt-5 mb-1 border border-slate-300/80 dark:border-zinc-700 md:hidden"
            role="tablist"
            aria-label="Pilih tier paket"
          >
            {pkg.tiers.map((t, idx) => {
              const isSelected = activeTier === idx;
              const theme = TIER_STYLES[t.id];
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => scrollToTier(idx)}
                  className={`inline-flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
                    isSelected
                      ? "bg-white text-slate-900 border border-slate-300 font-bold dark:bg-zinc-900 dark:text-white dark:border-zinc-600"
                      : "text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full shrink-0 ${theme.dot}`} />
                  <span>{theme.shortTitle}</span>
                  {t.popular && (
                    <span className="text-[10px] text-amber-500 dark:text-amber-300">★</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 3 Tier Cards (Horizontal snap rail on mobile, 3-col grid on desktop) */}
          <div
            ref={railRef}
            onScroll={onRailScroll}
            className="no-scrollbar -mx-4 sm:-mx-7 md:mx-0 flex snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-7 md:px-0 pt-7 pb-3 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible lg:gap-6"
          >
            {pkg.tiers.map((tier, idx) => (
              <TierCard
                key={tier.id}
                pkg={pkg}
                tier={tier}
                selected={activeTier === idx}
                onSelect={() => scrollToTier(idx)}
              />
            ))}
          </div>

          {/* Mobile Tier Dots Indicator */}
          <div className="mt-2 flex justify-center items-center gap-1.5 md:hidden" aria-hidden="true">
            {pkg.tiers.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => scrollToTier(idx)}
                aria-label={`Lihat ${t.name}`}
                className="p-1 cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-200 ${
                    activeTier === idx
                      ? "w-6 bg-slate-900 dark:bg-white"
                      : "w-1.5 bg-slate-300 dark:bg-zinc-700"
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
                className={`block h-2 rounded-full transition-all duration-200 ${
                  active === i
                    ? "w-7 bg-[#0284C7] dark:bg-[#38BDF8]"
                    : "w-2 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
          <p>* Harga final menyesuaikan jumlah halaman/slide, kompleksitas, dan tenggat waktu.</p>
          <a
            href={buildWhatsAppLink(
              "Halo ZaCreative, saya butuh paket custom di luar pilihan yang tersedia. Boleh diskusi?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-semibold text-[#0284C7] hover:underline dark:text-[#38BDF8]"
          >
            <span>Butuh paket custom? Diskusikan via WhatsApp</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function TierCard({
  pkg,
  tier,
  selected,
  onSelect,
}: {
  pkg: ServicePackage;
  tier: PackageTier;
  selected: boolean;
  onSelect: () => void;
}) {
  const popular = !!tier.popular;
  const theme = TIER_STYLES[tier.id];
  const TierIcon = theme.Icon;

  return (
    <article
      onClick={onSelect}
      className={`group/card relative flex w-[88vw] max-w-[340px] shrink-0 snap-center flex-col justify-between rounded-2xl p-5 sm:p-6 pt-6 sm:pt-7 transition-colors cursor-pointer md:w-auto md:max-w-none ${
        selected ? theme.selectedCard : theme.unselectedCard
      }`}
    >
      {/* Top Accent Bar */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 rounded-t-[14px] ${theme.topBar}`}
      />

      {/* Floating Pill: Matching tier color when selected, or neutral Popular pill */}
      {selected ? (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider z-10 ${theme.selectedFloatingPill}`}
        >
          {popular ? "★ Paling Populer" : "Paket Terpilih"}
        </span>
      ) : (
        popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-300 bg-slate-100 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 z-10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            ★ Paling Populer
          </span>
        )
      )}

      <div>
        {/* Tier Category Badge & Tier Emblem */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
              selected ? theme.selectedBadge : theme.unselectedBadge
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            {tier.label}
          </span>

          <span
            className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold ${
              selected ? theme.selectedEmblem : theme.unselectedEmblem
            }`}
          >
            <TierIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{theme.shortTitle}</span>
          </span>
        </div>

        {/* Tier Name */}
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <h4 className="text-lg sm:text-xl font-bold tracking-tight text-navy dark:text-white">
            Tier {theme.shortTitle}
          </h4>
        </div>

        {/* Highlighted Price Callout Box */}
        <div
          className={`mt-3 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 transition-colors ${
            selected ? theme.selectedPriceBox : theme.unselectedPriceBox
          }`}
        >
          <span
            className={`block text-[10px] font-bold uppercase tracking-wider leading-none ${
              selected ? theme.selectedPriceLabel : theme.unselectedPriceLabel
            }`}
          >
            Mulai dari
          </span>
          <div className="mt-1.5 flex items-baseline flex-wrap gap-1.5">
            <span
              className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-none ${
                selected ? theme.selectedPriceValue : theme.unselectedPriceValue
              }`}
            >
              {tier.priceRange}
            </span>
            <span
              className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold leading-none ${
                selected ? theme.selectedUnitPill : theme.unselectedUnitPill
              }`}
            >
              {pkg.unit}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
          {tier.description}
        </p>

        {/* Divider */}
        <hr className="my-4 sm:my-5 border-slate-200 dark:border-zinc-800" />

        {/* Feature List */}
        <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span
                className={`inline-flex items-center justify-center w-4 h-4 rounded-full mt-0.5 shrink-0 ${
                  selected ? theme.selectedCheck : theme.unselectedCheck
                }`}
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button: Solid tier color when selected, solid neutral button otherwise */}
      <a
        id={`paket-cta-${pkg.id}-${tier.id}`}
        href={buildWhatsAppLink(tierMessage(pkg, tier))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`group/cta mt-6 sm:mt-8 inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl px-4 text-xs sm:text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
          selected ? theme.selectedCta : theme.unselectedCta
        }`}
      >
        <span>Pilih {theme.shortTitle}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
      </a>
    </article>
  );
}
