// ============================================================
// FAST PAGE PRO — Cliente de Sanity + Utilidades
// Cliente principal para fetch de datos publicados (CDN)
// Con stega habilitado para inyectar source maps en los datos
// cuando Draft Mode está activo (Visual Editing inline).
//
// STEGA es VITAL para que el clic inline funcione:
// - Sin stega: los datos llegan "limpios" sin metadatos
// - Con stega: los datos llevan source maps que indican al overlay
//   qué texto pertenece a qué campo de Sanity (editable o no)
//
// REGLA FAST PAGE PRO:
// El crédito Footer NO pasa por este cliente. Es un componente
// estático sin etiquetas de stega — inamovible por diseño.
// ============================================================

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// ── Cliente principal de Sanity (CDN + stega) ──
// stega.studioUrl indica dónde está el Studio embebido.
// Cuando Draft Mode está activo, stega inyecta source maps
// en los datos retornados para que el overlay VisualEditing
// pueda identificar qué campos son editables inline.
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
  // ── STEGA: source maps para Visual Editing ──
  // Habilitado siempre. En producción sin Draft Mode,
  // stega no inyecta nada (solo lo hace cuando detecta
  // el cookie de preview). No afecta rendimiento.
  stega: {
    enabled: true,
    studioUrl: "/admin",
  },
});

// ── Builder de URLs de imagen ──
// Uso: urlFor(product.image).width(400).height(300).fit('crop').url()
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// ── Tipos de respuesta ──

/** Categoría expandida (reference resuelta) */
export interface SanityCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  order?: number;
}

/** Imagen de Sanity con asset expandido */
export interface SanityImage {
  asset?: { _ref: string; _type: string; _id?: string; url?: string };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

/** Badge promocional */
export type ProductBadge = "" | "Nuevo" | "Oferta" | "Destacado" | "Últimas unidades" | "Más vendido";

/** Producto con categoría expandida, galería y badge */
export interface SanityProduct {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: { current: string; _type: string };
  image: SanityImage | null;
  gallery: SanityImage[];
  category: SanityCategory | null;
  description: PortableTextBlock[];
  price: string;
  specs?: string[];
  stock: number;
  badge: ProductBadge;
  featured: boolean;
  order: number;
}

export interface SanitySiteSettings {
  _id: string;
  mission: string;
  vision: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  description?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  mapLatitude?: number;
  mapLongitude?: number;
}

// ── Portable Text ──

export interface PortableTextBlock {
  _type: string;
  _key: string;
  children: Array<{ text: string; marks: string[] }>;
  style?: string;
  markDefs?: Array<{ _key: string; _type: string }>;
  listItem?: string;
  level?: number;
}

/**
 * Extrae texto plano de un bloque Portable Text de Sanity.
 * Útil para previews en cards (line-clamp).
 * IMPORTANTE: plainText LIMPIA las etiquetas stega del texto.
 * Si necesitas preservar stega, renderiza con PortableText de @portabletext/react.
 */
export function plainText(blocks: PortableTextBlock[] | undefined | null): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child) => child.text).join("");
      }
      return "";
    })
    .join("\n")
    .trim();
}

// ── Helpers de categoría ──

/** Obtiene el nombre legible de la categoría */
export function getCategoryName(product: SanityProduct): string {
  return product.category?.name || "Sin categoría";
}

/** Obtiene el color de la categoría para estilos */
export function getCategoryColorClass(color?: string): string {
  switch (color) {
    case "blue": return "bg-blue-50 text-blue-700 border-blue-200";
    case "purple": return "bg-purple-50 text-purple-700 border-purple-200";
    case "red": return "bg-red-50 text-red-700 border-red-200";
    case "amber": return "bg-amber-50 text-amber-700 border-amber-200";
    case "green": return "bg-green-50 text-green-700 border-green-200";
    default: return "bg-gray-50 text-gray-700 border-gray-200";
  }
}
