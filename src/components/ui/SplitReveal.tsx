"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

type SplitType = "lines" | "words" | "chars";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  type?: SplitType;
  delay?: number;
  stagger?: number;
  /** ScrollTrigger start position (ignored when `play` is controlled). */
  start?: string;
  /** When provided, the reveal waits for this flag instead of scroll. */
  play?: boolean;
};

const SPLIT: Record<SplitType, string> = {
  lines: "lines",
  words: "lines,words",
  chars: "lines,words,chars",
};

const STAGGER: Record<SplitType, number> = { lines: 0.1, words: 0.035, chars: 0.022 };

/** Masked line/word/char reveal powered by GSAP SplitText (re-splits on resize). */
export default function SplitReveal({
  as: Tag = "div",
  children,
  className,
  type = "lines",
  delay = 0,
  stagger,
  start = "top 85%",
  play,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || play === false) return;

      SplitText.create(el, {
        type: SPLIT[type],
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self[type], {
            yPercent: 120,
            rotate: type === "lines" ? 2 : 8,
            transformOrigin: "0% 100%",
            duration: 1.4,
            stagger: stagger ?? STAGGER[type],
            delay,
            scrollTrigger: play === undefined ? { trigger: el, start, once: true } : undefined,
          });
        },
      });
    },
    { scope: ref, dependencies: [play] },
  );

  return (
    <Tag ref={ref} className={cn("split-pad", className)}>
      {children}
    </Tag>
  );
}
