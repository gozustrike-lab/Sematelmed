"use client";

import dynamic from "next/dynamic";

// ── Lazy-loaded layout components (ssr: false to reduce server bundle) ──
// These components are not critical for initial HTML paint:
// - FluidBackground: decorative animated background, loads after hydration
// - WhatsAppWidget: floating CTA button, loads after hydration

const FluidBackground = dynamic(
  () => import("@/components/FluidBackground").then((mod) => ({ default: mod.FluidBackground })),
  {
    ssr: false,
    loading: () => null, // No flash — transparent until loaded
  },
);

const WhatsAppWidget = dynamic(
  () => import("@/components/WhatsAppWidget").then((mod) => ({ default: mod.WhatsAppWidget })),
  {
    ssr: false,
    loading: () => null, // Button appears after hydration
  },
);

export { FluidBackground, WhatsAppWidget };
