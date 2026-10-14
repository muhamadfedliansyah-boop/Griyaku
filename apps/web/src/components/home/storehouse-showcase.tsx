"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  Armchair,
  UtensilsCrossed,
  Sparkles,
  Zap,
  Plus,
  Check,
  ArrowRight,
  Smile,
} from "lucide-react";

export interface ShowcaseItem {
  id: string;
  name: string;
  shortName: string;
  category: "perabot" | "dapur" | "elektronik" | "kebersihan";
  categoryLabel: string;
  specs: string;
  price: string;
  rating: number;
  // Card gradient styling matching the 3D clay photo aesthetic
  theme: {
    bgGradient: string;
    cardBg: string;
    textColor: string;
    tagBg: string;
    shadowColor: string;
  };
  // 3D image or high-res clay-style render
  imageUrl: string;
  thumbUrl: string;
  accentBlobColor: string;
  description: string;
  productSlug?: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "blob-sofa",
    name: "Blob Sofa",
    shortName: "Blob sofa",
    category: "perabot",
    categoryLabel: "Perabot & Ruang",
    specs: "180 x 95 x 85 cm",
    price: "Rp 2.450.000",
    rating: 4.9,
    theme: {
      bgGradient: "from-[#FFD747] via-[#FFB830] to-[#FFA31A]",
      cardBg: "bg-[#FFC038]",
      textColor: "text-white",
      tagBg: "bg-white/20",
      shadowColor: "rgba(255, 179, 38, 0.4)",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80",
    accentBlobColor: "#FF8E53",
    description: "Sofa santai bentuk organik dengan busa high-density empuk & kain velvet lembut.",
    productSlug: "perabot-dekorasi",
  },
  {
    id: "purifier-o2",
    name: "Purifier O2",
    shortName: "Purifier O2",
    category: "elektronik",
    categoryLabel: "Elektronik Cerdas",
    specs: "110 x 110 x 380 mm",
    price: "Rp 1.150.000",
    rating: 4.8,
    theme: {
      bgGradient: "from-[#FF6B6B] via-[#EE5253] to-[#FF4757]",
      cardBg: "bg-[#EE5253]",
      textColor: "text-white",
      tagBg: "bg-white/20",
      shadowColor: "rgba(238, 82, 83, 0.4)",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=200&q=80",
    accentBlobColor: "#FF3838",
    description: "Pembersih udara silinder kompak HEPA 13 dengan ionizer & silent mode 20dB.",
    productSlug: "elektronik-rumah",
  },
  {
    id: "copse-combo",
    name: "Copse Combo",
    shortName: "Copse combo",
    category: "perabot",
    categoryLabel: "Perabot & Ruang",
    specs: "90 x 90 x 75 cm",
    price: "Rp 1.890.000",
    rating: 4.9,
    theme: {
      bgGradient: "from-[#6BCB77] via-[#4D96FF] to-[#3B71F7]",
      cardBg: "bg-[#4D96FF]",
      textColor: "text-white",
      tagBg: "bg-white/20",
      shadowColor: "rgba(77, 150, 255, 0.4)",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80",
    accentBlobColor: "#3867D6",
    description: "Set kursi dan meja minimalis kayu solid jati dengan finishing natural matte.",
    productSlug: "perabot-dekorasi",
  },
  {
    id: "bouncy-prop",
    name: "Bouncy Prop",
    shortName: "Bouncy prop",
    category: "perabot",
    categoryLabel: "Perabot & Ruang",
    specs: "65 x 65 x 70 cm",
    price: "Rp 850.000",
    rating: 4.7,
    theme: {
      bgGradient: "from-[#FF9A8B] via-[#FF6A88] to-[#FF99AC]",
      cardBg: "bg-[#FF6A88]",
      textColor: "text-white",
      tagBg: "bg-white/20",
      shadowColor: "rgba(255, 106, 136, 0.4)",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80",
    accentBlobColor: "#E056FD",
    description: "Kursi tabung modern playful dengan struktur kenyal elastis dan ergonomis.",
    productSlug: "perabot-dekorasi",
  },
  {
    id: "air-fryer-eco",
    name: "Air Fryer Eco",
    shortName: "Air Fryer Eco",
    category: "dapur",
    categoryLabel: "Dapur & Memasak",
    specs: "280 x 310 x 320 mm",
    price: "Rp 349.000",
    rating: 4.9,
    theme: {
      bgGradient: "from-[#00A86B] via-[#00875A] to-[#006A4E]",
      cardBg: "bg-[#00875A]",
      textColor: "text-white",
      tagBg: "bg-white/20",
      shadowColor: "rgba(0, 106, 78, 0.4)",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=200&q=80",
    accentBlobColor: "#05C46B",
    description: "Kapasitas 4L touch screen 8 menu masak otomatis dengan sirkulasi panas 360°.",
    productSlug: "dapur-memasak",
  },
  {
    id: "robot-vacuum",
    name: "Smart Robot Vacuum",
    shortName: "Robot Vacuum",
    category: "kebersihan",
    categoryLabel: "Kebersihan Rumah",
    specs: "350 x 350 x 82 mm",
    price: "Rp 899.000",
    rating: 4.8,
    theme: {
      bgGradient: "from-[#4834D4] via-[#686DE0] to-[#22A6B3]",
      cardBg: "bg-[#686DE0]",
      textColor: "text-white",
      tagBg: "bg-white/20",
      shadowColor: "rgba(104, 109, 224, 0.4)",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    thumbUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80",
    accentBlobColor: "#30336B",
    description: "Pembersih otomatis 3-in-1 sapu sedot pel dengan navigasi laser anti-tabrak.",
    productSlug: "kebersihan-rumah",
  },
];

export function CategoryStorehouseShowcase() {
  const [selectedId, setSelectedId] = useState<string>("blob-sofa");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextImageUrl, setNextImageUrl] = useState<string>("");

  // Refs
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const imageZoneRef = useRef<HTMLDivElement>(null);   // zona gambar (float target)
  const currentImgEl  = useRef<HTMLImageElement>(null); // gambar yang sedang tampil
  const nextImgEl     = useRef<HTMLImageElement>(null); // gambar yang akan masuk
  const titleTextRef  = useRef<HTMLHeadingElement>(null);
  const infoBlockRef  = useRef<HTMLDivElement>(null);
  const blobFloatingRef1 = useRef<HTMLDivElement>(null);
  const blobFloatingRef2 = useRef<HTMLDivElement>(null);

  const currentItem =
    SHOWCASE_ITEMS.find((item) => item.id === selectedId) || SHOWCASE_ITEMS[0]!;

  const displayItems =
    activeCategory === "all"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);

  const handleSelectProduct = (item: ShowcaseItem) => {
    if (item.id === selectedId || isAnimating) return;
    setIsAnimating(true);

    // Tampilkan gambar berikutnya (tersembunyi di kanan awalnya)
    setNextImageUrl(item.imageUrl);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const cur  = currentImgEl.current;
        const next = nextImgEl.current;

        if (!cur || !next) {
          setSelectedId(item.id);
          setNextImageUrl("");
          setIsAnimating(false);
          return;
        }

        // Posisi awal gambar baru: jauh di kanan bawah, transparan, kecil
        gsap.set(next, { x: "140%", y: 60, opacity: 0, scale: 0.75, rotate: 8 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            setSelectedId(item.id);
            setNextImageUrl("");
            setIsAnimating(false);
            // Reset transform gambar baru yang kini jadi "current"
            if (currentImgEl.current) {
              gsap.set(currentImgEl.current, { clearProps: "all" });
            }
          },
        });

        // EXIT — gambar lama melengkung ke kiri-atas (busur parabola)
        tl.to(cur, {
          keyframes: [
            // Naik ke puncak busur sambil mulai geser kiri
            { x: "-30%", y: -70, scale: 0.9, opacity: 0.7, duration: 0.28, ease: "power2.out" },
            // Turun melanjutkan busur dan keluar layar ke kiri
            { x: "-150%", y: -30, scale: 0.7, opacity: 0, duration: 0.32, ease: "power3.in" },
          ],
        })
          // ENTER — gambar baru melengkung masuk dari kanan-bawah ke tengah
          .to(
            next,
            {
              keyframes: [
                // Masuk dari kanan-bawah
                { x: "60%", y: 30, scale: 0.85, opacity: 0.5, duration: 0.25, ease: "power2.out" },
                // Mendarat di tengah dengan spring bounce
                { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.5)" },
              ],
            },
            0.18  // mulai 0.18s setelah exit dimulai (overlap)
          )
          // Teks nama berganti dengan fade+slide naik
          .fromTo(
            titleTextRef.current,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.38, ease: "power2.out" },
            0.42
          )
          // Harga menyusul
          .fromTo(
            infoBlockRef.current,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.32, ease: "power2.out" },
            0.52
          );

        // Blob bereaksi saat transisi
        if (blobFloatingRef1.current) {
          gsap.to(blobFloatingRef1.current, {
            x: "random(-22, 22)", y: "random(-18, 18)",
            scale: "random(0.88, 1.18)",
            duration: 0.7, ease: "power2.out",
          });
        }
        if (blobFloatingRef2.current) {
          gsap.to(blobFloatingRef2.current, {
            x: "random(-28, 28)", y: "random(-20, 20)",
            scale: "random(0.82, 1.22)",
            duration: 0.8, ease: "power2.out",
          });
        }
      });
    });
  };

  const handleAddToCart = (e: React.MouseEvent, item: ShowcaseItem) => {
    e.stopPropagation();
    
    // Simpan ke localStorage cart
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("griyaku_cart");
      const cart: Array<{ id: string; name: string; price: string; imageUrl: string; qty: number }> = 
        existing ? JSON.parse(existing) : [];
      
      const existingIdx = cart.findIndex((c) => c.id === item.id);
      if (existingIdx >= 0) {
        cart[existingIdx]!.qty += 1;
      } else {
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          qty: 1,
        });
      }
      localStorage.setItem("griyaku_cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
    }

    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  // Efek melayang idle pada zona gambar
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageZoneRef.current) {
        gsap.to(imageZoneRef.current, {
          y: "+=9",
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (blobFloatingRef1.current) {
        gsap.to(blobFloatingRef1.current, {
          y: "-=18",
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (blobFloatingRef2.current) {
        gsap.to(blobFloatingRef2.current, {
          y: "+=22",
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, cardContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      {/* Kartu Utama Berbingkai Halus (Sesuai Persis Tampilan di Foto) */}
      <div
        ref={cardContainerRef}
        className="w-full bg-[#FAFCFB] rounded-[36px] sm:rounded-[44px] shadow-2xl border border-slate-100 p-4 sm:p-7 lg:p-9 relative overflow-hidden transition-all duration-500"
      >
        {/* Glow Ambient di Background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sun-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />

        {/* Layout Grid: Sisi Kiri (Card 3D Berwarna) & Sisi Kanan (My storehouse List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">

          {/* ========================================================= */}
          {/* SISI KIRI: HERO CARD DENGAN ELEMEN 3D & FLOATING BLOBS    */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div
              className={`relative rounded-[32px] sm:rounded-[38px] bg-gradient-to-br ${currentItem.theme.bgGradient} p-6 sm:p-8 lg:p-10 min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-700`}
              style={{
                boxShadow: `0 20px 40px -15px ${currentItem.theme.shadowColor}`,
              }}
            >
              {/* Ornamen Geometris Transparan Khas Desain Foto */}
              <div className="absolute top-6 left-6 text-white/50 pointer-events-none">
                <svg className="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                </svg>
              </div>

              {/* 1. Floating Claymorphic Blob Atas (Warna Pink Pastel dengan Blur) */}
              <div
                ref={blobFloatingRef1}
                className="absolute top-8 right-12 w-20 h-20 rounded-full bg-gradient-to-tr from-pink-300 to-rose-200 blur-[2px] opacity-90 shadow-md pointer-events-none"
              />

              {/* 2. Floating Claymorphic Blob Depan (Warna Kuning Soft dengan Depth-of-Field Blur) */}
              <div
                ref={blobFloatingRef2}
                className="absolute top-1/2 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-yellow-400 blur-[3px] opacity-85 shadow-lg pointer-events-none z-30"
              />

              {/* 3. Floating Clay Pebble Putih di Kiri Bawah (Persis di Foto) */}
              <div className="absolute bottom-16 left-8 w-12 h-7 rounded-full bg-white/90 shadow-md rotate-[-25deg] pointer-events-none z-10" />

              {/* Area Judul Besar & Kategori */}
              <div className="relative z-20 space-y-2 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wide uppercase backdrop-blur-md">
                  {currentItem.categoryLabel}
                </span>

                <h3
                  ref={titleTextRef}
                  className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[0.95] drop-shadow-sm"
                >
                  {currentItem.shortName}
                </h3>

                <p className="text-white/85 text-xs sm:text-sm font-medium line-clamp-2 max-w-[260px] pt-1">
                  {currentItem.description}
                </p>
              </div>

              {/* ===================================================
                  AREA GAMBAR — Arc Parabola Animation
                  Dua <img> absolute di atas zone yang sama.
                  Gambar lama: terbang keluar ke kiri-atas (busur).
                  Gambar baru: datang dari kanan-bawah, mendarat halus.
                  mix-blend-mode:multiply → background foto transparan.
              ==================================================== */}
              <div className="relative my-auto flex items-center justify-center py-4 z-20">
                {/* Zone: target idle-float */}
                <div
                  ref={imageZoneRef}
                  style={{
                    position: "relative",
                    width: "clamp(180px, 22vw, 260px)",
                    height: "clamp(180px, 22vw, 260px)",
                    overflow: "visible",   /* biarkan arc keluar zone */
                  }}
                >
                  {/* Gambar AKTIF */}
                  <img
                    ref={currentImgEl}
                    src={currentItem.imageUrl}
                    alt={currentItem.name}
                    draggable={false}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      mixBlendMode: "multiply",   /* hapus bg putih foto */
                      filter: "drop-shadow(0 20px 28px rgba(0,0,0,0.35))",
                      willChange: "transform, opacity",
                    }}
                  />

                  {/* Gambar BERIKUTNYA — hanya render saat transisi */}
                  {nextImageUrl && (
                    <img
                      ref={nextImgEl}
                      src={nextImageUrl}
                      alt="next product"
                      draggable={false}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        filter: "drop-shadow(0 20px 28px rgba(0,0,0,0.35))",
                        opacity: 0,
                        willChange: "transform, opacity",
                      }}
                    />
                  )}
                </div>

                {/* Shadow elips bawah produk */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "120px",
                    height: "18px",
                    background: "rgba(0,0,0,0.22)",
                    borderRadius: "50%",
                    filter: "blur(10px)",
                  }}
                />
              </div>

              {/* Info Bawah: Harga & CTA */}
              <div
                ref={infoBlockRef}
                className="relative z-20 flex items-center justify-between pt-2"
              >
                <div>
                  <span className="text-[11px] text-white/70 block font-medium">Harga Resmi</span>
                  <span className="font-display font-extrabold text-xl sm:text-2xl text-white drop-shadow-xs">
                    {currentItem.price}
                  </span>
                </div>

                <Link
                  href={`/products?category=${currentItem.productSlug}`}
                  className="inline-flex items-center gap-1.5 bg-white text-ink-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-lg hover:bg-white/90 active:scale-95 transition-all"
                >
                  <span>Lihat Koleksi</span>
                  <ArrowRight className="w-4 h-4 text-brand-600" />
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SISI KANAN: TABEL "MY STOREHOUSE" DENGAN LIST PILIHAN     */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header "My storehouse" & Avatar Smiley Persis di Foto */}
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
                <div>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
                    My storehouse
                  </h2>
                  <p className="text-xs text-ink-500 mt-0.5">
                    Katalog perlengkapan rumah tangga interaktif
                  </p>
                </div>

                {/* Avatar Icon Kuning Lucu (Persis di Foto) */}
                <div
                  className="w-10 h-10 rounded-full bg-[#FFB830] flex items-center justify-center text-white shadow-md hover:rotate-12 transition-transform cursor-pointer"
                  title="Griyaku Smart Selector"
                >
                  <Smile className="w-5 h-5 text-ink-900 fill-ink-900" />
                </div>
              </div>

              {/* Header kolom tabel */}
              <div className="grid grid-cols-12 text-[11px] font-bold text-ink-400 uppercase tracking-wider px-4 py-2 select-none">
                <span className="col-span-5">PRODUCT</span>
                <span className="col-span-4 hidden sm:block text-left">SPESIFIKASI</span>
                <span className="col-span-5 sm:col-span-2 text-center">PREVIEW</span>
                <span className="col-span-2 sm:col-span-1 text-right">AKSI</span>
              </div>

              {/* Filter kategori — pill kecil di atas daftar */}
              <div className="flex flex-wrap items-center gap-1.5 px-4 pb-3 mt-1">
                {[
                  { key: "all", label: "Semua", icon: null },
                  { key: "perabot", label: "Perabot", icon: <Armchair className="w-3 h-3" /> },
                  { key: "dapur", label: "Dapur", icon: <UtensilsCrossed className="w-3 h-3" /> },
                  { key: "elektronik", label: "Elektronik", icon: <Zap className="w-3 h-3" /> },
                  { key: "kebersihan", label: "Bersih", icon: <Sparkles className="w-3 h-3" /> },
                ].map(({ key, label, icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveCategory(key)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      activeCategory === key
                        ? "bg-ink-900 text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-ink-600"
                    }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>

              {/* Daftar Barang yang Dapat Dipilih (Interactive List) */}
              <div className="space-y-2 mt-1">
                {displayItems.map((item) => {
                  const isSelected = item.id === selectedId;
                  const isAdded = !!addedItems[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectProduct(item)}
                      className={`group grid grid-cols-12 items-center px-4 py-3 sm:py-3.5 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "bg-white shadow-md border-l-4 border-amber-400 scale-[1.01]"
                          : "bg-slate-50/70 hover:bg-white hover:shadow-xs border-l-4 border-transparent"
                      }`}
                    >
                      {/* Kolom 1: Nama Produk & Dot Status */}
                      <div className="col-span-5 sm:col-span-5 flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full transition-all ${
                            isSelected ? "bg-amber-500 ring-4 ring-amber-100" : "bg-slate-300"
                          }`}
                        />
                        <div>
                          <p
                            className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                              isSelected ? "text-ink-900 font-extrabold" : "text-ink-700 group-hover:text-ink-900"
                            }`}
                          >
                            {item.name}
                          </p>
                          <span className="text-[10px] text-ink-400 block sm:hidden">
                            {item.specs}
                          </span>
                        </div>
                      </div>

                      {/* Kolom 2: Spesifikasi / Dimensi (e.g. 110 x 110) */}
                      <div className="col-span-4 sm:col-span-4 hidden sm:block">
                        <span className="text-xs text-ink-500 font-mono font-medium">
                          {item.specs}
                        </span>
                      </div>

                      {/* Kolom 3: Thumbnail 3D Miniatur */}
                      <div className="col-span-5 sm:col-span-2 flex items-center justify-center">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl p-1 flex items-center justify-center transition-all ${
                            isSelected ? "bg-amber-50 scale-110 shadow-xs" : "bg-white border border-slate-100"
                          }`}
                        >
                          <img
                            src={item.thumbUrl}
                            alt={item.name}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Kolom 4: Tombol Tambah (+) / Aksi */}
                      <div className="col-span-2 sm:col-span-1 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, item)}
                          aria-label={`Tambah ${item.name} ke keranjang`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                            isAdded
                              ? "bg-brand-500 text-white"
                              : isSelected
                              ? "bg-amber-400 hover:bg-amber-500 text-ink-900 shadow-sm"
                              : "bg-slate-200/80 hover:bg-brand-500 hover:text-white text-ink-600"
                          }`}
                        >
                          {isAdded ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}
