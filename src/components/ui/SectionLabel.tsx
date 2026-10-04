import { cn } from "@/lib/cn";

/** Editorial section marker: "(02) ——— Gallery". */
export default function SectionLabel({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <div className={cn("eyebrow flex items-center gap-4", className)}>
      <span className="text-bone">({index})</span>
      <span className="h-px w-12 bg-line" />
      <span>{label}</span>
    </div>
  );
}
