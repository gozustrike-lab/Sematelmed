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
    icon: "h-[42px] md:h-[54px] w-auto pb-[2px]",
    text: "text-[26px] md:text-[30px]",
    tagline: "text-[9px] md:text-[10.5px]",
    gap: "gap-2.5 md:gap-3",
    taglineTracking: "tracking-[0.18em] md:tracking-[0.22em]",
  },
  mobile: {
    icon: "h-8 w-auto pb-[1px]",
    text: "text-[22px]",
    tagline: "text-[8px]",
    gap: "gap-2",
    taglineTracking: "tracking-[0.15em]",
  },
  footer: {
    icon: "h-10 md:h-12 w-auto pb-[2px]",
    text: "text-[24px] md:text-[26px]",
    tagline: "text-[9px] md:text-[10px]",
    gap: "gap-2.5",
    taglineTracking: "tracking-[0.2em] md:tracking-[0.22em]",
  },
  compact: {
    icon: "h-8 w-auto pb-[1px]",
    text: "text-[20px]",
    tagline: "text-[7.5px]",
    gap: "gap-2",
    taglineTracking: "tracking-[0.15em]",
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

  // Texto del eslogan separado en caracteres para distribución uniforme
  const taglineChars = "SIEMPRE A LA VANGUARDIA".split("");

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

        {/* Eslogan — caracteres distribuidos uniformemente para alinear bordes */}
        <span
          className={`${sizes.tagline} font-medium leading-none text-white/65 uppercase w-full flex justify-between ${sizes.taglineTracking} mt-0.5`}
          aria-label="Siempre a la vanguardia"
          style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}
        >
          {taglineChars.map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{ width: `${100 / taglineChars.length}%`, textAlign: "center" }}
            >
              {char}
            </span>
          ))}
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
