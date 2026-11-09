# ZaCreative — Platform Layanan Desain Kreatif & Portofolio

Platform web modern untuk **ZaCreative**, penyedia layanan desain kreatif profesional yang berfokus pada:
- **Desain Layout Buku & Majalah** (Editorial design, e-book, layout cetak)
- **Desain Poster & Promosi** (Flyer, brosur, banner media sosial)
- **Desain Presentasi & Pitch Deck** (Slide bisnis korporat, edukasi, proposal)

Dibangun menggunakan stack modern dengan performa tinggi, UI/UX responsif, dan dashboard admin terintegrasi untuk manajemen portofolio secara real-time.

---

## 🚀 Tech Stack

- **Runtime & Package Manager**: [Bun](https://bun.sh) (v1.3+)
- **Framework**: [Next.js 16 (App Router + Turbopack)](https://nextjs.org/)
- **Library UI**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Animasi & Interaksi**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data & Validasi**: [Zod v4](https://zod.dev/)
- **Penyimpanan Portofolio**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (Production) & Local FS Fallback (`.local-blob` untuk development)

---

## ✨ Fitur Utama

- **Landing Page Interaktif**:
  - Showcase paket layanan dengan filter kategori terpadu.
  - Galeri portofolio responsive (tampilan 2 kolom di mobile view).
  - Testimoni, trust indicators, dan estimasi waktu pengerjaan real-time.
  - Direct WhatsApp CTA generator dengan preset pesan dinamis.
- **Admin Dashboard (`/admin`)**:
  - Akses terproteksi session 5 jam dengan auto-logout.
  - CRUD item portofolio (kategori, catatan/caption, footnote, dan URL).
  - Sinkronisasi real-time ke halaman utama tanpa perlu build ulang.
  - Manajemen kredensial akun & password admin langsung dari dashboard.
- **SEO & Performa**:
  - Struktur JSON-LD (LocalBusiness, Organization, Services).
  - Sitemap dinamis (`/sitemap.xml`) & `robots.txt`.
  - Mode Gelap/Terang (Dark/Light mode toggle) dengan transisi mulus.
  - Gambar teroptimasi WebP dengan rasio responsif untuk skor LCP maksimal.

---