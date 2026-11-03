"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error || "Login gagal. Periksa kembali kredensial Anda.");
        setIsSubmitting(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Gagal terhubung ke server. Periksa koneksi internet Anda.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex min-h-[40px] items-center gap-2 text-xs sm:text-sm font-semibold text-navy-soft dark:text-zinc-400 hover:text-brand dark:hover:text-sky-soft transition-colors"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="rounded-2xl border border-[#E2E8F0] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 dark:bg-sky-soft/10 text-brand dark:text-sky-soft">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-navy dark:text-white">
              Login Dashboard Portofolio
            </h1>
            <p className="text-xs sm:text-sm text-navy-soft dark:text-zinc-400 leading-relaxed">
              Masuk untuk mengelola kurasi portofolio Instagram ZaCreative.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3.5 py-3 text-xs sm:text-sm text-red-700 dark:text-red-300 break-words"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-username"
                className="block text-xs sm:text-sm font-semibold text-navy dark:text-zinc-200"
              >
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full min-h-[44px] rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-navy dark:text-white placeholder:text-zinc-400 focus:border-brand dark:focus:border-sky-soft focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs sm:text-sm font-semibold text-navy dark:text-zinc-200"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full min-h-[44px] rounded-xl border border-[#CBD5E1] dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-3.5 pr-11 py-2.5 text-sm text-navy dark:text-white placeholder:text-zinc-400 focus:border-brand dark:focus:border-sky-soft focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:text-navy dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover dark:bg-sky-soft dark:hover:opacity-90 px-4 py-2.5 text-sm font-semibold text-white dark:text-navy shadow-xs transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
