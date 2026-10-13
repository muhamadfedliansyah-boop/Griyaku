# DESIGN.md — Griyaku Design System

> Marketplace alat rumah tangga · **Web**: Next.js + TypeScript + Tailwind + GSAP · **Mobile**: Kotlin + Jetpack Compose
> Versi 1.0. Dokumen ini adalah **sumber kebenaran visual**. Jika kode dan dokumen berbeda, perbarui salah satunya di PR yang sama.

| | |
|---|---|
| Nama kerja | **Griyaku** (placeholder, ganti sesuai merek Anda; cari `Griyaku` di seluruh repo) |
| Warna utama | **`#006A4E`** (hijau) |
| Referensi web | `docs/reference/ref-web.png` (foto 1): hero tipografi raksasa, produk miring menimpa judul, kartu kategori |
| Referensi mobile | `docs/reference/ref-mobile.png` (foto 2): kartu angka, ulasan, FAQ, langkah 01/02/03, ilustrasi |
| Pola produk | Marketplace multi-toko ala Tokopedia (kategori ikon, flash sale, kartu produk, toko resmi, keranjang per toko) |

---

## 0. Cara memakai dokumen ini

- **AI agent**: baca bagian 1–5 dulu (prinsip, referensi, token), lalu bagian komponen/motion sesuai platform. Jangan menambah warna, font, atau radius di luar token.
- **Manusia**: bagian 2 menjelaskan *kenapa* tampilannya begitu; bagian 14 adalah checklist review visual.
- Token ada tiga lapis: **primitif** (`brand-500`) → **semantik** (`color-primary`) → **komponen** (`button-primary-bg`). Komponen hanya boleh memakai token semantik.

---

## 1. Prinsip & mood

1. **Bold di pintu depan, tenang di jalur transaksi.** Halaman pemasaran (beranda, kampanye, profil toko, bantuan) boleh ekspresif: tipografi raksasa, blok warna penuh, animasi. Halaman transaksi (pencarian, detail produk, keranjang, checkout, pesanan) harus tenang: latar putih/canvas, aksen hijau, informasi padat tetapi lega.
2. **Minimalis berarti sedikit elemen, bukan sedikit karakter.** Satu warna dominan (hijau), satu aksen hangat (kuning), banyak ruang kosong, satu "momen" animasi per layar.
3. **Produk adalah pahlawan.** Foto cutout besar, bayangan lembut, dikelilingi ruang.
4. **Bulat dan ramah.** Radius besar (24–40 px), tombol pill, ilustrasi datar yang playful.
5. **Cepat dan aksesibel.** Animasi tidak boleh merusak LCP/INP; kontras ≥ 4.5:1; hormati `prefers-reduced-motion`.
6. **Rasa Tokopedia, bukan salinan.** Pakai pola mental yang sudah dikenal pengguna Indonesia, dengan bahasa visual Griyaku sendiri.

Kata kunci mood: *hangat, segar, percaya diri, rapi, sedikit nakal*.

---

## 2. Analisis referensi

![Referensi web](docs/reference/ref-web.png)
![Referensi mobile](docs/reference/ref-mobile.png)

> **Catatan hak cipta:** jangan menyalin logo, nama merek, teks, maupun ilustrasi karakter dari foto referensi. Yang diadopsi hanya **struktur tata letak dan bahasa visual**. Semua ilustrasi dan aset harus orisinal atau berlisensi.

### 2.1 Foto 1 → Web

| Elemen di foto 1 | Terjemahan ke Griyaku |
|---|---|
| Latar biru kobalt penuh (full-bleed) | Hijau `brand-500` `#006A4E` penuh pada hero |
| Judul putih raksasa bergaya tulisan tangan yang "menetes" | "Rumah ▢ Nyaman": display 800, putih, tracking rapat, mixed case; tetesan/percikan SVG kuning sebagai dekor |
| Botol produk miring ±20° menimpa tengah judul | Produk cutout (air fryer / blender / rice cooker) miring −16°, `z-index` di atas judul, melayang halus |
| Lencana bulat gelap ("Vegan") di samping produk | Lencana bulat `brand-800` "Garansi Resmi" + ikon centang |
| Tombol pill kuning "Shop now" | Pill `sun-400`, teks `ink-900`: **Belanja sekarang →** |
| Nav minimal: logo kiri, 4 tautan tengah, tombol outline pill kanan | Sama, ditambah ikon cari + keranjang. Transparan di atas hero, jadi bar putih saat scroll |
| Tagline kiri bawah | "Alat rumah tangga pilihan, untuk semua rumah." |
| Deretan kartu kategori, terpotong di tepi kanan, produk menembus tepi atas kartu; warna kartu navy gelap / periwinkle / putih | Kartu **Dapur** (`brand-800`), **Kebersihan** (`mint-200`), **Elektronik Rumah** (`sun-400`); scroller horizontal dengan *peek* |
| Percikan putih di kiri bawah | Percikan SVG kecil `mint-200` |

### 2.2 Foto 2 → Mobile

