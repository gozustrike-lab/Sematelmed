// ============================================================
// SEMATELMED — Esquema de Configuración del Sitio (Sanity.io)
// Misión, Visión, Dirección, WhatsApp, Datos de contacto
// ============================================================
// NOTA: El crédito "Diseño y desarrollo web por Fast Page Pro"
// está HARDCODED en el Footer y NO es editable desde el CMS.
// ============================================================

import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configuración del Sitio",
  type: "document",
  icon: () => "⚙️",

  // Solo un documento de configuración
  singleton: true,

  fields: [
    // ── Misión ──
    defineField({
      name: "mission",
      title: "Misión",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
      description: "La misión de la empresa. Se muestra en la página Nosotros.",
    }),

    // ── Visión ──
    defineField({
      name: "vision",
      title: "Visión",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
      description: "La visión de la empresa. Se muestra en la página Nosotros.",
    }),

    // ── Dirección ──
    defineField({
      name: "address",
      title: "Dirección",
      type: "string",
      validation: (Rule) => Rule.required().max(150),
      description: "Dirección física de la tienda (ej: Mercadillo de Ciudad Nueva, Tienda N°12 – ILO)",
    }),

    // ── Teléfono ──
    defineField({
      name: "phone",
      title: "Teléfono",
      type: "string",
      validation: (Rule) => Rule.required().max(20),
      description: "Número de teléfono visible (ej: +51 976 983 333)",
    }),

    // ── WhatsApp (número limpio para enlace wa.me) ──
    defineField({
      name: "whatsapp",
      title: "WhatsApp (número)",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[0-9]+$/, "Solo dígitos, sin espacios ni guiones")
          .max(15),
      description: "Número de WhatsApp sin formato (ej: 51976983333) para generar enlaces wa.me",
    }),

    // ── Email ──
    defineField({
      name: "email",
      title: "Correo Electrónico",
      type: "string",
      validation: (Rule) => Rule.required().email(),
      description: "Correo de contacto comercial (ej: ventas@sematelmed.com)",
    }),

    // ── Descripción general ──
    defineField({
      name: "description",
      title: "Descripción General",
      type: "text",
      rows: 3,
      description: "Descripción breve de la empresa para SEO y presentación general",
    }),

    // ── Facebook URL ──
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      description: "Enlace completo a la página de Facebook",
    }),

    // ── TikTok URL ──
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
      description: "Enlace completo al perfil de TikTok",
    }),

    // ── Google Maps Coordenadas ──
    defineField({
      name: "mapLatitude",
      title: "Latitud (Google Maps)",
      type: "number",
      description: "Latitud para el iframe de Google Maps (ej: -17.6152434)",
    }),
    defineField({
      name: "mapLongitude",
      title: "Longitud (Google Maps)",
      type: "number",
      description: "Longitud para el iframe de Google Maps (ej: -71.3380836)",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "⚙️ Configuración del Sitio",
        subtitle: "Misión, Visión, Contacto y Redes Sociales",
      };
    },
  },
});
