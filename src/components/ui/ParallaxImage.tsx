"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  /** 0 = static, 0.1 = image drifts ±10% of its height through the viewport. */
  speed?: number;
  priority?: boolean;
  /** Reveals with a bottom-up clip wipe the first time it enters the viewport. */
  wipe?: boolean;
};

export default function ParallaxImage({ src, alt, sizes, className, speed = 0.1, priority, wipe = true }: Props) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const trigger = frame.current;

      gsap.fromTo(
        "[data-parallax]",
        { yPercent: -speed * 100 },
        { yPercent: speed * 100, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true } },
      );

      if (wipe) {
        const once = { trigger, start: "top 90%", once: true };
        gsap.from(trigger, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.6, ease: "ink.inOut", scrollTrigger: once });
        gsap.from("img", { scale: 1.35, duration: 2.2, scrollTrigger: once });
      }
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden [clip-path:inset(0%_0%_0%_0%)]", className)}>
      <div data-parallax className="absolute inset-x-0 -inset-y-[12%]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} placeholder="blur" className="object-cover" />
      </div>
    </div>
  );
}
