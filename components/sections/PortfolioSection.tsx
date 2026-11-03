"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
}

export default function PortfolioSection({
  posts,
  isLoading,
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "ALL" | PortfolioCategory
  >("ALL");

  const sourcePosts = useMemo(
    () => (posts && posts.length > 0 ? posts : INSTAGRAM_FALLBACK_POSTS),
    [posts]
  );

  const feed = useMemo(() => {
    const filtered =
      selectedCategory === "ALL"
        ? sourcePosts
        : sourcePosts.filter((p) => p.categoryTag === selectedCategory);
    return filtered.slice(0, PORTFOLIO_COPY.maxItems);
  }, [sourcePosts, selectedCategory]);

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
            <span className="font-mono text-xs uppercase tracking-wider text-brand dark:text-sky-soft font-semibold block">
              {PORTFOLIO_COPY.badge}
            </span>
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
            className="group inline-flex min-h-[44px] self-start sm:self-auto items-center justify-center gap-2 rounded-xl border border-navy/15 dark:border-white/15 bg-white dark:bg-zinc-900 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-navy dark:text-white hover:border-brand hover:text-brand dark:hover:border-sky-soft dark:hover:text-sky-soft shadow-xs transition-colors shrink-0"
          >
            <InstagramIcon className="h-4 w-4 text-brand dark:text-sky-soft shrink-0" />
            <span className="truncate">
              {PORTFOLIO_COPY.followButtonPrefix} @{CONTACT.instagramHandle}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </a>
        </div>

        {/* Mobile-friendly Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter kategori portofolio"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === "ALL"}
            onClick={() => setSelectedCategory("ALL")}
            className={`min-h-[40px] shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-brand text-white dark:bg-sky-soft dark:text-navy shadow-xs"
                : "bg-white dark:bg-zinc-900 border border-[#E2E8F0] dark:border-zinc-800 text-navy-soft dark:text-zinc-300 hover:border-brand dark:hover:border-sky-soft"
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
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[40px] shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand text-white dark:bg-sky-soft dark:text-navy shadow-xs"
                    : "bg-white dark:bg-zinc-900 border border-[#E2E8F0] dark:border-zinc-800 text-navy-soft dark:text-zinc-300 hover:border-brand dark:hover:border-sky-soft"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Responsive Feed Grid (3 cols desktop, 1-2 cols mobile, max 6 items) */}
        <InstagramFeed posts={feed} isLoading={isLoading} />
      </div>
    </section>
  );
}
