export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceNumber: number;
  description: string;
  turnaround: string;
  revisions: string;
  features: string[];
  popular?: boolean;
}

export interface ProductSpecification {
  gridSystem: string;
  typography: string;
  colorProfile: string;
  resolution: string;
  formatOutput: string[];
  sourceFiles: string[];
  licensing: string;
}

export interface SpecCarouselSlide {
  step: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  stitchScreenId?: string;
  title: string;
  shortTitle: string;
  clientTag: string;
  clientName: string;
  category: "editorial" | "presentation" | "campaign";
  categoryLabel: string;
  badge?: string;
  scope: string;
  priceFormatted: string;
  priceStartingNumber: number;
  turnaround: string;
  rating: number;
  reviewCount: number;
  summary: string;
  fullDescription: string;
  image: string;
  formatBadge: string;
  deliverables: string[];
  specifications: ProductSpecification;
  pricingTiers: PricingTier[];
  tags: string[];
  specCarousel?: SpecCarouselSlide[];
  workflow: {
    step: string;
    title: string;
    description: string;
  }[];
  caseStudy: {
    client: string;
    metrics: string;
    quote: string;
    author: string;
  };
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "pt-antam-tbk-x-ugm-pse-buku-putih-cga-tayan-feronikel-haltim",
    slug: "pt-antam-tbk-x-ugm-pse-buku-putih-cga-tayan-feronikel-haltim",
    stitchScreenId: "db02955a08b5455899fd9ec15902912d",
    title: "PT ANTAM Tbk x UGM PSE — Buku Putih CGA Tayan & Feronikel Haltim",
    shortTitle: "PT ANTAM Tbk — Buku Putih",
    clientTag: "UGM PSE × ANTAM",
    clientName: "PT Aneka Tambang Tbk & Pusat Studi Energi UGM",
    category: "editorial",
    categoryLabel: "Book Layout",
    badge: "Studi Kasus Unggulan",
    scope: "2 Buku • 487 Hal",
    priceFormatted: "Mulai Rp 18.000.000",
    priceStartingNumber: 18000000,
    turnaround: "7 Hari (Sprint Turnaround)",
    rating: 5.0,
    reviewCount: 34,
    image: "/images/assets/asset_7.webp",
    formatBadge: "Sprint 7 Hari (INDD + PDF)",
    summary:
      "Penyusunan tata letak buku putih strategis CGA Tayan & Feronikel Haltim setebal 487 halaman dalam 2 volume berstandar cetak offset presisi tinggi dalam tenggat waktu 7 hari kerja bersama Pusat Studi Energi UGM.",
    fullDescription:
      "Kolaborasi strategis bersama PT Aneka Tambang Tbk (ANTAM) dan Pusat Studi Energi UGM untuk menyusun dua volume Buku Putih Kebijakan Strategis mengenai komoditas Chemical Grade Alumina (CGA) Tayan dan Feronikel Halmahera Timur. Proyek ini memadukan data kajian teknis, proyeksi ekonomi, dan narasi kebijakan nasional dalam standar publikasi institusional berpresisi tinggi.",
    specCarousel: [
      {
        step: "01",
        title: "Cover Depan & Spine",
        subtitle: "Foil Deboss Emas & Linen",
        image: "/images/assets/asset_7.webp",
      },
      {
        step: "02",
        title: "Pembuka Bab & Grid",
        subtitle: "Sistem Kolom Editorial",
        image: "/images/assets/asset_8.webp",
      },
      {
        step: "03",
        title: "Tipografi Esai Inti",
        subtitle: "Ritme Baca Paragraf Panjang",
        image: "/images/assets/asset_9.webp",
      },
      {
        step: "04",
        title: "Kolofon & Catatan Cetak",
        subtitle: "Spesifikasi Kertas & Tinta",
        image: "/images/assets/asset_10.webp",
      },
    ],
    deliverables: [
      "Master Adobe InDesign (.INDD) + File Cadangan IDML",
      "Print-Ready High-Res PDF/X-1a (FOGRA39, Bleed 3mm)",
      "Structured Data Tables & Infographics Vector",
      "Panduan Gaya Tipografi & Ringkasan Eksekutif",
    ],
    specifications: {
      gridSystem: "Sistem Kolom Editorial 12-Kolom dengan Golden Ratio Margin",
      typography: "Bespoke Editorial Serif + Modern Technical Grotesk Pairing",
      colorProfile: "FOGRA39 Offset Presisi (CMYK) & Digital Display",
      resolution: "300 DPI Vector-Raster Pre-flight Checked",
      formatOutput: ["Print-Ready PDF/X-1a", "Interactive Screen PDF", "Vector SVG"],
      sourceFiles: ["Adobe InDesign (.indd)", "IDML", "Illustrator Charts"],
      licensing: "Hak Cipta Institusional Penuh & Bebas Distribusi",
    },
    pricingTiers: [
      {
        id: "sprint_7days",
        name: "Sprint Turnaround (7-10 Hari)",
        price: "Rp 18.000.000",
        priceNumber: 18000000,
        description: "Alur pengerjaan kilat intensif untuk publikasi kementerian/korporasi mendesak.",
        turnaround: "7 – 10 Hari Kerja",
        revisions: "Revisi harian langsung via lead designer",
        popular: true,
        features: [
          "Format 200 – 500 halaman naskah",
          "Dedicated 2 designer lead",
          "Konversi 50+ tabel neraca teknis",
          "Pre-flight offset checking FOGRA39",
        ],
      },
      {
        id: "standard_corporate",
        name: "Standard Corporate Publication",
        price: "Rp 12.000.000",
        priceNumber: 12000000,
        description: "Jadwal reguler 3-4 minggu dengan 3 putaran revisi komprehensif.",
        turnaround: "3 – 4 Minggu",
        revisions: "3 Putaran Evaluasi Terstruktur",
        features: [
          "Format s.d. 300 halaman",
          "Desain sampul hardcover & dust jacket",
          "Infografis data terintegrasi",
          "File siap cetak & e-book interaktif",
        ],
      },
    ],
    tags: ["White Paper", "Corporate", "ANTAM", "InDesign", "Offset FOGRA39"],
    workflow: [
      {
        step: "01",
        title: "Information Structuring",
        description:
          "Normalisasi naskah mentah, audit hierarki judul, dan pemetaan 60+ tabel data teknis ke dalam sistem kisi modular.",
      },
      {
        step: "02",
        title: "Drafting & Typography",
        description:
          "Penyusunan 487 halaman secara paralel dalam master template InDesign dengan kontrol leading dan tracking presisi.",
      },
      {
        step: "03",
        title: "Print Pre-Flight & Handoff",
        description:
          "Pengecekan overprint black, profil warna FOGRA39, bleed, dan paket arsip digital siap kirim percetakan.",
      },
    ],
    caseStudy: {
      client: "PT ANTAM Tbk & Pusat Studi Energi UGM",
      metrics: "Penyelesaian 487 Halaman 2 Jilid Tepat Waktu dalam 7 Hari Kerja",
      quote:
        "Kecepatan dan ketelitian Zacreative luar biasa. Naskah riset energi ratusan halaman berhasil disajikan menjadi buku putih yang elegan, kredibel, dan siap cetak tanpa kompromi kualitas.",
      author: "Tim Ahli PSE UGM",
    },
  },
  {
    id: "kementerian-pupr-memori-akhir-tugas-profil-setjen",
    slug: "kementerian-pupr-memori-akhir-tugas-profil-setjen",
    title: "Kementerian PUPR — Memori Akhir Tugas & Profil Setjen",
    shortTitle: "Kementerian PUPR — Memori Akhir Tugas",
    clientTag: "KEMENTERIAN RI",
    clientName: "Kementerian Pekerjaan Umum dan Perumahan Rakyat",
    category: "editorial",
    categoryLabel: "Book Layout",
    badge: "Arsip Negara",
    scope: "2 Buku • 343 Hal",
    priceFormatted: "Mulai Rp 14.000.000",
    priceStartingNumber: 14000000,
    turnaround: "2 – 3 Minggu",
    rating: 4.9,
    reviewCount: 22,
    image: "/images/assets/asset_6.webp",
    formatBadge: "Offset Ready (PDF/X-1a)",
    summary:
      "Dokumentasi capaian 10 tahun infrastruktur nasional dengan tata letak editorial presisi tinggi, infografis data spasial, dan tipografi buku arsip negara.",
    fullDescription:
      "Penyusunan dua seri buku Memori Akhir Tugas Sekretariat Jenderal Kementerian PUPR yang merangkum satu dekade pembangunan bendungan, jalan tol, dan perumahan rakyat di seluruh Indonesia dalam balutan layout berwibawa.",
    deliverables: [
      "File PDF Master Siap Cetak (X-1a Offset Standards)",
      "Peta Infografis Spasial Pembangunan Nasional",
      "Buku Interaktif Digital untuk Web Portal Resmi",
      "Source Files Adobe InDesign & Font Packages",
    ],
    specifications: {
      gridSystem: "Editorial 8-Column Official Archival Grid",
      typography: "Modern Institutional Serif + Neutral Sans",
      colorProfile: "CMYK Standard Offset + Pantone Gold Foil",
      resolution: "300 DPI Ultra High Detail",
      formatOutput: ["Print PDF/X-1a", "Web Interactive PDF"],
      sourceFiles: ["InDesign (.indd)", "Illustrator (.ai)"],
      licensing: "Hak Publikasi Kementerian Republik Indonesia",
    },
    pricingTiers: [
      {
        id: "standard",
        name: "Paket Publikasi Resmi (s.d. 350 Hal)",
        price: "Rp 14.000.000",
        priceNumber: 14000000,
        description: "Dirancang khusus untuk buku profil instansi negara dan laporan kementerian.",
        turnaround: "2 – 3 Minggu",
        revisions: "3 Putaran Tim Humas/Setjen",
        features: [
          "Format s.d. 350 halaman",
          "Peta infografis spasial kustom",
          "Hardcover boxset slipcase mockup",
          "Sertifikasi file offset ready",
        ],
      },
    ],
    tags: ["Kementerian PUPR", "Book Layout", "Arsip Negara", "Infografis"],
    workflow: [
      {
        step: "01",
        title: "Kompilasi Data Capaian 10 Tahun",
        description: "Menyusun struktur bab, foto dokumentasi proyek, dan narasi Setjen.",
      },
      {
        step: "02",
        title: "Perancangan Visual Spasial",
        description: "Pembuatan peta sebaran infrastruktur dan diagram capaian fiskal.",
      },
      {
        step: "03",
        title: "Quality Control & Serah Terima",
        description: "Finalisasi file cetak offset dan buku digital interaktif.",
      },
    ],
    caseStudy: {
      client: "Kementerian PUPR RI",
      metrics: "Dicetak untuk Distribusi Kepresidenan & Arsip Nasional RI",
      quote:
        "Buku memori akhir tugas ini menjadi rujukan visual standar tertinggi bagi publikasi Setjen selanjutnya.",
      author: "Biro Komunikasi Publik PUPR",
    },
  },
  {
    id: "kbri-damaskus-indonesia-economic-updates",
    slug: "kbri-damaskus-indonesia-economic-updates",
    title: "KBRI Damaskus — Indonesia Economic Updates",
    shortTitle: "KBRI Damaskus — Bilateral Report",
    clientTag: "KBRI DAMASKUS",
    clientName: "Kedutaan Besar Republik Indonesia di Damaskus",
    category: "editorial",
    categoryLabel: "Book Layout",
    badge: "Diplomatik",
    scope: "Bilingual • 90 Hal",
    priceFormatted: "Mulai Rp 8.000.000",
    priceStartingNumber: 8000000,
    turnaround: "10 – 14 Hari",
    rating: 4.9,
    reviewCount: 16,
    image: "/images/assets/asset_1.webp",
    formatBadge: "Bilingual ID/EN",
    summary:
      "Tinjauan ekonomi, investasi, dan hubungan bilateral dengan grid tipografi multibahasa serta integrasi infografis neraca perdagangan.",
    fullDescription:
      "Laporan bilateral resmi yang mempromosikan komoditas ekspor Indonesia ke Timur Tengah dengan tata letak dua bahasa sejajar (side-by-side) yang terstruktur rapi.",
    deliverables: [
      "File PDF Cetak Standar Internasional",
      "Infografis Neraca Perdagangan & Komoditas Unggulan",
      "Digital Presentation Deck Ringkasan Eksekutif",
    ],
    specifications: {
      gridSystem: "Bilingual Symmetrical Grid 12-Column",
      typography: "International Sans + Multilingual Arabic/Latin Display",
      colorProfile: "CMYK & sRGB Digital",
      resolution: "300 DPI",
      formatOutput: ["Print PDF", "Interactive e-Report"],
      sourceFiles: ["InDesign (.indd)"],
      licensing: "Hak Resmi Kementerian Luar Negeri RI",
    },
    pricingTiers: [
      {
        id: "diplomatic",
        name: "Diplomatic Issue Package",
        price: "Rp 8.000.000",
        priceNumber: 8000000,
        description: "Tata letak dwi-bahasa siap edar delegasi diplomatik.",
        turnaround: "10 – 14 Hari",
        revisions: "2 Kali Revisi",
        features: ["Format 90 halaman dwi-bahasa", "Diagram ekspor-impor", "E-book siap kirim"],
      },
    ],
    tags: ["KBRI", "Diplomatic", "Bilingual", "Economics"],
    workflow: [
      {
        step: "01",
        title: "Penyesuaian Naskah Bilingual",
        description: "Menyeimbangkan panjang teks Bahasa Indonesia dan Inggris.",
      },
      {
        step: "02",
        title: "Visualisasi Neraca Dagang",
        description: "Grafik aliran komoditas dan potensi investasi bilateral.",
      },
      {
        step: "03",
        title: "Finalisasi Cetak Kedutaan",
        description: "Ekspor file PDF resolusi tinggi untuk perwakilan luar negeri.",
      },
    ],
    caseStudy: {
      client: "KBRI Damaskus",
      metrics: "Didistribusikan kepada Kamar Dagang dan Mitra Internasional",
      quote:
        "Tampilan publikasi yang modern sangat membantu diplomasi ekonomi Indonesia.",
      author: "Fungsi Ekonomi KBRI",
    },
  },
  {
    id: "pt-jakarta-propertindo-jakpro-analisis-stakeholder",
    slug: "pt-jakarta-propertindo-jakpro-analisis-stakeholder",
    title: "PT Jakarta Propertindo (JAKPRO) — Analisis Stakeholder",
    shortTitle: "JAKPRO — Analisis Stakeholder",
    clientTag: "BUMD DKI",
    clientName: "PT Jakarta Propertindo",
    category: "editorial",
    categoryLabel: "Book Layout",
    badge: "BUMD Strategis",
    scope: "Korporat • 287 Hal",
    priceFormatted: "Mulai Rp 11.000.000",
    priceStartingNumber: 11000000,
    turnaround: "2 – 3 Minggu",
    rating: 4.8,
    reviewCount: 19,
    image: "/images/assets/asset_2.webp",
    formatBadge: "Sprint 7 Hari (INDD)",
    summary:
      "Perancangan buku kajian analisis pemangku kepentingan mega-proyek Jakarta dengan diagram matriks pengaruh dan infografis mitigasi sosial.",
    fullDescription:
      "Dokumen kajian strategis korporat BUMD DKI Jakarta untuk memetakan dampak proyek perkotaan dengan ratusan bagan matriks yang disederhanakan.",
    deliverables: ["Print PDF Offset", "Diagram Matriks Vektor", "Master InDesign Package"],
    specifications: {
      gridSystem: "Corporate 12-Column Analysis Grid",
      typography: "Clean Corporate Grotesk",
      colorProfile: "CMYK Corporate",
      resolution: "300 DPI",
      formatOutput: ["Print PDF", "Interactive PDF"],
      sourceFiles: ["InDesign (.indd)"],
      licensing: "Hak Internal Korporasi",
    },
    pricingTiers: [
      {
        id: "corporate",
        name: "Corporate Strategic Package",
        price: "Rp 11.000.000",
        priceNumber: 11000000,
        description: "Tata letak laporan analitis dan matriks korporat.",
        turnaround: "2 – 3 Minggu",
        revisions: "3 Putaran",
        features: ["Format s.d. 300 hal", "Matriks stakeholder", "PDF terenkripsi"],
      },
    ],
    tags: ["JAKPRO", "BUMD", "Strategic Report", "Stakeholder"],
    workflow: [
      {
        step: "01",
        title: "Pemetaan Data Pemangku Kepentingan",
        description: "Klasifikasi data wawancara dan matriks kepentingan proyek.",
      },
      {
        step: "02",
        title: "Pengembangan Diagram Alir",
        description: "Penyusunan peta risiko dan strategi mitigasi.",
      },
      {
        step: "03",
        title: "Delivery Master Dokumen",
        description: "Penyediaan berkas untuk jajaran direksi dan komisaris.",
      },
    ],
    caseStudy: {
      client: "PT Jakarta Propertindo",
      metrics: "Dipresentasikan pada Rapat Koordinasi Pemprov DKI",
      quote: "Layout yang sangat membantu eksekutif memahami peta masalah secara cepat.",
      author: "Divisi Corporate Secretary",
    },
  },
  {
    id: "entalphy-consulting-modul-efisiensi-energi",
    slug: "entalphy-consulting-modul-efisiensi-energi",
    title: "Entalphy Consulting — Modul Efisiensi Energi",
    shortTitle: "Entalphy — Modul Efisiensi Energi",
    clientTag: "ENTALPHY CONSULTING",
    clientName: "Entalphy Consulting Services",
    category: "presentation",
    categoryLabel: "Presentation Deck",
    badge: "Technical Deck",
    scope: "74 Slides • 16:9",
    priceFormatted: "Mulai Rp 7.500.000",
    priceStartingNumber: 7500000,
    turnaround: "5 – 7 Hari",
    rating: 5.0,
    reviewCount: 28,
    image: "/images/assets/asset_3.webp",
    formatBadge: "Format 16:9 (PPTX + PDF)",
    summary:
      "Perancangan dek presentasi teknis audit energi dan rekayasa termal 74 slide dengan visualisasi diagram alir Sankey dan perhitungan ROI.",
    fullDescription:
      "Transformasi slide pelatihan teknis insinyur menjadi modul presentasi eksekutif 16:9 yang memikat para manajer pabrik dan investor industri hijau.",
    deliverables: ["PowerPoint Editable (.pptx)", "Figma Master Deck", "PDF High-Res Handout"],
    specifications: {
      gridSystem: "16:9 Modular Presentation System",
      typography: "Technical Monospace & Modern Sans",
      colorProfile: "sRGB Display Crisp",
      resolution: "3840 x 2160 (4K)",
      formatOutput: ["PowerPoint (.pptx)", "PDF"],
      sourceFiles: ["PPTX", "Figma"],
      licensing: "Komersial Penuh",
    },
    pricingTiers: [
      {
        id: "deck_70",
        name: "Comprehensive Training Deck (50-80 Slide)",
        price: "Rp 7.500.000",
        priceNumber: 7500000,
        description: "Dek teknis dan materi modul pelatihan lengkap.",
        turnaround: "5 – 7 Hari",
        revisions: "3 Kali Revisi",
        features: ["74 slide terformat rapi", "Diagram alur energi kustom", "Master PPTX editable"],
      },
    ],
    tags: ["Presentation", "Energy", "Engineering", "PowerPoint"],
    workflow: [
      {
        step: "01",
        title: "Audit Slide Lama",
        description: "Menyaring teks berlebih dan menstrukturkan poin kunci.",
      },
      {
        step: "02",
        title: "Perancangan Bagan Alir Energi",
        description: "Menggambar ulang diagram teknis dan rumus termodinamika.",
      },
      {
        step: "03",
        title: "Integrasi Template PPTX",
        description: "Memastikan kemudahan edit oleh tim instruktur di masa depan.",
      },
    ],
    caseStudy: {
      client: "Entalphy Consulting",
      metrics: "Dipakai di 12 Workshop Industri Nasional",
      quote: "Materi pelatihan kami kini memiliki standar visual kelas dunia.",
      author: "Principal Consultant",
    },
  },
  {
    id: "ai-recht-ai-gender-equality-in-recruitment",
    slug: "ai-recht-ai-gender-equality-in-recruitment",
    title: "AI-RECHT — AI & Gender Equality in Recruitment",
    shortTitle: "AI-RECHT — AI Equality Deck",
    clientTag: "AI-RECHT",
    clientName: "AI-RECHT Research Consortium",
    category: "presentation",
    categoryLabel: "Presentation Deck",
    badge: "Tech Academic",
    scope: "24 Slides • Modern Tech",
    priceFormatted: "Mulai Rp 5.500.000",
    priceStartingNumber: 5500000,
    turnaround: "3 – 5 Hari",
    rating: 4.9,
    reviewCount: 15,
    image: "/images/assets/asset_4.webp",
    formatBadge: "Tech Academic Deck",
    summary:
      "Presentasi riset kecerdasan buatan dan kesetaraan gender dalam rekrutmen talenta dengan estetika Modern Editorial Tech berkontras tinggi.",
    fullDescription:
      "Dek konferensi riset internasional yang menggabungkan estetika teknologi terkini, visualisasi dataset etika AI, dan diagram alur algoritma rekrutmen.",
    deliverables: ["Apple Keynote & PPTX", "Executive Summary PDF", "Custom AI Icons Set"],
    specifications: {
      gridSystem: "Modern Tech 16:9 Canvas",
      typography: "Tech Grotesk with Electric Cyan Accents",
      colorProfile: "sRGB High Contrast",
      resolution: "4K UHD",
      formatOutput: ["Keynote", "PPTX", "PDF"],
      sourceFiles: ["Keynote (.key)", "PPTX"],
      licensing: "Academic & Conference Usage",
    },
    pricingTiers: [
      {
        id: "academic_deck",
        name: "Conference & Research Deck (20-30 Slide)",
        price: "Rp 5.500.000",
        priceNumber: 5500000,
        description: "Dek seminar riset dan konferensi teknologi global.",
        turnaround: "3 – 5 Hari",
        revisions: "2 Kali Revisi",
        features: ["24 slide modern tech", "Visualisasi dataset etika AI", "Speaker notes"],
      },
    ],
    tags: ["AI", "Research", "Presentation", "Ethics", "Keynote"],
    workflow: [
      {
        step: "01",
        title: "Pembedahan Paper Ilmiah",
        description: "Menyaring intisari metodologi riset dan temuan empiris.",
      },
      {
        step: "02",
        title: "Perancangan UI Mockup AI",
        description: "Menggambarkan alur algoritma machine learning.",
      },
      {
        step: "03",
        title: "Rehearsal Slide Handoff",
        description: "Optimalisasi slide untuk panggung proyektor LED.",
      },
    ],
    caseStudy: {
      client: "AI-RECHT Consortium",
      metrics: "Dipresentasikan pada Konferensi Etika AI di Eropa",
      quote: "Kualitas visual slide membuat audiens internasional sangat terkesan.",
      author: "Lead Researcher",
    },
  },
  {
    id: "kemendikbudristek-lpdp-regional-potential-policy-papers",
    slug: "kemendikbudristek-lpdp-regional-potential-policy-papers",
    title: "Kemendikbudristek & LPDP — Regional Potential Policy Papers",
    shortTitle: "LPDP — Regional Policy Papers",
    clientTag: "LPDP × KEMENDIKBUD",
    clientName: "Kemendikbudristek RI & LPDP",
    category: "campaign",
    categoryLabel: "Infographic & Poster",
    badge: "Seri Riset",
    scope: "5 Seri • Cetak & Digital",
    priceFormatted: "Mulai Rp 9.000.000",
    priceStartingNumber: 9000000,
    turnaround: "7 – 10 Hari",
    rating: 4.8,
    reviewCount: 20,
    image: "/images/assets/asset_5.webp",
    formatBadge: "5 Seri Wilayah Indonesia",
    summary:
      "Perancangan seri infografis kebijakan potensi daerah untuk Bengkulu, Sulawesi Selatan, DIY, Jawa Barat, dan Kalimantan Utara.",
    fullDescription:
      "Seri lembar kebijakan (policy briefs) dan poster infografis berukuran besar yang merangkum hasil riset beasiswa LPDP mengenai ketahanan pangan, energi terbarukan, dan pariwisata daerah.",
    deliverables: ["Master Vector Infographics (A1/A2/A3)", "Social Media Carousels", "Source Adobe Illustrator"],
    specifications: {
      gridSystem: "Information Design Regional Grid",
      typography: "Modern Sans Infographic Typography",
      colorProfile: "CMYK & RGB",
      resolution: "Vector Infinite Scaling",
      formatOutput: ["Print PDF", "Vector SVG", "High-Res PNG"],
      sourceFiles: ["Illustrator (.ai)"],
      licensing: "Hak Publikasi Kemendikbud & LPDP",
    },
    pricingTiers: [
      {
        id: "policy_series",
        name: "5 Seri Policy Brief Infographics",
        price: "Rp 9.000.000",
        priceNumber: 9000000,
        description: "5 Seri infografis kebijakan lengkap dengan format cetak & sosial.",
        turnaround: "7 – 10 Hari",
        revisions: "3 Kali Revisi",
        features: ["5 seri wilayah Indonesia", "Format cetak poster A1", "15 slide carousel ringkasan"],
      },
    ],
    tags: ["LPDP", "Kemendikbud", "Policy Brief", "Infografis", "Poster"],
    workflow: [
      {
        step: "01",
        title: "Ekstraksi Data Statistik Daerah",
        description: "Memetakan indeks pembangunan dan potensi ekonomi 5 provinsi.",
      },
      {
        step: "02",
        title: "Perancangan Peta Tematik",
        description: "Menggambar peta vektor terpadu dengan ikonografi khas wilayah.",
      },
      {
        step: "03",
        title: "Prepress & Format Publikasi",
        description: "Pemeriksaan warna cetak dan pemotongan format web.",
      },
    ],
    caseStudy: {
      client: "LPDP & Kemendikbudristek",
      metrics: "Dipamerkan di Gedung Kemendikbud & Terbit Online",
      quote: "Infografis yang sangat memudahkan pengambil kebijakan membaca data riset tebal.",
      author: "Koordinator Program Riset",
    },
  },
  {
    id: "public-campaign-posters",
    slug: "public-campaign-posters",
    title: "Public Campaign Posters & Multi-Channel Visuals",
    shortTitle: "Public Campaign Posters",
    clientTag: "KAMPANYE PUBLIK",
    clientName: "Inisiatif Kolaboratif Seni & Komunikasi",
    category: "campaign",
    categoryLabel: "Infographic & Poster",
    badge: "Creative Series",
    scope: "3 Seri • OOH & Digital",
    priceFormatted: "Mulai Rp 5.000.000",
    priceStartingNumber: 5000000,
    turnaround: "4 – 6 Hari",
    rating: 4.9,
    reviewCount: 31,
    image: "/images/assets/asset_13.webp",
    formatBadge: "Multi-channel Display",
    summary:
      "Perancangan seri poster kampanye publik dan media sosial dengan tipografi display tebal dan komposisi berdaya jangkau luas.",
    fullDescription:
      "Koleksi poster yang didesain untuk menangkap perhatian di ruang publik perkotaan dan linimasa digital dengan estetika modern, warna kuat, dan pesan lugas.",
    deliverables: ["Master Poster A1/B1", "Social Media Adaptations", "Outdoor Billboard Formats"],
    specifications: {
      gridSystem: "Dynamic Typographic Poster Grid",
      typography: "Display Experimental Headline + Sans",
      colorProfile: "Pantone Spot + CMYK Process",
      resolution: "600 DPI",
      formatOutput: ["Print PDF/TIFF", "WebP", "PNG"],
      sourceFiles: ["Illustrator (.ai)", "Photoshop (.psd)"],
      licensing: "Komersial Kampanye Publik",
    },
    pricingTiers: [
      {
        id: "poster_suite",
        name: "3-Poster Campaign Suite",
        price: "Rp 5.000.000",
        priceNumber: 5000000,
        description: "3 varian poster kampanye untuk cetak dan digital.",
        turnaround: "4 – 6 Hari",
        revisions: "2 Konsep Awal",
        features: ["3 varian poster", "Format cetak A1", "Adaptasi Instagram & X"],
      },
    ],
    tags: ["Campaign", "Poster", "Typography", "OOH"],
    workflow: [
      {
        step: "01",
        title: "Konsep Visual & Eksplorasi Judul",
        description: "Menghadirkan arah grafis yang tajam dan menggugah.",
      },
      {
        step: "02",
        title: "Penyusunan Tipografi & Grafis",
        description: "Menyeimbangkan hierarki teks dan ilustrasi.",
      },
      {
        step: "03",
        title: "Resizing Lintas Format",
        description: "Menyiapkan file siap cetak dan feed digital.",
      },
    ],
    caseStudy: {
      client: "Inisiatif Seni Publik",
      metrics: "Dipasang di 50+ Titik Publik & 500k+ Impressions Digital",
      quote: "Poster memiliki daya tarik visual yang kuat dan memancing interaksi.",
      author: "Kurator Pameran",
    },
  },
];

// Helper functions for modular querying
export function getAllProducts(): ProductItem[] {
  return PRODUCTS;
}

export function getProductById(idOrSlug: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function getFeaturedProduct(): ProductItem {
  return PRODUCTS[0]; // PT ANTAM Tbk — Buku Putih (Featured in Stitch Screen 1)
}

export function getProductsByCategory(
  category: "editorial" | "presentation" | "campaign"
): ProductItem[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(currentId: string, limit: number = 3): ProductItem[] {
  return PRODUCTS.filter((p) => p.id !== currentId).slice(0, limit);
}