| Elemen di foto 2 | Terjemahan ke Griyaku |
|---|---|
| Blok "in numbers": kartu statistik besar (4.8 / 95% / 100K / 10M+) + ilustrasi + lencana penghargaan | **"Toko dalam angka"** (profil toko) dan **"Griyaku dalam angka"** (Tentang): 4 kartu statistik dengan count-up + stiker "Terpercaya" |
| Bagian "Reviews": kartu ulasan, avatar berhias, nama, kutipan, "Read full →" | Kartu ulasan: avatar + lencana "Pembeli terverifikasi", bintang, kutipan 3 baris, **Baca selengkapnya →** |
| FAQ: baris accordion, pertanyaan tebal, tombol panah bulat di kanan, ilustrasi di sisi | **Pusat Bantuan**: accordion + tombol panah bulat, ilustrasi di sisi |
| 3 langkah bernomor **01 02 03** dengan mockup ponsel di atas latar gelap | **Onboarding** dan **alur pesanan**: tiga langkah bernomor besar + mockup layar/ilustrasi |
| Palet biru kobalt dan navy gelap berselang-seling, kartu lebih terang | `brand-500` dan `brand-800` berselang-seling, kartu `brand-400`/`mint`, stiker `sun-400` / `pink-300` / `coral-400` |
| Ilustrasi datar playful | Ilustrasi **orisinal** bergaya serupa (lihat bagian 10) |

---

## 3. Token warna

### 3.1 Definisi (Tailwind CSS v4, `apps/web/src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  /* Brand: hijau #006A4E sebagai brand-500 */
  --color-brand-50:  #F0F6F4;
  --color-brand-100: #DBEAE6;
  --color-brand-200: #B8D5CD;
  --color-brand-300: #85B7AA;
  --color-brand-400: #4C9783;
  --color-brand-500: #006A4E;
  --color-brand-600: #005B43;
  --color-brand-700: #004A37;
  --color-brand-800: #003527;
  --color-brand-900: #00241B;
  --color-brand-950: #001510;

  /* Mint: kartu terang, padanan "periwinkle" di foto 1 */
  --color-mint-100: #E3F6EF;
  --color-mint-200: #BFEBDD;
  --color-mint-300: #8FDCC1;

  /* Aksen hangat */
  --color-sun-300:   #FFE27A;
  --color-sun-400:   #FFD23F;   /* CTA kuning, padanan "Shop now" */
  --color-sun-500:   #F5BC12;
  --color-coral-100: #FFEDE8;
  --color-coral-400: #FF6A4D;   /* hanya isian, bukan teks */
  --color-coral-600: #C73A1E;   /* teks diskon / error */
  --color-pink-300:  #FFB3C7;   /* stiker & ilustrasi */

  /* Netral bernuansa hijau */
  --color-ink-900: #0B1F18;
  --color-ink-700: #2B3F37;
  --color-ink-500: #5A6B64;     /* teks sekunder terendah yang lolos AA */
  --color-ink-300: #A9B5B0;     /* dekor/disabled, JANGAN untuk teks */
  --color-line:    #E3EAE6;
  --color-canvas:  #F4F7F5;
  --color-paper:   #FFFFFF;

  /* Status */
  --color-success: #1A7F4B;
  --color-info:    #1D6FD8;
  --color-warning: #8A5A00;
  --color-danger:  #C73A1E;

  /* Semantik */
  --color-primary:        var(--color-brand-500);
  --color-primary-hover:  var(--color-brand-600);
  --color-on-primary:     #FFFFFF;
  --color-cta:            var(--color-sun-400);
  --color-on-cta:         var(--color-ink-900);
  --color-surface-dark:   var(--color-brand-800);

  /* Radius */
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-2xl: 40px;

  /* Bayangan lembut (bertinta hijau, bukan abu-abu) */
  --shadow-card: 0 1px 2px rgb(0 36 27 / 0.06), 0 8px 24px -8px rgb(0 36 27 / 0.12);
  --shadow-pop:  0 2px 4px rgb(0 36 27 / 0.08), 0 24px 48px -12px rgb(0 36 27 / 0.28);
  --shadow-product: 0 40px 60px -20px rgb(0 21 16 / 0.45);

  /* Easing */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);
}

