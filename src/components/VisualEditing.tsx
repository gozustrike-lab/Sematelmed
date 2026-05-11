// ============================================================
// FAST PAGE PRO — Visual Editing Overlay
// Componente cliente que renderiza el overlay de edición inline
// de @sanity/visual-editing cuando Draft Mode está activo.
//
// SOLO se monta cuando Draft Mode está habilitado.
// El crédito "Fast Page Pro" en el Footer NO tiene etiquetas
// de edición visual — es estático e inamovible por diseño.
// ============================================================

"use client";

import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";

export function VisualEditing() {
  return <SanityVisualEditing />;
}
