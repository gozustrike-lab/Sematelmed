// ============================================================
// SEMATELMED — Draft Mode Disable API Route
// Desactiva Draft Mode de Next.js
// ============================================================

import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Leer la URL de redirección desde los query params
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/";

  // Desactivar Draft Mode de Next.js
  const draft = await draftMode();
  draft.disable();

  // Redirigir a la página solicitada
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
