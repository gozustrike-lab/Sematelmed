// ============================================================
// FAST PAGE PRO — Cliente de Sanity + Utilidades
// Cliente principal para fetch de datos publicados (CDN)
// Con stega habilitado para inyectar source maps en los datos
// cuando Draft Mode está activo (Visual Editing inline).
//
// BACKWARD COMPATIBLE:
// - category puede ser SanityCategory (reference) o string (viejo)
// - image puede ser null, objeto sin asset, o objeto con asset
// - Todas las funciones helper manejan estos casos gracefulmente
//
// REGLA FAST PAGE PRO:
// El crédito Footer NO pasa por este cliente. Es un componente
// estático sin etiquetas de stega — inamovible por diseño.
// ============================================================

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// ── Cliente principal de Sanity (CDN + stega) ──
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
  stega: {
    enabled: true,
    studioUrl: "/admin",
  },
});

// ── Builder de URLs de imagen ──
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// ── Backward Compatibility: Category Fallbacks ──

const CATEGORY_LABELS_MAP: Record<string, string> = {
  computo: "Cómputo",
  telecomunicaciones: "Telecomunicaciones",
  "equipos-medicos": "Equipos Médicos",
  "energia-solar": "Energía Solar",
};

const CATEGORY_COLOR_MAP: Record<string, string> = {
  computo: "blue",
  telecomunicaciones: "purple",
  "equipos-medicos": "red",
  "energia-solar": "amber",
};

const CATEGORY_ICON_MAP: Record<string, string> = {
  computo: "monitor",
  telecomunicaciones: "wifi",
  "equipos-medicos": "heart-pulse",
  "energia-solar": "sun",
};

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

/** Producto — category puede ser SanityCategory (nuevo) o string (viejo) */
export interface SanityProduct {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: { current: string; _type: string };
  image: SanityImage | null;
  gallery: SanityImage[];
  category: SanityCategory | null;
  categoryRaw?: string; // string viejo (backward compat)
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

/** Extrae texto plano de un bloque Portable Text de Sanity. */
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

// ── Helpers de categoría (BACKWARD COMPATIBLE) ──

/**
 * Obtiene el nombre legible de la categoría.
 * Funciona con reference (nuevo) y string (viejo).
 */
export function getCategoryName(product: SanityProduct): string {
  // Nuevo formato: reference expandida
  if (product.category && typeof product.category === "object" && product.category.name) {
    return product.category.name;
  }
  // Viejo formato: string
  if (product.categoryRaw && typeof product.categoryRaw === "string") {
    return CATEGORY_LABELS_MAP[product.categoryRaw] || product.categoryRaw;
  }
  // Category como string directo (sin categoryRaw)
  if (product.category && typeof product.category === "string") {
    return CATEGORY_LABELS_MAP[product.category] || product.category;
  }
  return "Sin categoría";
}

/**
 * Obtiene el ID de categoría para filtrado.
 * Funciona con reference (nuevo) y string (viejo).
 */
export function getCategoryId(product: SanityProduct): string {
  if (product.category && typeof product.category === "object" && product.category._id) {
    return product.category._id;
  }
  if (product.categoryRaw && typeof product.categoryRaw === "string") {
    return product.categoryRaw;
  }
  if (product.category && typeof product.category === "string") {
    return product.category;
  }
  return "uncategorized";
}

/**
 * Obtiene el color de la categoría para estilos.
 */
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

/**
 * Obtiene el color de categoría de un producto (BACKWARD COMPATIBLE).
 */
export function getProductCategoryColor(product: SanityProduct): string {
  if (product.category && typeof product.category === "object" && product.category.color) {
    return product.category.color;
  }
  // Fallback para strings viejos
  const rawId = product.categoryRaw || (typeof product.category === "string" ? product.category : "");
  return CATEGORY_COLOR_MAP[rawId] || "gray";
}

/**
 * Obtiene el icono de categoría de un producto (BACKWARD COMPATIBLE).
 */
export function getProductCategoryIcon(product: SanityProduct): string {
  if (product.category && typeof product.category === "object" && product.category.icon) {
    return product.category.icon;
  }
  const rawId = product.categoryRaw || (typeof product.category === "string" ? product.category : "");
  return CATEGORY_ICON_MAP[rawId] || "package";
}

/**
 * Construye URL de imagen de forma segura.
 * Retorna null si la imagen no tiene asset válido.
 */
export function getProductImageUrl(
  image: SanityImage | null | undefined,
  width: number = 400,
  height: number = 300,
): string | null {
  if (!image || !image.asset) return null;
  try {
    return urlFor(image).width(width).height(height).fit("crop").url();
  } catch {
    return null;
  }
}
