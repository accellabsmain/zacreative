import { z } from "zod";

export const PORTFOLIO_CATEGORIES = [
  "Desain Layout Buku",
  "Desain PPT",
  "Desain Poster",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export const PORTFOLIO_LIMITS = {
  NOTE_MAX: 120,
  FOOTNOTE_MAX: 40,
} as const;

export type PortfolioSyncStatus = "syncing" | "ready" | "failed";

export interface PortfolioItem {
  id: string;
  instagramUrl: string;
  shortcode: string;
  category: PortfolioCategory;
  note: string;
  footnote: string;
  overlayLabel?: string;
  thumbnailUrl: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  syncStatus: PortfolioSyncStatus;
  syncError?: string;
  createdAt: string;
  updatedAt: string;
}

const IG_SHORTCODE_REGEX =
  /^https?:\/\/(?:www\.)?instagram\.com\/(?:[^/]+\/)?(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)\/?/i;

export function extractInstagramShortcode(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  const match = trimmed.match(IG_SHORTCODE_REGEX);
  return match?.[1] ?? null;
}

export function normalizeInstagramPermalink(rawUrl: string): {
  permalink: string;
  shortcode: string;
  inferredType: "IMAGE" | "VIDEO";
} | null {
  const trimmed = rawUrl.trim();
  const shortcode = extractInstagramShortcode(trimmed);
  if (!shortcode) return null;

  const isReel = /\/(?:reel|reels|tv)\//i.test(trimmed);
  const pathSegment = isReel ? "reel" : "p";

  return {
    permalink: `https://www.instagram.com/${pathSegment}/${shortcode}/`,
    shortcode,
    inferredType: isReel ? "VIDEO" : "IMAGE",
  };
}

export const portfolioCreateSchema = z.object({
  instagramUrl: z
    .string()
    .trim()
    .min(1, { message: "Link Instagram wajib diisi." })
    .refine((val) => extractInstagramShortcode(val) !== null, {
      message:
        "Masukkan link postingan/Reels Instagram yang valid (contoh: https://www.instagram.com/p/xxxxx/).",
    }),
  category: z.enum(PORTFOLIO_CATEGORIES, {
    message: "Pilih salah satu kategori layanan.",
  }),
  note: z
    .string()
    .trim()
    .min(5, { message: "Catatan singkat minimal 5 karakter." })
    .max(PORTFOLIO_LIMITS.NOTE_MAX, {
      message: `Catatan maksimal ${PORTFOLIO_LIMITS.NOTE_MAX} karakter.`,
    }),
  footnote: z
    .string()
    .trim()
    .max(PORTFOLIO_LIMITS.FOOTNOTE_MAX, {
      message: `Footnote maksimal ${PORTFOLIO_LIMITS.FOOTNOTE_MAX} karakter.`,
    })
    .optional()
    .default(""),
});

export const portfolioUpdateSchema = portfolioCreateSchema.partial().extend({
  id: z.string().min(1),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Username wajib diisi." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
});

export const changeCredentialsSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Password saat ini wajib diisi." }),
  newUsername: z
    .string()
    .trim()
    .min(3, { message: "Username baru minimal 3 karakter." })
    .max(32, { message: "Username maksimal 32 karakter." }),
  newPassword: z
    .string()
    .min(8, { message: "Password baru minimal 8 karakter." })
    .max(72, { message: "Password maksimal 72 karakter." }),
});

export type PortfolioCreateInput = z.infer<typeof portfolioCreateSchema>;
export type PortfolioUpdateInput = z.infer<typeof portfolioUpdateSchema>;
