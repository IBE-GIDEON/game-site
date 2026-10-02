"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import clsx from "clsx";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </Comp>
  );
}

/** Headline that rises line-by-line from behind a mask. Pass lines as an array. */
export function MaskHeading({
  lines,
  className,
  as: Tag = "h2",
  delay = 0,
  play,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  /** When provided, animation is driven by this flag instead of viewport. */
  play?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const show = play ?? inView;
  return (
    <Tag ref={ref} className={clsx("font-display", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : undefined}
            transition={{ duration: reduce ? 0.01 : 0.9, delay: delay + i * 0.06, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("font-label flex items-center gap-2.5 text-[11.5px] text-smoke", className)}>
      <span className="h-px w-6 bg-signal" />
      {children}
    </div>
  );
}
