"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Target,
  Eye,
  Heart,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionTransition } from "@/components/SectionTransition";
import {
  COMPANY,
  MISSION,
  VISION,
  VALUES,
  HISTORY,
  getWhatsAppURL,
} from "@/constants/data";

// ── Animaciones (scroll-reveal optimizado) ──
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── HEADER ──
function PageHeader() {
  return (
    <section className="relative bg-gradient-to-br from-brand-dark via-brand-dark-light to-brand-dark pt-20 md:pt-28 pb-12 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20 px-4 py-1.5 text-sm font-medium mb-5 backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5 mr-1.5" />
            Sobre Nosotros
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            Conoce <span className="text-brand-orange">Sematelmed</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto text-base md:text-lg">
            Más de {new Date().getFullYear() - COMPANY.since} años de compromiso con la tecnología
            y la salud en Ilo, Moquegua.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── MISSION & VISION ──
function MissionVisionSection() {
  return (
    <section className="py-10 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Mission */}
          <motion.div variants={fadeUp} custom={0}>
            <Card className="h-full border border-white/30 shadow-lg shadow-brand-blue/5 bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-blue/15 transition-all duration-500 hover:scale-[1.01]">
              <div className="h-2 bg-[#1dbd6b]" />
              <CardContent className="p-8 md:p-10">
                <div className="w-14 h-14 rounded-2xl bg-[#1dbd6b] flex items-center justify-center mb-6 shadow-lg shadow-brand-blue/20">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-4">
                  Nuestra Misión
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {MISSION}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div variants={fadeUp} custom={1}>
            <Card className="h-full border border-white/30 shadow-lg shadow-brand-orange/5 bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-orange/15 transition-all duration-500 hover:scale-[1.01]">
              <div className="h-2 bg-brand-orange" />
              <CardContent className="p-8 md:p-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-light flex items-center justify-center mb-6 shadow-lg shadow-brand-orange/20">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-4">
                  Nuestra Visión
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {VISION}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── HISTORY TIMELINE ──
function HistorySection() {
  return (
    <section className="py-10 md:py-24">
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
              Nuestra Historia
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark"
          >
            Un recorrido de{" "}
            <span className="text-brand-blue">compromiso</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
          >
            Cada etapa de nuestra historia refleja el compromiso con Ilo y su gente.
            Desde un pequeño local hasta ser referentes regionales.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative max-w-3xl mx-auto"
        >
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue via-brand-orange to-brand-blue" />

          {HISTORY.map((item, i) => (
            <motion.div
              key={item.year}
              variants={fadeUp}
              custom={i}
              className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-blue border-4 border-background shadow-lg shadow-brand-blue/30 z-10 top-1" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                <Card className="border border-white/30 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-lg hover:shadow-brand-blue/15 transition-all duration-500 rounded-xl hover:scale-[1.01]">
                  <CardContent className="p-5">
                    <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/15 text-xs font-bold mb-2">
                      {item.year}
                    </Badge>
                    <h3 className="text-lg font-extrabold text-brand-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── VALUES RECAP ──
function ValuesRecapSection() {
  return (
    <section className="py-10 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-4xl font-extrabold text-brand-dark"
          >
            Lo que nos <span className="text-brand-blue">define</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {VALUES.map((value, i) => (
            <motion.div key={value.id} variants={fadeUp} custom={i}>
              <div className="flex items-start gap-3 p-5 bg-white/65 backdrop-blur-xl rounded-xl border border-white/30 hover:border-brand-blue/30 shadow-sm hover:shadow-lg hover:shadow-brand-blue/15 transition-all duration-500 hover:scale-[1.02]">
                <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-brand-dark mb-1">{value.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── CONTACT ──
function ContactSection() {
  return (
    <section className="py-10 md:py-24 bg-gradient-to-br from-brand-dark via-brand-dark-light to-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-brand-blue rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-brand-orange rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20 px-4 py-1.5 text-sm font-medium mb-4 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Visítanos
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white"
          >
            Estamos para <span className="text-brand-orange">ti</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-white/60 max-w-xl mx-auto text-base md:text-lg"
          >
            Visítanos en nuestro local o escríbenos por WhatsApp.
            Te brindamos asesoría personalizada y sin compromiso.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto"
        >
          {/* Address */}
          <motion.div variants={fadeUp} custom={0}>
            <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 hover:scale-[1.02] transition-all duration-500">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Dirección</h3>
                <p className="text-xs text-white/60">{COMPANY.address}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Phone */}
          <motion.div variants={fadeUp} custom={1}>
            <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 hover:scale-[1.02] transition-all duration-500">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Teléfono</h3>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="text-xs text-white/60 hover:text-white transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp} custom={2}>
            <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 hover:scale-[1.02] transition-all duration-500">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Correo</h3>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-xs text-white/60 hover:text-white transition-colors"
                >
                  {COMPANY.email}
                </a>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hours */}
          <motion.div variants={fadeUp} custom={3}>
            <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 hover:scale-[1.02] transition-all duration-500">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Horario</h3>
                <p className="text-xs text-white/60">Lun – Sáb: 9:00 – 19:00</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mt-12"
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
        </motion.div>
      </div>
    </section>
  );
}

// ── PAGE ──
export default function NosotrosPage() {
  return (
    <>
      <PageHeader />
      {/* Transición: Header (oscuro) → Mission/Vision (claro) */}
      <SectionTransition variant="dark-to-light" height={80} />
      <MissionVisionSection />
      {/* Fusión suave entre secciones claras */}
      <SectionTransition variant="soft-merge" height={40} />
      <HistorySection />
      {/* Fusión suave entre secciones claras */}
      <SectionTransition variant="soft-merge" height={40} />
      <ValuesRecapSection />
      {/* Transición: Values Recap (claro) → Contact (oscuro) */}
      <SectionTransition variant="light-to-dark" height={80} />
      <ContactSection />
    </>
  );
}
