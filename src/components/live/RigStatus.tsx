"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { SteeringWheel, Vibrate } from "@phosphor-icons/react";

type Rig = {
  id: number;
  motion?: boolean;
  driver: string | null;
  total: number; // seconds in session
  left: number; // seconds remaining
  next: string; // next booked slot label
};

const NAMES = ["Ryan", "Matthew T.", "Ollie", "Daniel M.", "Jessica P.", "Richard S.", "Sam R.", "Petko", "Aisha K.", "Tom W.", "Kwame A.", "Priya S.", "Leo B.", "Chloe H."];

const SEED: Rig[] = [
  { id: 1, driver: "Matthew T.", total: 3600, left: 1712, next: "15:30" },
  { id: 2, driver: "Ollie", total: 1800, left: 402, next: "14:30" },
  { id: 3, driver: "Ryan", total: 7200, left: 4410, next: "17:00" },
  { id: 4, driver: "Daniel M.", total: 3600, left: 2960, next: "16:00" },
  { id: 5, driver: null, total: 0, left: 0, next: "14:30" },
  { id: 6, driver: "Richard S.", total: 3600, left: 845, next: "15:00" },
  { id: 7, motion: true, driver: "Sam R.", total: 3600, left: 2210, next: "15:30" },
  { id: 8, driver: "Petko", total: 1800, left: 1190, next: "15:00" },
];

function mmss(s: number) {
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function RigStatus() {
  const [rigs, setRigs] = useState(SEED);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n++;
      setRigs((prev) =>
        prev.map((r) => {
          if (!r.driver) {
            // a free rig gets picked up after a short while
            if (n % 9 === r.id % 9) {
              const total = [1800, 3600, 3600, 7200][(n + r.id) % 4];
              return { ...r, driver: NAMES[(n + r.id) % NAMES.length], total, left: total };
            }
            return r;
          }
          // sessions tick at 6x so the demo visibly moves
          const left = Math.max(0, r.left - 6);
          return left === 0 ? { ...r, driver: null, total: 0, left: 0 } : { ...r, left };
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const active = rigs.filter((r) => r.driver).length;

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-7">
        <div>
          <div className="text-[15px] font-medium">Rig status</div>
          <div className="text-[12px] text-ash">Peterborough venue floor</div>
        </div>
        <div className="text-right">
          <div className="tabular font-mono text-[20px] leading-none text-bone">
            {active}
            <span className="text-ash">/8</span>
          </div>
          <div className="mt-1 text-[11px] text-ash">on track</div>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
        {rigs.map((r) => {
          const pct = r.driver ? (r.left / r.total) * 100 : 0;
          return (
            <li key={r.id} className="relative bg-carbon p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-ash">
                  {r.motion ? <Vibrate size={13} /> : <SteeringWheel size={13} />}
                  RIG {String(r.id).padStart(2, "0")}
                </span>
                <span
                  className={clsx(
                    "size-1.5 rounded-full",
                    r.driver ? "bg-signal-bright shadow-[0_0_10px_rgb(255_42_53/0.8)]" : "bg-pb",
                  )}
                />
              </div>
              <div className="mt-4 h-5 truncate text-[14px] font-medium">
                {r.driver ?? <span className="text-pb">Available</span>}
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] text-ash">
                <span>{r.driver ? (r.motion ? "Motion rig" : "Racing") : `Next ${r.next}`}</span>
                {r.driver && <span className="tabular font-mono text-smoke">{mmss(r.left)}</span>}
              </div>
              <div className="mt-3 h-[2px] overflow-hidden rounded-[2px] bg-white/[0.07]">
                <motion.div
                  className="h-full rounded-[2px] bg-gradient-to-r from-signal-deep to-signal-bright"
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.9, ease: "linear" }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
