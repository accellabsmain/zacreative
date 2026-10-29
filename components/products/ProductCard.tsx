"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductItem } from "@/lib/data/products";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: ProductItem;
  variant?: "grid" | "compact" | "horizontal";
  showBlueprint?: boolean;
  onQuickInquiry?: (product: ProductItem) => void;
}

export default function ProductCard({
  product,
  variant = "grid",
  showBlueprint = false,
  onQuickInquiry,
}: ProductCardProps) {
  if (variant === "compact") {
    return (
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between gap-4 hover:border-[#1A54A4] dark:hover:border-zinc-100 transition-colors group">
        <div className="space-y-1 truncate">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EBF2FA] dark:bg-zinc-800 text-[#1A54A4] dark:text-[#38BDF8] font-semibold">
              {product.clientTag}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              {product.scope}
            </span>
          </div>
          <h4 className="font-semibold text-sm text-zinc-950 dark:text-white truncate group-hover:text-[#1A54A4] dark:group-hover:text-[#38BDF8] transition-colors">
            {product.shortTitle}
          </h4>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block">
            {product.formatBadge}
          </span>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-[#EBF2FA] dark:hover:bg-zinc-800 text-[#1A54A4] dark:text-[#38BDF8] shrink-0 transition-colors"
          aria-label={`Lihat detail ${product.title}`}
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group relative flex flex-col sm:flex-row items-stretch bg-white dark:bg-zinc-900 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-[#1A54A4]/50 transition-all duration-300 overflow-hidden">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-64 aspect-[16/10] sm:aspect-auto bg-[#F1F5F9] dark:bg-zinc-800 overflow-hidden shrink-0">
          {product.image && !showBlueprint ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, 256px"
            />
          ) : (
            <div className="w-full h-full wireframe-box wireframe-box-diagonal flex items-center justify-center">
              <span className="relative z-10 font-mono text-xs px-2 py-1 bg-white/90 dark:bg-zinc-900/90 rounded border border-zinc-300 dark:border-zinc-700">
                {product.clientTag}
              </span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs text-[#0F172A] dark:text-zinc-100 font-mono text-[11px] tracking-wider font-semibold uppercase border border-[#E2E8F0] dark:border-zinc-700 shadow-xs">
              {product.clientTag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between flex-1 gap-4 text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#EBF2FA] dark:bg-zinc-800 text-[#1A54A4] dark:text-[#38BDF8] font-mono text-[11px] uppercase tracking-wider font-semibold border border-[#B3CCFF]/60 dark:border-zinc-700">
                {product.categoryLabel}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {product.scope}
              </span>
            </div>
            <Link href={`/products/${product.slug}`} className="block group/link">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-white group-hover/link:text-[#1A54A4] dark:group-hover/link:text-[#38BDF8] transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {product.summary}
            </p>
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">
              {product.formatBadge}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onQuickInquiry?.(product)}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Pesan
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center gap-1 font-semibold text-[#1A54A4] dark:text-[#38BDF8] hover:underline"
              >
                <span>Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default "grid" card matching Stitch reference
  return (
    <article className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-[#1A54A4]/50 transition-all duration-300 overflow-hidden text-left">
      {/* Top Hairline Active Accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1A54A4] via-[#38BDF8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

      {/* Visual Thumbnail */}
      <div className="relative w-full aspect-[16/10] bg-[#F1F5F9] dark:bg-zinc-800 overflow-hidden flex items-center justify-center">
        {product.image && !showBlueprint ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full wireframe-box wireframe-box-diagonal flex flex-col items-center justify-center p-4">
            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 bg-white/90 dark:bg-zinc-900/90 px-3 py-1.5 rounded border border-zinc-300 dark:border-zinc-700 shadow-2xs">
              [{product.shortTitle}]
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#103B75]/70 via-transparent to-transparent opacity-40 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs text-[#0F172A] dark:text-zinc-100 font-mono text-[11px] tracking-wider font-semibold uppercase border border-[#E2E8F0] dark:border-zinc-700 shadow-xs">
            {product.clientTag}
          </span>
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full bg-[#1A54A4] text-white font-mono text-[10px] tracking-wider font-semibold shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Bottom Scope Tag */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-[#1A54A4] text-white font-mono text-[11px] tracking-wider font-semibold shadow-xs">
            {product.scope}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 rounded-full bg-[#EBF2FA] dark:bg-zinc-800 text-[#1A54A4] dark:text-[#38BDF8] font-mono text-[11px] uppercase tracking-wider font-semibold border border-[#B3CCFF]/60 dark:border-zinc-700">
              {product.categoryLabel}
            </span>
            <span className="font-mono text-[12px] text-[#64748B] dark:text-zinc-400 font-medium bg-[#F8FAFC] dark:bg-zinc-800 px-2 py-0.5 rounded border border-[#E2E8F0] dark:border-zinc-700">
              {product.formatBadge}
            </span>
          </div>

          <Link href={`/products/${product.slug}`} className="block group/link">
            <h3 className="text-xl text-[#0F172A] dark:text-white font-semibold group-hover/link:text-[#1A54A4] dark:group-hover/link:text-[#38BDF8] transition-colors leading-snug line-clamp-2">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-[#64748B] dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-[#E2E8F0] dark:border-zinc-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onQuickInquiry?.(product)}
            className="text-xs font-mono text-[#64748B] dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Pesan Cepat
          </button>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 font-mono text-xs text-[#1A54A4] dark:text-[#38BDF8] hover:text-[#103B75] font-semibold group/link"
          >
            <span>Detail Studi Kasus</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
