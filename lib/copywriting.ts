

import type { PackageTier, ServicePackage } from "@/lib/data/packages";
import type { InstagramPost } from "@/lib/data/instagram-fallback";

/* ============================================================================
 * 1. METADATA SEO & KONTAK UTAMA
 * ============================================================================ */
export const SITE_COPY = {
  name: "Zacreative Studio",
  shortName: "Zacreative",
  titleDefault: "Zacreative - Jasa Desain Layout Buku & Presentasi",
  titleTemplate: "%s | Zacreative",
  description:
    "Jasa desain layout buku, laporan, presentasi, poster infografis, dan kebutuhan desain layout lainnya.",
  twitterDescription:
    "Jasa desain layout buku, laporan, presentasi, poster infografis, dan kebutuhan desain layout lainnya.",
  schemaDescription:
    "Zacreative adalah jasa desain layout buku, laporan, presentasi, poster infografis, dan kebutuhan desain layout lainnya.",
  keywords: [
    "Zacreative",
    "jasa layout buku",
    "layout buku",
    "desain buku",
    "layout laporan",
    "desain laporan tahunan",
    "annual report design",
    "desain presentasi",
    "desain PowerPoint",
    "desain poster",
    "desain infografis",
    "editorial design",
    "visual communication",
  ],
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6282128919491",
    instagramHandle: "zacreative.id",
    instagramUrl: "https://www.instagram.com/zacreative.id",
    linkedinUrl: "",
    email: "hello@zacreative.com",
  },
  defaultWhatsAppMessage:
    "Halo Zacreative, saya ingin berkonsultasi mengenai layanan desain. Boleh dibantu?",
  floatingWhatsApp: {
    label: "Chat WhatsApp",
    ariaLabel: "Chat konsultasi via WhatsApp",
  },
} as const;

/* ============================================================================
 * 2. NAVBAR (MENU ATAS)
 * ============================================================================ */
