// ============================================================
// SEMATELMED — Tienda (Server Component)
// Fetch a Sanity con stega para Visual Editing inline
// Estrategia: sanityFetch (stega + drafts) → sanityClient (CDN) → fallback estático
// ISR: revalidación automática cada 60 segundos
// ============================================================

import { Suspense } from "react";
import { sanityClient, type SanityProduct } from "@/lib/sanity.client";
import { sanityFetch } from "@/sanity/live";
import { ALL_PRODUCTS_QUERY } from "@/lib/sanity.queries";
import { PRODUCTS, type Product } from "@/constants/data";
import { TiendaContent } from "./tienda-content";

// ── ISR: revalida cada 60 segundos ──
// Cuando el usuario publique en Sanity, la página se actualiza
// automáticamente en el siguiente request (máximo 60s de espera)
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
    category: p.category,
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
    featured: p.featured,
    order: i,
  }));
}

// ── Fetch de productos desde Sanity ──
// Estrategia de triple capa:
// 1. sanityFetch (compartido de live.ts) — tiene stega + Live Preview
//    Cuando Draft Mode está activo, inyecta source maps en los datos
//    para que el overlay VisualEditing identifique campos editables inline
// 2. sanityClient.fetch directo (CDN, no necesita token)
// 3. Si todo falla, fallback a datos estáticos locales
async function getProducts(): Promise<{
  products: SanityProduct[];
  source: "sanity" | "fallback";
}> {
  // ── Capa 1: sanityFetch (stega + Live Preview + Inline Editing) ──
  // Usa el defineLive compartido de live.ts que tiene:
  // - stega: { enabled: true, studioUrl: "/admin" }
  // - serverToken para drafts
  // - browserToken para WebSocket real-time
  try {
    const { data } = await sanityFetch<SanityProduct[]>({
      query: ALL_PRODUCTS_QUERY,
    });

    if (data && data.length > 0) {
      console.log(
        `[Fast Page Pro] ✅ ${data.length} productos cargados via sanityFetch (Live Preview + Inline Editing)`,
      );
      return { products: data, source: "sanity" };
    }
  } catch (liveError) {
    console.warn(
      "[Fast Page Pro] sanityFetch falló, intentando fetch directo...",
      liveError instanceof Error ? liveError.message : liveError,
    );
  }

  // ── Capa 2: fetch directo con sanityClient (CDN, publicado) ──
  try {
    const sanityProducts = await sanityClient.fetch<SanityProduct[]>(
      ALL_PRODUCTS_QUERY,
    );

    if (sanityProducts && sanityProducts.length > 0) {
      console.log(
        `[Fast Page Pro] ✅ ${sanityProducts.length} productos cargados via sanityClient (CDN)`,
      );
      return { products: sanityProducts, source: "sanity" };
    }
  } catch (cdnError) {
    console.warn(
      "[Fast Page Pro] sanityClient.fetch falló, usando fallback...",
      cdnError instanceof Error ? cdnError.message : cdnError,
    );
  }

  // ── Capa 3: fallback a datos estáticos ──
  console.log(
    "[Fast Page Pro] ⚠️ Sanity no tiene datos. Usando catálogo precargado.",
  );
  return {
    products: fallbackToSanityFormat(PRODUCTS),
    source: "fallback",
  };
}

// ── Server Component (async) ──
export default async function TiendaPage() {
  const { products, source } = await getProducts();

  return (
    <Suspense fallback={<TiendaLoader />}>
      <TiendaContent products={products} source={source} />
    </Suspense>
  );
}
