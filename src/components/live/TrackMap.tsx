"use client";

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";
import type { RowState } from "./useRaceSim";

// Stylised outline of Circuit de Barcelona-Catalunya (clockwise from the start line).
export const TRACK_PATH =
  "M 120 270 L 400 270 C 450 270 472 250 466 222 C 462 202 440 196 430 180 C 416 158 440 122 470 110 C 496 100 502 70 476 58 C 450 48 422 68 402 84 C 384 98 362 96 350 80 C 334 56 300 44 270 58 C 246 70 252 102 228 114 L 142 116 C 96 116 82 96 96 76 C 110 56 82 40 60 54 C 36 72 40 118 60 138 C 80 158 120 150 140 170 C 160 190 124 212 92 222 C 56 234 62 270 120 270 Z";

export type TrackMapHandle = { update: (rows: RowState[], order: string[]) => void };

const SAMPLES = 800;

const TrackMap = forwardRef<TrackMapHandle, { rows: RowState[] }>(function TrackMap({ rows }, ref) {
  const pathRef = useRef<SVGPathElement>(null);
  const lut = useRef<{ x: number; y: number }[]>([]);
  const cars = useRef<Record<string, SVGGElement | null>>({});
  const labels = useRef<Record<string, SVGTextElement | null>>({});

  useLayoutEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    lut.current = Array.from({ length: SAMPLES }, (_, i) => {
      const pt = p.getPointAtLength((i / SAMPLES) * len);
      return { x: pt.x, y: pt.y };
    });
  }, []);

  useImperativeHandle(ref, () => ({
    update(rs, order) {
      const table = lut.current;
      if (!table.length) return;
      rs.forEach((r) => {
        const g = cars.current[r.def.id];
        if (!g) return;
        const f = r.progress * SAMPLES;
        const i0 = Math.floor(f) % SAMPLES;
        const i1 = (i0 + 1) % SAMPLES;
        const t = f - Math.floor(f);
        const x = table[i0].x + (table[i1].x - table[i0].x) * t;
        const y = table[i0].y + (table[i1].y - table[i0].y) * t;
        g.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
        g.style.opacity = "1";
        // only the top three carry a position label, to keep the drawing quiet
        const label = labels.current[r.def.id];
        const pos = order.indexOf(r.def.id) + 1;
        if (label) label.textContent = pos <= 3 ? `P${pos}` : "";
      });
    },
  }));

  return (
    <svg viewBox="20 30 500 260" className="h-full w-full" role="img" aria-label="Live track map, Circuit de Barcelona-Catalunya">
      {/* single thin outline: the circuit as a drawing, not a graphic */}
      <path ref={pathRef} d={TRACK_PATH} fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.5" strokeLinejoin="round" />
      {/* start / finish */}
      <line x1="120" y1="262" x2="120" y2="278" stroke="#f2f1ee" strokeOpacity="0.7" strokeWidth="1.5" />

      {rows.map((r) => (
        <g
          key={r.def.id}
          ref={(el) => {
            cars.current[r.def.id] = el;
          }}
          style={{ opacity: 0, transition: "opacity .6s" }}
        >
          <circle r="3.6" fill="#f2f1ee" />
          <text
            ref={(el) => {
              labels.current[r.def.id] = el;
            }}
            y="-8"
            textAnchor="middle"
            fontSize="8"
            className="font-mono"
            fill="#a3a3ab"
          />
        </g>
      ))}
    </svg>
  );
});

export default TrackMap;
