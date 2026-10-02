"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowDown, Timer, Trophy } from "@phosphor-icons/react";
import { MaskHeading } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { useReady } from "@/lib/ready";
import { monthly } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Venue reel (cut from the client's promo, watermark cropped, muted).
 * Restarts from the first frame when the loader lifts, pauses off-screen,
 * and stays on the poster frame for reduced-motion visitors.
 */
function HeroVideo({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!ready || !v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [ready]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
      poster="/video/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Drivers racing on Racecraft Sim rigs in Peterborough"
    >
      <source src="/video/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  );
}

export default function Hero() {
  const ready = useReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[680px] items-end overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 2.2, ease }}
        >
          <HeroVideo ready={ready} />
        </motion.div>
      </motion.div>

      {/* grade: hold the type over moving footage without killing the picture */}
      <div className="absolute inset-0 bg-ink/25" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_8_10/0.75)_0%,rgb(8_8_10/0.3)_28%,rgb(8_8_10/0.8)_66%,#08080a_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_0%_100%,rgb(8_8_10/0.92),transparent_65%)]" />

      <motion.div style={{ opacity: fade }} className="container-x relative z-10 pb-10 sm:pb-14 lg:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MaskHeading
              as="h1"
              play={ready}
              delay={0.15}
              lines={["Sim racing,", <span key="b" className="text-white/55">done properly.</span>]}
              className="text-[clamp(2.75rem,7.4vw,7rem)] text-white"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, delay: 0.45, ease }}
              className="mt-7 max-w-xl text-[16px] leading-relaxed text-smoke sm:text-[18px]"
            >
              Peterborough&apos;s premium racing simulator venue. Direct-drive rigs, real-world circuits and a
              paddock atmosphere for solo sessions, race nights, parties and corporate events.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, delay: 0.55, ease }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href="/book" size="lg">
                Book a session
              </Button>
              <Button href="/timing" variant="outline" size="lg">
                Watch live timing
              </Button>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, delay: 0.7, ease }}
            className="glass hidden p-5 lg:col-span-4 lg:block"
          >
            <div className="flex items-center justify-between text-[12px] text-ash">
              <span>Monthly leaderboard</span>
              <span>{monthly.track} · {monthly.month}</span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="tabular font-mono text-[34px] leading-none text-white">{monthly.record.time}</div>
                <div className="mt-2 flex items-center gap-1.5 text-[13px] text-smoke">
                  <Trophy size={14} weight="fill" className="text-amber" />
                  Track record by {monthly.record.driver}
                </div>
              </div>
              <span className="rounded-[2px] bg-purple/15 px-2.5 py-1 font-mono text-[11px] text-purple ring-1 ring-purple/30">
                P1
              </span>
            </div>
            <div className="mt-5 h-px bg-white/10" />
            <div className="mt-4 flex items-center justify-between text-[13px]">
              <span className="flex items-center gap-1.5 text-smoke">
                <Timer size={14} />
                Track of the month
              </span>
              <span className="text-bone">Barcelona-Catalunya</span>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-12 hidden items-center gap-3 text-[12px] text-ash sm:flex"
        >
          <span className="grid size-8 place-items-center border border-white/15">
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
              <ArrowDown size={13} />
            </motion.span>
          </span>
          Scroll to explore the venue
        </motion.div>
      </motion.div>
    </section>
  );
}
