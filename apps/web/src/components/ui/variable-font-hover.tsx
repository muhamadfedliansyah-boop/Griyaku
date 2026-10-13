"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface VariableFontHoverProps {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  staggerDuration?: number;
  staggerFrom?: "center" | "start" | "end" | "first" | "last";
  className?: string;
  onClick?: () => void;
}

export function VariableFontHover({
  label,
  fromFontVariationSettings = "'wght' 400",
  toFontVariationSettings = "'wght' 700",
  staggerDuration = 0.03,
  staggerFrom = "center",
  className = "",
  onClick,
}: VariableFontHoverProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseEnter = () => {
    if (!lettersRef.current.length) return;
    gsap.to(lettersRef.current, {
      fontVariationSettings: toFontVariationSettings,
      fontWeight: 700,
      duration: 0.35,
      ease: "power2.out",
      stagger: {
        each: staggerDuration,
        from: staggerFrom as any,
      },
    });
  };

  const handleMouseLeave = () => {
    if (!lettersRef.current.length) return;
    gsap.to(lettersRef.current, {
      fontVariationSettings: fromFontVariationSettings,
      fontWeight: 400,
      duration: 0.35,
      ease: "power2.inOut",
      stagger: {
        each: staggerDuration,
        from: staggerFrom as any,
      },
    });
  };

  return (
    <span
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex select-none transition-colors ${className}`}
      style={{ fontVariationSettings: fromFontVariationSettings }}
    >
      {label.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            lettersRef.current[index] = el;
          }}
          className="inline-block transition-transform duration-200"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
