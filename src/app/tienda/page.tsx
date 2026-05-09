// ============================================================
// SEMATELMED — Tienda (Server Component)
// Fetch directo a Sanity con fallback a datos estáticos
// ISR: revalidación automática cada 60 segundos
// Live Preview: sanityFetch para Draft Mode cuando token existe
// ============================================================

import { Suspense } from "react";
import { sanityClient, type SanityProduct } from "@/lib/sanity.client";
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
// 1. Intenta sanityFetch (Live Preview / Draft Mode) si el token existe
// 2. Sino, usa sanityClient.fetch directo (CDN, no necesita token)
// 3. Si todo falla, fallback a datos estáticos locales
async function getProducts(): Promise<{
  products: SanityProduct[];
  source: "sanity" | "fallback";
}> {
  // ── Capa 1: sanityFetch (Live Preview con drafts) ──
  // Solo si existe el token de lectura (necesario para perspective: previewDrafts)
  if (process.env.SANITY_API_READ_TOKEN) {
    try {
      const { defineLive } = await import("next-sanity/live");
      const { createClient } = await import("next-sanity");

      const liveClient = createClient({
        projectId:
          process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb",
        dataset:
          process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        apiVersion: "2024-01-01",
        useCdn: false,
        perspective: "published",
      });

      const { sanityFetch } = defineLive({
        client: liveClient,
        serverToken: process.env.SANITY_API_READ_TOKEN,
      });

      const { data } = await sanityFetch<SanityProduct[]>({
        query: ALL_PRODUCTS_QUERY,
      });

      if (data && data.length > 0) {
        console.log(
          `[Sematelmed] ✅ ${data.length} productos cargados via sanityFetch (Live Preview)`,
        );
        return { products: data, source: "sanity" };
      }
    } catch (liveError) {
      console.warn(
        "[Sematelmed] sanityFetch falló, intentando fetch directo...",
        liveError instanceof Error ? liveError.message : liveError,
      );
    }
  }

  // ── Capa 2: fetch directo con sanityClient (CDN, publicado) ──
  try {
    const sanityProducts = await sanityClient.fetch<SanityProduct[]>(
      ALL_PRODUCTS_QUERY,
    );

    if (sanityProducts && sanityProducts.length > 0) {
      console.log(
        `[Sematelmed] ✅ ${sanityProducts.length} productos cargados via sanityClient (CDN)`,
      );
      return { products: sanityProducts, source: "sanity" };
    }
  } catch (cdnError) {
    console.warn(
      "[Sematelmed] sanityClient.fetch falló, usando fallback...",
      cdnError instanceof Error ? cdnError.message : cdnError,
    );
  }

  // ── Capa 3: fallback a datos estáticos ──
  console.log(
    "[Sematelmed] ⚠️ Sanity no tiene datos. Usando catálogo precargado.",
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
