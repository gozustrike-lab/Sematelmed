// ============================================================
// SEMATELMED — Sanity Live (defineLive)
// Configura sanityFetch + SanityLive para Draft Mode y Live Preview
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
// Necesario para Draft Mode — obtenerlo en:
// sanity.io/manage → API → Tokens → New Token (Reader)
const token = process.env.SANITY_API_READ_TOKEN;

// ── Exportar sanityFetch y SanityLive ──
// - sanityFetch: para Server Components, detecta Draft Mode automáticamente
// - SanityLive: componente cliente, va en layout.tsx
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
