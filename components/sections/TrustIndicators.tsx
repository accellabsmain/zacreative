import { Building2 } from "lucide-react";

export default function TrustIndicators() {
  const clients = [
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
  ];

  const duplicated = [...clients, ...clients];

  return (
    <section
      className="w-full bg-[#0A1120] text-white py-12 sm:py-16 border-y border-white/10 overflow-hidden"
      data-purpose="trust-indicators-marquee"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse"></span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#94A3B8] font-semibold">
            DIPERCAYA OLEH KEMENTERIAN, BUMN, DAN INSTITUSI RISET STRATEGIS
          </h2>
        </div>

        {/* Infinite Marquee Loop */}
        <div className="relative overflow-hidden w-full marquee-mask py-1">
          <div className="animate-marquee flex gap-6 sm:gap-8 items-center">
            {duplicated.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="w-48 sm:w-56 h-16 shrink-0 rounded-xl border border-white/15 bg-white/5 backdrop-blur-xs flex items-center justify-center px-4 hover:border-[#00D2FF] transition-colors group"
              >
                <div className="flex items-center gap-3 max-w-full">
                  <Building2 className="w-4 h-4 text-slate-400 group-hover:text-[#00D2FF] transition-colors shrink-0" />
                  <div className="text-left truncate">
                    <span className="font-mono text-xs sm:text-sm text-white font-semibold truncate block">
                      {c.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {c.desc}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