/* Font dari next/font (lihat bagian 4) */
@theme inline {
  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-jakarta), ui-sans-serif, system-ui, sans-serif;
}
```

### 3.2 Peran warna

| Peran | Token | Dipakai untuk |
|---|---|---|
| Latar hero / blok merek | `brand-500` | Hero beranda, header mobile, blok statistik |
| Latar blok gelap | `brand-800` | Kartu kategori gelap, blok ulasan, footer (`brand-900`) |
| Kartu terang | `mint-200`, `mint-100` | Kartu kategori, kartu ulasan di blok gelap |
| CTA utama di atas hijau | `sun-400` + teks `ink-900` | "Belanja sekarang", "Beli langsung" |
| CTA utama di atas putih | `brand-500` + teks putih | "Checkout", "Bayar" |
| Latar halaman transaksi | `canvas`, kartu `paper` | Pencarian, PDP, keranjang, checkout |
| Diskon / label promo | isian `coral-400` + teks `ink-900`, atau teks `coral-600` di `coral-100` | Chip "-25%", "Flash Sale" |
| Teks utama / sekunder | `ink-900` / `ink-500` | Semua teks |

### 3.3 Kontras (dihitung WCAG 2.x)

| Pasangan | Rasio | Catatan |
|---|---|---|
| Putih di `brand-500` | **6.62** | Tombol primer, hero |
| `ink-900` di `sun-400` | **11.89** | Tombol CTA kuning |
| `sun-400` di `brand-500` | 4.59 | Hanya teks besar/tebal (≥ 18 px bold) |
| `sun-400` di `brand-800` | 9.45 | Aksen di blok gelap |
| Putih di `brand-800` | 13.65 | Teks di blok gelap |
| `brand-500` di putih | 6.62 | Tautan, harga promo |
| `brand-500` di `mint-200` | 5.09 | Teks di kartu mint |
| `ink-500` di putih | 5.64 | Teks sekunder |
| `coral-600` di putih | 5.18 | Teks diskon / error |
| `ink-900` di `coral-400` | 6.07 | Chip isian |
| `coral-400` di putih | **2.83 ❌** | Dilarang sebagai warna teks |
| `ink-300` di putih | 2.12 ❌ | Hanya dekor |
| `sun-500` di putih | 1.74 ❌ | Hanya ikon bintang; **wajib** disertai angka rating (jangan andalkan warna saja) |

### 3.4 Aturan pemakaian warna

- Maksimal **3 rona** per layar: hijau + kuning + satu dari (mint / coral / pink).
- Warna `sun-400` adalah **satu-satunya** CTA kuning per viewport.
- Jangan memakai gradien warna-warni. Boleh gradien hijau tipis (`brand-500` → `brand-600`) pada hero.
- Mode gelap penuh opsional (fase akhir): `canvas` → `brand-950`, `paper` → `brand-900`, aksen tetap `sun-400`.

---

## 4. Tipografi

| Peran | Font | Sumber |
|---|---|---|
| Display (judul hero, angka besar, 01/02/03) | **Bricolage Grotesque**, bobot 700–800 | Google Fonts via `next/font/google` |
| UI dan isi | **Plus Jakarta Sans**, bobot 400/500/600/700/800 | Google Fonts, dibuat di Indonesia, nyaman untuk teks Bahasa Indonesia |

Alternatif display bila ingin lebih "tulisan tangan ala foto 1": *Fredoka* 700 atau *Baloo 2* 800. Jangan memakai lebih dari satu font display.

```ts
// apps/web/src/app/fonts.ts
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
```

### 4.1 Skala (web)

| Token | Ukuran | Line-height | Tracking | Bobot | Dipakai |
|---|---|---|---|---|---|
| `text-hero` | `clamp(6rem, 20vw, 20rem)` | 0.82 | −0.04em | 800 display | Judul hero beranda |
| `text-h1` | `clamp(2.5rem, 6vw, 4.5rem)` | 1.02 | −0.03em | 800 display | Judul halaman pemasaran |
| `text-h2` | `clamp(2rem, 4vw, 3.25rem)` | 1.05 | −0.02em | 700 display | Judul section |
| `text-h3` | 1.5rem | 1.33 | −0.01em | 700 sans | Judul kartu |
| `text-body-lg` | 1.125rem | 1.65 | 0 | 400 | Paragraf pembuka |
| `text-body` | 1rem | 1.5 | 0 | 400 | Isi |
| `text-sm` | 0.875rem | 1.43 | 0 | 500 | Meta, label |
| `text-caption` | 0.75rem | 1.33 | 0.01em | 500 | Minimum absolut |

Tambahkan di `@theme`: `--text-hero: clamp(6rem, 20vw, 20rem); --text-hero--line-height: 0.82; --text-hero--letter-spacing: -0.04em;` agar utilitas `text-hero` tersedia.

### 4.2 Aturan

- **Harga** selalu `font-sans`, bobot 700–800, `tabular-nums`, format `Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })` → `Rp 349.000`.
- Judul hero harus berupa **teks asli** (bukan gambar) demi SEO dan aksesibilitas. Efek tetesan dibuat dengan SVG dekor terpisah, bukan filter pada teks (mahal untuk GPU).
- Panjang baris isi ≤ 70 karakter. Hindari rata kanan-kiri (justify).
- Angka besar (statistik) memakai font display + `tabular-nums`.

---

## 5. Spasi, grid, radius, elevasi

- **Basis 4 px.** Skala: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Kontainer**: maks 1280 px, gutter 16 px (mobile) / 24 px (≥ md) / 32 px (≥ xl). Hero dan blok warna **full-bleed**, isinya tetap di kontainer.
- **Grid**: 4 kolom (mobile), 8 (tablet), 12 (desktop). Grid produk: **2 / 3 / 4 / 5** kolom pada `base / md / lg / xl`.
- **Irama vertikal section**: 96 px (desktop), 64 px (tablet), 48 px (mobile).
- **Radius**: kartu 24–32 px, kartu hero/kategori 32–40 px, input 16 px, tombol dan chip **pill** (`rounded-full`), gambar produk 20 px.
- **Elevasi**: kartu putih pada canvas memakai `shadow-card`; elemen melayang (dropdown, toast) memakai `shadow-pop`; produk cutout di hero memakai `shadow-product` sebagai bayangan lantai (elips blur di bawah produk).
- **Border**: 1 px `line`. Hindari kombinasi border + bayangan tebal sekaligus.

---

## 6. Komponen web

### 6.1 Tombol

| Varian | Latar | Teks | Dipakai |
|---|---|---|---|
| `cta` | `sun-400` | `ink-900` | CTA di atas hijau (hero), maks 1 per viewport |
| `primary` | `brand-500` (hover `brand-600`) | putih | Aksi utama di halaman putih |
| `outline` | transparan, border 1.5 px | putih (di hijau) / `brand-500` (di putih) | Aksi sekunder, "Masuk" |
| `ghost` | transparan | `ink-700` | Aksi tersier |
| `danger` | `coral-600` | putih | Hapus, batalkan |

Semua **pill**, tinggi 40 / 48 / 56 px, padding horizontal 20–32 px, ikon panah `→` 16 px di kanan untuk CTA. Hover: naik 2 px + bayangan; tekan: `scale(0.98)`. Fokus: ring 3 px `sun-400` dengan offset 2 px (di atas hijau) atau `brand-500` (di atas putih). Tombol *magnetic* (GSAP) hanya untuk CTA hero.

### 6.2 Header / Navigasi

- **State A (di atas hero)**: transparan, teks putih; logo kiri, tautan tengah (Kategori, Promo, Toko Resmi, Bantuan), kanan: ikon cari, ikon keranjang + badge, tombol `outline` "Masuk".
- **State B (setelah scroll 80 px)**: bar putih, `shadow-card`, tinggi 64 px, *search bar* pill lebar penuh di tengah (gaya Tokopedia), kategori jadi menu *mega*. Transisi 300 ms (GSAP ScrollTrigger `toggleClass`).
- Di halaman transaksi, header langsung State B.
- Mobile web: logo + cari + keranjang; menu lewat *bottom sheet*.

### 6.3 Pencarian

Pill 48 px, ikon kaca pembesar, placeholder "Cari air fryer, blender, panci…". Dropdown saran: riwayat, saran otomatis (debounce 200 ms), kategori. Tombol `/` memfokuskan input.

### 6.4 Kartu kategori (meniru foto 1)

- Lebar 280–320 px, tinggi 220 px, radius 32 px, padding 24 px.
- Teks kiri atas: nama (display 700, 28 px), di bawahnya "mulai Rp 49 rb" (sm).
- Foto produk cutout **menembus tepi atas** kartu (offset −24 px) dan sedikit miring (−8°).
- Warna bergantian: `brand-800` (teks putih), `mint-200` (teks `ink-900`), `sun-400` (teks `ink-900`).
- Scroller horizontal dengan `scroll-snap-type: x mandatory`, kartu terakhir terpotong (peek 15%).
- Hover: kartu naik 6 px, produk miring bertambah 4° (GSAP/CSS).

### 6.5 Kartu produk (pola Tokopedia)

```
┌────────────────────┐
│  [foto 1:1, r-20]  │  ← badge kiri atas: "Flash Sale" / "-25%"
│                 ♡  │  ← wishlist, kanan atas
├────────────────────┤
│ Air Fryer 4L Digit…│  ← 2 baris, clamp
│ Rp 349.000         │  ← 700, brand-500 jika promo
│ Rp 459.000  -24%   │  ← coret ink-500 + chip coral-100/coral-600
│ ✔ Toko Resmi · Bdg │  ← ikon centang brand, lokasi
│ ★ 4,9 · 1,2 rb+ terjual │
│ [Gratis Ongkir]    │  ← label kecil mint-100/brand-700
└────────────────────┘
```

Radius 24 px, `paper`, `shadow-card` saat hover. Seluruh kartu adalah satu tautan (satu target fokus). Gambar `next/image` dengan `sizes` benar, `placeholder="blur"`.

### 6.6 Komponen lain

| Komponen | Spesifikasi singkat |
|---|---|
| **Lencana bulat** ("Garansi Resmi") | Lingkaran 96–120 px `brand-800`, teks putih 600 12–14 px, ikon centang, rotasi −12°, "pop" saat muncul |
| **Stiker** | Pill/bintang kecil `sun-400`/`pink-300`, rotasi acak ±6° (statis, deterministik per id) |
| **Kartu statistik** | Radius 32 px, `brand-700` atau `mint-200`; angka display 800 48–72 px; label sm; count-up saat masuk viewport |
| **Kartu ulasan** | Radius 28 px, avatar 48 px + lencana "Terverifikasi", bintang `sun-500`, kutipan 3 baris (`line-clamp-3`), "Baca selengkapnya →" |
| **Accordion FAQ** | Baris radius 24 px; pertanyaan 700 18 px; tombol panah bulat 40 px di kanan berputar 180° saat terbuka; panel animasi tinggi 350 ms |
| **Langkah 01/02/03** | Angka display 800 `sun-400` 64 px, judul h3, deskripsi 2 baris, mockup/ilustrasi di atas |
| **Chip filter** | Pill 36 px, border `line`; aktif: `brand-500` + teks putih |
| **Input** | Tinggi 48 px, radius 16 px, border `line`, fokus ring `brand-500` 2 px; label di atas (bukan placeholder-only); pesan galat `coral-600` + ikon |
| **Toast** | Pill gelap `brand-900`, teks putih, muncul dari bawah, 4 s, dapat dilewati |
| **Skeleton** | `brand-100` → `brand-50` shimmer 1.4 s; bentuk sama dengan konten asli |
| **Empty state** | Ilustrasi orisinal + 1 kalimat + 1 tombol |
| **Badge keranjang** | Lingkaran 18 px `coral-400` teks `ink-900`, "bump" elastis saat bertambah |

---

## 7. Blueprint halaman web

### 7.1 Beranda (`/`), mengikuti foto 1

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ griyaku✦     Kategori  Promo  Toko Resmi  Bantuan        🔍  🛒   (  Masuk  )  │ transparan
│                                                                               │
│                              ╭─────────╮                                      │
│        Rumah                 │ product │  ← cutout miring −16°      Nyaman    │ display 800
│                              ╰─────────╯     ⬤ Garansi Resmi                  │
│                         [ Belanja sekarang → ]  (sun-400)                     │
│                                                                               │
│  Alat rumah tangga      ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────         │
│  pilihan, untuk         │ Dapur    │ │Kebersihan│ │Elektronik│ │ Perab…       │
│  semua rumah.           │ mulai 49rb│ │mulai 35rb│ │ mulai 99rb│              │
└───────────────────────────────────────────────────────────────────────────────┘
                              (hero = 100svh, min 720px, brand-500)

[ Marquee tepercaya: Gratis Ongkir · Garansi Resmi · COD · Bayar Aman · Cicilan 0% ]   (putih)
[ Kategori ikon (grid 8 kolom, Tokopedia-style) ]                                      (canvas)
[ Flash Sale: judul + hitung mundur + scroller kartu produk ]                          (paper)
[ Griyaku dalam angka: 4 kartu statistik + ilustrasi ]                                 (brand-700)
[ Rekomendasi untukmu: tab chip + grid 5 kolom + "Muat lainnya" ]                      (canvas)
[ Toko Resmi: carousel logo + banner ]                                                 (paper)
[ Ulasan pembeli: kartu ulasan (blok gelap brand-800) ]                                (brand-800)
[ Cara belanja: langkah 01 02 03 ]                                                     (brand-500)
[ FAQ accordion + ilustrasi ]                                                          (paper)
[ Footer: brand-900, tautan, unduh aplikasi, metode bayar ]
```

