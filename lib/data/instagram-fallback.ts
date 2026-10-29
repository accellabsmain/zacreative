import { CONTACT } from "@/lib/constants";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export interface InstagramPost {
  id: string;
  caption: string;
  mediaType: InstagramMediaType;
  imageUrl: string;
  permalink: string;
  timestamp: string;
  categoryTag?: string;
}

/**
 * Local fallback posts displayed when INSTAGRAM_ACCESS_TOKEN is not yet configured
 * or when the Instagram Graph API is temporarily unreachable.
 */
export const INSTAGRAM_FALLBACK_POSTS: InstagramPost[] = [
  {
    id: "ig-fallback-01",
    caption:
      "PT ANTAM Tbk × Pusat Studi Energi UGM — Penyusunan 2 volume Buku Putih Kebijakan Strategis (487 halaman) dalam sprint 7 hari kerja, siap cetak offset standar FOGRA39.",
    mediaType: "CAROUSEL_ALBUM",
    imageUrl: "/images/assets/asset_7.webp",
    permalink: CONTACT.instagramUrl,
    timestamp: "2026-10-18T09:00:00Z",
    categoryTag: "Layout Buku",
  },
  {
    id: "ig-fallback-02",
    caption:
      "Sistem grid editorial 12-kolom dan hierarki tipografi bab pembuka untuk publikasi riset energi dan hilirisasi mineral nasional.",
    mediaType: "CAROUSEL_ALBUM",
    imageUrl: "/images/assets/asset_8.webp",
    permalink: CONTACT.instagramUrl,
    timestamp: "2026-10-12T11:30:00Z",
    categoryTag: "Editorial Grid",
  },
  {
    id: "ig-fallback-03",
    caption:
      "Kementerian PUPR — Memori Akhir Tugas & Profil Sekretariat Jenderal (343 halaman). Dokumentasi 10 tahun infrastruktur nasional dengan infografis data spasial.",
    mediaType: "CAROUSEL_ALBUM",
    imageUrl: "/images/assets/asset_6.webp",
    permalink: CONTACT.instagramUrl,
    timestamp: "2026-10-04T08:15:00Z",
    categoryTag: "Publikasi Instansi",
  },
  {
    id: "ig-fallback-04",
    caption:
      "Pitch Deck & Financial Model Series A — Visualisasi unit economics, peta pasar TAM/SAM/SOM, dan alur cerita eksekutif berformat 16:9 widescreen.",
    mediaType: "CAROUSEL_ALBUM",
    imageUrl: "/images/assets/asset_3.webp",
    permalink: CONTACT.instagramUrl,
    timestamp: "2026-09-27T14:00:00Z",
    categoryTag: "Pitch Deck",
  },
  {
    id: "ig-fallback-05",
    caption:
      "Antologi Arsitektur & Budaya Nusantara — Tata letak dwibahasa (ID/EN) hardcover dengan kurasi 180 fotografi dokumenter dan indeks teknis.",
    mediaType: "IMAGE",
    imageUrl: "/images/assets/asset_2.webp",
    permalink: CONTACT.instagramUrl,
    timestamp: "2026-09-19T10:20:00Z",
    categoryTag: "Coffee Table Book",
  },
  {
    id: "ig-fallback-06",
    caption:
      "Sustainability & ESG Governance Report — Integrasi 45 matriks materialitas, bagan tata kelola, dan pelaporan keberlanjutan berstandar GRI & OJK.",
    mediaType: "CAROUSEL_ALBUM",
    imageUrl: "/images/assets/asset_5.webp",
    permalink: CONTACT.instagramUrl,
    timestamp: "2026-09-10T13:45:00Z",
    categoryTag: "Annual Report",
  },
  {
    id: "ig-fallback-07",
    caption:
      "Buku Standar Identitas & Pedoman Komunikasi Visual — Sistem kisi logo, palet warna cetak/digital, serta template publikasi institusional.",
    mediaType: "VIDEO",
    imageUrl: "/images/assets/asset_4.webp",
    permalink: CONTACT.instagramUrl,
    timestamp: "2026-09-02T16:10:00Z",
    categoryTag: "Reels Preview",
  },
  {
    id: "ig-fallback-08",
    caption:
      "Detail ritme baca paragraf panjang, tabel teknis padat angka, dan spesifikasi pra-cetak pada publikasi monograf akademik.",
    mediaType: "IMAGE",
    imageUrl: "/images/assets/asset_9.webp",
    permalink: CONTACT.instagramUrl,
    timestamp: "2026-08-25T09:30:00Z",
    categoryTag: "Tipografi",
  },
];

