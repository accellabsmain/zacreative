"use client";

import Image from "next/image";
import { ArrowUpRight, Images, Play } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { CONTACT } from "@/lib/constants";
import { PORTFOLIO_COPY } from "@/lib/copywriting";
import type {
  InstagramMediaType,
  InstagramPost,
} from "@/lib/data/instagram-fallback";

interface InstagramFeedProps {
  posts?: InstagramPost[];
  isLoading?: boolean;
  columns?: 3 | 4;
}

function MediaTypeBadge({ type }: { type: InstagramMediaType }) {
  if (type === "CAROUSEL_ALBUM") {
    return (
      <span
        className="inline-flex shrink-0 items-center gap-1 rounded-full bg-black/65 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-white backdrop-blur-md shadow-xs border border-white/10"
        title="Carousel Post"
      >
        <Images className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" aria-hidden="true" />
        <span className="hidden xs:inline">{PORTFOLIO_COPY.feedUi.carouselBadgeFallback}</span>
      </span>
    );
  }

  if (type === "VIDEO") {
    return (
      <span
        className="inline-flex shrink-0 items-center gap-1 rounded-full bg-black/65 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-white backdrop-blur-md shadow-xs border border-white/10"
        title="Reels / Video"
      >
        <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current shrink-0" aria-hidden="true" />
        <span className="hidden xs:inline">{PORTFOLIO_COPY.feedUi.reelsBadgeLabel}</span>
      </span>
    );
  }

  return null;
}

function summarizeCaption(caption?: string): string {
  const cleaned = (caption ?? "").replace(/\s+/g, " ").trim();
  if (!cleaned) return `Lihat karya terbaru di @${CONTACT.instagramHandle}`;
  return cleaned;
}

/**
 * Skeleton loader state for feed
 */
export function InstagramFeedSkeleton({
  count = 4,
  columns = 4,
}: {
  count?: number;
  columns?: 3 | 4;
} = {}) {
  const gridColsClass =
    columns === 4
      ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      role="status"
      aria-label="Memuat feed Instagram..."
      className={`grid ${gridColsClass} gap-3 sm:gap-6`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900/50 p-3 space-y-3 animate-pulse"
        >
          <div className="aspect-square w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-1/2 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
      <span className="sr-only">Memuat postingan Instagram...</span>
    </div>
  );
}


export function InstagramFeedEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy/20 dark:border-white/15 bg-white/50 dark:bg-zinc-900/40 p-8 sm:p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 dark:bg-sky-soft/10 text-brand dark:text-sky-soft mb-4">
        <InstagramIcon className="h-7 w-7" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-navy dark:text-white">
        {PORTFOLIO_COPY.feedUi.emptyTitle}
      </h3>
      <p className="mt-1.5 max-w-md text-xs sm:text-sm text-navy-soft dark:text-zinc-400 leading-relaxed">
        {PORTFOLIO_COPY.feedUi.emptyDescription}
      </p>
      <a
        href={CONTACT.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-brand dark:bg-sky-soft px-4 py-2.5 text-xs sm:text-sm font-semibold text-white dark:text-navy hover:opacity-95 shadow-xs transition-opacity"
      >
        <InstagramIcon className="h-4 w-4 shrink-0" />
        <span>
          {PORTFOLIO_COPY.feedUi.emptyCtaPrefix} @{CONTACT.instagramHandle}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
      </a>
    </div>
  );
}


export default function InstagramFeed({
  posts,
  isLoading,
  columns = 4,
}: InstagramFeedProps) {
  if (isLoading) {
    return <InstagramFeedSkeleton count={columns} columns={columns} />;
  }

  if (!posts || posts.length === 0) {
    return <InstagramFeedEmpty />;
  }

  const gridColsClass =
    columns === 4
      ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-3 sm:gap-6`}>
      {posts.map((post, index) => {
        const summary = summarizeCaption(post.caption);
        const footnoteText =
          post.footnote?.trim() || PORTFOLIO_COPY.feedUi.singlePostLabel;

        return (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${summary} — ${PORTFOLIO_COPY.feedUi.openInInstagramLabel}`}
            className="group flex flex-col min-w-0 overflow-hidden rounded-xl sm:rounded-2xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:shadow-lg hover:border-brand/40 dark:hover:border-sky-soft/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {/* Graphic Container — Strictly bounded, zero offside text */}
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
              <Image
                src={post.imageUrl}
                alt={summary.slice(0, 100)}
                fill
                sizes={
                  columns === 4
                    ? "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    : "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                }
                priority={index < 4}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Contained Top Bar: Category Pill (left) + Media Type Badge (right) */}
              <div className="absolute inset-x-2 top-2 sm:inset-x-3 sm:top-3 z-10 flex items-start justify-between gap-1.5 sm:gap-2 pointer-events-none">
                {post.categoryTag ? (
                  <span className="min-w-0 max-w-[70%] sm:max-w-[72%] truncate rounded-full bg-white/95 dark:bg-zinc-950/90 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-mono font-semibold text-navy dark:text-sky-soft border border-black/5 dark:border-white/10 shadow-2xs">
                    {post.categoryTag}
                  </span>
                ) : (
                  <span />
                )}

                <MediaTypeBadge type={post.mediaType} />
              </div>

              {/* Clean Interactive Overlay (Desktop hover / Focus) */}
              <div className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-4 bg-navy/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-xl bg-white text-navy font-semibold text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1.5 sm:py-2 shadow-md">
                  <InstagramIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand shrink-0" />
                  <span className="truncate">
                    {PORTFOLIO_COPY.feedUi.openInInstagramLabel}
                  </span>
                  <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                </span>
              </div>
            </div>

            {/* Card Body: Short Note & Footnote separated cleanly below graphic */}
            <div className="flex flex-col flex-grow p-2.5 sm:p-5 justify-between gap-2 sm:gap-3 min-w-0">
              <p className="text-[11px] sm:text-sm text-navy dark:text-zinc-200 line-clamp-2 break-words font-medium leading-relaxed">
                {summary}
              </p>

              <div className="flex items-center justify-between gap-2 pt-2 sm:pt-3 border-t border-[#F1F5F9] dark:border-zinc-800/80 text-[10px] sm:text-xs min-w-0">
                <span className="min-w-0 truncate font-mono text-[9px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
                  {footnoteText}
                </span>

                <span className="inline-flex shrink-0 items-center gap-0.5 sm:gap-1 font-semibold text-brand dark:text-sky-soft group-hover:translate-x-0.5 transition-transform text-[10px] sm:text-xs">
                  <span className="hidden xs:inline">{PORTFOLIO_COPY.feedUi.instagramLinkLabel}</span>
                  <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
