"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPANY, getWhatsAppURL } from "@/constants/data";

// ── Tipado de cada slide ──
interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
}

// ── Slides del Hero ──
const SLIDES: Slide[] = [
  {
    id: 1,
    // Telecomunicaciones — fibra óptica / redes / data center
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80&auto=format&fit=crop",
    title: "Conectividad que Transforma",
    subtitle: "Líderes en Fibra Óptica y Redes de alta velocidad en Ilo.",
    badge: "Telecomunicaciones",
  },
  {
    id: 2,
    // Equipos médicos — monitor de signos vitales / tecnología
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1920&q=80&auto=format&fit=crop",
    title: "Tecnología para la Salud",
    subtitle: "Mantenimiento y equipamiento médico con precisión garantizada.",
    badge: "Equipos Médicos",
  },
  {
    id: 3,
    // Energía solar — paneles fotovoltaicos
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80&auto=format&fit=crop",
    title: "Energía del Futuro",
    subtitle: "Sistemas solares y respaldo UPS para la continuidad de tu empresa.",
    badge: "Energía Solar",
  },
];

// ── Duración del auto-play (ms) ──
const AUTOPLAY_MS = 5000;

// ── Variantes de animación del texto ──
const textVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: 40,
    x: direction > 0 ? 30 : -30,
  }),
  center: {
    opacity: 1,
    y: 0,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: -20,
    x: direction > 0 ? -30 : 30,
  }),
};

const textTransition = {
  duration: 0.7,
  ease: [0.25, 0.46, 0.45, 0.94],
};

// ── Sub-componente del indicador (punto) ──
function Dot({
  active,
  onClick,
  index,
}: {
  active: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`Ir al slide ${index + 1}`}
      className={`relative h-2.5 rounded-full transition-all duration-500 overflow-hidden ${
        active ? "w-8" : "w-2.5"
      }`}
    >
      <span className="absolute inset-0 bg-white/30 rounded-full" />
      {active && (
        <motion.span
          className="absolute inset-0 bg-white rounded-full"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
        />
      )}
    </button>
  );
}

// ── HERO SLIDER ──
export function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const total = SLIDES.length;
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play
  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = (prev + newDirection + total) % total;
        return [next, newDirection];
      });
    },
    [total],
  );

  // ── Función para reanudar el autoplay tras una pausa manual ──
  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  }, []);

  // ── Autoplay universal ──
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paginate, isPaused]);

  // ── Limpiar timer de reanudación al desmontar ──
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const currentSlide = SLIDES[page];

  return (
    <section
      className="relative w-full min-h-[85vh] overflow-hidden select-none"
      style={{ isolation: "isolate" }}
    >
      {/* ═══════════════════════════════════════════════════════════
          CAPA 1 — Imagen de fondo (z-0, completamente detrás)
          ═══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              className="object-cover object-center"
              priority={page === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CAPA 2 — Overlay sutil (gradiente, NO opaca la imagen)
          ═══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[1]">
        {/* Gradiente lateral: más oscuro a la izquierda para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#202C40]/75 via-[#202C40]/45 to-transparent" />
        {/* Gradiente inferior: sutil para los controles de navegación */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#202C40]/50 via-transparent to-[#4726BF]/5" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CAPA 3 — Contenido principal (z-10, centrado perfecto)
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex items-center justify-center"
        style={{ minHeight: "inherit" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-24">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={textTransition}
              >
                {/* Badge de categoría */}
                <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm mb-6">
                  {currentSlide.badge}
                </Badge>

                {/* Título principal */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-5 drop-shadow-lg">
                  {currentSlide.title}
                </h1>

                {/* Subtítulo */}
                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-lg leading-relaxed mb-4 drop-shadow-md">
                  {currentSlide.subtitle}
                </p>

                {/* Tagline de marca */}
                <p className="text-sm text-white/50 font-medium mb-8 drop-shadow-sm">
                  {COMPANY.slogan} — {COMPANY.name}, Ilo
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Botones (no se animan con el slide) */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link href="/tienda">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#FF4D00] hover:bg-[#CC3D00] text-white font-bold shadow-xl shadow-[#FF4D00]/30 hover:shadow-[#FF4D00]/50 transition-all duration-300 hover:-translate-y-0.5 px-8 py-6 text-base"
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a
                href={getWhatsAppURL("general")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-8 py-6 text-base bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:opacity-90"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CAPA 4 — Controles de navegación (z-20, abajo)
          ═══════════════════════════════════════════════════════════ */}
      <div className="absolute z-20 bottom-0 left-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-6 md:pb-8">
            {/* Dots / indicadores */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <Dot
                  key={i}
                  active={i === page}
                  onClick={() => {
                    setIsPaused(true);
                    scheduleResume();
                    setPage([i, i > page ? 1 : -1]);
                  }}
                  index={i}
                />
              ))}
            </div>

            {/* Flechas */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsPaused(true);
                  scheduleResume();
                  paginate(-1);
                }}
                aria-label="Slide anterior"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white hover:border-white/40 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setIsPaused(true);
                  scheduleResume();
                  paginate(1);
                }}
                aria-label="Slide siguiente"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white hover:border-white/40 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CAPA 5 — Wave separator (z-[5], entre contenido y controles)
          ═══════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-[5] pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-8 md:h-12"
        >
          <path
            d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
