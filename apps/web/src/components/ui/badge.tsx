import React from "react";

interface RoundBadgeProps {
  text: string;
  className?: string;
}

export function RoundBadge({ text, className = "" }: RoundBadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-brand-800 text-white font-semibold text-xs px-4 py-2 shadow-pop border border-brand-700 select-none ${className}`}
    >
      <span className="mr-1 text-mint-200">✔</span>
      {text}
    </div>
  );
}

interface StickerProps {
  label: string;
  variant?: "sun" | "coral" | "mint";
}

export function Sticker({ label, variant = "sun" }: StickerProps) {
  let color = "bg-sun-400 text-ink-900";
  if (variant === "coral") color = "bg-coral-100 text-coral-600 font-bold";
  if (variant === "mint") color = "bg-mint-200 text-ink-900";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${color}`}
    >
      {label}
    </span>
  );
}
