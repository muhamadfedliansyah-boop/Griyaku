"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle2, Heart } from "lucide-react";
import { ProductItem } from "@/types/ecommerce";
import { formatRupiah } from "@/lib/products-data";

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-paper rounded-[24px] border border-line p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      <div>
        {/* Foto Produk 1:1 */}
        <div className="relative aspect-square w-full rounded-[20px] overflow-hidden bg-canvas mb-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badge Diskon Kiri Atas */}
          {product.discountPercent && product.discountPercent > 0 ? (
            <div className="absolute top-2.5 left-2.5 bg-coral-400 text-ink-900 font-bold text-[11px] px-2 py-0.5 rounded-full shadow-xs">
              Hemat {product.discountPercent}%
            </div>
          ) : null}

          {/* Wishlist Icon Kanan Atas */}
          <button
            aria-label="Tambah ke wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-ink-500 hover:text-coral-600 hover:bg-white transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Informasi Produk */}
        <div className="space-y-1.5 px-1">
          {/* Judul Produk (Line clamp 2) */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-sans font-semibold text-sm text-ink-900 line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Harga & Coret */}
          <div className="pt-1">
            <div className="font-sans font-extrabold text-base text-brand-500 tabular-nums">
              {formatRupiah(product.price)}
            </div>
            {product.originalPrice && (
              <div className="flex items-center gap-1.5 text-xs text-ink-500">
                <span className="line-through">{formatRupiah(product.originalPrice)}</span>
                <span className="text-coral-600 font-bold bg-coral-100 px-1 py-0.2 rounded text-[10px]">
                  -{product.discountPercent}%
                </span>
              </div>
            )}
          </div>

          {/* Toko Resmi & Lokasi */}
          <div className="flex items-center gap-1 text-xs text-ink-500 pt-1">
            {product.merchant.isOfficial && (
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            )}
            <span className="truncate">
              {product.merchant.isOfficial ? "Toko Resmi" : product.merchant.name} · {product.merchant.city}
            </span>
          </div>

          {/* Rating & Terjual */}
          <div className="flex items-center gap-1.5 text-xs text-ink-500">
            <div className="flex items-center text-sun-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-sun-500 mr-0.5" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <span>·</span>
            <span>{product.soldCount > 1000 ? `${(product.soldCount / 1000).toFixed(1)} rb+` : product.soldCount} terjual</span>
          </div>
        </div>
      </div>

      {/* Gratis Ongkir Label */}
      {product.isFreeShipping && (
        <div className="mt-3 px-1">
          <span className="inline-block bg-mint-100 text-brand-700 font-semibold text-[11px] px-2 py-0.5 rounded-md">
            Gratis Ongkir
          </span>
        </div>
      )}

      {/* Full link click overlay */}
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10" aria-hidden="true" />
    </div>
  );
}
