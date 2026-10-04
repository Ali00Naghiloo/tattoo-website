"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Mode = "default" | "hover" | "label";

const INTERACTIVE = "a, button, input, textarea, select, label, [data-cursor]";

/**
 * Dot + trailing ring cursor. Grows over interactive elements and shows a
 * label for anything tagged with `data-cursor="Label"`. Fine pointers only.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");

  useGSAP(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (!visible) {
        visible = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.4 });
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE);
      const text = target?.getAttribute("data-cursor") ?? "";
      setLabel(text);
      setMode(text ? "label" : target ? "hover" : "default");
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
    };

    const onDown = () => gsap.to(ring.current, { scale: 0.8, duration: 0.25 });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", onLeaveWindow);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeaveWindow);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100 hidden pointer-fine:block">
      <div
        ref={ring}
        className={cn(
          "invisible fixed left-0 top-0 grid place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-ink",
          mode === "default" && "size-9 border-bone/50 mix-blend-difference",
          mode === "hover" && "size-16 border-bone bg-bone/10 mix-blend-difference",
          mode === "label" && "size-24 border-transparent bg-bone",
        )}
      >
        <span
          className={cn(
            "text-[0.6rem] uppercase tracking-[0.2em] text-ink transition-opacity duration-300",
            mode === "label" ? "opacity-100" : "opacity-0",
          )}
        >
          {label}
        </span>
      </div>
      <div
        ref={dot}
        className={cn(
          "invisible fixed left-0 top-0 size-1.5 rounded-full bg-bone mix-blend-difference transition-opacity duration-300",
          mode === "label" && "opacity-0",
        )}
      />
    </div>
  );
}
