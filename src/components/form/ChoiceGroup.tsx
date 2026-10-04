import { cn } from "@/lib/cn";

type Props = {
  legend: string;
  name: string;
  options: string[];
  required?: boolean;
  className?: string;
};

/** Radio group rendered as pills; the selected pill floods with ink. */
export default function ChoiceGroup({ legend, name, options, required, className }: Props) {
  return (
    <fieldset className={cn("flex flex-col gap-4", className)}>
      <legend className="mb-4 text-lg text-mute">
        {legend}
        {required && <span className="text-ember"> *</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="group relative cursor-pointer">
            <input type="radio" name={name} value={option} required={required} className="peer sr-only" />
            <span
              className={cn(
                "relative isolate block overflow-hidden rounded-full border border-bone/25 px-6 py-2.5 text-xs uppercase tracking-[0.2em]",
                "transition-[border-color,color] duration-500 hover:border-bone/70",
                "group-has-checked:border-bone group-has-checked:text-ink",
                "group-has-focus-visible:outline group-has-focus-visible:outline-1 group-has-focus-visible:outline-offset-4 group-has-focus-visible:outline-bone",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 translate-y-full rounded-full bg-bone transition-transform duration-500 ease-ink group-has-checked:translate-y-0"
              />
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
