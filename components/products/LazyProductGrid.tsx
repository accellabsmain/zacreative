"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type ProductGridType from "./ProductGrid";

const ProductGrid = dynamic(() => import("./ProductGrid"), {
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-80 rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse"
        />
      ))}
    </div>
  ),
});

/** Client boundary so the product grid is code-split into its own chunk. */
export default function LazyProductGrid(
  props: ComponentProps<typeof ProductGridType>
) {
  return <ProductGrid {...props} />;
}
