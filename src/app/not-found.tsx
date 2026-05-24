"use client";

import Link from "next/link";
import { Home, Search, HeadphonesIcon } from "lucide-react";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Meteors } from "@/components/ui/meteors";
import { Particles } from "@/components/ui/particles";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Logo } from "@/components/ui/Logo";
import { useRef } from "react";

/* ── Número animado 404 con efecto glitch ── */
function GlitchNumber({ children }: { children: string }) {
  return (
    <motion.span
      className="relative inline-block select-none"
      initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Capa de glitch principal */}
      <span className="relative z-10 text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black leading-none tracking-tighter bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">
        {children}
      </span>
      {/* Capa de glitch roja */}
      <span
        className="absolute inset-0 text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black leading-none tracking-tighter text-brand-orange/40 blur-[1px] animate-pulse"
        style={{ clipPath: "inset(20% 0 60% 0)" }}
        aria-hidden="true"
      >
        {children}
      </span>
      {/* Capa de glitch verde */}
      <span
        className="absolute inset-0 text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black leading-none tracking-tighter text-brand-blue-light/40 blur-[1px]"
        style={{ clipPath: "inset(60% 0 10% 0)", animationDelay: "0.15s" }}
        aria-hidden="true"
      >
        {children}
      </span>
    </motion.span>
  );
}

/* ── Orbe de fondo animado ── */
function FloatingOrb({
  color,
  size,
  position,
  delay,
}: {
  color: string;
  size: string;
  position: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${size} ${position}`}
      style={{ background: color }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 20, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.15, 0.25, 0.1, 0.2, 0.15],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ── Opciones de navegación rapida ── */
const NAV_OPTIONS = [
  { label: "Inicio", href: "/", icon: Home, description: "Volver al inicio" },
  {
    label: "Servicios",
    href: "/#servicios",
    icon: Search,
    description: "Explorar servicios",
  },
  {
    label: "Contacto",
    href: "/#contacto",
    icon: HeadphonesIcon,
    description: "Contáctanos",
  },
];

/* ── Componente principal 404 ── */
export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark"
    >
      {/* ── Capa de fondo: Partículas interactivas ── */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        staticity={40}
        ease={30}
        size={0.5}
        color="#1dbd6b"
      />

      {/* ── Orbes de gradiente flotantes ── */}
      <FloatingOrb
        color="#1dbd6b"
        size="w-[500px] h-[500px]"
        position="top-[-10%] left-[-10%]"
        delay={0}
      />
      <FloatingOrb
        color="#FF4D00"
        size="w-[400px] h-[400px]"
        position="bottom-[-5%] right-[-5%]"
        delay={3}
      />
      <FloatingOrb
        color="#2ed882"
        size="w-[300px] h-[300px]"
        position="top-[40%] right-[10%]"
        delay={6}
      />

      {/* ── Meteors decorativos ── */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <Meteors number={15} />
      </div>

      {/* ── Línea de grid decorativa sutil ── */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Contenido principal ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-4xl mx-auto">
        {/* Logo con animación */}
        <BlurFade delay={0.1} duration={0.6}>
          <div className="mb-6">
            <Logo variant="compact" clickable={false} />
          </div>
        </BlurFade>

        {/* Número 404 con glitch */}
        <BlurFade delay={0.2} duration={0.8}>
          <div className="relative mb-2">
            <GlitchNumber>404</GlitchNumber>
          </div>
        </BlurFade>

        {/* Título con sparkles */}
        <BlurFade delay={0.5} duration={0.6}>
          <div className="mt-2 mb-4">
            <SparklesText
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
              sparklesCount={8}
              colors={{
                first: "#1dbd6b",
                second: "#2ed882",
              }}
            >
              Página no encontrada
            </SparklesText>
          </div>
        </BlurFade>

        {/* Descripción */}
        <BlurFade delay={0.7} duration={0.6}>
          <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Lo sentimos, la página que buscas no existe o ha sido movida.
            <br />
            <span className="text-white/40 text-sm">
              Pero no te preocupes, te ayudamos a encontrar el camino.
            </span>
          </p>
        </BlurFade>

        {/* Opciones de navegación */}
        <BlurFade delay={0.9} duration={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {NAV_OPTIONS.map((option, index) => (
              <motion.div
                key={option.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.15, duration: 0.4 }}
              >
                <Link
                  href={option.href}
                  className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] hover:border-brand-blue/40 transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-blue/10 group-hover:bg-brand-blue/20 transition-colors duration-300">
                    <option.icon className="w-4 h-4 text-brand-blue-light" />
                  </div>
                  <div className="text-left">
                    <span className="text-white text-sm font-semibold block">
                      {option.label}
                    </span>
                    <span className="text-white/40 text-xs">
                      {option.description}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </BlurFade>

        {/* Botón CTA principal */}
        <BlurFade delay={1.2} duration={0.5}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <Link
              href="/"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-semibold text-base shadow-[0_0_30px_rgba(29,189,107,0.3)] hover:shadow-[0_0_50px_rgba(29,189,107,0.5)] transition-all duration-500 hover:scale-105 active:scale-[0.98]"
            >
              {/* Efecto shimmer sobre el botón */}
              <span className="absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute inset-[-200%] animate-gradient bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </span>
              <Home className="w-4 h-4 relative z-10 group-hover:-translate-x-0.5 transition-transform" />
              <span className="relative z-10">Volver al inicio</span>
            </Link>
          </motion.div>
        </BlurFade>

        {/* Código de referencia sutil */}
        <BlurFade delay={1.5} duration={0.5}>
          <motion.p
            className="mt-12 text-white/20 text-xs font-mono tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            ERROR 404 — RECURSO NO DISPONIBLE
          </motion.p>
        </BlurFade>
      </div>

      {/* ── Bordes decorativos de las esquinas ── */}
      <div className="absolute top-6 left-6 z-10 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-6 right-6 z-10 w-16 h-16 border-r-2 border-t-2 border-white/10 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-6 left-6 z-10 w-16 h-16 border-l-2 border-b-2 border-white/10 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-6 right-6 z-10 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-lg pointer-events-none" />

      {/* ── Barra de progreso animada inferior ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