### 7.2 Pencarian / kategori (`/search`, `/c/[slug]`)

Sidebar filter kiri (harga, rating, lokasi, pengiriman, kondisi, toko resmi); atas: jumlah hasil + urutkan; grid 4–5 kolom; paginasi *cursor* + "Muat lainnya". Mobile: filter lewat *bottom sheet*.

### 7.3 Detail produk (`/p/[slug]`)

Kiri: galeri (thumbnail vertikal, gambar utama radius 32 px, zoom). Tengah: judul, rating, harga, varian (chip), stok, deskripsi (tab: Detail · Info penting · Ulasan · Diskusi). Kanan (sticky): kartu beli (jumlah, catatan, subtotal, **Beli langsung** `primary`, **+ Keranjang** `outline`), info toko, estimasi ongkir. Di bawah: ulasan (kartu ulasan), produk serupa. Mobile: bar beli sticky di bawah.

### 7.4 Keranjang dan checkout

Keranjang dikelompokkan **per toko** (kartu per toko, pilih semua/ per toko). Ringkasan sticky. Checkout: 3 langkah bernomor **01 Alamat → 02 Pengiriman → 03 Pembayaran**, voucher, ringkasan biaya, tombol **Bayar** `primary` 56 px.

### 7.5 Seller Center (`/seller/*`), admin (`/admin/*`)

