"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { COMPANY, getWhatsAppURL } from "@/constants/data";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/nosotros", label: "Nosotros" },
];

// ── Variantes de animación del menú móvil ──
const menuVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll detection ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Cerrar menú al cambiar de ruta ──
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // ── Cerrar menú al presionar Escape ──
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-brand-dark/5 border-b border-brand-blue/10"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ── Logo transparente de Sematelmed ── */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={handleLinkClick}>
            <Image
              src="/logo-nav.png"
              alt="Sematelmed — Siempre a la vanguardia"
              width={160}
              height={60}
              className="h-10 md:h-12 w-auto object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-brand-blue bg-brand-blue/10"
                      : "text-brand-dark hover:text-brand-blue hover:bg-brand-blue/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-blue rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── CTA Desktop + Mobile Menu ── */}
          <div className="flex items-center gap-3">
            {/* Botón WhatsApp Desktop */}
            <a
              href={getWhatsAppURL("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2"
            >
              <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 transition-all duration-300 hover:-translate-y-0.5">
                <MessageCircle className="w-4 h-4" />
                Contáctanos
              </Button>
            </a>

            {/* ── Mobile Sheet (Controlado) ── */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-brand-dark hover:text-brand-blue hover:bg-brand-blue/5 transition-colors duration-200"
                  aria-label="Abrir menú de navegación"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] sm:w-[340px] bg-white p-0 [&>button]:hidden"
              >
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>

                <div className="flex flex-col h-full overflow-y-auto">
                  {/* ── Header: Logo + Botón Cerrar ── */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-brand-blue/10">
                    <Link href="/" onClick={handleLinkClick}>
                      <Image
                        src="/logo-nav.png"
                        alt="Sematelmed"
                        width={130}
                        height={48}
                        className="h-9 w-auto object-contain"
                      />
                    </Link>
                    {/* ÚNICO botón de cierre */}
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="w-10 h-10 rounded-full bg-brand-dark/5 hover:bg-brand-dark/10 flex items-center justify-center text-brand-dark hover:text-brand-blue transition-all duration-200"
                      aria-label="Cerrar menú"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* ── Nav Links con animación staggered ── */}
                  <motion.nav
                    className="flex flex-col gap-1 px-3 py-5"
                    variants={menuVariants}
                    initial="hidden"
                    animate={mobileOpen ? "visible" : "exit"}
                  >
                    <AnimatePresence>
                      {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                          <motion.div key={link.href} variants={itemVariants}>
                            <Link
                              href={link.href}
                              onClick={handleLinkClick}
                              className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                                isActive
                                  ? "text-white bg-brand-blue shadow-lg shadow-brand-blue/20"
                                  : "text-brand-dark hover:bg-brand-blue/5 hover:text-brand-blue"
                              }`}
                            >
                              {/* Indicador lateral activo */}
                              {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-orange rounded-r-full" />
                              )}
                              {link.label}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.nav>

                  {/* ── Separador ── */}
                  <div className="mx-5 border-t border-brand-blue/8" />

                  {/* ── CTA Buttons ── */}
                  <div className="mt-4 px-5 space-y-3">
                    {/* WhatsApp */}
                    <a
                      href={getWhatsAppURL("general")}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                    >
                      <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:shadow-[#25D366]/35 h-12 text-sm">
                        <MessageCircle className="w-4 h-4 mr-2.5" />
                        Escribir por WhatsApp
                      </Button>
                    </a>
                    {/* Llamar */}
                    <a href="tel:+51976983333" onClick={handleLinkClick}>
                      <Button
                        variant="outline"
                        className="w-full border-brand-orange/30 text-brand-orange hover:bg-brand-orange/5 hover:border-brand-orange/50 font-semibold transition-all duration-300 h-12 text-sm"
                      >
                        <Phone className="w-4 h-4 mr-2.5" />
                        Llamar al {COMPANY.phone}
                      </Button>
                    </a>
                  </div>

                  {/* ── Footer del menú ── */}
                  <div className="mt-auto px-5 py-5 border-t border-brand-blue/8">
                    <p className="text-xs text-muted-foreground leading-relaxed text-center">
                      {COMPANY.address}
                    </p>
                    <p className="text-[11px] text-muted-foreground/60 text-center mt-2">
                      {COMPANY.slogan}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
