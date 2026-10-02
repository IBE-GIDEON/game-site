"use client";

import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

export function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-2 flex items-baseline justify-between text-[13px]">
        <span className="text-bone/90">{label}</span>
        {error ? <span className="text-signal-bright">{error}</span> : hint && <span className="text-ash">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

const inputBase =
  "w-full rounded-[2px] border bg-white/[0.03] px-4 text-[15px] text-white placeholder:text-ash outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:bg-white/[0.05] focus:border-white/30 [color-scheme:dark]";

export function Input({ invalid, className, ...props }: ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={clsx(inputBase, "h-12", invalid ? "border-signal/60" : "border-white/10", className)}
    />
  );
}

export function Textarea({ invalid, className, ...props }: ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={clsx(inputBase, "min-h-32 resize-y py-3", invalid ? "border-signal/60" : "border-white/10", className)}
    />
  );
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        "h-11 rounded-[2px] border px-4 text-[14px] transition-all duration-300",
        active
          ? "border-signal/60 bg-signal/15 text-white"
          : "border-white/10 bg-white/[0.03] text-smoke hover:border-white/25 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}
