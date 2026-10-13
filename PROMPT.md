# PROMPT.md — Prompt Pembangunan Griyaku

> Kumpulan prompt untuk membangun **marketplace alat rumah tangga ala Tokopedia** dengan:
> **Go** (jaringan + middleware) · **Java/Spring Boot** (backend) · **Next.js + TypeScript** (UI saja) · **Kotlin/Compose** (mobile) · **Docker** (database/infra) · **Tailwind + GSAP** (web UI) · warna **`#006A4E`**.
>
> UI web mengikuti **foto 1**, UI mobile mengikuti **foto 2**. Pasangan dokumen ini: [`DESIGN.md`](./DESIGN.md) dan [`README.md`](./README.md).

---

## Daftar isi

1. [Cara memakai](#cara-memakai)
2. [Prompt Master](#1-prompt-master)
3. [Prompt per fase (0–9)](#2-prompt-per-fase)
4. [Prompt UI Web (foto 1)](#3-prompt-ui-web-foto-1)
5. [Prompt UI Mobile (foto 2)](#4-prompt-ui-mobile-foto-2)
6. [Prompt review dan perbaikan](#5-prompt-review-dan-perbaikan)
7. [Tips](#6-tips)

---

## Cara memakai

1. Siapkan repo kosong. Taruh `README.md`, `DESIGN.md`, dan `PROMPT.md` di sana. Simpan dua foto referensi sebagai `docs/reference/ref-web.png` (foto 1) dan `docs/reference/ref-mobile.png` (foto 2).
2. Buka agen coding Anda (Claude Code, Cursor, atau lainnya). **Tempel Prompt Master sekali** di awal. Untuk Claude Code, simpan isinya sebagai `CLAUDE.md` di root agar selalu terbaca.
3. Jalankan **Prompt Fase 0 → 9 secara berurutan**. Jangan loncat: tiap fase bergantung pada fase sebelumnya.
4. Untuk fase UI (3 dan 8), **lampirkan foto referensi** ke percakapan bersama prompt UI-nya.
5. Di akhir tiap fase, jalankan **Prompt Review** (bagian 5).
6. Setelah kontrak API (`openapi.yaml`) stabil di Fase 1–2, pekerjaan web, gateway, backend, dan Android bisa dijalankan paralel oleh agen berbeda.

---

## 1. Prompt Master

````text
# PERAN
Kamu adalah tim engineer senior lintas disiplin: arsitek backend Java/Spring Boot, engineer Go (jaringan dan middleware), engineer frontend Next.js/TypeScript, engineer Android Kotlin/Jetpack Compose, engineer DevOps, dan UI engineer yang peka desain.

# TUJUAN
Bangun **Griyaku**, marketplace alat rumah tangga multi-toko ala Tokopedia (pembeli, penjual, admin) untuk pasar Indonesia, dalam satu monorepo: web, mobile Android, gateway, dan backend. Nama "Griyaku" adalah placeholder yang mudah diganti.

# ATURAN BESI (tidak boleh dilanggar)
1. **Next.js HANYA untuk UI.** Di `apps/web` dilarang ada logika bisnis, akses database, ORM, atau Route Handler/Server Action yang menyentuh data bisnis. Semua data berasal dari Gateway lewat klien API bertipe (hasil generate dari OpenAPI). Server Components boleh dipakai untuk render dan SEO, dengan mem-fetch ke Gateway.
2. **Go = jaringan dan middleware** (API Gateway/BFF). Routing, autentikasi token, rate limit, cache, agregasi respons, WebSocket/SSE, penerima webhook, observability. **Tanpa logika domain dan tanpa akses PostgreSQL.** Redis hanya untuk cache, rate limit, dan idempotency.
3. **Java (Spring Boot) = backend dan sumber kebenaran bisnis.** Seluruh aturan domain, transaksi, dan akses database ada di sini.
4. **Kotlin = klien Android** (Jetpack Compose). Hanya berbicara dengan Gateway, sama seperti web.
5. **Database dan infrastruktur berjalan di Docker** (PostgreSQL, Redis, Meilisearch, MinIO, RabbitMQ, Mailpit) lewat Docker Compose.
6. **TypeScript `strict`** (`noUncheckedIndexedAccess`, tanpa `any` implisit, tanpa `@ts-ignore` tanpa alasan tertulis).
7. **Tailwind CSS (v4)** untuk seluruh styling web. **GSAP** (`gsap`, `@gsap/react`, ScrollTrigger) adalah satu-satunya pustaka animasi web.
8. **Warna utama `#006A4E`.** Semua warna, font, radius, bayangan, dan motion mengikuti `DESIGN.md`. Dilarang hex literal di komponen; pakai token.
9. **Contract-first.** `contracts/openapi.yaml` adalah satu-satunya kontrak. Ubah kontrak dulu, lalu `make gen`, lalu implementasi.
10. **Uang = bilangan bulat rupiah** (tidak pernah float/double). Waktu disimpan UTC, ditampilkan WIB (`Asia/Jakarta`).
11. **Tidak ada rahasia di repo.** Semua lewat environment (`.env.example` didokumentasikan).
12. **Teks UI dan dokumentasi dalam Bahasa Indonesia**; kode, nama variabel, dan komentar teknis dalam Inggris.
13. **Jangan mengarang.** Versi pustaka dan API diverifikasi dari dokumentasi/registry resmi. Bila ragu, baca dokumentasi, bukan menebak.
14. **Foto referensi hanya acuan tata letak dan gaya.** Dilarang menyalin merek, teks, logo, atau ilustrasi dari sana; semua aset harus orisinal atau berlisensi.

# KONTEKS BISNIS
- Mata uang IDR (`Rp 349.000`). Alamat memakai wilayah administratif Indonesia: provinsi → kota/kabupaten → kecamatan → kelurahan + kode pos.
- Metode bayar (lewat PSP sandbox, mis. Midtrans/Xendit; adapter mock untuk dev): virtual account bank, e-wallet, QRIS; COD dan cicilan opsional (mock).
- Pengiriman lewat adapter ongkir (Biteship/RajaOngkir; adapter mock untuk dev): JNE, J&T, SiCepat, AnterAja, kurir instan.
- Pola Tokopedia yang harus ada: keranjang **dikelompokkan per toko**, checkout menghasilkan **satu pesanan per toko**, label Toko Resmi, Gratis Ongkir, voucher platform dan toko, flash sale, rekening bersama (escrow), ulasan berfoto, diskusi produk, chat pembeli-penjual.
- Kategori awal: Dapur & Masak, Peralatan Makan, Kebersihan, Elektronik Rumah, Perabot & Dekorasi, Kamar Mandi, Penyimpanan & Rak, Taman & Perbaikan.

# ARSITEKTUR
Monorepo (lihat README.md bagian "Struktur repositori"):
- `apps/web` Next.js (UI saja) · `apps/android` Kotlin + Compose
- `services/gateway` Go · `services/core-api` Java (modular monolith)
- `contracts` OpenAPI + skema event · `infra` Docker/DB/observability · `docs`

Alur: Klien → **Gateway (Go)** → **core-api (Java)** → PostgreSQL/Redis/Meilisearch/MinIO/RabbitMQ.
- `core-api` dibagi modul (Spring Modulith): `identity, catalog, cart, order, payment, shipping, review, promotion, seller, notification`. Tiap modul punya *schema* PostgreSQL sendiri dan tidak membaca tabel modul lain; komunikasi lewat antarmuka modul atau event. Struktur paket per modul: `api / application / domain / infrastructure`.
- Event lewat **transactional outbox** → RabbitMQ (indexer Meilisearch, notifikasi, saldo penjual).
- Layanan eksternal (pembayaran, ongkir, push) lewat **adapter** dengan implementasi `mock` default sehingga proyek berjalan tanpa kunci API.

# FITUR DAN PRIORITAS
**P0 (MVP)**: registrasi/login/refresh/logout; profil dan alamat; kategori; produk (varian, gambar, stok); pencarian dan filter; keranjang per toko; checkout (alamat, ongkir, voucher sederhana); pesanan terpisah per toko; pembayaran sandbox + webhook; status pesanan; Seller Center dasar (toko, produk, pesanan masuk, resi).
**P1**: ulasan berfoto, wishlist, voucher lengkap, notifikasi (in-app, email, push), saldo dan penarikan penjual (simulasi), beranda teragregasi.
**P2**: chat WebSocket, flash sale, diskusi produk, retur/komplain, panel admin lengkap, mode gelap.

# MODEL DOMAIN (ringkas)
User(role: BUYER|SELLER|ADMIN) · Address · Shop(is_official) · Category(tree) · Product · ProductVariant(sku, price, stock) · ProductImage · Cart/CartItem · Voucher(scope PLATFORM|SHOP; PERCENT|FIXED|FREE_SHIPPING) · OrderGroup → Order(per toko) → OrderItem · Payment · Shipment · Review · Wishlist · Notification · Conversation/Message · FlashSale · BalanceLedger · OutboxEvent · IdempotencyKey.

**State machine pesanan** (per toko): `AWAITING_PAYMENT → PROCESSING → SHIPPED → DELIVERED → COMPLETED`; cabang `CANCELLED`, `EXPIRED`, `REFUND_REQUESTED → REFUNDED`, `DISPUTED`. `OrderGroup`: `PENDING_PAYMENT → PAID | EXPIRED | CANCELLED`.
**Escrow**: dana ditahan sampai `COMPLETED` (konfirmasi pembeli atau otomatis setelah N hari tanpa komplain), lalu kredit saldo penjual dikurangi komisi.
**Stok**: reservasi saat checkout dengan TTL sama dengan batas bayar; pengurangan atomik (`UPDATE … WHERE stock >= :qty` atau optimistic locking); lepas otomatis saat kedaluwarsa/dibatalkan. Tidak boleh ada stok negatif.

# KONTRAK API
- Basis `/api/v1`. Galat `application/problem+json` (RFC 9457) dengan `traceId`.
- Paginasi cursor (`limit`, `cursor`). Header `Idempotency-Key` wajib untuk `POST /orders` dan `POST /payments`.
- Lint dengan Spectral; contract test (Schemathesis/Dredd) di CI.
- Klien yang dihasilkan: TypeScript (`openapi-typescript` + `openapi-fetch`), Go (`oapi-codegen`), Kotlin (OpenAPI Generator atau antarmuka Retrofit/Ktor yang diverifikasi terhadap kontrak).

# GATEWAY (GO) — TANGGUNG JAWAB
Go ≥ 1.24, `net/http` + `chi`, `slog` JSON. Rantai middleware berurutan:
1. recover panic → 2. request ID + trace OpenTelemetry → 3. access log → 4. header keamanan → 5. CORS (daftar origin eksplisit) → 6. batas ukuran body → 7. **rate limit** token-bucket di Redis (per IP, per pengguna; lebih ketat untuk login/OTP) → 8. **autentikasi**: verifikasi JWT lokal dengan JWKS ter-cache (rute publik/opsional/wajib dideklarasikan per rute) → 9. **CSRF** untuk cookie auth pada metode non-GET → 10. cache respons GET publik di Redis (TTL, stale-while-revalidate, kunci memuat varian) → 11. **reverse proxy** ke core-api dengan timeout, retry hanya untuk metode idempoten, circuit breaker, dan penyuntikan header internal bertanda tangan HMAC (`X-User-Id`, `X-User-Role`, `X-Request-Id`) sambil **membuang** header internal yang dikirim klien.

Endpoint milik Gateway sendiri:
- `/api/v1/auth/*` sebagai BFF cookie: memanggil Java, lalu mengatur cookie `httpOnly`/`Secure`/`SameSite` untuk web; untuk Android mengembalikan token di body.
- `/api/v1/home`: agregasi paralel (banner, kategori, flash sale, rekomendasi) dengan `errgroup`, timeout per panggilan, dan **degradasi parsial** (satu bagian gagal tidak menjatuhkan halaman).
- `/webhooks/payments/{provider}`: verifikasi tanda tangan, cek replay, idempotensi, lalu teruskan ke Java.
- `/api/v1/events` (SSE) atau `/ws`: notifikasi realtime dan chat.
- `/healthz`, `/readyz`, `/metrics` (hanya internal).
Konfigurasi dari env, *graceful shutdown*, uji dengan `go test -race`, `golangci-lint` bersih.

# BACKEND (JAVA) — TANGGUNG JAWAB
Java 21+ dan Spring Boot (stabil terbaru); Gradle Kotlin DSL; Spring Web, Security (OAuth2 Resource Server + penerbit token sendiri), Data JPA, Modulith, Flyway, Validation, springdoc, MapStruct.
- `identity`: registrasi, login, refresh token berotasi (ter-hash, deteksi pemakaian ulang), JWKS (`/.well-known/jwks.json`), Argon2id, profil, alamat, data wilayah.
- `catalog`: kategori, produk, varian, gambar (unggah presigned ke MinIO), indexer Meilisearch (via event), saran pencarian.
- `cart`, `order`, `payment`, `shipping`, `promotion`, `review`, `seller`, `notification` sesuai domain di atas.
- Standar: Bean Validation, penanganan galat terpusat (`ProblemDetail`), idempotensi, optimistic locking, `@Scheduled` untuk kedaluwarsa pesanan dan auto-complete, audit kolom (`created_at/updated_at`), migrasi Flyway per schema, tanpa N+1.
- Pengujian: JUnit 5 + Testcontainers (PostgreSQL), uji state machine, uji konkurensi stok, `ApplicationModules.verify()`.

# DATABASE DAN DOCKER
`infra/docker/compose.yml`: postgres (volume, healthcheck, init membuat schema per modul), redis, meilisearch, minio (+ pembuatan bucket otomatis), rabbitmq (management), mailpit. Profil `app` (gateway, core-api, web) dan `obs` (otel-collector, jaeger, prometheus, grafana). Jaringan khusus, `restart: unless-stopped`, versi image dikunci (bukan `latest`). `make seed` memuat data contoh realistis (≥ 200 produk alat rumah tangga, ≥ 20 toko, voucher).

# UI WEB (NEXT.JS) — RINGKAS
Ikuti `DESIGN.md` dan **Prompt UI Web (foto 1)**. App Router, React Server Components untuk halaman SEO (beranda, kategori, detail produk) dengan metadata, `sitemap`, JSON-LD `Product`; komponen klien kecil untuk interaksi dan GSAP. TanStack Query untuk data interaktif (keranjang, wishlist), React Hook Form + Zod untuk formulir, Radix UI untuk primitif aksesibel, `next/image` + `next/font`. Setiap halaman punya state loading (skeleton), kosong, dan galat. Locale `id-ID`.

# UI MOBILE (KOTLIN) — RINGKAS
Ikuti `DESIGN.md` bagian 9 dan **Prompt UI Mobile (foto 2)**. Single-activity, Compose + Material 3 bertema Griyaku, MVVM/MVI + Clean Architecture, Hilt, Navigation Compose, Retrofit/OkHttp + kotlinx.serialization, Coil, Room (cache), DataStore, WorkManager, FCM. Authenticator OkHttp untuk refresh token otomatis. Token disimpan terenkripsi. Modul Gradle: `app`, `core:{designsystem,network,data,common}`, `feature:*`.

# ANIMASI (GSAP, WEB)
Hanya `transform`/`opacity`. Wajib `useGSAP` dengan `scope` dan `gsap.matchMedia()` untuk `prefers-reduced-motion`. Koreografi hero, count-up, FAQ, fly-to-cart, header on-scroll sesuai `DESIGN.md` bagian 8. GSAP hanya di komponen klien; tidak dimuat di Seller Center/admin. Jaga LCP/CLS/INP.

# KEAMANAN
Argon2id; JWT akses 15 menit + refresh berotasi; cookie `httpOnly` + CSRF; CORS ketat; header keamanan (CSP, HSTS); validasi di Gateway dan Java; query berparameter; webhook bertanda tangan + idempoten; unggahan divalidasi dan disajikan lewat URL bertanda tangan; tanpa data pribadi di log; pindai dependensi. Acuan OWASP ASVS dan API Security Top 10.

# OBSERVABILITY
Log JSON dengan `traceId`; metrik Prometheus; trace OpenTelemetry end-to-end ke Jaeger; health/readiness; dasbor Grafana awal.

# PENGUJIAN DAN CI
Web: Vitest + Testing Library + Playwright + axe. Gateway: `go test -race`. Backend: JUnit + Testcontainers. Android: JUnit + Turbine + Compose UI test. Kontrak: Spectral + Schemathesis. CI GitHub Actions per layanan dengan path filter: lint, typecheck, test, `make gen` tanpa diff, build Docker.

# CARA KAMU BEKERJA
1. Kerjakan **satu fase per giliran** sesuai prompt fase. Sebelum mulai, tulis rencana singkat di `docs/plan-fase-N.md`, lalu langsung eksekusi tanpa menunggu persetujuan, kecuali ada keputusan yang tidak bisa dibatalkan.
2. Commit kecil dan bermakna (Conventional Commits). Jangan menyisakan kode mati, TODO tanpa tiket, atau `console.log`.
3. Setiap fase **harus**: build lulus, lint lulus, test lulus, aplikasi benar-benar dijalankan dan diverifikasi (UI: buka di browser/emulator dan ambil tangkapan layar).
4. Dependensi baru hanya bila perlu; catat alasan di `docs/decisions/ADR-NNN.md`.
5. Bila instruksi bertentangan: `DESIGN.md` menang untuk visual, `README.md` untuk arsitektur dan struktur, dan Aturan Besi di atas menang atas semuanya.
6. Bila ada ambiguitas kecil, pilih default paling masuk akal dan catat asumsinya; jangan berhenti untuk bertanya hal yang bisa diputuskan sendiri.
7. Di akhir tiap fase laporkan: apa yang selesai, apa yang diuji dan hasilnya, apa yang belum, risiko/utang teknis, dan langkah berikutnya.

# DEFINITION OF DONE (per fitur)
Kontrak OpenAPI diperbarui · implementasi + uji lulus · tangani error/loading/empty · aksesibel (a11y) · sesuai `DESIGN.md` · log/metrik/trace ada · dokumentasi dan `.env.example` diperbarui · berjalan di `make up` + `make dev-*`.

Mulai dengan membaca README.md dan DESIGN.md, lalu tunggu Prompt Fase 0.
````

---

## 2. Prompt per fase

> Tempel satu per satu setelah Prompt Master. Ganti `N` bila perlu.

### Fase 0: Fondasi

````text
FASE 0 — FONDASI. Ikuti Prompt Master.

Tugas:
1. Buat monorepo persis sesuai README (apps/web, apps/android, services/gateway, services/core-api, contracts, infra, docs). pnpm workspace, Gradle multi-project, Go module.
2. Docker Compose: postgres, redis, meilisearch, minio (+ bucket otomatis), rabbitmq, mailpit; profil `app` dan `obs`; healthcheck; versi image dikunci.
3. `.env.example` lengkap (lihat tabel README) dan `Makefile` dengan semua target di README.
4. `contracts/openapi.yaml` awal: security scheme, komponen umum (Problem, Money, Pagination), `/healthz`, `/auth/*`, `/products` (stub). Aktifkan Spectral.
5. Skeleton tiap aplikasi:
   - web: Next.js + TS strict + Tailwind v4 dengan token dari DESIGN.md §3.1, next/font (Bricolage Grotesque + Plus Jakarta Sans), halaman placeholder, ESLint/Prettier/Vitest.
   - gateway: router chi, rantai middleware (stub), config env, /healthz, /readyz, graceful shutdown.
   - core-api: Spring Boot, Flyway, actuator, springdoc, Modulith dengan modul kosong.
   - android: Compose + Hilt + tema dari DESIGN.md §9.2.
6. GitHub Actions per layanan (path filter).
7. Bukti end-to-end: `GET /api/v1/ping` dari Web → Gateway → Java → PostgreSQL (mengembalikan versi DB).

Selesai bila: `make up`, `make dev-api`, `make dev-gateway`, `make dev-web` berjalan dan halaman web menampilkan hasil /ping; CI hijau.
````

### Fase 1: Identitas dan akun

````text
FASE 1 — IDENTITAS DAN AKUN.

Java (modul identity): registrasi, login, refresh token berotasi + deteksi pemakaian ulang, logout, JWKS, Argon2id, profil `/me`, buku alamat `/me/addresses`, data wilayah Indonesia (provinsi→kelurahan + kode pos; muat dari dataset terbuka lewat migrasi/seed). Role BUYER/SELLER/ADMIN.
Gateway: `/auth/*` BFF (cookie httpOnly untuk web, token di body untuk Android), middleware auth JWT via JWKS ter-cache, rate limit login, CSRF, header internal bertanda tangan HMAC.
Kontrak: perbarui openapi.yaml, `make gen`.
Web: halaman /masuk dan /daftar (Radix + RHF + Zod), guard rute di middleware Next (hanya redirect), /akun dan /akun/alamat. Gaya tenang sesuai DESIGN.md.

Uji: alur login/refresh/reuse-detection, rate limit, CSRF, token kedaluwarsa, header internal tidak bisa dipalsukan klien.
Selesai bila: daftar → masuk → lihat profil → tambah alamat berjalan di web; semua uji lulus.
````

### Fase 2: Katalog dan pencarian

````text
FASE 2 — KATALOG DAN PENCARIAN.

Java (catalog): kategori (pohon), produk, varian, gambar (unggah presigned ke MinIO), status moderasi; outbox → RabbitMQ → indexer Meilisearch (pengaturan bahasa Indonesia, typo tolerance, facet: kategori, harga, rating, lokasi, toko resmi, kondisi); `/search`, `/search/suggest`, `/products/{slug}`, `/categories`.
Gateway: cache GET publik (stale-while-revalidate), `/api/v1/home` agregasi paralel dengan degradasi parsial.
Seed: ≥ 200 produk alat rumah tangga realistis di 8 kategori, ≥ 20 toko (beberapa Toko Resmi), gambar placeholder orisinal.
Kontrak + `make gen`.

Uji: relevansi pencarian dasar, filter/urut, paginasi cursor, indeks ulang idempoten, degradasi parsial /home.
Selesai bila: pencarian dan detail produk dapat diakses lewat API dan terindeks otomatis saat produk berubah.
````

### Fase 3: UI web inti

````text
FASE 3 — UI WEB INTI. Gunakan "Prompt UI Web (foto 1)" (bagian 3 PROMPT.md) dan lampirkan docs/reference/ref-web.png.
Cakupan: design system (komponen DESIGN.md §6), beranda, pencarian/kategori, detail produk, header/footer, animasi GSAP, SEO.
Selesai bila: seluruh kriteria penerimaan di Prompt UI Web terpenuhi dan Lighthouse mobile: Performance ≥ 90, A11y ≥ 95.
````

### Fase 4: Keranjang dan checkout

````text
FASE 4 — KERANJANG DAN CHECKOUT.

Java: cart (per pengguna; gabung keranjang tamu saat login), `POST /checkout/preview` (hitung subtotal, ongkir per toko lewat adapter shipping mock/real, voucher platform+toko, validasi stok), `POST /orders` (Idempotency-Key; membuat OrderGroup + satu Order per toko; reservasi stok atomik dengan TTL; snapshot harga/alamat).
Web: /keranjang (kelompok per toko, pilih semua/per toko, ubah qty, catatan), /checkout dengan 3 langkah 01 Alamat → 02 Pengiriman → 03 Pembayaran. Halaman tenang (tanpa animasi dekoratif); animasi fly-to-cart di tombol tambah.
Uji: konkurensi stok (dua pembeli, stok 1), idempotensi, voucher min-spend/kuota, ongkir mock, pembulatan uang.
Selesai bila: pembeli dapat membuat pesanan dari beberapa toko sekaligus dan stok tereservasi benar.
````

### Fase 5: Pembayaran dan pesanan

````text
FASE 5 — PEMBAYARAN DAN PESANAN.

Java (payment, order): adapter PSP (mock + sandbox Midtrans/Xendit), pembuatan transaksi, status, kedaluwarsa otomatis, state machine pesanan lengkap, escrow, ledger, notifikasi (outbox → email Mailpit + in-app).
Gateway: `/webhooks/payments/{provider}` (verifikasi tanda tangan, anti-replay, idempoten) → teruskan ke Java.
Web: /pesanan (tab status), /pesanan/[id] (pelacakan bernomor 01..04, bayar sekarang, konfirmasi diterima), halaman instruksi bayar dengan hitung mundur.
Uji: webhook ganda, webhook palsu, pesanan kedaluwarsa melepas stok, transisi ilegal ditolak, auto-complete.
Selesai bila: alur beli → bayar (mock) → proses → kirim → selesai berjalan end-to-end termasuk email di Mailpit.
````

### Fase 6: Seller Center

````text
FASE 6 — SELLER CENTER.

Java (seller): buka toko, profil toko, produk CRUD (varian, gambar, stok massal), pesanan masuk (proses, input resi, tolak), saldo + penarikan (simulasi), statistik toko (rating, % tepat waktu, terjual).
Web: /seller/* dengan layout dashboard (sidebar brand-900, konten canvas, kartu statistik), tanpa GSAP (impor dinamis dilarang di area ini). Tabel dengan filter, pagination, aksi massal.
Uji: otorisasi (penjual tidak bisa mengakses toko lain), input resi mengubah status, ledger konsisten.
Selesai bila: penjual dapat mengelola produk dan memproses pesanan sampai dikirim.
````

### Fase 7: Engagement

````text
FASE 7 — ENGAGEMENT.

Ulasan berfoto + balasan penjual, wishlist, diskusi produk, voucher lengkap (klaim, kuota, kadaluwarsa), flash sale (jadwal, harga khusus, hitung mundur server-side), chat via WebSocket/SSE di Gateway, push FCM (adapter mock), notifikasi in-app.
Web: kartu ulasan, wishlist, halaman voucher, chat, widget flash sale di beranda dengan hitung mundur (GSAP flip digit).
Uji: ulasan hanya oleh pembeli yang pesanannya COMPLETED, kuota voucher konkuren, flash sale tepat waktu.
Selesai bila: fitur P1 dan sebagian P2 berjalan dan teruji.
````

### Fase 8: Android

````text
FASE 8 — ANDROID. Gunakan "Prompt UI Mobile (foto 2)" (bagian 4 PROMPT.md) dan lampirkan docs/reference/ref-mobile.png.
Cakupan: design system Compose, onboarding 01/02/03, autentikasi, beranda, kategori, pencarian, detail produk, keranjang, checkout, pesanan, wishlist, Pusat Bantuan (FAQ), akun, profil toko ("Toko dalam angka"), notifikasi push.
Selesai bila: seluruh kriteria penerimaan di Prompt UI Mobile terpenuhi dan alur beli dari awal sampai bayar (mock) berjalan di emulator.
````

### Fase 9: Hardening dan rilis

````text
FASE 9 — HARDENING DAN RILIS.

1. Observability penuh: trace Web→Gateway→Java→DB, dasbor Grafana (latensi, error rate, pesanan/menit), alert dasar.
2. Uji beban k6 untuk /home, /search, /orders; temukan dan perbaiki bottleneck (indeks DB, cache, N+1).
3. Review keamanan terhadap OWASP ASVS/API Top 10; perbaiki temuan; pindai dependensi.
4. Audit a11y (axe) dan performa (Lighthouse) web; uji TalkBack dan font 200% di Android.
5. Pipeline CD: build image, migrasi Flyway terkontrol, strategi rollback, `docs/runbook.md`.
6. Perbarui README, DESIGN, arsitektur, dan ADR.
Selesai bila: semua checklist DESIGN.md §14 dan README "Roadmap" tercentang, dan laporan hasil uji beban/keamanan ada di `docs/reports/`.
````

---

## 3. Prompt UI Web (foto 1)

> Lampirkan `docs/reference/ref-web.png` saat menempel prompt ini.

````text
Bangun UI web Griyaku di `apps/web` dengan **Next.js + TypeScript (strict) + Tailwind CSS v4 + GSAP**. Next.js hanya UI; data dari Gateway lewat klien API bertipe. Ikuti `DESIGN.md` sebagai sumber kebenaran visual.

# REFERENSI (foto 1: docs/reference/ref-web.png)
Foto 1 adalah landing page produk dengan ciri berikut, dan **tata letak serta bahasa visual yang sama harus dipakai**:
- Latar warna solid penuh (full-bleed) sebagai hero.
- Judul **raksasa** bergaya tulisan tangan yang gemuk, putih, berada di tengah, dengan efek tetesan. Satu kata di kiri, satu kata di kanan.
- **Produk berbentuk cutout, miring (~20°), diletakkan di tengah dan menimpa judul** (lapisan di atas teks), dengan lencana bulat gelap di sampingnya.
- Tombol **pill kuning** di bawah produk ("Shop now") dengan tetesan kecil kuning di dekatnya.
- Navigasi minimal: logo kiri, empat tautan di tengah, tombol **outline pill** di kanan.
- Kiri bawah: tagline pendek tebal. Kanan bawah: **deretan kartu kategori berujung bulat** yang **terpotong di tepi kanan layar**; produk di tiap kartu menembus tepi atas kartu; warna kartu bergantian (gelap, terang, putih).
- Percikan di kiri bawah sebagai dekor.
Adaptasikan menjadi **Griyaku**: warna dasar hijau **#006A4E**, judul "Rumah ▢ Nyaman" (produk di antara dua kata), produk cutout alat rumah tangga (air fryer / blender / rice cooker), lencana "Garansi Resmi", CTA "Belanja sekarang →", kartu kategori Dapur / Kebersihan / Elektronik Rumah / Perabot. **Jangan menyalin** merek, teks, bentuk botol, atau lettering dari foto; buat versi orisinal.

# YANG HARUS DIBANGUN
1. **Token dan tema**: `globals.css` dengan `@theme` persis DESIGN.md §3.1; font via `next/font` (Bricolage Grotesque display, Plus Jakarta Sans UI). Utilitas `text-hero`.
2. **Komponen UI** (`src/components/ui`): Button (cta/primary/outline/ghost, pill), Badge/Sticker, RoundBadge, Input, SearchBar, Chip, Skeleton, Toast, Accordion (Radix + GSAP tinggi), Rating, Price (Intl id-ID), Tabs, Sheet.
3. **Header**: transparan di atas hero (teks putih), menjadi bar putih + search bar pill setelah scroll 80 px (ScrollTrigger). Menu mobile lewat sheet.
4. **Beranda `/`** (RSC + komponen klien kecil), urutan sesuai DESIGN.md §7.1:
   - Hero (100svh, min 720 px): judul display raksasa (teks asli), produk cutout miring menimpa judul (tiga elemen bersarang parallax → float → tilt), lencana bulat, CTA kuning, tetesan SVG, tagline kiri-bawah, scroller kartu kategori terpotong di kanan (scroll-snap).
   - Marquee tepercaya, kategori ikon, Flash Sale (hitung mundur), "Griyaku dalam angka" (4 kartu count-up), Rekomendasi (grid 5 kolom + muat lainnya), Toko Resmi, Ulasan (blok gelap), Cara belanja 01/02/03, FAQ accordion, Footer.
5. **Pencarian/kategori** `/search`, `/c/[slug]`: sidebar filter, grid produk 2/3/4/5 kolom, urutkan, paginasi cursor.
6. **Detail produk** `/p/[slug]`: galeri, varian, kartu beli sticky, tab (Detail/Info penting/Ulasan/Diskusi), produk serupa, JSON-LD.
7. **ProductCard** sesuai DESIGN.md §6.5 (satu tautan, gambar `next/image` dengan `sizes`, label Gratis Ongkir, rating, terjual).
8. **Halaman transaksi** (keranjang, checkout, pesanan) bergaya **tenang** (putih/canvas), tanpa animasi dekoratif.

# ANIMASI GSAP (wajib)
- Koreografi hero persis DESIGN.md §8.2 (timeline, durasi, ease) dengan `useGSAP` + `gsap.matchMedia()`; produk melayang dan parallax pada elemen terpisah.
- Pola anti-kedip: kelas `motion-ok` pada `<html>` dari skrip inline, keadaan awal disembunyikan hanya di bawah kelas itu, *failsafe* 2,5 s. Gambar/teks LCP tidak disembunyikan dengan `opacity`.
- ScrollTrigger: reveal section (`once: true`), count-up statistik, header on-scroll. FAQ: tinggi 0→auto. Fly-to-cart + badge bump. CTA hero magnetic (hanya `(pointer: fine)`).
- `prefers-reduced-motion`: tampilkan keadaan akhir, tanpa gerak dekoratif.
- Hanya `transform`/`opacity`. Bersihkan semua ScrollTrigger saat pindah rute.

# KRITERIA PENERIMAAN
- [ ] Hero pada 1440×900 dan 390×844 secara visual setara struktur foto 1 (judul raksasa, produk miring menimpa judul, lencana, CTA kuning, kartu kategori terpotong di kanan) namun dengan merek dan aset Griyaku.
- [ ] Warna utama tepat `#006A4E`; tidak ada hex literal di komponen (cek dengan grep).
- [ ] Kontras sesuai DESIGN.md §3.3; axe tanpa pelanggaran serius.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, CLS < 0.05, LCP < 2.5 s.
- [ ] Reduced motion berfungsi; tidak ada kebocoran ScrollTrigger.
- [ ] `pnpm typecheck && pnpm lint && pnpm test` hijau; tidak ada `any` implisit.
- [ ] Tidak ada logika bisnis atau akses DB di `apps/web`.

# CARA VERIFIKASI (wajib dilakukan)
Jalankan aplikasi, buka dengan Playwright, ambil tangkapan layar beranda pada 1440×900 dan 390×844, **bandingkan dengan foto 1**, daftar perbedaan struktur/proporsi/spasi, perbaiki, dan ulangi minimal dua iterasi. Simpan hasil di `docs/reports/ui-web/`.
````

---

## 4. Prompt UI Mobile (foto 2)

> Lampirkan `docs/reference/ref-mobile.png` saat menempel prompt ini.

````text
Bangun aplikasi Android Griyaku di `apps/android` dengan **Kotlin + Jetpack Compose + Material 3**. Aplikasi hanya berbicara dengan Gateway (`API_BASE_URL`). Ikuti `DESIGN.md` bagian 9 sebagai sumber kebenaran visual.

# REFERENSI (foto 2: docs/reference/ref-mobile.png)
Foto 2 adalah halaman panjang untuk sebuah aplikasi, dengan irama visual berikut yang **harus diadopsi** pada layar-layar aplikasi:
- Latar warna jenuh penuh yang **berselang-seling dengan blok lebih gelap**, kartu-kartu bersudut sangat bulat yang lebih terang.
- Blok **"in numbers"**: judul + **empat kartu statistik besar** (angka besar tebal + label kecil) dengan ilustrasi orang di sisi dan lencana penghargaan.
- Blok **Reviews**: kartu ulasan dengan avatar berhias, nama, kutipan, dan tautan "Read full →".
- Blok **FAQ**: baris accordion bersudut bulat, pertanyaan tebal, **tombol panah bulat** di kanan, ilustrasi karakter di sisi.
- Blok **tiga langkah bernomor 01 / 02 / 03** dengan mockup layar ponsel, di atas latar gelap.
- **Ilustrasi datar playful** dan stiker kecil berwarna (kuning, pink, oranye) sebagai dekor.
Adaptasikan menjadi **Griyaku**: warna dasar **#006A4E** (`Brand500`) berselang-seling dengan `Brand800`, kartu `Mint`, stiker `Sun400`/`Pink300`/`Coral400`. **Jangan menyalin** merek, teks, atau ilustrasi dari foto; buat ilustrasi dan aset orisinal.

# ARSITEKTUR
Single-activity, Navigation Compose, MVVM/MVI + Clean Architecture, Hilt, Retrofit/OkHttp + kotlinx.serialization, Coil, Room (cache), DataStore, WorkManager, FCM. OkHttp `Authenticator` untuk refresh token otomatis; token disimpan terenkripsi (Keystore). Modul: `app`, `core:{designsystem,network,data,common}`, `feature:{onboarding,auth,home,search,product,cart,checkout,orders,wishlist,help,account,shop}`. Gradle Kotlin DSL + version catalog. Kode UI dapat dipakai ulang bila kelak pindah ke Kotlin Multiplatform.

# DESIGN SYSTEM COMPOSE (`core:designsystem`)
Token dari DESIGN.md §9.2 (`GriyakuColors`, `GriyakuShapes`, tipografi Bricolage Grotesque + Plus Jakarta Sans di `res/font`). Komponen:
- `BrandBand(tone: Primary | Dark | Light)`: pita latar bergantian.
- `StatCard`: angka display + label, count-up sekali saat tampil.
- `ReviewCard`: avatar, lencana "Pembeli terverifikasi", bintang, kutipan 3 baris, "Baca selengkapnya →".
- `FaqItem`: accordion `animateContentSize()` + tombol panah bulat 40 dp yang berputar.
- `StepHeader(number: "01")`: angka besar + judul + deskripsi.
- `StickerBadge`, `RoundBadge`, `CategoryTile`, `ProductCard` (pola Tokopedia), `PillButton` (cta/primary/outline), `SearchPill`, `Chip`, `Skeleton`, `EmptyState` (ilustrasi + 1 kalimat + 1 tombol), `PriceText` (format `Rp 349.000`, `tnum`).
- `GriyakuMotion` (DESIGN.md §9.5). Hormati skala animator sistem.

# LAYAR YANG HARUS DIBANGUN
1. **Splash + Onboarding 3 halaman** bergaya "01 / 02 / 03" (latar Brand500/Brand800, ilustrasi orisinal, CTA kuning).
2. **Masuk/Daftar**.
3. **Beranda**: header hijau + lokasi + search pill, banner bento "Rumah Nyaman" (produk miring menembus tepi kartu), kategori, Flash Sale (pita gelap, kartu Mint, hitung mundur), Rekomendasi (grid 2 kolom, infinite scroll).
4. **Kategori dan Pencarian** (saran, filter lewat bottom sheet, urutkan).
5. **Detail produk**: galeri pager, varian, kartu toko, **pita gelap "Ulasan"** berisi `ReviewCard` horizontal, produk serupa, bar bawah melekat (Chat, + Keranjang, Beli); transisi elemen bersama dari daftar.
6. **Profil toko**: blok **"Toko dalam angka"** (4 `StatCard`), tab Produk/Ulasan/Info.
7. **Keranjang** (kelompok per toko) dan **Checkout** dengan stepper **01 Alamat · 02 Kirim · 03 Bayar** (layar transaksi: Canvas + kartu Paper, tenang).
8. **Pesanan** (chip status) dan **Detail pesanan** (pelacakan bernomor).
9. **Wishlist**, **Notifikasi**.
10. **Pusat Bantuan**: latar Brand500, accordion FAQ + tombol panah bulat + ilustrasi.
11. **Akun**: profil, alamat, voucher, "Tentang Griyaku" dengan **"Griyaku dalam angka"**.
Bottom nav: Beranda · Kategori · Wishlist · Pesanan · Akun; ikon keranjang di kanan atas dengan badge.

# KRITERIA PENERIMAAN
- [ ] Layar pemasaran (onboarding, header beranda, profil toko, ulasan, bantuan) memakai irama pita warna bergantian seperti foto 2; layar transaksi tenang.
- [ ] Ada kartu statistik, kartu ulasan, accordion FAQ dengan tombol panah bulat, dan langkah bernomor 01/02/03.
- [ ] Hanya token `GriyakuColors`/`GriyakuShapes`; tidak ada warna literal di layar.
- [ ] Semua target sentuh ≥ 48 dp; `contentDescription` lengkap; font 200% tidak merusak tata letak; TalkBack membaca `ProductCard` dengan benar.
- [ ] Animasi mengikuti `GriyakuMotion`; mulus 60 fps pada daftar (`key` pada Lazy list, tanpa recomposition berlebih).
- [ ] Refresh token otomatis berjalan; mode pesawat menampilkan data cache + pesan galat ramah.
- [ ] `./gradlew ktlintCheck detekt test` hijau; alur beli sampai bayar (mock) berjalan di emulator.

# CARA VERIFIKASI (wajib dilakukan)
Jalankan di emulator, ambil tangkapan layar tiap layar (atau uji screenshot Roborazzi/Paparazzi), **bandingkan dengan irama visual foto 2**, perbaiki perbedaan, ulangi minimal dua iterasi. Simpan hasil di `docs/reports/ui-mobile/`.
````

---

## 5. Prompt review dan perbaikan

**Review kode (akhir tiap fase)**

````text
Lakukan code review menyeluruh atas perubahan fase ini sebagai reviewer senior yang skeptis. Periksa: kepatuhan pada Aturan Besi (terutama Next.js hanya UI, Go tanpa logika domain/DB, Java sumber kebenaran), kebenaran logika (transaksi, konkurensi, idempotensi, uang integer), keamanan (authz, injeksi, secret, CSRF/CORS), performa (N+1, cache, indeks), kualitas pengujian (kasus tepi, bukan hanya jalur bahagia), dan kebersihan kode. Jalankan build, lint, dan semua uji. Daftar temuan terurut berdasarkan tingkat keparahan dengan file:baris dan skenario kegagalan konkret, lalu perbaiki yang kritis dan tinggi, dan laporkan sisanya.
````

**Review UI terhadap referensi**

````text
Bandingkan tangkapan layar terbaru dengan foto referensi (web: docs/reference/ref-web.png; mobile: docs/reference/ref-mobile.png) dan dengan DESIGN.md. Buat tabel selisih: struktur tata letak, proporsi, tipografi, warna (harus token), radius, spasi, animasi. Perbaiki semua selisih yang bukan disengaja, pastikan #006A4E dipakai sebagai warna utama, lalu ambil tangkapan layar ulang. Pastikan tidak ada merek, teks, atau ilustrasi dari referensi yang tersalin.
````

**Review keamanan**

````text
Audit keamanan seluruh sistem terhadap OWASP ASVS dan API Security Top 10: autentikasi dan sesi, otorisasi per objek (BOLA), rate limit, validasi input, unggahan, webhook, header keamanan, CORS/CSRF, logging data pribadi, dependensi rentan. Untuk setiap temuan beri bukti (file:baris atau permintaan uji), dampak, dan perbaikan. Perbaiki yang kritis/tinggi dan tambahkan uji regresinya.
````

---

## 6. Tips

- **Satu fase, satu sesi.** Sesi pendek dan terfokus menghasilkan kode lebih rapi daripada satu sesi raksasa. Simpan ringkasan di `docs/plan-fase-N.md`.
- **Paralelkan setelah kontrak stabil.** Setelah Fase 2, jalankan agen terpisah untuk web (Fase 3), Android (Fase 8), dan backend (Fase 4–6) pada cabang berbeda; `contracts/openapi.yaml` jadi titik sinkron.
- **Selalu lampirkan foto** saat mengerjakan UI, dan minta agen membandingkan tangkapan layar dengan foto.
- **Mulai dari mock.** Jangan menunggu kunci Midtrans/Biteship/FCM; adapter mock cukup sampai Fase 9.
- **Ganti nama merek di awal.** Bila nama final sudah ada, ganti `Griyaku`/`griyaku`/`id.griyaku` sebelum Fase 0 agar tidak perlu refactor besar.
- **Gambar produk cutout** menentukan kesan hero. Siapkan 3–4 foto produk berlatar transparan (WebP/AVIF) sebelum Fase 3.
- **Jika animasi terasa berat**, kurangi jumlah elemen yang bergerak bersamaan sebelum menurunkan kualitas visual; lihat DESIGN.md §8.5.
