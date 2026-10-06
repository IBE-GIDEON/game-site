"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import clsx from "clsx";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="border-t border-white/[0.08]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-b border-white/[0.08]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className={clsx("text-[17px] transition-colors sm:text-[19px]", isOpen ? "text-white" : "text-bone/85 group-hover:text-white")}>
                {item.q}
              </span>
              <span
                className={clsx(
                  "grid size-9 shrink-0 place-items-center transition-[transform,color] duration-500",
                  isOpen ? "rotate-45 text-white" : "text-smoke group-hover:text-white",
                )}
              >
                <Plus size={20} weight="bold" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-relaxed text-smoke">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
