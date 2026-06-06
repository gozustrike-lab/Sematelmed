"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";

/**
 * ScrollSpyProvider — wraps the page content and activates scroll spy.
 * Place this inside <main> in layout.tsx.
 *
 * It automatically:
 *   1. Observes all [data-scroll-spy] sections on the current page
 *   2. Updates the URL hash as the user scrolls (History API, no reload)
 *   3. Handles incoming hash links (/page#section) with smooth scroll
 *
 * No props needed — works purely based on DOM attributes.
 */
export function ScrollSpyProvider({ children }: { children: React.ReactNode }) {
  useScrollSpy();
  return <>{children}</>;
}
