// ============================================================
// SEMATELMED — Esquema de Producto (Sanity v3)
// Optimizado UX: descripciones, validaciones descriptivas, preview rico
// Basado en tipos de schema-master.ts (Fast Page Pro)
// ============================================================

import { defineField, defineType } from "sanity";
import {
  nameField,
  slugField,
  imageField,
  categoryField,
  descriptionField,
  priceField,
  specsField,
  PRODUCT_CATEGORIES,
  productPreviewPrepare,
} from "../lib/schema-master";

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",
  icon: () => "📦",

  fields: [
    // ── Sección: Información Básica ──
    nameField("Nombre del Producto"),

    slugField("name"),

    imageField("Imagen del Producto"),

    categoryField(PRODUCT_CATEGORIES),

    descriptionField("Descripción del Producto"),

    // ── Sección: Comercial ──
    priceField(),

    defineField({
      name: "stock",
      title: "Stock Disponible",
      description:
        "Cantidad de unidades disponibles. Si es 0, se mostrará como 'Agotado' en la tienda.",
      type: "number",
      initialValue: 0,
      validation: (Rule) =>
        Rule.min(0)
          .integer()
          .error("El stock debe ser un número entero mayor o igual a 0."),
    }),

    specsField(),

    // ── Sección: Visualización ──
    defineField({
      name: "featured",
      title: "Producto Destacado",
      description:
        'Activa esta opción para que el producto aparezca en la sección "Populares" de la página principal.',
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Orden de Aparición",
      description:
        "Define la posición del producto en la tienda. Menor número = aparece primero.",
      type: "number",
      initialValue: 0,
      validation: (Rule) =>
        Rule.integer().error("El orden debe ser un número entero."),
    }),
  ],

  // ── Preview en lista de documentos ──
  preview: {
    select: {
      title: "name",
      category: "category",
      image: "image",
      price: "price",
      featured: "featured",
    },
    prepare: productPreviewPrepare,
  },
});
