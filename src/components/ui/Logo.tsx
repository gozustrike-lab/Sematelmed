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
    icon: "h-[42px] md:h-[54px] w-auto",
    text: "text-[26px] md:text-[30px]",
    tagline: "text-[9px] md:text-[10.5px]",
    taglineTracking: "tracking-[0.22em] md:tracking-[0.26em]",
    gap: "gap-2.5 md:gap-3",
  },
  mobile: {
    icon: "h-8 w-auto",
    text: "text-[22px]",
    tagline: "text-[8px]",
    taglineTracking: "tracking-[0.2em]",
    gap: "gap-2",
  },
  footer: {
    icon: "h-10 md:h-12 w-auto",
    text: "text-[24px] md:text-[26px]",
    tagline: "text-[9px] md:text-[10px]",
    taglineTracking: "tracking-[0.24em] md:tracking-[0.26em]",
    gap: "gap-2.5",
  },
  compact: {
    icon: "h-8 w-auto",
    text: "text-[20px]",
    tagline: "text-[7.5px]",
    taglineTracking: "tracking-[0.2em]",
    gap: "gap-2",
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
    <div className={`flex items-center shrink-0 ${sizes.gap} ${className}`}>
      {/* ── Isotipo: Camaleón estilizado ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/isotipo-camaleon.svg"
        alt=""
        aria-hidden="true"
        className={`${sizes.icon} object-contain block flex-shrink-0`}
        draggable={false}
      />

      {/* ── Bloque de texto: Nombre + Eslogan ── */}
      <div className="flex flex-col w-full min-w-0">
        {/* Nombre "Sematelmed" — tipografía bold nativa */}
        <span
          className={`${sizes.text} font-bold leading-none text-white whitespace-nowrap`}
          style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}
        >
          Sematelmed
        </span>

        {/* Eslogan — texto nativo con letter-spacing uniforme */}
        <span
          className={`${sizes.tagline} font-semibold leading-none text-white/70 uppercase whitespace-nowrap ${sizes.taglineTracking} mt-[3px]`}
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
