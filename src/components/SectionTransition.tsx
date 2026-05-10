"use client";

import { motion } from "framer-motion";

/**
 * SectionTransition — Divisor orgánico SVG entre secciones claras y oscuras.
 * Elimina cortes rígidos con gradientes suaves + curvas orgánicas.
 *
 * Variantes:
 *   "dark-to-light" — De sección oscura (#202C40) a clara (background)
 *   "light-to-dark" — De sección clara (background) a oscura (#202C40)
 *   "soft-merge"    — Fusión ultra suave entre secciones del mismo tono
 */

type TransitionVariant = "dark-to-light" | "light-to-dark" | "soft-merge";

interface SectionTransitionProps {
  variant?: TransitionVariant;
  /** Altura extra del divisor en px (default: 120) */
  height?: number;
  /** Color de inicio del gradiente (default: #202C40) */
  fromColor?: string;
  /** Color de fin del gradiente (default: var(--background)) */
  toColor?: string;
  /** Opacidad del toque de azul marca (default: 0.03) */
  brandGlowOpacity?: number;
}

export function SectionTransition({
  variant = "dark-to-light",
  height = 120,
  fromColor = "#202C40",
  toColor,
  brandGlowOpacity = 0.03,
}: SectionTransitionProps) {
  // Color destino según variante
  const resolvedToColor =
    toColor ||
    (variant === "light-to-dark" ? "#202C40" : "var(--background, #ffffff)");

  // La dirección del gradiente de fondo
  const gradientDir =
    variant === "dark-to-light"
      ? "to bottom"
      : variant === "light-to-dark"
        ? "to bottom"
        : "to bottom";

  // Path SVG orgánico — curva suave, no angular
  // Usa cubic bezier para una transición natural
  const svgPath =
    variant === "dark-to-light"
      ? "M0,0 C480," +
        Math.round(height * 0.55) +
        " 960," +
        Math.round(height * 0.15) +
        " 1440," +
        Math.round(height * 0.45) +
        " L1440," +
        height +
        " L0," +
        height +
        " Z"
      : variant === "light-to-dark"
        ? "M0," +
          Math.round(height * 0.5) +
          " C360," +
          Math.round(height * 0.1) +
          " 720," +
          Math.round(height * 0.65) +
          " 1080," +
          Math.round(height * 0.25) +
          " C1260," +
          Math.round(height * 0.12) +
          " 1440," +
          Math.round(height * 0.4) +
          " 1440,0 L0,0 Z"
        : "M0," +
          Math.round(height * 0.35) +
          " C480," +
          Math.round(height * 0.6) +
          " 960," +
          Math.round(height * 0.2) +
          " 1440," +
          Math.round(height * 0.4) +
          " L1440," +
          height +
          " L0," +
          height +
          " Z";

  // Colores de relleno SVG
  const svgFill =
    variant === "dark-to-light"
      ? "var(--background, #ffffff)" // La curva "entra" al fondo claro
      : variant === "light-to-dark"
        ? "#202C40" // La curva "entra" al fondo oscuro
        : "var(--background, #ffffff)";

  const svgBg =
    variant === "dark-to-light"
      ? "transparent" // El fondo es el oscuro (viene de arriba)
      : variant === "light-to-dark"
        ? "var(--background, #ffffff)" // El fondo es el claro (viene de arriba)
        : "var(--background, #ffffff)";

  return (
    <div
      className="relative w-full pointer-events-none select-none"
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      {/* ── Gradiente de fondo suave (desvanecimiento) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "dark-to-light"
              ? `linear-gradient(${gradientDir}, ${fromColor} 0%, ${fromColor}cc 30%, ${fromColor}66 60%, transparent 100%)`
              : variant === "light-to-dark"
                ? `linear-gradient(${gradientDir}, transparent 0%, #202C4044 30%, #202C40aa 60%, ${fromColor} 100%)`
                : `linear-gradient(${gradientDir}, transparent 0%, rgba(71,38,191,${brandGlowOpacity}) 50%, transparent 100%)`,
        }}
      />

      {/* ── Toque de marca (glow azul tenue) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(71,38,191," +
            brandGlowOpacity +
            ") 0%, transparent 70%)",
        }}
      />

      {/* ── SVG Wave orgánico ── */}
      <motion.svg
        viewBox={`0 0 1440 ${height}`}
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Fondo sólido de la sección destino */}
        <rect width="1440" height={height} fill={svgBg} />
        {/* Curva orgánica */}
        <path d={svgPath} fill={svgFill} />
      </motion.svg>
    </div>
  );
}
