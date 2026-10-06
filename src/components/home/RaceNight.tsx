"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CalendarDots, Medal, Timer, Trophy } from "@phosphor-icons/react";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Button from "@/components/ui/Button";
import { raceNight, site } from "@/lib/site";

function PointsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <div ref={ref} className="space-y-2">
      {raceNight.points.map((p, i) => (
        <div key={i} className="grid grid-cols-[34px_1fr_44px] items-center gap-3 text-[13px]">
          <span className="font-mono text-ash">P{i + 1}</span>
          <div className="h-2 overflow-hidden rounded-[2px] bg-white/[0.05]">
            <motion.div
              className="h-full rounded-[2px]"
              style={{
                background: i === 0 ? "linear-gradient(90deg,#b8860b,#f5b800)" : i < 3 ? "linear-gradient(90deg,#9e0b13,#ff2a35)" : "rgb(255 255 255 / 0.22)",
              }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${(p / 10) * 100}%` } : undefined}
              transition={{ duration: 1.2, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="text-right font-mono text-bone">{p} pts</span>
        </div>
      ))}
    </div>
  );
}

export default function RaceNight() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden border-y border-white/[0.07] bg-carbon/40 py-20 sm:py-36">
      <div className="container-x">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow className="mb-6">Friday night tournament</Eyebrow>
              <MaskHeading
                lines={["Sixteen drivers", "Four hours", <span key="3" className="text-signal-bright">One podium</span>]}
                className="text-[clamp(1.98rem,4.2vw,3.53rem)] text-white"
              />
              <Reveal>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-smoke sm:mt-8 sm:text-[16px]">
                  One car, one track, eight rigs.
                  <span className="hidden sm:inline">
                    {" "}Hot-lap qualifying sets the grid, heats and semis decide the final, and every driver is guaranteed at
                    least two hours of racing.
                  </span>
                </p>
              </Reveal>

              <Reveal delay={0.1} className="mt-8 sm:mt-10">
                <div className="glass flex items-stretch overflow-hidden">
                  <div className="border-r border-white/10 px-6 py-5">
                    <div className="font-label text-[11px] text-ash">Entry</div>
                    <div className="font-display mt-1 text-[2.6rem] text-white">£{raceNight.price}</div>
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-5 text-[14px] text-smoke">
                    <span className="flex items-center gap-2">
                      <CalendarDots size={16} className="text-signal" />
                      {raceNight.day}, {raceNight.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <Timer size={16} className="text-signal" />
                      Minimum 2 hours racing
                    </span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.15} className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                <Button href={site.bookingUrl} icon={false}>Enter Friday&apos;s race</Button>
                <Button href="/timing" variant="outline" className="max-sm:hidden" icon={false}>
                  See the leaderboard
                </Button>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ParallaxImage
              src="/images/venue-full-grid.jpg"
              alt="A full grid of drivers racing side by side under the Racecraft Sim logo wall"
              className="aspect-[16/10] border border-white/[0.07]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />

            <div className="mt-10 grid gap-12 sm:mt-14 md:grid-cols-[1.25fr_1fr]">
              <div>
                <h3 className="font-label mb-5 text-[11.5px] text-ash sm:mb-6">Run of the night</h3>
                <ol ref={listRef} className="relative">
                  <span className="absolute bottom-3 left-[5px] top-3 w-px bg-white/10" />
                  <motion.span className="absolute left-[5px] top-3 w-px origin-top bg-signal" style={{ height: fill }} />
                  {raceNight.schedule.map((s, i) => (
                    <Reveal as="li" key={s.time} delay={i * 0.04} className="relative pb-4 pl-8 last:pb-0 sm:pb-7">
                      <span className="absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-ink bg-steel ring-1 ring-white/20" />
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[12px] text-signal-bright">{s.time}</span>
                        <span className="text-[15px] font-medium text-bone sm:text-[16px]">{s.title}</span>
                      </div>
                      <p className="mt-1 hidden text-[14px] text-smoke sm:block">{s.detail}</p>
                    </Reveal>
                  ))}
                </ol>
              </div>

              <div className="hidden md:block">
                <h3 className="font-label mb-6 text-[11.5px] text-ash">Points system</h3>
                <PointsChart />
                <div className="mt-10 grid grid-cols-2 gap-3">
                  {[
                    { Icon: Trophy, label: "Podium trophies", color: "text-amber" },
                    { Icon: Medal, label: "Fastest-lap award", color: "text-purple" },
                  ].map(({ Icon, label, color }) => (
                    <div key={label} className="panel rounded-[2px] p-4">
                      <Icon size={22} weight="duotone" className={color} />
                      <div className="mt-3 text-[13px] text-bone">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
