"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Produk", href: "/products" },
    { label: "Layanan", href: "/#layanan" },
    { label: "Portofolio", href: "/#portofolio" },
    { label: "Cara Kerja", href: "/#cara-kerja" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors"
      data-purpose="site-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo Indicator */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded-lg p-1"
          data-purpose="brand-logo"
        >
          <Image
            src="/images/logocolor.webp"
            alt="Zacreative"
            width={160}
            height={40}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Menu */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          data-purpose="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors relative py-1 focus:outline-none focus:ring-1 focus:ring-zinc-400 rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Primary Action CTA & Theme Toggle (Desktop) */}
        <div className="hidden md:flex items-center gap-3" data-purpose="header-cta">
          <ThemeToggle />
          <Link
            href="/#kontak"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-medium transition-colors border border-zinc-900 dark:border-zinc-100 shadow-sm"
          >
            <span>Diskusikan Proyek</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
            aria-expanded={mobileMenuOpen}
            className="w-12 h-12 flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col space-y-2 text-base font-medium text-zinc-600 dark:text-zinc-400">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href="/#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors border border-zinc-900 dark:border-zinc-100 shadow-sm"
            >
              <span>Diskusikan Proyek</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
