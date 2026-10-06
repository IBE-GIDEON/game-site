"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { markReady } from "@/lib/ready";

/** Total time from navigation start until the curtain lifts. */
const TOTAL_MS = 2000;

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    // The light sequence is pure CSS and starts at first paint, so hold only for
    // whatever is left of the two seconds once React has hydrated.
    const remaining = Math.max(150, TOTAL_MS - performance.now());
    const t = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = "";
      markReady();
    }, remaining);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="rc-loader fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={false}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[120px]" />

          <div className="relative flex flex-col items-center">
            <div className="rc-logo w-[min(64vw,260px)]">
              <Image src="/brand/logo-stacked.webp" alt="" width={1263} height={845} preload unoptimized className="h-auto w-full" />
            </div>

            {/* Five-light start gantry: lights come on one by one, then lights out */}
            <div className="mt-10 flex items-center gap-3 sm:gap-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-1.5 rounded-[2px] bg-carbon px-1.5 py-2 ring-1 ring-white/5">
                  {[0, 1].map((row) => (
                    <span
                      key={row}
                      className="rc-light block size-3 rounded-full sm:size-3.5"
                      style={{ ["--d" as string]: `${0.3 + i * 0.24}s` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
