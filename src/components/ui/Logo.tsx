"use client";

import Link from "next/link";

// ── Props del componente Logo ──
interface LogoProps {
  /** Variante de tamaño: 'navbar' | 'mobile' | 'footer' | 'compact' */
  variant?: "navbar" | "mobile" | "footer" | "compact";
  /** ¿El logo es clickeable? (default: true) */
  clickable?: boolean;
  /** Clases adicionales para el contenedor principal */
  className?: string;
  /** Callback al hacer click (ej. cerrar menú móvil) */
  onClick?: () => void;
}

// ── Mapa de tamaños por variante ──
const VARIANT_SIZES = {
  navbar: {
    icon: "h-10 md:h-12 w-auto",
    text: "text-xl md:text-2xl",
    tagline: "text-[8px] md:text-[9px]",
    gap: "gap-3",
  },
  mobile: {
    icon: "h-8 w-auto",
    text: "text-lg",
    tagline: "text-[7px]",
    gap: "gap-2.5",
  },
  footer: {
    icon: "h-10 md:h-12 w-auto",
    text: "text-xl md:text-2xl",
    tagline: "text-[8px] md:text-[9px]",
    gap: "gap-3",
  },
  compact: {
    icon: "h-8 w-auto",
    text: "text-base",
    tagline: "text-[7px]",
    gap: "gap-2.5",
  },
} as const;

// ── Componente Logo reutilizable ──
export function Logo({
  variant = "navbar",
  clickable = true,
  className = "",
  onClick,
}: LogoProps) {
  const sizes = VARIANT_SIZES[variant];

  const logoContent = (
    <div className={`flex items-center ${sizes.gap} ${className}`}>
      {/* IMAGEN: Mantiene su proporción sin deformarse */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/isotipo-camaleon.svg"
        className={`${sizes.icon} object-contain shrink-0`}
        alt="Sematelmed Logo"
        draggable={false}
      />
      {/* TEXTO: Ambos bordes alineados exactamente */}
      <div className="inline-flex flex-col items-start">
        <span
          className={`${sizes.text} font-bold text-white tracking-wide leading-none`}
          style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}
        >Sematelmed</span>
        {/* Eslogan: w-full = mismo ancho que Sematelmed, palabras distribuidas de borde a borde */}
        <span
          className={`${sizes.tagline} font-medium text-white/60 uppercase leading-none w-full flex justify-between`}
          style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", marginTop: "2px" }}
          aria-label="Siempre a la vanguardia"
        ><span>SIEMPRE</span><span>A</span><span>LA</span><span>VANGUARDIA</span></span>
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link
        href="/"
        onClick={onClick}
        aria-label="Sematelmed — Siempre a la vanguardia"
        className="inline-flex items-center"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

export default Logo;