Layout dashboard tenang: sidebar `brand-900`, konten `canvas`, kartu statistik memakai gaya kartu angka. Tanpa animasi dekoratif.

---

## 8. Motion & GSAP

### 8.1 Prinsip

- Satu momen "wow" per halaman (hero beranda). Sisanya halus.
- Hanya animasikan **`transform` dan `opacity`**. Jangan animasikan `width/height/top/left` kecuali accordion (tinggi) yang sudah diuji.
- Durasi: mikro 150–200 ms · UI 250–400 ms · section 600–800 ms · hero 900–1200 ms.
- Ease standar: `expo.out` (masuk), `power3.inOut` (transisi), `back.out(1.4)` (pop), `sine.inOut` (melayang).
- Semua animasi di komponen **klien** (`"use client"`) kecil. Server Component tidak boleh mengimpor GSAP.
- Wajib `useGSAP` (`@gsap/react`) dengan `scope`, supaya pembersihan otomatis (hindari kebocoran ScrollTrigger di App Router).
- Wajib `gsap.matchMedia()` dengan `(prefers-reduced-motion: no-preference)`; pada *reduced motion*, tampilkan keadaan akhir tanpa gerak.
- Lisensi: paket npm `gsap` memuat plugin standar dan ScrollTrigger; verifikasi syarat lisensi terbaru di gsap.com sebelum rilis komersial.

### 8.2 Koreografi hero beranda

| t (detik) | Elemen | Animasi |
|---|---|---|
| 0.00 | Kata "Rumah" dan "Nyaman" | Naik dari topeng (`yPercent: 110 → 0`), rotasi 3°→0, stagger 0.12, `expo.out`, 1.0 s |
| 0.10 | Produk cutout | Jatuh dari atas (`y: -240 → 0`), rotasi −40° → −16°, `back.out(1.4)`, 1.1 s |
| 0.55 | Bayangan lantai produk | `scaleX 0.4 → 1`, `opacity 0 → 1`, 0.6 s |
| 0.70 | Lencana "Garansi Resmi" | *Pop* `scale 0 → 1`, rotasi −12°, `back.out(2)`, 0.5 s |
| 0.80 | Tombol CTA kuning | Naik + fade, 0.5 s |
| 0.90 | Tetesan/percikan SVG | Jatuh + memanjang (`scaleY`), 0.6 s, stagger 0.08 |
| 1.00 | Tagline + kartu kategori | Kartu masuk dari kanan, stagger 0.1, 0.7 s |
| Loop | Produk | Melayang `y ±14 px`, rotasi ±2°, 2.6 s, `sine.inOut`, yoyo |
| Scroll | Produk | Parallax `yPercent 0 → 18`, `scrub` |

**Penting:** parallax dan melayang menyentuh properti yang sama. Pisahkan menjadi tiga elemen bersarang: `parallax` (luar) → `float` (tengah) → `tilt` (dalam).

### 8.3 Kode acuan

```tsx
// apps/web/src/components/home/hero-motion.tsx
"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.from("[data-hero-word]", { yPercent: 110, rotate: 3, duration: 1, stagger: 0.12 })
          .from("[data-hero-tilt]", { y: -240, rotate: -40, duration: 1.1, ease: "back.out(1.4)" }, 0.1)
          .from("[data-hero-shadow]", { scaleX: 0.4, autoAlpha: 0, duration: 0.6 }, 0.55)
          .from("[data-hero-badge]", { scale: 0, rotate: -40, duration: 0.5, ease: "back.out(2)" }, 0.7)
          .from("[data-hero-cta]", { y: 24, autoAlpha: 0, duration: 0.5 }, 0.8)
          .from("[data-hero-drop]", { yPercent: -120, scaleY: 0.4, duration: 0.6, stagger: 0.08 }, 0.9)
          .from("[data-hero-card]", { x: 120, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 1.0);

        // melayang (elemen tengah)
        gsap.to("[data-hero-float]", {
          y: "+=14",
          rotate: "+=2",
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // parallax (elemen luar)
        gsap.to("[data-hero-parallax]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
```

