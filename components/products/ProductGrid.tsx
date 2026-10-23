"use client";

import { useState } from "react";
import { ProductItem } from "@/lib/data/products";
import ProductCard from "@/components/products/ProductCard";
import dynamic from "next/dynamic";

// Lazy: modal bundle only downloads when user opens an inquiry
const ProductInquiryModal = dynamic(
  () => import("@/components/products/ProductInquiryModal"),
  { ssr: false }
);
import { Search, LayoutGrid, List } from "lucide-react";

interface ProductGridProps {
  products: ProductItem[];
  title?: string;
  subtitle?: string;
  initialCategory?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  limit?: number;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  initialCategory = "all",
  showFilters = true,
  showSearch = true,
  limit,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "horizontal">("grid");
  const [isBlueprint, setIsBlueprint] = useState<boolean>(false);
  const [inquiryProduct, setInquiryProduct] = useState<ProductItem | null>(null);

  const categories = [
    { id: "all", label: "Semua Kategori" },
    { id: "editorial", label: "Editorial & Buku" },
    { id: "presentation", label: "Pitch Deck" },
    { id: "campaign", label: "Poster & Kampanye" },
  ];

  const filtered = products.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const displayProducts = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="space-y-8" data-purpose="product-grid-container">
      {/* Title & Controls */}
      {(title || subtitle || showFilters || showSearch) && (
        <div className="space-y-6">
          {(title || subtitle) && (
            <div className="text-left space-y-2">
              {title && (
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Filter Bar & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            {/* Category Pills */}
            {showFilters && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-2xs"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            {/* Right toolbar: Search & View Modes */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {showSearch && (
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari naskah, deck..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  />
                </div>
              )}

              {/* Blueprint Mode toggle */}
              <button
                type="button"
                onClick={() => setIsBlueprint(!isBlueprint)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                  isBlueprint
                    ? "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
                title="Toggle Lo-Fi Blueprint preview styling"
              >
                Blueprint
              </button>

              {/* View layout toggle */}
              <div className="hidden sm:flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-white dark:bg-zinc-900">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                      : "text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("horizontal")}
                  aria-label="List view"
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "horizontal"
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white"
                      : "text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid or List Display */}
      {displayProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 space-y-2">
          <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
            Tidak ada produk desain yang cocok dengan pencarian &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs font-mono underline hover:no-underline text-zinc-900 dark:text-zinc-100"
          >
            Reset filter pencarian
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              variant="grid"
              showBlueprint={isBlueprint}
              onQuickInquiry={(p) => setInquiryProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              variant="horizontal"
              showBlueprint={isBlueprint}
              onQuickInquiry={(p) => setInquiryProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Quick Inquiry Modal */}
      {inquiryProduct && (
        <ProductInquiryModal
          product={inquiryProduct}
          onClose={() => setInquiryProduct(null)}
        />
      )}
    </div>
  );
}
