"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/lib/lenis-provider";

/**
 * Returns a click handler for hash links (e.g. /#products).
 * When already on the target page, scrolls smoothly via Lenis
 * instead of relying on Next.js Link default behavior.
 */
export function useHashNav() {
  const lenis = useLenis();
  const pathname = usePathname();

  return useCallback(
    (href: string, e: React.MouseEvent) => {
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return; // no hash — let Link handle it

      const path = href.substring(0, hashIndex) || "/";
      const hash = href.substring(hashIndex + 1);

      // Only intercept if we're already on the target page
      if (pathname === path) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { offset: -80 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
      // Otherwise let Link navigate to the new page normally
    },
    [lenis, pathname]
  );
}