**Menghindari kedip (FOUC) dan menjaga LCP.** Teks judul sudah ada di HTML server. Sisipkan skrip inline kecil di `<head>` yang menambah kelas `motion-ok` pada `<html>` hanya bila *reduced motion* tidak aktif, lalu di CSS sembunyikan keadaan awal hanya di bawah kelas itu:

```css
html.motion-ok [data-hero-word] { transform: translateY(110%); }
html.motion-ok [data-hero-cta], html.motion-ok [data-hero-card] { opacity: 0; }
```

GSAP lalu menganimasikan `to` keadaan akhir. Tambahkan *failsafe* 2,5 detik yang melepas kelas `motion-ok` bila JS gagal. **Jangan** menyembunyikan gambar LCP dengan `opacity: 0`.

```ts
// count-up untuk kartu statistik
const obj = { v: 0 };
gsap.to(obj, {
  v: target,
  duration: 1.6,
  ease: "power2.out",
  scrollTrigger: { trigger: el, start: "top 85%", once: true },
  onUpdate: () => { el.textContent = new Intl.NumberFormat("id-ID").format(Math.round(obj.v)); },
});
```

### 8.4 Animasi per area

| Area | Animasi |
|---|---|
| Header | Transparan → putih (`ScrollTrigger`, 300 ms); search bar melebar |
| Section masuk | Judul naik 24 px + fade, stagger anak 0.08 (`once: true`) |
| Kartu kategori | Scroller horizontal; hover miring produk +4° |
| Kartu produk | Hover: gambar `scale 1.04`, kartu naik 4 px (CSS, bukan GSAP) |
| Statistik | Count-up saat masuk viewport |
| FAQ | Tinggi panel 0 → auto 350 ms, panah putar 180° |
| Tambah ke keranjang | Salinan gambar terbang ke ikon keranjang (`power3.inOut`, 0.8 s, mengecil ke 0.1), lalu badge *bump* (`scale 1.3 → 1`, `elastic.out(1, 0.5)`) |
| Tombol CTA hero | *Magnetic* (maks 8 px), hanya pointer halus (`(pointer: fine)`) |
| Transisi halaman | Fade 200 ms; hindari animasi berat antar rute |
| Hitung mundur flash sale | Digit *flip* (translateY digit), 250 ms per detik |

### 8.5 Aturan performa dan aksesibilitas

- Jangan memuat GSAP di halaman yang tidak memakainya (impor dinamis untuk Seller Center/admin: **tidak ada GSAP** di sana).
- Tambahkan `will-change: transform` hanya selama animasi berjalan; hapus sesudahnya.
- Panggil `ScrollTrigger.refresh()` setelah gambar besar selesai dimuat bila mengubah tinggi dokumen.
- Animasi berulang (melayang, marquee) berhenti saat tab tidak aktif atau elemen keluar viewport.
- Konten penting tidak boleh hanya terlihat setelah animasi selesai.
- Target: INP < 200 ms, CLS < 0.05, LCP < 2.5 s (4G, perangkat menengah).

---

## 9. Mobile (Kotlin + Jetpack Compose), mengikuti foto 2

### 9.1 Prinsip

- **Pita warna bergantian**: layar pemasaran (onboarding, header beranda, profil toko, ulasan, bantuan) memakai latar `Brand500` dan `Brand800` berselang-seling dengan kartu lebih terang, persis irama foto 2. Layar transaksi (keranjang, checkout, pesanan) memakai `Canvas` + kartu `Paper`.
- **Kartu besar, sudut besar** (24–32 dp), pill untuk tombol dan chip.
- **Angka besar bernomor** (01/02/03) dan **kartu statistik** sebagai identitas.
- **Ilustrasi + stiker** untuk empty state, onboarding, bantuan.
- Target sentuh ≥ 48 dp. Bottom nav 5 tab: **Beranda · Kategori · Wishlist · Pesanan · Akun**; keranjang di kanan atas dengan badge.

### 9.2 Token (Compose)

```kotlin
// core/designsystem/theme/Color.kt
package id.griyaku.app.core.designsystem.theme

import androidx.compose.ui.graphics.Color

object GriyakuColors {
    val Brand50  = Color(0xFFF0F6F4)
    val Brand100 = Color(0xFFDBEAE6)
    val Brand200 = Color(0xFFB8D5CD)
    val Brand400 = Color(0xFF4C9783)
    val Brand500 = Color(0xFF006A4E) // utama
    val Brand600 = Color(0xFF005B43)
    val Brand700 = Color(0xFF004A37)
    val Brand800 = Color(0xFF003527)
    val Brand900 = Color(0xFF00241B)

    val Mint100 = Color(0xFFE3F6EF)
    val Mint200 = Color(0xFFBFEBDD)
    val Mint300 = Color(0xFF8FDCC1)

    val Sun400 = Color(0xFFFFD23F)
    val Sun500 = Color(0xFFF5BC12)
    val Coral100 = Color(0xFFFFEDE8)
    val Coral400 = Color(0xFFFF6A4D)
    val Coral600 = Color(0xFFC73A1E)
    val Pink300 = Color(0xFFFFB3C7)

    val Ink900 = Color(0xFF0B1F18)
    val Ink700 = Color(0xFF2B3F37)
    val Ink500 = Color(0xFF5A6B64)
    val Line = Color(0xFFE3EAE6)
    val Canvas = Color(0xFFF4F7F5)
    val Paper = Color(0xFFFFFFFF)
}
```

