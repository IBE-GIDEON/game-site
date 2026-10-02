"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { CalendarDots, CaretLeft, CaretRight, Clock, Lightning, Minus, Plus, ShieldCheck, SteeringWheel, Trophy, Users, Vibrate } from "@phosphor-icons/react";
import { hours, raceNight, sessions, site } from "@/lib/site";
import Button from "@/components/ui/Button";

type Experience = { id: string; name: string; minutes: number; price: number; rigs: number; kind: "Standard" | "Motion" | "Tournament"; fridayOnly?: boolean };

const experiences: Experience[] = [
  ...sessions.map((s) => ({ id: s.id, name: s.name, minutes: s.minutes, price: s.price, rigs: s.rig === "Motion" ? 1 : 7, kind: s.rig })),
  { id: "race-night", name: "Friday race night", minutes: 240, price: raceNight.price, rigs: 16, kind: "Tournament", fridayOnly: true },
];

const DAY = 86_400_000;

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
}

function slotsFor(date: Date, exp: Experience) {
  const cfg = hours[date.getDay()];
  if (cfg.open === null || cfg.close === null) return [];
  if (exp.fridayOnly) return date.getDay() === 5 ? [{ label: "19:00", mins: 19 * 60 }] : [];
  const out: { label: string; mins: number }[] = [];
  // last slot must finish by closing time
  for (let m = cfg.open * 60; m + exp.minutes <= cfg.close * 60; m += 30) {
    out.push({ label: `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`, mins: m });
  }
  return out;
}

function baseAvailability(date: Date, slot: string, exp: Experience) {
  const r = hash(`${date.toDateString()}-${slot}-${exp.kind}`);
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  const evening = Number(slot.slice(0, 2)) >= 17;
  const pressure = (weekend ? 0.35 : 0) + (evening ? 0.25 : 0);
  return Math.max(0, Math.round(exp.rigs * (1 - Math.min(0.95, r * 0.7 + pressure))));
}

const fmtDay = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short" });
const fmtLong = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

