/**
 * ============================================================================
 * PUSAT COPYWRITING ZACREATIVE STUDIO
 * ============================================================================
 * File ini berisi seluruh teks (copywriting) yang tampil di halaman website,
 * disusun berurutan dari bagian paling atas hingga paling bawah:
 *
 *   1. SITE_COPY      — Metadata SEO, Judul Tab Browser & Kontak Utama
 *   2. NAVBAR_COPY    — Navigasi Header Atas & Tombol Chat
 *   3. HERO_COPY      — Bagian Utama Atas (Headline, Subheadline, CTA & Statistik)
 *   4. TRUST_COPY     — Daftar Instansi & Klien Kepercayaan (Marquee)
 *   5. PACKAGES_COPY  — Katalog Layanan & Paket Harga (Bronze, Silver, Gold)
 *   6. PORTFOLIO_COPY — Bagian Portofolio Instagram & Data Karya Cadangan
 *   7. PROCESS_COPY   — Bagian 5 Tahap Alur Kerja Studio
 *   8. FAQ_COPY       — Bagian Tanya Jawab (QnA) & Kartu Konsultasi WhatsApp
 *   9. FOOTER_COPY    — Bagian Kaki Halaman (Deskripsi, Navigasi, Kontak & Hak Cipta)
 *
 * Cara mengubah teks:
 * Cukup ubah teks di dalam tanda kutip ("...") pada bagian yang diinginkan,
 * lalu simpan file ini. Tampilan website akan otomatis menyesuaikan.
 * ============================================================================
 */

import type { PackageTier, ServicePackage } from "@/lib/data/packages";
import type { InstagramPost } from "@/lib/data/instagram-fallback";

/* ============================================================================
 * 1. METADATA SEO & KONTAK UTAMA
 * ============================================================================ */
