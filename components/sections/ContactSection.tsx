"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [service, setService] = useState<"book" | "deck" | "infographic">("book");
  const [volume, setVolume] = useState<string>("medium"); // small, medium, large
  const [speed, setSpeed] = useState<"standard" | "sprint">("standard");
  const [clientName, setClientName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic estimate calculator
  const calculateEstimate = () => {
    let base = 7500000;
    let tierName = "Standard Publication";
    let estDays = "14 - 21 Hari Kerja";

    if (service === "book") {
      if (volume === "small") {
        base = 7500000;
        tierName = "Naskah Ringkas / Monograf (s.d. 100 Hal)";
        estDays = speed === "sprint" ? "5 - 7 Hari" : "10 - 14 Hari";
      } else if (volume === "medium") {
        base = 12000000;
        tierName = "Buku Resmi Instansi / Korporasi (100 - 300 Hal)";
        estDays = speed === "sprint" ? "7 - 10 Hari" : "14 - 21 Hari";
      } else {
        base = 18000000;
        tierName = "Buku Putih & Edisi Kolektor (300+ Hal)";
        estDays = speed === "sprint" ? "10 - 14 Hari" : "21 - 30 Hari";
      }
    } else if (service === "deck") {
      if (volume === "small") {
        base = 5500000;
        tierName = "Keynote / Seminar Deck (15 - 20 Slide)";
        estDays = speed === "sprint" ? "3 Hari" : "5 Hari";
      } else if (volume === "medium") {
        base = 8500000;
        tierName = "Investor Pitch Deck Series A (25 - 35 Slide)";
        estDays = speed === "sprint" ? "5 Hari" : "7 Hari";
      } else {
        base = 14000000;
        tierName = "Modul Korporat Lengkap (50+ Slide)";
        estDays = speed === "sprint" ? "7 Hari" : "10 Hari";
      }
    } else {
      base = 5000000;
      tierName = "Poster Seri & Sistem Infografis";
      estDays = speed === "sprint" ? "3 Hari" : "5 Hari";
    }

    if (speed === "sprint") {
      base = Math.round(base * 1.35);
    }

    return {
      tierName,
      estDays,
      formattedPrice: `Rp ${base.toLocaleString("id-ID")}`,
    };
  };

  const estimate = calculateEstimate();

  const handleGenerateWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !contactInfo) return;
    setIsSuccess(true);
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Halo Zacreative, saya *${clientName}* (${contactInfo}).\n\nSaya ingin mendiskusikan brief:\n- Layanan: *${service.toUpperCase()}*\n- Rekomendasi Paket: *${estimate.tierName}*\n- Target Waktu: *${estimate.estDays}*\n- Estimasi Biaya: *${estimate.formattedPrice}*\n\nCatatan:\n${notes || "Mohon informasi jadwal ketersediaan tim untuk memulai."}`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <section
      className="w-full bg-white dark:bg-zinc-950 py-16 sm:py-24 border-b border-[#E2E8F0] dark:border-zinc-800 transition-colors text-left"
      id="kontak"
      data-purpose="contact-brief-section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Context & Commitments */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#1A54A4] dark:text-[#38BDF8] font-semibold">
                [KALKULATOR ESTIMASI &amp; BRIEF]
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                Mulai Diskusi Proyek Anda
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-zinc-400 leading-relaxed">
                Gunakan kalkulator estimasi cepat di bawah ini untuk mendapatkan rekomendasi paket, timeline, dan rancangan biaya sebelum memulai percakapan bersama tim kami.
              </p>
            </div>

            {/* Commitments */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-[#F8FAFC] dark:bg-zinc-900/60 space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0F172A] dark:text-zinc-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Kerahasiaan Dokumen Terjamin (NDA)</span>
                </div>
                <p className="text-xs text-[#64748B] dark:text-zinc-400 pl-6 leading-relaxed">
                  Data riset, dokumen keuangan, dan naskah pra-rilis Anda aman di bawah komitmen kerahasiaan penuh.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-[#F8FAFC] dark:bg-zinc-900/60 space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0F172A] dark:text-zinc-100">
                  <Sparkles className="w-4 h-4 text-[#1A54A4] dark:text-[#38BDF8]" />
                  <span>Transparansi Biaya &amp; Milestone Jelas</span>
                </div>
                <p className="text-xs text-[#64748B] dark:text-zinc-400 pl-6 leading-relaxed">
                  Semua deliverable, batas revisi, dan format serah terima disepakati di awal tanpa biaya tersembunyi.
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-[#64748B] dark:text-zinc-400 pt-2">
              Email inquiry resmi:{" "}
              <a href="mailto:hello@zacreative.com" className="text-[#1A54A4] dark:text-[#38BDF8] underline font-semibold">
                hello@zacreative.com
              </a>
            </div>
          </div>

          {/* Right Column: Estimator & Form */}
          <div className="lg:col-span-7">
            {isSuccess ? (
              <div className="p-6 sm:p-8 rounded-2xl border-2 border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h3 className="font-bold text-lg text-[#0F172A] dark:text-white">
                      Brief Berhasil Disusun!
                    </h3>
                    <p className="text-xs text-[#64748B] dark:text-zinc-400">
                      Rangkuman estimasi paket untuk {clientName} siap dikirimkan langsung ke tim lead desainer.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-400">Paket Rekomendasi:</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{estimate.tierName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-400">Target Timeline:</span>
                    <span className="font-bold text-[#0F172A] dark:text-white">{estimate.estDays}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">Estimasi Biaya:</span>
                    <span className="font-bold text-base text-[#1A54A4] dark:text-[#38BDF8]">{estimate.formattedPrice}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Lanjutkan ke WhatsApp Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Hitung Ulang
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleGenerateWhatsApp} className="p-6 sm:p-8 rounded-2xl border-2 border-[#E2E8F0] dark:border-zinc-800 bg-[#F8FAFC]/60 dark:bg-zinc-900/40 space-y-6 shadow-sm">
                {/* Step 1: Select Service */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#0F172A] dark:text-zinc-200 font-bold mb-2">
                    1. Kategori Kebutuhan
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setService("book")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        service === "book"
                          ? "bg-[#1A54A4] text-white border-[#1A54A4] font-semibold shadow-2xs"
                          : "bg-white dark:bg-zinc-900 border-[#E2E8F0] dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
                      }`}
                    >
                      <span className="text-xs font-mono block">Book Layout</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setService("deck")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        service === "deck"
                          ? "bg-[#1A54A4] text-white border-[#1A54A4] font-semibold shadow-2xs"
                          : "bg-white dark:bg-zinc-900 border-[#E2E8F0] dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
                      }`}
                    >
                      <span className="text-xs font-mono block">Pitch Deck</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setService("infographic")}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        service === "infographic"
                          ? "bg-[#1A54A4] text-white border-[#1A54A4] font-semibold shadow-2xs"
                          : "bg-white dark:bg-zinc-900 border-[#E2E8F0] dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
                      }`}
                    >
                      <span className="text-xs font-mono block">Infografis</span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Volume & Speed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#0F172A] dark:text-zinc-200 font-bold mb-2">
                      2. Skala Volume Naskah
                    </label>
                    <select
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 text-xs sm:text-sm bg-white dark:bg-zinc-900 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1A54A4]"
                    >
                      <option value="small">Ringkas (s.d. 100 Hal / 20 Slide)</option>
                      <option value="medium">Menengah (100 - 300 Hal / 35 Slide)</option>
                      <option value="large">Komprehensif (300+ Hal / 50+ Slide)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#0F172A] dark:text-zinc-200 font-bold mb-2">
                      3. Target Timeline
                    </label>
                    <select
                      value={speed}
                      onChange={(e) => setSpeed(e.target.value as "standard" | "sprint")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 text-xs sm:text-sm bg-white dark:bg-zinc-900 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1A54A4]"
                    >
                      <option value="standard">Jadwal Reguler (14 - 21 Hari)</option>
                      <option value="sprint">Sprint Turnaround (7 - 10 Hari)</option>
                    </select>
                  </div>
                </div>

                {/* Live Estimator Output Banner */}
                <div className="p-4 rounded-xl border border-[#B3CCFF] dark:border-zinc-700 bg-[#EBF2FA] dark:bg-zinc-800 flex items-center justify-between text-left">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#1A54A4] dark:text-[#38BDF8] font-bold block">
                      Rekomendasi Paket:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white line-clamp-1">
                      {estimate.tierName}
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B] dark:text-zinc-400 block mt-0.5">
                      Estimasi Waktu: {estimate.estDays}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-[#64748B] dark:text-zinc-400 block">
                      Estimasi Biaya
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold text-[#1A54A4] dark:text-[#38BDF8]">
                      {estimate.formattedPrice}
                    </span>
                  </div>
                </div>

                {/* Client Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1 font-semibold">
                      Nama &amp; Instansi *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Raditya (Biro Komunikasi)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1A54A4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1 font-semibold">
                      WhatsApp / Email Kantor *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="e.g. 0812-xxxx-xxxx / nama@instansi.go.id"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1A54A4]"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1 font-semibold">
                    Catatan Khusus Naskah
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contoh: Naskah 280 halaman sudah final, butuh konversi 40 tabel, dan cetak 500 eksemplar..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1A54A4]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#1A54A4] hover:bg-[#103B75] text-white text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Brief &amp; Terhubung via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
