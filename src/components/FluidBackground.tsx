"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FluidBackground — Fondo dinámico vanguardista.
 * Mesh gradients animados + textura de puntos con parallax al scroll.
 * Colores de marca: Verde #1dbd6b + toque Naranja #FF4D00 a opacidad baja.
 */
export function FluidBackground() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Factor de parallax normalizado
  const p = scrollY * 0.001;

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* ── Capa base: gradiente radial sutil ── */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 50% at 15% 35%, rgba(71,38,191,0.045) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 70% at 85% 15%, rgba(71,38,191,0.035) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 40% at 60% 90%, rgba(255,77,0,0.02) 0%, transparent 60%)",
            "linear-gradient(175deg, #f9f8fd 0%, #f6f4fb 40%, #faf8fe 100%)",
          ].join(", "),
        }}
      />

      {/* ── Orb 1: Azul eléctrico — esquina superior izquierda ── */}
      <div
        className="absolute animate-mesh-orb-1"
        style={{
          top: "-8%",
          left: "-12%",
          width: "50vw",
          height: "50vw",
          maxWidth: "750px",
          maxHeight: "750px",
        }}
      >
        <div
          className="w-full h-full rounded-full will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(71,38,191,0.09) 0%, rgba(71,38,191,0.02) 50%, transparent 70%)",
            filter: "blur(80px)",
            transform: `translateY(${p * -30}px)`,
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      {/* ── Orb 2: Azul claro — derecha superior ── */}
      <div
        className="absolute animate-mesh-orb-2"
        style={{
          top: "20%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          maxWidth: "600px",
          maxHeight: "600px",
        }}
      >
        <div
          className="w-full h-full rounded-full will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(92,63,204,0.065) 0%, rgba(92,63,204,0.01) 50%, transparent 70%)",
            filter: "blur(70px)",
            transform: `translateY(${p * -15}px)`,
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      {/* ── Orb 3: Naranja tenue — abajo centro ── */}
      <div
        className="absolute animate-mesh-orb-3"
        style={{
          bottom: "5%",
          left: "30%",
          width: "35vw",
          height: "35vw",
          maxWidth: "520px",
          maxHeight: "520px",
        }}
      >
        <div
          className="w-full h-full rounded-full will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(255,77,0,0.05) 0%, rgba(255,77,0,0.01) 50%, transparent 70%)",
            filter: "blur(65px)",
            transform: `translateY(${p * -22}px)`,
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      {/* ── Orb 4: Azul profundo — centro-derecha ── */}
      <div
        className="absolute animate-mesh-orb-4"
        style={{
          top: "50%",
          right: "15%",
          width: "28vw",
          height: "28vw",
          maxWidth: "420px",
          maxHeight: "420px",
        }}
      >
        <div
          className="w-full h-full rounded-full will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(71,38,191,0.055) 0%, transparent 65%)",
            filter: "blur(55px)",
            transform: `translateY(${p * -12}px)`,
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      {/* ── Textura de puntos (dot grid) con parallax ── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          opacity: 0.03,
          backgroundImage:
            "radial-gradient(circle, #1dbd6b 0.7px, transparent 0.7px)",
          backgroundSize: "26px 26px",
          transform: `translateY(${p * -50}px)`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}
