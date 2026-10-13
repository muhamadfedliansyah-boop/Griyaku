"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Home,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword || !phone) {
      setError("Semua data wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 900));
    setIsLoading(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#1B574A] flex items-center justify-center p-0 md:p-6 lg:p-10 font-sans selection:bg-sun-400 selection:text-ink-900">
      {/* Background Ambient Glow & Blur untuk Desktop */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#247060] via-[#1B574A] to-[#123E34] pointer-events-none" />

      {/* Container Card Utama: Desktop Card dengan S-Wave & Mobile Fullscreen */}
      <div className="w-full max-w-4xl lg:max-w-5xl bg-white md:rounded-[36px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-screen md:min-h-[640px] relative z-10">

        {/* ========================================================= */}
        {/* PANEL KIRI (DESKTOP): Background Hijau + Lengkungan S-Curve*/}
        {/* ========================================================= */}
        <div className="hidden md:flex md:w-[48%] relative bg-[#006A4E] text-white flex-col justify-between p-10 lg:p-12 overflow-hidden">
          {/* Ambient Foto Kafe / Dapur Monokrom Teal */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80')",
            }}
          />

          {/* Lengkungan S-Wave Organik Putih Pembatas */}
          <div className="absolute top-0 right-0 bottom-0 w-24 lg:w-32 overflow-hidden pointer-events-none z-20">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute top-0 right-0 h-full w-full fill-white"
            >
              <path d="M 100,0 L 40,0 C 15,25 5,48 20,68 C 35,85 75,95 90,100 L 100,100 Z" />
            </svg>
          </div>

          {/* Header Panel Kiri: Logo */}
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

          {/* Konten Tengah: Sambutan & Benefit Member */}
          <div className="relative z-30 max-w-xs my-auto py-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-sun-300 text-[11px] font-bold tracking-wide uppercase mb-4 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" /> Gabung Griyaku
            </span>
            <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-white leading-tight">
              Mulai Belanja <br />
              Hemat & Cerdas.
            </h2>
            <p className="mt-3 text-white/80 text-xs sm:text-sm leading-relaxed">
              Daftar sekarang dan nikmati voucher pengguna baru, gratis ongkir, serta poin cashback setiap transaksi.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 className="w-4 h-4 text-sun-400 shrink-0" />
                <span>Voucher Pengguna Baru Rp 50.000</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/90">
                <ShieldCheck className="w-4 h-4 text-sun-400 shrink-0" />
                <span>Jaminan Garansi Resmi 100%</span>
              </div>
            </div>
          </div>

          {/* Footer Kiri */}
          <div className="relative z-30 text-[11px] text-white/60">
            © 2026 Griyaku Marketplace.
          </div>
        </div>

        {/* ========================================================= */}
        {/* PANEL KANAN (DESKTOP) & MOBILE VIEW: FORM REGISTER        */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col bg-white">

          {/* ======================================================= */}
          {/* MOBILE HEADER (PERSIS DI FOTO PHONE 2): "Back to login" */}
          {/* ======================================================= */}
          <div className="md:hidden relative bg-[#006A4E] text-white pt-10 pb-16 px-6 overflow-hidden">
            {/* Lingkaran lengkungan dekorasi hijau */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-400/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-8 left-1/3 w-32 h-32 bg-[#004D38] rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between mb-4">
              {/* Back to login Sesuai Foto Phone 2 */}
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white bg-white/15 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to login
              </Link>
              <span className="font-display font-extrabold text-xl text-white">
                griyaku<span className="text-sun-400">✦</span>
              </span>
            </div>

            <div className="relative z-10 mt-3">
              <h1 className="font-display font-black text-2xl text-white tracking-tight">
                Sign Up
              </h1>
              <p className="text-white/80 text-xs mt-0.5">
                Create your account to continue
              </p>
            </div>
          </div>

          {/* ======================================================= */}
          {/* KARTU FORM (DESKTOP & MOBILE ROUNDED SHEET)             */}
          {/* ======================================================= */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-14 py-8 md:py-10 bg-white -mt-8 md:mt-0 rounded-t-[36px] md:rounded-none z-20">
            <div className="w-full max-w-sm mx-auto">

              {/* Back to login link untuk Desktop */}
              <div className="hidden md:flex items-center justify-between mb-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-[#009E74] font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </div>

              {/* Judul Form: Tepat Sesuai Foto "Sign Up" */}
              <div className="mb-5 text-center md:text-left">
                <h2 className="font-display font-black text-2xl md:text-3xl text-ink-900 tracking-tight">
                  Sign Up
                </h2>
                <p className="text-xs text-ink-500 mt-1">
                  Create an account to start shopping
                </p>
              </div>

              {/* Form Input Sesuai Foto Phone 2: Email, Password, Confirm Password, Phone */}
              <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                {/* Field 1: Email */}
                <div className="space-y-1">
                  <div className="relative flex items-center">
                    <div className="absolute left-4.5 text-ink-400 pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="register-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      autoComplete="email"
                      className="w-full h-11 pl-11 pr-4 rounded-full bg-[#F4F7F5] border border-slate-200 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-[#009E74] focus:bg-white focus:ring-2 focus:ring-[#009E74]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Field 2: Password */}
                <div className="space-y-1">
                  <div className="relative flex items-center">
                    <div className="absolute left-4.5 text-ink-400 pointer-events-none">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      autoComplete="new-password"
                      className="w-full h-11 pl-11 pr-11 rounded-full bg-[#F4F7F5] border border-slate-200 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-[#009E74] focus:bg-white focus:ring-2 focus:ring-[#009E74]/20 transition-all font-mono"
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
                </div>

                {/* Field 3: Confirm Password */}
                <div className="space-y-1">
                  <div className="relative flex items-center">
                    <div className="absolute left-4.5 text-ink-400 pointer-events-none">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="register-confirm"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      className="w-full h-11 pl-11 pr-4 rounded-full bg-[#F4F7F5] border border-slate-200 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-[#009E74] focus:bg-white focus:ring-2 focus:ring-[#009E74]/20 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Field 4: Phone */}
                <div className="space-y-1">
                  <div className="relative flex items-center">
                    <div className="absolute left-4.5 text-ink-400 pointer-events-none">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="register-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone"
                      autoComplete="tel"
                      className="w-full h-11 pl-11 pr-4 rounded-full bg-[#F4F7F5] border border-slate-200 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-[#009E74] focus:bg-white focus:ring-2 focus:ring-[#009E74]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-coral-50 border border-coral-200 text-coral-600 text-xs px-4 py-2.5 rounded-full text-center font-medium">
                    {error}
                  </div>
                )}

                {/* Tombol Hijau Pill: "Sign Up" Sesuai Foto */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-full bg-[#009E74] hover:bg-[#008562] active:scale-[0.98] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Mendaftarkan...</span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              {/* Already have an account? Log In */}
              <div className="text-center mt-5">
                <p className="text-xs text-ink-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#009E74] font-bold hover:underline transition-colors"
                  >
                    Log In
                  </Link>
                </p>
              </div>

              {/* Kembali ke Beranda untuk Mobile */}
              <div className="md:hidden text-center mt-4">
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
