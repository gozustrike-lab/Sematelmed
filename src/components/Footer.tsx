import Link from "next/link";
import { Phone, MapPin, Mail, Facebook, MessageCircle, Monitor, Wifi, HeartPulse, Sun } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { COMPANY, SERVICES, getWhatsAppURL } from "@/constants/data";
import { Logo } from "@/components/ui/Logo";

// ── Iconos por servicio ──
const SERVICE_ICONS: Record<string, React.ElementType> = {
  computo: Monitor,
  telecomunicaciones: Wifi,
  "equipos-medicos": HeartPulse,
  "energia-solar": Sun,
};

export function Footer() {
  return (
    <footer className="bg-[#202C40] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Columna 1: Marca + Logo ── */}
          <div>
            <Logo variant="footer" />
            <p className="text-sm text-white/60 leading-relaxed mt-2 text-justify">
              Compromiso y vanguardia al servicio de Ilo. Más de una década llevando
              tecnología de calidad a hogares, consultorios y empresas del sur del Perú.
            </p>

            {/* Redes sociales — 5 iconos */}
            <div className="flex gap-3 mt-5">
              {/* Facebook */}
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#E4405F] flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#ff0050] flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1.01-.1z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#FF0000] flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>
            </div>

            {/* Botón WhatsApp destacado */}
            <a
              href={getWhatsAppURL("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5 gap-2">
                <MessageCircle className="w-4 h-4" />
                Escríbenos ahora
              </Button>
            </a>
          </div>

          {/* ── Columna 2: Servicios ── */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF4D00] mb-5">
              Servicios
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => {
                const Icon = SERVICE_ICONS[s.id] || Monitor;
                return (
                  <li key={s.id}>
                    <Link
                      href="/tienda"
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                    >
                      <Icon className="w-4 h-4 text-white/30 group-hover:text-[#1dbd6b] transition-colors duration-200" />
                      {s.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Columna 3: Contacto ── */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF4D00] mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1dbd6b] mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#1dbd6b] shrink-0" />
                <a
                  href="tel:+51976983333"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1dbd6b] shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {COMPANY.email}
                </a>
              </li>
            </ul>

            {/* Enlaces rápidos */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF4D00] mb-3">
                Enlaces
              </h4>
              <ul className="space-y-2">
                {[
                  { href: "/", label: "Inicio" },
                  { href: "/tienda", label: "Tienda" },
                  { href: "/nosotros", label: "Nosotros" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Columna 4: Mapa de ubicación ── */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF4D00] mb-5">
              Ubicación
            </h4>
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <iframe
                title="Ubicación de Sematelmed — Mercadillo de Ciudad Nueva, Ilo, Moquegua"
                src="https://maps.google.com/maps?q=-17.6152434,-71.3380836&z=19&t=&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-white/40">
                Tienda N°12 — Ilo, Moquegua
              </p>
              <a
                href="https://www.google.com/maps/place/Mercadillo+de+Ciudad+Nueva,+ilo/@-17.6152434,-71.3380836,20z/data=!4m12!1m5!3m4!2zMTfCsDM2JzU0LjQiUyA3McKwMjAnMTYuNCJX!8m2!3d-17.6151005!4d-71.3378738!3m5!1s0x91445b7ed90100b7:0xa675e56573d105a!8m2!3d-17.6151813!4d-71.3380989!16s%2Fg%2F11f15d68mc?hl=es-419"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white transition-colors duration-200"
              >
                <MapPin className="w-3.5 h-3.5" />
                Abrir en Maps
              </a>
            </div>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2024 {COMPANY.name} — {COMPANY.slogan}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/30">
            Ilo, Moquegua — Perú
          </p>
        </div>

        {/* ── Crédito de autoría (hardcoded, inmutable) ── */}
        <div className="mt-6 pt-4 text-center">
          <p className="text-xs" style={{ color: "#94a3b8" }}>
            Diseño y desarrollo web por{" "}
            <a
              href="https://fastpagepro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline underline-offset-2 transition-colors duration-200"
              style={{ color: "#94a3b8" }}
            >
              Fast Page Pro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
