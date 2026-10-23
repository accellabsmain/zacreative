"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";

export default function ProcessSection() {
  const [openStep, setOpenStep] = useState<number>(0);

  const steps = [
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
  ];

  return (
    <section
      className="w-full bg-white dark:bg-zinc-950 py-16 sm:py-24 border-b border-[#E2E8F0] dark:border-zinc-800 transition-colors text-left"
      id="cara-kerja"
      data-purpose="process-flow-section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Header */}
        <div className="space-y-2 lg:col-span-5 lg:sticky lg:top-28">
          <span className="font-mono text-xs uppercase tracking-wider text-[#1A54A4] dark:text-[#38BDF8] font-semibold">
            [ALUR KERJA STUDIO]
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white">
            Proses Kolaborasi Terstruktur Tanpa Friksi
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-zinc-400 leading-relaxed">
            Dari naskah mentah hingga dokumen siap cetak dan rilis digital, setiap fase dikelola dengan milestone transparan dan kepatuhan tenggat waktu ketat.
          </p>
        </div>

        {/* 5-Step Accordion List */}
        <div className="space-y-3 lg:col-span-7 w-full">
          {steps.map((st, idx) => {
            const isOpen = openStep === idx;
            return (
              <div
                key={st.num}
                className={`rounded-2xl border-2 transition-all overflow-hidden ${
                  isOpen
                    ? "border-[#1A54A4] dark:border-[#38BDF8] bg-[#F8FAFC] dark:bg-zinc-900 shadow-xs"
                    : "border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenStep(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#1A54A4] text-white dark:bg-[#38BDF8] dark:text-[#0F172A]"
                          : "bg-[#EBF2FA] dark:bg-zinc-800 text-[#1A54A4] dark:text-zinc-300"
                      }`}
                    >
                      {st.num}
                    </span>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-[#0F172A] dark:text-white">
                        {st.title}
                      </h3>
                      <p className="text-xs text-[#64748B] dark:text-zinc-400 mt-0.5 line-clamp-1 hidden sm:block">
                        {st.summary}
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform ${
                      isOpen ? "rotate-180 text-[#1A54A4] dark:text-[#38BDF8]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#E2E8F0] dark:border-zinc-800 space-y-4 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-[#424751] dark:text-zinc-300 leading-relaxed pl-14 sm:pl-16">
                      {st.details}
                    </p>
                    <div className="pl-14 sm:pl-16 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-mono text-xs text-[#0F172A] dark:text-zinc-200 font-semibold">
                        Output Milestone: {st.deliverable}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
