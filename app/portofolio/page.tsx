import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioSection from "@/components/sections/PortfolioSection";
import { getPublicPortfolioPosts } from "@/lib/portfolio-store";
import { PORTFOLIO_COPY } from "@/lib/copywriting";

export const metadata: Metadata = {
  title: "Portofolio Karya",
  description: PORTFOLIO_COPY.description,
  alternates: {
    canonical: "/portofolio",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortofolioPage() {
  const posts = await getPublicPortfolioPosts();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#070D18]">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-[#134282] dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-zinc-200 font-semibold">
              Portofolio
            </span>
          </div>
        </div>

        <PortfolioSection posts={posts} showAll />
      </main>

      <Footer />
    </div>
  );
}
