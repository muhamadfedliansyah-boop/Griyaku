import Link from "next/link";
import { ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white mt-16 pt-12 pb-8 border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-brand-800/60">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-800 rounded-2xl text-sun-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">100% Orisinal</p>
              <p className="text-xs text-white/60">Jaminan garansi resmi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-800 rounded-2xl text-sun-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Gratis Ongkir</p>
              <p className="text-xs text-white/60">Ke seluruh Indonesia</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-800 rounded-2xl text-sun-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">15 Hari Retur</p>
              <p className="text-xs text-white/60">Pengembalian mudah</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-800 rounded-2xl text-sun-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">Layanan 24/7</p>
              <p className="text-xs text-white/60">Bantuan responsif</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-4">
              griyaku<span className="text-sun-400">✦</span>
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Marketplace alat rumah tangga terpercaya. Solusi lengkap dapur, kebersihan, dan perabot rumah Anda.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-sm text-white mb-3">Kategori Pilihan</h5>
            <ul className="space-y-2 text-xs text-white/70">
              <li><Link href="/products?category=dapur-memasak" className="hover:text-sun-400">Peralatan Dapur</Link></li>
              <li><Link href="/products?category=kebersihan-rumah" className="hover:text-sun-400">Alat Kebersihan</Link></li>
              <li><Link href="/products?category=elektronik-rumah" className="hover:text-sun-400">Elektronik Cerdas</Link></li>
              <li><Link href="/products?category=perabot-dekorasi" className="hover:text-sun-400">Perabot & Ruang</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-sm text-white mb-3">Bantuan & Panduan</h5>
            <ul className="space-y-2 text-xs text-white/70">
              <li><Link href="#" className="hover:text-sun-400">Status Pesanan</Link></li>
              <li><Link href="#" className="hover:text-sun-400">Kebijakan Pengembalian</Link></li>
              <li><Link href="#" className="hover:text-sun-400">Metode Pembayaran</Link></li>
              <li><Link href="#" className="hover:text-sun-400">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-sm text-white mb-3">Keamanan Transaksi</h5>
            <p className="text-xs text-white/70 mb-3">
              Dilindungi oleh Rekening Bersama Escrow & Gerbang Pembayaran Terenkripsi.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/80">
              <span className="px-2.5 py-1 bg-brand-800 rounded-md">BCA</span>
              <span className="px-2.5 py-1 bg-brand-800 rounded-md">Mandiri</span>
              <span className="px-2.5 py-1 bg-brand-800 rounded-md">QRIS</span>
              <span className="px-2.5 py-1 bg-brand-800 rounded-md">GoPay</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-brand-800/60 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Griyaku Marketplace. Hak Cipta Dilindungi Undang-Undang.
        </div>
      </div>
    </footer>
  );
}
