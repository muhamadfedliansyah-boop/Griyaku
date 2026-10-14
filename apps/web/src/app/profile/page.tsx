"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getCurrentUser, logoutUser } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { 
  User, Mail, Phone, MapPin, Package, ShieldCheck, 
  LogOut, ChevronRight, Settings, Heart 
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Profile Card Header */}
        <div className="bg-paper rounded-3xl border border-line p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-brand-500 text-white flex items-center justify-center text-3xl font-extrabold shadow-sm shrink-0">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-display font-bold text-2xl text-ink-900 tracking-tight">
              {user.name}
            </h1>
            <p className="text-sm text-ink-500 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
              <Mail className="w-4 h-4 text-brand-600" />
              {user.email}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Akun Terverifikasi ({user.role || "Member"})</span>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 border-coral-200 text-coral-600 hover:bg-coral-50 hover:border-coral-300 text-xs sm:text-sm py-2 px-4"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </Button>
        </div>

        {/* Quick Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/cart"
            className="bg-paper p-5 rounded-2xl border border-line hover:border-brand-500/40 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-mint-100 text-brand-600 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-ink-900 group-hover:text-brand-600 transition-colors text-sm sm:text-base">
                  Pesanan Saya
                </h2>
                <p className="text-xs text-ink-500">Cek status pengiriman dan riwayat belanja</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-ink-300 group-hover:text-brand-500 transition-colors" />
          </Link>

          <div className="bg-paper p-5 rounded-2xl border border-line hover:border-brand-500/40 hover:shadow-xs transition-all flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sun-100 text-sun-600 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-ink-900 group-hover:text-brand-600 transition-colors text-sm sm:text-base">
                  Buku Alamat
                </h2>
                <p className="text-xs text-ink-500">Kelola alamat pengiriman pesanan Anda</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-ink-300 group-hover:text-brand-500 transition-colors" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
