"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Home,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";
import { loginUser } from "@/lib/api-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }

    try {
      setIsLoading(true);
      await loginUser(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Email atau kata sandi tidak valid.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1B574A] flex items-center justify-center p-0 md:p-6 lg:p-10 font-sans selection:bg-sun-400 selection:text-ink-900">
      {/* Background Ambient Glow & Blur untuk Desktop */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#247060] via-[#1B574A] to-[#123E34] pointer-events-none" />

      {/* Container Card Utama: Desktop Card dengan S-Wave & Mobile Fullscreen */}
      <div className="w-full max-w-4xl lg:max-w-5xl bg-white md:rounded-[36px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-screen md:min-h-[620px] relative z-10">

        {/* ========================================================= */}
        {/* PANEL KIRI (DESKTOP): Background Hijau + Lengkungan S-Curve*/}
        {/* ========================================================= */}
        <div className="hidden md:flex md:w-[48%] relative bg-[#006A4E] text-white flex-col justify-between p-10 lg:p-12 overflow-hidden">
          {/* Ambient Foto Kafe / Dapur Monokrom Teal Sesuai Foto */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80')",
            }}
          />

          {/* Lengkungan S-Wave Organik Putih Pembatas (Sesuai Persis di Foto) */}
          <div className="absolute top-0 right-0 bottom-0 w-24 lg:w-32 overflow-hidden pointer-events-none z-20">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute top-0 right-0 h-full w-full fill-white"
            >
              {/* S-Curve yang melengkung ke kiri di atas lalu kembali ke kanan di bawah */}
              <path d="M 100,0 L 40,0 C 15,25 5,48 20,68 C 35,85 75,95 90,100 L 100,100 Z" />
            </svg>
          </div>

          {/* Header Panel Kiri: Logo Griyaku */}
          <div className="relative z-30 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-1 group">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white group-hover:text-sun-300 transition-colors">
                griyaku<span className="text-sun-400">✦</span>
              </span>
            </Link>
            <Link
              href="/"
              className="text-xs text-white/80 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Ke Beranda
            </Link>
          </div>

          {/* Konten Tengah: Sambutan & Benefit */}
          <div className="relative z-30 max-w-xs my-auto py-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-sun-300 text-[11px] font-bold tracking-wide uppercase mb-4 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" /> Marketplace Terpercaya
            </span>
            <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-white leading-tight">
              Kenyamanan <br />
              Rumah Impian.
            </h2>
            <p className="mt-3 text-white/80 text-xs sm:text-sm leading-relaxed">
              Lengkapi perlengkapan dapur, alat kebersihan, dan perabot rumah tangga dengan harga terbaik & garansi resmi.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-sun-400 shrink-0" />
                <span>Transaksi aman dengan Escrow</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/90">
                <ShieldCheck className="w-4 h-4 text-sun-400 shrink-0" />
                <span>100% Produk Original & Bergaransi</span>
              </div>
            </div>
          </div>

          {/* Footer Kiri */}
          <div className="relative z-30 text-[11px] text-white/60">
            © 2026 Griyaku Marketplace.
          </div>
        </div>

        {/* ========================================================= */}
        {/* PANEL KANAN (DESKTOP) & MOBILE VIEW: FORM LOGIN LENGKAP   */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col bg-white">

          {/* ======================================================= */}
          {/* MOBILE HEADER (PERSIS DI FOTO PHONE 1): POT TANAMAN     */}
          {/* ======================================================= */}
          <div className="md:hidden relative bg-[#006A4E] text-white pt-10 pb-16 px-6 overflow-hidden">
            {/* Lingkaran lengkungan dekorasi hijau */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-400/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-8 left-1/3 w-32 h-32 bg-[#004D38] rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between mb-4">
              <Link
                href="/"
                className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-all"
                aria-label="Kembali ke beranda"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <span className="font-display font-extrabold text-xl text-white">
                griyaku<span className="text-sun-400">✦</span>
              </span>
              <div className="w-9" />
            </div>

            {/* Sambutan & Ilustrasi Pot Tanaman Persis di Gambar */}
            <div className="relative z-10 flex items-center justify-between mt-2">
              <div>
                <h1 className="font-display font-black text-2xl text-white tracking-tight">
                  Hello!
                </h1>
                <p className="text-white/80 text-xs mt-0.5">
                  Welcome to Griyaku
                </p>
              </div>

              {/* Ilustrasi Pot Tanaman Putih dengan Daun Hijau Tegak (Persis di Foto) */}
              <div className="relative w-16 h-16 flex items-end justify-center">
                {/* Daun tengah tinggi */}
                <div className="absolute -top-1 w-3.5 h-11 bg-emerald-300 rounded-full rotate-2 transform origin-bottom shadow-sm" />
                {/* Daun kiri miring */}
                <div className="absolute top-2 left-1.5 w-3 h-8 bg-emerald-400 rounded-full -rotate-18 transform origin-bottom" />
                {/* Daun kanan miring */}
                <div className="absolute top-2 right-1.5 w-3 h-8 bg-emerald-200 rounded-full rotate-18 transform origin-bottom" />
                {/* Pot putih melengkung */}
                <div className="w-10 h-7 bg-white rounded-b-xl rounded-t-sm shadow-md border-t-2 border-emerald-700 flex items-center justify-center relative z-10">
                  <span className="w-2.5 h-0.5 bg-emerald-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* KARTU FORM (DESKTOP & MOBILE ROUNDED SHEET)             */}
          {/* ======================================================= */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-14 py-8 md:py-10 bg-white -mt-8 md:mt-0 rounded-t-[36px] md:rounded-none z-20">
            <div className="w-full max-w-sm mx-auto">

              {/* Judul Form: Tepat Sesuai Foto "Welcome" */}
              <div className="mb-6 md:mb-8 text-center md:text-left">
                <h2 className="font-display font-black text-2xl md:text-3xl text-ink-900 tracking-tight">
                  Welcome
                </h2>
                <p className="text-xs text-ink-500 mt-1">
                  Log in to your account to continue
                </p>
              </div>

              {/* Form Input Sesuai Foto */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Field 1: Pill Input dengan Ikon User (Placeholder: awesome@user.com) */}
                <div className="space-y-1">
                  <div className="relative flex items-center">
                    <div className="absolute left-4.5 text-ink-400 pointer-events-none">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="awesome@user.com"
                      autoComplete="email"
                      className="w-full h-12 pl-11 pr-4 rounded-full bg-[#F4F7F5] border border-slate-200 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-[#009E74] focus:bg-white focus:ring-2 focus:ring-[#009E74]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Field 2: Pill Input dengan Ikon Lock (Placeholder: ••••••••••••) */}
                <div className="space-y-1">
                  <div className="relative flex items-center">
                    <div className="absolute left-4.5 text-ink-400 pointer-events-none">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      className="w-full h-12 pl-11 pr-11 rounded-full bg-[#F4F7F5] border border-slate-200 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-[#009E74] focus:bg-white focus:ring-2 focus:ring-[#009E74]/20 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-ink-400 hover:text-ink-700 transition-colors p-1 cursor-pointer"
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Forgot your password? Kanan Bawah Sesuai Foto */}
                  <div className="flex justify-end pt-1">
                    <Link
                      href="#"
                      className="text-[11px] text-ink-400 hover:text-[#009E74] transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-coral-50 border border-coral-200 text-coral-600 text-xs px-4 py-2.5 rounded-full text-center font-medium">
                    {error}
                  </div>
                )}

                {/* Tombol Hijau Pill: "Log In" Sesuai Foto */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-full bg-[#009E74] hover:bg-[#008562] active:scale-[0.98] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>

              {/* Don't have an account? Sign up! (Tautan ke Halaman Register) */}
              <div className="text-center mt-5">
                <p className="text-xs text-ink-500">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-[#009E74] font-bold hover:underline transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>

              {/* Social Login: Facebook, Twitter, LinkedIn / Apple (Persis di Foto) */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center gap-3">
                <div className="flex items-center justify-center gap-4">
                  {/* Facebook (f) */}
                  <button
                    type="button"
                    aria-label="Login dengan Facebook"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    f
                  </button>

                  {/* Twitter (t) */}
                  <button
                    type="button"
                    aria-label="Login dengan Twitter"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-sky-50 text-sky-500 flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </button>

                  {/* LinkedIn (in) */}
                  <button
                    type="button"
                    aria-label="Login dengan LinkedIn"
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 active:scale-95 cursor-pointer font-serif"
                  >
                    in
                  </button>
                </div>
              </div>

              {/* Kembali ke Beranda untuk Mobile */}
              <div className="md:hidden text-center mt-5">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-ink-700 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  Kembali ke Beranda
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
