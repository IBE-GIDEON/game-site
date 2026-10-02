"use client";

import { AnimatePresence, LayoutGroup, motion, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import TrackMap, { type TrackMapHandle } from "./TrackMap";
import { fmtLap, fmtSector, sortRows, useRaceSim } from "./useRaceSim";

function SessionClock({ start = 41 * 60 + 12 }: { start?: number }) {
  const [t, setT] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return (
    <span className="font-mono">
      {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
}

/**
 * Plain timing sheet: type on black, separated by space alone.
 * No rules, no boxes, no colour coding. The fastest lap is marked by weight.
 */
export default function LiveTiming({ compact = false }: { compact?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { margin: "200px 0px" });
  const mapRef = useRef<TrackMapHandle>(null);
  const orderRef = useRef<string[]>([]);
  const { rows, feed } = useRaceSim((rs) => mapRef.current?.update(rs, orderRef.current), inView);

  const sorted = useMemo(() => sortRows(rows), [rows]);
  orderRef.current = sorted.map((r) => r.def.id);
  const leader = sorted[0]?.best ?? 0;
  const visibleRows = compact ? sorted.slice(0, 6) : sorted;
  const cols = "grid grid-cols-[2rem_1fr_auto_4.5rem] items-baseline gap-x-4 sm:grid-cols-[2rem_1fr_auto_auto_4.5rem]";

  return (
    <div ref={wrap}>
      <div className={clsx("flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-[13px]", compact && "hidden")}>
        <div className="flex items-baseline gap-3">
          <span className="flex items-center gap-2 text-bone">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-bone" />
            Live
          </span>
          <span className="text-smoke">Open practice, Circuit de Barcelona-Catalunya</span>
        </div>
        <span className="text-ash">
          Session <SessionClock />
        </span>
      </div>

      <div className={clsx(!compact && "mt-10 grid gap-12 sm:mt-14 lg:grid-cols-2 lg:gap-20")}>
        {/* track + race control: full timing page only */}
        <div className={clsx(compact && "hidden")}>
          <div className="aspect-[500/260] w-full">
            <TrackMap ref={mapRef} rows={rows} />
          </div>

          <div className="mt-10">
            <div className="font-label text-[11px] text-ash">Race control</div>
            <ul className="relative mt-4 h-[104px] overflow-hidden" aria-live="polite">
              <AnimatePresence initial={false}>
                {feed.slice(0, 4).map((f) => (
                  <motion.li
                    key={f.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline gap-5 py-1 text-[14px]"
                  >
                    <span className="w-16 shrink-0 font-mono text-[12px] text-ash">{f.time || "—"}</span>
                    <span className={clsx("truncate", f.kind === "fastest" ? "text-white" : "text-smoke")}>{f.text}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* classification */}
        <div>
          <div className={clsx(cols, "font-label pb-4 text-[11px] text-ash")}>
            <span>Pos</span>
            <span>Driver</span>
            <span className="hidden text-right sm:block">Last</span>
            <span className="text-right">Best</span>
            <span className="text-right">Gap</span>
          </div>
          <LayoutGroup>
            <ol>
              {visibleRows.map((r, i) => {
                const gap = r.best !== null ? r.best - leader : null;
                const fastest = i === 0;
                return (
                  <motion.li
                    key={r.def.id}
                    layout
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className={clsx(cols, "py-2.5 text-[15px]", compact && i >= 4 && "max-sm:hidden")}
                  >
                    <span className="font-mono text-ash">{i + 1}</span>
                    <span className={clsx("truncate", fastest ? "font-semibold text-white" : "text-bone")}>{r.def.name}</span>
                    <span className="hidden text-right font-mono text-ash sm:block">{fmtLap(r.last)}</span>
                    <span className={clsx("text-right font-mono", fastest ? "font-semibold text-white" : "text-bone/85")}>
                      {fmtLap(r.best)}
                    </span>
                    <span className="text-right font-mono text-[13px] text-ash">
                      {i === 0 ? "—" : gap !== null ? `+${gap.toFixed(3)}` : "—"}
                    </span>
                  </motion.li>
                );
              })}
            </ol>
          </LayoutGroup>

          {!compact && (
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[0, 1, 2].map((k) => {
                const best = Math.min(...rows.map((r) => r.bestSectors[k]));
                return (
                  <div key={k}>
                    <div className="font-label text-[11px] text-ash">Best sector {k + 1}</div>
                    <div className="mt-1.5 font-mono text-[17px] text-white">{fmtSector(best)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
