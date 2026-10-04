"use client";

import Image, { getImageProps } from "next/image";
import { useRef } from "react";

import leaves from "@public/images/hero/leaves.png";
import portraitMobile from "@public/images/hero/portrait-mobile.jpg";
import portraitTablet from "@public/images/hero/portrait-tablet.jpg";
import portrait from "@public/images/hero/portrait.png";
import texture from "@public/images/hero/texture.jpg";

import { site, styles } from "@/content/site";
import { useScrollTo } from "@/hooks/useScrollTo";
import { DESKTOP, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/providers/IntroProvider";

const PORTRAIT_ALT = "Nicki, the artist behind Wonderkin Tattoo, with a botanical sleeve";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useIntro();
  const scrollTo = useScrollTo();

  // Art-directed portrait for small screens (desktop uses the cut-out composition).
  const { props: tablet } = getImageProps({ src: portraitTablet, alt: PORTRAIT_ALT, sizes: "100vw" });
  const { props: mobile } = getImageProps({ src: portraitMobile, alt: PORTRAIT_ALT, sizes: "100vw" });

  // Scroll-out + mouse depth. Runs immediately; independent of the intro.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ desktop: DESKTOP, motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
        const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
        if (!motion) return;

        const out = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        out
          .to("[data-hero-title]", { yPercent: -60, autoAlpha: 0.2 }, 0)
          .to("[data-hero-bg]", { yPercent: 30, scale: 1.15 }, 0)
          .to("[data-hero-shade]", { opacity: 0.85 }, 0)
          .to("[data-hero-meta-wrap]", { yPercent: -120, autoAlpha: 0 }, 0);

        if (desktop) {
          out
            .to("[data-layer='arch']", { yPercent: 12, scaleY: 1.08 }, 0)
            .to("[data-layer='portrait']", { yPercent: 10, scale: 1.06 }, 0)
            .to("[data-layer='leaves']", { yPercent: -18, scale: 1.2 }, 0);
        } else {
          out.to("[data-layer='photo']", { yPercent: 18, scale: 1.08 }, 0);
        }

        if (!desktop || !window.matchMedia("(pointer: fine)").matches) return;

        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => ({
          depth: Number(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach(({ depth, x, y }) => {
            x(nx * depth * -40);
            y(ny * depth * -20);
          });
        };
        root.current?.addEventListener("pointermove", onMove);
        return () => root.current?.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root },
  );

  // Entrance, fired once the preloader lifts.
  useGSAP(
    () => {
      if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create("[data-hero-title] h1", { type: "words,chars", mask: "words" });

      gsap
        .timeline()
        .from("[data-hero-bg] img", { scale: 1.35, duration: 2.6 }, 0)
        .from("[data-hero-arch]", { scaleY: 0, duration: 1.7, ease: "ink.inOut" }, 0)
        .from("[data-hero-portrait]", { yPercent: 35, autoAlpha: 0, duration: 1.9 }, 0.45)
        .from("[data-hero-photo]", { scale: 1.3, autoAlpha: 0, duration: 2.2 }, 0)
        .from("[data-hero-leaves]", { yPercent: 45, rotate: -5, autoAlpha: 0, duration: 2.1 }, 0.55)
        .from(split.chars, { yPercent: 115, rotate: 10, stagger: 0.035, duration: 1.5 }, 0.6)
        .from("[data-hero-meta]", { autoAlpha: 0, y: 24, stagger: 0.08, duration: 1.1 }, 1.1);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} id="top" className="relative h-svh min-h-[620px] overflow-hidden bg-coal">
      {/* Texture */}
      <div data-hero-bg className="absolute inset-0">
        <Image src={texture} alt="" fill priority sizes="100vw" placeholder="blur" className="object-cover opacity-45" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_20%,rgba(13,13,13,0.9)_100%)]" />

      {/* Desktop composition: arch + cut-out portrait + leaves */}
      {/*
        Each piece is an outer box that does the CSS centring and an inner `data-layer`
        that GSAP moves. Keep them separate: GSAP resets the CSS `translate` of any
        element it transforms, which would knock the composition off-centre.
      */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute -bottom-[6%] left-1/2 w-[84vw] max-w-[1500px] -translate-x-1/2">
          <div data-layer="leaves" data-depth="1.8">
            <Image data-hero-leaves src={leaves} alt="" sizes="84vw" className="h-auto w-full brightness-75" />
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 h-[72%] w-[min(30vw,500px)] -translate-x-1/2">
          <div data-layer="arch" data-depth="0.5" className="size-full origin-bottom">
            <div data-hero-arch className="size-full origin-bottom rounded-t-full bg-stone shadow-[inset_0_40px_80px_rgba(0,0,0,0.25)]" />
          </div>
        </div>
        {/* The subject sits ~5% right of the PNG's centre, so offset by -55% (not -50%) to centre her in the arch. */}
        <div className="absolute bottom-0 left-1/2 aspect-[884/1169] h-[80%] translate-x-[-55%]">
          <div data-layer="portrait" data-depth="1" className="relative size-full origin-bottom">
            <Image
              data-hero-portrait
              src={portrait}
              alt={PORTRAIT_ALT}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 1px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: full-bleed art-directed photo */}
      <div data-layer="photo" className="absolute inset-0 lg:hidden">
        <picture>
          <source media="(min-width: 640px)" srcSet={tablet.srcSet} sizes={tablet.sizes} />
          <img {...mobile} alt={PORTRAIT_ALT} data-hero-photo className="size-full object-cover object-top" />
        </picture>
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-ink/50" />
      </div>

      {/* Darkens everything while scrolling out */}
      <div data-hero-shade className="pointer-events-none absolute inset-0 z-30 bg-ink opacity-0" />

      {/* Title */}
      <div data-hero-title data-depth="-0.6" className="absolute inset-x-0 bottom-[16%] z-20 px-4 lg:bottom-[7%]">
        <h1 className="text-center font-display font-light tracking-[-0.02em] text-[clamp(3.4rem,18vw,9rem)] lg:whitespace-nowrap lg:text-[clamp(6rem,12vw,14rem)] leading-[0.82]">
          <span className="block lg:inline">Wonderkin </span>
          <em className="block font-normal italic lg:inline">Tattoo</em>
        </h1>
      </div>

      {/* Meta */}
      <div data-hero-meta-wrap className="pointer-events-none absolute inset-0 z-20">
        <ul data-hero-meta className="eyebrow absolute left-10 top-[30%] hidden flex-col gap-2 lg:flex">
          {styles.slice(0, 3).map((s) => (
            <li key={s} className="flex items-center gap-3">
              <span className="h-px w-5 bg-line" />
              {s}
            </li>
          ))}
        </ul>
        <p data-hero-meta className="absolute right-10 top-[30%] hidden max-w-[17rem] text-sm text-bone/70 lg:block leading-relaxed">
          A private tattoo studio in {site.city}, crafting custom pieces with patience and precision since {site.since}.
        </p>
        <p data-hero-meta className="eyebrow absolute inset-x-0 top-[22%] text-center lg:hidden">
          Tattoo studio — {site.city}
        </p>
      </div>

      {/* Scroll cue */}
      <a
        data-hero-meta
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#about");
        }}
        className="eyebrow group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 lg:bottom-auto lg:left-10 lg:top-[62%] lg:translate-x-0 lg:flex-row"
      >
        <span className="relative block h-10 w-px overflow-hidden bg-line lg:order-2">
          <span className="absolute inset-0 animate-scroll-cue bg-bone" />
        </span>
        <span className="transition-colors group-hover:text-bone">Scroll</span>
      </a>
    </section>
  );
}
