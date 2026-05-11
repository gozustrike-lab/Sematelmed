// ============================================================
// SEMATELMED — Esquema de Producto (Sanity v3) — Fast Page Pro
// Optimizado UX: fieldsets, validaciones, preview rico
// Categoría: reference dinámico (documento 'category')
// Galería: hasta 5 imágenes con hotspot
// Badge: Nuevo, Oferta, Destacado
// ============================================================

import { defineField, defineType } from "sanity";
import {
  nameField,
  slugField,
  imageField,
  descriptionField,
  priceField,
  specsField,
  productPreviewPrepare,
} from "../lib/schema-master";

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",
  icon: () => "📦",

  // ── Fieldsets: agrupación visual ──
  fieldsets: [
    {
      name: "basicInfo",
      title: "Información Básica",
      description: "Nombre, imagen principal, categoría y descripción.",
      options: { collapsible: false },
    },
    {
      name: "gallery",
      title: "Galería de Fotos",
      description: "Hasta 5 fotos adicionales del producto. Se muestran en el carrusel del modal.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "commerce",
      title: "Información Comercial",
      description: "Precio, stock y badge promocional.",
      options: { collapsible: false },
    },
    {
      name: "display",
      title: "Visualización",
      description: "Control de cómo se muestra el producto en la tienda.",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ── Fieldset: Información Básica ──
    nameField("Nombre del Producto"),

    slugField("name"),

    imageField("Imagen Principal", true),

    defineField({
      name: "category",
      title: "Categoría",
      fieldset: "basicInfo",
      description:
        "Vincula el producto a una categoría existente. Crea categorías desde el panel 'Categorías' en el Studio.",
      type: "reference",
      to: [{ type: "category" }],
      options: {
        disableNew: true,
      },
      validation: (Rule) =>
        Rule.required().error("Debes seleccionar una categoría para el producto."),
      preview: {
        select: {
          title: "category.name",
          subtitle: "category.description",
        },
      },
    }),

    descriptionField("Descripción del Producto"),

    // ── Fieldset: Galería de Fotos (hasta 5) ──
    defineField({
      name: "gallery",
      title: "Fotos Adicionales",
      fieldset: "gallery",
      description:
        "Agrega hasta 5 fotos adicionales del producto. Se muestran en el carrusel dentro del modal de detalle. La primera imagen es la principal.",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              asset: "asset",
              caption: "caption",
            },
          },
          fields: [
            {
              name: "caption",
              title: "Pie de foto",
              type: "string",
              description: "Texto opcional que describe la foto.",
              validation: (Rule: any) => Rule.max(60),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(5).error("Máximo 5 fotos en la galería."),
    }),

    // ── Fieldset: Información Comercial ──
    priceField(),

    defineField({
      name: "stock",
      title: "Stock Disponible",
      fieldset: "commerce",
      description:
        "Cantidad de unidades disponibles. Si es 0, se mostrará como 'Agotado' en la tienda.",
      type: "number",
      initialValue: 0,
      validation: (Rule) =>
        Rule.min(0)
          .integer()
          .error("El stock debe ser un número entero mayor o igual a 0."),
    }),

    defineField({
      name: "badge",
      title: "Etiqueta Promocional (Badge)",
      fieldset: "commerce",
      description:
        'Etiqueta visible sobre la imagen del producto en la tienda. Destaca promociones o novedades.',
      type: "string",
      options: {
        list: [
          { title: "Ninguna", value: "" },
          { title: "Nuevo", value: "Nuevo" },
          { title: "Oferta", value: "Oferta" },
          { title: "Destacado", value: "Destacado" },
          { title: "Últimas unidades", value: "Últimas unidades" },
          { title: "Más vendido", value: "Más vendido" },
        ],
        layout: "radio",
      },
      initialValue: "",
    }),

    specsField(),

    // ── Fieldset: Visualización ──
    defineField({
      name: "featured",
      title: "Producto Destacado",
      fieldset: "display",
      description:
        'Activa esta opción para que el producto aparezca en la sección "Populares" de la página principal.',
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Orden de Aparición",
      fieldset: "display",
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
      category: "category.name",
      image: "image",
      price: "price",
      featured: "featured",
      badge: "badge",
    },
    prepare({ title, category, image, price, featured, badge }) {
      const badgeIcon = badge === "Nuevo" ? "🆕" : badge === "Oferta" ? "🔥" : badge === "Destacado" ? "⭐" : "";
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${category || "Sin categoría"}  ·  ${price}${badge ? `  ·  ${badgeIcon} ${badge}` : ""}`,
        media: image,
      };
    },
  },
});
