// ============================================================
// FAST PAGE PRO — Cliente de Sanity + Utilidades
// Cliente principal para fetch de datos publicados (CDN)
// Cliente stega para Visual Editing (source maps en datos)
// ============================================================

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// ── Cliente principal de Sanity (CDN para contenido publicado) ──
// No necesita token — usa la CDN pública de Sanity
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});

// ── Builder de URLs de imagen ──
// Uso: urlFor(product.image).width(400).height(300).fit('crop').url()
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
    asset?: { _ref: string; _type: string; _id?: string; url?: string };
    alt?: string;
    hotspot?: { x: number; y: number; height: number; width: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  } | null;
  category: string;
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
