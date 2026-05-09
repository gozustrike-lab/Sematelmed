import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, Facebook, ExternalLink, MessageCircle, Monitor, Wifi, HeartPulse, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, SERVICES, getWhatsAppURL } from "@/constants/data";

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
      {/* ── Wave separator ── */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg
          className="w-full h-12 md:h-16"
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 32C240 64 480 0 720 32C960 64 1200 0 1440 32V64H0V32Z"
            className="fill-[#202C40]"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Columna 1: Marca + Logo ── */}
          <div>
            <Link href="/" className="inline-flex items-center mb-4">
              <Image
                src="/logo-sematelmed.png"
                alt="Sematelmed — Siempre a la vanguardia"
                width={180}
                height={68}
                className="h-14 w-auto object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mt-2">
              Compromiso y vanguardia al servicio de Ilo. Más de una década llevando
              tecnología de calidad a hogares, consultorios y empresas del sur del Perú.
            </p>

            {/* Redes sociales */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://facebook.com/sematelmed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#4726BF] flex items-center justify-center transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@sematelmed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#FF4D00] flex items-center justify-center transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppURL("general")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
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
                      <Icon className="w-4 h-4 text-white/30 group-hover:text-[#4726BF] transition-colors duration-200" />
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
                <MapPin className="w-5 h-5 text-[#4726BF] mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#4726BF] shrink-0" />
                <a
                  href="tel:+51976983333"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#4726BF] shrink-0" />
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