export const NAVBAR_COPY = {
  logoAlt: "Zacreative",
  links: [
    { label: "Paket", href: "/#paket" },
    { label: "Portofolio", href: "/#portofolio" },
    { label: "Cara Order", href: "/#cara-kerja" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kontak", href: "/#kontak" },
  ],
  ctaLabel: "Chat WhatsApp",
  mobileMenuOpenAria: "Buka Menu",
  mobileMenuCloseAria: "Tutup Menu",
} as const;

/* ============================================================================
 * 3. HERO SECTION (BAGIAN PEMBUKA UTAMA)
 * ============================================================================ */
export const HERO_COPY = {
  heading: "Shaping words into visual works.",
  description:
    "Zacreative adalah jasa desain layout buku, laporan, presentasi, poster infografis, dan kebutuhan desain layout lainnya.",
  primaryCtaLabel: "Konsultasi & Pemesanan",
  secondaryPaketLabel: "Lihat Paket",
  secondaryPortfolioLabel: "Lihat Portofolio",
  onlineStatus: "",
  stats: [
    { value: "50+", label: "Klien Terpuaskan" },
    { value: "150+", label: "Layout Dibuat" },
    { value: "5+", label: "Tahun Berkarya" },
  ],
  /** Teks ilustrasi kartu portofolio di sisi kanan Hero (tampil di layar desktop) */
  showcase: {
    floatingBadge: "PT ANTAM Tbk • 487 Halaman • Selesai 7 Hari",
    posterCard: {
      code: "ZA/26",
      category: "Poster",
      line1: "Type",
      line2: "Sets",
      line3: "Tone.",
    },
    pitchDeckCard: {
      eyebrow: "Series A · Traction",
      growthBadge: "+184% YoY",
      valuation: "$48.2M",
      valuationLabel: "Valuasi pra-pendanaan",
      quarters: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2"],
    },
    bookSpreadCard: {
      chapter: "Bab 03",
      title: "Hilirisasi dan Masa Depan Industri Nikel",
      quote: "“Data yang rapi adalah cara terbaik untuk membangun kepercayaan.”",
      leftPageNumber: "42",
      rightPageNumber: "43",
    },
  },
} as const;

/* ============================================================================
 * 4. TRUST INDICATORS (DAFTAR KLIEN & INSTANSI)
 * ============================================================================ */
export interface TrustClient {
  name: string;
  desc: string;
  logo?: string;
}

export const TRUST_COPY = {
  heading:
    "DIPERCAYA OLEH KEMENTERIAN, LEMBAGA, BUMN, HINGGA PERUSAHAAN SWASTA",
  clients: [
    { name: "Kementerian PUPR", desc: "Instansi Pemerintah RI", logo: "" },
    { name: "PT ANTAM Tbk", desc: "BUMN Pertambangan", logo: "" },
    { name: "KBRI Damaskus", desc: "Korps Diplomatik RI", logo: "" },
    { name: "PT JAKPRO", desc: "BUMD DKI Jakarta", logo: "" },
    { name: "Kemendikbudristek RI", desc: "Ditjen Vokasi", logo: "" },
    { name: "LPDP Kemenkeu", desc: "Lembaga Riset Beasiswa", logo: "" },
    { name: "UGM PSE", desc: "Pusat Studi Energi", logo: "" },
    { name: "Entalphy Consulting", desc: "Konsultan Energi", logo: "" },
    { name: "Ayo Tumbuh", desc: "Edupreneur Consultancy", logo: "" },
    { name: "AI-RECHT", desc: "Riset Teknologi AI", logo: "" },
  ] as TrustClient[],
} as const;

/* ============================================================================
 * 5. PACKAGES SECTION (LAYANAN & TINGKATAN PAKET)
 * ============================================================================ */
export const PACKAGES_COPY = {
  badge: "",
  heading: "Layanan & Pilihan Paket",
  description: "Pilih layanan dan paket sesuai kebutuhan proyek Anda.",
  mobileCategoryNames: {
    "layout-buku": "Layout Buku",
    presentasi: "Presentasi",
    poster: "Poster Infografis",
  } as Record<string, string>,
  labels: {
    formatPrefix: "",
    popularBadge: "★ Paling Populer",
    selectedBadge: "Paket Terpilih",
    tierHeadingPrefix: "",
    priceStartFrom: "Mulai dari",
    chooseTierPrefix: "Pilih",
    prevServiceAria: "Layanan sebelumnya",
    nextServiceAria: "Layanan berikutnya",
  },
  footnote: "",
  customPackageCta: {
    label: "",
    whatsappMessage: "",
  },
  buildTierWhatsAppMessage: (pkg: ServicePackage, tier: PackageTier) =>
    `Halo Zacreative, saya tertarik dengan paket *${pkg.title} – ${tier.name}*. Saya ingin berkonsultasi lebih lanjut mengenai kebutuhan proyek saya.`,
  services: [
    {
      id: "layout-buku",
      number: "01",
      tabLabel: "Layout Buku",
      title: "Layout Buku",
      summary: "",
      formatChip: "",
      unit: "/halaman",
      unitLabel: "per halaman",
      tiers: [
        {
          id: "bronze",
          label: "",
          name: "Paket Bronze",
          priceRange: "Rp5.000",
          description:
            "Desain layout sederhana yang didominasi teks, cocok untuk buku biografi dan kumpulan cerita.",
          features: [
            "1x revisi",
            "Pengerjaan 7-10 hari",
            "Plus desain cover buku Rp300.000",
          ],
        },
        {
          id: "silver",
          label: "",
          name: "Paket Silver",
          priceRange: "Rp15.000",
          description:
            "Desain layout dengan elemen visual dan teks yang seimbang, cocok untuk modul pelatihan, laporan instansi, dan laporan penelitian.",
          features: [
            "3x revisi",
            "Pengerjaan 7-10 hari",
            "Plus desain cover buku Rp300.000",
          ],
        },
        {
          id: "gold",
          label: "",
          name: "Paket Gold",
          priceRange: "Rp25.000",
          description:
            "Desain layout dengan elemen visual dan teks yang seimbang, cocok untuk modul pelatihan, laporan instansi, dan laporan penelitian.",
          features: [
            "Revisi sepuasnya",
            "Pengerjaan 4-7 hari",
            "Custom grafik dan tabel",
            "Plus desain cover buku Rp300.000",
          ],
          popular: true,
        },
        {
          id: "platinum",
          label: "",
          name: "Paket Platinum",
          priceRange: "Rp35.000",
          showPriceStartFrom: true,
          description:
            "Desain layout dinamis dengan elemen visual dan tata letak bervariasi, cocok untuk portofolio, company profile, dan buku yang membutuhkan variasi layout lainnya.",
          features: [
            "Revisi sepuasnya",
            "Pengerjaan 4-7 hari",
            "Custom grafik dan tabel",
            "Plus desain cover buku Rp300.000",
          ],
        },
      ],
    },
    {
      id: "presentasi",
      number: "02",
      tabLabel: "Presentasi",
      title: "Presentasi",
      summary: "",
      formatChip: "",
      unit: "/20 slide",
      unitLabel: "per 20 slide",
      tiers: [
        {
          id: "bronze",
          label: "",
          name: "Paket Bronze",
          priceRange: "Rp300.000",
          description:
            "Desain presentasi sederhana berbasis teks dengan sedikit elemen visual.",
          features: [
            "1x revisi",
            "Pengerjaan 7-10 hari",
            "Mengubah teks Word ke format PPT+5k/slide",
          ],
        },
        {
          id: "silver",
          label: "",
          name: "Paket Silver",
          priceRange: "Rp500.000",
          description:
            "Desain presentasi standar dengan elemen visual dan teks yang seimbang.",
          features: [
            "3x revisi",
            "Pengerjaan 5-7 hari",
            "Custom grafik dan tabel",
            "Mengubah teks Word ke format PPT+5k/slide",
          ],
        },
        {
          id: "gold",
          label: "",
          name: "Paket Gold",
          priceRange: "Rp700.000",
          showPriceStartFrom: true,
          description:
            "Desain dinamis dengan elemen visual dan tata letak yang bervariasi.",
          features: [
            "Revisi sepuasnya",
            "Pengerjaan 3-5 hari",
            "Custom grafik dan tabel",
            "Mengubah teks Word ke format PPT+5k/slide",
          ],
          popular: true,
        },
      ],
    },
    {
      id: "poster",
      number: "03",
      tabLabel: "Poster Infografis",
      title: "Poster Infografis",
      summary: "",
      formatChip: "",
      unit: "/desain",
      unitLabel: "per desain",
      tiers: [
        {
          id: "bronze",
          label: "",
          name: "Paket Bronze",
          priceRange: "Rp300.000",
          description:
            "Desain sederhana untuk poster promosi dan poster kegiatan.",
          features: [
            "Materi singkat (<50 kata)",
            "1x revisi",
            "Pengerjaan 7-10 hari",
          ],
        },
        {
          id: "silver",
          label: "",
          name: "Paket Silver",
          priceRange: "Rp500.000",
          description:
            "Desain standar untuk poster promosi produk dan poster kampanye instansi.",
          features: [
            "Materi standar (<100 kata)",
            "3x revisi",
            "Pengerjaan 5-7 hari",
            "Custom ilustrasi",
          ],
        },
        {
          id: "gold",
          label: "",
          name: "Paket Gold",
          priceRange: "Rp700.000",
          showPriceStartFrom: true,
          description:
            "Desain dinamis untuk poster penelitian, infografis, dan poster perlombaan.",
          features: [
            "Materi padat (<250 kata)",
            "Revisi sepuasnya",
            "Pengerjaan 3-5 hari",
            "Custom ilustrasi",
          ],
          popular: true,
        },
      ],
    },
  ] satisfies ServicePackage[],
};

/* ============================================================================
 * 6. PORTFOLIO SECTION (PORTOFOLIO INSTAGRAM — MAKSIMAL 6 KARYA)
 * ============================================================================ */
export const PORTFOLIO_COPY = {
  maxItems: 6,
  badge: "[PORTOFOLIO]",
  heading: "Karya Terbaru Zacreative",
  description:
    "Cuplikan publikasi buku, pitch deck, dan kampanye visual terbaru yang kami sinkronkan langsung dari Instagram resmi ZaCreative.",
  followButtonPrefix: "Follow",
  feedUi: {
    singlePostLabel: "Single Post",
    instagramLinkLabel: "Instagram",
    openInInstagramLabel: "Buka di Instagram",
    carouselBadgeSuffix: "Slides",
    carouselBadgeFallback: "Carousel",
    reelsBadgeLabel: "Reels",
    emptyTitle: "Feed Sedang Disinkronkan",
    emptyDescription:
      "Postingan Instagram terbaru akan muncul otomatis melalui sinkronisasi harian Vercel Cron. Kunjungi akun resmi kami untuk melihat karya selengkapnya.",
    emptyCtaPrefix: "Kunjungi",
  },
  fallbackPosts: [
    {
      id: "ig-fallback-01",
      caption:
        "Penyusunan 2 volume Buku Putih Kebijakan Strategis (487 hal) siap cetak offset standar FOGRA39.",
      mediaType: "CAROUSEL_ALBUM",
      imageUrl: "/images/assets/asset_7.webp",
      permalink: SITE_COPY.contact.instagramUrl,
      timestamp: "2026-10-18T09:00:00Z",
      categoryTag: "Desain Layout Buku",
      footnote: "PT ANTAM Tbk × UGM • 487 Hal",
      slides: [
        { id: "s-01-1", type: "IMAGE", url: "/images/assets/asset_7.webp" },
        { id: "s-01-2", type: "IMAGE", url: "/images/assets/asset_8.webp" },
        { id: "s-01-3", type: "IMAGE", url: "/images/assets/asset_6.webp" },
      ],
    },
    {
      id: "ig-fallback-02",
      caption:
        "Sistem grid editorial 12-kolom & hierarki tipografi publikasi riset energi nasional.",
      mediaType: "CAROUSEL_ALBUM",
      imageUrl: "/images/assets/asset_8.webp",
      permalink: SITE_COPY.contact.instagramUrl,
      timestamp: "2026-10-12T11:30:00Z",
      categoryTag: "Desain Layout Buku",
      footnote: "Publikasi Riset Nasional • 2026",
      slides: [
        { id: "s-02-1", type: "IMAGE", url: "/images/assets/asset_8.webp" },
        { id: "s-02-2", type: "IMAGE", url: "/images/assets/asset_9.webp" },
      ],
    },
    {
      id: "ig-fallback-03",
      caption:
        "Memori Akhir Tugas & Profil Sekretariat Jenderal (343 hal) dengan infografis data spasial.",
      mediaType: "CAROUSEL_ALBUM",
      imageUrl: "/images/assets/asset_6.webp",
      permalink: SITE_COPY.contact.instagramUrl,
      timestamp: "2026-10-04T08:15:00Z",
      categoryTag: "Desain Layout Buku",
      footnote: "Kementerian PUPR • 343 Hal",
      slides: [
        { id: "s-03-1", type: "IMAGE", url: "/images/assets/asset_6.webp" },
        { id: "s-03-2", type: "IMAGE", url: "/images/assets/asset_5.webp" },
        { id: "s-03-3", type: "IMAGE", url: "/images/assets/asset_7.webp" },
      ],
    },
    {
      id: "ig-fallback-04",
      caption:
        "Pitch Deck & Financial Model Series A — visualisasi unit economics dan peta pasar 16:9 widescreen.",
      mediaType: "CAROUSEL_ALBUM",
      imageUrl: "/images/assets/asset_3.webp",
      permalink: SITE_COPY.contact.instagramUrl,
      timestamp: "2026-09-27T14:00:00Z",
      categoryTag: "Desain PPT",
      footnote: "Series A Pitch Deck • 32 Slide",
      slides: [
        { id: "s-04-1", type: "IMAGE", url: "/images/assets/asset_3.webp" },
        { id: "s-04-2", type: "IMAGE", url: "/images/assets/asset_4.webp" },
      ],
    },
    {
      id: "ig-fallback-05",
      caption:
        "Key Visual & Poster Kampanye Pameran Arsitektur Nusantara format cetak A1 dan adaptasi media sosial.",
      mediaType: "IMAGE",
      imageUrl: "/images/assets/asset_2.webp",
      permalink: SITE_COPY.contact.instagramUrl,
      timestamp: "2026-09-19T10:20:00Z",
      categoryTag: "Desain Poster",
      footnote: "Kampanye Pameran • Print & IG",
      slides: [{ id: "s-05-1", type: "IMAGE", url: "/images/assets/asset_2.webp" }],
    },
    {
      id: "ig-fallback-06",
      caption:
        "Executive Presentation & ESG Highlights Deck berstandar GRI & OJK untuk paparan RUPS tahunan.",
      mediaType: "CAROUSEL_ALBUM",
      imageUrl: "/images/assets/asset_5.webp",
      permalink: SITE_COPY.contact.instagramUrl,
      timestamp: "2026-09-10T13:45:00Z",
      categoryTag: "Desain PPT",
      footnote: "RUPS & ESG Deck • 45 Slide",
      slides: [
        { id: "s-06-1", type: "IMAGE", url: "/images/assets/asset_5.webp" },
        { id: "s-06-2", type: "IMAGE", url: "/images/assets/asset_6.webp" },
      ],
    },
  ] satisfies InstagramPost[],
};

/* ============================================================================
 * 7. PROCESS SECTION (CARA KERJA STUDIO)
 * ============================================================================ */
export const PROCESS_COPY = {
  badge: "",
  heading: "Cara Order di Zacreative",
  description:
    "Mulai dari konsultasi melalui WhatsApp hingga desain final diterima, berikut tahapan pemesanan layanan Zacreative.",
  deliverablePrefix: "",
  steps: [
    {
      num: "01",
      title: "Konsultasi & Pemilihan Paket",
      summary:
        "Hubungi kami melalui WhatsApp, konsultasikan kebutuhan desain, lalu pilih layanan dan paket yang sesuai.",
      details:
        "Diskusikan jenis pekerjaan, jumlah halaman/slide/desain, serta kebutuhan proyek. Zacreative membantu mengarahkan pilihan layanan dan paket sesuai kebutuhan.",
      deliverable: "",
    },
    {
      num: "02",
      title: "Isi Formulir Pemesanan",
      summary: "Lengkapi formulir pemesanan setelah layanan dan paket disepakati.",
      details:
        "Isi formulir pemesanan dengan informasi kebutuhan proyek dan materi yang diperlukan agar pekerjaan dapat dimulai sesuai brief.",
      deliverable: "",
    },
    {
      num: "03",
      title: "Pembayaran DP & Pembuatan Sample",
      summary:
        "Lakukan pembayaran uang muka (DP) dan kami akan membuatkan sample desain.",
      details:
        "Proses pembuatan sample dimulai setelah pembayaran DP dikonfirmasi. Pembuatan sample estimasi 3 hari di luar durasi pengerjaan proyek.",
      deliverable: "",
    },
    {
      num: "04",
      title: "Proses Desain, Review, & Revisi",
      summary:
        "Kami mulai mengerjakan desain, kemudian Anda dapat melakukan review dan revisi.",
      details:
        "Proses desain mengikuti sample yang disepakati. Klien dapat memberikan masukan dan revisi sesuai ketentuan paket. Periode review dan revisi berlangsung hingga 30 hari.",
      deliverable: "",
    },
    {
      num: "05",
      title: "Pengiriman Desain Final & Pelunasan",
      summary:
        "Desain final dikirimkan, kemudian klien melakukan pelunasan pembayaran.",
      details:
        "Setelah proses review dan revisi selesai, Zacreative mengirimkan desain final. Pelunasan pembayaran dilakukan setelah pengiriman desain final.",
      deliverable: "",
    },
  ],
} as const;

/* ============================================================================
 * 8. FAQ / QnA SECTION (TANYA JAWAB UMUM & KARTU WHATSAPP)
 * ============================================================================ */
export const FAQ_COPY = {
  badge: "[TANYA JAWAB UMUM]",
  heading: "Pertanyaan yang Sering Diajukan",
  description:
    "Informasi transparan mengenai standar pengerjaan, perjanjian kerahasiaan, berkas master, dan alur teknis percetakan kami.",
  whatsappBox: {
    badge: "Fast Response (WhatsApp)",
    heading: "Punya pertanyaan spesifik terkait naskah Anda?",
    description:
      "Tim lead desainer kami siap berdiskusi secara instan dan memberikan estimasi awal dalam hitungan jam.",
    ctaLabel: "Konsultasi Instan via WhatsApp",
    whatsappMessage:
      "Halo ZaCreative, saya ingin menanyakan detail pengerjaan untuk proyek/naskah saya. Boleh dibantu?",
  },
  items: [
    {
      q: "Berapa lama waktu pengerjaan standar untuk satu buku?",
      a: "Waktu pengerjaan standar berkisar antara 1–4 minggu, mulai dari pemesanan hingga finalisasi. Durasi pengerjaan dapat menyesuaikan jumlah halaman, kompleksitas materi, dan kebutuhan proyek. Timeline juga dapat didiskusikan dan disepakati pada konsultasi awal.",
    },
    {
      q: "Apakah Zacreative bersedia menandatangani NDA kerahasiaan sebelum proyek dimulai?",
      a: "Ya, tentu saja. Kami memahami pentingnya menjaga kerahasiaan dokumen dan informasi klien, terutama untuk proyek yang melibatkan materi belum dipublikasikan. Zacreative bersedia menandatangani perjanjian kerahasiaan (NDA) sebelum dokumen atau draft naskah dibagikan.",
    },
    {
      q: "Bagaimana ketentuan revisi untuk setiap paket?",
      a: "Setiap paket memiliki ketentuan revisi yang berbeda. Paket Platinum dan Gold mendapatkan revisi tanpa batas, paket Silver mendapatkan 3 kali revisi, sedangkan paket Bronze mendapatkan 1 kali revisi. Periode review dan revisi berlaku maksimal 30 hari.",
    },
    {
      q: "Apakah ada biaya tambahan untuk layanan tertentu?",
      a: "Ya, beberapa layanan memiliki biaya tambahan sesuai kebutuhan proyek. Untuk layanan layout buku, desain cover dikenakan biaya Rp300.000. Sementara itu, untuk presentasi yang materinya masih berupa dokumen Word dan perlu dikonversi ke format PowerPoint, terdapat biaya tambahan sebesar Rp5.000 per slide. Kebutuhan lain di luar cakupan paket dapat dikonsultasikan terlebih dahulu sebelum proyek dimulai.",
    },
    {
      q: "Apakah draft harus sudah final sebelum proses layout dimulai?",
      a: "Tidak harus. Kami tetap dapat menerima draft yang belum final untuk keperluan konsultasi dan pembuatan sample desain. Namun, sebelum proses pengerjaan keseluruhan draft dimulai, kami menyarankan agar draft sudah final untuk menghindari perubahan substansial selama proses layout berlangsung. Perubahan materi setelah proses desain berjalan dapat memengaruhi durasi pengerjaan dan kebutuhan revisi.",
    },
  ],
} as const;

/* ============================================================================
 * 9. FOOTER (BAGIAN BAWAH HALAMAN)
 * ============================================================================ */
export const FOOTER_COPY = {
  logoAlt: "Zacreative",
  brandDescription:
    "Jasa desain layout buku, laporan, presentasi, poster infografis, dan kebutuhan desain layout lainnya.",
  navigationTitle: "Navigasi",
  navigationLinks: [
    { label: "Paket & Harga", href: "/#paket" },
    { label: "Portofolio", href: "/#portofolio" },
    { label: "Cara Order", href: "/#cara-kerja" },
    { label: "FAQ", href: "/#faq" },
  ],
  contactTitle: "Hubungi Kami",
  contactDescription: "",
  whatsappCtaLabel: "Konsultasi via WhatsApp",
  copyright: "© 2026 Zacreative. All rights reserved.",
  locationTag: "[Jakarta, ID]",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
} as const;
