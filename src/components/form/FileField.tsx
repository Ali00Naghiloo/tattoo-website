"use client";

import { useRef, useState, type DragEvent } from "react";

import { cn } from "@/lib/cn";

type Props = { label: string; name: string; accept?: string; className?: string };

/** Drag-and-drop (or click) upload for a design reference. */
export default function FileField({ label, name, accept = "image/*,.pdf", className }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (!files.length || !input.current) return;
    input.current.files = files;
    setFileName(files[0].name);
  };

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={cn(
        "group relative flex cursor-pointer items-center gap-5 border border-dashed border-bone/25 p-5 transition-colors duration-500 hover:border-bone/60 has-focus-visible:border-bone",
        dragging && "border-bone bg-bone/5",
        className,
      )}
    >
      <input
        ref={input}
        type="file"
        name={name}
        accept={accept}
        className="sr-only"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
      <span
        aria-hidden
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-full border border-bone/30 text-xl font-light transition-transform duration-700 ease-ink group-hover:rotate-90",
          dragging && "rotate-90 scale-110",
        )}
      >
        +
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-base text-bone">{fileName ?? label}</span>
        <span className="eyebrow mt-1 !text-[0.6rem]">{fileName ? "Click to replace" : "Drop an image here or click to browse"}</span>
      </span>
    </label>
  );
}
