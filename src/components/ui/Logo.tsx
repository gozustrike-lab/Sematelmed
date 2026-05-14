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
    tagline: "text-[10px] md:text-[11px]",
    gap: "gap-3",
  },
  mobile: {
    icon: "h-8 w-auto",
    text: "text-lg",
    tagline: "text-[9px]",
    gap: "gap-2.5",
  },
  footer: {
    icon: "h-10 md:h-12 w-auto",
    text: "text-xl md:text-2xl",
    tagline: "text-[10px] md:text-[11px]",
    gap: "gap-3",
  },
  compact: {
    icon: "h-8 w-auto",
    text: "text-base",
    tagline: "text-[9px]",
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
    /* CONTENEDOR PADRE: Alinea el icono y el texto en el mismo eje horizontal */
    <div className={`flex items-center ${sizes.gap} ${className}`}>
      {/* IMAGEN: Mantiene su proporción sin deformarse */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/isotipo-camaleon.svg"
        className={`${sizes.icon} object-contain shrink-0`}
        alt="Sematelmed Logo"
        draggable={false}
      />

      {/* TEXTO: Fuerza la alineación estricta hacia la izquierda */}
      <div className="flex flex-col items-start justify-center">
        <span
          className={`${sizes.text} font-bold text-white tracking-wide leading-none`}
          style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}
        >
          Sematelmed
        </span>
        <span
          className={`${sizes.tagline} font-semibold text-slate-300 tracking-wider uppercase mt-1 leading-none block whitespace-nowrap`}
          aria-label="Siempre a la vanguardia"
          style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}
        >
          SIEMPRE A LA VANGUARDIA
        </span>
      </div>
    </div>
  );

  // Si es clickeable, envolver en Link; si no, renderizar directamente
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
