"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { VariableFontHover } from "@/components/ui/variable-font-hover";

const navLinks = ["Products", "Solutions", "Pricing", "Company", "Blog"];

export default function VariableFontHoverNav() {
  const navRef = useRef<HTMLElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setCursorPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="flex items-center justify-center p-4">
      {/* 
        Navbar Berbentuk Oval (rounded-full), Background Glass (backdrop-blur-xl + bg-white/40),
        dan Background Warna yang Mengikuti Cursor (cursor-following glow/spotlight)
      */}
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center gap-6 sm:gap-8 px-8 py-3.5 rounded-full bg-white/30 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-card overflow-hidden transition-all duration-300"
      >
        {/* Hover background warna yang dinamis mengikuti cursor */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: cursorPos.opacity,
            background: `radial-gradient(140px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0, 106, 78, 0.18), rgba(255, 210, 63, 0.12), transparent 70%)`,
          }}
        />

        {/* Ambient border glow mengikuti cursor */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            opacity: cursorPos.opacity,
            background: `radial-gradient(100px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0, 106, 78, 0.25), transparent 60%)`,
          }}
        />

        {/* Navigation Links dengan Efek Variable Font Hover */}
        {navLinks.map((link) => (
          <VariableFontHover
            className="relative z-10 cursor-pointer text-sm sm:text-base font-medium text-ink-700 hover:text-brand-500 transition-colors"
            fromFontVariationSettings="'wght' 400"
            key={link}
            label={link}
            staggerDuration={0.03}
            staggerFrom="center"
            toFontVariationSettings="'wght' 700"
          />
        ))}
      </nav>
    </div>
  );
}
