"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { COMPANY, SOCIAL_LINKS } from "@/constants/data";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/nosotros", label: "Nosotros" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {/* Logo real de Sematelmed */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo-nav.png"
              alt="Sematelmed — Siempre a la vanguardia"
              width={160}
              height={60}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
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

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2"
            >
              <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 transition-all duration-300 hover:-translate-y-0.5">
                <Phone className="w-4 h-4" />
                Contáctanos
              </Button>
            </a>

            {/* Mobile Sheet Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-brand-dark">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white p-0">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b border-brand-blue/10">
                    <Link href="/" className="flex items-center">
                      <Image
                        src="/logo-nav.png"
                        alt="Sematelmed"
                        width={130}
                        height={48}
                        className="h-9 w-auto object-contain"
                      />
                    </Link>
                    <Button variant="ghost" size="icon" className="text-brand-dark">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Mobile Links */}
                  <nav className="flex flex-col gap-1 p-4">
                    {NAV_LINKS.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                            isActive
                              ? "text-white bg-brand-blue shadow-lg shadow-brand-blue/25"
                              : "text-brand-dark hover:bg-brand-blue/5 hover:text-brand-blue"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Mobile CTA */}
                  <div className="mt-auto p-4 border-t border-brand-blue/10">
                    <a
                      href={SOCIAL_LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold shadow-lg shadow-brand-orange/25">
                        <Phone className="w-4 h-4 mr-2" />
                        Contáctanos
                      </Button>
                    </a>
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      {COMPANY.address}
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
