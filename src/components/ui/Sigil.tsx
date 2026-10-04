import { cn } from "@/lib/cn";

const AXIS_SEGMENTS = [
  [0, 30],
  [49, 108],
  [133, 308],
  [699, 870],
  [895, 957],
  [976, 1008],
];

/**
 * The studio's geometric mark (circle, oval, two diamonds and a centre axis),
 * drawn as strokes so it can be "inked" with DrawSVG. Parents animate the
 * `.sigil-stroke` elements and the `[data-sigil]` groups.
 */
export default function Sigil({ className }: { className?: string }) {
  const stroke = { className: "sigil-stroke", vectorEffect: "non-scaling-stroke" } as const;

  return (
    <svg
      viewBox="0 0 742 1008"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden
      className={cn("overflow-visible", className)}
    >
      <g data-sigil="axis">
        {AXIS_SEGMENTS.map(([y1, y2]) => (
          <line key={y1} {...stroke} x1="371" x2="371" y1={y1} y2={y2} />
        ))}
      </g>
      <g data-sigil="rings">
        <circle {...stroke} cx="371" cy="504" r="292" />
        <ellipse {...stroke} cx="371" cy="504" rx="292" ry="194" />
        <circle {...stroke} cx="371" cy="504" r="64" />
      </g>
      <g data-sigil="frames">
        <polygon {...stroke} points="371,134 741,504 371,874 1,504" />
        <polygon {...stroke} points="371,134 664.5,504 371,874 77.5,504" />
      </g>
      <circle cx="371" cy="504" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
