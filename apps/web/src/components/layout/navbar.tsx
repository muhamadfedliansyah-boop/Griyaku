"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  cartCount?: number;
}

export function Navbar({ cartCount = 3 }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-paper/95 backdrop-blur-md border-b border-line shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
          <span className="font-display font-extrabold text-2xl tracking-tight text-brand-500 group-hover:text-brand-600 transition-colors">
            griyaku<span className="text-sun-400">✦</span>
          </span>
        </Link>

        {/* Search Bar - Tokopedia Style Pill */}
        <div className="flex-1 max-w-2xl relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
              }
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari air fryer, blender, robot vacuum, wajan..."
              className="w-full h-11 pl-11 pr-4 rounded-full bg-canvas border border-line text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            <Search className="absolute left-4 w-4 h-4 text-ink-500 pointer-events-none" />
          </form>
        </div>

        {/* Nav Links & Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-ink-700">
            <Link href="/products" className="hover:text-brand-500 transition-colors">
              Semua Produk
            </Link>
            <Link href="/products?category=dapur-memasak" className="hover:text-brand-500 transition-colors">
              Dapur
            </Link>
            <Link href="/products?category=kebersihan-rumah" className="hover:text-brand-500 transition-colors">
              Kebersihan
            </Link>
          </nav>

          {/* Cart Icon with Counter */}
          <Link
            href="/cart"
            aria-label="Keranjang belanja"
            className="relative p-2.5 rounded-full hover:bg-canvas text-ink-700 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 text-ink-700" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-coral-400 text-ink-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Button */}
          <Link href="/products">
            <Button variant="primary" className="text-xs sm:text-sm py-2 px-4 sm:px-5">
              Belanja
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
