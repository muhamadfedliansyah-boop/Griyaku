import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mb-6 border border-brand-200">
        <PackageOpen className="w-10 h-10 text-brand-500" />
      </div>
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 tracking-tight mb-2">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-sm text-ink-500 max-w-md mb-8">
        Halaman yang Anda tuju mungkin telah dipindahkan atau tidak tersedia lagi.
      </p>
      <Link href="/">
        <Button variant="primary" className="py-3 px-6">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}
