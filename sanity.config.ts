// ============================================================
// FAST PAGE PRO — Configuración de Sanity Studio
// Studio embebido en Next.js App Router — ruta: /admin
// Estructura: 2 grupos con iconos profesionales
// Reutilizable: lee COMPANY_NAME desde variable de entorno
// ============================================================

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { defineLocations } from "sanity/presentation";
import {
  PackageIcon,
  HomeIcon,
  CogIcon,
} from "@sanity/icons";
import { schemaTypes } from "./sanity/schema";
import {
  STUDIO_TITLE,
  SITE_URL,
  BRAND_COLORS,
} from "./sanity/lib/schema-master";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "fast-page-pro-studio",
  title: STUDIO_TITLE,

  projectId,
  dataset,

  // ── Studio embebido en /admin (no subdominio) ──
  basePath: "/admin",

  // ── Plugins ──
  plugins: [
    // ── Structure Builder: panel organizado en 2 grupos ──
    structureTool({
      structure: (S) => {
        return S.list()
          .title("Panel de Control")
          .items([
            // ── Grupo 1: Contenido de Tienda ──
            S.listItem()
              .title("Contenido de Tienda")
              .icon(PackageIcon)
              .id("tienda-group")
              .child(
                S.list()
                  .title("Tienda")
                  .items([
                    ...S.documentTypeListItems().filter(
                      (item) => item.getId() === "product",
                    ),
                  ]),
              ),

            // ── Grupo 2: Información Corporativa ──
            S.listItem()
              .title("Información Corporativa")
              .icon(HomeIcon)
              .id("corporativo-group")
              .child(
                S.list()
                  .title("Empresa")
                  .items([
                    // Configuración del sitio (singleton — documento único)
                    S.listItem()
                      .title("Configuración del Sitio")
                      .icon(CogIcon)
                      .id("site-settings-editor")
                      .child(
                        S.document()
                          .schemaType("siteSettings")
                          .documentId("siteSettings")
                          .title("Configuración"),
                      ),
                  ]),
              ),
          ]);
      },
    }),

    // ── GROQ Query Debugger ──
    visionTool(),

    // ── Presentation Tool (Live Preview / Draft Mode) ──
    presentationTool({
      previewUrl: {
        initial:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : SITE_URL,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: {
          product: defineLocations({
            type: "product",
            resolve: () => ({
              locations: [{ title: "Tienda", href: "/tienda" }],
            }),
          }),
          siteSettings: defineLocations({
            type: "siteSettings",
            resolve: () => ({
              locations: [
                { title: "Inicio", href: "/" },
                { title: "Nosotros", href: "/nosotros" },
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

  // ── Document settings ──
  document: {
    unsavedChanges: {
      warning: "Tienes cambios sin guardar. ¿Seguro que quieres salir?",
    },
  },

  // ── Tema del Studio (branding dinámico) ──
  theme: {
    "--brand-primary": BRAND_COLORS.primary,
    "--brand-accent": BRAND_COLORS.accent,
    "--brand-dark": BRAND_COLORS.dark,
  } as React.CSSProperties,
});
