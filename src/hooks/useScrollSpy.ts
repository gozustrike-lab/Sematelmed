"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

// ── Section definition for scroll spy ──
export interface ScrollSection {
  id: string;        // DOM id (without #)
  label: string;     // Human-readable label (for aria/navigation)
  offset?: number;   // Custom offset px from viewport top (default: 100)
}

/**
 * useScrollSpy — observes all `[data-scroll-spy]` elements on the page,
 * detects which one is currently visible, and updates the URL hash
 * via the History API (no page reload).
 *
 * It also handles initial hash navigation: if the user lands on
 * `/nosotros#historia`, it smooth-scrolls to that section.
 *
 * Usage:
 *   1. Add `id="my-section"` and `data-scroll-spy` to every <section>.
 *   2. Wrap your page layout with <ScrollSpyProvider> (once in layout.tsx).
 *   3. That's it — the hook does everything else automatically.
 */
export function useScrollSpy() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);

  const updateHash = useCallback((hash: string) => {
    if (typeof window === "undefined") return;
    const current = window.location.hash.replace("#", "");
    if (hash !== current) {
      window.history.replaceState(null, "", hash ? `#${hash}` : window.location.pathname);
    }
  }, []);

  // ── IntersectionObserver: detect the visible section ──
  const setupObserver = useCallback(() => {
    if (typeof window === "undefined") return;

    // Disconnect previous observer if any
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const sections = document.querySelectorAll<HTMLElement>("[data-scroll-spy]");
    if (sections.length === 0) return;

    // Sort by DOM order
    const sortedSections = Array.from(sections).sort(
      (a, b) => {
        const posA = a.getBoundingClientRect().top + window.scrollY;
        const posB = b.getBoundingClientRect().top + window.scrollY;
        return posA - posB;
      }
    );

    let currentSectionId = "";

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Don't update hash while user is actively scrolling to a hash target
        if (isScrollingRef.current) return;

        // Find the topmost visible section
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.15
        );

        if (visibleEntries.length > 0) {
          // Pick the one closest to the top of the viewport
          const topEntry = visibleEntries.reduce((closest, entry) => {
            return entry.boundingClientRect.top < closest.boundingClientRect.top
              ? entry
              : closest;
          });
          const id = topEntry.target.id;
          if (id && id !== currentSectionId) {
            currentSectionId = id;
            updateHash(id);
          }
        }
      },
      {
        rootMargin: "-10% 0px -80% 0px",
        threshold: [0.15, 0.5],
      }
    );

    sortedSections.forEach((section) => {
      observerRef.current?.observe(section);
    });
  }, [updateHash]);

  // ── Initial hash navigation: scroll to the section if hash exists ──
  const handleInitialHash = useCallback(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const target = document.getElementById(hash);
    if (target) {
      isScrollingRef.current = true;
      // Small delay to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Allow scroll spy to resume after scroll animation finishes
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1200);
      });
    }
  }, []);

  // ── Main effect: setup observer and handle initial hash ──
  useEffect(() => {
    // Wait for DOM to be ready (sections might be lazy-loaded)
    const timer = setTimeout(() => {
      setupObserver();
      handleInitialHash();
    }, 150);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname, setupObserver, handleInitialHash]);

  // ── Listen for hash changes (e.g., user clicks a hash link) ──
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const target = document.getElementById(hash);
      if (target) {
        isScrollingRef.current = true;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1200);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
}
