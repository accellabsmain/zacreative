/**
 * Service packages shown on the landing page (#paket).
 *
 * Prices for "Layout Buku" follow the approved wireframe. Prices for
 * "Presentasi" and "Poster" are placeholders — edit the values below only;
 * the layout adapts automatically.
 */

export type TierId = "bronze" | "silver" | "gold";

export interface PackageTier {
  id: TierId;
  label: string; // small badge, e.g. "Paket Standar"
  name: string; // e.g. "Tier Bronze"
  priceRange: string; // e.g. "Rp 15k–25k"
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ServicePackage {
  id: "layout-buku" | "presentasi" | "poster";
  number: string;
  tabLabel: string;
  title: string;
  summary: string;
  formatChip: string;
  unit: string; // e.g. "/hal"
  unitLabel: string; // human readable, e.g. "per halaman"
  tiers: PackageTier[];
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "layout-buku",
    number: "01",
    tabLabel: "Layout & Tata Letak Buku",
    title: "Layout & Tata Letak Buku",
    summary:
      "Perancangan tipografi, grid hierarki editorial komersial, buku ajar, novel & monograf.",
    formatChip: "InDesign / PDF Print Ready",
    unit: "/hal",
    unitLabel: "per halaman",
    tiers: [
      {
        id: "bronze",
        label: "Paket Standar",
        name: "Tier Bronze",
        priceRange: "Rp 15k-25k",
        description:
          "Cocok untuk naskah teks dominan, novel sastra, kumpulan puisi, atau buku saku.",
        features: [
          "1 Konsep Master Grid",
          "2x Revisi Editorial",
          "Pengerjaan: 5–7 Hari Kerja",
          "Output: PDF High-Res Cetak",
        ],
      },
      {
        id: "silver",
        label: "Paket Editorial",
        name: "Tier Silver",
        priceRange: "Rp 30k-50k",
        description:
          "Ideal untuk buku non-fiksi berilustrasi, modul pelatihan, handbook korporasi, dan biografi.",
        features: [
          "2 Opsi Sample Layout Bab",
          "3x Revisi Mayor + Typo Check",
          "Pengerjaan: 7–12 Hari Kerja",
          "Output: PDF Cetak + ePub + Master ID",
        ],
        popular: true,
      },
      {
        id: "gold",
        label: "Paket Premium",
        name: "Tier Gold",
        priceRange: "Rp 65k-100k",
        description:
          "Untuk buku tahunan korporasi, coffee table book seni, katalog produk mewah & monograf.",
        features: [
          "Custom Grid Modular Khusus",
          "Revisi Fleksibel Hingga Acc Percetakan",
          "Supervisi Format Warna CMYK Percetakan",
          "Output: Master InDesign Komplit + Interactive PDF",
        ],
      },
    ],
  },
  {
    id: "presentasi",
    number: "02",
    tabLabel: "Presentasi & Pitch Deck",
    title: "Presentasi & Pitch Deck",
    summary:
      "Dek presentasi untuk pitch investor, laporan manajemen, seminar, dan materi pelatihan korporat.",
    formatChip: "PowerPoint / Keynote / Google Slides",
    unit: "/slide",
    unitLabel: "per slide",
    tiers: [
      {
        id: "bronze",
        label: "Paket Standar",
        name: "Tier Bronze",
        priceRange: "Rp 35k-60k",
        description:
          "Merapikan materi yang sudah ada menjadi dek yang konsisten, bersih, dan mudah dibaca.",
        features: [
          "1 Master Template Slide",
          "2x Revisi Visual",
          "Pengerjaan: 2–4 Hari Kerja",
          "Output: PPTX Editable + PDF",
        ],
      },
      {
        id: "silver",
        label: "Paket Bisnis",
        name: "Tier Silver",
        priceRange: "Rp 75k-120k",
        description:
          "Untuk pitch deck, company profile, dan laporan manajemen dengan grafik & infografis.",
        features: [
          "2 Opsi Konsep Visual",
          "3x Revisi + Penyelarasan Narasi",
          "Pengerjaan: 4–7 Hari Kerja",
          "Output: PPTX / Keynote + Ikon & Chart Custom",
        ],
        popular: true,
      },
      {
        id: "gold",
        label: "Paket Premium",
        name: "Tier Gold",
        priceRange: "Rp 150k-250k",
        description:
          "Dek investor & keynote eksekutif dengan storytelling, visualisasi data kompleks, dan animasi.",
        features: [
          "Struktur Storyline & Copy Polish",
          "Revisi Fleksibel Hingga Final",
          "Animasi Transisi & Speaker Notes",
          "Output: Master Template + Brand Kit Slide",
        ],
      },
    ],
  },
  {
    id: "poster",
    number: "03",
    tabLabel: "Poster & Kampanye Visual",
    title: "Poster & Kampanye Visual",
    summary:
      "Poster acara, key visual kampanye, infografis kebijakan, dan konten media sosial.",
    formatChip: "Illustrator / Photoshop / Print & Digital",
    unit: "/desain",
    unitLabel: "per desain",
    tiers: [
      {
        id: "bronze",
        label: "Paket Standar",
        name: "Tier Bronze",
        priceRange: "Rp 150k-300k",
        description:
          "Poster tunggal untuk acara, pengumuman, atau feed media sosial dengan materi yang sudah siap.",
        features: [
          "1 Konsep Desain",
          "2x Revisi Minor",
          "Pengerjaan: 1–3 Hari Kerja",
          "Output: PNG/JPG + PDF Cetak",
        ],
      },
      {
        id: "silver",
        label: "Paket Kampanye",
        name: "Tier Silver",
        priceRange: "Rp 350k-600k",
        description:
          "Key visual dengan adaptasi multi-format untuk kampanye cetak dan digital yang konsisten.",
        features: [
          "2 Opsi Konsep Key Visual",
          "3x Revisi Mayor",
          "Adaptasi 3 Format (Feed, Story, A3)",
          "Output: File Cetak + Digital + Source",
        ],
        popular: true,
      },
      {
        id: "gold",
        label: "Paket Premium",
        name: "Tier Gold",
        priceRange: "Rp 750k-1,5jt",
        description:
          "Sistem visual kampanye lengkap: seri poster, infografis data, dan aset format besar.",
        features: [
          "Art Direction & Moodboard Kampanye",
          "Revisi Fleksibel Hingga Final",
          "Adaptasi Format Besar (Banner, Roll-Up, Billboard)",
          "Output: Master Vector + Campaign Guideline",
        ],
      },
    ],
  },
];
