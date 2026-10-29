# Panduan Setup Autofetch Portofolio Instagram (`@zacreative.id`)

Bagian **Portofolio** di landing page mengambil 8 post terbaru dari Instagram secara otomatis di sisi server (`lib/instagram.ts`) dengan revalidasi tiap **1 jam** (ISR). Selama token belum dipasang atau jika API sedang gangguan, situs otomatis menampilkan data lokal dari `lib/data/instagram-fallback.ts` sehingga halaman tidak pernah kosong.

---

## Opsi A — Instagram API Resmi (Direkomendasikan)

> **Catatan penting:** Meta telah menghentikan *Instagram Basic Display API* sejak Desember 2024. Gunakan **Instagram API with Instagram Login**, yang mewajibkan akun IG berjenis **Professional (Business atau Creator)**.

### 1. Pastikan Akun Instagram Professional
1. Buka aplikasi Instagram (`@zacreative.id`) → **Settings and activity** → **Account type and tools**.
2. Pilih **Switch to professional account** → pilih **Business** atau **Creator**.

### 2. Buat Meta App & Ambil Long-Lived Token
1. Masuk ke [Meta for Developers](https://developers.facebook.com/apps/) → **Create App** → pilih tipe **Business** / **Other**.
2. Tambahkan produk **Instagram** → buka menu **API setup with Instagram login**.
3. Tambahkan akun `@zacreative.id` sebagai *Instagram Tester* lalu setujui undangan di aplikasi IG (**Settings → Website permissions → Apps and websites → Tester Invites**).
4. Di halaman **API setup with Instagram login**, klik **Generate token** pada akun `@zacreative.id` untuk memperoleh **Long-Lived Access Token** (berlaku 60 hari).

### 3. Simpan Variabel Environment
Tambahkan ke `.env.local` (untuk lokal) dan ke **Environment Variables** di dashboard hosting (mis. Vercel):

```bash
# Token Instagram Graph API (berlaku 60 hari)
INSTAGRAM_ACCESS_TOKEN="IGAA..."

# Secret acak untuk mengamankan endpoint cron refresh token
CRON_SECRET="ganti-dengan-string-acak-minimal-32-karakter"

# Opsional: Upstash Redis / Vercel KV agar token hasil perpanjangan otomatis tersimpan
UPSTASH_REDIS_REST_URL="https://xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AXxx..."
```

### 4. Jadwalkan Cron Refresh Mingguan (Opsional tapi Disarankan)
Token berumur 60 hari dapat diperpanjang otomatis sebelum kedaluwarsa lewat endpoint:

```
GET /api/cron/refresh-instagram-token
Authorization: Bearer <CRON_SECRET>
```

Jika menggunakan **Vercel**, tambahkan file `vercel.json` di root proyek:

```json
{
  "crons": [
    {
      "path": "/api/cron/refresh-instagram-token",
      "schedule": "0 3 * * 1"
    }
  ]
}
```

Vercel akan mengirimkan header `Authorization: Bearer <CRON_SECRET>` secara otomatis setiap hari Senin pukul 03:00 UTC. Bila `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` diisi, token baru langsung disimpan ke key `instagram:access_token` dan dipakai oleh `lib/instagram.ts` tanpa perlu redeploy.

---

## Opsi B — JSON Feed Pihak Ketiga (Mis. Behold.so, Setup 5 Menit)

Jika tidak ingin mengurus Meta App dan refresh token:
1. Buat feed gratis di [Behold.so](https://behold.so/) lalu hubungkan `@zacreative.id`.
2. Salin URL JSON feed yang diberikan, lalu pasang di environment variable:

```bash
INSTAGRAM_FEED_URL="https://feeds.behold.so/xxxxxxxx"
```

Jika `INSTAGRAM_FEED_URL` terisi, `lib/instagram.ts` akan memprioritaskan feed tersebut dengan cache revalidasi 1 jam yang sama.

