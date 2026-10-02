"use client";

import { useEffect, useState } from "react";

type Rig = { id: number; motion?: boolean; driver: string | null; left: number; next: string };

const NAMES = ["Ryan", "Matthew T.", "Ollie", "Daniel M.", "Jessica P.", "Richard S.", "Sam R.", "Petko", "Aisha K.", "Tom W.", "Kwame A.", "Priya S."];

const SEED: Rig[] = [
  { id: 1, driver: "Matthew T.", left: 1712, next: "15:30" },
  { id: 2, driver: "Ollie", left: 402, next: "14:30" },
  { id: 3, driver: "Ryan", left: 4410, next: "17:00" },
  { id: 4, driver: "Daniel M.", left: 2960, next: "16:00" },
  { id: 5, driver: null, left: 0, next: "14:30" },
  { id: 6, driver: "Richard S.", left: 845, next: "15:00" },
  { id: 7, motion: true, driver: "Sam R.", left: 2210, next: "15:30" },
  { id: 8, driver: "Petko", left: 1190, next: "15:00" },
];

const mins = (s: number) => `${Math.ceil(s / 60)} min left`;

/** Plain list of the eight rigs: who's on, and for how long. Ticks at 6x so the demo moves. */
export default function RigStatus() {
  const [rigs, setRigs] = useState(SEED);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n++;
      setRigs((prev) =>
        prev.map((r) => {
          if (!r.driver) {
            if (n % 9 === r.id % 9) return { ...r, driver: NAMES[(n + r.id) % NAMES.length], left: [1800, 3600, 7200][(n + r.id) % 3] };
            return r;
          }
          const left = Math.max(0, r.left - 6);
          return left === 0 ? { ...r, driver: null, left: 0 } : { ...r, left };
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      {rigs.map((r) => (
        <li key={r.id}>
          <div className="font-mono text-[13px] text-ash">
            Rig {r.id}
            {r.motion ? ", motion" : ""}
          </div>
          <div className="mt-1 text-[17px] text-white">{r.driver ?? "Free"}</div>
          <div className="text-[13px] text-smoke">{r.driver ? mins(r.left) : `Next booking ${r.next}`}</div>
        </li>
      ))}
    </ul>
  );
}
