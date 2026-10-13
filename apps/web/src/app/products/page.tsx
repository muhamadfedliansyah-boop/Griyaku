"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import { SlidersHorizontal, Check, Star } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [onlyOfficial, setOnlyOfficial] = useState(false);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "sales">("featured");
  const [minRating, setMinRating] = useState<number>(0);

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((item) => {
      if (selectedCategory !== "all" && item.category.slug !== selectedCategory) {
        return false;
      }
      if (onlyOfficial && !item.merchant.isOfficial) {
        return false;
      }
      if (onlyFreeShipping && !item.isFreeShipping) {
        return false;
      }
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "sales") return b.soldCount - a.soldCount;
      return 0;
    });
  }, [selectedCategory, onlyOfficial, onlyFreeShipping, sortBy, minRating]);

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Header Breadcrumb & Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink-900 tracking-tight">
              Katalog Produk Peralatan Rumah Tangga
            </h1>
            <p className="text-sm text-ink-500 mt-1">
              Menampilkan {filteredProducts.length} produk pilihan terbaik
            </p>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-700 font-medium whitespace-nowrap">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-10 px-4 py-2 bg-paper border border-line rounded-full text-sm font-medium text-ink-900 focus:outline-none focus:border-brand-500 shadow-xs cursor-pointer"
            >
              <option value="featured">Paling Sesuai</option>
              <option value="sales">Penjualan Terbanyak</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Content Layout: Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filter Sidebar */}
          <aside className="bg-paper p-6 rounded-[28px] border border-line shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <h2 className="font-bold text-base text-ink-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-500" />
                Filter Pencarian
              </h2>
              {(selectedCategory !== "all" || onlyOfficial || onlyFreeShipping || minRating > 0) && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setOnlyOfficial(false);
                    setOnlyFreeShipping(false);
                    setMinRating(0);
                  }}
                  className="text-xs text-brand-500 font-semibold hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Kategori */}
            <div>
              <h3 className="font-semibold text-sm text-ink-900 mb-3">Kategori</h3>
              <div className="space-y-1.5">
                {[
                  { slug: "all", label: "Semua Kategori" },
                  { slug: "dapur-memasak", label: "🍳 Dapur & Memasak" },
                  { slug: "kebersihan-rumah", label: "🧹 Kebersihan Rumah" },
                  { slug: "elektronik-rumah", label: "⚡ Elektronik Rumah" },
                  { slug: "perabot-dekorasi", label: "🛋️ Perabot & Dekorasi" },
                ].map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.slug
                        ? "bg-brand-50 text-brand-600 font-bold"
                        : "text-ink-700 hover:bg-canvas"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.slug && <Check className="w-3.5 h-3.5 text-brand-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Fitur & Promo */}
            <div className="pt-4 border-t border-line">
              <h3 className="font-semibold text-sm text-ink-900 mb-3">Layanan & Garansi</h3>
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 text-xs text-ink-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyOfficial}
                    onChange={(e) => setOnlyOfficial(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-500 accent-brand-500 cursor-pointer"
                  />
                  <span>Hanya Toko Resmi (Official)</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-ink-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyFreeShipping}
                    onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-500 accent-brand-500 cursor-pointer"
                  />
                  <span>Bebas Ongkir ke Lokasi Saya</span>
                </label>
              </div>
            </div>

            {/* Rating Bintang Minimal */}
            <div className="pt-4 border-t border-line">
              <h3 className="font-semibold text-sm text-ink-900 mb-3">Rating Minimal</h3>
              <div className="flex gap-2">
                {[0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
                      minRating === rating
                        ? "bg-brand-500 text-white border-brand-500"
                        : "bg-paper text-ink-700 border-line hover:bg-canvas"
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>{rating === 0 ? "Semua" : `${rating}+`}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-paper p-12 rounded-[28px] border border-line text-center space-y-3">
                <p className="text-4xl">🔍</p>
                <h3 className="font-bold text-lg text-ink-900">Produk Tidak Ditemukan</h3>
                <p className="text-sm text-ink-500 max-w-md mx-auto">
                  Coba ubah kata kunci atau hapus beberapa filter pencarian untuk melihat produk lainnya.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
