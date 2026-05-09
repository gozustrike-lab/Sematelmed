// ============================================================
// SEMATELMED — Sanity Studio (App Router)
// Ruta: /admin
// ============================================================

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function AdminPage() {
  return <NextStudio config={config} />;
}
