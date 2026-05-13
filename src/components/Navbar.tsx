"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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

const menuVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.06, delayChildren: 0.15, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.2, ease: "easeIn" } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLinkClick = () => { setMobileOpen(false); };

  const headerBg = scrolled ? "shadow-lg shadow-black/20 border-b border-white/10" : "";
  const headerGradient = scrolled
    ? "bg-gradient-to-r from-[#4A2CB3] via-[#1D8A99] to-[#1DBD6B]"
    : "bg-gradient-to-r from-[#4A2CB3]/80 via-[#1D8A99]/80 to-[#1DBD6B]/80 backdrop-blur-md";

  const navLinkBase = "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300";
  const navLinkStyle = scrolled ? "text-white/80 hover:text-white hover:bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10";
  const navLinkActive = scrolled ? "text-white bg-white/15" : "text-white bg-white/15";
  const mobileBtnStyle = scrolled ? "text-white hover:text-white/80 hover:bg-white/10" : "text-white hover:text-white/80 hover:bg-white/10";
  const whatsappBtnStyle = scrolled
    ? "bg-white text-[#4A2CB3] font-semibold shadow-lg shadow-black/10 border-2 border-white/80 hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5"
    : "bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-semibold border-2 border-white/40 shadow-lg transition-all duration-300 hover:-translate-y-0.5";

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${headerGradient} ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center shrink-0" style={{ maxWidth: '260px' }} onClick={handleLinkClick} aria-label="Sematelmed">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-sematelmed.svg" alt="Sematelmed Logo" width={260} height={40}
              className="h-10 md:h-[60px] w-auto object-contain transition-all duration-300 group-hover:scale-105"
              style={{ maxWidth: '100%', height: 'auto' }} draggable={false} />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (<Link key={link.href} href={link.href} className={`${navLinkBase} ${isActive ? navLinkActive : navLinkStyle}`}>
                {link.label}
                {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-brand-orange transition-colors duration-300" />}
              </Link>);
            })}
          </nav>
          <div className="flex items-center gap-3">
            <a href={getWhatsAppURL("general")} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2">
              <Button className={whatsappBtnStyle}><MessageCircle className="w-4 h-4" />Contáctanos</Button>
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`md:hidden transition-colors duration-300 ${mobileBtnStyle}`} aria-label="Abrir menú de navegación">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-gradient-to-b from-[#4A2CB3] via-[#1D8A99] to-[#1DBD6B] p-0 [&>button]:hidden">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/15 shrink-0">
                    <Link href="/" onClick={handleLinkClick} aria-label="Sematelmed">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/logo-sematelmed.svg" alt="Sematelmed Logo" width={200} height={31} className="h-8 w-auto object-contain" draggable={false} />
                    </Link>
                    <button onClick={() => setMobileOpen(false)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:text-white transition-all duration-200" aria-label="Cerrar menú">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <motion.nav className="flex flex-col gap-2 px-4 pt-6 pb-4 shrink-0" variants={menuVariants} initial="hidden" animate={mobileOpen ? "visible" : "exit"}>
                    <AnimatePresence>{NAV_LINKS.map((link) => {
                      const isActive = pathname === link.href;
                      return (<motion.div key={link.href} variants={itemVariants}>
                        <Link href={link.href} onClick={handleLinkClick}
                          className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${isActive ? "text-white bg-white/20 shadow-lg shadow-white/10" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>
                          {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-orange rounded-r-full" />}
                          {link.label}
                        </Link>
                      </motion.div>);
                    })}</AnimatePresence>
                  </motion.nav>
                  <div className="mt-auto shrink-0">
                    <div className="mx-5 border-t border-white/15" />
                    <div className="mt-5 px-5 flex flex-col gap-4">
                      <a href={getWhatsAppURL("general")} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-semibold shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:shadow-[#25D366]/35 h-12 rounded-xl text-sm">
                          <MessageCircle className="w-4 h-4 mr-2.5" />Escribir por WhatsApp
                        </Button>
                      </a>
                      <a href="tel:+51976983333" onClick={handleLinkClick}>
                        <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold transition-all duration-300 h-12 rounded-xl text-sm">
                          <Phone className="w-4 h-4 mr-2.5" />Llamar al {COMPANY.phone}
                        </Button>
                      </a>
                    </div>
                    <div className="px-5 pt-5 pb-6">
                      <p className="text-xs text-white/50 leading-relaxed text-center">{COMPANY.address}</p>
                      <p className="text-[11px] text-white/30 text-center mt-2">{COMPANY.slogan}</p>
                    </div>
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
