import Image from "next/image";
import { Building2 } from "lucide-react";
import { TRUST_COPY } from "@/lib/copywriting";

export default function TrustIndicators() {
  const duplicated = [...TRUST_COPY.clients, ...TRUST_COPY.clients];

  return (
    <section
      className="w-full bg-[#134282] text-white py-12 sm:py-16 border-y border-white/10 overflow-hidden"
      data-purpose="trust-indicators-marquee"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse"></span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-blue-100/90 font-semibold">
            {TRUST_COPY.heading}
          </h2>
        </div>

        {/* Infinite Marquee Loop */}
        <div className="relative overflow-hidden w-full marquee-mask py-1">
          <div className="animate-marquee flex gap-4 sm:gap-6 items-center">
            {duplicated.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="w-56 sm:w-64 h-16 shrink-0 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center px-3.5 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 w-full min-w-0">
                  {/* Slot Logo Client */}
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden p-1">
                    {c.logo ? (
                      <Image
                        src={c.logo}
                        alt={`Logo ${c.name}`}
                        width={40}
                        height={40}
                        unoptimized
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Building2 className="w-5 h-5 text-slate-400 group-hover:text-[#134282] transition-colors shrink-0" />
                    )}
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <span className="font-sans text-xs sm:text-sm text-black font-bold truncate block">
                      {c.name}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-600 font-medium block truncate">
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
