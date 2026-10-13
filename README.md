# Griyaku

> **Marketplace alat rumah tangga** bergaya Tokopedia: multi-toko, keranjang per toko, pembayaran aman, pelacakan pesanan.
> Web **Next.js + TypeScript** (hanya UI) · Gateway **Go** · Backend **Java (Spring Boot)** · Mobile **Kotlin (Jetpack Compose)** · Data di **Docker**.

*Griyaku adalah nama kerja. Ganti dengan merek Anda (cari `Griyaku` / `griyaku` di seluruh repo).*

Warna utama **`#006A4E`**. Gaya visual: web mengikuti `docs/reference/ref-web.png` (foto 1), mobile mengikuti `docs/reference/ref-mobile.png` (foto 2). Detail lengkap di [`DESIGN.md`](./DESIGN.md).

---

## Daftar isi

1. [Ringkasan](#ringkasan)
2. [Fitur](#fitur)
3. [Arsitektur](#arsitektur)
4. [Tech stack](#tech-stack)
5. [Struktur repositori](#struktur-repositori)
6. [Prasyarat](#prasyarat)
7. [Mulai cepat](#mulai-cepat)
8. [Konfigurasi](#konfigurasi)
9. [Port dan layanan](#port-dan-layanan)
10. [Perintah umum](#perintah-umum)
11. [Menjalankan tiap aplikasi](#menjalankan-tiap-aplikasi)
12. [Kontrak API](#kontrak-api)
13. [Desain UI](#desain-ui)
14. [Pengujian](#pengujian)
15. [Keamanan](#keamanan)
16. [Observability](#observability)
17. [Konvensi kontribusi](#konvensi-kontribusi)
18. [Roadmap](#roadmap)
19. [Troubleshooting](#troubleshooting)

---

## Ringkasan

Griyaku mempertemukan **pembeli** dan **penjual (toko)** alat rumah tangga: peralatan dapur, kebersihan, elektronik rumah, perabot, dan perlengkapan rumah lainnya.

Prinsip arsitektur yang tidak boleh dilanggar:

| # | Aturan |
|---|---|
| 1 | **Next.js hanya untuk UI.** Tidak ada logika bisnis, akses database, atau Route Handler yang memanggil DB di `apps/web`. Semua data datang dari Gateway. |
| 2 | **Go = jaringan dan middleware.** Gateway/BFF menangani routing, autentikasi token, rate limit, cache, agregasi, WebSocket/SSE, webhook, observability. Tanpa logika domain. |
| 3 | **Java = backend dan sumber kebenaran bisnis.** Semua aturan domain, transaksi, dan akses database ada di sini. |
| 4 | **Kotlin = klien Android** yang hanya berbicara dengan Gateway, sama seperti web. |
| 5 | **Docker = data dan infrastruktur lokal** (PostgreSQL, Redis, Meilisearch, MinIO, RabbitMQ, Mailpit). |
| 6 | **OpenAPI adalah kontrak tunggal** antara semua klien dan server. |

---

## Fitur

### Pembeli
- Daftar/masuk (email + kata sandi, opsional Google), profil, buku alamat (provinsi → kelurahan + kode pos)
- Beranda (hero, kategori, flash sale, rekomendasi), pencarian dengan saran dan filter, halaman kategori
- Detail produk: galeri, varian, stok, ulasan berfoto, diskusi, produk serupa
- Wishlist, keranjang **dikelompokkan per toko**, voucher platform dan toko
- Checkout 3 langkah (alamat → pengiriman → pembayaran), pembayaran sandbox (Midtrans/Xendit), **rekening bersama (escrow)**
- Pesanan: status, pelacakan, konfirmasi terima, ulasan, komplain/retur
- Notifikasi (in-app, email, push FCM), chat dengan penjual

### Penjual (Seller Center)
- Buka toko, kelola profil toko, produk (CRUD, varian, gambar, stok), promo
- Pesanan masuk, input resi, cetak label, saldo dan penarikan dana (simulasi)
- Statistik toko (rating, pesanan tepat waktu, produk terjual)

### Admin
- Moderasi produk/toko, kategori, voucher platform, banner beranda, sengketa

> **Prioritas:** P0 (MVP) = pembeli inti + penjual dasar. P1 = ulasan, wishlist, voucher, notifikasi. P2 = chat, flash sale, retur, admin lengkap.

---

## Arsitektur

```mermaid
flowchart LR
  subgraph Clients
    W["Web · Next.js + TS + Tailwind + GSAP<br/>(UI only)"]
    A["Android · Kotlin + Compose"]
  end

  GW["API Gateway / BFF · Go<br/>auth · rate limit · cache · agregasi · WS/SSE · webhook"]

  subgraph Backend["Java · Spring Boot"]
    CORE["core-api (modular monolith)<br/>identity · catalog · cart · order · payment<br/>shipping · review · promotion · seller · notification"]
  end

  subgraph Docker["Docker Compose (dev)"]
    PG[("PostgreSQL")]
    RD[("Redis")]
    MS[("Meilisearch")]
    S3[("MinIO (S3)")]
    MQ[("RabbitMQ")]
  end

  PSP["Payment gateway"] -. webhook .-> GW
  W -- "HTTPS + cookie httpOnly" --> GW
  A -- "HTTPS + Bearer JWT" --> GW
  GW -- "REST + header internal" --> CORE
  GW --> RD
  CORE --> PG
  CORE --> RD
  CORE --> MS
  CORE --> S3
  CORE --> MQ
```

**Keputusan utama**

- **Modular monolith dulu.** `core-api` dibagi modul dengan batas jelas (Spring Modulith), tiap modul punya *schema* PostgreSQL sendiri. Modul dapat dipecah menjadi layanan terpisah nanti tanpa mengubah kontrak klien karena semua lewat Gateway.
- **Autentikasi**: `identity` menerbitkan JWT akses (ES256/RS256, 15 menit) dan refresh token berotasi (disimpan ter-hash). Gateway memverifikasi JWT secara lokal dari **JWKS** yang di-*cache*, lalu meneruskan identitas lewat header internal yang ditandatangani. Web memakai cookie `httpOnly` yang diatur Gateway; Android menyimpan token di penyimpanan terenkripsi.
- **Event**: perubahan penting (pesanan dibayar, stok berubah, produk diperbarui) lewat *transactional outbox* → RabbitMQ → indexer Meilisearch, notifikasi, dsb.
- **Pembayaran**: Gateway menerima webhook PSP, memverifikasi tanda tangan dan *idempotency*, lalu meneruskan ke `payment` di Java.
- **Provider eksternal** (pembayaran, ongkir, push) memakai pola *adapter* dengan implementasi **mock** untuk dev, sehingga proyek berjalan tanpa kunci API.

---

## Tech stack

| Lapisan | Teknologi |
|---|---|
| Web UI | Next.js (App Router, versi stabil terbaru), React, **TypeScript strict**, **Tailwind CSS v4**, **GSAP** (`gsap`, `@gsap/react`, ScrollTrigger), TanStack Query, React Hook Form + Zod, Radix UI, `lucide-react`, `next/font` |
| Gateway | **Go** ≥ 1.24, `net/http` + `chi`, `slog`, `go-redis`, `golang-jwt`/`jwx` (JWKS), OpenTelemetry, Prometheus client, `oapi-codegen` |
| Backend | **Java** 21+ (LTS), **Spring Boot** (versi stabil terbaru), Spring Web, Spring Security (OAuth2 Resource Server), Spring Data JPA, Spring Modulith, Flyway, Validation, springdoc/OpenAPI, MapStruct, Gradle (Kotlin DSL) |
| Mobile | **Kotlin**, Jetpack Compose + Material 3, Navigation Compose, Hilt, Retrofit/OkHttp + kotlinx.serialization (atau Ktor client), Coil, Room, DataStore, WorkManager, Firebase Cloud Messaging |
| Data | PostgreSQL 16+, Redis 7+, Meilisearch (pencarian), MinIO (objek/gambar), RabbitMQ (event) |
| Dev & CI | Docker Compose, GitHub Actions, Makefile, pnpm, Spectral (lint OpenAPI), Testcontainers |
| Observability | OpenTelemetry → Jaeger, Prometheus, Grafana, log JSON terstruktur |

Versi persis dikunci di `package.json` + `pnpm-lock.yaml`, `go.mod`, `build.gradle.kts` + version catalog. Jangan menebak versi: periksa rilis stabil terbaru saat memulai.

---

## Struktur repositori

```
griyaku/
├─ apps/
│  ├─ web/                      # Next.js, UI saja
│  │  └─ src/
│  │     ├─ app/                # rute (App Router)
│  │     ├─ components/         # ui/, home/, product/, cart/, ...
│  │     ├─ lib/                # api-client (hasil generate), format, motion
│  │     └─ styles/globals.css  # token Tailwind (lihat DESIGN.md)
│  └─ android/                  # Kotlin + Compose
│     └─ app/src/main/java/id/griyaku/app/
│        ├─ core/               # designsystem, network, data, common
│        └─ feature/            # onboarding, home, product, cart, checkout, orders, help, account
├─ services/
│  ├─ gateway/                  # Go
│  │  ├─ cmd/gateway/main.go
│  │  └─ internal/              # config, router, middleware, proxy, auth, cache, ratelimit, aggregate, webhook, ws, telemetry
│  └─ core-api/                 # Java Spring Boot (modular monolith)
│     └─ src/main/java/id/griyaku/core/
│        ├─ identity/ catalog/ cart/ order/ payment/
│        ├─ shipping/ review/ promotion/ seller/ notification/
│        └─ shared/             # error, security, outbox, util
├─ contracts/
│  ├─ openapi.yaml              # sumber kebenaran API
│  └─ events/                   # skema event (JSON Schema)
├─ infra/
│  ├─ docker/                   # compose.yml, compose.app.yml, compose.obs.yml
│  ├─ db/                       # init & seed
│  └─ observability/            # prometheus.yml, grafana/, otel-collector.yaml
├─ docs/
│  ├─ PROMPT.md                 # prompt pembangunan (boleh juga di root)
│  ├─ architecture.md
│  └─ reference/
│     ├─ ref-web.png            # foto 1
│     └─ ref-mobile.png         # foto 2
├─ .github/workflows/
├─ .env.example
├─ Makefile
├─ DESIGN.md
└─ README.md
```

---

## Prasyarat

| Alat | Versi |
|---|---|
| Docker + Docker Compose | terbaru |
| Node.js + pnpm | Node LTS terbaru, pnpm 9+ |
| Go | ≥ 1.24 |
| JDK | 21+ (LTS) |
| Android Studio | terbaru (JDK bawaan) + Android SDK, emulator API 34+ |
| Make | opsional, sangat disarankan |

---

## Mulai cepat

```bash
git clone <url-repo> griyaku && cd griyaku
cp .env.example .env              # isi nilai rahasia lokal, jangan di-commit

make up                           # PostgreSQL, Redis, Meilisearch, MinIO, RabbitMQ, Mailpit
make dev-api                      # terminal 1: Spring Boot  → :8081 (Flyway jalan otomatis)
make seed                         # data contoh: kategori, toko, produk, voucher
make dev-gateway                  # terminal 2: Go gateway    → :8080
make dev-web                      # terminal 3: Next.js       → :3000
```

Buka **http://localhost:3000**. Akun contoh dibuat oleh `make seed` (lihat `infra/db/seed/README.md`).

Semua dalam kontainer: `make up-all` (profil `app`). Dengan observability: `make up-obs`.

---

## Konfigurasi

Salin `.env.example` → `.env`. **Jangan pernah meng-commit rahasia.**

| Variabel | Contoh (dev) | Dipakai oleh |
|---|---|---|
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | `griyaku` / `change-me` / `griyaku` | Docker, core-api |
| `REDIS_URL` | `redis://localhost:6379` | gateway, core-api |
| `MEILI_URL` / `MEILI_MASTER_KEY` | `http://localhost:7700` / `change-me` | core-api |
| `MINIO_ENDPOINT` / `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` | `http://localhost:9000` / … | core-api |
| `RABBITMQ_URL` | `amqp://guest:guest@localhost:5672` | core-api |
| `JWT_ISSUER` | `http://localhost:8081` | core-api, gateway |
| `JWT_PRIVATE_KEY_PATH` | `./secrets/jwt-private.pem` | core-api |
| `JWKS_URL` | `http://localhost:8081/.well-known/jwks.json` | gateway |
| `GATEWAY_INTERNAL_SECRET` | `change-me` | gateway, core-api (tanda tangan header internal) |
| `UPSTREAM_CORE_URL` | `http://localhost:8081` | gateway |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | gateway (CORS) |
| `COOKIE_DOMAIN` / `COOKIE_SECURE` | `localhost` / `false` | gateway |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8080/api/v1` | web |
| `PAYMENT_PROVIDER` | `mock` \| `midtrans` \| `xendit` | core-api |
| `MIDTRANS_SERVER_KEY` / `MIDTRANS_CLIENT_KEY` | kunci sandbox | core-api / web |
| `PAYMENT_WEBHOOK_SECRET` | `change-me` | gateway |
| `SHIPPING_PROVIDER` | `mock` \| `biteship` \| `rajaongkir` | core-api |
| `SHIPPING_API_KEY` | kunci sandbox | core-api |
| `FCM_CREDENTIALS_PATH` | `./secrets/fcm.json` | core-api |
| `SMTP_HOST` / `SMTP_PORT` | `localhost` / `1025` (Mailpit) | core-api |

Android: `apps/android/local.properties` → `API_BASE_URL=http://10.0.2.2:8080/api/v1` (alamat host dari emulator).

---

## Port dan layanan

| Layanan | Port | Keterangan |
|---|---|---|
| Web (Next.js) | 3000 | UI |
| Gateway (Go) | 8080 | satu-satunya pintu masuk klien |
| core-api (Spring Boot) | 8081 | internal |
| PostgreSQL | 5432 | |
| Redis | 6379 | |
| Meilisearch | 7700 | |
| MinIO | 9000 / 9001 | API / konsol |
| RabbitMQ | 5672 / 15672 | AMQP / konsol |
| Mailpit | 1025 / 8025 | SMTP / UI email dev |
| Prometheus | 9090 | profil `obs` |
| Grafana | 3001 | profil `obs` |
| Jaeger | 16686 | profil `obs` |

---

## Perintah umum

| Perintah | Fungsi |
|---|---|
| `make up` / `make down` | Nyalakan / matikan infrastruktur Docker |
| `make up-all` | Infrastruktur + gateway + core-api + web dalam kontainer |
| `make up-obs` | Tambah Prometheus, Grafana, Jaeger |
| `make dev-web` | `pnpm --filter web dev` |
| `make dev-gateway` | `go run ./services/gateway/cmd/gateway` |
| `make dev-api` | `./gradlew :services:core-api:bootRun` |
| `make seed` | Muat data contoh |
| `make gen` | Generate klien/server dari `contracts/openapi.yaml` (TS, Go, Kotlin) |
| `make lint` | ESLint, `golangci-lint`, Spotless/Checkstyle, ktlint, Spectral |
| `make test` | Semua pengujian unit |
| `make e2e` | Playwright + kontrak API |
| `make reset-db` | Hapus volume dan buat ulang (**menghapus data lokal**) |

---

## Menjalankan tiap aplikasi

**Web**
```bash
cd apps/web
pnpm install
pnpm dev            # http://localhost:3000
pnpm typecheck && pnpm lint && pnpm test
```

**Gateway**
```bash
cd services/gateway
go run ./cmd/gateway
go test ./... -race
```

**Backend**
```bash
./gradlew :services:core-api:bootRun
./gradlew :services:core-api:test      # Testcontainers butuh Docker
```

**Android**: buka `apps/android` di Android Studio → jalankan konfigurasi `app` pada emulator. Pastikan Gateway aktif di `:8080`.

---

## Kontrak API

- Sumber kebenaran: [`contracts/openapi.yaml`](./contracts/openapi.yaml), versi `/api/v1`.
- Galat memakai **RFC 9457** (`application/problem+json`) dengan `traceId`.
- Paginasi *cursor*: `?limit=24&cursor=…`. Uang dalam **rupiah sebagai bilangan bulat** (`amount: 349000`, `currency: "IDR"`), tidak pernah *float*.
- Pembuatan pesanan dan pembayaran wajib header `Idempotency-Key`.
- Perubahan kontrak: ubah `openapi.yaml` → `make gen` → perbarui implementasi → CI memverifikasi (Spectral + contract test).

Ringkasan rute utama (lihat file kontrak untuk lengkapnya):

| Area | Contoh |
|---|---|
| Auth | `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout` |
| Akun | `GET/PATCH /me`, `/me/addresses` |
| Katalog | `GET /categories`, `/products`, `/products/{slug}`, `/search`, `/search/suggest` |
| Keranjang | `GET /cart`, `POST /cart/items`, `PATCH/DELETE /cart/items/{id}` |
| Checkout | `POST /checkout/preview`, `POST /orders` |
| Pesanan | `GET /orders`, `GET /orders/{id}`, `POST /orders/{id}/confirm-received` |
| Pembayaran | `POST /payments`, webhook `POST /webhooks/payments/{provider}` |
| Seller | `/seller/products`, `/seller/orders`, `/seller/balance` |
| Beranda | `GET /home` (agregasi di Gateway) |

---

## Desain UI

- **Web**: hero hijau `#006A4E` penuh dengan judul raksasa "Rumah Nyaman", produk miring menimpa judul, lencana bulat, tombol pill kuning, dan kartu kategori yang terpotong di tepi kanan (mengikuti foto 1). Halaman transaksi dibuat tenang dan putih.
- **Mobile**: pita warna hijau bergantian, kartu angka, kartu ulasan, accordion FAQ dengan tombol panah bulat, langkah bernomor 01/02/03, dan ilustrasi datar (mengikuti foto 2).
- **Animasi web**: GSAP + ScrollTrigger lewat `useGSAP`, menghormati `prefers-reduced-motion`.
- Token, komponen, koreografi animasi, dan blueprint halaman: **[`DESIGN.md`](./DESIGN.md)**.

> Foto referensi hanya acuan tata letak dan gaya. Jangan menyalin merek, teks, atau ilustrasi dari sana.

---

## Pengujian

| Lapisan | Alat | Target |
|---|---|---|
| Web | Vitest + Testing Library, Playwright, axe | Komponen kunci, alur beli e2e, a11y tanpa pelanggaran serius |
| Gateway | `go test -race`, `httptest` | Middleware (auth, rate limit, cache), proxy, webhook, circuit breaker |
| Backend | JUnit 5, Testcontainers, ArchUnit/Modulith verify | Aturan domain, state machine pesanan, batas modul |
| Android | JUnit, Turbine, Compose UI test | ViewModel, repository, layar inti |
| Kontrak | Spectral, Schemathesis (atau Dredd) | Implementasi sesuai `openapi.yaml` |
| Beban | k6 | `/home`, `/search`, `/orders` pada beban realistis |

Cakupan minimum yang disarankan: logika domain ≥ 80%, middleware Gateway ≥ 80%.

---

## Keamanan

- Kata sandi: **Argon2id**. Pembatasan percobaan login (Redis) dan penguncian sementara.
- JWT akses singkat, refresh token berotasi dan dapat dicabut; deteksi pemakaian ulang refresh token.
- Web: cookie `httpOnly`, `Secure`, `SameSite=Lax` + perlindungan CSRF untuk metode yang mengubah data.
- CORS ketat (daftar origin eksplisit), header keamanan (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`).
- Validasi input di Gateway (ukuran, tipe) dan di Java (Bean Validation). Query berparameter saja.
- Webhook: verifikasi tanda tangan, cek *replay* dan *idempotency*.
- Unggahan: validasi tipe/ukuran, pindai ekstensi, simpan di MinIO dengan nama acak, sajikan lewat URL bertanda tangan.
- Data pribadi (alamat, telepon) tidak masuk log; log memakai `traceId` dan ID pengguna.
- Rahasia hanya dari environment/secret manager. Pindai dependensi (Dependabot, `govulncheck`, OWASP Dependency-Check, `pnpm audit`).
- Acuan: OWASP ASVS dan OWASP API Security Top 10.

---

## Observability

- Log JSON terstruktur di semua layanan (`slog`, Logback JSON), `traceId` diteruskan Gateway → Java.
- Metrik Prometheus: `http_server_duration`, `upstream_errors_total`, `ratelimit_rejected_total`, `orders_created_total`, `payments_paid_total`.
- Trace OpenTelemetry end-to-end (Web → Gateway → Java → DB) ke Jaeger.
- Health: Gateway `/healthz` (liveness) dan `/readyz` (cek upstream, Redis); Java `/actuator/health`.
- Dasbor Grafana awal tersedia di `infra/observability/grafana/`.

---

## Konvensi kontribusi

- **Commit**: Conventional Commits (`feat(web): hero beranda`, `fix(gateway): retry idempoten`).
- **Cabang**: `feat/*`, `fix/*`, `chore/*`; PR kecil dan fokus.
- **PR wajib lulus**: lint, typecheck, test, `make gen` tanpa diff, build Docker.
- **Kode**: TypeScript `strict` tanpa `any` implisit; Go `gofmt` + `golangci-lint`; Java Spotless; Kotlin ktlint/detekt.
- **UI**: hanya token dari `DESIGN.md`; tidak ada hex literal di komponen.
- **Bahasa**: kode dan komentar teknis dalam Inggris; teks UI dan dokumentasi dalam Bahasa Indonesia.

---

## Roadmap

- [ ] **Fase 0: Fondasi.** Monorepo, Docker Compose, OpenAPI awal, CI, token desain
- [ ] **Fase 1: Identitas dan akun.** Registrasi/login/refresh, JWKS, profil, alamat, middleware auth Gateway
- [ ] **Fase 2: Katalog dan pencarian.** Kategori, produk, varian, gambar, indeks Meilisearch, `/home` agregat
- [ ] **Fase 3: UI web inti.** Design system, hero beranda (foto 1), pencarian, detail produk, animasi GSAP
- [ ] **Fase 4: Keranjang dan checkout.** Keranjang per toko, ongkir, voucher, pesanan terpisah per toko, reservasi stok
- [ ] **Fase 5: Pembayaran dan pesanan.** Sandbox PSP, webhook, state machine, escrow, notifikasi, halaman pesanan
- [ ] **Fase 6: Seller Center.** Toko, produk, pesanan masuk, resi, saldo
- [ ] **Fase 7: Engagement.** Ulasan, wishlist, diskusi/chat, voucher, flash sale, push
- [ ] **Fase 8: Android.** Design system Compose (foto 2), onboarding, beranda, produk, keranjang, checkout, pesanan, bantuan, akun
- [ ] **Fase 9: Hardening dan rilis.** Observability penuh, uji beban, review keamanan, a11y, performa, CI/CD

Prompt untuk tiap fase ada di [`PROMPT.md`](./PROMPT.md).

---

## Troubleshooting

| Masalah | Solusi |
|---|---|
| Android tidak bisa menjangkau API | Emulator memakai `10.0.2.2`, bukan `localhost`; perangkat fisik memakai IP LAN dan izinkan *cleartext* hanya di build debug |
| CORS ditolak di web | Pastikan `ALLOWED_ORIGINS` memuat `http://localhost:3000`, dan `credentials: "include"` pada klien |
| Cookie tidak tersimpan | Dev: `COOKIE_SECURE=false`, `SameSite=Lax`; pastikan web dan Gateway di host yang sama (`localhost`) |
| `401` terus-menerus | Cek `JWKS_URL` dan jam sistem (selisih waktu merusak validasi `exp`) |
| Testcontainers gagal | Docker harus berjalan; di CI aktifkan layanan Docker |
| Animasi GSAP tidak jalan / berulang | Pastikan komponen `"use client"`, memakai `useGSAP` dengan `scope`, dan tidak ada animasi ganda pada properti yang sama |
| Port bentrok | Ubah di `.env` dan `infra/docker/compose.yml` |
| Disk penuh | `docker system prune` (hati-hati) atau `make reset-db` |

---

## Lisensi

Tentukan lisensi proyek Anda (mis. MIT atau proprietary) sebelum rilis publik. Periksa juga lisensi font (Bricolage Grotesque, Plus Jakarta Sans: SIL OFL) dan pustaka pihak ketiga.
#   G r i y a k u  
 