export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  categoryBadge: string;
  summary: string;
  deliverables: string[];
  tools: string[];
  standardTurnaround: string;
}

export interface PortfolioItem {
  id: string;
  projectNumber: string;
  title: string;
  category: "Editorial" | "Presentation" | "Campaign" | "Identity";
  categoryLabel: string;
  summary: string;
  clientType: string;
  pagesOrSlides: string;
  year: string;
  tags: string[];
  highlights: string[];
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  deliverable: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "layout-buku",
    number: "01",
    title: "Layout Buku",
    tag: "[Editorial / Print]",
    categoryBadge: "Editorial",
    summary:
      "Penataan tipografi dan grid editorial profesional untuk buku cetak maupun digital berstandar publikasi komersial.",
    deliverables: [
      "File PDF High-Res Siap Cetak (CMYK, Bleed & Crop Marks)",
      "Interactive Digital PDF (Hyperlinked & Navigable TOC)",
      "Typography Hierarchy & Master Grid Guidelines",
      "Source Files Package (Adobe InDesign / Affinity)",
    ],
    tools: ["InDesign", "Illustrator", "Photoshop", "Type Design"],
    standardTurnaround: "2 – 4 Minggu",
  },
  {
    id: "presentasi",
    number: "02",
    title: "Presentasi",
    tag: "[Pitch Deck / Keynote]",
    categoryBadge: "Presentation",
    summary:
      "Dek presentasi visual berstandar tinggi untuk pitch investor, keynote speaker, dan laporan strategis manajemen.",
    deliverables: [
      "Editable Deck Template (Figma / PowerPoint / Keynote)",
      "Bespoke Data Visualizations & Infographics",
      "Speaker Notes & Visual Rhythm Pacing",
      "PDF Summary Deck for Executive Distribution",
    ],
    tools: ["Figma", "PowerPoint", "Keynote", "DataViz"],
    standardTurnaround: "3 – 7 Hari Kerja",
  },
  {
    id: "poster-kampanye",
    number: "03",
    title: "Poster & Kampanye",
    tag: "[Campaign / Visuals]",
    categoryBadge: "Campaign",
    summary:
      "Desain poster promosi dan materi kampanye visual yang komunikatif, menarik perhatian, dan berdampak luas.",
    deliverables: [
      "Key Visual Master Assets (Vector & Ultra-Res Raster)",
      "Social Media Multi-Format Adaptations (Stories, Feed, Ads)",
      "Large Format Print Assets (Billboard, Roll-Up, Poster A1)",
      "Campaign Color & Art Direction Guidelines",
    ],
    tools: ["Illustrator", "Photoshop", "Typography Lab"],
    standardTurnaround: "5 – 10 Hari Kerja",
  },
];

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: "proyek-01",
    projectNumber: "Proyek 01",
    title: "Antologi Narasi Nusantara",
    category: "Editorial",
    categoryLabel: "Layout Buku Editorial",
    summary:
      "Perancangan buku hard-cover antologi sastra dan fotografi budaya dengan tipografi serif elegan dan kisi asimetris 12-kolom.",
    clientType: "Penerbit Sastra Nasional",
    pagesOrSlides: "320 Halaman",
    year: "2025",
    tags: ["Book Layout", "Hardcover", "Typography", "Editorial Grid"],
    highlights: [
      "Grid modular 12-kolom untuk fotografi esai",
      "Harmoni tipografi serif klasik & sans modern",
      "Manajemen cetak spot varnish & special foil",
    ],
  },
  {
    id: "proyek-02",
    projectNumber: "Proyek 02",
    title: "Horizon Capital Series A Deck",
    category: "Presentation",
    categoryLabel: "Pitch Deck Eksekutif",
    summary:
      "Struktur naratif dan desain visual pitch deck senilai $12M untuk venture builder fintech yang memikat investor global.",
    clientType: "Fintech Startup & VC",
    pagesOrSlides: "28 Slides",
    year: "2025",
    tags: ["Pitch Deck", "Investor Relations", "DataViz", "Keynote"],
    highlights: [
      "Visualisasi arsitektur teknologi & TAM market",
      "Struktur pacing narasi 3-menit pertama",
      "Diverifikasi tembus pendanaan Series A",
    ],
  },
  {
    id: "proyek-03",
    projectNumber: "Proyek 03",
    title: "Festival Film Jakarta 2025",
    category: "Campaign",
    categoryLabel: "Poster & Key Visual",
    summary:
      "Sistem visual identitas kampanye festival dan poster utama yang diterapkan di 100+ titik publik dan platform digital.",
    clientType: "Dewan Kesenian & Festival Film",
    pagesOrSlides: "45+ Asset Formats",
    year: "2025",
    tags: ["Key Visual", "Event Campaign", "Poster Art", "Print Media"],
    highlights: [
      "Poster resmi cetak silkscreen limited edition",
      "Adaptasi kinetik motion graphics digital",
      "Peningkatan attendance festival sebesar 40%",
    ],
  },
  {
    id: "proyek-04",
    projectNumber: "Proyek 04",
    title: "Laporan Dampak Berkelanjutan Nusantara",
    category: "Editorial",
    categoryLabel: "Publikasi Laporan Tahunan",
    summary:
      "Desain terpadu laporan ESG tahunan 200+ halaman menggabungkan data infografis teknis dengan narasi humanis yang menggugah.",
    clientType: "Yayasan Konservasi Lingkungan",
    pagesOrSlides: "216 Halaman",
    year: "2024",
    tags: ["Annual Report", "Sustainability", "Information Design"],
    highlights: [
      "Standar pelaporan internasional GRI compliant",
      "Aksesibilitas kontras tinggi ramah pembaca",
      "E-book interaktif dengan link navigasi terintegrasi",
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    number: "1",
    title: "Konsultasi & Brief",
    summary:
      "Memahami tujuan proyek, audiens sasaran, dan tenggat waktu pengerjaan secara mendalam.",
    details: [
      "Pembedahan materi konten, naskah mentah, atau draft presentasi.",
      "Penetapan target audiens, brand tone of voice, dan format output.",
      "Penyusunan jadwal kerja, deliverable milestones, dan timeline persetujuan.",
    ],
    deliverable: "Creative Brief Document & Project Roadmap",
  },
  {
    step: "02",
    number: "2",
    title: "Eksplorasi & Desain",
    summary:
      "Menghadirkan alternatif konsep visual dan perbaikan berdasarkan feedback langsung.",
    details: [
      "Eksplorasi grid arsitektur, tipografi sampel, dan moodboard visual.",
      "Pembuatan preview komprehensif (3-5 halaman sampel / 5 slide kunci).",
      "Sesi iterasi terarah dengan batas revisi transparan untuk penyempurnaan.",
    ],
    deliverable: "Concept Milestone & Full Layout Proofing",
  },
  {
    step: "03",
    number: "3",
    title: "Finalisasi & Serah Terima",
    summary:
      "Pengiriman master file siap cetak dan aset siap pakai sesuai format yang disepakati.",
    details: [
      "Preflight checking warna CMYK, resolusi gambar 300DPI, dan font licensing.",
      "Penyusunan file editable terorganisir rapi dalam cloud archive aman.",
      "Pendampingan teknis dengan percetakan atau platform presentasi.",
    ],
    deliverable: "Production-Ready Master Package + Archive",
  },
];

