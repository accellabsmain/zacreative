import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LazyProductGrid from "@/components/products/LazyProductGrid";
import Reveal from "@/components/motion/Reveal";
import { getAllProducts } from "@/lib/data/products";
import { Sparkles, ArrowRight } from "lucide-react";

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
          {/* Page Banner Header */}
          <Reveal distance={20}>
          <div className="p-8 sm:p-12 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 relative overflow-hidden text-left space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                [Katalog Produk &amp; Paket Desain]
              </span>
              <span className="text-xs font-mono text-zinc-500">
                Stitch ID: 0c6e1e5699474cf78cc7c135888ffc11
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
              Standar Presisi untuk Setiap Medium Visual
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Pilih spesifikasi desain yang dirancang khusus untuk memenuhi standar publikasi cetak komersial, presentasi dewan direksi, dan kampanye berdaya jangkau luas.
            </p>
          </div>
          </Reveal>

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
          <div className="p-8 rounded-2xl border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
