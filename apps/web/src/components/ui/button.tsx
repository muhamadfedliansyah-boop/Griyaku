import React from "react";
import Link from "next/link";

type ButtonVariant = "cta" | "primary" | "outline" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  href,
  type = "button",
  ...props
}: ButtonProps) {
  let variantStyles = "";

  switch (variant) {
    case "cta":
      variantStyles =
        "bg-sun-400 text-ink-900 font-bold hover:bg-sun-500 shadow-card hover:shadow-pop";
      break;
    case "primary":
      variantStyles =
        "bg-brand-500 text-white font-semibold hover:bg-brand-600 shadow-card";
      break;
    case "outline":
      variantStyles =
        "border-2 border-white/60 text-white font-medium hover:bg-white/10";
      break;
    case "ghost":
      variantStyles =
        "text-ink-700 hover:bg-black/5 font-medium";
      break;
    case "danger":
      variantStyles =
        "bg-coral-600 text-white font-semibold hover:bg-coral-700";
      break;
  }

  const combinedClass = `inline-flex items-center justify-center rounded-full px-6 py-3 transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      {...props}
    >
      {children}
    </button>
  );
}
