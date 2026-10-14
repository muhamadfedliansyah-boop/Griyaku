"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function HeroMotion({
  children,
  className = "w-full flex-1 flex flex-col justify-between",
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  // Failsafe: jika GSAP tidak berjalan karena alasan apapun,
  // hapus kelas motion-ok setelah 800ms agar teks tetap muncul
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.remove("motion-ok");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hapus kelas segera saat animasi dimulai — GSAP akan
        // mengontrol transform via inline style, CSS tidak diperlukan lagi
        document.documentElement.classList.remove("motion-ok");

        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
        });

        tl.fromTo(
          "[data-hero-word]",
          { yPercent: 110, rotate: 3 },
          {
            yPercent: 0,
            y: 0,
            rotate: 0,
            duration: 1,
            stagger: 0.12,
          }
        )
          .from(
            "[data-hero-tilt]",
            { y: -180, rotate: -35, duration: 1.1, ease: "back.out(1.4)" },
            0.1
          )
          .from(
            "[data-hero-shadow]",
            { scaleX: 0.4, autoAlpha: 0, duration: 0.6 },
            0.55
          )
          .from(
            "[data-hero-badge]",
            { scale: 0, rotate: -30, duration: 0.5, ease: "back.out(2)" },
            0.7
          )
          .fromTo(
            "[data-hero-cta]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5 },
            0.8
          );

        // Efek melayang halus
        gsap.to("[data-hero-float]", {
          y: "+=12",
          rotate: "+=1.5",
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Parallax saat scroll
        gsap.to("[data-hero-parallax]", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        document.documentElement.classList.remove("motion-ok");
        gsap.set("[data-hero-word]", { yPercent: 0, y: 0, rotate: 0, clearProps: "all" });
        gsap.set("[data-hero-cta]", { autoAlpha: 1, clearProps: "opacity,visibility" });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
