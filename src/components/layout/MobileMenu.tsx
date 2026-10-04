"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

import { InstagramIcon } from "@/components/ui/icons";
import Sigil from "@/components/ui/Sigil";
import { navItems, site } from "@/content/site";
import { useScrollTo } from "@/hooks/useScrollTo";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = { open: boolean; onClose: () => void };

/** Full-screen menu that irises open from the toggle button. */
export default function MobileMenu({ open, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const lenis = useLenis();
  const scrollTo = useScrollTo();

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: "visible" })
        .fromTo(
          root.current,
          { clipPath: "circle(0% at calc(100% - 3rem) 3rem)" },
          { clipPath: "circle(150% at calc(100% - 3rem) 3rem)", duration: 1.1, ease: "ink.inOut" },
        )
        .from("[data-menu-link]", { yPercent: 110, rotate: 4, stagger: 0.06, duration: 1 }, "-=0.55")
        .from("[data-menu-meta]", { autoAlpha: 0, y: 20, stagger: 0.08, duration: 0.8 }, "-=0.7")
        .from(".sigil-stroke", { drawSVG: "50% 50%", duration: 1.6, stagger: 0.05 }, "-=1.2");
    },
    { scope: root },
  );

  const wasOpen = useRef(false);
  useEffect(() => {
    const timeline = tl.current;
    if (!timeline || open === wasOpen.current) return;
    wasOpen.current = open;
    if (open) {
      timeline.timeScale(1).play();
      lenis?.stop();
    } else {
      timeline.timeScale(1.6).reverse();
      lenis?.start();
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className="invisible fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-surface px-6 pb-10 pt-32 md:px-10"
    >
      <Sigil className="pointer-events-none absolute -right-1/4 top-1/2 h-[120%] -translate-y-1/2 text-bone/10" />

      <nav className="relative">
        <ul className="flex flex-col gap-1">
          {navItems.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <a
                data-menu-link
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  scrollTo(item.href);
                }}
                className="group flex items-baseline gap-4 font-display text-[clamp(3rem,13vw,6rem)] leading-[1.05]"
              >
                <span className="font-sans text-xs tracking-widest text-mute">0{i + 1}</span>
                <span className="transition-[font-style,transform] duration-500 group-hover:translate-x-3 group-hover:italic">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative flex items-end justify-between gap-6">
        <a
          data-menu-meta
          href={site.instagram}
          target="_blank"
          rel="noreferrer"
          tabIndex={open ? 0 : -1}
          className="eyebrow flex items-center gap-2 transition-colors hover:text-bone"
        >
          <InstagramIcon className="size-4" /> Instagram
        </a>
        <span data-menu-meta className="eyebrow text-right">
          {site.city}
          <br />
          Since {site.since}
        </span>
      </div>
    </div>
  );
}
