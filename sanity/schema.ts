// ============================================================
// FAST PAGE PRO — Esquemas Unificados de Sanity
// Punto de entrada: importa todos los tipos de documento
// ============================================================

import category from "./schemas/category";
import product from "./schemas/product";
import siteSettings from "./schemas/siteSettings";
import studioGuide from "./schemas/guia";

export const schemaTypes = [category, product, siteSettings, studioGuide];
