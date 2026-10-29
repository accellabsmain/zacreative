"use client";

import Image from "next/image";
import { ArrowUpRight, Images, Play } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { CONTACT } from "@/lib/constants";
import {
  INSTAGRAM_FALLBACK_POSTS,
  type InstagramMediaType,
  type InstagramPost,
} from "@/lib/data/instagram-fallback";

interface PortfolioSectionProps {
  posts?: InstagramPost[];
}

function MediaTypeBadge({ type }: { type: InstagramMediaType }) {
  if (type === "CAROUSEL_ALBUM") {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-xs shadow-xs"
        title="Carousel"
      >
        <Images className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only">Postingan Carousel</span>
      </span>
    );
  }

  if (type === "VIDEO") {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-xs shadow-xs"
        title="Reels / Video"
      >
        <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        <span className="sr-only">Video Reels</span>
      </span>
    );
  }

  return null;
}

function summarizeCaption(caption: string): string {
  const cleaned = caption.replace(/\s+/g, " ").trim();
  if (!cleaned) return `Lihat detail karya di @${CONTACT.instagramHandle}`;
  return cleaned;
}

export default function PortfolioSection({ posts }: PortfolioSectionProps) {
  const feed = (posts && posts.length > 0 ? posts : INSTAGRAM_FALLBACK_POSTS).slice(0, 8);

  return (
    <section
      id="portofolio"
      data-purpose="instagram-portfolio-section"
      aria-labelledby="portofolio-heading"
      className="w-full bg-[#F8FAFC] dark:bg-[#070D18] py-16 sm:py-24 border-b border-[#E2E8F0] dark:border-zinc-800 transition-colors text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-brand dark:text-sky-soft font-semibold block">
              [PORTOFOLIO]
            </span>
            <h2
              id="portofolio-heading"
              className="text-2xl sm:text-4xl font-bold tracking-tight text-navy dark:text-white leading-tight"
            >
              Karya Terbaru dari Instagram
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-navy-soft dark:text-zinc-400 leading-relaxed">
              Cuplikan publikasi buku, pitch deck, dan kampanye visual terbaru yang kami bagikan
              langsung di Instagram resmi ZaCreative.
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
            <span>Follow @{CONTACT.instagramHandle}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 8-Post Square Thumbnail Grid (Mobile 2 cols, Tablet 3 cols, Desktop 4 cols) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {feed.map((post, index) => {
            const summary = summarizeCaption(post.caption);
            return (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka karya di Instagram: ${summary.slice(0, 90)}`}
                className="group relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl border border-[#E2E8F0] dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xs hover:shadow-md hover:border-brand/50 dark:hover:border-sky-soft/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-all"
              >
                <Image
                  src={post.imageUrl}
                  alt={summary.slice(0, 120)}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 2}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Top-left optional category chip (shown when fallback metadata has one) */}
                {post.categoryTag && (
                  <div className="absolute top-2.5 left-2.5 z-10 sm:top-3 sm:left-3">
                    <span className="inline-block rounded-full bg-white/90 dark:bg-zinc-950/85 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-semibold text-navy dark:text-sky-soft border border-black/5 dark:border-white/10 shadow-2xs">
                      {post.categoryTag}
                    </span>
                  </div>
                )}

                {/* Top-right media type indicator (Carousel / Reels) */}
                <div className="absolute top-2.5 right-2.5 z-10 sm:top-3 sm:right-3">
                  <MediaTypeBadge type={post.mediaType} />
                </div>

                {/* Desktop Hover / Focus Overlay with Caption Snippet + IG Icon */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-[#0b1c30]/90 via-[#0b1c30]/45 to-transparent p-3.5 sm:p-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-250">
                  <p className="text-xs sm:text-[13px] font-medium text-white leading-snug line-clamp-3">
                    {summary}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/20 text-[11px] font-semibold text-sky-soft">
                    <span className="inline-flex items-center gap-1.5">
                      <InstagramIcon className="h-3.5 w-3.5" />
                      <span>Lihat di Instagram</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>

                {/* Subtle mobile bottom gradient + IG indicator so touch devices know it opens IG */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/65 via-black/25 to-transparent px-3 py-2 text-[11px] text-white sm:hidden"
                >
                  <span className="truncate font-medium pr-2">{summary}</span>
                  <InstagramIcon className="h-3.5 w-3.5 shrink-0 opacity-90" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
