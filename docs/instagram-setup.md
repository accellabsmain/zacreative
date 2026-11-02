# Panduan Setup Autofetch & Sync Portofolio Instagram (`@zacreative.id`)

Fitur sinkronisasi Instagram Feed di ZaCreative mengintegrasikan **Instagram Graph API (v21.0)**, **Vercel Blob Storage**, dan **Database (Prisma ORM)** yang dijalankan otomatis setiap hari melalui **Vercel Cron**. Seluruh aset gambar dipindahkan ke Vercel Blob untuk menghindari masalah expired URL dari Meta CDN, dan media yang berumur > 7 hari dibersihkan otomatis agar storage hemat dan efisien.

---

## 1. Arsitektur Sinkronisasi

```mermaid
flowchart TD
    CRON["Vercel Cron (00:00 UTC)"] -->|"GET /api/cron/sync-instagram (Bearer CRON_SECRET)"| API["Route Handler"]
    API --> CLEANUP["1. Cleanup Job: Cek post > 7 hari di DB -> del() Blob -> hapus record DB"]
    API --> GRAPH["2. Fetch IG Graph API (/v21.0/{INSTAGRAM_USER_ID}/media limit=5)"]
    GRAPH --> STREAM["3. Stream imageRes.body -> put() Vercel Blob (ig-feed/{postId}-{i}.jpg)"]
    STREAM --> DB["4. Simpan record InstagramPost ke Database"]
    DB --> REVAL["5. revalidatePath('/') -> Cache diperbarui"]
    REVAL --> FE["Frontend Feed (Grid 3 Kolom + Carousel Modal Interaktif)"]
```

---

## 2. Environment Variables yang Dibutuhkan

Pastikan variabel-variabel berikut sudah diset di `.env.local` dan di dashboard Vercel (**Settings → Environment Variables**):

```bash
# Instagram Graph API
INSTAGRAM_USER_ID="178414..."               # Instagram Business Account User ID
INSTAGRAM_ACCESS_TOKEN="IGAA..."            # Long-Lived User Access Token (60 hari)

# Keamanan Vercel Cron
CRON_SECRET="ganti-dengan-string-acak-minimal-32-karakter"

# Vercel Blob Storage (otomatis terisi jika menghubungkan Vercel Blob di dashboard)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Database URL (PostgreSQL / Neon / Supabase / Vercel Postgres)
DATABASE_URL="postgresql://user:pass@host:5432/zacreative?sslmode=require"

# Opsional: Upstash Redis KV untuk rotasi token otomatis mingguan
UPSTASH_REDIS_REST_URL="https://xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AXxx..."
```

---

## 3. Skema Database (Prisma)

Tabel `InstagramPost` didefinisikan pada `prisma/schema.prisma`:

```prisma
model InstagramPost {
  id          String   @id @default(uuid())
  igPostId    String   @unique
  caption     String?  @db.Text
  permalink   String
  publishedAt DateTime
  slides      Json     // Array of { id: string, type: string, url: string }
  createdAt   DateTime @default(now())

  @@index([publishedAt])
}
```

Migrasi SQL tersedia di `prisma/migrations/20261029000000_init_instagram_post/migration.sql`.
Untuk menjalankan migrasi ke database yang terhubung:
```bash
bunx prisma migrate deploy
```

---

## 4. Jadwal Vercel Cron (`vercel.json`)

Konfigurasi di root proyek:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-instagram",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/refresh-instagram-token",
      "schedule": "0 3 * * 1"
    }
  ]
}
```

1. **`/api/cron/sync-instagram`**: Dijalankan setiap hari pukul 00:00 UTC untuk sinkronisasi feed terbaru, upload ke Vercel Blob, dan pembersihan aset berumur > 7 hari.
2. **`/api/cron/refresh-instagram-token`**: Dijalankan setiap Senin pukul 03:00 UTC untuk memperpanjang token 60 hari sebelum kedaluwarsa.

---

## 5. Fitur Frontend

Komponen feed berada di `components/sections/InstagramFeed.tsx` dan terintegrasi di `components/sections/PortfolioSection.tsx`:
- **Grid Responsif**: 3 kolom di desktop (`lg:grid-cols-3`), 1–2 kolom di mobile/tablet (`grid-cols-1 sm:grid-cols-2`).
- **Card Interaktif**: Thumbnail utama dari Vercel Blob, indikator badge carousel (`x Slides`) atau Reels (`Reels`), cuplikan caption, serta link ke permalink Instagram asli.
- **Penampil Slide Multi-Carousel (Modal)**: Modal interaktif dengan tombol navigasi Next/Prev, indikator titik slide, counter (`Slide 1 dari 4`), pintasan keyboard (`Esc`, `ArrowLeft`, `ArrowRight`), dan tombol langsung "Buka di Instagram".
- **Fallback Graceful**: Dilengkapi `InstagramFeedSkeleton` (loading state) dan `InstagramFeedEmpty` (empty state), serta fallback data lokal berstruktur sama sehingga halaman tidak pernah kosong.
