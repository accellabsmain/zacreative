import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LazyProductGrid from "@/components/products/LazyProductGrid";
import Reveal from "@/components/motion/Reveal";
import { getAllProducts } from "@/lib/data/products";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Produk & Paket Desain",
  description:
    "Eksplorasi seluruh paket layanan desain editorial buku, dek presentasi investor, poster kampanye, dan laporan keberlanjutan tahunan dari ZaCreative Studio.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Katalog Produk & Paket Desain | ZaCreative Studio",
    description:
      "Paket lengkap desain editorial buku, pitch deck, dan kampanye visual berstandar tinggi.",
    url: "/products",
  },
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Modular Product Grid */}
          <Reveal delay={0.1}>
            <LazyProductGrid
              products={products}
              title="Daftar Paket Layanan Terkurasi"
              subtitle="Seluruh pengerjaan dilengkapi lisensi komersial, arsitektur grid modular, dan source files lengkap siap pakai."
              showFilters={true}
              showSearch={true}
            />
          </Reveal>

          {/* Bottom Consultation Banner */}
          <Reveal>
            <div className="p-8 rounded-2xl border-2 border-zinc-900 dark:border-zinc-100 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-900 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">Butuh Spesifikasi Khusus di Luar Paket?</h3>
                <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-600">
                  Kami siap merancang estimasi bespoke untuk volume publikasi besar atau proyek multi-tahunan.
                </p>
              </div>
              <Link
                href="/#kontak"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 shadow-xs"
              >
                <span>Diskusikan Kebutuhan Custom</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </main>

      <Reveal>
        <Footer />
      </Reveal>
    </div>
  );
}
