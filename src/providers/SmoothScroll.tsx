"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

/** Keeps ScrollTrigger in lockstep with Lenis' virtual scroll position. */
function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

/**
 * One Lenis instance for the whole site, driven by GSAP's ticker so
 * smooth scrolling and every ScrollTrigger animation share the same frame.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    if (prefersReducedMotion()) lenisRef.current?.lenis?.destroy();

    // Re-measure once fonts and images have settled.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.09, wheelMultiplier: 0.9 }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
