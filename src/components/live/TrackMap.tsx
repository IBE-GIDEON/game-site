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
  const sectorMarks = useRef<{ x: number; y: number }[]>([]);

  useLayoutEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    lut.current = Array.from({ length: SAMPLES }, (_, i) => {
      const pt = p.getPointAtLength((i / SAMPLES) * len);
      return { x: pt.x, y: pt.y };
    });
    sectorMarks.current = [1 / 3, 2 / 3].map((f) => lut.current[Math.floor(f * SAMPLES)]);
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
        const label = labels.current[r.def.id];
        if (label) label.textContent = String(order.indexOf(r.def.id) + 1);
      });
    },
  }));

  return (
    <svg viewBox="20 30 500 260" className="h-full w-full" role="img" aria-label="Live track map, Circuit de Barcelona-Catalunya">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="trackGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#3a3a42" />
          <stop offset="1" stopColor="#24242a" />
        </linearGradient>
      </defs>

      {/* track: outer kerb, asphalt, racing line */}
      <path d={TRACK_PATH} fill="none" stroke="#000" strokeOpacity="0.6" strokeWidth="16" strokeLinejoin="round" />
      <path ref={pathRef} d={TRACK_PATH} fill="none" stroke="url(#trackGrad)" strokeWidth="11" strokeLinejoin="round" />
      <path d={TRACK_PATH} fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 6" />

      {/* start / finish */}
      <g transform="translate(120 270)">
        <rect x="-1.5" y="-9" width="3" height="18" fill="#f2f1ee" />
        <text x="0" y="24" textAnchor="middle" className="fill-smoke font-mono" fontSize="8">
          S/F
        </text>
      </g>
      {/* sector boundaries (approximate positions; recomputed client-side) */}
      <g className="font-mono" fontSize="8">
        <text x="478" y="150" className="fill-ash">S2</text>
        <text x="232" y="104" className="fill-ash">S3</text>
        <text x="300" y="262" className="fill-ash">S1</text>
      </g>

      {rows.map((r) => (
        <g
          key={r.def.id}
          ref={(el) => {
            cars.current[r.def.id] = el;
          }}
          style={{ opacity: 0, transition: "opacity .6s" }}
        >
          <circle r="9" fill={r.def.color} opacity="0.18" />
          <circle r="6.5" fill={r.def.color} stroke="#08080a" strokeWidth="1.5" filter={r.def.id === "ryan" ? "url(#glow)" : undefined} />
          <text
            ref={(el) => {
              labels.current[r.def.id] = el;
            }}
            textAnchor="middle"
            dy="2.6"
            fontSize="7"
            fontWeight="700"
            className="font-mono"
            fill="#08080a"
          />
        </g>
      ))}
    </svg>
  );
});

export default TrackMap;
