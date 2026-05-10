// ============================================================
// FAST PAGE PRO — Esquemas Unificados de Sanity
// Punto de entrada: importa todos los tipos de documento
// ============================================================

import product from "./schemas/product";
import siteSettings from "./schemas/siteSettings";
import studioGuide from "./schemas/guia";

export const schemaTypes = [product, siteSettings, studioGuide];
