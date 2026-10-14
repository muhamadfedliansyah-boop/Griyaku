"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RoundBadge } from "@/components/ui/badge";
import { HeroMotion } from "@/components/home/hero-motion";
import { CategoryStorehouseShowcase } from "@/components/home/storehouse-showcase";
import { SpotlightDock } from "@/components/home/spotlight-dock";
import { Footer } from "@/components/layout/footer";
import { INITIAL_PRODUCTS, formatRupiah } from "@/lib/products-data";
import { getCurrentUser } from "@/lib/api-client";
import { 
  Star, Search, ShoppingCart, Truck, ShieldCheck, 
  Sparkles, CheckCircle2, ChevronRight, Home, 
  Grid, User, Package, Zap, 
  Utensils, Flame, Box, Plug
} from "lucide-react";


export default function HomePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [user, setUser] = useState<{ id: number; name: string; email: string; role?: string } | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    const handleStorage = () => setUser(getCurrentUser());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const bestSellers = INITIAL_PRODUCTS.slice(0, 5);
  const kitchenDeals = [
    INITIAL_PRODUCTS[0]!, // Air Fryer
    INITIAL_PRODUCTS[1]!, // Blender
    INITIAL_PRODUCTS[2]!, // Rice Cooker
    INITIAL_PRODUCTS[4]!, // Wajan Granit
    INITIAL_PRODUCTS[5]!, // Pel Double Drive
  ];
  const smartAppliances = [
    INITIAL_PRODUCTS[3]!, // Robot Vacuum
    INITIAL_PRODUCTS[0]!, // Air Fryer
    INITIAL_PRODUCTS[2]!, // Rice Cooker
    INITIAL_PRODUCTS[1]!, // Blender
    INITIAL_PRODUCTS[4]!, // Wajan Granit
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between selection:bg-sun-400 selection:text-ink-900 pb-16 md:pb-0">
      
      {/* ========================================================= */}
      {/* 1. BAGIAN PALING ATAS: HERO 'RUMAH NYAMAN' (SESUAI PERMINTAAN) */}
      {/* ========================================================= */}
      <section className="relative w-full min-h-[640px] lg:min-h-[780px] bg-brand-500 text-white flex flex-col justify-between p-6 md:p-10 lg:p-12 overflow-hidden">
        <HeroMotion>
          {/* Header Navigasi Minimal */}
          <header className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto mb-6">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-display font-extrabold text-2xl tracking-tight text-white flex items-center gap-1">
                griyaku<span className="text-sun-400">✦</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/90">
                <Link href="/products" className="hover:text-sun-400 transition-colors">Semua Produk</Link>
                <Link href="/products?category=dapur-memasak" className="hover:text-sun-400 transition-colors">Dapur</Link>
                <Link href="/products?category=kebersihan-rumah" className="hover:text-sun-400 transition-colors">Kebersihan</Link>
                <Link href="/products?category=elektronik-rumah" className="hover:text-sun-400 transition-colors">Elektronik</Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/products"
                aria-label="Cari produk"
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                href="/cart"
                aria-label="Keranjang belanja"
                className="relative p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-coral-400 rounded-full" />
              </Link>
              <Button
                href={user ? "/profile" : "/login"}
                variant="outline"
                className="inline-flex text-xs py-1.5 px-4 sm:py-2 sm:px-5 font-bold border-white/70 hover:bg-white hover:text-brand-600 transition-all"
              >
                {user ? user.name : "Masuk"}
              </Button>
            </div>
          </header>

          {/* Area Tengah: Judul Raksasa + Produk Cutout Miring */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center my-6 text-center w-full max-w-6xl mx-auto">
            <div className="relative flex flex-col items-center justify-center select-none w-full">
              <div className="overflow-hidden">
                <h1
                  data-hero-word
                  className="font-display font-extrabold text-[clamp(4.2rem,13vw,11rem)] leading-[0.85] tracking-tight text-white uppercase"
                >
                  Rumah Nyaman
                </h1>
              </div>

              {/* Produk Cutout Miring Menimpa Judul */}
              <div
                data-hero-parallax
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                <div data-hero-float>
                  <div
                    data-hero-tilt
                    className="relative -rotate-[12deg] w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center"
                  >
                    {/* Kursi Cutout Transparan Tanpa Background */}
                    <img
                      src="/chair.png"
                      alt="Kursi Santai Pilihan"
                      className="relative w-44 h-auto md:w-56 lg:w-64 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] pointer-events-auto select-none"
                      draggable={false}
                    />

                    {/* Shadow elips di bawah kursi */}
                    <div
                      data-hero-shadow
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 h-3.5 bg-black/40 rounded-full blur-md"
                    />

                    <div
                      data-hero-badge
                      className="absolute top-2 -right-2 rotate-[12deg] pointer-events-auto"
                    >
                      <RoundBadge text="Garansi Resmi" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol CTA Pill Kuning */}
            <div data-hero-cta className="relative z-40 mt-10">
              <Button href="/products" variant="cta" className="text-sm md:text-base px-8 py-3.5">
                Belanja sekarang <span className="ml-2 font-black">→</span>
              </Button>
            </div>
          </div>

          {/* Bagian Bawah Hero: Tagline */}
          <div className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-7xl mx-auto pt-4 border-t border-white/10 text-xs text-white/80">
            <p>Peralatan dapur, kebersihan, dan perlengkapan rumah tangga berkualitas terpercaya.</p>
            <div className="flex gap-6 font-semibold text-sun-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Garansi Resmi</span>
              <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Bebas Ongkir</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Bayar Aman Escrow</span>
            </div>
          </div>
        </HeroMotion>
      </section>

      {/* ========================================================= */}
      {/* 2. BAGIAN BAWAH: SESUAI PERSIS DESAIN REFERENSI GAMBAR   */}
      {/* ========================================================= */}

      {/* A. FLOATING SPOTLIGHT DOCK (SESUAI FOTO DOCK DENGAN EFEK LAMPU SOROT MENGIKUTI KURSOR) */}
      <SpotlightDock />

      {/* B. PEMILIHAN KATEGORI ALAT RUMAH TANGGA: 3D CLAY INTERACTIVE STOREHOUSE (SESUAI FOTO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sun-100 text-ink-900 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sun-600" />
              <span>Interaktif 3D Catalog</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
              Koleksi Perlengkapan Rumah Pilihan
            </h2>
            <p className="text-xs sm:text-sm text-ink-500 mt-1">
              Pilih barang di daftar untuk melihat preview 3D, spesifikasi, dan animasi perpindahan yang mulus
            </p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1">
            Lihat Semua Katalog <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Komponen Showcase Sesuai Foto dengan Animasi GSAP Mulus */}
        <CategoryStorehouseShowcase />
      </section>

      {/* C. BANNER PENGIRIMAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <div className="bg-gradient-to-r from-mint-100 via-paper to-sun-50 rounded-[32px] border border-line p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-xl space-y-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
              Layanan Logistik Terpercaya
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-ink-900 tracking-tight leading-tight">
              GRIYAKU MENGANTAR CEPAT HINGGA DEPAN PINTU ANDA
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              Nikmati pengiriman instan hari ini untuk area Jabodetabek dan gratis ongkir ke seluruh Indonesia dengan proteksi asuransi pecah belah.
            </p>
            <div className="pt-2">
              <Link href="/products">
                <Button variant="primary" className="text-xs sm:text-sm py-3 px-6">
                  Cek Layanan Pengiriman →
                </Button>
              </Link>
            </div>
          </div>

          <div className="shrink-0 p-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/80 rounded-3xl flex items-center justify-center border border-white shadow-xs">
              <Truck className="w-12 h-12 text-brand-500 stroke-[1.5]" />
            </div>
          </div>
        </div>
      </section>

      {/* D. PRODUCT ROW 1: PRODUK TERLARIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink-900 tracking-tight">
              Produk Terlaris Minggu Ini
            </h2>
            <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
              Pilihan terfavorit yang paling sering dibeli pembeli
            </p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1">
            Lihat Lebih Banyak <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="group bg-paper rounded-[24px] border border-line p-4 flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-canvas mb-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-sun-400 text-ink-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                    Hemat {item.discountPercent}%
                  </span>
                </div>

                <Link href={`/products/${item.id}`}>
                  <h3 className="font-semibold text-xs sm:text-sm text-ink-900 line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                {/* Rating Bintang Icon */}
                <div className="flex items-center gap-1 text-[11px] text-ink-500 mt-2">
                  <div className="flex text-sun-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-sun-500 text-sun-500" />
                    ))}
                  </div>
                  <span className="font-bold text-ink-800">{item.rating}</span>
                  <span>({item.reviewCount})</span>
                </div>

                <div className="mt-2 font-extrabold text-sm sm:text-base text-ink-900 tabular-nums">
                  {formatRupiah(item.price)}
                </div>
                {item.originalPrice && (
                  <div className="text-[11px] text-ink-400 line-through tabular-nums">
                    {formatRupiah(item.originalPrice)}
                  </div>
                )}
              </div>

              <Link href={`/products/${item.id}`} className="mt-3">
                <Button variant="outline" className="w-full py-1.5 text-[11px] font-bold">
                  Beli Sekarang
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* E. PRODUCT ROW 2: PROMO PERALATAN DAPUR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full bg-paper/60 border-y border-line my-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-coral-100 text-coral-600 font-bold text-[10px] px-2 py-0.5 rounded-full">
                Promo Kilat
              </span>
              <span className="text-xs text-ink-500">Berakhir dalam 12 jam</span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink-900 tracking-tight">
              Peralatan Dapur & Memasak Pilihan
            </h2>
          </div>
          <Link href="/products?category=dapur-memasak" className="text-xs sm:text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1">
            Lihat Koleksi <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
          {kitchenDeals.map((item) => (
            <div
              key={item.id}
              className="group bg-paper rounded-[24px] border border-line p-4 flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-canvas mb-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-coral-400 text-ink-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                    Top Deal
                  </span>
                </div>

                <Link href={`/products/${item.id}`}>
                  <h3 className="font-semibold text-xs sm:text-sm text-ink-900 line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 text-[11px] text-ink-500 mt-2">
                  <div className="flex text-sun-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-sun-500 text-sun-500" />
                    ))}
                  </div>
                  <span className="font-bold text-ink-800">{item.rating}</span>
                </div>

                <div className="mt-2 font-extrabold text-sm sm:text-base text-brand-500 tabular-nums">
                  {formatRupiah(item.price)}
                </div>
              </div>

              <Link href={`/products/${item.id}`} className="mt-3">
                <Button variant="primary" className="w-full py-1.5 text-[11px] font-bold">
                  Lihat Detail
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* F. DUAL LIFESTYLE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Dapur Modern */}
          <div className="bg-mint-100/60 rounded-[32px] border border-line p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider">
                Inspirasi Dapur
              </span>
              <h3 className="font-display font-black text-2xl text-ink-900 mt-1">
                Kreasi Memasak Modern & Sehat
              </h3>
              <p className="text-xs text-ink-700 mt-2 max-w-sm">
                Lengkapi dapur impian dengan air fryer touch screen dan perlengkapan bebas minyak.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between p-3 bg-paper rounded-2xl border border-line shadow-xs">
              <div className="flex items-center gap-3">
                <img
                  src={INITIAL_PRODUCTS[0]!.imageUrl}
                  alt="Air Fryer"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="font-bold text-xs text-ink-900">Air Fryer 4L Touch Screen</p>
                  <p className="text-xs text-brand-600 font-extrabold">{formatRupiah(INITIAL_PRODUCTS[0]!.price)}</p>
                </div>
              </div>
              <Link href="/products/1">
                <Button variant="outline" className="text-xs py-1.5 px-3">
                  Cek →
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Rumah Bersih Otomatis */}
          <div className="bg-sun-100/40 rounded-[32px] border border-line p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-ink-700 uppercase tracking-wider">
                Smart Cleaning
              </span>
              <h3 className="font-display font-black text-2xl text-ink-900 mt-1">
                Lantai Bersih Tanpa Perlu Capek
              </h3>
              <p className="text-xs text-ink-700 mt-2 max-w-sm">
                Robot vacuum cerdas 3-in-1 yang menyapu, menghisap debu, dan mengepel otomatis.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between p-3 bg-paper rounded-2xl border border-line shadow-xs">
              <div className="flex items-center gap-3">
                <img
                  src={INITIAL_PRODUCTS[3]!.imageUrl}
                  alt="Robot Vacuum"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="font-bold text-xs text-ink-900">Robot Vacuum Cleaner 3-in-1</p>
                  <p className="text-xs text-brand-600 font-extrabold">{formatRupiah(INITIAL_PRODUCTS[3]!.price)}</p>
                </div>
              </div>
              <Link href="/products/4">
                <Button variant="outline" className="text-xs py-1.5 px-3">
                  Cek →
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* G. PRODUCT ROW 3: ELEKTRONIK & GADGET RUMAH TANGGA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink-900 tracking-tight">
              Pilihan Khusus Untuk Kenyamanan Anda
            </h2>
            <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
              Rekomendasi peralatan rumah tangga pilihan editor
            </p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center gap-1">
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
          {smartAppliances.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="group bg-paper rounded-[24px] border border-line p-4 flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-canvas mb-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-mint-200 text-ink-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                    Official
                  </span>
                </div>

                <Link href={`/products/${item.id}`}>
                  <h3 className="font-semibold text-xs sm:text-sm text-ink-900 line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 text-[11px] text-ink-500 mt-2">
                  <div className="flex text-sun-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-sun-500 text-sun-500" />
                    ))}
                  </div>
                  <span className="font-bold text-ink-800">{item.rating}</span>
                </div>

                <div className="mt-2 font-extrabold text-sm sm:text-base text-ink-900 tabular-nums">
                  {formatRupiah(item.price)}
                </div>
              </div>

              <Link href={`/products/${item.id}`} className="mt-3">
                <Button variant="outline" className="w-full py-1.5 text-[11px] font-bold">
                  Beli Langsung
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* H. BRAND PARTNERS PILLS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-ink-400 mb-4">
          Mitra Resmi Merek Rumah Tangga Terpercaya
        </p>
        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4">
          {[
            { name: "PHILIPS HOME", icon: Plug },
            { name: "LOCK & LOCK", icon: Box },
            { name: "OXONE PREMIUM", icon: Utensils },
            { name: "COSMOS OFFICIAL", icon: Zap },
            { name: "MITO ELECTRONIC", icon: Flame },
            { name: "BOLDE SUPER", icon: Sparkles },
          ].map((brand, idx) => {
            const IconComp = brand.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-paper border border-line text-xs font-bold text-ink-800 shadow-2xs hover:border-brand-500 transition-colors cursor-pointer"
              >
                <IconComp className="w-3.5 h-3.5 text-brand-600" />
                <span>{brand.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* I. NEWSLETTER STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-brand-900 text-white rounded-[32px] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-2 max-w-lg z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sun-400">
              Voucher Diskon Spesial
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
              Dapatkan Voucher Rp 100.000 untuk Pembelian Pertama
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Daftarkan email Anda untuk menerima info diskon eksklusif dan tips perawatan alat rumah tangga.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 z-10">
            <input
              type="email"
              placeholder="Masukkan email Anda..."
              className="h-12 px-5 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-sun-400 min-w-[260px]"
            />
            <Button variant="cta" className="h-12 px-6 rounded-full text-sm font-bold text-ink-900">
              Langganan
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {/* ========================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-md border-t border-line px-6 py-2.5 flex items-center justify-between shadow-lg">
        <Link href="/" className="flex flex-col items-center gap-1 text-brand-500">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Beranda</span>
        </Link>
        <Link href="/products" className="flex flex-col items-center gap-1 text-ink-500 hover:text-brand-500">
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Katalog</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center gap-1 text-ink-500 hover:text-brand-500 relative">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Keranjang</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-coral-500 rounded-full" />
        </Link>
        <Link href="/cart" className="flex flex-col items-center gap-1 text-ink-500 hover:text-brand-500">
          <Package className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Pesanan</span>
        </Link>
        <Link href={user ? "/profile" : "/login"} className="flex flex-col items-center gap-1 text-ink-500 hover:text-brand-500">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold">{user ? user.name : "Masuk"}</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
