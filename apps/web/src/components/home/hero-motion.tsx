"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function HeroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.from("[data-hero-word]", {
          yPercent: 110,
          rotate: 3,
          duration: 1,
          stagger: 0.12,
        })
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
          .from(
            "[data-hero-cta]",
            { y: 24, autoAlpha: 0, duration: 0.5 },
            0.8
          )
          .from(
            "[data-hero-card]",
            { x: 100, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
            0.9
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
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}
