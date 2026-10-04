"use client";

import { useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  delay?: number;
  start?: string;
};

/** Fades and lifts each direct child into view, staggered. */
export default function Reveal({ children, className, y = 48, stagger = 0.08, delay = 0, start = "top 88%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.from(ref.current.children, {
        y,
        autoAlpha: 0,
        duration: 1.3,
        stagger,
        delay,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
