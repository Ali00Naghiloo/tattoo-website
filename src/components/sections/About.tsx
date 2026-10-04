"use client";

import Image from "next/image";
import { useRef } from "react";

import ArrowButton from "@/components/ui/ArrowButton";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitReveal from "@/components/ui/SplitReveal";
import { about } from "@/content/site";
import { useScrollTo } from "@/hooks/useScrollTo";
import { DESKTOP, gsap, useGSAP } from "@/lib/gsap";

/** Arch-shaped clip: the revealed area keeps a semicircular top as it rises. */
const arch = (top: number) => `inset(${top}% 0% 0% 0% round 9999px 9999px 0px 0px)`;

export default function About() {
  const root = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  const [first, second] = about.images;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and (prefers-reduced-motion: no-preference)`, () => {
        // Arch frame inks in on entry.
        gsap.from("[data-about-frame]", {
          clipPath: arch(100),
          duration: 1.8,
          ease: "ink.inOut",
          scrollTrigger: { trigger: "[data-about-frame]", start: "top 80%", once: true },
        });

        // While pinned: swap images, roll the counter, turn the ring.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: "[data-about-track]", start: "top top", end: "bottom bottom", scrub: 0.6 },
          })
          .to("[data-about-img='1'] img", { scale: 1.2, yPercent: -6 }, 0)
          .fromTo("[data-about-img='2']", { clipPath: arch(100) }, { clipPath: arch(0), ease: "power2.inOut" }, 0.15)
          .fromTo("[data-about-img='2'] img", { scale: 1.35 }, { scale: 1 }, 0.15)
          .to("[data-about-count]", { yPercent: -50, ease: "power2.inOut" }, 0.35)
          .to("[data-about-ring]", { rotate: 140 }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="relative overflow-clip bg-surface">
      <div data-about-track className="relative lg:h-[260vh]">
        <div className="relative grid gap-20 px-5 py-28 md:px-10 md:py-40 lg:sticky lg:top-0 lg:h-svh lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-0">
          {/* Orbiting ring */}
          <div
            aria-hidden
            data-about-ring
            className="pointer-events-none absolute left-0 top-1/2 hidden size-[130vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line lg:block"
          >
            <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember" />
            <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-bone/50" />
          </div>

          {/* Copy */}
          <div className="relative z-10 flex flex-col gap-10 lg:pl-[8%]">
            <SectionLabel index="01" label="About the artist" />
            <SplitReveal as="h2" type="chars" className="font-display font-light text-[clamp(3.6rem,8vw,8.5rem)] leading-[0.9]">
              <span className="block">Passion</span>
              <span className="block pl-[14%] italic">&amp; precision</span>
            </SplitReveal>
            <SplitReveal as="p" delay={0.15} className="max-w-md text-base text-mute md:text-lg leading-relaxed">
              {about.intro}
            </SplitReveal>
            <Reveal className="grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <div className="font-display text-4xl md:text-5xl">{fact.value}</div>
                  <div className="eyebrow mt-2 !text-[0.6rem] leading-snug">{fact.label}</div>
                </div>
              ))}
            </Reveal>
            <Reveal>
              <ArrowButton
                href="#contact"
                label="Book a session"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
              />
            </Reveal>
          </div>

          {/* Desktop: pinned arch with scroll-driven image swap */}
          <div className="relative hidden h-[78vh] lg:block">
            <div data-about-frame className="relative mx-auto aspect-[3/4] h-full max-w-full overflow-hidden rounded-t-full">
              <div data-about-img="1" className="absolute inset-0">
                <Image src={first.src} alt={first.alt} fill sizes="40vw" placeholder="blur" className="object-cover" />
              </div>
              <div data-about-img="2" className="absolute inset-0 [clip-path:inset(100%_0%_0%_0%)]">
                <Image src={second.src} alt={second.alt} fill sizes="40vw" placeholder="blur" className="object-cover" />
              </div>
            </div>
            <div className="absolute bottom-8 left-0 flex items-end gap-3">
              <div className="h-[1em] overflow-hidden font-display text-7xl leading-none">
                <div data-about-count className="flex flex-col">
                  <span>01</span>
                  <span>02</span>
                </div>
              </div>
              <span className="eyebrow pb-2">/ 02</span>
            </div>
          </div>

          {/* Mobile: parallax collage */}
          <div className="relative order-first pb-14 lg:hidden">
            <ParallaxImage src={first.src} alt={first.alt} sizes="80vw" className="aspect-[3/4] w-[78%] rounded-t-full" />
            <ParallaxImage
              src={second.src}
              alt={second.alt}
              sizes="45vw"
              speed={0.18}
              className="absolute bottom-0 right-0 aspect-square w-[46%] outline outline-8 outline-surface"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
