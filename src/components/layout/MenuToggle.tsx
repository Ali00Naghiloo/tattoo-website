import { cn } from "@/lib/cn";

type Props = { open: boolean; onToggle: () => void; className?: string };

/** Two-line burger that crosses into an X. */
export default function MenuToggle({ open, onToggle, className }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn("group relative grid size-12 place-items-center rounded-full border border-bone/20", className)}
    >
      <span
        className={cn(
          "absolute h-px w-5 bg-bone transition-transform duration-700 ease-ink",
          open ? "rotate-45" : "-translate-y-[4px] group-hover:-translate-y-[5px]",
        )}
      />
      <span
        className={cn(
          "absolute h-px bg-bone transition-[transform,width] duration-700 ease-ink",
          open ? "w-5 -rotate-45" : "w-3 translate-x-1 translate-y-[4px] group-hover:w-5 group-hover:translate-x-0 group-hover:translate-y-[5px]",
        )}
      />
    </button>
  );
}
