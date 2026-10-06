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

/** Racing helmet, side view, visor facing right. */
export function HelmetIcon({ size = 32, className }: P) {
  return (
    <svg {...base(size, className)}>
      <path d="M4.5 20.5C4.5 13 10 7.5 17 7.5c6 0 10.5 4.5 10.5 10.5v3a2 2 0 0 1-2 2H13l-2.5 2.5H6a1.5 1.5 0 0 1-1.5-1.5z" />
      <path d="M14.5 13.5h12.6" />
      <path d="M14.5 13.5v5h13" />
      <path d="M7.5 17.5c1.8-4.5 5-7 9-7.5" />
    </svg>
  );
}

/** Chequered flag on a pole. */
export function ChequeredFlagIcon({ size = 32, className }: P) {
  const flag = "M7.5 6c3-1.6 6 1.6 9 0s6-1.6 9 0v11c-3-1.6-6-1.6-9 0s-6 1.6-9 0z";
  return (
    <svg {...base(size, className)}>
      <defs>
        <clipPath id="kit-flag">
          <path d={flag} />
        </clipPath>
      </defs>
      <g clipPath="url(#kit-flag)" fill="currentColor" stroke="none">
        {[0, 1, 2, 3].flatMap((col) =>
          [0, 1, 2].map((row) =>
            (col + row) % 2 === 0 ? <rect key={`${col}-${row}`} x={7.5 + col * 4.5} y={4 + row * 4.5} width="4.5" height="4.5" /> : null,
          ),
        )}
      </g>
      <path d={flag} />
      <path d="M7.5 5v22.5" />
    </svg>
  );
}

/** Three people: a group racing together. */
export function GroupIcon({ size = 32, className }: P) {
  return (
    <svg {...base(size, className)}>
      <circle cx="16" cy="11" r="3.6" />
      <path d="M9.5 25.5a6.5 6.5 0 0 1 13 0" />
      <circle cx="7.5" cy="13.5" r="2.7" />
      <path d="M3 24a4.8 4.8 0 0 1 6.6-4.4" />
      <circle cx="24.5" cy="13.5" r="2.7" />
      <path d="M29 24a4.8 4.8 0 0 0-6.6-4.4" />
    </svg>
  );
}

/** 1-2-3 podium with a star over the winner's step. */
export function PodiumIcon({ size = 32, className }: P) {
  return (
    <svg {...base(size, className)}>
      <path d="M3 26.5h26" />
      <path d="M12 26.5V14h8v12.5" />
      <path d="M4.5 26.5V18.5H12" />
      <path d="M20 21h7.5v5.5" />
      <path d="M16 5.5l1.3 2.6 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4z" />
    </svg>
  );
}
