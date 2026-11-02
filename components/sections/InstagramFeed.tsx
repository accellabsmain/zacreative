"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Play,
  X,
  ArrowUpRight,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { CONTACT } from "@/lib/constants";
import { PORTFOLIO_COPY } from "@/lib/copywriting";
import type { InstagramMediaType, InstagramPost } from "@/lib/data/instagram-fallback";

interface InstagramFeedProps {
  posts?: InstagramPost[];
  isLoading?: boolean;
}

function MediaTypeBadge({
  type,
  slideCount,
}: {
  type: InstagramMediaType;
  slideCount?: number;
}) {
  if (type === "CAROUSEL_ALBUM" || (slideCount && slideCount > 1)) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-sm border border-white/10"
        title={`${slideCount ?? "Multi"} slide carousel`}
      >
        <Images className="h-3.5 w-3.5" aria-hidden="true" />
        <span>
          {slideCount
            ? `${slideCount} ${PORTFOLIO_COPY.feedUi.carouselBadgeSuffix}`
            : PORTFOLIO_COPY.feedUi.carouselBadgeFallback}
        </span>
      </span>
    );
  }

  if (type === "VIDEO") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-sm border border-white/10"
        title="Reels / Video"
      >
        <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
        <span>{PORTFOLIO_COPY.feedUi.reelsBadgeLabel}</span>
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
 * Interactive Modal for viewing all slides in a carousel post.
 * Supports keyboard navigation (Esc, Arrow Left/Right) and touch swiping.
 */
function CarouselModal({
  post,
  onClose,
}: {
  post: InstagramPost;
  onClose: () => void;
}) {
  const slides =
    post.slides && post.slides.length > 0
      ? post.slides
      : [{ id: `${post.id}-0`, type: post.mediaType, url: post.imageUrl }];

  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  }, [slides.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, prevSlide, nextSlide]);

  const currentSlide = slides[currentIndex];
  const summary = summarizeCaption(post.caption);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Penampil Slide Instagram"
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
    >
      <div className="relative flex flex-col max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white dark:bg-[#0b1320] border border-white/10 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 px-4 py-3 bg-zinc-50 dark:bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 dark:bg-sky-soft/10 text-brand dark:text-sky-soft">
              <Images className="h-4 w-4" />
            </span>
            <span className="text-xs font-mono font-medium text-navy dark:text-zinc-200">
              Slide {currentIndex + 1} dari {slides.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup penampil slide"
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Slide Viewer Area */}
        <div className="relative aspect-square sm:aspect-[4/3] md:aspect-[16/10] w-full bg-black/95 flex items-center justify-center overflow-hidden">
          {currentSlide && (
            <Image
              key={currentSlide.id || currentIndex}
              src={currentSlide.url}
              alt={`Slide ${currentIndex + 1} - ${summary.slice(0, 100)}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          )}

          {/* Previous Button */}
          {slides.length > 1 && (
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next Button */}
          {slides.length > 1 && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Slide selanjutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Bottom Dot Indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
              {slides.map((s, idx) => (
                <button
                  key={s.id || idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Pindah ke slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-6 bg-white shadow-sm"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer: Caption & IG Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-[#0b1320] border-t border-black/10 dark:border-white/10">
          <p className="text-xs sm:text-sm text-navy-soft dark:text-zinc-300 line-clamp-2 max-w-2xl leading-relaxed">
            {summary}
          </p>

          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-brand dark:bg-sky-soft px-4 py-2 text-xs font-semibold text-white dark:text-navy hover:opacity-95 shadow-sm transition-opacity shrink-0"
          >
            <InstagramIcon className="h-4 w-4" />
            <span>{PORTFOLIO_COPY.feedUi.openInInstagramLabel}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton loader state for feed
 */
export function InstagramFeedSkeleton() {
  return (
    <div
      role="status"
      aria-label="Memuat feed Instagram..."
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
    >
      {Array.from({ length: 6 }).map((_, i) => (
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

/**
 * Empty state when no posts are available
 */
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
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand dark:bg-sky-soft px-4 py-2.5 text-xs sm:text-sm font-semibold text-white dark:text-navy hover:opacity-95 shadow-xs transition-opacity"
      >
        <InstagramIcon className="h-4 w-4" />
        <span>
          {PORTFOLIO_COPY.feedUi.emptyCtaPrefix} @{CONTACT.instagramHandle}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

/**
 * Responsive Instagram Feed component with 3 columns on desktop, 1-2 on mobile,
 * multi-slide carousel modal support, and permanent asset links.
 */
export default function InstagramFeed({ posts, isLoading }: InstagramFeedProps) {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  if (isLoading) {
    return <InstagramFeedSkeleton />;
  }

  if (!posts || posts.length === 0) {
    return <InstagramFeedEmpty />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {posts.map((post, index) => {
          const summary = summarizeCaption(post.caption);
          const slides = post.slides ?? [];
          const isCarousel =
            post.mediaType === "CAROUSEL_ALBUM" || slides.length > 1;

          return (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:shadow-lg hover:border-brand/40 dark:hover:border-sky-soft/40 transition-all duration-300"
            >
              {/* Media Thumbnail Container */}
              <div
                className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 cursor-pointer"
                onClick={() => {
                  if (isCarousel) {
                    setSelectedPost(post);
                  } else {
                    window.open(post.permalink, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <Image
                  src={post.imageUrl}
                  alt={summary.slice(0, 100)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Top-Right Badge: Carousel indicator or Reels badge */}
                <div className="absolute top-3 right-3 z-10">
                  <MediaTypeBadge
                    type={post.mediaType}
                    slideCount={slides.length > 1 ? slides.length : undefined}
                  />
                </div>

                {/* Top-Left Category Tag */}
                {post.categoryTag && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block rounded-full bg-white/95 dark:bg-zinc-950/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-semibold text-navy dark:text-sky-soft border border-black/5 dark:border-white/10 shadow-2xs">
                      {post.categoryTag}
                    </span>
                  </div>
                )}

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {isCarousel ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(post);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-white text-navy font-semibold text-xs sm:text-sm px-4 py-2 shadow-lg hover:bg-zinc-100 transition-colors"
                    >
                      <Images className="h-4 w-4 text-brand" />
                      <span>Buka {slides.length} Slide</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/95 text-navy font-semibold text-xs px-3.5 py-2 shadow-md">
                      <InstagramIcon className="h-3.5 w-3.5" />
                      <span>{PORTFOLIO_COPY.feedUi.openInInstagramLabel}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-grow p-4 sm:p-5 justify-between gap-3">
                <p className="text-xs sm:text-sm text-navy dark:text-zinc-200 line-clamp-2 font-medium leading-relaxed">
                  {summary}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] dark:border-zinc-800/80 text-xs">
                  {isCarousel ? (
                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-1 font-semibold text-brand dark:text-sky-soft hover:underline"
                    >
                      <span>Lihat {slides.length} slide</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                      {PORTFOLIO_COPY.feedUi.singlePostLabel}
                    </span>
                  )}

                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buka postingan di Instagram`}
                    className="inline-flex items-center gap-1 font-semibold text-navy-soft dark:text-zinc-400 hover:text-brand dark:hover:text-sky-soft transition-colors"
                  >
                    <span>{PORTFOLIO_COPY.feedUi.instagramLinkLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Interactive Modal for viewing carousel slides */}
      {selectedPost && (
        <CarouselModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}
