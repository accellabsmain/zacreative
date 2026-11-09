"use client";

import { useEffect, useMemo, useState } from "react";
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
  posts: initialPosts,
  isLoading,
  showAll = false,
}: PortfolioSectionProps) {
  const [livePosts, setLivePosts] = useState<InstagramPost[] | null>(null);
  const posts = livePosts ?? initialPosts;

  const [selectedCategory, setSelectedCategory] = useState<
    "ALL" | PortfolioCategory
  >("ALL");

  // Fast live-sync with admin data
  useEffect(() => {
    let active = true;
    const syncWithAdmin = async () => {
      try {
        const res = await fetch("/api/portfolio", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { ok?: boolean; posts?: InstagramPost[] };
        if (active && data.ok && Array.isArray(data.posts) && data.posts.length > 0) {
          setLivePosts(data.posts);
        }
      } catch {
        // Keep current posts
      }
    };

    void syncWithAdmin();
    window.addEventListener("focus", syncWithAdmin);
    return () => {
      active = false;
      window.removeEventListener("focus", syncWithAdmin);
    };
  }, []);

  const sourcePosts = useMemo(
    () => (posts && posts.length > 0 ? posts : INSTAGRAM_FALLBACK_POSTS),
    [posts]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: sourcePosts.length,
    };
    PORTFOLIO_CATEGORIES.forEach((cat) => {
      counts[cat] = sourcePosts.filter((p) => p.categoryTag === cat).length;
    });
    return counts;
  }, [sourcePosts]);

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

        {/* Category Filter Bar (2x2 grid di mobile agar pas tanpa scroll horizontal, single-row di desktop) */}
        <div className="w-full flex items-center justify-start">
          <div className="w-full sm:w-auto rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-1 sm:p-1.5 shadow-2xs">
            <div
              role="tablist"
              aria-label="Filter kategori portofolio"
              className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === "ALL"}
                onClick={() => setSelectedCategory("ALL")}
                className={`min-h-[38px] sm:min-h-[40px] w-full sm:w-auto rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 ${
                  selectedCategory === "ALL"
                    ? "bg-[#134282] text-white shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                }`}
              >
                <span>Semua Karya</span>
                <span
                  className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold tabular-nums ${
                    selectedCategory === "ALL"
                      ? "bg-white/20 text-white"
                      : "bg-slate-200/90 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                  }`}
                >
                  {categoryCounts.ALL}
                </span>
              </button>

              {PORTFOLIO_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] ?? 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[38px] sm:min-h-[40px] w-full sm:w-auto rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 ${
                      isActive
                        ? "bg-[#134282] text-white shadow-xs font-bold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/80 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold tabular-nums ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200/90 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
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
