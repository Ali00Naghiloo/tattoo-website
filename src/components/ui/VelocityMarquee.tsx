"use client";

import { useLenis } from "lenis/react";
import { Fragment, useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Props = {
  items: string[];
  /** Base speed in % of the track per second. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
};

/**
 * Endless marquee that accelerates, skews and flips direction with the
 * user's scroll velocity.
 */
export default function VelocityMarquee({ items, speed = 2, reverse = false, className, itemClassName }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const velocity = useRef(0);
  const direction = useRef(reverse ? 1 : -1);

  useLenis(({ velocity: v, direction: d }) => {
    velocity.current = v;
    if (d) direction.current = (reverse ? -1 : 1) * -d;
  });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const wrap = gsap.utils.wrap(-50, 0);
      const setX = gsap.quickSetter(track.current, "xPercent");
      const skewTo = gsap.quickTo(track.current, "skewX", { duration: 0.5, ease: "power3" });
      let x = 0;

      const tick = (_time: number, deltaMs: number) => {
        const boost = Math.min(Math.abs(velocity.current), 80) * 0.12;
        x = wrap(x + direction.current * (speed + boost) * (deltaMs / 1000));
        setX(x);
        skewTo(gsap.utils.clamp(-10, 10, velocity.current * -0.3));
        velocity.current *= 0.92;
      };

      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root },
  );

  const row = (copy: number) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0}>
      {items.map((item) => (
        <Fragment key={`${copy}-${item}`}>
          <span className={cn("px-[0.35em] whitespace-nowrap", itemClassName)}>{item}</span>
          <span className="text-[0.35em] text-ember">✦</span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div ref={root} className={cn("overflow-hidden", className)}>
      <div ref={track} className="flex w-max will-change-transform">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
