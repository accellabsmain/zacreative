import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-12 transition-colors"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand info & Navigation columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-zinc-200 dark:border-zinc-800">
          {/* Brand Info */}
          <div className="sm:col-span-2 md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                src="/images/logocolor.webp"
                alt="Zacreative Studio"
                width={160}
                height={40}
                className="h-9 w-auto object-contain"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              Studio desain visual spesialis perancangan editorial buku komersial, pitch deck eksekutif investor, dan sistem komunikasi visual berstandar presisi tinggi.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="sm:col-span-1 md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-semibold block">
              Navigasi
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  href="#layanan"
                >
                  Layanan Utama
                </a>
              </li>
              <li>
                <a
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  href="#portofolio"
                >
                  Portofolio &amp; Karya
                </a>
              </li>
              <li>
                <a
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  href="#cara-kerja"
                >
                  Alur Kerja Sama
                </a>
              </li>
              <li>
                <a
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  href="#faq"
                >
                  Tanya Jawab (FAQ)
                </a>
              </li>
              <li>
                <a
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  href="#kontak"
                >
                  Formulir Konsultasi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="sm:col-span-1 md:col-span-4 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-semibold block">
              Kontak &amp; Konsultasi
            </span>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Siap mewujudkan narasi visual yang berbobot untuk brand Anda? Diskusikan brief proyek kapan saja bersama tim kami.
            </p>
            <div className="pt-1 space-y-2">
              <a
                href="mailto:hello@zacreative.com"
                className="inline-flex items-center gap-2 font-mono text-xs text-zinc-900 dark:text-zinc-100 font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>hello@zacreative.com</span>
              </a>
              <div>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                >
                  <span>Chat Konsultasi Cepat via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal and Copyright metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
          <div>© 2025 ZaCreative Studio. All rights reserved.</div>
          <div className="flex items-center gap-6 font-mono text-xs flex-wrap justify-center">
            <span className="text-zinc-400 dark:text-zinc-600">[Jakarta, ID]</span>
            <a
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              href="#faq"
            >
              [Privacy Policy]
            </a>
            <a
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              href="#faq"
            >
              [Terms of Service]
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
