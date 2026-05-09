// ============================================================
// SEMATELMED — Configuración de Sanity Studio
// Studio embebido en Next.js App Router — ruta: /admin
// Incluye Presentation Tool (Live Preview) + Draft Mode
// ============================================================

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { defineLocations } from "sanity/presentation";
import { schemaTypes } from "./sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "sematelmed-studio",
  title: "Sematelmed CMS",
  projectId,
  dataset,

  // ── Studio embebido en /admin (no subdominio) ──
  basePath: "/admin",

  // ── Plugins ──
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      // ── URL de preview: desarrollo vs producción ──
      previewUrl: {
        // En desarrollo usa localhost:3000, en producción la URL de Vercel
        initial:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://sematelmed.vercel.app",
        // Ruta que activa Next.js Draft Mode
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      // ── Mapeo de documentos a rutas de preview ──
      resolve: {
        locations: {
          product: defineLocations({
            type: "product",
            resolve: (doc) => ({
              locations: [
                {
                  title: "Tienda",
                  href: "/tienda",
                },
              ],
            }),
          }),
          siteSettings: defineLocations({
            type: "siteSettings",
            resolve: () => ({
              locations: [
                {
                  title: "Inicio",
                  href: "/",
                },
              ],
            }),
          }),
        },
      },
    }),
  ],

  // ── Esquemas ──
  schema: {
    types: schemaTypes,
  },

  // ── Tema del Studio ──
  theme: {
    "--brand-primary": "#4726BF",
    "--brand-accent": "#FF4D00",
    "--brand-dark": "#202C40",
  } as React.CSSProperties,
});
