"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, Cube, Gauge, Monitor, SteeringWheel, Vibrate } from "@phosphor-icons/react";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import type { Icon } from "@phosphor-icons/react";

function PhotoCard({
  src,
  alt,
  Icon,
  title,
  body,
  className,
  spec,
  sizes,
}: {
  src: string;
  alt: string;
  Icon: Icon;
  title: string;
  body: string;
  className?: string;
  spec?: string;
  sizes: string;
}) {
  return (
    <div className={clsx("group relative isolate overflow-hidden border border-white/[0.07] bg-carbon", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={85}
        className="-z-10 object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/0" />
      <div className="flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-bone/80">
          <Icon size={16} className="text-signal" />
          {spec ?? title}
        </div>
        <div>
          <h3 className="font-display text-[clamp(1.35rem,2.02vw,1.76rem)] text-white">{title}</h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-smoke">{body}</p>
        </div>
      </div>
    </div>
  );
}

/** Brake pressure trace: load-cell pedals respond to force, so the trace has a sharp peak and a modulated release. */
function BrakeTrace() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const d =
    "M0 110 L40 110 C52 110 54 18 66 16 C80 14 92 30 104 42 C118 56 130 70 146 82 C160 92 172 104 186 110 L240 110 C252 110 254 34 266 32 C280 30 290 52 304 70 C316 86 328 102 344 110 L400 110";
  return (
    <svg ref={ref} viewBox="0 0 400 130" className="w-full" aria-hidden>
      {[30, 60, 90].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="white" strokeOpacity="0.05" />
      ))}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#brakeGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
      />
      <defs>
        <linearGradient id="brakeGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#9e0b13" />
          <stop offset="0.5" stopColor="#ff2a35" />
          <stop offset="1" stopColor="#f5b800" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const SLIDES = 5;

export default function Hardware() {
  // Phones get a one-card-at-a-time carousel that advances on its own;
  // tablets and desktop keep the grid.
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const holdUntil = useRef(0);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = (i + SLIDES) % SLIDES;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };
  const hold = () => {
    holdUntil.current = Date.now() + 8000;
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const phone = window.matchMedia("(max-width: 767px)");
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const id = window.setInterval(() => {
      if (!phone.matches || !visible || document.hidden || Date.now() < holdUntil.current) return;
      go(Math.round(el.scrollLeft / el.clientWidth) + 1);
    }, 4000);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <section className="container-x pb-20 sm:pb-36">
      <div className="mb-10 sm:mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-6">The hardware</Eyebrow>
          <MaskHeading
            lines={["Built by engineers", <span key="2" className="text-white/50">Designed for drivers</span>]}
            className="text-[clamp(1.98rem,4.54vw,3.86rem)] text-white"
          />
        </div>
        <Reveal className="hidden sm:block lg:col-span-5">
          <p className="max-w-md text-[16px] leading-relaxed text-smoke lg:ml-auto">
            The same class of equipment trusted by serious sim racers and professional drivers. No &ldquo;basic&rdquo;
            setups, no worn-out kit. Every rig is identical, so the fastest driver wins, not the luckiest.
          </p>
        </Reveal>
      </div>

      <Reveal>
      <div
        ref={track}
        onScroll={onScroll}
        onPointerDown={hold}
        onTouchStart={hold}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain md:grid md:auto-rows-[minmax(260px,auto)] md:grid-cols-6 md:gap-4 md:overflow-visible lg:auto-rows-[300px]"
        aria-roledescription="carousel"
      >
        <div className="h-[420px] w-full shrink-0 snap-center md:h-auto md:w-auto md:col-span-6 lg:col-span-4 lg:row-span-2">
          <PhotoCard
            src="/images/venue-rig-closeup.jpg"
            alt="Drivers on Racecraft Sim direct-drive rigs during a session"
            Icon={SteeringWheel}
            title="Direct-drive steering"
            body="The motor sits on the wheel shaft. Every slide, kerb and loss of grip arrives at your hands instantly, with nothing lost to belts or gears."
            spec="DD wheelbase"
            className="h-full md:min-h-[420px]"
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        </div>

        <div className="h-[420px] w-full shrink-0 snap-center md:h-auto md:w-auto md:col-span-3 lg:col-span-2">
          <div className="panel flex h-full flex-col justify-between p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-bone/80">
                <Gauge size={16} className="text-signal" />
                Load cell
              </span>
              <span className="font-mono text-[11px] text-ash">BRAKE kg</span>
            </div>
            <BrakeTrace />
            <div>
              <h3 className="font-display text-[1.6rem] text-white">Load-cell braking</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-smoke">Brake by pressure, not pedal travel, exactly like a race car.</p>
            </div>
          </div>
        </div>

        <div className="h-[420px] w-full shrink-0 snap-center md:h-auto md:w-auto md:col-span-3 lg:col-span-2">
          <PhotoCard
            src="/images/venue-rigs-row.jpg"
            alt="A row of identical rigid aluminium cockpits"
            Icon={Cube}
            title="Rigid cockpits"
            body="Aluminium profile chassis. Zero flex, so every input is exact."
            className="h-full"
            sizes="(min-width: 1024px) 33vw, 50vw"
          />
        </div>

        <div className="h-[420px] w-full shrink-0 snap-center md:h-auto md:w-auto md:col-span-3">
          <PhotoCard
            src="/images/venue-telemetry-screens.jpg"
            alt="Drivers racing on ultrawide displays with live timing overhead"
            Icon={Monitor}
            title="Ultrawide displays"
            body="Wide field of view for real apex judgement and door-to-door racing."
            className="h-full"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        <div className="h-[420px] w-full shrink-0 snap-center md:h-auto md:w-auto md:col-span-3">
          <PhotoCard
            src="/images/race-cockpit.jpg"
            alt="Inside a stripped-out race car cockpit"
            Icon={Vibrate}
            title="Motion and VR"
            body="Our premium motion rig moves under braking, cornering and kerb strikes. Add VR for full immersion."
            spec="From £35"
            className="h-full"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between md:hidden">
        <span className="font-mono text-[13px] text-smoke">
          {String(index + 1).padStart(2, "0")} / {String(SLIDES).padStart(2, "0")}
        </span>
        <div className="flex">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => {
              hold();
              go(index - 1);
            }}
            className="grid size-11 place-items-center text-bone transition-opacity active:opacity-60"
          >
            <ArrowLeft size={22} weight="bold" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => {
              hold();
              go(index + 1);
            }}
            className="grid size-11 place-items-center text-bone transition-opacity active:opacity-60"
          >
            <ArrowRight size={22} weight="bold" />
          </button>
        </div>
      </div>
      </Reveal>
    </section>
  );
}
