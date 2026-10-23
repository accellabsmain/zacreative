"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const stats = [
  { value: "50+", label: "Publikasi" },
  { value: "100%", label: "Tepat Waktu" },
  { value: "4.9/5", label: "Kepuasan Klien" },
];

const cardBase =
  "absolute rounded-2xl border border-tint-border bg-white shadow-[0_20px_40px_-15px_rgba(11,28,48,0.08),0_2px_6px_-2px_rgba(11,28,48,0.04)] dark:bg-zinc-900 dark:border-white/10";

/* ───────────── Mockup A: Typography poster ───────────── */
function PosterCard() {
  return (
    <div
      className={`${cardBase} right-0 top-0 w-[44%] aspect-[3/4] rotate-[4deg] p-4 sm:p-5 overflow-hidden transition-transform duration-500 ease-out group-hover/stack:rotate-[6deg] group-hover/stack:translate-x-1`}
      aria-hidden="true"
    >
      <div className="flex h-full flex-col justify-between text-navy dark:text-white">
        <div className="flex items-center justify-between text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.2em]">
          <span>ZA/26</span>
          <span className="text-brand dark:text-sky-soft">Poster</span>
        </div>
        <div className="leading-[0.82]">
          <p className="text-[2.1rem] sm:text-[3.4rem] font-extrabold tracking-tighter">Type</p>
          <p className="text-[2.1rem] sm:text-[3.4rem] font-extrabold tracking-tighter text-brand dark:text-sky-soft">
            Sets
          </p>
          <p className="text-[2.1rem] sm:text-[3.4rem] font-extrabold tracking-tighter">Tone.</p>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full ${i === 0 ? "bg-sky" : "bg-navy/15 dark:bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Mockup B: Pitch deck slide ───────────── */
function PitchDeckCard() {
  const bars = [32, 44, 40, 58, 72, 92];
  return (
    <div
      className={`${cardBase} left-[14%] top-[20%] w-[66%] aspect-[16/10] -rotate-[1.5deg] p-4 sm:p-5 transition-transform duration-500 ease-out group-hover/stack:-translate-y-1`}
      aria-hidden="true"
    >
      <div className="flex h-full flex-col text-navy dark:text-white">
        <div className="flex items-center justify-between">
          <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-navy-soft dark:text-zinc-400">
            Series A · Traction
          </p>
          <span className="rounded-full bg-tint px-2 py-0.5 text-[7px] sm:text-[9px] font-semibold text-brand dark:bg-brand/20 dark:text-sky-soft">
            +184% YoY
          </span>
        </div>
        <div className="mt-2 flex items-end gap-4">
          <div>
            <p className="text-lg sm:text-3xl font-extrabold tracking-tight leading-none">$48.2M</p>
            <p className="mt-1 text-[7px] sm:text-[9px] text-navy-soft dark:text-zinc-400">
              Valuasi pra-pendanaan
            </p>
          </div>
        </div>
        <div className="mt-auto flex h-[46%] items-end gap-1.5 sm:gap-2 border-b border-tint-border pt-2 dark:border-white/10">
          {bars.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-t-[3px] ${
                i === bars.length - 1 ? "bg-brand dark:bg-sky" : "bg-tint-strong dark:bg-white/15"
              }`}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[6px] sm:text-[8px] font-medium text-navy-soft/70 dark:text-zinc-500">
          {["Q1", "Q2", "Q3", "Q4", "Q1", "Q2"].map((q, i) => (
            <span key={i} className="flex-1 text-center">
              {q}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── Mockup C: Editorial book spread ───────────── */
function BookSpreadCard() {
  const lines = (n: number) =>
    Array.from({ length: n }).map((_, i) => (
      <span
        key={i}
        className="block h-[2px] sm:h-[3px] rounded-full bg-navy/10 dark:bg-white/15"
        style={{ width: i === n - 1 ? "55%" : "100%" }}
      />
    ));

  return (
    <div
      className={`${cardBase} bottom-0 left-0 w-[74%] aspect-[16/10] rotate-[1.5deg] overflow-hidden bg-[#fdfdfb] dark:bg-zinc-900 transition-transform duration-500 ease-out group-hover/stack:translate-y-1`}
      aria-hidden="true"
    >
      <div className="grid h-full grid-cols-2">
        {/* Left page */}
        <div className="relative flex flex-col gap-2 p-3 sm:p-5">
          <p className="text-[6px] sm:text-[8px] font-semibold uppercase tracking-[0.2em] text-brand dark:text-sky-soft">
            Bab 03
          </p>
          <h3 className="font-serif text-[0.8rem] sm:text-xl font-bold leading-[1.1] tracking-tight text-navy dark:text-white">
            Hilirisasi dan Masa Depan Industri Nikel
          </h3>
          <div className="mt-1 space-y-1 sm:space-y-1.5">{lines(5)}</div>
          <div className="space-y-1 sm:space-y-1.5">{lines(4)}</div>
          <span className="mt-auto text-[6px] sm:text-[8px] text-navy-soft/60 dark:text-zinc-500">
            42
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-navy/10 to-transparent dark:from-black/40" />
        </div>
        {/* Right page */}
        <div className="relative flex flex-col gap-2 p-3 sm:p-5 border-l border-navy/5 dark:border-white/5">
          <span className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-navy/10 to-transparent dark:from-black/40" />
          <blockquote className="border-l-2 border-sky pl-2 sm:pl-3 font-serif text-[0.62rem] sm:text-sm italic leading-snug text-navy dark:text-white">
            “Data yang rapi adalah cara terbaik untuk membangun kepercayaan.”
          </blockquote>
          <div className="mt-1 space-y-1 sm:space-y-1.5">{lines(6)}</div>
          <div className="space-y-1 sm:space-y-1.5">{lines(3)}</div>
          <span className="mt-auto self-end text-[6px] sm:text-[8px] text-navy-soft/60 dark:text-zinc-500">
            43
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-wash dark:bg-[#070d18] border-b border-tint-border/60 dark:border-white/10 transition-colors"
      data-purpose="hero-section"
      aria-labelledby="hero-heading"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-sky/15 blur-3xl dark:bg-brand/20"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* ───── Left column ───── */}
          <div className="lg:col-span-6 text-left">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-tint-border bg-tint px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand dark:bg-brand/15 dark:border-white/10 dark:text-sky-soft">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
              </span>
              Editorial &amp; Strategic Design
            </span>

            <h1
              id="hero-heading"
              className="mt-7 text-4xl sm:text-6xl font-bold tracking-tight leading-tight text-navy dark:text-white"
            >
              Publikasi dan presentasi yang dirancang untuk dibaca, dipahami, dan dipercaya.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-navy-soft dark:text-zinc-300">
              Kami mentransformasi laporan korporat, pitch deck investor, dan visual poster menjadi
              aset strategis berstandar dunia.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="/#kontak"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand px-7 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_rgba(26,84,164,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky/40 cursor-pointer"
              >
                Konsultasi Proyek
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/#portofolio"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-tint-border bg-white/60 px-7 text-sm font-semibold text-navy transition-colors duration-200 hover:border-brand hover:text-brand dark:bg-transparent dark:border-white/15 dark:text-white dark:hover:border-sky-soft dark:hover:text-sky-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky/40 cursor-pointer"
              >
                Lihat Portofolio Terpilih
              </Link>
            </div>

            <dl className="mt-14 grid max-w-md grid-cols-3 divide-x divide-tint-border dark:divide-white/10">
              {stats.map((s, i) => (
                <div key={s.label} className={i === 0 ? "pr-5" : "px-5"}>
                  <dd className="text-2xl sm:text-3xl font-bold tracking-tight text-navy dark:text-white">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-xs text-navy-soft/80 dark:text-zinc-400">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* ───── Right column: layered triple-pillar stack ───── */}
          <div className="lg:col-span-6">
            <div className="group/stack relative mx-auto aspect-[1/1] w-full max-w-[560px] sm:aspect-[6/5]">
              <PosterCard />
              <PitchDeckCard />
              <BookSpreadCard />

              {/* Floating status chip */}
              <div className="absolute -bottom-3 right-0 z-10 flex max-w-[92%] items-center gap-2 rounded-full border border-tint-border bg-white/95 px-3.5 py-2 text-[10px] sm:text-xs font-semibold text-navy shadow-[0_20px_40px_-15px_rgba(11,28,48,0.18)] backdrop-blur dark:bg-zinc-900/95 dark:border-white/10 dark:text-white">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                <span className="truncate">PT ANTAM Tbk • 487 Halaman • Selesai 7 Hari</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
