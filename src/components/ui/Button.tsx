"use client";

import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "signal" | "outline" | "ghost";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
  external?: boolean;
} & Omit<ComponentProps<"button">, "className" | "children">;

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-[2px] font-label transition-[background-color,border-color,color] duration-300 ease-out disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  signal: "bg-signal text-white hover:bg-signal-bright",
  // outlined: hairline border that fills white on hover
  outline: "border border-white/25 text-bone hover:border-white hover:bg-white hover:text-ink",
  ghost: "text-bone underline-offset-[6px] hover:text-white hover:underline",
};

const sizes = {
  md: "h-11 px-5 text-[12.5px]",
  lg: "h-13 px-7 text-[13.5px]",
};

export default function Button({
  href,
  children,
  variant = "signal",
  size = "md",
  icon = false,
  className,
  external,
  ...rest
}: Props) {
  const classes = clsx(base, variants[variant], variant !== "ghost" && sizes[size], className);

  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight
          weight="bold"
          className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
