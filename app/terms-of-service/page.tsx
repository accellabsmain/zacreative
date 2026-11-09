import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, Clock, Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan (Terms of Service)",
  description:
    "Syarat dan ketentuan layanan desain layout buku, laporan instansi, presentasi PowerPoint, dan poster infografis di Zacreative.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#070D18] text-slate-800 dark:text-zinc-200">
      <Navbar />

      <main className="flex-grow py-10 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-[#134282] dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-zinc-200 font-semibold">Syarat & Ketentuan</span>
          </div>

          {/* Page Header */}
          <div className="space-y-4 border-b border-slate-200 dark:border-zinc-800 pb-8">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-[#134282] uppercase dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-sky-300">
              <FileText className="w-3.5 h-3.5" />
              Ketentuan Kontrak Layanan
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy dark:text-white leading-tight">
              Syarat & Ketentuan Layanan
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              Selamat datang di Zacreative. Dengan memesan layanan desain tata letak (layout), presentasi, laporan, atau infografis kami, Anda menyetujui syarat dan ketentuan yang tercantum di bawah ini. Harap membaca dokumen ini dengan seksama demi kelancaran kolaborasi kerja kita.
            </p>
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400">
              Pembaruan Terakhir: November 2026
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-sm sm:text-base leading-relaxed">
            {/* 1. Ketentuan Umum Layanan */}
            <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-lg font-bold text-navy dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#134282] dark:bg-zinc-800 dark:text-sky-400 text-xs font-mono font-bold">
                  01
                </span>
                <h2>Ketentuan Umum Layanan</h2>
              </div>
              <p className="text-slate-600 dark:text-zinc-300">
                Zacreative menyediakan jasa desain tata letak profesional yang mencakup:
              </p>
              <ul className="space-y-2 pl-1 text-slate-600 dark:text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134282] dark:text-sky-400 font-bold">•</span>
                  <span><strong>Desain Layout Buku:</strong> Buku teks komersial, buku sastra/kumpulan cerita, buku biografi, dan modul pelatihan.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134282] dark:text-sky-400 font-bold">•</span>
                  <span><strong>Desain Laporan Instansi:</strong> Annual report, laporan penelitian, laporan CSR, dan profil perusahaan (company profile).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134282] dark:text-sky-400 font-bold">•</span>
                  <span><strong>Desain Presentasi:</strong> Pitch deck investor, slide seminar eksekutif, dan presentasi profil korporat.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134282] dark:text-sky-400 font-bold">•</span>
                  <span><strong>Poster Infografis:</strong> Poster riset ilmiah, infografis data kebijakan publik, dan visualisasi data digital/cetak.</span>
                </li>
              </ul>
            </section>

            {/* 2. Alur Pemesanan & Ketentuan Pembayaran */}
            <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-lg font-bold text-navy dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#134282] dark:bg-zinc-800 dark:text-sky-400 text-xs font-mono font-bold">
                  02
                </span>
                <h2>Alur Pemesanan & Ketentuan Pembayaran</h2>
              </div>
              <div className="space-y-3 text-slate-600 dark:text-zinc-300">
                <p>
                  Proses pengerjaan proyek mengikuti langkah-langkah berikut:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Konsultasi & Pengiriman Brief:</strong> Klien mengirimkan draf materi, jumlah halaman/slide, preferensi gaya visual, serta tenggat waktu (deadline).
                  </li>
                  <li>
                    <strong>Penawaran & Invoice:</strong> Kami menerbitkan rincian estimasi biaya dan faktur resmi.
                  </li>
                  <li>
                    <strong>Down Payment (DP):</strong> Pengerjaan desain dimulai setelah diterimanya DP sebesar 50% dari total nilai proyek, atau penerbitan Purchase Order (PO) resmi bagi instansi pemerintah dan BUMN yang memiliki mekanisme termin khusus.
                  </li>
                  <li>
                    <strong>Proses Desain & Draf Evaluasi:</strong> Pengiriman sampel dan draf tata letak untuk ditinjau oleh pihak klien.
                  </li>
                  <li>
                    <strong>Pelunasan & Serah Terima Berkas:</strong> Setelah persetujuan draf final dan pelunasan sisa 50% pembayaran, seluruh berkas master siap cetak (PDF resolusi tinggi, InDesign / PowerPoint editable) diserahkan secara lengkap.
                  </li>
                </ol>
              </div>
            </section>

            {/* 3. Ketentuan Revisi & Jangka Waktu Review */}
            <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-lg font-bold text-navy dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#134282] dark:bg-zinc-800 dark:text-sky-400 text-xs font-mono font-bold">
                  03
                </span>
                <h2>Ketentuan Revisi & Periode Review</h2>
              </div>
              <p className="text-slate-600 dark:text-zinc-300">
                Jumlah putaran revisi disesuaikan dengan paket yang Anda pilih:
              </p>
              <ul className="space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#134282] dark:text-sky-400 shrink-0 mt-1" />
                  <span><strong>Paket Bronze:</strong> Termasuk 1 kali putaran revisi minor.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#134282] dark:text-sky-400 shrink-0 mt-1" />
                  <span><strong>Paket Silver:</strong> Termasuk 3 kali putaran revisi.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#134282] dark:text-sky-400 shrink-0 mt-1" />
                  <span><strong>Paket Gold & Platinum:</strong> Termasuk revisi sepuasnya untuk penataan tata letak hingga sesuai kebutuhan proyek.</span>
                </li>
              </ul>
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
                  <Clock className="w-4 h-4" />
                  <span>Masa Berlaku Periode Review</span>
                </div>
                <p>
                  Periode review dan pengajuan revisi berlaku maksimal <strong>30 hari kalender</strong> terhitung sejak draf pengerjaan pertama dikirimkan kepada klien. Apabila tidak ada tanggapan atau instruksi revisi setelah 30 hari tanpa konfirmasi sebelumnya, proyek dianggap telah selesai dan diterima dengan baik.
                </p>
              </div>
            </section>

            {/* 4. Biaya Tambahan & Layanan Khusus */}
            <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-lg font-bold text-navy dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#134282] dark:bg-zinc-800 dark:text-sky-400 text-xs font-mono font-bold">
                  04
                </span>
                <h2>Biaya Tambahan di Luar Paket Dasar</h2>
              </div>
              <p className="text-slate-600 dark:text-zinc-300">
                Beberapa layanan ekstra dapat dikenakan biaya tambahan sesuai kesepakatan:
              </p>
              <ul className="space-y-2 pl-1 text-slate-600 dark:text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134282] dark:text-sky-400 font-bold">•</span>
                  <span><strong>Desain Cover Buku:</strong> Dikenakan biaya tambahan sebesar Rp300.000 (mencakup cover depan, punggung buku, dan cover belakang siap cetak).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134282] dark:text-sky-400 font-bold">•</span>
                  <span><strong>Konversi Naskah Dokumen ke PPT:</strong> Jika materi presentasi masih berupa teks mentah Microsoft Word yang perlu diringkas dan dipetakan ke format PowerPoint, dikenakan biaya tambahan Rp5.000 per slide.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#134282] dark:text-sky-400 font-bold">•</span>
                  <span><strong>Penambahan Jumlah Halaman:</strong> Penambahan halaman di luar kuota paket dihitung secara prorata sesuai tarif per halaman paket terkait.</span>
                </li>
              </ul>
            </section>

            {/* 5. Hak Cipta & Kepemilikan Materi */}
            <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-lg font-bold text-navy dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#134282] dark:bg-zinc-800 dark:text-sky-400 text-xs font-mono font-bold">
                  05
                </span>
                <h2>Hak Cipta & Kepemilikan Aset</h2>
              </div>
              <div className="space-y-3 text-slate-600 dark:text-zinc-300">
                <p>
                  <strong>Kewajiban Legal Klien:</strong> Klien menjamin bahwa seluruh naskah, tulisan, foto, logo, dan materi visual yang diserahkan kepada Zacreative adalah hak milik sah klien atau memiliki izin lisensi yang berlaku, serta tidak melanggar hak cipta pihak ketiga.
                </p>
                <p>
                  <strong>Kepemilikan Hasil Desain:</strong> Setelah pembayaran lunas diterima, seluruh hak penggunaan hasil desain akhir dan berkas serah terima diserahkan sepenuhnya kepada pihak klien untuk keperluan penerbitan komersial, cetak instansi, maupun distribusi digital.
                </p>
              </div>
            </section>

            {/* 6. Pembatalan & Pengembalian Dana */}
            <section className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-lg font-bold text-navy dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#134282] dark:bg-zinc-800 dark:text-sky-400 text-xs font-mono font-bold">
                  06
                </span>
                <h2>Pembatalan & Kebijakan Pengembalian Dana</h2>
              </div>
              <p className="text-slate-600 dark:text-zinc-300">
                Apabila terjadi pembatalan proyek secara sepihak oleh klien setelah proses pengerjaan desain telah dimulai, uang muka (DP) yang telah dibayarkan akan dihitung secara proporsional sesuai dengan persentase pekerjaan yang telah dikerjakan oleh tim desain kami hingga tanggal pembatalan. Berkas kerja sementara yang telah selesai akan diserahkan kepada klien.
              </p>
            </section>

            {/* 7. Hubungi Kami */}
            <section className="rounded-2xl border border-blue-200 bg-blue-50/50 dark:border-zinc-800 dark:bg-zinc-900/80 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-lg font-bold text-navy dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#134282] text-white text-xs font-mono font-bold">
                  07
                </span>
                <h2>Konsultasi Syarat & Ketentuan Layanan</h2>
              </div>
              <p className="text-slate-600 dark:text-zinc-300">
                Untuk pertanyaan lebih lanjut mengenai skema kerja sama, penerbitan invoice resmi, penandatanganan NDA, atau surat perjanjian kerja sama (SPK) instansi Anda, silakan hubungi kami:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-slate-800 dark:text-white px-5 py-3 text-sm font-semibold transition-colors shadow-xs"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>{CONTACT.email}</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

