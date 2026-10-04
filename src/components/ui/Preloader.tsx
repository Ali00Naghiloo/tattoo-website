"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/providers/IntroProvider";

import { Logo } from "./icons";

const PANELS = 5;
const MAX_WAIT_MS = 4000;

/** Resolves once fonts + window load are done (capped so we never hang). */
function whenLoaded() {
  const load = new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });
  const cap = new Promise<void>((resolve) => setTimeout(resolve, MAX_WAIT_MS));
  return Promise.race([Promise.all([load, document.fonts?.ready]), cap]);
}

/**
 * Counter + ink bar intro. Holds scroll until assets are ready, then lifts
 * away in staggered columns and flags the intro as ready for the hero.
 */
export default function Preloader() {
  const { setReady } = useIntro();
  const lenis = useLenis();
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!lenis) return;
    if (done) lenis.start();
    else lenis.stop();
  }, [lenis, done]);

  useGSAP(
    () => {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      if (prefersReducedMotion()) {
        setReady(true);
        setDone(true);
        return;
      }

      const loaded = whenLoaded();
      const counter = { value: 0 };
      const tl = gsap.timeline({ onComplete: () => setDone(true) });

      tl.from("[data-pl-logo]", { yPercent: 110, duration: 1.2 })
        .from("[data-pl-name] > span", { yPercent: 110, stagger: 0.04, duration: 1 }, "<0.1")
        .to(
          counter,
          {
            value: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
            },
          },
          0.2,
        )
        .to("[data-pl-bar]", { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0.2)
        .addPause("+=0", () => {
          loaded.then(() => tl.resume());
        })
        .to("[data-pl-content]", { yPercent: -30, autoAlpha: 0, duration: 0.8, ease: "ink.inOut" })
        .call(() => setReady(true), undefined, "-=0.25")
        .to("[data-pl-panel]", { yPercent: -100, duration: 1.1, stagger: { each: 0.06, from: "center" }, ease: "ink.inOut" }, "<");
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-95" aria-busy="true" aria-label="Loading">
      <div className="absolute inset-0 flex">
        {Array.from({ length: PANELS }, (_, i) => (
          <div key={i} data-pl-panel className="h-full flex-1 bg-coal outline outline-1 outline-coal" />
        ))}
      </div>

      <div data-pl-content className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
        <div className="overflow-hidden">
          <Logo data-pl-logo className="h-10 w-auto text-bone" />
        </div>
        <div data-pl-name className="eyebrow flex overflow-hidden">
          {Array.from(site.name).map((c, i) => (
            <span key={i} className="inline-block">
              {c === " " ? " " : c}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-6 bottom-8 flex items-end justify-between gap-6 md:inset-x-10 md:bottom-10">
          <span className="eyebrow">
            {site.city} — Est. {site.since}
          </span>
          <span ref={count} className="font-display text-6xl tabular-nums md:text-8xl leading-none">
            000
          </span>
        </div>
        <div data-pl-bar className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-bone/70" />
      </div>
    </div>
  );
}
