"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

const easeInOutExpo = (t: number) =>
  t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2;

/** Smoothly scrolls to a "#section" anchor (or "#top"), with a native fallback. */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (href: string) => {
      const target = href === "#top" ? 0 : href;
      if (lenis) {
        // `force` so links work even while the mobile menu has Lenis stopped.
        lenis.scrollTo(target, { duration: 1.8, easing: easeInOutExpo, force: true });
        return;
      }
      if (target === 0) window.scrollTo({ top: 0, behavior: "smooth" });
      else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );
}
