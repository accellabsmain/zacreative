"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { CONTACT } from "@/lib/constants";
import { PORTFOLIO_COPY } from "@/lib/copywriting";
import {
  INSTAGRAM_FALLBACK_POSTS,
  type InstagramPost,
} from "@/lib/data/instagram-fallback";
import {
  PORTFOLIO_CATEGORIES,
  type PortfolioCategory,
} from "@/lib/validations/portfolio";
import InstagramFeed from "./InstagramFeed";

interface PortfolioSectionProps {
  posts?: InstagramPost[];
  isLoading?: boolean;
  showAll?: boolean;
}

export default function PortfolioSection({
  posts,
  isLoading,
  showAll = false,
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "ALL" | PortfolioCategory
  >("ALL");

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollTrackRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(
      hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 4
    );
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const handleCategorySelect = (
    category: "ALL" | PortfolioCategory,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedCategory(category);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const sourcePosts = useMemo(
    () => (posts && posts.length > 0 ? posts : INSTAGRAM_FALLBACK_POSTS),
    [posts]
  );

  const feed = useMemo(() => {
    const filtered =
      selectedCategory === "ALL"
        ? sourcePosts
        : sourcePosts.filter((p) => p.categoryTag === selectedCategory);
    return showAll ? filtered : filtered.slice(0, PORTFOLIO_COPY.maxItems);
  }, [sourcePosts, selectedCategory, showAll]);

  return (
    <section
      id="portofolio"
      data-purpose="instagram-portfolio-section"
      aria-labelledby="portofolio-heading"
      className="w-full bg-[#F8FAFC] dark:bg-[#070D18] py-16 sm:py-24 border-b border-[#E2E8F0] dark:border-zinc-800 transition-colors text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl min-w-0">
            <h2
              id="portofolio-heading"
              className="text-2xl sm:text-4xl font-bold tracking-tight text-navy dark:text-white leading-tight"
            >
              {PORTFOLIO_COPY.heading}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-navy-soft dark:text-zinc-400 leading-relaxed">
              {PORTFOLIO_COPY.description}
            </p>
          </div>

          <a
            id="portofolio-follow-ig"
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[44px] self-start sm:self-auto items-center justify-center gap-2 rounded-xl border border-navy/15 dark:border-white/15 bg-white dark:bg-zinc-900 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-navy dark:text-white hover:border-[#134282] hover:text-[#134282] dark:hover:border-sky-soft dark:hover:text-sky-soft shadow-xs transition-colors shrink-0"
          >
            <InstagramIcon className="h-4 w-4 text-[#134282] dark:text-sky-soft shrink-0" />
            <span className="truncate">
              {PORTFOLIO_COPY.followButtonPrefix} @{CONTACT.instagramHandle}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </a>
        </div>

        {/* Single Frame Category Slider (Framed Track dengan Smooth Slide UX pada Mobile) */}
        <div className="relative w-full rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-1.5 shadow-xs overflow-hidden">
          {/* Left subtle fade gradient for sliding hint */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent transition-opacity duration-200 z-10 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Right subtle fade gradient for sliding hint */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent transition-opacity duration-200 z-10 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={scrollTrackRef}
            onScroll={checkScroll}
            role="tablist"
            aria-label="Filter kategori portofolio"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory touch-pan-x px-1 py-0.5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "ALL"}
              onClick={(e) => handleCategorySelect("ALL", e)}
              className={`min-h-[42px] snap-center shrink-0 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === "ALL"
                  ? "bg-[#134282] text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
              }`}
            >
              Semua Karya
            </button>

            {PORTFOLIO_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={(e) => handleCategorySelect(cat, e)}
                  className={`min-h-[42px] snap-center shrink-0 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#134282] text-white shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Feed Grid (4 cols desktop, 2 cols tablet, 1 col mobile) */}
        <InstagramFeed posts={feed} isLoading={isLoading} columns={4} />

        {/* View More CTA -> Direct to /portofolio page */}
        {!showAll && (
          <div className="pt-2 sm:pt-4 flex justify-center">
            <Link
              id="portofolio-lihat-selengkapnya"
              href={PORTFOLIO_COPY.viewMoreHref}
              className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-[#134282] hover:bg-[#0e3263] text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold shadow-xs transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134282]"
            >
              <span>{PORTFOLIO_COPY.viewMoreLabel}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
