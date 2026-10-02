"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./ui/Button";
import OpenStatus from "./OpenStatus";

/** Phone-only booking bar: appears after the hero, steps aside near the footer and on /book. */
export default function MobileBookBar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 520;
    setShow(y > window.innerHeight * 0.85 && !nearEnd);
  });

  if (pathname === "/book") return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-ink/[0.97] pb-[env(safe-area-inset-bottom)] lg:hidden"
        >
          <div className="container-x flex h-16 items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="font-label text-[12px] text-white">Sessions from £15</div>
              <OpenStatus className="mt-0.5 text-[11px]" />
            </div>
            <Button href="/book" size="md" className="shrink-0">
              Book
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
