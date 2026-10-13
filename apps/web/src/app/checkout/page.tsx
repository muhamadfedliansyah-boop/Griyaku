"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { INITIAL_PRODUCTS, formatRupiah } from "@/lib/products-data";
import { 
  MapPin, Truck, CreditCard, ShieldCheck, CheckCircle2, 
  Copy, Clock, ArrowLeft, Check, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();

  // Step 1: Address State
  const [address, setAddress] = useState({
    recipientName: "Budi Santoso",
    phone: "0812-3456-7890",
    label: "Rumah Utama",
    fullAddress: "Jl. Margonda Raya No. 128, RT 02 / RW 05, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16423",
  });

  // Step 2: Courier Selection
  const [courier, setCourier] = useState<"regular" | "instant" | "cargo">("regular");

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"bca_va" | "mandiri_va" | "qris" | "gopay">("bca_va");

  // Payment Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);

  // Purchased items (sample from cart)
  const purchasedItems = [
    { product: INITIAL_PRODUCTS[0]!, quantity: 1 },
    { product: INITIAL_PRODUCTS[1]!, quantity: 1 },
  ];

  const itemsSubtotal = purchasedItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const shippingFee = courier === "instant" ? 25000 : 0; // Regular is free
  const insuranceFee = 2500;
  const adminFee = 1000;
  const grandTotal = itemsSubtotal + shippingFee + insuranceFee + adminFee;

  const vaNumber = "8801 2948 1029 3847";

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentSuccess(true);
    }, 1200);
  };

  const handleCopyVA = () => {
    navigator.clipboard?.writeText(vaNumber.replace(/\s+/g, ""));
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between">
      <Navbar cartCount={0} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Header Breadcrumb */}
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/cart"
            className="p-2 rounded-full bg-paper border border-line text-ink-700 hover:text-brand-500 hover:border-brand-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-900 tracking-tight">
            Checkout & Pembayaran
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: 3 Langkah Alur Pembayaran (Lg: 8/12) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* ---------------------------------------------------- */}
            {/* LANGKAH 01: ALAMAT PENGIRIMAN                       */}
            {/* ---------------------------------------------------- */}
            <div className="bg-paper p-6 rounded-[28px] border border-line shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-3">
                  <span className="font-display font-black text-xl text-sun-500 bg-sun-50 px-2.5 py-0.5 rounded-lg">
                    01
                  </span>
                  <h2 className="font-bold text-base text-ink-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    Alamat Pengiriman
                  </h2>
                </div>
                <button className="text-xs font-semibold text-brand-500 hover:underline cursor-pointer">
                  Ubah Alamat
                </button>
              </div>

              <div className="space-y-1 text-xs text-ink-700">
                <div className="flex items-center gap-2 font-bold text-ink-900">
                  <span>{address.recipientName}</span>
                  <span className="text-ink-400 font-normal">({address.label})</span>
                  <span>·</span>
                  <span className="font-medium text-ink-600">{address.phone}</span>
                </div>
                <p className="leading-relaxed text-ink-600">{address.fullAddress}</p>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* LANGKAH 02: PENGIRIMAN & KURIR                      */}
            {/* ---------------------------------------------------- */}
            <div className="bg-paper p-6 rounded-[28px] border border-line shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-line">
                <span className="font-display font-black text-xl text-sun-500 bg-sun-50 px-2.5 py-0.5 rounded-lg">
                  02
                </span>
                <h2 className="font-bold text-base text-ink-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-500" />
                  Metode Pengiriman
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setCourier("regular")}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    courier === "regular"
                      ? "border-brand-500 bg-brand-50/40"
                      : "border-line bg-paper hover:border-brand-200"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-ink-900">Reguler</span>
                    <span className="text-brand-600 font-extrabold text-xs">GRATIS</span>
                  </div>
                  <p className="text-[11px] text-ink-500">Estimasi tiba 1 - 2 hari</p>
                  <p className="text-[10px] text-brand-700 font-medium mt-2">Bebas Ongkir Griyaku</p>
                </div>

                <div
                  onClick={() => setCourier("instant")}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    courier === "instant"
                      ? "border-brand-500 bg-brand-50/40"
                      : "border-line bg-paper hover:border-brand-200"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-ink-900">Instant (GoSend)</span>
                    <span className="text-ink-900 font-bold text-xs">Rp 25.000</span>
                  </div>
                  <p className="text-[11px] text-ink-500">Tiba dalam 3 jam</p>
                  <p className="text-[10px] text-ink-400 font-medium mt-2">Pengiriman Kilat</p>
                </div>

                <div
                  onClick={() => setCourier("cargo")}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    courier === "cargo"
                      ? "border-brand-500 bg-brand-50/40"
                      : "border-line bg-paper hover:border-brand-200"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-ink-900">Kargo Truk</span>
                    <span className="text-brand-600 font-extrabold text-xs">GRATIS</span>
                  </div>
                  <p className="text-[11px] text-ink-500">Estimasi tiba 3 - 4 hari</p>
                  <p className="text-[10px] text-brand-700 font-medium mt-2">Khusus barang besar</p>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* LANGKAH 03: METODE PEMBAYARAN                       */}
            {/* ---------------------------------------------------- */}
            <div className="bg-paper p-6 rounded-[28px] border border-line shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-line">
                <span className="font-display font-black text-xl text-sun-500 bg-sun-50 px-2.5 py-0.5 rounded-lg">
                  03
                </span>
                <h2 className="font-bold text-base text-ink-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-500" />
                  Pilih Pembayaran Aman
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "bca_va",
                    name: "BCA Virtual Account",
                    desc: "Verifikasi instan otomatis 24 jam",
                    badge: "Populer",
                  },
                  {
                    id: "mandiri_va",
                    name: "Mandiri Virtual Account",
                    desc: "Bayar via Livin' by Mandiri atau ATM",
                  },
                  {
                    id: "qris",
                    name: "QRIS (Semua E-Wallet & Bank)",
                    desc: "Scan QR lewat BCA, GoPay, OVO, Dana, ShopeePay",
                    badge: "Cepat",
                  },
                  {
                    id: "gopay",
                    name: "GoPay / GoPay Coins",
                    desc: "Koneksikan akun dompet digital Anda",
                  },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? "border-brand-500 bg-brand-50/40"
                        : "border-line bg-paper hover:bg-canvas"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment_method"
                        checked={paymentMethod === pm.id}
                        onChange={() => {}}
                        className="w-4 h-4 text-brand-500 accent-brand-500 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-ink-900">{pm.name}</span>
                          {pm.badge && (
                            <span className="bg-sun-400 text-ink-900 font-extrabold text-[10px] px-2 py-0.2 rounded-full">
                              {pm.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-ink-500 mt-0.5">{pm.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Ringkasan Tagihan & Tombol Bayar (Lg: 4/12) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-paper p-6 rounded-[28px] border border-line shadow-card space-y-5">
              <h2 className="font-bold text-base text-ink-900">Ringkasan Pembayaran</h2>

              {/* Items Mini List */}
              <div className="space-y-3 pb-3 border-b border-line">
                {purchasedItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center text-xs">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-line shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink-900 truncate">{item.product.name}</p>
                      <p className="text-ink-500">{item.quantity} x {formatRupiah(item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail Rincian Biaya */}
              <div className="space-y-2.5 text-xs text-ink-700">
                <div className="flex justify-between">
                  <span>Total Harga Produk</span>
                  <span className="font-semibold tabular-nums">{formatRupiah(itemsSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold tabular-nums">
                    {shippingFee === 0 ? "GRATIS" : formatRupiah(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Asuransi Pengiriman</span>
                  <span className="tabular-nums">{formatRupiah(insuranceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Layanan & Escrow</span>
                  <span className="tabular-nums">{formatRupiah(adminFee)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-4 border-t border-line flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-500 font-medium">Total Pembayaran</p>
                  <p className="font-sans font-extrabold text-2xl text-brand-500 tabular-nums">
                    {formatRupiah(grandTotal)}
                  </p>
                </div>
              </div>

              {/* CTA Tombol Bayar 56px */}
              <Button
                variant="primary"
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full h-14 rounded-full text-base font-bold flex items-center justify-center gap-2 shadow-card"
              >
                {isProcessing ? "Memproses Transaksi..." : `Bayar Sekarang ${formatRupiah(grandTotal)}`}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-ink-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>Dana aman tersimpan di Rekening Bersama Escrow</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODAL / SIMULASI PEMBAYARAN SUKSES                      */}
        {/* ======================================================== */}
        {isPaymentSuccess && (
          <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-paper rounded-[32px] max-w-md w-full p-6 sm:p-8 border border-line shadow-pop space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center mx-auto border border-brand-200">
                  <Sparkles className="w-8 h-8 fill-brand-500" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-ink-900">
                  Instruksi Pembayaran
                </h3>
                <p className="text-xs text-ink-500">
                  Pesanan <span className="font-bold text-ink-900">#GRY-8291039</span> berhasil dibuat
                </p>
              </div>

              {/* Box Virtual Account */}
              <div className="p-4 bg-canvas rounded-2xl border border-line space-y-3">
                <div className="flex items-center justify-between text-xs text-ink-500">
                  <span>Metode: BCA Virtual Account</span>
                  <span className="flex items-center gap-1 text-coral-600 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    Sisa waktu 23:59:12
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-[10px] text-ink-400 uppercase tracking-wider font-bold">Nomor Virtual Account</p>
                    <p className="font-display font-black text-lg text-ink-900 tracking-wider tabular-nums">
                      {vaNumber}
                    </p>
                  </div>
                  <button
                    onClick={handleCopyVA}
                    className="p-2 rounded-xl bg-paper border border-line text-xs font-bold text-brand-600 hover:bg-brand-50 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedVA ? <Check className="w-4 h-4 text-brand-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedVA ? "Disalin" : "Salin"}</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-line/60 flex justify-between text-xs">
                  <span className="text-ink-500">Total Nominal Transfer:</span>
                  <span className="font-extrabold text-brand-500 tabular-nums">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Status Simulation Action */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  onClick={() => {
                    alert("Simulasi pembayaran berhasil! Pesanan Anda sedang diproses oleh penjual.");
                    router.push("/products");
                  }}
                  className="w-full py-3.5 text-sm font-bold"
                >
                  Simulasikan Bayar Lunas (Testing)
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setIsPaymentSuccess(false)}
                  className="w-full py-3 text-xs font-semibold"
                >
                  Tutup & Cek Status Nanti
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