```kotlin
// core/designsystem/theme/Theme.kt
private val LightColors = lightColorScheme(
    primary = GriyakuColors.Brand500,
    onPrimary = Color.White,
    primaryContainer = GriyakuColors.Mint200,
    onPrimaryContainer = GriyakuColors.Ink900,
    secondary = GriyakuColors.Sun400,
    onSecondary = GriyakuColors.Ink900,
    tertiary = GriyakuColors.Coral400,
    onTertiary = GriyakuColors.Ink900,
    background = GriyakuColors.Canvas,
    onBackground = GriyakuColors.Ink900,
    surface = GriyakuColors.Paper,
    onSurface = GriyakuColors.Ink900,
    onSurfaceVariant = GriyakuColors.Ink500,
    outline = GriyakuColors.Line,
    error = GriyakuColors.Coral600,
    onError = Color.White,
)

val GriyakuShapes = Shapes(
    extraSmall = RoundedCornerShape(8.dp),
    small = RoundedCornerShape(12.dp),
    medium = RoundedCornerShape(16.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = RoundedCornerShape(32.dp),
)
```

Warna "pita gelap" (`Brand800` + teks putih) dibuat sebagai komponen `BrandBand(tone = Dark | Primary | Light)` agar tidak tersebar di layar.

### 9.3 Tipografi mobile

Font: Bricolage Grotesque (display) dan Plus Jakarta Sans (UI), dibundel di `res/font/`.

| Gaya | Ukuran / line-height | Bobot | Dipakai |
|---|---|---|---|
| `displayLarge` | 56 / 52 sp | 800 display | Judul onboarding, angka besar |
| `displayMedium` | 40 / 40 sp | 800 display | Angka statistik, 01/02/03 |
| `headlineMedium` | 28 / 34 sp | 700 display | Judul layar/section |
| `titleLarge` | 20 / 28 sp | 700 | Judul kartu |
| `bodyLarge` | 16 / 24 sp | 400 | Isi |
| `labelLarge` | 14 / 20 sp | 600 | Tombol, chip |
| `labelSmall` | 12 / 16 sp | 500 | Meta |

Harga: `bodyLarge`/`titleLarge` bobot 700 dengan `fontFeatureSettings = "tnum"`.

### 9.4 Blueprint layar

**Onboarding (3 halaman, gaya "01 02 03")**

```
┌──────────────────────┐
│  Lewati              │
│                      │
│   [ilustrasi orisinal│
│    orang + dapur]    │
│                      │
│  01                  │  ← display 800, Sun400
│  Pilih alat favorit  │  ← headlineMedium, putih
│  Ribuan toko, satu   │
│  aplikasi.           │
│                      │
│  ● ○ ○   [ Lanjut → ]│  ← CTA Sun400, pill
└──────────────────────┘     latar Brand500 (hal. 2: Brand800)
```

**Beranda**

```
┌──────────────────────┐
│ 📍 Bandung      🛒²  │  ← Brand500
│ ( 🔍 Cari alat rumah…)│  ← pill putih
│ ╭──────────────────╮ │
│ │ Rumah Nyaman     │ │  ← banner bento, radius 32, produk miring menembus tepi
│ │ [Belanja ▸]      │ │
│ ╰──────────────────╯ │
│ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉      │  ← kategori ikon (2 baris x 4, atau scroll)
│ Flash Sale  ⏱ 02:14:09│  ← Brand800, kartu produk Mint
│ Rekomendasi          │  ← Canvas, grid 2 kolom
├──────────────────────┤
│ Beranda Kat. ♡ Pesan Akun│
└──────────────────────┘
```

**Detail produk**: galeri *pager* (radius 32 dp) → judul, harga, varian → kartu toko → **pita gelap "Ulasan"** (`Brand800`) berisi kartu ulasan horizontal (kartu `Mint100`) → produk serupa. Bar bawah melekat: ikon Chat, **+ Keranjang** (`outline`), **Beli** (`primary`).

**Profil toko**: header `Brand500`, avatar toko, tombol Ikuti; blok **"Toko dalam angka"**: 4 kartu (rating, pesanan tepat waktu %, produk terjual, pengikut) dengan count-up; tab Produk · Ulasan · Info.

**Checkout**: stepper **01 Alamat · 02 Kirim · 03 Bayar** (angka display, langkah aktif `Brand500`), ringkasan biaya, tombol **Bayar** 56 dp.

**Pesanan**: chip status, kartu pesanan per toko. Detail pesanan: pelacakan bernomor 01..04 dengan garis vertikal.

**Pusat Bantuan**: latar `Brand500`; judul "Ada yang bisa kami bantu?"; accordion FAQ (baris radius 24 dp, tombol panah bulat 40 dp di kanan) + ilustrasi di sisi; tombol "Hubungi kami" `Sun400`.

**Akun**: header avatar, kartu saldo/voucher, daftar menu, "Tentang Griyaku" dengan kartu **"Griyaku dalam angka"**.

### 9.5 Motion mobile (Compose, tanpa GSAP)

```kotlin
object GriyakuMotion {
    const val Fast = 150
    const val Base = 300
    const val Slow = 500
    val Emphasized = CubicBezierEasing(0.16f, 1f, 0.3f, 1f)
    val Pop = spring<Float>(dampingRatio = Spring.DampingRatioMediumBouncy, stiffness = Spring.StiffnessMediumLow)
}
```

