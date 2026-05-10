// ============================================================
// FAST PAGE PRO — Sanity Visual Editing Wrapper
// Importa SanityLive de forma dinámica solo en el cliente (ssr: false)
// Esto previene el error de hydration React #419 porque
// VisualEditing usa hooks que no funcionan en SSR
// ============================================================

"use client";

import dynamic from "next/dynamic";

// SanityLive solo se monta en el navegador, nunca en el servidor
const SanityLive = dynamic(
  () => import("@/sanity/live").then((mod) => ({ default: mod.SanityLive })),
  { ssr: false },
);

export function VisualEditingLoader() {
  return <SanityLive />;
}
