// ============================================================
// SEMATELMED — Tienda (Server Component)
// Consume productos de Sanity.io con fallback a datos estáticos
// Soporta Draft Mode para Live Preview desde Sanity Studio
// ============================================================

import { Suspense } from "react";
import { sanityFetch } from "@/sanity/live";
import { type SanityProduct } from "@/lib/sanity.client";
import { PRODUCTS, type Product } from "@/constants/data";
import { TiendaContent } from "./tienda-content";

// ── GROQ Query ──
const ALL_PRODUCTS_QUERY = `
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
    stock: 99, // Fallback: siempre disponible
    featured: p.featured,
    order: i,
  }));
}

// ── Fetch de productos desde Sanity con Live Preview (Server Component) ──
// sanityFetch detecta automáticamente si está en Draft Mode y usa
// perspective: 'previewDrafts' o 'published' según corresponda
async function getProducts(): Promise<{
  products: SanityProduct[];
  source: "sanity" | "fallback";
}> {
  try {
    // sanityFetch retorna { data, sourceMap, tags }
    const { data: sanityProducts } = await sanityFetch<SanityProduct[]>({
      query: ALL_PRODUCTS_QUERY,
    });

    // Si Sanity tiene productos, los usamos
    if (sanityProducts && sanityProducts.length > 0) {
      return { products: sanityProducts, source: "sanity" };
    }

    // Fallback a datos estáticos si el CMS está vacío
    return {
      products: fallbackToSanityFormat(PRODUCTS),
      source: "fallback",
    };
  } catch (error) {
    // Si hay error de red o API, usamos datos estáticos
    console.warn(
      "[Sematelmed] No se pudo conectar a Sanity. Usando datos precargados.",
      error instanceof Error ? error.message : error,
    );
    return {
      products: fallbackToSanityFormat(PRODUCTS),
      source: "fallback",
    };
  }
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
