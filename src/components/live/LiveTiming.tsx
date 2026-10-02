"use client";

import { AnimatePresence, LayoutGroup, motion, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { FlagCheckered, Lightning, Thermometer, Timer } from "@phosphor-icons/react";
import TrackMap, { type TrackMapHandle } from "./TrackMap";
import { fmtLap, fmtSector, sortRows, useRaceSim, type RowState, type SectorState } from "./useRaceSim";

const sectorColor: Record<Exclude<SectorState, null>, string> = {
  purple: "bg-purple",
  pb: "bg-pb",
  slow: "bg-amber",
};
const sectorText: Record<Exclude<SectorState, null>, string> = {
  purple: "text-purple",
  pb: "text-pb",
  slow: "text-amber",
};

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
    <span className="tabular font-mono">
      {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
}

function SectorBars({ row }: { row: RowState }) {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((k) => {
        const st = row.sectorState[k];
        return (
          <span
            key={k}
            className={clsx(
              "h-1 w-4 rounded-[2px] transition-colors duration-300 sm:w-5",
              st ? sectorColor[st] : "bg-white/10",
            )}
          />
        );
      })}
    </div>
  );
}

export default function LiveTiming({ compact = false }: { compact?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { margin: "200px 0px" });
  const mapRef = useRef<TrackMapHandle>(null);
  const orderRef = useRef<string[]>([]);
  const { rows, feed } = useRaceSim((rs) => mapRef.current?.update(rs, orderRef.current), inView);

  const sorted = useMemo(() => sortRows(rows), [rows]);
  orderRef.current = sorted.map((r) => r.def.id);
  const leader = sorted[0]?.best ?? 0;
  const overallBest = leader;
  const visibleRows = compact ? sorted.slice(0, 6) : sorted;

  return (
    <div ref={wrap} className="panel relative overflow-hidden">
      {/* header strip */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-white/[0.07] px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-[2px] bg-signal/15 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-signal-bright ring-1 ring-signal/30">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-signal-bright" />
            LIVE
          </span>
          <div className="leading-tight">
            <div className="text-[15px] font-medium text-bone">Open practice</div>
            <div className="text-[12px] text-ash">Circuit de Barcelona-Catalunya · GT3</div>
          </div>
        </div>
        <div className="flex items-center gap-5 text-[12px] text-smoke">
          <span className="flex items-center gap-1.5">
            <Timer size={14} className="text-ash" />
            <SessionClock />
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Thermometer size={14} className="text-ash" />
            Track 31°C
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <FlagCheckered size={14} className="text-ash" />8 rigs
          </span>
        </div>
      </div>

      <div className={clsx("grid", compact ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.05fr_1fr]")}>
        {/* map + feed */}
        <div className="relative flex flex-col border-b border-white/[0.07] lg:border-b-0 lg:border-r">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
          />
          <div className="relative aspect-[500/260] w-full px-3 pt-4 sm:px-6 sm:pt-6">
            <TrackMap ref={mapRef} rows={rows} />
          </div>

          <div className="relative mt-auto px-5 pb-5 sm:px-7 sm:pb-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[12px] text-ash">Race control</span>
              <div className="flex items-center gap-3 text-[11px] text-ash">
                <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-purple" />Fastest</span>
                <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-pb" />Personal best</span>
                <span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-amber" />Slower</span>
              </div>
            </div>
            <ul className="relative h-[124px] overflow-hidden" aria-live="polite">
              <AnimatePresence initial={false}>
                {feed.slice(0, 4).map((f) => (
                  <motion.li
                    key={f.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 border-t border-white/[0.05] py-2 text-[13px] first:border-t-0"
                  >
                    <span
                      className={clsx(
                        "grid size-5 shrink-0 place-items-center rounded-[2px]",
                        f.kind === "fastest" && "bg-purple/20 text-purple",
                        f.kind === "pb" && "bg-pb/15 text-pb",
                        f.kind === "purple" && "bg-purple/15 text-purple",
                        f.kind === "info" && "bg-white/10 text-smoke",
                      )}
                    >
                      {f.kind === "info" ? <FlagCheckered size={11} weight="fill" /> : <Lightning size={11} weight="fill" />}
                    </span>
                    <span className="truncate text-bone/90">{f.text}</span>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-ash">{f.time}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* timing tower */}
        <div className="relative">
          <div className="grid grid-cols-[28px_1fr_auto_auto] items-center gap-x-3 border-b border-white/[0.07] px-5 py-3 text-[11px] text-ash sm:grid-cols-[28px_1fr_auto_auto_auto] sm:px-7">
            <span>P</span>
            <span>Driver</span>
            <span className="hidden text-right sm:block">Last lap</span>
            <span className="text-right">Best</span>
            <span className="w-[62px] text-right">Gap</span>
          </div>
          <LayoutGroup>
            <ol>
              {visibleRows.map((r, i) => {
                const gap = r.best !== null ? r.best - leader : null;
                const isFastest = r.best === overallBest;
                const justImproved = r.improved > 0 && performance.now() - r.improved < 2200;
                return (
                  <motion.li
                    key={r.def.id}
                    layout
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className={clsx(
                      "relative grid grid-cols-[28px_1fr_auto_auto] items-center gap-x-3 border-b border-white/[0.05] px-5 py-3 last:border-b-0 sm:grid-cols-[28px_1fr_auto_auto_auto] sm:px-7",
                      justImproved && "bg-white/[0.025]",
                    )}
                  >
                    <span className="tabular font-mono text-[13px] text-smoke">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="h-7 w-[3px] shrink-0 rounded-[2px]" style={{ backgroundColor: r.def.color }} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-[14px] font-medium text-bone">{r.def.name}</span>
                          <span className="hidden font-mono text-[10px] text-ash md:inline">RIG {r.def.rig}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <SectorBars row={r} />
                          <span className="hidden truncate text-[11px] text-ash xl:inline">{r.def.car}</span>
                        </div>
                      </div>
                    </div>
                    <span className="tabular hidden text-right font-mono text-[13px] text-smoke sm:block">{fmtLap(r.last)}</span>
                    <span
                      className={clsx(
                        "tabular text-right font-mono text-[13px] transition-colors duration-500",
                        isFastest ? "text-purple" : justImproved ? "text-pb" : "text-bone",
                      )}
                    >
                      {fmtLap(r.best)}
                    </span>
                    <span className="tabular w-[62px] text-right font-mono text-[12px] text-ash">
                      {i === 0 ? "Leader" : gap !== null ? `+${gap.toFixed(3)}` : "—"}
                    </span>
                  </motion.li>
                );
              })}
            </ol>
          </LayoutGroup>
          {!compact && (
            <div className="grid grid-cols-3 border-t border-white/[0.07] text-center">
              {[0, 1, 2].map((k) => {
                const best = Math.min(...rows.map((r) => r.bestSectors[k]));
                return (
                  <div key={k} className="border-r border-white/[0.07] px-3 py-4 last:border-r-0">
                    <div className="text-[11px] text-ash">Best S{k + 1}</div>
                    <div className={clsx("tabular mt-1 font-mono text-[14px]", sectorText.purple)}>{fmtSector(best)}</div>
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
