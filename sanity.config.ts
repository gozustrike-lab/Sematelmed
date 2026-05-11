// ============================================================
// FAST PAGE PRO — Configuración de Sanity Studio (Agencia Pro)
// Studio embebido en Next.js App Router — ruta: /admin
// Plugins: Structure + Presentation (solo 2 pestañas)
// Sin Releases, sin Vision — interfaz limpia para el cliente
// Reutilizable: lee COMPANY_NAME desde variable de entorno
// ============================================================

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { defineLocations } from "sanity/presentation";
import {
  PackageIcon,
  HomeIcon,
  CogIcon,
  BookIcon,
  TagIcon,
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

  // ── Desactivar Releases (feature integrado de Sanity v3) ──
  releases: {
    enabled: false,
  },

  // ── Plugins (solo 2 pestañas: Estructura + Presentación) ──
  plugins: [
    // ── Pestaña 1: Structure — panel organizado en 3 grupos ──
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
                    // Categorías (gestionar primero)
                    S.listItem()
                      .title("Categorías")
                      .icon(TagIcon)
                      .id("categories-list")
                      .child(
                        S.documentTypeList("category")
                          .title("Categorías")
                          .defaultOrdering([{ field: "order", direction: "asc" }]),
                      ),
                    // Productos
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

            // ── Grupo 3: Guía de Uso ──
            S.listItem()
              .title("Guía de Uso")
              .icon(BookIcon)
              .id("guia-group")
              .child(
                S.document()
                  .schemaType("studioGuide")
                  .documentId("studio-guide")
                  .title("Guía Paso a Paso"),
              ),
          ]);
      },
    }),

    // ── Pestaña 2: Presentation — web a pantalla completa ──
    // Muestra toda la web inmediatamente. El panel de documentos
    // SOLO aparece cuando el usuario selecciona un documento.
    // Sin Releases, sin Vision — interfaz limpia.
    presentationTool({
      // Desactiva el panel lateral de documentos por defecto.
      // Solo se muestra cuando el usuario selecciona un documento.
      document: {
        actions: [],
      },
      previewUrl: {
        // URL que se carga al abrir el panel
        initial:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : SITE_URL,
        // Habilita Draft Mode para inline editing y contenido no publicado
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: {
          product: defineLocations({
            type: "product",
            resolve: () => ({
              locations: [
                { title: "Tienda", href: "/tienda" },
              ],
            }),
          }),
          category: defineLocations({
            type: "category",
            resolve: () => ({
              locations: [
                { title: "Tienda", href: "/tienda" },
              ],
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