export default function BookingWidget() {
  const params = useSearchParams();
  const initial = experiences.find((e) => e.id === params.get("session"))?.id ?? "standard-60";
  const [expId, setExpId] = useState(initial);
  const [today, setToday] = useState<Date | null>(null);
  const [offset, setOffset] = useState(0);
  const [dateIdx, setDateIdx] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [drivers, setDrivers] = useState(1);
  const [taken, setTaken] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const toastId = useRef(0);

  const exp = experiences.find((e) => e.id === expId)!;

  useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setToday(d);
  }, []);

  const days = useMemo(() => (today ? Array.from({ length: 21 }, (_, i) => new Date(today.getTime() + i * DAY)) : []), [today]);

  // choose the first open day for this experience
  useEffect(() => {
    if (!days.length) return;
    const now = new Date();
    const cutoff = now.getHours() * 60 + now.getMinutes() + 15;
    const first = days.findIndex((d, i) => slotsFor(d, exp).some((s) => i > 0 || s.mins > cutoff));
    setDateIdx(first);
    setOffset(Math.max(0, Math.min(first, 14)));
    setSlot(null);
  }, [days, expId]); // eslint-disable-line react-hooks/exhaustive-deps

  const date = dateIdx !== null ? days[dateIdx] : null;
  const isToday = date !== null && today !== null && date.getTime() === today.getTime();
  const nowMins = isToday ? new Date().getHours() * 60 + new Date().getMinutes() + 15 : 0;
  const slots = date ? slotsFor(date, exp).filter((s) => s.mins > nowMins) : [];
  const avail = (s: string) => {
    if (!date) return 0;
    const key = `${date.toDateString()}-${s}-${exp.kind}`;
    return Math.max(0, baseAvailability(date, s, exp) - (taken[key] ?? 0));
  };

  // Live demand: other people book slots while you browse.
  const live = useRef({ date, slots, slot, exp, avail });
  live.current = { date, slots, slot, exp, avail };
  useEffect(() => {
    const id = window.setInterval(() => {
      const { date, slots, slot, exp, avail } = live.current;
      if (!date) return;
      const open = slots.filter((s) => avail(s.label) > 0 && s.label !== slot);
      if (!open.length) return;
      const pick = open[Math.floor(Math.random() * open.length)];
      const key = `${date.toDateString()}-${pick.label}-${exp.kind}`;
      setTaken((t) => ({ ...t, [key]: (t[key] ?? 0) + 1 }));
      const who = ["A driver", "A group of 3", "Someone", "A group of 2"][Math.floor(Math.random() * 4)];
      setToast({ id: ++toastId.current, text: `${who} just booked ${pick.label} on ${fmtDay(date)}` });
    }, 5200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  const maxDrivers = slot ? Math.max(1, avail(slot)) : exp.rigs;
  useEffect(() => setDrivers((d) => Math.min(d, maxDrivers)), [maxDrivers]);

  const total = exp.price * drivers;

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8">
        {/* 1. Experience */}
        <section className="panel p-5 sm:p-7">
          <StepTitle n={1} title="Choose your experience" />
          <div className="grid gap-3 sm:grid-cols-2">
            {experiences.map((e) => {
              const active = e.id === expId;
              const Icon = e.kind === "Motion" ? Vibrate : e.kind === "Tournament" ? Trophy : SteeringWheel;
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setExpId(e.id)}
                  aria-pressed={active}
                  className={clsx(
                    "group relative flex items-center gap-4 rounded-[2px] border p-4 text-left transition-all duration-300",
                    active ? "border-signal/60 bg-signal/[0.08]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20",
                  )}
                >
                  <span
                    className={clsx(
                      "grid size-11 shrink-0 place-items-center rounded-[2px] transition-colors",
                      active ? "bg-signal text-white" : "bg-white/[0.05] text-smoke group-hover:text-white",
                    )}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] text-white">{e.name}</span>
                    <span className="mt-0.5 block text-[12px] text-ash">
                      {e.fridayOnly ? "Fridays, 7pm – 11pm" : `${e.minutes >= 60 ? `${e.minutes / 60}hr` : `${e.minutes} min`} · ${e.kind} rig`}
                    </span>
                  </span>
                  <span className="font-display text-[22px] text-white">£{e.price}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Date */}
        <section className="panel p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <StepTitle n={2} title="Pick a date" />
            <div className="-mt-5 flex gap-2">
              <button
                type="button"
                aria-label="Earlier dates"
                disabled={offset === 0}
                onClick={() => setOffset((o) => Math.max(0, o - 7))}
                className="grid size-9 place-items-center rounded-[2px] border border-white/10 text-smoke transition hover:text-white disabled:opacity-30"
              >
                <CaretLeft size={14} />
              </button>
              <button
                type="button"
                aria-label="Later dates"
                disabled={offset >= 14}
                onClick={() => setOffset((o) => Math.min(14, o + 7))}
                className="grid size-9 place-items-center rounded-[2px] border border-white/10 text-smoke transition hover:text-white disabled:opacity-30"
              >
                <CaretRight size={14} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {(days.length ? days.slice(offset, offset + 7) : Array.from({ length: 7 })).map((d, i) => {
              if (!(d instanceof Date)) return <div key={i} className="h-[84px] animate-pulse rounded-[2px] bg-white/[0.03]" />;
              const idx = offset + i;
              const open = slotsFor(d, exp).some((s) => idx > 0 || s.mins > new Date().getHours() * 60 + new Date().getMinutes() + 15);
              const active = idx === dateIdx;
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={!open}
                  onClick={() => {
                    setDateIdx(idx);
                    setSlot(null);
                  }}
                  className={clsx(
                    "flex h-[84px] flex-col items-center justify-center rounded-[2px] border transition-all duration-300",
                    active
                      ? "border-white bg-white text-ink"
                      : open
                        ? "border-white/[0.08] bg-white/[0.02] text-bone hover:border-white/25"
                        : "cursor-not-allowed border-transparent text-ash/50",
                  )}
                >
                  <span className={clsx("text-[11px]", active ? "text-ink/60" : "text-ash")}>{idx === 0 ? "Today" : fmtDay(d)}</span>
                  <span className="font-display mt-1 text-[22px]">{d.getDate()}</span>
                  <span className={clsx("text-[10px]", active ? "text-ink/60" : open ? "text-ash" : "text-ash/50")}>
                    {open ? d.toLocaleDateString("en-GB", { month: "short" }) : "Closed"}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Time */}
        <section className="panel relative p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <StepTitle n={3} title="Choose a start time" />
            <span className="-mt-5 flex items-center gap-1.5 text-[12px] text-ash">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-pb" />
              Live availability
            </span>
          </div>
          {date && slots.length ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {slots.map((s) => {
                const a = avail(s.label);
                const active = slot === s.label;
                const low = a > 0 && a <= 2;
                return (
                  <motion.button
                    key={s.label}
                    type="button"
                    layout
                    disabled={a === 0}
                    onClick={() => setSlot(s.label)}
                    className={clsx(
                      "relative rounded-[2px] border px-2 py-3 text-center transition-colors duration-300",
                      active
                        ? "border-signal bg-signal text-white"
                        : a === 0
                          ? "cursor-not-allowed border-white/[0.04] text-ash/40 line-through"
                          : "border-white/[0.08] bg-white/[0.02] text-bone hover:border-white/25",
                    )}
                  >
                    <span className="tabular block font-mono text-[14px]">{s.label}</span>
                    <motion.span
                      key={a}
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      className={clsx("mt-0.5 block text-[10px]", active ? "text-white/80" : low ? "text-amber" : "text-ash")}
                    >
                      {a === 0 ? "Full" : exp.kind === "Tournament" ? `${a} places` : `${a} rig${a > 1 ? "s" : ""} left`}
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <p className="py-6 text-[14px] text-smoke">
              {date ? "No sessions on this day. Try another date." : "Loading availability…"}
            </p>
          )}
          <p className="mt-5 text-[13px] text-ash">
            Can&apos;t find a time?{" "}
            <Link href="/contact" className="text-bone underline decoration-white/20 underline-offset-4 hover:decoration-white">
              Join the waitlist
            </Link>
          </p>

          <AnimatePresence>
            {toast && (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6 }}
                className="glass absolute -bottom-5 right-5 z-10 flex items-center gap-2 rounded-[2px] px-4 py-2 text-[12px] text-bone"
                role="status"
              >
                <Lightning size={13} weight="fill" className="text-amber" />
                {toast.text}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Summary */}
      <aside className="lg:col-span-4">
        <div className="panel p-6 sm:p-7 lg:sticky lg:top-28">
          <div className="text-[13px] text-ash">Your booking</div>
          <div className="font-display mt-3 text-[1.75rem] text-white">{exp.name}</div>
          <ul className="mt-6 space-y-3 border-y border-white/[0.07] py-5 text-[14px]">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-smoke">
                <CalendarDots size={16} />
                Date
              </span>
              <span className="text-bone">{date ? fmtLong(date) : "—"}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-smoke">
                <Clock size={16} />
                Start
              </span>
              <span className="tabular font-mono text-bone">{slot ?? "Select a time"}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-smoke">
                <Users size={16} />
                Drivers
              </span>
              <span className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Fewer drivers"
                  onClick={() => setDrivers((d) => Math.max(1, d - 1))}
                  className="grid size-8 place-items-center rounded-[2px] border border-white/10 text-smoke hover:text-white"
                >
                  <Minus size={12} />
                </button>
                <span className="tabular w-8 text-center font-mono text-bone">{drivers}</span>
                <button
                  type="button"
                  aria-label="More drivers"
                  onClick={() => setDrivers((d) => Math.min(maxDrivers, d + 1))}
                  className="grid size-8 place-items-center rounded-[2px] border border-white/10 text-smoke hover:text-white"
                >
                  <Plus size={12} />
                </button>
              </span>
            </li>
          </ul>
          <div className="flex items-end justify-between py-6">
            <span className="text-[14px] text-smoke">
              Total
              <span className="block text-[12px] text-ash">
                £{exp.price} × {drivers}
              </span>
            </span>
            <motion.span key={total} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-[2.6rem] text-white">
              £{total}
            </motion.span>
          </div>
          <Button href={site.bookingUrl} size="lg" className={clsx("w-full", !slot && "pointer-events-none opacity-40")}>
            Continue to secure checkout
          </Button>
          <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-ash">
            <ShieldCheck size={16} className="mt-px shrink-0 text-pb" />
            Payment is taken securely through our booking partner, Acuity Scheduling.
          </p>
        </div>
      </aside>
    </div>
  );
}

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-[16px] font-medium text-white">
      <span className="grid size-7 place-items-center rounded-[2px] bg-white/[0.06] font-mono text-[12px] text-smoke">{n}</span>
      {title}
    </h2>
  );
}
