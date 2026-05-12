// ============================================================
// FAST PAGE PRO — Schema Master (Tipos Base Reutilizables)
// Archivo centralizado para todos los proyectos de Fast Page Pro.
// Cada nuevo proyecto solo necesita cambiar las variables de entorno.
// ============================================================
//
// REUTILIZACIÓN:
//   1. Copiar sanity/lib/schema-master.ts al nuevo proyecto
//   2. Configurar .env.local con NEXT_PUBLIC_COMPANY_NAME
//   3. Los esquemas heredarán automáticamente el nombre y branding
//
// NOTA: El crédito "Diseño y desarrollo web por Fast Page Pro"
// está HARDCODED en el Footer del frontend y NO es editable
// desde el CMS. Es inamovible por diseño.
// ============================================================

import { defineField, type Rule } from "sanity";

// ── Variables de entorno (dinámicas por proyecto) ──

/** Nombre de la empresa — leer desde env para no tocar código */
export const COMPANY_NAME =
  process.env.NEXT_PUBLIC_COMPANY_NAME || "Fast Page Pro Client";

/** Título dinámico del Sanity Studio */
export const STUDIO_TITLE = `${COMPANY_NAME} CMS`;

/** URL del sitio (para previews y metadata) */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// ── Colores de marca Fast Page Pro ──
export const BRAND_COLORS = {
  primary: "#1dbd6b",
  accent: "#FF4D00",
  dark: "#202C40",
} as const;

// ── Categorías de producto (configurable por proyecto) ──

export interface CategoryOption {
  title: string;
  value: string;
}

/** Opciones de categoría por defecto (Sematelmed) */
export const PRODUCT_CATEGORIES: CategoryOption[] = [
  { title: "Cómputo", value: "computo" },
  { title: "Telecomunicaciones", value: "telecomunicaciones" },
  { title: "Equipos Médicos", value: "equipos-medicos" },
  { title: "Energía Solar", value: "energia-solar" },
];

/** Mapa de labels legibles para categorías */
export const CATEGORY_LABELS: Record<string, string> =
  Object.fromEntries(PRODUCT_CATEGORIES.map((c) => [c.value, c.title]));

// ── Presets de campos reutilizables ──

/**
 * Campo de slug estándar — genera URL a partir de un campo fuente.
 * @param source - campo del cual derivar el slug (ej: "name")
 */
export function slugField(source: string) {
  return defineField({
    name: "slug",
    title: "URL amigable (slug)",
    description:
      "Se genera automáticamente a partir del nombre. Edítalo solo si necesitas una URL personalizada.",
    type: "slug",
    options: {
      source,
      maxLength: 96,
      slugify: (input: string) =>
        input
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "")
          .slice(0, 96),
    },
    validation: (Rule: Rule) =>
      Rule.required().error("El slug es obligatorio para generar la URL del producto."),
  });
}

/**
 * Campo de imagen con hotspot y crop.
 * @param label - etiqueta visual (ej: "Imagen del Producto")
 * @param required - si es obligatorio
 */
export function imageField(label: string, required = true) {
  return defineField({
    name: "image",
    title: label,
    description: `Sube una imagen de 1200×630px para mejor calidad. Soporta JPG, PNG y WebP. Activa el hotspot para centrar el recorte.`,
    type: "image",
    options: {
      hotspot: true,
    },
    validation: (Rule: Rule) =>
      required
        ? Rule.required().error("La imagen es obligatoria. Sube al menos una foto del producto.")
        : Rule.optional(),
  });
}

/**
 * Campo de nombre estándar con validación.
 * @param label - etiqueta visual
 * @param maxLen - longitud máxima
 */
export function nameField(label: string, maxLen = 120) {
  return defineField({
    name: "name",
    title: label,
    description: `Nombre visible en la tienda y buscadores. Máximo ${maxLen} caracteres.`,
    type: "string",
    validation: (Rule: Rule) =>
      Rule.required()
        .max(maxLen)
        .error(`El nombre es obligatorio (máximo ${maxLen} caracteres).`),
  });
}

/**
 * Campo de categoría con radio buttons.
 * @param categories - opciones de categoría
 */
export function categoryField(categories: CategoryOption[]) {
  return defineField({
    name: "category",
    title: "Categoría",
    description: "Selecciona la línea de servicio a la que pertenece este producto.",
    type: "string",
    options: {
      list: categories,
      layout: "radio",
    },
    validation: (Rule: Rule) =>
      Rule.required().error("Debes seleccionar una categoría para el producto."),
  });
}

/**
 * Campo de descripción Portable Text.
 */
export function descriptionField(title = "Descripción") {
  return defineField({
    name: "description",
    title,
    description:
      "Describe el producto con detalle. Puedes usar negritas y listas para organizar la información.",
    type: "array",
    of: [{ type: "block" }],
    validation: (Rule: Rule) =>
      Rule.required().error("La descripción es obligatoria para el catálogo."),
  });
}

/**
 * Campo de precio (texto libre para formatos como "Desde S/ 1,299").
 */
export function priceField() {
  return defineField({
    name: "price",
    title: "Precio",
    description:
      'Escribe el precio como prefieras. Ejemplos: "Desde S/ 1,299", "Cotizar", "S/ 899.00".',
    type: "string",
    validation: (Rule: Rule) =>
      Rule.required().max(50).error("El precio es obligatorio (máx. 50 caracteres)."),
  });
}

/**
 * Campo de especificaciones técnicas (array de strings).
 */
export function specsField() {
  return defineField({
    name: "specs",
    title: "Especificaciones Técnicas",
    description:
      "Agrega las especificaciones clave del producto. Se muestran como etiquetas en la tarjeta.",
    type: "array",
    of: [{ type: "string" }],
    options: {
      of: [{ type: "string", title: "Especificación" }],
    },
  });
}

// ── Helpers de preview ──

/**
 * Genera el prepare() de preview para productos.
 * Muestra: ⭐ Nombre — Categoría · Precio
 */
export function productPreviewPrepare({
  title,
  category,
  image,
  price,
  featured,
}: {
  title: string;
  category: string;
  image: unknown;
  price: string;
  featured: boolean;
}) {
  const label = CATEGORY_LABELS[category] || category;
  return {
    title: featured ? `⭐ ${title}` : title,
    subtitle: `${label}  ·  ${price}`,
    media: image,
  };
}
