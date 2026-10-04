import { cn } from "@/lib/cn";

type Props = {
  text: string;
  className?: string;
  /** Delay between characters, in seconds. */
  stagger?: number;
};

/**
 * Per-character "slot machine" roll on hover. The closest ancestor with the
 * `group` class drives it, so whole links/buttons trigger the effect.
 */
export default function RollingText({ text, className, stagger = 0.016 }: Props) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex">
        {Array.from(text).map((char, i) => {
          const glyph = char === " " ? " " : char;
          const style = { transitionDelay: `${i * stagger}s` };
          return (
            <span key={i} className="relative inline-block overflow-hidden">
              <span
                style={style}
                className="inline-block transition-transform duration-[650ms] ease-ink group-hover:-translate-y-full group-focus-visible:-translate-y-full"
              >
                {glyph}
              </span>
              <span
                style={style}
                className="absolute left-0 top-full inline-block transition-transform duration-[650ms] ease-ink group-hover:-translate-y-full group-focus-visible:-translate-y-full"
              >
                {glyph}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
