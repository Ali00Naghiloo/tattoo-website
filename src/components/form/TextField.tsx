import { useId, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type Props = {
  label: string;
  name: string;
  multiline?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, "name" | "placeholder">;

/** Underlined field with a floating label and an ink line that draws on focus. */
export default function TextField({ label, name, multiline, required, className, type = "text", ...rest }: Props) {
  const id = useId();
  const Field = multiline ? "textarea" : "input";
  // Inputs that always show their own UI text keep the label raised.
  const pinned = type === "date";

  return (
    <div className={cn("relative pt-6", className)}>
      <Field
        id={id}
        name={name}
        type={multiline ? undefined : type}
        rows={multiline ? 2 : undefined}
        required={required}
        placeholder=" "
        className="peer block w-full resize-none border-0 border-b border-bone/20 bg-transparent pb-3 text-lg text-bone [field-sizing:content] focus:outline-none focus-visible:outline-none user-invalid:border-ember/60"
        {...rest}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 top-6 origin-left text-lg text-mute transition-[translate,scale,color] duration-500 ease-ink",
          "peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-bone",
          "peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75",
          pinned && "-translate-y-6 scale-75",
        )}
      >
        {label}
        {required && <span className="text-ember"> *</span>}
      </label>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-700 ease-ink peer-focus:scale-x-100 peer-user-invalid:scale-x-100 peer-user-invalid:bg-ember"
      />
    </div>
  );
}