| Interaksi | Implementasi |
|---|---|
| Masuk layar | `AnimatedVisibility` fade + slide-up 24 dp, `Emphasized`, 300 ms |
| Daftar | `Modifier.animateItem()` untuk tambah/hapus/urut |
| List → detail | `SharedTransitionLayout` (gambar produk berbagi elemen) |
| Count-up statistik | `animateFloatAsState` / `Animatable` dipicu saat tampil (sekali) |
| Accordion FAQ | `animateContentSize()` + rotasi ikon `animateFloatAsState` |
| Tambah keranjang | Gambar mengecil dan terbang ke ikon keranjang, badge *bump* (`Pop`), haptic `ContextClick` |
| Lencana / stiker | `scale 0 → 1` dengan `Pop` |
| Tombol | Tekan `scale 0.97` (`graphicsLayer`) |
| Skeleton | Shimmer 1,4 s |

Aturan: hormati `Settings.Global.ANIMATOR_DURATION_SCALE` (0 = tanpa animasi dekoratif); `LazyColumn`/`LazyVerticalGrid` wajib memakai `key`; hindari `recomposition` berulang pada animasi (gunakan `graphicsLayer {}` lambda).

---

## 10. Ilustrasi, gambar, ikon

- **Ilustrasi**: gaya datar playful, bentuk organik, kepala/tangan sedikit dilebih-lebihkan, objek rumah tangga (wajan, blender, tanaman, sapu). Palet: `brand-*`, `mint-*`, `sun-400`, `pink-300`, `coral-400`, krem. **Orisinal**, dilarang menjiplak karakter dari referensi.
- **Foto produk**: latar transparan (WebP/AVIF), sisi panjang ≥ 1200 px, bayangan lantai lembut. Sediakan juga versi 1:1 berlatar putih untuk grid.
- **Ikon**: web `lucide-react` (stroke 1.75, 20/24 px); Android Material Symbols *Rounded*. Satu keluarga ikon per platform.
- **Dekor**: tetesan dan percikan SVG, bintang kecil, lencana. Maks 3 dekor per viewport.
- **Logo**: placeholder wordmark "griyaku" display 800 + bintang kecil `sun-400`. Ganti dengan logo final.

---

## 11. Aksesibilitas

- Kontras sesuai tabel 3.3; tidak boleh ada teks `coral-400` atau `ink-300`.
- Fokus terlihat di semua elemen interaktif; urutan Tab logis; *skip link* "Lewati ke konten".
- Kartu produk: satu tautan, `aria-label` berisi nama, harga, rating.
- Accordion: `button` dengan `aria-expanded` dan `aria-controls`.
- Hitung mundur memakai `role="timer"` dan tidak diumumkan tiap detik (`aria-live="off"`).
- Gambar dekoratif `alt=""`; gambar produk `alt` deskriptif.
- Mobile: `contentDescription`, ukuran sentuh 48 dp, dukungan TalkBack dan font besar (`sp`, uji 200%).
- Jangan menyampaikan informasi hanya lewat warna (status pesanan: ikon + teks).

---

## 12. Bahasa & microcopy

Bahasa Indonesia, nada **ramah, ringkas, tidak menggurui**, memakai "kamu" untuk pemasaran dan "Anda" untuk transaksi/hukum.

| Konteks | Contoh |
|---|---|
| Hero | **Rumah Nyaman** · "Alat rumah tangga pilihan, untuk semua rumah." |
| CTA | "Belanja sekarang", "Beli langsung", "+ Keranjang", "Bayar" |
| Kosong (keranjang) | "Keranjangmu masih kosong. Yuk, cari alat dapur favoritmu." |
| Galat jaringan | "Koneksi terputus. Coba lagi?" |
| Berhasil | "Ditambahkan ke keranjang" |
| Konfirmasi hapus | "Hapus 2 produk dari keranjang?" |
| Mata uang | `Rp 349.000`, singkat `Rp 349 rb`, `Rp 1,2 jt` |
| Terjual | "1,2 rb+ terjual" |
| Tanggal | `13 Okt 2026`, `Tiba 15–17 Okt` |

---

## 13. Do & Don't

| Do | Don't |
|---|---|
| Hero hijau penuh, judul raksasa, produk miring menimpa judul | Menyalin merek/ilustrasi dari foto referensi |
| Halaman transaksi putih, tenang, informatif | Animasi besar di keranjang atau checkout |
| Satu CTA kuning per viewport | Banyak tombol kuning bersaing |
| Radius besar, pill, bayangan lembut bertinta hijau | Sudut tajam, bayangan abu-abu pekat |
| Animasi `transform`/`opacity`, hormati reduced motion | Menganimasikan `top/left/width`, mengabaikan reduced motion |
| Teks asli untuk judul hero | Judul hero sebagai gambar |
| Token semantik di komponen | Hex literal di komponen |
| Format Rupiah dan tanggal lokal | Format USD/ISO mentah di UI |

---

## 14. Checklist QA visual

- [ ] Hero tampil benar di 360, 768, 1024, 1440, 1920 px; judul tidak terpotong; produk tetap menimpa judul.
- [ ] Hanya token dari bagian 3 yang dipakai (grep hex di `apps/web/src` harus kosong kecuali `globals.css`).
- [ ] Kontras diverifikasi (axe / Lighthouse a11y ≥ 95).
- [ ] Reduced motion: seluruh keadaan akhir terlihat, tidak ada gerak dekoratif.
- [ ] Lighthouse mobile: LCP < 2.5 s, CLS < 0.05, TBT rendah.
- [ ] Tidak ada kebocoran ScrollTrigger saat berpindah rute (cek `ScrollTrigger.getAll().length`).
- [ ] Kartu produk seragam tingginya; judul 2 baris dengan elipsis.
- [ ] Mobile: semua target ≥ 48 dp, uji font 200%, TalkBack membaca kartu produk dengan benar.
- [ ] Pita warna bergantian (Brand500/Brand800) hanya di layar pemasaran, bukan di layar transaksi.
- [ ] Ilustrasi dan aset orisinal / berlisensi, tidak ada merek referensi tersisa.
