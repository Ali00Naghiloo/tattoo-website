"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import ParallaxImage from "@/components/ui/ParallaxImage";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitReveal from "@/components/ui/SplitReveal";
import { testimonials } from "@/content/site";
import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-quote]").forEach((article, i) => {
        // Drive the sticky image stack.
        ScrollTrigger.create({
          trigger: article,
          start: "top center",
          end: "bottom center",
          onToggle: ({ isActive }) => isActive && setActive(i),
        });

        if (prefersReducedMotion()) return;

        // Words "ink in" as you read.
        SplitText.create(article.querySelector("blockquote"), {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.12 },
              {
                opacity: 1,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: { trigger: article, start: "top 70%", end: "center 40%", scrub: true },
              },
            ),
        });

        gsap.from(article.querySelectorAll("[data-quote-meta]"), {
          autoAlpha: 0,
          y: 30,
          stagger: 0.1,
          scrollTrigger: { trigger: article, start: "top 75%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="voices" className="relative bg-ink py-28 md:py-40">
      <header className="flex flex-col gap-10 px-5 md:px-10 lg:pl-[45%]">
        <SectionLabel index="03" label="Client voices" />
        <SplitReveal as="h2" type="chars" className="font-display font-light uppercase text-[clamp(3.6rem,9vw,9rem)] leading-[0.9]">
          <span className="block">Customer</span>
          <span className="block pl-[20%] italic normal-case">voices</span>
        </SplitReveal>
      </header>

      <div className="mt-16 grid gap-10 px-5 md:px-10 lg:mt-10 lg:grid-cols-2 lg:gap-24">
        {/* Desktop: sticky stack that wipes to the active client's image */}
        <div className="hidden lg:block">
          <div className="sticky top-[12vh] h-[76vh]">
            <div className="relative h-full overflow-hidden">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  style={{ zIndex: i }}
                  className={cn(
                    "absolute inset-0 transition-[clip-path] duration-[1400ms] ease-ink-in-out",
                    i <= active ? "[clip-path:inset(0%_0%_0%_0%)]" : "[clip-path:inset(100%_0%_0%_0%)]",
                  )}
                >
                  <Image
                    src={t.image}
                    alt={`Tattoo by Nicki for ${t.name}`}
                    fill
                    sizes="45vw"
                    placeholder="blur"
                    className={cn(
                      "object-cover transition-[scale] duration-[1800ms] ease-ink",
                      i === active ? "scale-100" : "scale-125",
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="absolute -bottom-2 left-0 flex translate-y-full items-end gap-3 pt-4">
              <div className="h-[1em] overflow-hidden font-display text-5xl leading-none">
                <div
                  className="flex flex-col transition-transform duration-1000 ease-ink"
                  style={{ transform: `translateY(-${(active * 100) / testimonials.length}%)` }}
                >
                  {testimonials.map((t, i) => (
                    <span key={t.name}>{pad(i + 1)}</span>
                  ))}
                </div>
              </div>
              <span className="eyebrow pb-1">/ {pad(testimonials.length)}</span>
            </div>
          </div>
        </div>

        {/* Quotes */}
        <div className="flex flex-col">
          {testimonials.map((t) => (
            <article
              key={t.name}
              data-quote
              className="flex flex-col justify-center gap-8 border-b border-line py-16 last:border-b-0 lg:min-h-svh lg:border-b-0 lg:py-0"
            >
              <ParallaxImage src={t.image} alt={`Tattoo by Nicki for ${t.name}`} sizes="100vw" className="aspect-[4/3] w-full lg:hidden" />
              <span data-quote-meta aria-hidden className="h-10 font-display text-8xl text-ember leading-[0.8]">
                &ldquo;
              </span>
              <blockquote className="font-display font-light text-[clamp(1.5rem,2.4vw,2.5rem)] leading-[1.25]">{t.quote}</blockquote>
              <footer data-quote-meta className="flex items-center gap-4">
                <span className="h-px w-10 bg-bone/40" />
                <cite className="eyebrow not-italic !text-bone">{t.name}</cite>
                <span className="eyebrow">Client</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
