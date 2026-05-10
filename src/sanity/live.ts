// ============================================================
// FAST PAGE PRO — Sanity Live (defineLive)
// Configura sanityFetch + SanityLive para revalidación en tiempo real
// El VisualEditing overlay se maneja por separado en VisualEditing.tsx
//
// IMPORTANTE: El client DEBE tener stega.studioUrl configurado
// para que sanityFetch retorne datos con source maps (stega)
// cuando Draft Mode está activo.
// ============================================================

import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";

// ── Cliente de Sanity con stega para Visual Editing ──
// stega.studioUrl indica dónde está el Studio embebido
// Esto permite que sanityFetch retorne source maps en los datos
// para que el overlay VisualEditing sepa qué texto editar
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
  perspective: "published",
  // ── STEGA: habilita source maps en datos para Visual Editing ──
  stega: {
    enabled: true,
    studioUrl: "/admin",
  },
});

// ── Token de lectura para acceder a drafts (sin CDN) ──
// Necesario para Draft Mode — generar en:
// sanity.io/manage → API → Tokens → New Token (Reader)
const token = process.env.SANITY_API_READ_TOKEN;

// ── Token público para el navegador (Live Preview WebSocket) ──
// Debe estar en NEXT_PUBLIC_ para que el browser pueda leerlo
const browserToken = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

// ── Exportar sanityFetch y SanityLive ──
// - sanityFetch: para Server Components, detecta Draft Mode automáticamente
//   Cuando Draft Mode está activo, retorna datos con stega (source maps)
//   para que el overlay VisualEditing pueda identificar campos editables
// - SanityLive: componente Server que envuelve el client component de
//   revalidación en tiempo real (WebSocket + refresh)
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: browserToken,
});
