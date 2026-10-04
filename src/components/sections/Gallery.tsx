"use client";

import Image from "next/image";
import { useRef } from "react";

import ArrowButton from "@/components/ui/ArrowButton";
import SectionLabel from "@/components/ui/SectionLabel";
import Sigil from "@/components/ui/Sigil";
import { gallery, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { DESKTOP, gsap, useGSAP } from "@/lib/gsap";

/** Corner tiles: where they sit, and where they fly to as the centre opens. */
const CORNERS = [
  { className: "left-[4%] top-[12%] aspect-[4/5] w-[36vw] md:w-[19vw]", to: { xPercent: -140, yPercent: -60, rotate: -10 } },
  { className: "right-[4%] top-[8%] aspect-[4/3] w-[44vw] md:w-[27vw]", to: { xPercent: 130, yPercent: -70, rotate: 8 } },
  { className: "bottom-[8%] left-[6%] aspect-[4/3] w-[46vw] md:w-[25vw]", to: { xPercent: -130, yPercent: 80, rotate: 6 } },
  { className: "bottom-[10%] right-[6%] aspect-[3/4] w-[32vw] md:w-[16vw]", to: { xPercent: 140, yPercent: 70, rotate: -8 } },
];

const TITLE = "Gallery";

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const corners = gallery.slice(0, 4);
  const center = gallery[4];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // matchMedia only fires when at least one condition matches, so pair both
      // motion queries to guarantee the callback runs on every device.
      mm.add({ desktop: DESKTOP, motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
        const closed = desktop ? "inset(30% 34% 30% 34% round 4px)" : "inset(34% 22% 34% 22% round 4px)";
        const open = "inset(0% 0% 0% 0% round 0px)";

        if (reduce) {
          gsap.set("[data-gal-center]", { clipPath: open });
          gsap.set("[data-gal-corner]", { autoAlpha: 0 });
          gsap.set("[data-gal-overlay]", { opacity: 0.55 });
          return;
        }

        // Corners wipe in as the section approaches. (clip-path + inner scale only, so
        // they never fight the scrubbed transform tweens below.)
        const enter = { trigger: root.current, start: "top 75%", once: true };
        gsap.from("[data-gal-corner]", { clipPath: "inset(100% 0% 0% 0%)", stagger: 0.12, duration: 1.6, ease: "ink.inOut", scrollTrigger: enter });
        gsap.from("[data-gal-corner] img", { scale: 1.4, stagger: 0.12, duration: 2, scrollTrigger: enter });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
        });

        tl.to("[data-gal-label]", { autoAlpha: 0, y: -40, duration: 0.2 }, 0)
          .fromTo("[data-gal-center]", { clipPath: closed }, { clipPath: open, duration: 1, ease: "power2.inOut" }, 0)
          .fromTo("[data-gal-center] img", { scale: 1.45 }, { scale: 1, duration: 1, ease: "power2.inOut" }, 0);

        gsap.utils.toArray<HTMLElement>("[data-gal-corner]").forEach((el, i) => {
          tl.to(el, { ...CORNERS[i].to, scale: 1.5, duration: 1, ease: "power2.in" }, 0);
        });

        tl.fromTo("[data-gal-overlay]", { opacity: 0 }, { opacity: 0.6, duration: 0.5 }, 0.75)
          .fromTo(".sigil-stroke", { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", stagger: 0.03, duration: 0.6 }, 0.8)
          .fromTo("[data-gal-sigil]", { rotate: -30, scale: 0.8 }, { rotate: 0, scale: 1, duration: 0.9 }, 0.8)
          .fromTo(
            "[data-gal-char]",
            { autoAlpha: 0, xPercent: 60, rotateY: 100 },
            { autoAlpha: 1, xPercent: 0, rotateY: 0, stagger: 0.05, duration: 0.45, ease: "power3.out" },
            0.95,
          )
          .fromTo("[data-gal-cta]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 1.25)
          .to({}, { duration: 0.25 }); // hold the finished frame before unpinning
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="gallery" className="relative h-[340vh] bg-surface">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div data-gal-label className="absolute inset-x-0 top-[7%] z-10 flex justify-center">
          <SectionLabel index="02" label="Selected works" />
        </div>

        {corners.map((img, i) => (
          <figure
            key={img.alt}
            data-gal-corner
            data-cursor="Scroll"
            className={cn("group absolute overflow-hidden [clip-path:inset(0%_0%_0%_0%)]", CORNERS[i].className)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 27vw, 46vw"
              className="object-cover grayscale-70 transition-[filter,scale] duration-1000 ease-ink group-hover:scale-110 group-hover:grayscale-0"
            />
          </figure>
        ))}

        <div data-gal-center className="absolute inset-0 z-5 [clip-path:inset(30%_34%_30%_34%)]">
          <Image src={center.src} alt={center.alt} fill placeholder="blur" sizes="100vw" className="object-cover" />
        </div>

        <div data-gal-overlay className="pointer-events-none absolute inset-0 z-6 bg-ink opacity-0" />

        <div className="pointer-events-none absolute inset-0 z-7 grid place-items-center">
          <div data-gal-sigil className="h-[82%] text-bone/40">
            <Sigil className="h-full w-auto" />
          </div>
        </div>

        <div className="absolute inset-0 z-8 flex flex-col items-center justify-center gap-10 px-5">
          <h2 aria-label={TITLE} className="font-display font-light perspective-[900px] text-[clamp(4.5rem,17vw,16rem)] leading-none">
            {Array.from(TITLE).map((c, i) => (
              <span key={i} data-gal-char aria-hidden className={cn("inline-block", i === TITLE.length - 1 && "italic")}>
                {c}
              </span>
            ))}
          </h2>
          <div data-gal-cta>
            <ArrowButton href={site.instagram} target="_blank" rel="noreferrer" label="View on Instagram" />
          </div>
        </div>
      </div>
    </section>
  );
}