export const FAQ_LIST: FaqItem[] = [
  {
    id: "faq-1",
    category: "Timeline",
    question: "Berapa lama estimasi waktu pengerjaan proyek?",
    answer:
      "Waktu pengerjaan bergantung pada kompleksitas serta skala proyek. Untuk presentasi standar biasanya membutuhkan 3–7 hari kerja, sedangkan layout buku komprehensif berkisar antara 2–4 minggu. Kami juga menyediakan opsi pengerjaan ekspres bila jadwal rilis Anda mendesak.",
  },
  {
    id: "faq-2",
    category: "Revisi & Lisensi",
    question: "Berapa batas revisi yang diberikan untuk setiap layanan?",
    answer:
      "Secara umum paket kami mencakup 2 hingga 3 kali putaran revisi terarah setelah approval konsep awal. Perubahan konsep secara menyeluruh atau penambahan naskah substansial di tengah proses akan disesuaikan kembali melalui adendum kerja yang disepakati bersama.",
  },
  {
    id: "faq-3",
    category: "Deliverables",
    question: "Format file apa saja yang akan diterima klien?",
    answer:
      "Klien akan menerima file master editable (seperti PDF high-res siap cetak dengan bleed & crop marks, PPTX/Keynote/Figma interaktif, serta file vector/aset grafis PNG/SVG beresolusi tinggi) dan arsip terorganisir untuk kebutuhan jangka panjang.",
  },
  {
    id: "faq-4",
    category: "Kerahasiaan",
    question: "Apakah Zacreative bersedia menandatangani NDA kerahasiaan?",
    answer:
      "Ya, tentu. Kami rutin menangani naskah buku yang belum terbit serta pitch deck penggalangan dana privat. Kami berkomitmen menjaga kerahasiaan data proyek Anda dan siap menandatangani Non-Disclosure Agreement (NDA) sebelum materi dibagikan.",
  },
];

export const TRUST_CLIENTS = [
  { id: "c1", name: "Gramedia Pustaka", role: "Penerbit Buku" },
  { id: "c2", name: "Venturra VC", role: "Modal Ventura" },
  { id: "c3", name: "Nusantara Media", role: "Media Komunikasi" },
  { id: "c4", name: "Kementerian Pariwisata", role: "Instansi Publik" },
  { id: "c5", name: "Alur Kreatif Studio", role: "Production House" },
  { id: "c6", name: "Universitas Indonesia", role: "Akademik & Riset" },
  { id: "c7", name: "Sintesa Ventures", role: "Fintech Seed" },
  { id: "c8", name: "Karya Cipta Publishing", role: "Penerbit Sastra" },
];
