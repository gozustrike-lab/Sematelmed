"use client";

import { useEffect, useRef } from "react";

/**
 * ContentProtection — Componente que protege el contenido frontend
 * contra: clic derecho, atajos de dev tools (F12, Ctrl+Shift+I/J, Ctrl+U),
 * selección de texto, copia (Ctrl+C/Ctrl+A/Ctrl+X) y arrastre de imágenes.
 *
 * Usa MutationObserver para manejar imágenes que se cargan dinámicamente
 * (SPA, lazy-loaded, etc.).
 */
export function ContentProtection() {
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    // ── 1. Bloquear clic derecho (context menu) ──
    const handleContextMenu = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu, false);

    // ── 2. Bloquear atajos de teclado de desarrollo ──
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 — DevTools
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      // Ctrl+Shift+I — Inspector
      // Ctrl+Shift+J — Console
      // Ctrl+Shift+C — Element picker
      // Ctrl+U — Ver código fuente
      if (e.ctrlKey && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(e.key)) {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey && ["u", "U"].includes(e.key)) {
        e.preventDefault();
        return;
      }
      // Ctrl+S — Guardar página
      if (e.ctrlKey && ["s", "S"].includes(e.key)) {
        e.preventDefault();
        return;
      }
    };
    document.addEventListener("keydown", handleKeyDown, false);

    // ── 3. Bloquear selección de texto y copia ──
    const handleSelectStart = (e: Event) => e.preventDefault();
    const handleCopy = (e: Event) => e.preventDefault();
    const handleCut = (e: Event) => e.preventDefault();
    document.addEventListener("selectstart", handleSelectStart, false);
    document.addEventListener("copy", handleCopy, false);
    document.addEventListener("cut", handleCut, false);

    // ── 4. Bloquear arrastre de imágenes (incluyendo dinámicas) ──
    const blockImageDrag = () => {
      document.querySelectorAll("img, [draggable='true']").forEach((el) => {
        el.setAttribute("draggable", "false");
      });
    };

    // Bloquear imágenes existentes al montar
    blockImageDrag();

    // MutationObserver para imágenes que se cargan después (SPA, lazy load)
    observerRef.current = new MutationObserver(() => {
      blockImageDrag();
    });
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // ── Cleanup ──
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, false);
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener("selectstart", handleSelectStart, false);
      document.removeEventListener("copy", handleCopy, false);
      document.removeEventListener("cut", handleCut, false);
      observerRef.current?.disconnect();
    };
  }, []);

  // Este componente no renderiza nada visible
  return null;
}

export default ContentProtection;
