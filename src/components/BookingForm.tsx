"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowRight, CaretLeft, CaretRight, Minus, Plus } from "@phosphor-icons/react";
import { hours, raceNight, sessions, site } from "@/lib/site";
import Tyre from "@/components/ui/Tyre";

type Experience = { id: string; name: string; minutes: number; price: number; rigs: number; kind: string; fridayOnly?: boolean };

const experiences: Experience[] = [
  ...sessions.map((s) => ({ id: s.id, name: s.name, minutes: s.minutes, price: s.price, rigs: s.rig === "Motion" ? 1 : 7, kind: s.rig })),
  { id: "race-night", name: "Friday race night", minutes: 240, price: raceNight.price, rigs: 16, kind: "Tournament", fridayOnly: true },
];

const DAY = 86_400_000;
const LEAD_MINS = 15;

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
}

function slotsFor(date: Date, exp: Experience, minFrom = 0) {
  const cfg = hours[date.getDay()];
  if (cfg.open === null || cfg.close === null) return [];
  if (exp.fridayOnly) return date.getDay() === 5 && 19 * 60 > minFrom ? ["19:00"] : [];
  const out: string[] = [];
  // the session has to finish by closing time
  for (let m = cfg.open * 60; m + exp.minutes <= cfg.close * 60; m += 30) {
    if (m > minFrom) out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}

function baseAvailability(date: Date, slot: string, exp: Experience) {
  const r = hash(`${date.toDateString()}-${slot}-${exp.kind}`);
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  const evening = Number(slot.slice(0, 2)) >= 17;
  const pressure = (weekend ? 0.15 : 0) + (evening ? 0.12 : 0);
  return Math.max(0, Math.round(exp.rigs * (1 - Math.min(0.95, r * 0.7 + pressure))));
}

const nowMins = () => {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes() + LEAD_MINS;
};
const duration = (m: number) => (m >= 60 ? `${m / 60} hr` : `${m} min`);

function Label({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-2 flex h-6 items-center justify-between">
      <span className="font-label text-[11px] text-smoke">{children}</span>
      {aside}
    </div>
  );
}

/** One-screen booking form. Availability is simulated client-side and hands off to Acuity for payment. */
export default function BookingForm() {
  const params = useSearchParams();
  const [expId, setExpId] = useState(() => experiences.find((e) => e.id === params.get("session"))?.id ?? "standard-60");
  const [today, setToday] = useState<Date | null>(null);
  const [week, setWeek] = useState(0);
  const [dateIdx, setDateIdx] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [drivers, setDrivers] = useState(1);
  const [taken, setTaken] = useState<Record<string, number>>({});
  const [live, setLive] = useState<{ id: number; text: string } | null>(null);
  const liveId = useRef(0);

  const exp = experiences.find((e) => e.id === expId)!;

  useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setToday(d);
  }, []);

  const days = useMemo(() => (today ? Array.from({ length: 21 }, (_, i) => new Date(today.getTime() + i * DAY)) : []), [today]);
  const slotsOn = (i: number) => (days[i] ? slotsFor(days[i], exp, i === 0 ? nowMins() : 0) : []);

  // jump to the first day this session runs
  useEffect(() => {
    if (!days.length) return;
    const first = days.findIndex((_, i) => slotsOn(i).length > 0);
    setDateIdx(first);
    setWeek(Math.floor(Math.max(first, 0) / 7));
    setSlot(null);
  }, [days, expId]); // eslint-disable-line react-hooks/exhaustive-deps

  const date = dateIdx !== null && dateIdx >= 0 ? days[dateIdx] : null;
  const slots = dateIdx !== null && dateIdx >= 0 ? slotsOn(dateIdx) : [];
  const avail = (s: string) => {
    if (!date) return 0;
    const key = `${date.toDateString()}-${s}-${exp.kind}`;
    return Math.max(0, baseAvailability(date, s, exp) - (taken[key] ?? 0));
  };

  // other people book while you browse
  const ref = useRef({ date, slots, slot, exp, avail });
  ref.current = { date, slots, slot, exp, avail };
  useEffect(() => {
    const id = window.setInterval(() => {
      const { date, slots, slot, exp, avail } = ref.current;
      if (!date) return;
      const open = slots.filter((s) => avail(s) > 0 && s !== slot);
      if (!open.length) return;
      const pick = open[Math.floor(Math.random() * open.length)];
      const key = `${date.toDateString()}-${pick}-${exp.kind}`;
      setTaken((t) => ({ ...t, [key]: (t[key] ?? 0) + 1 }));
      setLive({ id: ++liveId.current, text: `Someone just booked ${pick}` });
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const maxDrivers = slot ? Math.max(1, avail(slot)) : Math.min(exp.rigs, 8);
  useEffect(() => setDrivers((d) => Math.min(d, maxDrivers)), [maxDrivers]);

  const chip = (active: boolean, disabled = false) =>
    clsx(
      "rounded-[2px] transition-colors duration-200",
      active ? "bg-white text-ink" : disabled ? "cursor-not-allowed text-ash/40" : "bg-white/[0.07] text-bone hover:bg-white/[0.13]",
    );

  return (
    <div className="mx-auto w-full max-w-[540px]">
      <h1 className="font-display text-[clamp(1.9rem,3.2vw,2.7rem)] text-white">
        <span className="sr-only">Book a session</span>
        <span aria-hidden>
          B<Tyre />
          <Tyre delay={0.08} />K a session
        </span>
      </h1>
      <p className="mt-1.5 text-[14px] text-smoke">Pick a session, a day and a time. We&apos;ll set the rig up for you.</p>

      {/* session */}
      <div className="mt-6">
        <Label>Session</Label>
        <div className="grid grid-cols-2 gap-1.5">
          {experiences.map((e, i) => (
            <button
              key={e.id}
              type="button"
              aria-pressed={e.id === expId}
              onClick={() => setExpId(e.id)}
              className={clsx(
                chip(e.id === expId),
                "flex items-center justify-between gap-3 px-3 py-2 text-left",
                i === experiences.length - 1 && "col-span-2",
              )}
            >
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-medium">{e.name}</span>
                <span className="block text-[11px] opacity-60">
                  {e.fridayOnly ? "Fridays, 7pm" : `${duration(e.minutes)}, ${e.kind.toLowerCase()} rig`}
                </span>
              </span>
              <span className="font-mono text-[15px]">£{e.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* date */}
      <div className="mt-5">
        <Label
          aside={
            <span className="flex gap-1">
              {[
                { dir: -1, Icon: CaretLeft, label: "Earlier dates", disabled: week === 0 },
                { dir: 1, Icon: CaretRight, label: "Later dates", disabled: week >= 2 },
              ].map(({ dir, Icon, label, disabled }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  disabled={disabled}
                  onClick={() => setWeek((w) => w + dir)}
                  className="grid size-6 place-items-center rounded-[2px] text-smoke hover:text-white disabled:opacity-25"
                >
                  <Icon size={13} />
                </button>
              ))}
            </span>
          }
        >
          {date ? date.toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "Date"}
        </Label>
        <div className="grid grid-cols-7 gap-1.5">
          {(days.length ? days.slice(week * 7, week * 7 + 7) : Array.from({ length: 7 })).map((d, i) => {
            if (!(d instanceof Date)) return <div key={i} className="h-12 animate-pulse rounded-[2px] bg-white/[0.04]" />;
            const idx = week * 7 + i;
            const open = slotsOn(idx).length > 0;
            return (
              <button
                key={idx}
                type="button"
                disabled={!open}
                onClick={() => {
                  setDateIdx(idx);
                  setSlot(null);
                }}
                className={clsx(chip(idx === dateIdx, !open), "flex h-12 flex-col items-center justify-center leading-tight")}
              >
                <span className="text-[10.5px] opacity-70">{idx === 0 ? "Today" : d.toLocaleDateString("en-GB", { weekday: "short" })}</span>
                <span className="font-mono text-[16px]">{d.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* time */}
      <div className="mt-5">
        <Label
          aside={
            <span className="h-4 overflow-hidden text-[11px] text-ash">
              <AnimatePresence mode="wait">
                {live && (
                  <motion.span key={live.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="block">
                    {live.text}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          }
        >
          Start time
        </Label>
        {slots.length ? (
          <div className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
            {slots.map((s) => {
              const a = avail(s);
              return (
                <button
                  key={s}
                  type="button"
                  disabled={a === 0}
                  onClick={() => setSlot(s)}
                  className={clsx(
                    chip(slot === s, a === 0),
                    "flex h-10 shrink-0 items-center justify-center gap-1.5 px-3 font-mono text-[13.5px] sm:px-0",
                    a === 0 && "line-through",
                  )}
                >
                  {s}
                  {a === 1 && exp.rigs > 1 && <span className="text-[10px] opacity-60">1 left</span>}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="flex h-10 items-center text-[13px] text-smoke">{date ? "Nothing free that day. Try another." : "Loading times"}</p>
        )}
      </div>

      {/* drivers + checkout */}
      <div className="mt-6 flex items-stretch gap-2">
        <div className="flex h-13 items-center rounded-[2px] bg-white/[0.07]">
          <button
            type="button"
            aria-label="Fewer drivers"
            onClick={() => setDrivers((d) => Math.max(1, d - 1))}
            className="grid h-full w-9 place-items-center text-smoke hover:text-white sm:w-10"
          >
            <Minus size={13} />
          </button>
          <span className="w-11 text-center leading-tight sm:w-16">
            <span className="block font-mono text-[15px] text-white">{drivers}</span>
            <span className="block text-[10px] text-ash">{drivers === 1 ? "driver" : "drivers"}</span>
          </span>
          <button
            type="button"
            aria-label="More drivers"
            onClick={() => setDrivers((d) => Math.min(maxDrivers, d + 1))}
            className="grid h-full w-9 place-items-center text-smoke hover:text-white sm:w-10"
          >
            <Plus size={13} />
          </button>
        </div>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!slot}
          className={clsx(
            "font-label group flex h-13 min-w-0 flex-1 items-center justify-between gap-3 rounded-[2px] bg-signal px-4 text-[13px] sm:px-5 text-white transition-colors hover:bg-signal-bright",
            !slot && "pointer-events-none opacity-40",
          )}
        >
          <span className="whitespace-nowrap">
            {slot ? (
              <>
                Continue<span className="hidden sm:inline">, {slot}</span>
              </>
            ) : (
              "Pick a time"
            )}
          </span>
          <span className="flex items-center gap-3">
            <span className="font-mono text-[16px] normal-case not-italic">£{exp.price * drivers}</span>
            <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-ash">
        Secure payment through Acuity Scheduling.{" "}
        <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="text-smoke underline decoration-white/20 underline-offset-2 hover:text-white">
          Gift cards
        </a>{" "}
        from £15.
      </p>
    </div>
  );
}
