"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Reveal";

const shots = [
  { src: "/images/venue-start-screens.jpg", caption: "Start your engines", w: "w-[78vw] sm:w-[58vw] lg:w-[46vw]", ratio: "aspect-[4/3]" },
  { src: "/images/venue-driver-window.jpg", caption: "Seat, wheel and pedals set to you", w: "w-[62vw] sm:w-[40vw] lg:w-[28vw]", ratio: "aspect-[3/4]" },
  { src: "/images/barcelona-long-exposure.jpg", caption: "Barcelona is this month's track", w: "w-[82vw] sm:w-[60vw] lg:w-[48vw]", ratio: "aspect-[3/2]" },
  { src: "/images/venue-lounge.jpg", caption: "The driver lounge", w: "w-[62vw] sm:w-[40vw] lg:w-[28vw]", ratio: "aspect-[3/4]" },
  { src: "/images/venue-drivers-racing.jpg", caption: "A full grid on race night", w: "w-[78vw] sm:w-[58vw] lg:w-[46vw]", ratio: "aspect-[4/3]" },
  { src: "/images/venue-rig-window.jpg", caption: "Eight identical rigs", w: "w-[62vw] sm:w-[40vw] lg:w-[28vw]", ratio: "aspect-[3/4]" },
  { src: "/images/driver-helmet.jpg", caption: "Race-day focus", w: "w-[62vw] sm:w-[40vw] lg:w-[34vw]", ratio: "aspect-[5/4]" },
];

function Shot({ s, i, sizes }: { s: (typeof shots)[number]; i: number; sizes: string }) {
  return (
    <>
      <div className={`group relative overflow-hidden border border-white/[0.07] ${s.ratio}`}>
        <Image
          src={s.src}
          alt={s.caption}
          fill
          quality={85}
          sizes={sizes}
          className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>
      <figcaption className="mt-3 flex items-center gap-3 text-[13px] text-smoke sm:mt-4">
        <span className="font-mono text-ash">{String(i + 1).padStart(2, "0")}</span>
        {s.caption}
      </figcaption>
    </>
  );
}

/** Phones and tablets: a native swipe row. No scroll pinning, so the page never feels stuck. */
function GallerySwipe() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x mb-8">
        <Eyebrow className="mb-5">Inside the venue</Eyebrow>
        <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] text-white">7 Midgate House</h2>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:gap-4 sm:px-7">
        {shots.map((s, i) => (
          <figure key={s.src} className="w-[78vw] shrink-0 snap-start sm:w-[52vw]">
            <Shot s={{ ...s, ratio: "aspect-[4/5]" }} i={i} sizes="80vw" />
          </figure>
        ))}
        <span className="w-1 shrink-0" aria-hidden />
      </div>
    </section>
  );
}

function GalleryPinned() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={section} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x mb-10 flex items-end justify-between gap-6">
          <div>
            <Eyebrow className="mb-5">Inside the venue</Eyebrow>
            <h2 className="font-display text-[clamp(1.8rem,3.86vw,3.19rem)] text-white">7 Midgate House, Peterborough</h2>
          </div>
          <div className="w-48">
            <div className="h-px bg-white/10">
              <motion.div className="h-px bg-signal" style={{ width: progress }} />
            </div>
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex items-center gap-6 pl-10 pr-[8vw] will-change-transform">
          {shots.map((s, i) => (
            <figure key={s.src} className={`shrink-0 ${s.w}`}>
              <Shot s={s} i={i} sizes="48vw" />
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Gallery() {
  const [desktop, setDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  // Server render and first paint use the swipe layout; desktop upgrades to the pinned reel.
  return desktop ? <GalleryPinned /> : <GallerySwipe />;
}
