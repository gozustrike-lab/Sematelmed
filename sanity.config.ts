// ============================================================
// SEMATELMED — Configuración de Sanity Studio
// Studio embebido en Next.js App Router — ruta: /admin
// ============================================================

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
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
  plugins: [structureTool(), visionTool()],

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
