import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildWhatsAppLink } from "@/lib/constants";

const HIGHLIGHTS = [
  { icon: Clock, label: "Respon cepat" },
  { icon: CheckCircle2, label: "Gratis konsultasi" },
  { icon: ShieldCheck, label: "NDA tersedia" },
] as const;

const QUICK_CHIPS = [
  {
    label: "Tanya paket Layout Buku",
    message:
      "Halo ZaCreative, saya ingin tanya paket *Layout & Tata Letak Buku*. Boleh dibantu estimasi harga dan timeline pengerjaan?",
  },
  {
    label: "Tanya paket Presentasi",
    message:
      "Halo ZaCreative, saya ingin tanya paket *Presentasi & Pitch Deck*. Boleh dibantu rekomendasi tier yang sesuai?",
  },
  {
    label: "Tanya paket Poster",
    message:
      "Halo ZaCreative, saya ingin tanya paket *Poster & Kampanye Visual*. Boleh info detail pengerjaannya?",
  },
] as const;

export default function WhatsAppCtaSection() {
  return (
    <section
      id="kontak"
      data-purpose="whatsapp-cta-section"
      aria-labelledby="kontak-heading"
      className="relative w-full overflow-hidden bg-gradient-to-br from-leaf-deep via-leaf-strong to-[#239c57] text-white py-16 sm:py-22 border-b border-leaf-deep/30"
    >
      {/* Subtle architectural grid & ambient logo-green glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-8%] h-96 w-96 rounded-full bg-leaf/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 left-[-8%] h-80 w-80 rounded-full bg-black/20 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Headline, trust bullets, quick-chips */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7ef0a6]" />
              </span>
              <span>Konsultasi Langsung • WhatsApp</span>
            </div>

            <h2
              id="kontak-heading"
              className="text-2xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-tight text-white"
            >
              Siap mewujudkan publikasi dan presentasi berstandar tinggi?
            </h2>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
              Kirimkan gambaran singkat naskah, jumlah halaman/slide, atau tenggat rilis Anda. Tim
              lead desainer kami siap memberi rekomendasi paket dan estimasi awal tanpa biaya.
            </p>

            {/* 3 Poin Singkat */}
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-1 text-xs sm:text-sm font-semibold text-white">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#8ff5b4] shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            {/* Quick-chips pesan siap kirim */}
            <div className="pt-2 space-y-2.5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-white/80">
                Klik template pesan cepat:
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_CHIPS.map((chip) => (
                  <a
                    key={chip.label}
                    href={buildWhatsAppLink(chip.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 hover:bg-white hover:text-leaf-deep px-3.5 py-2 text-xs font-semibold text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                  >
                    <span>{chip.label}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Prominent White CTA Action Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl sm:rounded-3xl border border-white/25 bg-white/12 backdrop-blur-md p-6 sm:p-8 space-y-5 shadow-[0_24px_50px_-15px_rgba(6,35,19,0.45)] text-left">
              <div className="space-y-1.5">
                <p className="text-xs font-mono uppercase tracking-wider text-[#9ef7be] font-semibold">
                  Mulai Percakapan
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  Diskusikan kebutuhan proyek Anda hari ini
                </h3>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Langsung terhubung ke WhatsApp resmi ZaCreative dengan pesan pembuka otomatis.
                </p>
              </div>

              <a
                id="kontak-cta-whatsapp"
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-xl bg-white hover:bg-leaf-tint px-6 py-3.5 text-sm sm:text-base font-bold text-leaf-deep shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5 text-leaf-strong shrink-0" />
                <span>Chat via WhatsApp</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <p className="text-[11px] sm:text-xs text-center text-white/80">
                Senin – Sabtu • Biasanya dibalas dalam &lt; 1 jam di jam kerja
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

