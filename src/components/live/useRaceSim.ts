"use client";

import { useEffect, useRef, useState } from "react";

export type SectorState = "purple" | "pb" | "slow" | null;

export type DriverDef = {
  id: string;
  name: string;
  code: string;
  rig: number;
  car: string;
  color: string;
  pace: number; // representative lap in seconds
  consistency: number; // std-dev-ish in seconds
};

export type RowState = {
  def: DriverDef;
  lap: number;
  last: number | null;
  best: number | null;
  sectors: (number | null)[]; // current lap's completed sectors
  sectorState: SectorState[];
  bestSectors: number[];
  progress: number; // 0..1 around the lap
  improved: number; // timestamp of last PB, for flash
};

export type FeedItem = { id: number; kind: "fastest" | "pb" | "purple" | "info"; text: string; time: string };

export const DRIVERS: DriverDef[] = [
  { id: "ryan", name: "Ryan", code: "RYN", rig: 3, car: "Ferrari 296 GT3", color: "#ff2a35", pace: 103.4, consistency: 0.35 },
  { id: "matt", name: "Matthew T.", code: "MTH", rig: 1, car: "Porsche 911 GT3 R", color: "#f2f1ee", pace: 104.0, consistency: 0.4 },
  { id: "rich", name: "Richard S.", code: "RIC", rig: 6, car: "BMW M4 GT3", color: "#38bdf8", pace: 104.7, consistency: 0.5 },
  { id: "ollie", name: "Ollie", code: "OLL", rig: 2, car: "McLaren 720S GT3", color: "#fb923c", pace: 105.3, consistency: 0.55 },
  { id: "petko", name: "Petko", code: "PET", rig: 8, car: "Mercedes-AMG GT3", color: "#2dd4bf", pace: 105.8, consistency: 0.6 },
  { id: "jess", name: "Jessica P.", code: "JES", rig: 5, car: "Audi R8 LMS Evo II", color: "#f472b6", pace: 106.6, consistency: 0.7 },
  { id: "dan", name: "Daniel M.", code: "DAN", rig: 4, car: "Lamborghini Huracán GT3", color: "#818cf8", pace: 107.4, consistency: 0.8 },
  { id: "sam", name: "Sam R.", code: "SAM", rig: 7, car: "Aston Martin Vantage GT3", color: "#cbd5e1", pace: 108.5, consistency: 0.9 },
];

