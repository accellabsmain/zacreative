"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  KeyRound,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_LIMITS,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/lib/validations/portfolio";

interface AdminDashboardClientProps {
  username: string;
  initialItems: PortfolioItem[];
}

export default function AdminDashboardClient({
  username: initialUsername,
  initialItems,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [currentUsername, setCurrentUsername] = useState(initialUsername);
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [activeFilter, setActiveFilter] = useState<"ALL" | PortfolioCategory>(
    "ALL"
  );

  // Form state (Create / Edit)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [instagramUrl, setInstagramUrl] = useState("");
  const [category, setCategory] = useState<PortfolioCategory>(
    PORTFOLIO_CATEGORIES[0]
  );
  const [note, setNote] = useState("");
  const [footnote, setFootnote] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [busyItemId, setBusyItemId] = useState<string | null>(null);

  // Credentials modal state
  const [isCredModalOpen, setIsCredModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState(initialUsername);
  const [newPassword, setNewPassword] = useState("");
  const [credError, setCredError] = useState<string | null>(null);
  const [credSuccess, setCredSuccess] = useState<string | null>(null);
  const [isSavingCreds, setIsSavingCreds] = useState(false);

  const hasSyncingItems = useMemo(
    () => items.some((item) => item.syncStatus === "syncing"),
    [items]
  );

  const fetchLatestItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/portfolio", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as {
        ok?: boolean;
        items?: PortfolioItem[];
      };
      if (data.ok && Array.isArray(data.items)) {
        setItems(data.items);
      }
    } catch {
      // Ignore transient network errors while polling
    }
  }, []);

  // Poll automatically while background Vercel worker (`after()`) is syncing thumbnails
  useEffect(() => {
    if (!hasSyncingItems) return;
    const interval = setInterval(() => {
      void fetchLatestItems();
    }, 2500);
    return () => clearInterval(interval);
  }, [hasSyncingItems, fetchLatestItems]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "ALL") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [items, activeFilter]);

  function resetForm() {
    setEditingId(null);
    setInstagramUrl("");
    setCategory(PORTFOLIO_CATEGORIES[0]);
    setNote("");
    setFootnote("");
    setFormError(null);
  }

  function startEditing(item: PortfolioItem) {
    setEditingId(item.id);
    setInstagramUrl(item.instagramUrl);
    setCategory(item.category);
    setNote(item.note);
    setFootnote(item.footnote || "");
    setFormError(null);
    setFormSuccess(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);

    try {
      const isEdit = Boolean(editingId);
      const res = await fetch("/api/admin/portfolio", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEdit
            ? {
                id: editingId,
                instagramUrl,
                category,
                note,
                footnote,
              }
            : {
                instagramUrl,
                category,
                note,
                footnote,
              }
        ),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        item?: PortfolioItem;
      };

      if (!res.ok || !data.ok || !data.item) {
        setFormError(data.error || "Gagal menyimpan portofolio.");
        setIsSubmitting(false);
        return;
      }

      const savedItem = data.item;
      setItems((prev) =>
        isEdit
          ? prev.map((it) => (it.id === savedItem.id ? savedItem : it))
          : [savedItem, ...prev]
      );

      resetForm();
      setFormSuccess(
        savedItem.syncStatus === "syncing"
          ? "Tersimpan! Worker sedang mengambil gambar dari Instagram..."
          : "Perubahan portofolio berhasil disimpan."
      );
    } catch {
      setFormError("Terjadi gangguan jaringan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRetrySync(id: string) {
    setBusyItemId(id);
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "retry", id }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        item?: PortfolioItem;
      };
      if (res.ok && data.ok && data.item) {
        setItems((prev) =>
          prev.map((it) => (it.id === id ? data.item! : it))
        );
      }
    } finally {
      setBusyItemId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Hapus item portofolio ini beserta gambarnya?")) {
      return;
    }

    setBusyItemId(id);
    try {
      const res = await fetch(
        `/api/admin/portfolio?id=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setItems((prev) => prev.filter((it) => it.id !== id));
        if (editingId === id) {
          resetForm();
        }
      }
    } finally {
      setBusyItemId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function handleSaveCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCredError(null);
    setCredSuccess(null);
    setIsSavingCreds(true);

    try {
      const res = await fetch("/api/admin/auth/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newUsername,
          newPassword,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        username?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setCredError(data.error || "Gagal memperbarui kredensial.");
        setIsSavingCreds(false);
        return;
      }

      if (data.username) {
        setCurrentUsername(data.username);
      }
      setCurrentPassword("");
      setNewPassword("");
      setCredSuccess("Username & password berhasil diperbarui di Vercel Blob.");
    } catch {
      setCredError("Gagal menghubungi server.");
    } finally {
      setIsSavingCreds(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#E2E8F0] dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-brand dark:text-sky-soft font-semibold">
              ZaCreative Admin
            </span>
            <h1 className="text-base sm:text-lg font-bold text-navy dark:text-white truncate">
              Dashboard Portofolio IG
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/#portofolio"
              target="_blank"
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-navy dark:text-zinc-200 hover:border-brand hover:text-brand dark:hover:border-sky-soft dark:hover:text-sky-soft transition-colors"
            >
              <span>Lihat Web</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </Link>

            <button
              type="button"
              onClick={() => {
                setNewUsername(currentUsername);
                setCredError(null);
                setCredSuccess(null);
                setIsCredModalOpen(true);
              }}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-navy dark:text-zinc-200 hover:border-brand hover:text-brand transition-colors cursor-pointer"
            >
              <KeyRound className="h-3.5 w-3.5 shrink-0" />
              <span className="max-w-[90px] truncate">{currentUsername}</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-300 px-3 py-1.5 text-xs font-semibold text-navy-soft dark:text-zinc-300 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Add / Edit Form */}
          <section className="lg:col-span-5 xl:col-span-4 rounded-2xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-xs space-y-5 lg:sticky lg:top-20">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-navy dark:text-white">
                  {editingId ? "Edit Portofolio" : "Tambah Karya Baru"}
                </h2>
                <p className="text-xs text-navy-soft dark:text-zinc-400 mt-0.5">
                  Tempel link Instagram, gambar diambil otomatis di background.
                </p>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer shrink-0"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Batal</span>
                </button>
              )}
            </div>

            {formError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3.5 py-2.5 text-xs text-red-700 dark:text-red-300 break-words"
              >
                {formError}
              </div>
            )}

            {formSuccess && (
              <div
                role="status"
                className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-2.5 text-xs text-emerald-800 dark:text-emerald-300 break-words"
              >
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Instagram Link */}
              <div className="space-y-1.5">
                <label
                  htmlFor="ig-url"
                  className="block text-xs font-semibold text-navy dark:text-zinc-200"
                >
                  Link Postingan / Reels Instagram
                </label>
                <input
                  id="ig-url"
                  type="url"
                  required
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="https://www.instagram.com/p/xxxxxx/"
                  className="w-full min-h-[44px] rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-navy dark:text-white placeholder:text-zinc-400 focus:border-brand dark:focus:border-sky-soft focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              {/* Category Pills */}
              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-navy dark:text-zinc-200">
                  Kategori Layanan
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {PORTFOLIO_CATEGORIES.map((cat) => {
                    const isSelected = category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`min-h-[42px] w-full flex items-center justify-between rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-semibold text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-brand bg-tint dark:border-sky-soft dark:bg-sky-soft/15 text-brand dark:text-sky-soft"
                            : "border-[#E2E8F0] dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950 text-navy-soft dark:text-zinc-300 hover:border-brand/40"
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                        <span
                          className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                            isSelected
                              ? "bg-brand dark:bg-sky-soft"
                              : "bg-zinc-300 dark:bg-zinc-700"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Short Note (max 120 chars) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="portfolio-note"
                    className="text-xs font-semibold text-navy dark:text-zinc-200"
                  >
                    Notes Kecil (Deskripsi Card)
                  </label>
                  <span
                    className={`font-mono text-[11px] shrink-0 ${
                      note.length >= PORTFOLIO_LIMITS.NOTE_MAX
                        ? "text-amber-600 dark:text-amber-400 font-semibold"
                        : "text-zinc-400"
                    }`}
                  >
                    {note.length}/{PORTFOLIO_LIMITS.NOTE_MAX}
                  </span>
                </div>
                <textarea
                  id="portfolio-note"
                  rows={3}
                  required
                  minLength={5}
                  maxLength={PORTFOLIO_LIMITS.NOTE_MAX}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: Penyusunan Buku Putih 487 halaman siap cetak offset standar FOGRA39."
                  className="w-full rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-navy dark:text-white placeholder:text-zinc-400 focus:border-brand dark:focus:border-sky-soft focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                />
              </div>

              {/* Footnote (max 40 chars) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="portfolio-footnote"
                    className="text-xs font-semibold text-navy dark:text-zinc-200"
                  >
                    Footnote Bawah{" "}
                    <span className="font-normal text-zinc-400">(Opsional)</span>
                  </label>
                  <span className="font-mono text-[11px] text-zinc-400 shrink-0">
                    {footnote.length}/{PORTFOLIO_LIMITS.FOOTNOTE_MAX}
                  </span>
                </div>
                <input
                  id="portfolio-footnote"
                  type="text"
                  maxLength={PORTFOLIO_LIMITS.FOOTNOTE_MAX}
                  value={footnote}
                  onChange={(e) => setFootnote(e.target.value)}
                  placeholder="Contoh: PT ANTAM Tbk • 487 Hal"
                  className="w-full min-h-[44px] rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-navy dark:text-white placeholder:text-zinc-400 focus:border-brand dark:focus:border-sky-soft focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover dark:bg-sky-soft dark:hover:opacity-90 px-4 py-2.5 text-sm font-semibold text-white dark:text-navy shadow-xs transition-all disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : editingId ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Simpan Perubahan</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Tambah ke Portofolio</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Right Column: Portfolio List */}
          <section className="lg:col-span-7 xl:col-span-8 space-y-5 min-w-0">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
                <button
                  type="button"
                  onClick={() => setActiveFilter("ALL")}
                  className={`min-h-[38px] shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    activeFilter === "ALL"
                      ? "bg-navy text-white dark:bg-white dark:text-navy"
                      : "bg-white dark:bg-zinc-900 border border-[#E2E8F0] dark:border-zinc-800 text-navy-soft dark:text-zinc-300 hover:border-brand"
                  }`}
                >
                  Semua ({items.length})
                </button>
                {PORTFOLIO_CATEGORIES.map((cat) => {
                  const count = items.filter((i) => i.category === cat).length;
                  const active = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveFilter(cat)}
                      className={`min-h-[38px] shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? "bg-brand text-white dark:bg-sky-soft dark:text-navy"
                          : "bg-white dark:bg-zinc-900 border border-[#E2E8F0] dark:border-zinc-800 text-navy-soft dark:text-zinc-300 hover:border-brand"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => void fetchLatestItems()}
                className="self-start sm:self-auto inline-flex min-h-[36px] items-center gap-1.5 rounded-xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-navy-soft dark:text-zinc-300 hover:border-brand transition-colors cursor-pointer shrink-0"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${hasSyncingItems ? "animate-spin text-brand" : ""}`}
                />
                <span>Refresh</span>
              </button>
            </div>

            {filteredItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#CBD5E1] dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 p-8 sm:p-12 text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 dark:bg-sky-soft/10 text-brand dark:text-sky-soft">
                  <InstagramIcon className="h-6 w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-navy dark:text-white">
                  Belum ada item di kategori ini
                </h3>
                <p className="text-xs sm:text-sm text-navy-soft dark:text-zinc-400 max-w-md mx-auto">
                  Tambahkan link postingan Instagram melalui form untuk mulai menampilkan portofolio kurasi Anda.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {filteredItems.map((item) => {
                  const isBusy = busyItemId === item.id;
                  return (
                    <article
                      key={item.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs min-w-0"
                    >
                      {/* Clean Graphic Area — No overflowing text on graphic */}
                      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                        {item.syncStatus === "ready" && item.thumbnailUrl ? (
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.note}
                            fill
                            sizes="(max-width: 640px) 100vw, 400px"
                            className="object-cover"
                          />
                        ) : item.syncStatus === "syncing" ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2">
                            <Loader2 className="h-7 w-7 animate-spin text-brand dark:text-sky-soft" />
                            <span className="text-xs font-semibold text-navy dark:text-zinc-200">
                              Mengambil gambar dari Instagram...
                            </span>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2">
                            <AlertCircle className="h-7 w-7 text-red-500" />
                            <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                              Gagal mengambil gambar
                            </span>
                            {item.syncError && (
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 max-w-[240px]">
                                {item.syncError}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Bounded Top Bar inside Graphic */}
                        <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-2 pointer-events-none">
                          <span className="max-w-[75%] truncate rounded-full bg-white/95 dark:bg-zinc-950/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-mono font-semibold text-navy dark:text-sky-soft border border-black/5 dark:border-white/10 shadow-2xs">
                            {item.category}
                          </span>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              item.syncStatus === "ready"
                                ? "bg-emerald-600/90 text-white"
                                : item.syncStatus === "syncing"
                                  ? "bg-amber-500/90 text-white"
                                  : "bg-red-600/90 text-white"
                            }`}
                          >
                            {item.syncStatus === "ready"
                              ? "Aktif"
                              : item.syncStatus === "syncing"
                                ? "Sync"
                                : "Gagal"}
                          </span>
                        </div>
                      </div>

                      {/* Card Body & Actions */}
                      <div className="flex flex-col flex-grow justify-between p-4 gap-3 min-w-0">
                        <div className="space-y-1.5 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-navy dark:text-zinc-200 line-clamp-2 break-words leading-relaxed">
                            {item.note}
                          </p>
                          {item.footnote && (
                            <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                              {item.footnote}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#F1F5F9] dark:border-zinc-800">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => startEditing(item)}
                              disabled={isBusy}
                              className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-[#E2E8F0] dark:border-zinc-700 px-2.5 py-1.5 text-xs font-semibold text-navy dark:text-zinc-200 hover:border-brand hover:text-brand transition-colors cursor-pointer"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </button>

                            {item.syncStatus === "failed" && (
                              <button
                                type="button"
                                onClick={() => void handleRetrySync(item.id)}
                                disabled={isBusy}
                                className="inline-flex min-h-[36px] items-center gap-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-2.5 py-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition-colors cursor-pointer"
                              >
                                <RefreshCw className="h-3.5 w-3.5" />
                                <span>Ulangi</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => void handleDelete(item.id)}
                              disabled={isBusy}
                              aria-label="Hapus item"
                              className="inline-flex min-h-[36px] items-center justify-center rounded-lg border border-red-200/80 dark:border-red-900/50 px-2.5 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <a
                            href={item.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-brand dark:text-sky-soft hover:underline shrink-0"
                          >
                            <span>IG</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Credentials Modal */}
      {isCredModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pengaturan Kredensial Admin"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCredModalOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-bold text-navy dark:text-white">
                Ubah Username & Password
              </h2>
              <button
                type="button"
                onClick={() => setIsCredModalOpen(false)}
                aria-label="Tutup modal"
                className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-navy-soft dark:text-zinc-400 leading-relaxed">
              Kredensial di-hash (`scrypt`) dan dienkripsi (`AES-256-GCM`) sebelum disimpan ke Vercel Blob.
            </p>

            {credError && (
              <div className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3.5 py-2.5 text-xs text-red-700 dark:text-red-300">
                {credError}
              </div>
            )}

            {credSuccess && (
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                {credSuccess}
              </div>
            )}

            <form onSubmit={handleSaveCredentials} className="space-y-3.5">
              <div className="space-y-1">
                <label
                  htmlFor="cred-current-pass"
                  className="block text-xs font-semibold text-navy dark:text-zinc-200"
                >
                  Password Saat Ini
                </label>
                <input
                  id="cred-current-pass"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full min-h-[42px] rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="cred-new-user"
                  className="block text-xs font-semibold text-navy dark:text-zinc-200"
                >
                  Username Baru
                </label>
                <input
                  id="cred-new-user"
                  type="text"
                  required
                  minLength={3}
                  maxLength={32}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full min-h-[42px] rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="cred-new-pass"
                  className="block text-xs font-semibold text-navy dark:text-zinc-200"
                >
                  Password Baru (Min. 8 karakter)
                </label>
                <input
                  id="cred-new-pass"
                  type="password"
                  required
                  minLength={8}
                  maxLength={72}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full min-h-[42px] rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCredModalOpen(false)}
                  className="min-h-[42px] rounded-xl border border-[#E2E8F0] dark:border-zinc-700 px-4 py-2 text-xs font-semibold text-navy-soft dark:text-zinc-300 cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  disabled={isSavingCreds}
                  className="min-h-[42px] inline-flex items-center gap-2 rounded-xl bg-brand dark:bg-sky-soft px-4 py-2 text-xs font-semibold text-white dark:text-navy disabled:opacity-60 cursor-pointer"
                >
                  {isSavingCreds && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Simpan Kredensial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
