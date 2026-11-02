import { PACKAGES_COPY } from "@/lib/copywriting";

/**
 * Service packages types & data (texts centralized in lib/copywriting.ts).
 */

export type TierId = "bronze" | "silver" | "gold";

export interface PackageTier {
  id: TierId;
  label: string; // small badge, e.g. "Paket Standar"
  name: string; // e.g. "Tier Bronze"
  priceRange: string; // e.g. "Rp 15k–25k"
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ServicePackage {
  id: "layout-buku" | "presentasi" | "poster";
  number: string;
  tabLabel: string;
  title: string;
  summary: string;
  formatChip: string;
  unit: string; // e.g. "/hal"
  unitLabel: string; // human readable, e.g. "per halaman"
  tiers: PackageTier[];
}

export const SERVICE_PACKAGES: ServicePackage[] = PACKAGES_COPY.services;