const SPLIT = [0.3, 0.38, 0.32];
/** Sim runs faster than wall-clock so visitors see laps complete; times displayed are "real". */
const SPEED = 4;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rand: () => number) {
  const u = Math.max(rand(), 1e-9);
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function fmtLap(s: number | null) {
  if (s === null) return "";
  const m = Math.floor(s / 60);
  const rest = s - m * 60;
  return `${m}:${rest.toFixed(3).padStart(6, "0")}`;
}
export function fmtSector(s: number | null) {
  return s === null ? "" : s.toFixed(3);
}

type Internal = {
  rows: RowState[];
  targets: number[][]; // per driver, sector targets for current lap
  sectorIdx: number[];
  sectorTime: number[];
  overallSectors: number[];
  overallBest: number;
};

function initial(): Internal {
  const rand = mulberry32(2026);
  const rows: RowState[] = DRIVERS.map((d, i) => {
    const best = d.pace + 0.15 + rand() * 0.6;
    const last = best + 0.2 + rand() * 1.1;
    const bestSectors = SPLIT.map((p) => best * p + (rand() - 0.5) * 0.12);
    return {
      def: d,
      lap: 6 + Math.floor(rand() * 4),
      last,
      best,
      sectors: [null, null, null],
      sectorState: [null, null, null],
      bestSectors,
      progress: (1 - i / DRIVERS.length) * 0.92,
      improved: 0,
    };
  });
  const overallSectors = [0, 1, 2].map((k) => Math.min(...rows.map((r) => r.bestSectors[k])));
  const overallBest = Math.min(...rows.map((r) => r.best!));
  const targets = rows.map((r) => SPLIT.map((p) => r.def.pace * p));
  const sectorIdx = rows.map((r) => Math.floor(r.progress * 3));
  const sectorTime = rows.map((r, i) => (r.progress * 3 - sectorIdx[i]) * targets[i][sectorIdx[i]]);
  return { rows, targets, sectorIdx, sectorTime, overallSectors, overallBest };
}

function newTargets(d: DriverDef, rand: () => number) {
  const lap = d.pace + Math.abs(gauss(rand)) * d.consistency * 0.9 + (gauss(rand) * d.consistency) / 3;
  const t = SPLIT.map((p) => lap * p + gauss(rand) * 0.08);
  if (rand() < 0.06) t[Math.floor(rand() * 3)] += 1.2 + rand() * 2.5; // lock-up / off-track moment
  return t;
}

export function sortRows(rows: RowState[]) {
  return [...rows].sort((a, b) => (a.best ?? 999) - (b.best ?? 999));
}

/**
 * Drives the live timing demo. Car positions update every frame through `onFrame`
 * (no React re-render); the table re-renders only when a sector completes.
 */
export function useRaceSim(onFrame?: (rows: RowState[]) => void, running = true) {
  const sim = useRef<Internal>(null as unknown as Internal);
  if (!sim.current) sim.current = initial();
  const [rows, setRows] = useState<RowState[]>(() => sim.current.rows.map((r) => ({ ...r })));
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: 0, kind: "info", text: "Open practice is live", time: "" },
  ]);
  const frameCb = useRef(onFrame);
  frameCb.current = onFrame;

  useEffect(() => {
    if (!running) return;
    const rand = mulberry32((Date.now() & 0xffff) + 7);
    const s = sim.current;
    let raf = 0;
    let last = performance.now();
    let feedId = 1;
    const stamp = () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/London" }).format(new Date());

    const push = (item: Omit<FeedItem, "id" | "time">) =>
      setFeed((f) => [{ ...item, id: feedId++, time: stamp() }, ...f].slice(0, 5));

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000) * SPEED;
      last = now;
      let changed = false;

      s.rows.forEach((row, i) => {
        s.sectorTime[i] += dt;
        let k = s.sectorIdx[i];
        if (s.sectorTime[i] >= s.targets[i][k]) {
          const time = s.targets[i][k];
          s.sectorTime[i] -= time;
          const sectors = [...row.sectors];
          const states = [...row.sectorState];
          sectors[k] = time;
          if (time < s.overallSectors[k]) {
            s.overallSectors[k] = time;
            states[k] = "purple";
          } else if (time < row.bestSectors[k]) {
            states[k] = "pb";
          } else {
            states[k] = "slow";
          }
          const bestSectors = [...row.bestSectors];
          bestSectors[k] = Math.min(bestSectors[k], time);
          let next: RowState = { ...row, sectors, sectorState: states, bestSectors };

          k += 1;
          if (k === 3 && sectors.some((v) => v === null)) {
            // out-lap: the car joined mid-lap, so there's no valid lap time to post
            next = { ...next, lap: row.lap + 1, sectors: [null, null, null], sectorState: [null, null, null] };
            s.targets[i] = newTargets(row.def, rand);
            k = 0;
          } else if (k === 3) {
            const lapTime = sectors.reduce<number>((a, b) => a + (b ?? 0), 0);
            const isPb = row.best === null || lapTime < row.best;
            next = {
              ...next,
              lap: row.lap + 1,
              last: lapTime,
              best: isPb ? lapTime : row.best,
              improved: isPb ? now : row.improved,
              sectors: [null, null, null],
              sectorState: [null, null, null],
            };
            if (lapTime < s.overallBest) {
              s.overallBest = lapTime;
              push({ kind: "fastest", text: `Fastest lap for ${row.def.name} in ${fmtLap(lapTime)}` });
            } else if (isPb) {
              push({ kind: "pb", text: `Personal best for ${row.def.name} in ${fmtLap(lapTime)}` });
            }
            s.targets[i] = newTargets(row.def, rand);
            k = 0;
          } else if (states[k - 1] === "purple") {
            push({ kind: "purple", text: `Purple sector ${k} for ${row.def.name}` });
          }
          s.sectorIdx[i] = k;
          s.rows[i] = next;
          changed = true;
        }
        const kk = s.sectorIdx[i];
        s.rows[i].progress = (kk + Math.min(1, s.sectorTime[i] / s.targets[i][kk])) / 3;
      });

      if (changed) setRows(s.rows.map((r) => ({ ...r })));
      frameCb.current?.(s.rows);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return { rows, feed, overallSectors: sim.current.overallSectors };
}
