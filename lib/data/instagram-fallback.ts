import { PORTFOLIO_COPY } from "@/lib/copywriting";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export interface InstagramSlide {
  id: string;
  type: string;
  url: string;
}

export interface InstagramPost {
  id: string;
  caption: string;
  mediaType: InstagramMediaType;
  imageUrl: string;
  permalink: string;
  timestamp: string;
  categoryTag?: string;
  footnote?: string;
  slides?: InstagramSlide[];
}

/**
 * Local fallback posts (6 items, centralized in lib/copywriting.ts) displayed when
 * INSTAGRAM_ACCESS_TOKEN is not yet configured, database is syncing, or Graph API is unreachable.
 */
export const INSTAGRAM_FALLBACK_POSTS: InstagramPost[] = PORTFOLIO_COPY.fallbackPosts;
