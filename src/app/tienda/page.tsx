// ============================================================
// SEMATELMED — Tienda (Server Component)
// Fetch a Sanity con stega para Visual Editing inline
// Estrategia: sanityFetch (stega + drafts) → sanityClient (CDN) → fallback estático
// ISR: revalidación automática cada 60 segundos
// ============================================================

import { Suspense } from "react";
import { sanityClient, type SanityProduct, type SanityCategory } from "@/lib/sanity.client";
import { sanityFetch } from "@/sanity/live";
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from "@/lib/sanity.queries";
import { PRODUCTS, type Product } from "@/constants/data";
import { TiendaContent } from "./tienda-content";

// ── ISR: revalida cada 60 segundos ──
export const revalidate = 60;

// ── Loader skeleton ──
function TiendaLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Cargando productos...</p>
      </div>
    </div>
  );
}

// ── Convierte productos estáticos a formato SanityProduct ──
function fallbackToSanityFormat(products: Product[]): SanityProduct[] {
  return products.map((p, i) => ({
    _id: p.id || `fallback-${i}`,
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    name: p.name,
    slug: { current: p.id, _type: "slug" },
    image: null as unknown as SanityProduct["image"],
    gallery: [],
    category: {
      _id: p.category,
      name: CATEGORY_LABELS_MAP[p.category] || p.category,
      slug: p.category,
      color: CATEGORY_COLOR_MAP[p.category] || "gray",
      icon: CATEGORY_ICON_MAP[p.category] || "package",
    },
    description: [
      {
        _type: "block",
        _key: `desc-${i}`,
        children: [{ text: p.description, marks: [] }],
        style: "normal",
      },
    ],
    price: p.price,
    specs: p.specs,
    stock: 99,
    badge: "" as const,
    featured: p.featured,
    order: i,
  }));
}

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

// ── Fetch de productos y categorías desde Sanity ──
async function getData(): Promise<{
  products: SanityProduct[];
  categories: SanityCategory[];
  source: "sanity" | "fallback";
}> {
  // ── Capa 1: sanityFetch (stega + Live Preview + Inline Editing) ──
  try {
    const [productsResult, categoriesResult] = await Promise.all([
      sanityFetch<SanityProduct[]>({ query: ALL_PRODUCTS_QUERY }),
      sanityFetch<SanityCategory[]>({ query: ALL_CATEGORIES_QUERY }),
    ]);

    const products = productsResult.data || [];
    const categories = categoriesResult.data || [];

    if (products.length > 0) {
      console.log(
        `[Fast Page Pro] ✅ ${products.length} productos + ${categories.length} categorías via sanityFetch`,
      );
      return { products, categories, source: "sanity" };
    }
  } catch (liveError) {
    console.warn(
      "[Fast Page Pro] sanityFetch falló, intentando fetch directo...",
      liveError instanceof Error ? liveError.message : liveError,
    );
  }

  // ── Capa 2: fetch directo con sanityClient (CDN) ──
  try {
    const [sanityProducts, sanityCategories] = await Promise.all([
      sanityClient.fetch<SanityProduct[]>(ALL_PRODUCTS_QUERY),
      sanityClient.fetch<SanityCategory[]>(ALL_CATEGORIES_QUERY),
    ]);

    if (sanityProducts && sanityProducts.length > 0) {
      console.log(
        `[Fast Page Pro] ✅ ${sanityProducts.length} productos via sanityClient (CDN)`,
      );
      return {
        products: sanityProducts,
        categories: sanityCategories || [],
        source: "sanity",
      };
    }
  } catch (cdnError) {
    console.warn(
      "[Fast Page Pro] sanityClient.fetch falló, usando fallback...",
      cdnError instanceof Error ? cdnError.message : cdnError,
    );
  }

  // ── Capa 3: fallback a datos estáticos ──
  console.log("[Fast Page Pro] ⚠️ Usando catálogo precargado.");
  return {
    products: fallbackToSanityFormat(PRODUCTS),
    categories: [],
    source: "fallback",
  };
}

// ── Server Component (async) ──
export default async function TiendaPage() {
  const { products, categories, source } = await getData();

  return (
    <Suspense fallback={<TiendaLoader />}>
      <TiendaContent
        products={products}
        categories={categories}
        source={source}
      />
    </Suspense>
  );
}
