"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Presentation, FileText, Sparkles } from "lucide-react";

export default function PortfolioSection() {
  const featuredCases = [
    {
      id: "antologi-arsitektur",
      category: "Book Layout",
      client: "Penerbit Balairung Aksara",
      scope: "280 Halaman • Hardcover",
      title: "Antologi Arsitektur Vernakular Nusantara",
      description:
        "Penataan tata letak dual-bahasa (ID/EN) dengan sistem kisi asimetris 12-kolom, kurasi 180 foto dokumenter monokrom, serta indeks tipografi teknis.",
      deliverable: "PDF Cetak Offset & Epub",
      image: "/images/assets/asset_2.webp",
      link: "/products/pt-antam-tbk-x-ugm-pse-buku-putih-cga-tayan-feronikel-haltim",
    },
    {
      id: "series-a-deck",
      category: "Pitch Deck",
      client: "Fintech Valura International",
      scope: "28 Slides • Widescreen 16:9",
      title: "Series A Capital Presentation & Financial Model",
      description:
        "Restrukturisasi narasi penggalangan dana modal ventura $14M dengan visualisasi unit economics kompleks dan hierarki data bernilai tinggi.",
      deliverable: "Editable PPTX & Keynote",
      image: "/images/assets/asset_3.webp",
      link: "/products/entalphy-consulting-modul-efisiensi-energi",
    },
    {
      id: "standar-identitas",
      category: "Identity Guidelines",
      client: "Yayasan Cipta Daya",
      scope: "140 Halaman • Softcover",
      title: "Buku Standar Identitas & Komunikasi Institusional",
      description:
        "Manual pedoman identitas merek lengkap yang mencakup aturan kisi logo, palet warna korporasi, standarisasi seragam, dan komunikasi publik.",
      deliverable: "Buku Pedoman Cetak & Vector Kit",
      image: "/images/assets/asset_4.webp",
      link: "/products/ai-recht-ai-gender-equality-in-recruitment",
    },
    {
      id: "esg-governance",
      category: "Sustainability Report",
      client: "PT Mineral Sentosa Lestari",
      scope: "216 Halaman • GRI Compliant",
      title: "Sustainability & ESG Governance Report 2024",
      description:
        "Laporan keberlanjutan tahunan terintegrasi dengan 45 diagram matriks materialitas, bagan tata kelola dewan, dan tabel emisi berstandar OJK.",
      deliverable: "Interactive Web PDF & Print",
      image: "/images/assets/asset_5.webp",
      link: "/products/kementerian-pupr-memori-akhir-tugas-profil-setjen",
    },
  ];

  return (
    <section
      className="w-full bg-[#F8FAFC] dark:bg-[#070D18] py-16 sm:py-24 border-y border-[#E2E8F0] dark:border-zinc-800 transition-colors text-left"
      id="portofolio"
      data-purpose="karya-terpilih-section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-wider text-[#1A54A4] dark:text-[#38BDF8] font-semibold">
              [PORTOFOLIO KURASI]
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white">
              Karya Terpilih &amp; Studi Kasus
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-zinc-400 leading-relaxed">
              Tinjauan visual dari beberapa proyek terpenting yang diproduksi untuk klien korporasi, institusi riset, dan penerbit independen.
            </p>
          </div>
          <div className="font-mono text-xs text-[#64748B] dark:text-zinc-400">
            MENAMPILKAN 4 DARI 24 PROYEK UNGGULAN
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featuredCases.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-[#1A54A4]/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F1F5F9] dark:bg-zinc-800">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs text-[#1A54A4] dark:text-[#38BDF8] border border-[#E2E8F0] dark:border-zinc-700 font-mono text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[#64748B] dark:text-zinc-400 font-mono text-xs">
                    <span>{item.client}</span>
                    <span>{item.scope}</span>
                  </div>
                  <Link href={item.link} className="block group/title">
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white group-hover/title:text-[#1A54A4] dark:group-hover/title:text-[#38BDF8] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-[#64748B] dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-6 py-4 flex items-center justify-between text-xs font-mono text-[#0F172A] dark:text-zinc-100 border-t border-[#E2E8F0] dark:border-zinc-800 bg-[#F8FAFC]/50 dark:bg-zinc-950/40">
                <span className="text-[#64748B] dark:text-zinc-400">
                  Deliverable: {item.deliverable}
                </span>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1 font-semibold text-[#1A54A4] dark:text-[#38BDF8] hover:text-[#103B75] transition-colors group/link"
                >
                  <span>Detail Studi Kasus</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#1A54A4] text-[#1A54A4] dark:text-[#38BDF8] dark:border-[#38BDF8] hover:bg-[#1A54A4] hover:text-white dark:hover:bg-[#38BDF8] dark:hover:text-[#0F172A] font-semibold text-xs sm:text-sm transition-all"
          >
            <span>Buka Seluruh Arsip Katalog Karya (11 Proyek)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
