"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Single place where GSAP plugins are registered.
 * Every component imports gsap from here instead of "gsap" directly.
 */
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase, useGSAP);

// Signature eases shared across the site (mirrored as CSS vars in globals.css).
CustomEase.create("ink", "0.16, 1, 0.3, 1"); // fast-out, long settle
CustomEase.create("ink.inOut", "0.87, 0, 0.13, 1"); // dramatic in-out

gsap.defaults({ ease: "ink", duration: 1.2 });

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const DESKTOP = "(min-width: 1024px)";
export const MOBILE = "(max-width: 1023px)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
