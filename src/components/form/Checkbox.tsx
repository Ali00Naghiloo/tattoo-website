import type { ReactNode } from "react";

type Props = { name: string; required?: boolean; children: ReactNode };

/** Square checkbox whose tick draws itself in. */
export default function Checkbox({ name, required, children }: Props) {
  return (
    <label className="group flex cursor-pointer items-start gap-4">
      <input type="checkbox" name={name} required={required} className="peer sr-only" />
      <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center border border-bone/40 transition-colors duration-300 group-hover:border-bone group-has-checked:border-bone group-has-checked:bg-bone group-has-focus-visible:outline group-has-focus-visible:outline-1 group-has-focus-visible:outline-offset-4 group-has-user-invalid:border-ember">
        <svg viewBox="0 0 24 24" className="size-3.5 text-ink" aria-hidden>
          <path
            d="M4 12.5l5 5L20 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            pathLength={1}
            className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] delay-100 duration-500 ease-ink group-has-checked:[stroke-dashoffset:0]"
          />
        </svg>
      </span>
      <span className="text-sm text-mute leading-relaxed">
        {children}
        {required && <span className="text-ember"> *</span>}
      </span>
    </label>
  );
}
