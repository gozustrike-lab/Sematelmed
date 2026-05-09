// ============================================================
// SEMATELMED — Esquema de Configuración del Sitio (Sanity v3)
// Singleton: Misión, Visión, Dirección, WhatsApp, Contacto
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
  singleton: true,

  fields: [
    // ── Misión ──
    defineField({
      name: "mission",
      title: "Misión",
      type: "text",
      validation: (Rule) => Rule.required().max(500),
    }),

    // ── Visión ──
    defineField({
      name: "vision",
      title: "Visión",
      type: "text",
      validation: (Rule) => Rule.required().max(500),
    }),

    // ── Dirección ──
    defineField({
      name: "address",
      title: "Dirección",
      type: "string",
      validation: (Rule) => Rule.required().max(150),
    }),

    // ── Teléfono ──
    defineField({
      name: "phone",
      title: "Teléfono",
      type: "string",
      validation: (Rule) => Rule.required().max(20),
    }),

    // ── WhatsApp ──
    defineField({
      name: "whatsapp",
      title: "WhatsApp (número)",
      type: "string",
      validation: (Rule) => Rule.required().max(15),
    }),

    // ── Email ──
    defineField({
      name: "email",
      title: "Correo Electrónico",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // ── Descripción general ──
    defineField({
      name: "description",
      title: "Descripción General",
      type: "text",
    }),

    // ── Facebook ──
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "string",
    }),

    // ── TikTok ──
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "string",
    }),

    // ── Maps Latitud ──
    defineField({
      name: "mapLatitude",
      title: "Latitud",
      type: "number",
    }),

    // ── Maps Longitud ──
    defineField({
      name: "mapLongitude",
      title: "Longitud",
      type: "number",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Configuración del Sitio",
        subtitle: "Misión, Visión, Contacto y Redes Sociales",
      };
    },
  },
});
