// ============================================================
// SEMATELMED — Draft Mode Enable API Route
// Activa Draft Mode de Next.js cuando el Presentation Tool lo solicita
// ============================================================

import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Leer la URL de redirección desde los query params (enviada por Presentation Tool)
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/tienda";

  // Activar Draft Mode de Next.js
  const draft = await draftMode();
  draft.enable();

  // Redirigir a la página solicitada
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
