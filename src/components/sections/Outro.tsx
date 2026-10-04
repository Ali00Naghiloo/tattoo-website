"use client";

import Image from "next/image";
import { useRef } from "react";

import outroBg from "@public/images/outro-bg.jpg";

import { ArrowUpIcon, InstagramIcon } from "@/components/ui/icons";
import Magnetic from "@/components/ui/Magnetic";
import RollingText from "@/components/ui/RollingText";
import Sigil from "@/components/ui/Sigil";
import SplitReveal from "@/components/ui/SplitReveal";
import { site } from "@/content/site";
import { useScrollTo } from "@/hooks/useScrollTo";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

// TODO: point these at the real legal pages once they exist.
const legalLinks = [
  { label: "Imprint", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export default function Outro() {
  const root = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: 1 },
        })
        .fromTo("[data-outro-bg]", { scale: 1.25, yPercent: -10 }, { scale: 1, yPercent: 0 }, 0)
        .fromTo(".sigil-stroke", { drawSVG: "0%" }, { drawSVG: "100%", stagger: 0.04 }, 0)
        .fromTo("[data-outro-sigil]", { rotate: 45, scale: 0.6 }, { rotate: 0, scale: 1 }, 0);
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-ink">
      <div className="relative flex min-h-svh flex-col items-center justify-center px-5">
        <div data-outro-bg className="absolute inset-0">
          <Image src={outroBg} alt="" fill sizes="100vw" placeholder="blur" className="object-cover opacity-70" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-surface via-transparent to-ink" />

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div data-outro-sigil className="h-[84%] text-bone/25">
            <Sigil className="h-full w-auto" />
          </div>
        </div>

        <a
          href={site.instagram}
          target="_blank"
          rel="noreferrer"
          data-cursor="Follow"
          className="group relative z-10 flex flex-col items-center px-6 py-10 text-center"
        >
          <span className="eyebrow mb-6 transition-[letter-spacing,color] duration-700 ease-ink group-hover:tracking-[0.5em] group-hover:text-bone">
            Next chapter
          </span>
          <SplitReveal as="span" type="chars" className="block font-display font-light text-[clamp(4rem,13vw,12.5rem)] leading-[0.88]">
            <span className="block">Follow the</span>
            <span className="block italic transition-colors duration-700 group-hover:text-ember">ink</span>
          </SplitReveal>
          <span
            aria-hidden
            className="absolute -inset-x-[8%] top-1/2 h-px origin-left scale-x-0 bg-bone transition-transform duration-[1200ms] ease-ink-in-out group-hover:scale-x-100"
          />
        </a>
      </div>

      <div className="relative z-10 flex flex-col gap-8 border-t border-line px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <span className="eyebrow">
          © {new Date().getFullYear()} {site.name}
        </span>

        <nav aria-label="Footer" className="eyebrow flex flex-wrap gap-x-8 gap-y-3">
          {legalLinks.map((link) => (
            <a key={link.label} href={link.href} className="group transition-colors hover:text-bone">
              <RollingText text={link.label} />
            </a>
          ))}
          <a href={site.instagram} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 transition-colors hover:text-bone">
            <InstagramIcon className="size-3.5" />
            <RollingText text="Instagram" />
          </a>
        </nav>

        <div className="flex items-center justify-between gap-8">
          <span className="eyebrow">
            Design &amp; code by{" "}
            <a href={site.credit.href} className="text-bone underline-offset-4 hover:underline">
              {site.credit.label}
            </a>
          </span>
          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => scrollTo("#top")}
              aria-label="Back to top"
              className="group grid size-12 place-items-center rounded-full border border-bone/25 transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
            >
              <span className="relative size-4 overflow-hidden">
                <ArrowUpIcon className="absolute inset-0 transition-transform duration-500 ease-ink group-hover:-translate-y-full" />
                <ArrowUpIcon className="absolute inset-0 translate-y-full transition-transform duration-500 ease-ink group-hover:translate-y-0" />
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
