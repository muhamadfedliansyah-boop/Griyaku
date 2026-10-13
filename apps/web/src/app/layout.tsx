import type { Metadata } from "next";
import { bricolage, jakarta } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Griyaku — Marketplace Alat Rumah Tangga Pilihan",
  description: "Marketplace alat rumah tangga nomor satu: dapur, kebersihan, perabot, dan elektronik rumah terbaik dengan jaminan garansi resmi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
                  document.documentElement.classList.add("motion-ok");
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-sans bg-canvas text-ink-900 antialiased selection:bg-sun-300 selection:text-ink-900">
        {children}
      </body>
    </html>
  );
}
