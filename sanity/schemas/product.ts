// ============================================================
// SEMATELMED — Esquema de Producto (Sanity v3)
// Sin propiedades no soportadas — solo sintaxis válida
// ============================================================

import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",
  icon: () => "📦",

  fields: [
    // ── Nombre ──
    defineField({
      name: "name",
      title: "Nombre del Producto",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),

    // ── Slug ──
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // ── Imagen ──
    defineField({
      name: "image",
      title: "Imagen del Producto",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    // ── Categoría (string con lista de opciones) ──
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Cómputo", value: "computo" },
          { title: "Telecomunicaciones", value: "telecomunicaciones" },
          { title: "Equipos Médicos", value: "equipos-medicos" },
          { title: "Energía Solar", value: "energia-solar" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Descripción (array de bloques — Portable Text limpio) ──
    defineField({
      name: "description",
      title: "Descripción",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),

    // ── Precio ──
    defineField({
      name: "price",
      title: "Precio",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    }),

    // ── Especificaciones técnicas (array de strings) ──
    defineField({
      name: "specs",
      title: "Especificaciones Técnicas",
      type: "array",
      of: [{ type: "string" }],
    }),

    // ── Stock ──
    defineField({
      name: "stock",
      title: "Stock Disponible",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),

    // ── Destacado ──
    defineField({
      name: "featured",
      title: "Producto Destacado",
      type: "boolean",
      initialValue: false,
    }),

    // ── Orden ──
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: "name",
      category: "category",
      image: "image",
      featured: "featured",
    },
    prepare({ title, category, image, featured }) {
      const labels: Record<string, string> = {
        computo: "Cómputo",
        telecomunicaciones: "Telecomunicaciones",
        "equipos-medicos": "Equipos Médicos",
        "energia-solar": "Energía Solar",
      };
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: labels[category] || category,
        media: image,
      };
    },
  },
});
