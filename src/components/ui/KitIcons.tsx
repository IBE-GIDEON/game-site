/**
 * Line icons for the sim rig hardware, drawn on a 32px grid with one stroke weight.
 * They inherit currentColor, so they sit in white on the dark pages.
 */

type P = { size?: number; className?: string };

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

/** Formula-style sim wheel: side grips, centre display, shift lights. */
export function WheelIcon({ size = 32, className }: P) {
  return (
    <svg {...base(size, className)}>
      <rect x="3.5" y="9" width="5.5" height="15" rx="2.75" />
      <rect x="23" y="9" width="5.5" height="15" rx="2.75" />
      <path d="M9 12h14v8.5a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2z" />
      <rect x="12.5" y="14" width="7" height="4" rx="0.8" />
      <circle cx="13" cy="9" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="19" cy="9" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Three-pedal set on a base plate, brake standing tallest. */
export function PedalsIcon({ size = 32, className }: P) {
  return (
    <svg {...base(size, className)}>
      <rect x="5.5" y="11" width="5.5" height="11" rx="1.4" />
      <rect x="13.25" y="7.5" width="5.5" height="14.5" rx="1.4" />
      <rect x="21" y="11" width="5.5" height="11" rx="1.4" />
      <path d="M16 13v4" />
      <path d="M4 26h24" />
      <path d="M8.25 22v4M16 22v4M23.75 22v4" />
    </svg>
  );
}

/** Side view of a sim rig: seat and wheel mount on an aluminium frame. */
export function CockpitIcon({ size = 32, className }: P) {
  return (
    <svg {...base(size, className)}>
      <path d="M3.5 26.5h25" />
      <path d="M6 26.5v-3.5h20v3.5" />
      <path d="M8.5 23l2.2-13.3a1.6 1.6 0 0 1 2.4-1.1l.5.3-1.4 10.6h6.3a1.8 1.8 0 0 1 1.8 1.8V23" />
      <path d="M24 23v-9" />
      <path d="M24 14l3-2.5" />
      <path d="M21.5 14h5" />
    </svg>
  );
}

/** Curved ultrawide monitor on a stand. */
export function UltrawideIcon({ size = 32, className }: P) {
  return (
    <svg {...base(size, className)}>
      <path d="M3.5 8.5Q16 5.5 28.5 8.5v11Q16 16.5 3.5 19.5z" />
      <path d="M16 18v6" />
      <path d="M11 25.5h10" />
    </svg>
  );
}