export const SITE_COPY = {
  name: "ZaCreative Studio",
  shortName: "Zacreative",
  titleDefault: "Zacreative — Editorial & Technical Design Studio",
  titleTemplate: "%s | Zacreative Studio",
  description:
    "Visual solutions for high-impact publications, corporate whitepapers, investor pitch decks, and data-dense annual reports with architectural precision.",
  twitterDescription:
    "Visual solutions for high-impact publications, corporate whitepapers, investor pitch decks, and data-dense annual reports.",
  schemaDescription:
    "Studio desain visual spesialis layout buku, presentasi strategis pitch deck, dan materi visual kampanye dengan standar editorial profesional.",
  keywords: [
    "Zacreative",
    "Studio Desain Editorial",
    "Layout Buku",
    "Pitch Deck Eksekutif",
    "Desain Laporan Tahunan",
    "Buku Putih Kebijakan",
    "Modern Editorial Tech",
    "Annual Report Design Jakarta",
  ],
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6282128919491",
    instagramHandle: "zacreative.id",
    instagramUrl: "https://www.instagram.com/zacreative.id",
    linkedinUrl: "https://www.linkedin.com/company/zacreative",
    email: "hello@zacreative.com",
  },
  defaultWhatsAppMessage:
    "Halo ZaCreative, saya ingin konsultasi dan pemesanan layanan desain. Boleh dibantu?",
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
    { label: "Cara Kerja", href: "/#cara-kerja" },
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
  heading:
    "Publikasi dan presentasi yang dirancang untuk dibaca, dipahami, dan dipercaya.",
  description:
    "Kami mentransformasi laporan korporat, pitch deck investor, dan visual poster menjadi aset strategis berstandar dunia.",
  primaryCtaLabel: "Konsultasi & Pemesanan",
  secondaryPaketLabel: "Lihat Paket",
  secondaryPortfolioLabel: "Lihat Portofolio",
  onlineStatus:
    "Online via WhatsApp — konsultasi gratis, respon cepat di jam kerja",
  stats: [
    { value: "50+", label: "Publikasi" },
    { value: "100%", label: "Tepat Waktu" },
    { value: "4.9/5", label: "Kepuasan Klien" },
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
export const TRUST_COPY = {
  heading: "DIPERCAYA OLEH KEMENTERIAN, BUMN, DAN INSTITUSI RISET STRATEGIS",
  clients: [
    { name: "Kementerian PUPR", desc: "Instansi Pemerintah RI" },
    { name: "PT ANTAM Tbk", desc: "BUMN Pertambangan" },
    { name: "KBRI Damaskus", desc: "Korps Diplomatik RI" },
    { name: "PT JAKPRO", desc: "BUMD DKI Jakarta" },
    { name: "Kemendikbudristek RI", desc: "Ditjen Vokasi" },
    { name: "LPDP Kemenkeu", desc: "Lembaga Riset Beasiswa" },
    { name: "UGM PSE", desc: "Pusat Studi Energi" },
    { name: "Entalphy Consulting", desc: "Konsultan Energi" },
    { name: "Ayo Tumbuh", desc: "Edupreneur Consultancy" },
    { name: "AI-RECHT", desc: "Riset Teknologi AI" },
  ],
} as const;

/* ============================================================================
 * 5. PACKAGES SECTION (LAYANAN & TINGKATAN PAKET)
 * ============================================================================ */
export const PACKAGES_COPY = {
  badge: "[KATALOG & PAKET LAYANAN]",
  heading: "Layanan & Tingkatan Paket",
  description:
    "Pilih layanan, lalu bandingkan opsi tier Bronze, Silver, dan Gold sesuai kebutuhan proyek Anda.",
  mobileCategoryNames: {
    "layout-buku": "Desain Buku",
    presentasi: "Pitch Deck",
    poster: "Poster Visual",
  } as Record<string, string>,
  labels: {
    formatPrefix: "Format:",
    popularBadge: "★ Paling Populer",
    selectedBadge: "Paket Terpilih",
    tierHeadingPrefix: "Tier",
    priceStartFrom: "Mulai dari",
    chooseTierPrefix: "Pilih",
    prevServiceAria: "Layanan sebelumnya",
    nextServiceAria: "Layanan berikutnya",
  },
  footnote:
    "* Harga final menyesuaikan jumlah halaman/slide, kompleksitas, dan tenggat waktu.",
  customPackageCta: {
    label: "Butuh paket custom? Diskusikan via WhatsApp",
    whatsappMessage:
      "Halo ZaCreative, saya butuh paket custom di luar pilihan yang tersedia. Boleh diskusi?",
  },
  buildTierWhatsAppMessage: (pkg: ServicePackage, tier: PackageTier) =>
    `Halo ZaCreative, saya tertarik dengan paket *${pkg.title} – ${tier.name}* (mulai ${tier.priceRange}${pkg.unit}). Boleh info lebih lanjut untuk proyek saya?`,
  services: [
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
  ] satisfies ServicePackage[],
};

/* ============================================================================
 * 6. PORTFOLIO SECTION (PORTOFOLIO INSTAGRAM — MAKSIMAL 6 KARYA)
 * ============================================================================ */
export const PORTFOLIO_COPY = {
  maxItems: 6,
  badge: "[PORTOFOLIO]",
  heading: "Karya Terbaru dari Instagram",
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
  badge: "[ALUR KERJA STUDIO]",
  heading: "Proses Kolaborasi Terstruktur Tanpa Friksi",
  description:
    "Dari naskah mentah hingga dokumen siap cetak dan rilis digital, setiap fase dikelola dengan milestone transparan dan kepatuhan tenggat waktu ketat.",
  deliverablePrefix: "Output Milestone:",
  steps: [
    {
      num: "01",
      title: "Konsultasi & Pemilihan Paket",
      summary: "Eksplorasi kebutuhan naskah, volume halaman, dan penetapan format output.",
      details:
        "Menelaah tujuan proyek, jenis naskah mentah, estimasi ketebalan halaman, dan jadwal rilis yang Anda targetkan. Kami memberikan rekomendasi paket paling efisien.",
      deliverable: "Rekomendasi Paket & Estimasi Biaya",
    },
    {
      num: "02",
      title: "Pengisian Formulir Brief Naskah",
      summary: "Pengiriman materi konten, dokumen teks final, dan panduan identitas.",
      details:
        "Pengiriman manuskrip final, materi grafis pendukung, pedoman merek (brand guidelines), dan referensi visual yang diinginkan melalui formulir brief terstruktur.",
      deliverable: "Brief Dokumen Terkonfirmasi",
    },
    {
      num: "03",
      title: "Pembayaran DP & Penjadwalan Milestone",
      summary: "Aktivasi proyek dan penguncian jadwal sprint tim desainer.",
      details:
        "Pembayaran uang muka komitmen kerja (50%) dan penerbitan jadwal kerja resmi (work breakdown schedule) dengan tanggal review dan tenggat serah terima pasti.",
      deliverable: "Project Roadmap & Timeline Lock",
    },
    {
      num: "04",
      title: "Proses Desain & Putaran Revisi",
      summary: "Penyusunan tata letak dalam kisi modular dan evaluasi berkala.",
      details:
        "Penataan layout dalam master grid, penyerahan preview draft parsial (bab kunci / sampel slide), dan pelaksanaan revisi terstruktur sesuai batas paket yang disepakati.",
      deliverable: "Draft Review & Feedback Iteration",
    },
    {
      num: "05",
      title: "Finalisasi & Serah Terima Master File",
      summary: "Pemeriksaan pre-flight percetakan dan pengiriman berkas lengkap.",
      details:
        "Pelunasan pembayaran sisa, pengecekan akhir pre-flight percetakan (overprint, bleed, color profile), dan pengiriman berkas master (.INDD, PDF cetak offset, arsip aset).",
      deliverable: "Production-Ready Package + InDesign Master",
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
      a: "Waktu pengerjaan standar berkisar antara 2 hingga 4 minggu untuk buku tebal (200-400 halaman). Namun untuk naskah mendesak (seperti buku putih kebijakan kementerian atau laporan tahunan RUPS), kami menyediakan alur Sprint Turnaround 7-10 hari kerja dengan penugasan 2 lead desainer khusus.",
    },
    {
      q: "Apakah Zacreative bersedia menandatangani NDA kerahasiaan sebelum proyek dimulai?",
      a: "Ya, tentu saja. Sebagian besar klien kami adalah instansi kementerian, BUMN, dan firma modal ventura yang menangani data rahasia pra-rilis. Kami siap menandatangani Non-Disclosure Agreement (NDA) sebelum dokumen atau draft naskah dibagikan.",
    },
    {
      q: "Bagaimana jika ada revisi data atau naskah di tengah jalan?",
      a: "Setiap paket mencakup putaran revisi terstruktur (2-3 putaran evaluasi). Kami juga memahami bahwa naskah laporan seringkali mengalami perubahan angka audit di menit-menit akhir, sehingga penyesuaian minor tabel dan angka tetap kami layani tanpa biaya tambahan selama periode draft review.",
    },
    {
      q: "Apakah saya mendapatkan file master InDesign dan font?",
      a: "Ya. Setelah pelunasan, seluruh paket berkas master Adobe InDesign (.INDD), format pertukaran (.IDML), font terpaket rapi, dan aset vektor diagram diserahkan penuh menjadi hak milik instansi Anda.",
    },
    {
      q: "Bagaimana jika proyek kami membutuhkan koordinasi langsung dengan pihak percetakan?",
      a: "Tim kami siap berkoordinasi secara teknis langsung dengan vendor percetakan offset pilihan Anda. Kami melakukan proofing pra-cetak (pre-flight FOGRA39, bleed, crop mark, dan overprint) guna memastikan hasil cetak fisik presisi tanpa kendala.",
    },
  ],
} as const;

/* ============================================================================
 * 9. FOOTER (BAGIAN BAWAH HALAMAN)
 * ============================================================================ */
export const FOOTER_COPY = {
  logoAlt: "Zacreative Studio",
  brandDescription:
    "Studio desain visual spesialis perancangan editorial buku komersial, pitch deck eksekutif investor, dan sistem komunikasi visual berstandar presisi tinggi.",
  navigationTitle: "Navigasi",
  navigationLinks: [
    { label: "Paket & Harga", href: "/#paket" },
    { label: "Portofolio Instagram", href: "/#portofolio" },
    { label: "Alur Kerja Sama", href: "/#cara-kerja" },
    { label: "Tanya Jawab (FAQ)", href: "/#faq" },
    { label: "Kontak & WhatsApp", href: "/#kontak" },
  ],
  contactTitle: "Kontak & Konsultasi",
  contactDescription:
    "Siap mewujudkan narasi visual yang berbobot untuk brand Anda? Diskusikan brief proyek kapan saja bersama tim kami.",
  whatsappCtaLabel: "Chat Konsultasi Cepat via WhatsApp",
  copyright: "© 2025 ZaCreative Studio. All rights reserved.",
  locationTag: "[Jakarta, ID]",
  legalLinks: [
    { label: "[Privacy Policy]", href: "#faq" },
    { label: "[Terms of Service]", href: "#faq" },
  ],
} as const;
