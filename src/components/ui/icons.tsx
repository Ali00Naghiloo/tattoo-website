import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function Logo(props: IconProps) {
  return (
    <svg viewBox="0 0 40 27" fill="currentColor" aria-hidden {...props}>
      <path d="M18.9302 26.832L14.4512 8.99805H14.3252L9.67676 26.8311H8.83203L2.87402 2.87207C2.45102 1.22407 2.23908 0.801875 1.18408 0.671875L0.12793 0.586914L0.000976562 -0.00292969H7.81885L7.69189 0.586914L6.29785 0.671875C5.36785 0.713875 4.94476 1.13694 5.15576 1.93994L10.0562 22.2642H10.1821L14.1118 7.43311L12.9712 2.87012C12.5492 1.22212 12.3368 0.799922 11.2808 0.669922L10.2241 0.584961L10.0972 -0.00488281H17.7881L17.6611 0.584961L16.2671 0.669922C15.3381 0.711922 14.913 1.13499 15.125 1.93799L20.0249 22.2622H20.1519L24.5049 3.96191C25.1389 1.38491 24.9278 0.793109 23.2788 0.662109L22.1382 0.577148L22.0122 -0.0131836H39.5332L39.998 6.74707H39.4067L39.1528 5.35205C38.6038 2.35205 36.872 0.704102 34.167 0.704102H33.1948V25.0039C33.1948 25.4269 33.3628 25.6802 34.6738 25.7222L36.4478 25.8081L36.5742 26.3989H27.2739L27.3999 25.8081L29.1748 25.7222C30.4858 25.6802 30.6538 25.4269 30.6538 25.0039V0.704102H29.978C27.329 0.704102 25.722 2.38784 24.915 5.36084C24.862 5.57384 24.8089 5.79583 24.7539 6.02783L19.7681 26.8188L18.9302 26.832Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden {...props}>
      <path d="M12 20V4M6 10l6-6 6 6" />
    </svg>
  );
}
