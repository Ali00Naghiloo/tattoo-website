"use client";

import { useLenis } from "lenis/react";
import { useRef } from "react";

/** Hairline progress indicator pinned to the top of the viewport. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useLenis(({ progress }) => {
    if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-60 h-px">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-linear-to-r from-bone/30 via-bone to-ember" />
    </div>
  );
}
