# Rencana Pelaksanaan Fase 0 — Fondasi

> Proyek: Griyaku (Marketplace Alat Rumah Tangga)  
> Dokumen acuan: `README.md`, `DESIGN.md`, `PROMPT.md` (Fase 0)

---

## 1. Tujuan Fase 0
Membangun fondasi monorepo, spesifikasi kontrak awal, konfigurasi infrastruktur Docker, skeleton lengkap empat aplikasi (`apps/web`, `services/gateway`, `services/core-api`, `apps/android`), CI workflows, dan alur pembuktian verifikasi `/api/v1/ping` (Web → Gateway → Java → Database).

---

## 2. Rincian Pekerjaan

### 2.1 Struktur Monorepo & Konfigurasi Root
- Root `pnpm-workspace.yaml`, `package.json`
- `.env.example` mencakup seluruh variabel dari tabel README
- `Makefile` lengkap dengan target: `up`, `down`, `up-all`, `up-obs`, `dev-web`, `dev-gateway`, `dev-api`, `seed`, `gen`, `lint`, `test`, `e2e`, `reset-db`
- Konfigurasi editor & linter root (`.editorconfig`, `.gitignore`)

### 2.2 Kontrak API (`contracts/`)
- `contracts/openapi.yaml`:
  - OpenAPI 3.1
  - Security schemes: `BearerAuth`, `CookieAuth`
  - Model umum: RFC 9457 `ProblemDetail`, `Money` (integer IDR), `CursorPagination`
  - Endpoint: `/healthz`, `/readyz`, `/api/v1/ping`, stub `/api/v1/auth/*`, stub `/api/v1/products`
- `.spectral.yaml` untuk linter OpenAPI

### 2.3 Infrastruktur Docker (`infra/`)
- `infra/docker/compose.yml`:
  - PostgreSQL 16 (healthcheck, init script multi-schema modulith)
  - Redis 7 (healthcheck)
  - Meilisearch v1.11 (healthcheck, master key)
  - MinIO (healthcheck + container init mc auto-create bucket `griyaku-media`)
  - RabbitMQ 3.13-management (healthcheck)
  - Mailpit (SMTP & web UI)
- `infra/docker/compose.app.yml` (gateway, core-api, web)
- `infra/docker/compose.obs.yml` (prometheus, grafana, jaeger, otel-collector)
- `infra/db/init/01-init-schemas.sql`

### 2.4 Gateway Go (`services/gateway/`)
- Go 1.24+ module (`services/gateway/go.mod`)
- Entry point `cmd/gateway/main.go`
- Rantai middleware: panic recovery, request ID / trace context, access log slog JSON, security headers, CORS, body limit, placeholder auth/rate limit, reverse proxy HMAC
- Endpoint internal Gateway: `/healthz`, `/readyz`, reverse proxy ke upstream core-api (`/api/v1/ping`)
- Unit test middleware dan health check (`go test ./...`)

### 2.5 Backend Java Spring Boot (`services/core-api/`)
- Gradle Kotlin DSL multi-module / single service modular monolith
- Spring Boot 3.3+ / Java 21 LTS
- Flyway migration awal `V1__init_shared.sql`
- Struktur modul Spring Modulith:
  - `shared`, `identity`, `catalog`, `cart`, `order`, `payment`, `shipping`, `review`, `promotion`, `seller`, `notification`
- Controller `/api/v1/ping` mengembalikan status service dan versi database
- Unit test Spring Boot context & endpoint `/ping`

### 2.6 Frontend Web Next.js (`apps/web/`)
- Next.js 15+ App Router, TypeScript `strict`
- Tailwind CSS v4 dengan token lengkap dari `DESIGN.md` §3.1 di `src/styles/globals.css`
- Font setup `next/font`: Bricolage Grotesque & Plus Jakarta Sans
- Komponen dasar (Button, Badge, Card)
- Halaman beranda placeholder (`src/app/page.tsx`) menampilkan status ping Web → Gateway
- ESLint, Prettier, Vitest setup

### 2.7 Mobile Android Kotlin (`apps/android/`)
- Modul Gradle: `core:designsystem`, `app`
- Jetpack Compose + Material 3 tema Griyaku (`GriyakuColors`, `GriyakuShapes`, Typography)

### 2.8 CI GitHub Actions (`.github/workflows/`)
- `ci-web.yml`, `ci-gateway.yml`, `ci-core-api.yml`, `ci-contracts.yml` dengan path filter

---

## 3. Kriteria Penyelesaian (Definition of Done)
1. Semua direktori dan berkas kerangka terbuat sesuai arsitektur README.
2. Build, lint, dan test untuk Gateway dan Web berhasil dijalankan.
3. Kontrak OpenAPI tervalidasi.
4. Endpoint `/api/v1/ping` berjalan dan terverifikasi.
