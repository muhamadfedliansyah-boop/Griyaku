import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoundBadge } from "@/components/ui/badge";
import { HeroMotion } from "@/components/home/hero-motion";

async function getPingData() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";
  try {
    const res = await fetch(`${apiBase}/ping`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        status: "error",
        detail: `Gateway HTTP ${res.status}`,
      };
    }
    return await res.json();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      status: "offline",
      detail: message,
    };
  }
}

export default async function HomePage() {
  const pingData = await getPingData();

  return (
    <main className="min-h-screen bg-canvas overflow-x-hidden">
      {/* ========================================================= */}
      {/* HERO SECTION — Mengikuti Tata Letak Foto 1 & DESIGN.md   */}
      {/* ========================================================= */}
      <section className="relative w-full min-h-[720px] lg:min-h-screen bg-brand-500 text-white flex flex-col justify-between p-6 md:p-10 lg:p-12 overflow-hidden selection:bg-sun-400 selection:text-ink-900">
        <HeroMotion>
          {/* Header Navigasi Minimal */}
          <header className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto mb-8">
            <div className="flex items-center gap-8">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white flex items-center gap-1">
                griyaku<span className="text-sun-400">✦</span>
              </span>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/90">
                <Link href="#kategori" className="hover:text-sun-400 transition-colors">
                  Kategori
                </Link>
                <Link href="#promo" className="hover:text-sun-400 transition-colors">
                  Promo
                </Link>
                <Link href="#toko-resmi" className="hover:text-sun-400 transition-colors">
                  Toko Resmi
                </Link>
                <Link href="#bantuan" className="hover:text-sun-400 transition-colors">
                  Bantuan
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                aria-label="Cari produk"
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                🔍
              </button>
              <button
                aria-label="Keranjang belanja"
                className="relative p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                🛒
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-coral-400 rounded-full" />
              </button>
              <Button variant="outline" className="hidden sm:inline-flex text-sm py-2 px-5">
                Masuk
              </Button>
            </div>
          </header>

          {/* Area Tengah: Judul Raksasa + Produk Cutout Miring */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-6 md:my-10 text-center w-full max-w-6xl mx-auto">
            {/* Judul Raksasa 'Rumah Nyaman' */}
            <div className="relative flex flex-col items-center justify-center select-none w-full">
              <div className="overflow-hidden">
                <h1
                  data-hero-word
                  className="font-display font-extrabold text-[clamp(4.5rem,15vw,13rem)] leading-[0.85] tracking-tight text-white uppercase"
                >
                  Rumah Nyaman
                </h1>
              </div>

              {/* Produk Cutout Miring Menimpa Judul (Parallax -> Float -> Tilt) */}
              <div
                data-hero-parallax
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                <div data-hero-float>
                  <div
                    data-hero-tilt
                    className="relative -rotate-[16deg] w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
                  >
                    {/* Visual Cutout Produk Alat Rumah Tangga */}
                    <div className="relative w-48 h-56 md:w-60 md:h-72 bg-gradient-to-tr from-mint-300 via-paper to-white rounded-3xl shadow-product flex flex-col items-center justify-center border-4 border-white/80 p-6 pointer-events-auto">
                      <span className="text-6xl md:text-7xl mb-2">🍳</span>
                      <span className="font-display font-bold text-ink-900 text-lg">
                        Air Fryer Pro
                      </span>
                      <span className="text-xs text-brand-600 font-semibold bg-brand-50 px-2 py-0.5 rounded-full mt-1">
                        4.5 Liter · Digital
                      </span>
                    </div>

                    {/* Lencana Garansi Resmi */}
                    <div
                      data-hero-badge
                      className="absolute -top-3 -right-3 rotate-[12deg] pointer-events-auto"
                    >
                      <RoundBadge text="Garansi Resmi" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol CTA Pill Kuning */}
            <div data-hero-cta className="relative z-40 mt-12 md:mt-16">
              <Link href="#katalog">
                <Button variant="cta" className="text-base md:text-lg px-8 py-4">
                  Belanja sekarang <span className="ml-2 font-black">→</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Bagian Bawah Hero: Tagline & Kartu Kategori Terpotong (Peek) */}
          <div className="relative z-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 w-full max-w-7xl mx-auto mt-6">
            <div className="max-w-xs text-left">
              <p className="font-sans font-medium text-white/90 text-sm md:text-base leading-snug">
                Alat rumah tangga pilihan, untuk semua rumah.
              </p>
              <p className="text-xs text-mint-200 mt-1">
                Koleksi peralatan dapur, kebersihan, & elektronik pilihan.
              </p>
            </div>

            {/* Scroller Kartu Kategori Peek Horizontal */}
            <div
              data-hero-card
              className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none snap-x"
            >
              <div className="snap-start shrink-0 w-52 md:w-60 h-36 bg-brand-800 rounded-3xl p-4 flex flex-col justify-between border border-brand-700/60 shadow-card">
                <div>
                  <h2 className="font-display font-bold text-lg text-white">Dapur</h2>
                  <p className="text-xs text-white/70">Mulai Rp 49 rb</p>
                </div>
                <span className="text-2xl self-end">🍲</span>
              </div>

              <div className="snap-start shrink-0 w-52 md:w-60 h-36 bg-mint-200 text-ink-900 rounded-3xl p-4 flex flex-col justify-between shadow-card">
                <div>
                  <h2 className="font-display font-bold text-lg text-ink-900">Kebersihan</h2>
                  <p className="text-xs text-ink-700">Mulai Rp 35 rb</p>
                </div>
                <span className="text-2xl self-end">🧹</span>
              </div>

              <div className="snap-start shrink-0 w-52 md:w-60 h-36 bg-sun-400 text-ink-900 rounded-3xl p-4 flex flex-col justify-between shadow-card">
                <div>
                  <h2 className="font-display font-bold text-lg text-ink-900">
                    Elektronik
                  </h2>
                  <p className="text-xs text-ink-700">Mulai Rp 99 rb</p>
                </div>
                <span className="text-2xl self-end">⚡</span>
              </div>
            </div>
          </div>
        </HeroMotion>
      </section>

      {/* ========================================================= */}
      {/* FASE 0 BUKTI KONEKTIVITAS: Web -> Gateway -> Java -> DB   */}
      {/* ========================================================= */}
      <section className="w-full max-w-4xl mx-auto my-12 p-6 md:p-8 bg-paper rounded-3xl shadow-card border border-line">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900">
              Verifikasi End-to-End Fase 0 (Fondasi)
            </h2>
            <p className="text-sm text-ink-500 mt-1">
              Jalur: Web (Next.js) → Gateway (Go :8080) → Core API (Java :8081) → Database
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              pingData.status === "ok"
                ? "bg-brand-50 text-brand-700 border border-brand-200"
                : "bg-coral-100 text-coral-600 border border-coral-200"
            }`}
          >
            ● Status: {pingData.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
          <div className="bg-canvas p-4 rounded-2xl border border-line">
            <span className="text-xs font-semibold text-ink-500 block uppercase mb-1">
              Frontend Client
            </span>
            <p className="font-mono font-medium text-ink-900">Next.js 15 App Router</p>
            <p className="text-xs text-ink-500 mt-1">Port: 3000 (UI Only)</p>
          </div>

          <div className="bg-canvas p-4 rounded-2xl border border-line">
            <span className="text-xs font-semibold text-ink-500 block uppercase mb-1">
              API Gateway
            </span>
            <p className="font-mono font-medium text-ink-900">
              {pingData.gateway || "Go Chi Gateway (:8080)"}
            </p>
            <p className="text-xs text-ink-500 mt-1">Signed HMAC + Stripped Headers</p>
          </div>

          <div className="bg-canvas p-4 rounded-2xl border border-line">
            <span className="text-xs font-semibold text-ink-500 block uppercase mb-1">
              Backend Service
            </span>
            <p className="font-mono font-medium text-ink-900">
              {pingData.service || "Java Spring Modulith (:8081)"}
            </p>
            <p className="text-xs text-ink-500 mt-1">Single Source of Truth</p>
          </div>

          <div className="bg-canvas p-4 rounded-2xl border border-line">
            <span className="text-xs font-semibold text-ink-500 block uppercase mb-1">
              Database Engine
            </span>
            <p className="font-mono font-medium text-ink-900 truncate">
              {pingData.database || "PostgreSQL 16 / H2 Driver"}
            </p>
            <p className="text-xs text-ink-500 mt-1">Multi-Schema Isolation</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs text-ink-500">
          <span>
            Endpoint verifikasi: <code className="bg-canvas px-2 py-1 rounded">GET /api/v1/ping</code>
          </span>
          <span>{pingData.timestamp ? new Date(pingData.timestamp).toLocaleString("id-ID") : "Live Probe"}</span>
        </div>
      </section>
    </main>
  );
}
