// ============================================================
// SEMATELMED — Esquema de Producto (Sanity.io)
// Catálogo de productos: Cómputo, Telecom, Médico, Energía Solar
// ============================================================

import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",
  icon: () => "📦",
  fields: [
    // ── Nombre del producto ──
    defineField({
      name: "name",
      title: "Nombre del Producto",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
      description: "Nombre comercial del producto (ej: Laptop HP 15.6\" Ryzen 5)",
    }),

    // ── Slug automático ──
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "Identificador único para la URL del producto",
    }),

    // ── Imagen del producto ──
    defineField({
      name: "image",
      title: "Imagen del Producto",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Imagen principal del producto. Se recomienda 800x600px mínimo.",
    }),

    // ── Categoría ──
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
      description: "Línea de servicio a la que pertenece el producto",
    }),

    // ── Descripción (Rich Text / Portable Text) ──
    defineField({
      name: "description",
      title: "Descripción",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Negrita", value: "strong" },
            { title: "Cursiva", value: "em" },
          ],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
              { title: "Subrayado", value: "underline" },
            ],
          },
        },
        {
          type: "list",
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Descripción detallada del producto con formato enriquecido",
    }),

    // ── Precio ──
    defineField({
      name: "price",
      title: "Precio",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
      description: 'Texto del precio (ej: "Desde S/ 2,499" o "Cotizar")',
    }),

    // ── Especificaciones técnicas ──
    defineField({
      name: "specs",
      title: "Especificaciones Técnicas",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Agregar especificación", value: "" },
        ],
      },
      description: "Lista de especificaciones técnicas del producto",
    }),

    // ── Stock ──
    defineField({
      name: "stock",
      title: "Stock Disponible",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).integer(),
      description: "Cantidad disponible en inventario. 0 = Agotado",
    }),

    // ── Destacado ──
    defineField({
      name: "featured",
      title: "Producto Destacado",
      type: "boolean",
      initialValue: false,
      description: "Marcar como destacado para mostrarlo en la sección principal del inicio",
    }),

    // ── Orden de aparición ──
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
      description: "Orden de aparición en el catálogo (menor = primero)",
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
      const categoryLabels: Record<string, string> = {
        computo: "💻 Cómputo",
        telecomunicaciones: "📡 Telecom",
        "equipos-medicos": "🏥 Médico",
        "energia-solar": "☀️ Solar",
      };
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: categoryLabels[category] || category,
        media: image,
      };
    },
  },

  orderings: [
    {
      title: "Orden personalizado",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Nombre A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Más recientes",
      name: "createdAtDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
});
