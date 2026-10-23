"use client";

import { useState } from "react";
import { ProductItem, PricingTier } from "@/lib/data/products";
import { X, Send, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";

interface ProductInquiryModalProps {
  product: ProductItem | null;
  selectedTier?: PricingTier | null;
  onClose: () => void;
}

export default function ProductInquiryModal({
  product,
  selectedTier,
  onClose,
}: ProductInquiryModalProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [tierChoice, setTierChoice] = useState<string>(
    selectedTier?.id || product?.pricingTiers[0]?.id || "starter"
  );
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product) return null;

  const currentTier =
    product.pricingTiers.find((t) => t.id === tierChoice) ||
    product.pricingTiers[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    setIsSuccess(true);
  };

  const getWhatsAppDirectLink = () => {
    const text = encodeURIComponent(
      `Halo Zacreative, saya ${clientName} (${clientEmail}).\n\nSaya ingin memesan / konsultasi produk: *${product.title}*\nPaket: *${currentTier.name} (${currentTier.price})*\n\nCatatan Tambahan:\n${notes || "Mohon info jadwal dan ketersediaan slot pengerjaan."}`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              Formulir Pemesanan • {product.categoryLabel}
            </span>
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white mt-1">
              {product.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir"
            className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Permintaan Anda Telah Terhubung!</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Detail paket <strong>{currentTier.name}</strong> untuk <strong>{clientName}</strong> siap dikirimkan langsung ke tim lead desainer via WhatsApp atau email resmi.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={getWhatsAppDirectLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Lanjutkan ke WhatsApp Instan</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Tier Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 font-medium">
                Pilih Paket / Tingkat Layanan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {product.pricingTiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setTierChoice(tier.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      tierChoice === tier.id
                        ? "border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <span className="text-[10px] font-mono block opacity-80">
                      {tier.name.split("(")[0]}
                    </span>
                    <span className="text-xs font-mono font-bold block mt-0.5">
                      {tier.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1 font-medium">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Budi Santoso"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1 font-medium">
                  Email Kantor / Pribadi *
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="e.g. budi@instansi.id"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1 font-medium">
                Catatan Singkat / Referensi Naskah
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Jumlah halaman naskah, tenggat rilis, atau lampiran..."
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs sm:text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Simpan &amp; Lanjutkan Brief</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
