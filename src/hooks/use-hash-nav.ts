"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "@/lib/lenis-provider";

/**
 * Returns a click handler for hash links (e.g. /#products).
 * Same page: smooth-scrolls to target section.
 * Cross page: navigates without scroll, LenisProvider handles hash scroll.
 */
export function useHashNav() {
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (href: string, e: React.MouseEvent) => {
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return; // no hash — let Link handle it

      const path = href.substring(0, hashIndex) || "/";
      const hash = href.substring(hashIndex + 1);

      // Always prevent default — we handle hash navigation ourselves
      e.preventDefault();

      if (pathname === path) {
        // Same page — smooth scroll to target
        const el = document.getElementById(hash);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { offset: -80 });
          } else {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
        window.history.pushState(null, "", href);
      } else {
        // Cross-page — navigate without scroll, then LenisProvider handles hash
        router.push(path, { scroll: false });
        // Set hash after navigation so LenisProvider's pathname watcher can find it
        setTimeout(() => {
          window.history.replaceState(null, "", href);
        }, 100);
      }
    },
    [lenis, pathname, router]
  );
}
