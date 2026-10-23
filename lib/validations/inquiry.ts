import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Nama lengkap minimal 2 karakter." })
    .max(100, { message: "Nama lengkap maksimal 100 karakter." }),
  email: z
    .string()
    .email({ message: "Format alamat email tidak valid." }),
  organization: z
    .string()
    .max(100, { message: "Nama organisasi/perusahaan maksimal 100 karakter." })
    .optional()
    .or(z.literal("")),
  serviceType: z.enum(
    [
      "layout_buku",
      "presentasi",
      "poster_kampanye",
      "identitas_visual",
      "lainnya",
    ],
    {
      message: "Silakan pilih salah satu kategori layanan.",
    }
  ),
  timeline: z.enum(
    ["urgent", "standar", "fleksibel"],
    {
      message: "Silakan tentukan estimasi timeline pengerjaan.",
    }
  ),
  estimatedBudget: z.enum(
    ["tier_1", "tier_2", "tier_3", "diskusi"],
    {
      message: "Silakan pilih estimasi alokasi anggaran.",
    }
  ),
  projectScope: z
    .string()
    .min(10, { message: "Deskripsikan kebutuhan proyek Anda minimal 10 karakter." })
    .max(2000, { message: "Deskripsi maksimal 2000 karakter." }),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
