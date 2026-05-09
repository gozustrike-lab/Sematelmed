"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor,
  Wifi,
  HeartPulse,
  Sun,
  MessageCircle,
  ArrowRight,
  Shield,
  Lightbulb,
  Handshake,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroSlider } from "@/components/HeroSlider";
import { SectionTransition } from "@/components/SectionTransition";
import {
  COMPANY,
  SERVICES,
  VALUES,
  PRODUCTS,
  CATEGORY_LABELS,
  SOCIAL_LINKS,
  getWhatsAppURL,
} from "@/constants/data";

// ── Icon mapper ──
const ICON_MAP: Record<string, React.ElementType> = {
  monitor: Monitor,
  wifi: Wifi,
  "heart-pulse": HeartPulse,
  sun: Sun,
  chameleon: Eye,
  lightbulb: Lightbulb,
  handshake: Handshake,
  shield: Shield,
};

// ── Animaciones optimizadas (scroll-reveal) ──
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// ── SERVICES ──
function ServicesSection() {
  return (
    <section id="seccion-servicios" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 hover:bg-brand-blue/15 px-4 py-1.5 text-sm font-medium mb-4">
              Nuestros Servicios
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark"
          >
            Soluciones que se{" "}
            <span className="text-brand-blue">adaptan</span> a ti
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
          >
            Como el camaleón, cada solución se transforma para cubrir exactamente lo que necesitas.
            Descubre nuestras cuatro líneas principales de servicio.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Monitor;
            return (
              <motion.div key={service.id} variants={fadeUp} custom={i}>
                <Card className="group h-full border border-white/40 shadow-sm hover:shadow-xl hover:shadow-brand-blue/15 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 flex items-center justify-center mb-5 group-hover:bg-[#4726BF] transition-all duration-500">
                      <Icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl font-extrabold text-brand-dark mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((f, fi) => (
                        <li
                          key={fi}
                          className="flex items-center gap-2 text-sm text-brand-dark/70"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/tienda" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-dark transition-colors duration-200 group/link">
                      Explorar
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ── FEATURED PRODUCTS ──
function FeaturedProductsSection() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20 hover:bg-brand-orange/15 px-4 py-1.5 text-sm font-medium mb-4">
              Destacados
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark"
          >
            Productos{" "}
            <span className="text-brand-orange">populares</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
          >
            Los productos más solicitados por nuestros clientes. Calidad garantizada y soporte técnico incluido.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featured.map((product, i) => (
            <motion.div key={product.id} variants={fadeUp} custom={i}>
              <Card className="group h-full border border-white/40 hover:border-brand-blue/30 shadow-sm hover:shadow-lg hover:shadow-brand-blue/15 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] bg-white/75 backdrop-blur-xl rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/15 text-xs font-medium mb-3">
                    {CATEGORY_LABELS[product.category]}
                  </Badge>
                  <h3 className="text-base font-bold text-brand-dark mb-2 line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-extrabold text-brand-blue">
                      {product.price}
                    </span>
                    <a
                      href={getWhatsAppURL("producto", product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-xs font-semibold shadow-md shadow-green-600/20 hover:shadow-green-600/40 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 mr-1" />
                        Cotizar
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mt-10"
        >
          <Link href="/tienda">
            <Button
              variant="outline"
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold px-8 py-6 transition-all duration-300 hover:-translate-y-0.5"
            >
              Ver todo el catálogo
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── VALUES ──
function ValuesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 hover:bg-brand-blue/15 px-4 py-1.5 text-sm font-medium mb-4">
              Nuestros Valores
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark"
          >
            El espíritu del{" "}
            <span className="text-brand-blue">Camaleón</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
          >
            Como el camaleón, nos adaptamos con agilidad y precisión a cada entorno,
            transformando desafíos en soluciones innovadoras.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {VALUES.map((value, i) => {
            const Icon = ICON_MAP[value.icon] || Shield;
            return (
              <motion.div key={value.id} variants={fadeUp} custom={i}>
                <div className="relative group h-full bg-white/65 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/30 hover:border-brand-blue/30 shadow-sm hover:shadow-xl hover:shadow-brand-blue/15 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-[#4726BF] flex items-center justify-center mb-5 shadow-lg shadow-brand-blue/20 group-hover:shadow-brand-blue/40 transition-all duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold text-brand-dark mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ── CTA SECTION ──
function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-brand-dark via-brand-dark-light to-brand-dark relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-brand-blue rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-brand-orange rounded-full blur-[150px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
        >
          ¿Listo para dar el{" "}
          <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">
            salto tecnológico
          </span>
          ?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          className="mt-5 text-white/60 max-w-xl mx-auto text-base md:text-lg"
        >
          Contáctanos por WhatsApp y recibe asesoría personalizada sin compromiso.
          Estamos en Ilo, listos para ayudarte.
        </motion.p>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <a href={getWhatsAppURL("general")} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold shadow-xl shadow-green-600/30 hover:shadow-green-600/50 transition-all duration-300 hover:-translate-y-0.5 px-8 py-6 text-base"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Escribir por WhatsApp
            </Button>
          </a>
          <Link href="/nosotros">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-base bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              Conócenos más
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── HOME PAGE ──
export default function HomePage() {
  return (
    <>
      <HeroSlider />
      {/* Transición: Hero (oscuro) → Services (claro) */}
      <SectionTransition variant="dark-to-light" height={140} />
      <ServicesSection />
      {/* Fusión suave entre secciones claras */}
      <SectionTransition variant="soft-merge" height={80} />
      <FeaturedProductsSection />
      {/* Fusión suave entre secciones claras */}
      <SectionTransition variant="soft-merge" height={80} />
      <ValuesSection />
      {/* Transición: Values (claro) → CTA (oscuro) */}
      <SectionTransition variant="light-to-dark" height={140} />
      <CTASection />
    </>
  );
}
