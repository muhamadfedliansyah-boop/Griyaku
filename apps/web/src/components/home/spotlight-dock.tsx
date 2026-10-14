"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  User,
  Home,
  Package,
  Utensils,
  Zap,
  Sparkles,
  Flame,
} from "lucide-react";
import { getCurrentUser } from "@/lib/api-client";

interface DockItem {
  id: string;
  label: string;
  badge?: string;
  icon: React.ElementType;
  href: string;
  isSpecial?: boolean;
}

export function SpotlightDock() {
  const [user, setUser] = useState<{ id: number; name: string; email: string; role?: string } | null>(null);
  const [activeId, setActiveId] = useState("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [spotlightX, setSpotlightX] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Listen to user auth state from localStorage
  useEffect(() => {
    setUser(getCurrentUser());
    const handleStorage = () => setUser(getCurrentUser());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const dockItems: DockItem[] = [
    {
      id: "profile",
      label: user ? user.name : "Masuk",
      badge: undefined,
      icon: User,
      href: user ? "/profile" : "/login",
    },
    {
      id: "home",
      label: "Beranda",
      icon: Home,
      href: "/",
    },
    {
      id: "orders",
      label: "Pesanan",
      icon: Package,
      href: user ? "/cart" : "/login",
    },
    {
      id: "kitchen",
      label: "Dapur",
      icon: Utensils,
      href: "/products?category=dapur-memasak",
    },
    {
      id: "electronics",
      label: "Elektronik",
      icon: Zap,
      href: "/products?category=elektronik-rumah",
    },
    {
      id: "cleaning",
      label: "Kebersihan",
      icon: Sparkles,
      href: "/products?category=kebersihan-rumah",
    },
    {
      id: "flash",
      label: "Flash Deal",
      icon: Flame,
      href: "/products",
      isSpecial: true,
    },
  ];

  // Target item is either the currently hovered item, or the active item
  const currentTargetId = hoveredId || activeId;

  // Update spotlight position smoothly based on target item
  useEffect(() => {
    const targetEl = itemRefs.current.get(currentTargetId);
    const container = containerRef.current;
    if (targetEl && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const centerPos = targetRect.left - containerRect.left + targetRect.width / 2;
      setSpotlightX(centerPos);
    }
  }, [currentTargetId]);

  // Handle continuous smooth mouse movement across the dock
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const cursorX = e.clientX;

    // Find the closest item to the cursor for smooth snapping
    let closestId = currentTargetId;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const dist = Math.abs(cursorX - itemCenterX);
      if (dist < minDistance) {
        minDistance = dist;
        closestId = id;
      }
    });

    if (closestId !== hoveredId) {
      setHoveredId(closestId);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredId(null);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#002E22] border-b border-brand-700/60 shadow-md select-none overflow-hidden transition-colors"
    >
      {/* Spotlight Effect (Top Light Cap + Conical Beam) spanning full width */}
      {spotlightX !== null && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
          style={{
            transform: `translateX(${spotlightX}px)`,
          }}
        >
          {/* 1. Top Glowing White Pill Cap */}
          <div
            className="absolute top-0 left-0 -translate-x-1/2 w-14 h-[3.5px] bg-white rounded-full shadow-[0_0_12px_#ffffff,0_0_24px_rgba(184,213,205,0.95)]"
          />

          {/* 2. Conical Light Beam (Lampu Sorot Menyorot ke Bawah) */}
          <div
            className="absolute top-0 left-0 -translate-x-1/2 w-28 h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(143,220,193,0.18) 50%, rgba(0,46,34,0) 100%)",
              clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
            }}
          />

          {/* 3. Soft Ambient Radial Glow at Base */}
          <div
            className="absolute bottom-1 left-0 -translate-x-1/2 w-20 h-6 bg-mint-300/25 rounded-full blur-md"
          />
        </div>
      )}

      {/* Full-width Inner Container without radius */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isTarget = currentTargetId === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveId(item.id)}
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el);
                else itemRefs.current.delete(item.id);
              }}
              className={`relative z-20 flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-semibold transition-all duration-200 group cursor-pointer shrink-0 ${
                isTarget
                  ? "text-white"
                  : "text-mint-100/70 hover:text-white"
              }`}
            >
              {/* Icon with Glowing / Illuminated Effect */}
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isTarget
                    ? "scale-115 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                    : "text-mint-100/70 group-hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-coral-400 ring-2 ring-[#002E22]" />
                )}
              </div>

              {/* Label text */}
              <span
                className={`tracking-tight transition-colors duration-200 ${
                  isTarget
                    ? "text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    : "text-mint-100/80 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>

              {/* Special Highlight for Flash Deal */}
              {item.isSpecial && (
                <span className="w-1.5 h-1.5 rounded-full bg-sun-400 animate-pulse ml-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
