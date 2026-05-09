// ============================================================
// SEMATELMED — Cliente de Sanity para fetch de datos (frontend)
// Server Components + Client Components
// ============================================================

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// ── Cliente principal de Sanity ──
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// ── Builder de URLs de imagen ──
// Uso: urlFor(product.image).width(800).height(600).url()
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// ── Tipos de respuesta ──
export interface SanityProduct {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: { current: string; _type: string };
  image: {
    asset: { _ref: string; _type: string };
    alt?: string;
    hotspot?: { x: number; y: number; height: number; width: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
  category: "computo" | "telecomunicaciones" | "equipos-medicos" | "energia-solar";
  description: PortableTextBlock[];
  price: string;
  specs?: string[];
  stock: number;
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
 */
export function plainText(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child) => child.text).join("");
      }
      if (block._type === "list" && block.children) {
        return block.children.map((child) => child.text).join(", ");
      }
      return "";
    })
    .join("\n")
    .trim();
}

// ── GROQ Queries ──

/** Todos los productos ordenados por campo `order` */
export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(order asc) {
    _id,
    _createdAt,
    _updatedAt,
    name,
    "slug": slug.current,
    image,
    category,
    description,
    price,
    specs,
    stock,
    featured,
    order
  }
`;

/** Solo productos destacados (home page) */
export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(order asc) {
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    image,
    category,
    description,
    price,
    specs,
    stock,
    featured,
    order
  }[0..7]
`;

/** Un producto por slug */
export function productBySlugQuery(slug: string) {
  return `
    *[_type == "product" && slug.current == "${slug}"][0] {
      _id,
      _createdAt,
      _updatedAt,
      name,
      "slug": slug.current,
      image,
      category,
      description,
      price,
      specs,
      stock,
      featured,
      order
    }
  `;
}

/** Configuración del sitio (singleton) */
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    _id,
    mission,
    vision,
    address,
    phone,
    whatsapp,
    email,
    description,
    facebookUrl,
    tiktokUrl,
    mapLatitude,
    mapLongitude
  }
`;

// ── Funciones helper para fetch ──

/** Obtener todos los productos */
export async function getAllProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch<SanityProduct[]>(ALL_PRODUCTS_QUERY);
}

/** Obtener productos destacados */
export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch<SanityProduct[]>(FEATURED_PRODUCTS_QUERY);
}

/** Obtener un producto por slug */
export async function getProductBySlug(
  slug: string,
): Promise<SanityProduct | null> {
  return sanityClient.fetch<SanityProduct | null>(productBySlugQuery(slug));
}

/** Obtener configuración del sitio */
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch<SanitySiteSettings | null>(SITE_SETTINGS_QUERY);
}
