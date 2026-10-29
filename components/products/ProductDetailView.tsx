"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductItem, getRelatedProducts } from "@/lib/data/products";
import dynamic from "next/dynamic";

// Lazy: modal bundle only downloads when user opens an inquiry
const ProductInquiryModal = dynamic(
  () => import("@/components/products/ProductInquiryModal"),
  { ssr: false }
);
import {
  ChevronRight,
  ArrowRight,
  Layers,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildWhatsAppLink } from "@/lib/constants";

interface ProductDetailViewProps {
  product: ProductItem;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const carouselSlides = product.specCarousel || [
    {
      step: "01",
      title: "Pratinjau Utama",
      subtitle: "Master Layout Spread",
      image: product.image || "/images/assets/asset_7.webp",
    },
    {
      step: "02",
      title: "Sistem Grid & Tipografi",
      subtitle: "Editorial Margin Guidelines",
      image: "/images/assets/asset_8.webp",
    },
  ];

  const currentSlide = carouselSlides[activeSlideIndex] || carouselSlides[0];
  const relatedProducts = getRelatedProducts(product.id, 2);

  return (
    <div className="py-8 sm:py-12 transition-colors text-left" data-purpose="product-detail-view">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10 sm:space-y-14">
        {/* Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-zinc-800 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#64748B] dark:text-zinc-400">
            <Link href="/" className="hover:text-[#1A54A4] dark:hover:text-white transition-colors">
              [ZACREATIVE]
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-[#1A54A4] dark:hover:text-white transition-colors">
              KATALOG
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0F172A] dark:text-zinc-100 font-semibold truncate max-w-xs">
              {product.shortTitle}
            </span>
          </nav>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Proyek Selesai &amp; Terbit
            </span>
          </div>
        </div>

        {/* Hero Title & Context */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#EBF2FA] dark:bg-zinc-800 text-[#1A54A4] dark:text-[#38BDF8] font-bold uppercase tracking-wider border border-[#B3CCFF]/60 dark:border-zinc-700">
              {product.categoryLabel.toUpperCase()} &amp; STRATEGIC REPORT
            </span>
            {product.badge && (
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#0F172A] dark:bg-zinc-100 text-white dark:text-[#0F172A] font-semibold">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white leading-tight">
            {product.title}
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] dark:text-zinc-300 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* Spec Layout Archive Carousel (Matching Stitch Screen 1) */}
        <div className="rounded-2xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
          {/* Carousel Header Bar */}
          <div className="p-4 sm:p-5 border-b border-[#E2E8F0] dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC] dark:bg-zinc-950">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0F172A] dark:text-zinc-100 font-bold">
              <Layers className="w-4 h-4 text-[#1A54A4] dark:text-[#38BDF8]" />
              <span>SPEC_LAYOUT_ARCHIVE // VOL_04</span>
            </div>
            <div className="text-xs font-mono text-[#64748B] dark:text-zinc-400">
              Slide {activeSlideIndex + 1} dari {carouselSlides.length}: {currentSlide.title} ({currentSlide.subtitle})
            </div>
          </div>

          {/* Large Image Canvas */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#0F172A] overflow-hidden flex items-center justify-center">
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              className="object-contain sm:object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white space-y-1 z-10">
              <span className="font-mono text-xs text-[#38BDF8] block">
                {`${currentSlide.step} // ARSIP TATA LETAK`}
              </span>
              <h3 className="text-lg sm:text-2xl font-bold">{currentSlide.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-mono">{currentSlide.subtitle}</p>
            </div>
          </div>

          {/* Interactive Slide Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#E2E8F0] dark:border-zinc-800 divide-x divide-[#E2E8F0] dark:divide-zinc-800">
            {carouselSlides.map((slide, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlideIndex(idx)}
                className={`p-3 sm:p-4 text-left transition-colors cursor-pointer ${
                  activeSlideIndex === idx
                    ? "bg-[#EBF2FA] dark:bg-zinc-800 text-[#1A54A4] dark:text-white font-semibold"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <span className="font-mono text-[11px] block opacity-75">{slide.step}</span>
                <span className="text-xs sm:text-sm block truncate mt-0.5">{slide.title}</span>
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 block truncate">
                  {slide.subtitle}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Metric Stat Callouts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 sm:p-6 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-mono text-xs text-[#64748B] dark:text-zinc-400 uppercase tracking-wider block">
              Total Volume
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0F172A] dark:text-white">
              487 Hlm
            </div>
            <span className="text-xs text-[#64748B] dark:text-zinc-400 block">
              2 Jilid Buku Putih
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-mono text-xs text-[#64748B] dark:text-zinc-400 uppercase tracking-wider block">
              Timeline Sprint
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0F172A] dark:text-white">
              7 Hari
            </div>
            <span className="text-xs text-[#64748B] dark:text-zinc-400 block">
              Turnaround Intensif
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-mono text-xs text-[#64748B] dark:text-zinc-400 uppercase tracking-wider block">
              Standar Cetak
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0F172A] dark:text-white">
              FOGRA39
            </div>
            <span className="text-xs text-[#64748B] dark:text-zinc-400 block">
              Offset Presisi Tinggi
            </span>
          </div>

          <div className="p-5 sm:p-6 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <span className="font-mono text-xs text-[#64748B] dark:text-zinc-400 uppercase tracking-wider block">
              Mitra Lembaga
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0F172A] dark:text-white">
              UGM
            </div>
            <span className="text-xs text-[#64748B] dark:text-zinc-400 block">
              Pusat Studi Energi
            </span>
          </div>
        </div>

        {/* Narrative & Context Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Kuratorial & 7-Day Workflow */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white">
                Deskripsi Proyek &amp; Konteks Kuratorial
              </h2>
              <p className="text-sm sm:text-base text-[#424751] dark:text-zinc-300 leading-relaxed">
                {product.fullDescription}
              </p>
              <p className="text-sm sm:text-base text-[#424751] dark:text-zinc-300 leading-relaxed">
                Tantangan utama adalah mengeksekusi 487 halaman laporan riset berbobot tinggi menjadi publikasi visual yang mudah dicerna oleh para pemangku kepentingan dalam rentang waktu intensif 7 hari kerja, dengan menjaga akurasi tabel teknis ratusan kolom serta standardisasi infografis komprehensif.
              </p>
            </div>

            {/* 7-Day Sprint Workflow */}
            <div className="space-y-6 pt-4 border-t border-[#E2E8F0] dark:border-zinc-800">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#1A54A4] dark:text-[#38BDF8] uppercase tracking-wider font-semibold">
                  [METODOLOGI KILAT]
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white">
                  Alur Kerja Eksekusi 7-Hari
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#EBF2FA] dark:bg-zinc-800 text-[#1A54A4] dark:text-[#38BDF8] font-bold">
                      STEP 01
                    </span>
                    <h4 className="font-bold text-base text-[#0F172A] dark:text-white">
                      Information Structuring
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#424751] dark:text-zinc-400 pl-16 leading-relaxed">
                    Normalisasi manuskrip mentah, audit hierarki judul bab, dan pemetaan 60+ tabel data teknis ke dalam sistem kisi modular 12-kolom.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#EBF2FA] dark:bg-zinc-800 text-[#1A54A4] dark:text-[#38BDF8] font-bold">
                      STEP 02
                    </span>
                    <h4 className="font-bold text-base text-[#0F172A] dark:text-white">
                      Drafting &amp; Typography
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#424751] dark:text-zinc-400 pl-16 leading-relaxed">
                    Penyusunan 487 halaman secara paralel dalam master template InDesign dengan kontrol leading, tracking presisi, dan visualisasi diagram neraca energi.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#EBF2FA] dark:bg-zinc-800 text-[#1A54A4] dark:text-[#38BDF8] font-bold">
                      STEP 03
                    </span>
                    <h4 className="font-bold text-base text-[#0F172A] dark:text-white">
                      Print Pre-Flight &amp; Handoff
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#424751] dark:text-zinc-400 pl-16 leading-relaxed">
                    Pengecekan overprint black, profil warna FOGRA39, bleed 3mm, dan penyerahan paket arsip digital siap kirim percetakan offset komersial.
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-4 pt-4 border-t border-[#E2E8F0] dark:border-zinc-800">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white">
                Paket Berkas &amp; Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-[#1A54A4] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                      Master Adobe InDesign (.INDD)
                    </h4>
                    <p className="text-xs text-[#64748B] dark:text-zinc-400 mt-0.5">
                      File master editable lengkap dengan tautan gambar dan font yang dipaketkan.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-[#1A54A4] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                      Print-Ready High-Res PDF/X-1a
                    </h4>
                    <p className="text-xs text-[#64748B] dark:text-zinc-400 mt-0.5">
                      Standar cetak offset global dengan crop marks, bleed 3mm, dan FOGRA39.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-[#1A54A4] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                      Structured Data Tables &amp; Infographics
                    </h4>
                    <p className="text-xs text-[#64748B] dark:text-zinc-400 mt-0.5">
                      Aset vektor diagram neraca mineral dan tabel data resolusi tinggi.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-[#1A54A4] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                      Panduan Gaya Tipografi &amp; Ringkasan
                    </h4>
                    <p className="text-xs text-[#64748B] dark:text-zinc-400 mt-0.5">
                      Dokumentasi hierarki font editorial dan e-book interaktif ringkas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detail Pesanan & Action Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#1A54A4] dark:border-[#38BDF8] bg-white dark:bg-zinc-900 shadow-md space-y-5 sticky top-28">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-zinc-800">
                <span className="font-mono text-xs uppercase tracking-wider text-[#64748B] dark:text-zinc-400 font-semibold">
                  Detail Pesanan
                </span>
                <span className="text-xs font-mono font-bold text-[#1A54A4] dark:text-[#38BDF8]">
                  ID: db02955a
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-400 block">Estimasi Investasi Mulai</span>
                <div className="text-3xl font-mono font-bold text-[#0F172A] dark:text-white">
                  {product.priceFormatted}
                </div>
                <span className="text-xs text-zinc-500 font-mono block">
                  Termasuk 2 jilid naskah &amp; penyerahan berkas master
                </span>
              </div>

              <div className="space-y-2.5 pt-2 text-xs text-zinc-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Jaminan kerahasiaan naskah penuh (NDA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Dukungan prepress langsung dengan percetakan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>File InDesign master (.indd) diserahkan penuh</span>
                </div>
              </div>

              <div className="pt-3 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#1A54A4] hover:bg-[#103B75] text-white text-sm font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <span>Pesan Format Serupa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={buildWhatsAppLink(
                    `Halo ZaCreative, saya tertarik dengan format publikasi seperti *${product.title}*. Mohon informasi konsultasi awal dan estimasi pengerjaan.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-leaf-strong hover:bg-leaf-hover text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>Konsultasi WhatsApp Langsung</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Related Works (Screen 1 Footer reference) */}
        <div className="pt-10 border-t border-[#E2E8F0] dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#1A54A4] dark:text-[#38BDF8] font-semibold block">
                [STUDI KASUS LAINNYA]
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white">
                Karya Terkait Lainnya
              </h3>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#1A54A4] dark:text-[#38BDF8] font-semibold hover:underline"
            >
              <span>Semua Karya di Katalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="group relative flex flex-col sm:flex-row items-stretch bg-white dark:bg-zinc-900 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-[#1A54A4]/50 transition-all overflow-hidden"
              >
                <div className="relative w-full sm:w-48 aspect-[16/10] sm:aspect-auto bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#1A54A4] dark:text-[#38BDF8] font-semibold uppercase block">
                      {rel.clientTag}
                    </span>
                    <Link href={`/products/${rel.slug}`} className="block group/link">
                      <h4 className="font-bold text-sm text-[#0F172A] dark:text-white group-hover/link:text-[#1A54A4] dark:group-hover/link:text-[#38BDF8] transition-colors line-clamp-1">
                        {rel.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-[#64748B] dark:text-zinc-400 line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                  <Link
                    href={`/products/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#1A54A4] dark:text-[#38BDF8] hover:underline"
                  >
                    <span>Detail Kasus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <ProductInquiryModal
          product={product}
          onClose={() => setIsInquiryOpen(false)}
        />
      )}
    </div>
  );
}
