import Link from "next/link";
import { Phone, MapPin, Mail, Facebook, ExternalLink } from "lucide-react";
import { COMPANY, SOCIAL_LINKS, SERVICES } from "@/constants/data";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* Wave separator */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg
          className="w-full h-12 md:h-16"
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 32C240 64 480 0 720 32C960 64 1200 0 1440 32V64H0V32Z"
            className="fill-brand-dark"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center shadow-lg shadow-brand-blue/30">
                <span className="text-white font-extrabold text-lg">S</span>
              </div>
              <div>
                <p className="text-xl font-extrabold text-white leading-none">
                  Semat<span className="text-brand-orange">elmed</span>
                </p>
                <p className="text-[10px] text-white/50 font-medium tracking-widest uppercase">
                  {COMPANY.slogan}
                </p>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mt-3">
              {COMPANY.description}
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-orange flex items-center justify-center transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-4">
              Servicios
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href="/tienda"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-blue" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-4">
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
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-blue" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {COMPANY.name}. Todos los derechos reservados. Ilo, Moquegua — Perú.
          </p>
          <p className="text-xs text-white/30">
            Diseñado con dedicación para la comunidad ilocana.
          </p>
        </div>
      </div>
    </footer>
  );
}
