"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { INITIAL_PRODUCTS, formatRupiah } from "@/lib/products-data";
import { 
  CheckCircle2, Trash2, Plus, Minus, ArrowRight, 
  ShoppingBag, ShieldCheck, Tag 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartStoreItem {
  id: number;
  product: typeof INITIAL_PRODUCTS[0];
  quantity: number;
  selected: boolean;
}

export default function CartPage() {
  const router = useRouter();

  // Initial cart items grouped across merchants
  const [items, setItems] = useState<CartStoreItem[]>([
    {
      id: 1,
      product: INITIAL_PRODUCTS[0]!, // Air Fryer (Griyaku Official Store)
      quantity: 1,
      selected: true,
    },
    {
      id: 2,
      product: INITIAL_PRODUCTS[1]!, // Blender (Griyaku Official Store)
      quantity: 1,
      selected: true,
    },
    {
      id: 3,
      product: INITIAL_PRODUCTS[3]!, // Robot Vacuum (Homeware Nusantara)
      quantity: 1,
      selected: false,
    },
  ]);

  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);

  // Group items by merchant
  const groupedByMerchant = items.reduce((acc, item) => {
    const merchantId = item.product.merchant.id;
    if (!acc[merchantId]) {
      acc[merchantId] = {
        merchant: item.product.merchant,
        items: [],
      };
    }
    acc[merchantId].items.push(item);
    return acc;
  }, {} as Record<number, { merchant: typeof INITIAL_PRODUCTS[0]["merchant"]; items: CartStoreItem[] }>);

  // Toggle selection
  const toggleSelectAll = (checked: boolean) => {
    setItems(items.map((i) => ({ ...i, selected: checked })));
  };

  const toggleSelectItem = (id: number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)));
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems(
      items.map((i) => {
        if (i.id === id) {
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      })
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const allSelected = items.length > 0 && items.every((i) => i.selected);
  const selectedItems = items.filter((i) => i.selected);

  const subtotal = selectedItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const discount = voucherApplied ? 50000 : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between">
      <Navbar cartCount={items.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight mb-6">
          Keranjang Belanja
        </h1>

        {items.length === 0 ? (
          <div className="bg-paper p-16 rounded-[32px] border border-line text-center space-y-4 max-w-xl mx-auto">
            <ShoppingBag className="w-16 h-16 text-ink-300 mx-auto" />
            <h2 className="font-bold text-xl text-ink-900">Keranjang Belanja Anda Kosong</h2>
            <p className="text-sm text-ink-500">
              Jelajahi beragam perlengkapan rumah tangga terbaik dan nikmati promo bebas ongkir.
            </p>
            <Link href="/products">
              <Button variant="primary" className="mt-4">
                Mulai Belanja Sekarang
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* List Item per Toko (Lg: 8/12) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Select All Bar */}
              <div className="p-4 bg-paper rounded-2xl border border-line flex items-center justify-between">
                <label className="flex items-center gap-3 text-sm font-semibold text-ink-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-500 accent-brand-500 cursor-pointer"
                  />
                  <span>Pilih Semua Barang ({items.length})</span>
                </label>

                {selectedItems.length > 0 && (
                  <button
                    onClick={() => setItems(items.filter((i) => !i.selected))}
                    className="text-xs text-coral-600 hover:underline font-semibold cursor-pointer"
                  >
                    Hapus Pilihan
                  </button>
                )}
              </div>

              {/* Grouped by Store */}
              {Object.values(groupedByMerchant).map(({ merchant, items: storeItems }) => (
                <div
                  key={merchant.id}
                  className="bg-paper rounded-[28px] border border-line overflow-hidden shadow-xs"
                >
                  {/* Store Header */}
                  <div className="p-4 bg-canvas/60 border-b border-line flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={storeItems.every((i) => i.selected)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setItems(
                            items.map((i) =>
                              storeItems.some((si) => si.id === i.id)
                                ? { ...i, selected: checked }
                                : i
                            )
                          );
                        }}
                        className="w-4 h-4 rounded text-brand-500 accent-brand-500 cursor-pointer"
                      />
                      <div className="flex items-center gap-1 font-bold text-sm text-ink-900">
                        {merchant.isOfficial && (
                          <CheckCircle2 className="w-4 h-4 text-brand-500" />
                        )}
                        <span>{merchant.name}</span>
                      </div>
                      <span className="text-xs text-ink-500">· {merchant.city}</span>
                    </div>
                  </div>

                  {/* Store Items List */}
                  <div className="divide-y divide-line p-4 space-y-4">
                    {storeItems.map((item) => (
                      <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => toggleSelectItem(item.id)}
                          className="mt-3 w-4 h-4 rounded text-brand-500 accent-brand-500 cursor-pointer shrink-0"
                        />

                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-canvas border border-line shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info & Price */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.product.id}`}
                            className="font-semibold text-sm text-ink-900 hover:text-brand-500 transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          
                          <div className="font-extrabold text-brand-500 text-sm mt-1 tabular-nums">
                            {formatRupiah(item.product.price)}
                          </div>

                          {item.product.isFreeShipping && (
                            <span className="inline-block mt-1 text-[10px] bg-mint-100 text-brand-700 font-bold px-2 py-0.5 rounded">
                              Bebas Ongkir
                            </span>
                          )}
                        </div>

                        {/* Quantity Picker & Delete */}
                        <div className="flex flex-col items-end gap-3 shrink-0">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-ink-500 hover:text-coral-600 transition-colors p-1"
                            title="Hapus barang"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="flex items-center border border-line rounded-full p-0.5 bg-canvas">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-ink-700 hover:bg-paper disabled:opacity-30 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-xs text-ink-900 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-ink-700 hover:bg-paper cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Ringkasan Belanja (Lg: 4/12) */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="bg-paper p-6 rounded-[28px] border border-line shadow-card space-y-5">
                <h2 className="font-bold text-base text-ink-900">Ringkasan Belanja</h2>

                {/* Voucher Promo Input */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-3 text-ink-500" />
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="Kode promo (coba: GRIYA50)"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-line text-xs uppercase font-semibold focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (voucherCode.toUpperCase() === "GRIYA50") {
                          setVoucherApplied(true);
                        } else {
                          alert("Gunakan kode 'GRIYA50' untuk diskon Rp 50.000");
                        }
                      }}
                      className="text-xs px-3"
                    >
                      Pakai
                    </Button>
                  </div>
                  {voucherApplied && (
                    <p className="text-[11px] text-brand-600 font-semibold">
                      ✓ Promo diskon Rp 50.000 berhasil diterapkan!
                    </p>
                  )}
                </div>

                {/* Rincian Biaya */}
                <div className="space-y-2.5 text-xs text-ink-700 pt-3 border-t border-line">
                  <div className="flex justify-between">
                    <span>Total Harga ({selectedItems.reduce((acc, i) => acc + i.quantity, 0)} barang)</span>
                    <span className="font-semibold tabular-nums">{formatRupiah(subtotal)}</span>
                  </div>

                  {voucherApplied && (
                    <div className="flex justify-between text-coral-600 font-semibold">
                      <span>Diskon Promo</span>
                      <span className="tabular-nums">- {formatRupiah(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimasi Ongkir</span>
                    <span className="text-brand-600 font-bold">GRATIS</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-900">Total Tagihan</span>
                  <span className="font-sans font-extrabold text-2xl text-brand-500 tabular-nums">
                    {formatRupiah(total)}
                  </span>
                </div>

                {/* Checkout CTA */}
                <Button
                  variant="primary"
                  disabled={selectedItems.length === 0}
                  onClick={() => router.push("/checkout")}
                  className="w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
                >
                  Beli ({selectedItems.length})
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-ink-500 pt-2">
                  <ShieldCheck className="w-4 h-4 text-brand-500" />
                  <span>Transaksi Aman dengan Rekening Bersama Escrow</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
