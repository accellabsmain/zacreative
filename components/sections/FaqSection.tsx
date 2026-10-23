"use client";

import { useState } from "react";
import { MessageCircle, Plus, Minus, ArrowUpRight } from "lucide-react";

export default function FaqSection() {
  const faqs = [
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
  ];

  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      className="w-full bg-[#F8FAFC] dark:bg-[#070D18] py-16 sm:py-24 border-b border-[#E2E8F0] dark:border-zinc-800 transition-colors text-left"
      id="faq"
      data-purpose="faq-section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: FAQ Context & Fast WhatsApp Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#1A54A4] dark:text-[#38BDF8] font-semibold">
                [TANYA JAWAB UMUM]
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-zinc-400 leading-relaxed">
                Informasi transparan mengenai standar pengerjaan, perjanjian kerahasiaan, berkas master, dan alur teknis percetakan kami.
              </p>
            </div>

            {/* Fast WhatsApp Box */}
            <div className="p-6 rounded-2xl border-2 border-[#1A54A4] dark:border-[#38BDF8] bg-white dark:bg-zinc-900 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#0F172A] dark:text-white font-bold">
                  Fast Response (WhatsApp)
                </span>
              </div>
              <h3 className="font-bold text-base text-[#0F172A] dark:text-white">
                Punya pertanyaan spesifik terkait naskah Anda?
              </h3>
              <p className="text-xs text-[#64748B] dark:text-zinc-400 leading-relaxed">
                Tim lead desainer kami siap berdiskusi secara instan dan memberikan estimasi awal dalam hitungan jam.
              </p>
              <a
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#1A54A4] hover:bg-[#103B75] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                href="https://wa.me/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle className="w-4 h-4 text-[#38BDF8]" />
                <span>Konsultasi Instan via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Q&A list */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "border-[#1A54A4] dark:border-[#38BDF8] bg-white dark:bg-zinc-900 shadow-xs"
                      : "border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-white pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#1A54A4] text-white dark:bg-[#38BDF8] dark:text-[#0F172A] border-[#1A54A4]"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-500"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#424751] dark:text-zinc-300 leading-relaxed border-t border-[#E2E8F0] dark:border-zinc-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
