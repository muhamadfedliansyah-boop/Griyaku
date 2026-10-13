"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { INITIAL_PRODUCTS, formatRupiah } from "@/lib/products-data";
import { 
  Star, CheckCircle2, ShieldCheck, Truck, RefreshCw, 
  Heart, Share2, Plus, Minus, ShoppingBag, ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id) || 1;
  const product = INITIAL_PRODUCTS.find((p) => p.id === productId) || INITIAL_PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.imageUrl);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"detail" | "specs" | "reviews">("detail");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    router.push("/checkout");
  };

  const subtotal = product.price * quantity;

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-ink-500">
          <Link href="/" className="hover:text-brand-500">Beranda</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-500">Katalog</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-brand-500">
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-ink-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Grid 3 Kolom: Galeri (4) + Informasi (5) + Sticky Buy Box (3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom 1: Galeri Gambar (Lg: 4/12) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-paper border border-line shadow-card">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.discountPercent && product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-coral-400 text-ink-900 font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                  Diskon {product.discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[product.imageUrl, ...(product.galleryUrls || [])].slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedImage === img ? "border-brand-500 ring-2 ring-brand-500/20" : "border-line opacity-75 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Kolom 2: Info Produk & Tabs (Lg: 4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-500 mb-2">
                <span className="bg-brand-50 px-2.5 py-1 rounded-full">
                  {product.category.name}
                </span>
                {product.isFreeShipping && (
                  <span className="bg-mint-100 text-brand-700 px-2.5 py-1 rounded-full">
                    Bebas Ongkir
                  </span>
                )}
              </div>

              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-ink-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Terjual */}
              <div className="flex items-center gap-3 mt-3 text-sm text-ink-500">
                <div className="flex items-center text-sun-500 font-bold">
                  <Star className="w-4 h-4 fill-sun-500 mr-1" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <span>·</span>
                <span>{product.reviewCount} Ulasan</span>
                <span>·</span>
                <span>{product.soldCount > 1000 ? `${(product.soldCount / 1000).toFixed(1)} rb+` : product.soldCount} Terjual</span>
              </div>
            </div>

            {/* Harga */}
            <div className="p-4 bg-paper rounded-2xl border border-line">
              <div className="font-sans font-extrabold text-3xl text-brand-500 tabular-nums">
                {formatRupiah(product.price)}
              </div>
              {product.originalPrice && (
                <div className="flex items-center gap-2 mt-1 text-sm text-ink-500">
                  <span className="line-through">{formatRupiah(product.originalPrice)}</span>
                  <span className="text-coral-600 font-bold bg-coral-100 px-1.5 py-0.5 rounded text-xs">
                    Hemat {product.discountPercent}%
                  </span>
                </div>
              )}
            </div>

            {/* Info Toko Resmi */}
            <div className="flex items-center justify-between p-4 bg-paper rounded-2xl border border-line">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center font-bold text-brand-600">
                  {product.merchant.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1 font-semibold text-sm text-ink-900">
                    <span>{product.merchant.name}</span>
                    {product.merchant.isOfficial && (
                      <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    )}
                  </div>
                  <p className="text-xs text-ink-500">{product.merchant.city} · Rating {product.merchant.rating} ★</p>
                </div>
              </div>
              <Button variant="outline" className="text-xs py-1.5 px-3">
                Kunjungi Toko
              </Button>
            </div>

            {/* Tabs Navigasi */}
            <div className="space-y-4">
              <div className="flex border-b border-line gap-6 text-sm font-semibold">
                <button
                  onClick={() => setActiveTab("detail")}
                  className={`pb-3 relative transition-colors cursor-pointer ${
                    activeTab === "detail" ? "text-brand-500 border-b-2 border-brand-500" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  Detail Produk
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-3 relative transition-colors cursor-pointer ${
                    activeTab === "specs" ? "text-brand-500 border-b-2 border-brand-500" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  Spesifikasi
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-3 relative transition-colors cursor-pointer ${
                    activeTab === "reviews" ? "text-brand-500 border-b-2 border-brand-500" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  Ulasan ({product.reviewCount})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-sm text-ink-700 leading-relaxed">
                {activeTab === "detail" && (
                  <p>{product.description}</p>
                )}
                {activeTab === "specs" && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-line">
                      <span className="text-ink-500">Kondisi</span>
                      <span className="font-semibold text-ink-900">Baru (100% Original)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-line">
                      <span className="text-ink-500">Berat Satuan</span>
                      <span className="font-semibold text-ink-900">1.200 Gram</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-line">
                      <span className="text-ink-500">Garansi</span>
                      <span className="font-semibold text-ink-900">1 Tahun Garansi Resmi Produsen</span>
                    </div>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-3">
                    <div className="p-3 bg-paper rounded-xl border border-line text-xs">
                      <div className="flex items-center justify-between font-bold text-ink-900">
                        <span>Farhan D. (Pembeli Terverifikasi)</span>
                        <span className="text-sun-500">★★★★★</span>
                      </div>
                      <p className="text-ink-500 mt-1">
                        Kualitas sangat bagus, sesuai deskripsi dan pengiriman cepat. Sangat membantu memasak tanpa minyak!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Kolom 3: Sticky Buy Box (Lg: 3/12) */}
          <div className="lg:col-span-3 sticky top-24">
            <div className="bg-paper p-6 rounded-[28px] border border-line shadow-card space-y-5">
              <h3 className="font-bold text-base text-ink-900">Atur Jumlah & Catatan</h3>

              {/* Quantity Picker */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-700 font-medium">Jumlah Pembelian:</span>
                <div className="flex items-center border border-line rounded-full p-1 bg-canvas">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-ink-700 hover:bg-paper disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-ink-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-ink-700 hover:bg-paper disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-xs text-ink-500 flex justify-between">
                <span>Total Stok:</span>
                <span className="font-bold text-ink-900">{product.stock} tersisa</span>
              </div>

              {/* Subtotal */}
              <div className="pt-4 border-t border-line flex items-center justify-between">
                <span className="text-xs text-ink-500">Subtotal Belanja</span>
                <span className="font-sans font-extrabold text-xl text-brand-500 tabular-nums">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  variant="primary"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Beli Langsung
                </Button>

                <Button
                  variant="outline"
                  onClick={handleAddToCart}
                  className="w-full py-3 text-sm font-semibold"
                >
                  + Keranjang
                </Button>
              </div>

              {/* Jaminan Keamanan */}
              <div className="pt-4 border-t border-line space-y-2 text-[11px] text-ink-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-500" />
                  <span>Jaminan Rekening Bersama Escrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-500" />
                  <span>Garansi Pengiriman Tepat Waktu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notifikasi Berhasil Ditambahkan ke Keranjang */}
        {addedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-brand-900 text-white px-5 py-3.5 rounded-2xl shadow-pop flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CheckCircle2 className="w-5 h-5 text-sun-400" />
            <div className="text-xs">
              <p className="font-bold">Berhasil Ditambahkan!</p>
              <p className="text-white/70">Produk telah masuk ke keranjang belanja Anda.</p>
            </div>
            <Link
              href="/cart"
              className="ml-3 px-3 py-1 bg-sun-400 text-ink-900 font-bold rounded-lg text-xs hover:bg-sun-500"
            >
              Lihat
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
