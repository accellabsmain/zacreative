"use client";

import dynamic from "next/dynamic";
import Reveal from "@/components/motion/Reveal";
import type { InstagramPost } from "@/lib/data/instagram-fallback";

/**
 * Below-the-fold home sections. Lazy-loaded from a Client Component so
 * Next.js actually code-splits them into separate chunks (dynamic imports
 * from a Server Component are not split).
 */
const SectionSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-hidden>
    <div className="h-64 rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
  </div>
);

const TrustIndicators = dynamic(() => import("./TrustIndicators"), { loading: SectionSkeleton });
const PackagesSection = dynamic(() => import("./PackagesSection"), { loading: SectionSkeleton });
const PortfolioSection = dynamic(() => import("./PortfolioSection"), { loading: SectionSkeleton });
const ProcessSection = dynamic(() => import("./ProcessSection"), { loading: SectionSkeleton });
const FaqSection = dynamic(() => import("./FaqSection"), { loading: SectionSkeleton });
const WhatsAppCtaSection = dynamic(() => import("./WhatsAppCtaSection"), {
  loading: SectionSkeleton,
});

interface LazyHomeSectionsProps {
  instagramPosts: InstagramPost[];
}

export default function LazyHomeSections({ instagramPosts }: LazyHomeSectionsProps) {
  return (
    <>
      <Reveal>
        <TrustIndicators />
      </Reveal>
      <Reveal>
        <PackagesSection />
      </Reveal>
      <Reveal>
        <PortfolioSection posts={instagramPosts} />
      </Reveal>
      <Reveal>
        <ProcessSection />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
      <Reveal>
        <WhatsAppCtaSection />
      </Reveal>
    </>
  );
}
