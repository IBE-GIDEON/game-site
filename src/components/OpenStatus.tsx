"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { hours } from "@/lib/site";

function londonNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const dayIdx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day: dayIdx, h: Number(get("hour")) + Number(get("minute")) / 60 };
}

function fmt(h: number) {
  const hh = Math.floor(h);
  return `${hh > 12 ? hh - 12 : hh}${hh >= 12 ? "pm" : "am"}`;
}

export function getStatus() {
  const { day, h } = londonNow();
  const today = hours[day];
  if (today.open !== null && today.close !== null && h >= today.open && h < today.close) {
    return { open: true, label: `Open now until ${fmt(today.close)}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const slot = hours[d];
    if (slot.open === null) continue;
    if (i === 0 && h >= slot.open) continue;
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : hours[d].day;
    return { open: false, label: `Opens ${when} at ${fmt(slot.open)}` };
  }
  return { open: false, label: "Closed" };
}

export default function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);
  useEffect(() => {
    setStatus(getStatus());
    const id = window.setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={clsx("flex items-center gap-2 text-smoke", !className?.includes("text-[") && "text-[13px]", className)}>
      <span className="relative flex size-2">
        <span
          className={clsx(
            "absolute inset-0 rounded-[2px]",
            status?.open ? "animate-pulse-dot bg-pb" : "bg-amber",
            !status && "bg-ash",
          )}
        />
      </span>
      <span className="whitespace-nowrap">{status ? status.label : "Checking hours"}</span>
    </div>
  );
}
