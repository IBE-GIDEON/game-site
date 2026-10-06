"use client";

import { useReady } from "@/lib/ready";

/**
 * A racing tyre drawn to sit in place of a capital "O" in display type.
 * Uses currentColor for the rubber so it matches the heading, red for the hub.
 * Leaned to match Saira's italic and spun once on load (see .tyre-spin in globals.css).
 */
export default function Tyre({ delay = 0 }: { delay?: number }) {
  // spin when the intro loader lifts, so a direct visit to /book still sees it
  const ready = useReady();
  const treads = Array.from({ length: 22 }, (_, i) => (i * 360) / 22);
  return (
    <span className="tyre" aria-hidden>
      <svg viewBox="0 0 100 100" className={ready ? "tyre-spin" : undefined} style={{ animationDelay: `${delay}s` }}>
        <defs>
          <mask id="tyre-tread">
            <rect width="100" height="100" fill="white" />
            {treads.map((a) => (
              <rect key={a} x="47" y="1" width="6" height="7" fill="black" transform={`rotate(${a} 50 50)`} />
            ))}
          </mask>
        </defs>
        {/* rubber with tread cut into the outer edge */}
        <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="17" mask="url(#tyre-tread)" />
        {/* rim, spokes and hub */}
        <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="3.5" />
        {[0, 72, 144, 216, 288].map((a) => (
          <line key={a} x1="50" y1="50" x2="50" y2="27" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" transform={`rotate(${a} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="8" fill="#e3101c" />
      </svg>
    </span>
  );
}
