"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { BookLabel } from "@/components/ui/Tyre";
import { useEffect, useRef } from "react";
import { Timer, Trophy } from "@phosphor-icons/react";
import { MaskHeading } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { useReady } from "@/lib/ready";
import { monthly } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Venue reel (cut from the client's promo, watermark cropped, muted).
 * Always autoplays, restarts when the loader lifts and pauses off-screen.
 * Phones in power-saving mode block autoplay for every site; there the native
 * play button is hidden (see .hero-video in globals.css), the poster frame shows,
 * and the reel starts on the visitor's first touch anywhere on the page.
 */
function HeroVideo({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // belt and braces for mobile Safari: muted must be a property and an attribute
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    let visible = true;
    const tryPlay = () => {
      if (visible) v.play().catch(() => {});
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) tryPlay();
      else v.pause();
    });
    io.observe(v);

    // if autoplay was refused, the first touch or tap counts as permission
    const onGesture = () => {
      tryPlay();
      if (!v.paused) removeGesture();
    };
    const events = ["touchstart", "pointerdown", "click", "keydown"] as const;
    const removeGesture = () => events.forEach((e) => window.removeEventListener(e, onGesture));
    events.forEach((e) => window.addEventListener(e, onGesture, { passive: true }));

    // resume after the tab or app comes back to the foreground
    const onVisible = () => document.visibilityState === "visible" && tryPlay();
    document.addEventListener("visibilitychange", onVisible);

    tryPlay();
    return () => {
      io.disconnect();
      removeGesture();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!ready || !v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [ready]);

  return (
    <video
      ref={ref}
      className="hero-video absolute inset-0 h-full w-full object-cover object-[50%_40%]"
      poster="/video/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.75)_0%,rgb(0_0_0/0.3)_28%,rgb(0_0_0/0.8)_66%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_0%_100%,rgb(0_0_0/0.92),transparent_65%)]" />

      <motion.div style={{ opacity: fade }} className="container-x relative z-10 pb-10 sm:pb-14 lg:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MaskHeading
              as="h1"
              play={ready}
              delay={0.15}
              lines={["Sim racing", <span key="b" className="text-signal">done properly</span>]}
              className="text-[clamp(2.3rem,7.1vw,6.1rem)] text-white"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, delay: 0.45, ease }}
              className="mt-5 max-w-xl text-[16px] leading-relaxed text-smoke sm:mt-7 sm:text-[18px]"
            >
              <span className="sm:hidden">Peterborough&apos;s premium racing simulator venue.</span>
              <span className="hidden sm:inline">
                Peterborough&apos;s premium racing simulator venue. Direct-drive rigs, real-world circuits and a
                paddock atmosphere for solo sessions, race nights, parties and corporate events.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, delay: 0.55, ease }}
              className="mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap"
            >
              <Button href="/book" size="lg" icon={false}>
                <BookLabel hub="#000" />
              </Button>
              <Button href="/timing" variant="outline" size="lg" icon={false}>
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
              <span>{monthly.track} {monthly.month}</span>
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
      </motion.div>
    </section>
  );
}
