// ============================================================
// FAST PAGE PRO — Sanity Live (defineLive)
// Configura sanityFetch + SanityLive para Draft Mode y Live Preview
// Incluye VisualEditing overlay para edición inline
// ============================================================

import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";

// ── Cliente de Sanity para Live Preview ──
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  perspective: "published",
});

// ── Token de lectura para acceder a drafts (sin CDN) ──
// Necesario para Draft Mode — generar en:
// sanity.io/manage → API → Tokens → New Token (Reader)
const token = process.env.SANITY_API_READ_TOKEN;

// ── Exportar sanityFetch y SanityLive ──
// - sanityFetch: para Server Components, detecta Draft Mode automáticamente
//   Retorna datos con source maps para edición inline (VisualEditing)
// - SanityLive: componente cliente, va en layout.tsx
//   Incluye EnableLiveMode (real-time updates) + VisualEditing (inline editing overlay)
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
