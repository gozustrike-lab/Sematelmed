// ============================================================
// FAST PAGE PRO — Esquema de Categoría (Sanity v3)
// Documento independiente para categorías dinámicas.
// El cliente puede crear/eliminar categorías desde el Studio.
// Los productos se vinculan mediante un campo 'reference'.
// ============================================================

import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export default defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  icon: TagIcon,

  fields: [
    // ── Nombre ──
    defineField({
      name: "name",
      title: "Nombre de la Categoría",
      description:
        "Nombre visible en la tienda y filtros. Ejemplos: Cómputo, Telecomunicaciones, Equipos Médicos.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(50)
          .error("El nombre es obligatorio (máximo 50 caracteres)."),
    }),

    // ── Slug ──
    defineField({
      name: "slug",
      title: "URL amigable (slug)",
      description:
        "Identificador único para la URL. Se genera automáticamente desde el nombre.",
      type: "slug",
      options: {
        source: "name",
        maxLength: 60,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "")
            .slice(0, 60),
      },
      validation: (Rule) =>
        Rule.required().error("El slug es obligatorio."),
    }),

    // ── Descripción corta ──
    defineField({
      name: "description",
      title: "Descripción Corta",
      description:
        "Texto opcional que aparece al pasar el mouse sobre el filtro de categoría.",
      type: "string",
      rows: 2,
      validation: (Rule) => Rule.max(100).optional(),
    }),

    // ── Color de identificación ──
    defineField({
      name: "color",
      title: "Color de Categoría",
      description:
        "Color de acento para badges y filtros. Selecciona el que mejor represente la línea de servicio.",
      type: "string",
      options: {
        list: [
          { title: "Azul (Cómputo)", value: "blue" },
          { title: "Morado (Telecomunicaciones)", value: "purple" },
          { title: "Rojo (Equipos Médicos)", value: "red" },
          { title: "Ámbar (Energía Solar)", value: "amber" },
          { title: "Verde (General)", value: "green" },
          { title: "Gris (Otro)", value: "gray" },
        ],
        layout: "radio",
      },
      initialValue: "blue",
    }),

    // ── Icono ──
    defineField({
      name: "icon",
      title: "Icono",
      description: "Icono representativo de la categoría.",
      type: "string",
      options: {
        list: [
          { title: "Monitor (Cómputo)", value: "monitor" },
          { title: "WiFi (Telecomunicaciones)", value: "wifi" },
          { title: "Corazón/Pulso (Médico)", value: "heart-pulse" },
          { title: "Sol (Energía Solar)", value: "sun" },
          { title: "Paquete (General)", value: "package" },
          { title: "Estrella (Destacados)", value: "star" },
          { title: "Cog/Lámpara (Servicios)", value: "lamp" },
        ],
      },
      initialValue: "package",
    }),

    // ── Orden ──
    defineField({
      name: "order",
      title: "Orden de Aparición",
      description:
        "Posición en la lista de categorías. Menor número = aparece primero.",
      type: "number",
      initialValue: 0,
      validation: (Rule) =>
        Rule.integer().error("El orden debe ser un número entero."),
    }),
  ],

  // ── Preview ──
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      color: "color",
    },
    prepare({ title, subtitle, color }) {
      const colorMap: Record<string, string> = {
        blue: "#3B82F6",
        purple: "#8B5CF6",
        red: "#EF4444",
        amber: "#F59E0B",
        green: "#22C55E",
        gray: "#6B7280",
      };
      return {
        title: title || "Sin nombre",
        subtitle: subtitle || "Categoría",
        media: (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: colorMap[color || "gray"] || "#6B7280",
            }}
          />
        ),
      };
    },
  },

  // ── Orden por defecto ──
  orderings: [
    {
      title: "Orden de Aparición",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
