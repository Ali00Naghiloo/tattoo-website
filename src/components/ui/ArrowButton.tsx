import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import { ArrowIcon } from "./icons";
import Magnetic from "./Magnetic";
import RollingText from "./RollingText";

type BaseProps = { label: string; className?: string; size?: "md" | "lg" };
type AnchorProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;
type ButtonProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/**
 * Pill CTA: a liquid fill floods out of the arrow badge on hover while the
 * label rolls and the diamond spins. Renders an <a> when `href` is given.
 */
export default function ArrowButton(props: AnchorProps | ButtonProps) {
  const { label, className, size = "md", ...rest } = props;

  const classes = cn(
    "group relative isolate inline-flex items-center gap-5 overflow-hidden rounded-full border border-bone/25 p-1.5 text-bone",
    "transition-[border-color,opacity] duration-500 hover:border-bone disabled:pointer-events-none disabled:opacity-50",
    size === "lg" && "btn-lg",
    className,
  );

  const content = (
    <>
      <span aria-hidden className="btn-fill absolute inset-0 -z-10 rounded-full bg-bone" />
      <span
        className={cn(
          "pl-6 uppercase tracking-[0.25em] transition-colors duration-500 group-hover:text-ink",
          size === "lg" ? "text-xs md:text-sm" : "text-[0.7rem]",
        )}
      >
        <RollingText text={label} />
      </span>
      <span
        aria-hidden
        className={cn(
          "relative grid place-items-center transition-colors duration-500 group-hover:text-ink",
          size === "lg" ? "size-14 md:size-16" : "size-12",
        )}
      >
        <span className="absolute inset-0 rounded-full border border-current opacity-40" />
        <span className="absolute inset-[24%] rotate-45 border border-current opacity-60 transition-transform duration-[900ms] ease-ink group-hover:rotate-[225deg]" />
        <span className="relative size-3.5 overflow-hidden">
          <ArrowIcon className="absolute inset-0 transition-transform duration-500 ease-ink group-hover:translate-x-full" />
          <ArrowIcon className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-ink group-hover:translate-x-0" />
        </span>
      </span>
    </>
  );

  return (
    <Magnetic strength={0.2}>
      {rest.href !== undefined ? (
        <a {...(rest as Omit<AnchorProps, keyof BaseProps>)} className={classes}>
          {content}
        </a>
      ) : (
        <button type="button" {...(rest as Omit<ButtonProps, keyof BaseProps>)} className={classes}>
          {content}
        </button>
      )}
    </Magnetic>
  );
}
