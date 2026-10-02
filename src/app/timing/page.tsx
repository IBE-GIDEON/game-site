import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import LiveTiming from "@/components/live/LiveTiming";
import RigStatus from "@/components/live/RigStatus";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import CtaBand from "@/components/CtaBand";
import { monthly, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Live timing & leaderboards",
  description: "Live lap times, rig status and the monthly venue leaderboard at Racecraft Sim, Peterborough.",
};

const h2 = "font-display text-[clamp(1.9rem,3.6vw,3rem)] text-white";

export default function TimingPage() {
  return (
    <>
      <PageHero
        eyebrow="Live timing"
        title={["Live timing"]}
        intro="Every lap at Racecraft Sim is timed automatically. Watch today's session, see which rigs are free, and check the monthly standings."
      >
        <div className="flex flex-wrap items-center gap-6">
          <Button href={site.driverPortal}>My driver data</Button>
          <a href="/book" className="text-[15px] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            Book a rig
          </a>
        </div>
      </PageHero>

      <section className="container-x pb-20 sm:pb-32">
        <Reveal>
          <LiveTiming />
        </Reveal>
      </section>

      <section className="container-x pb-20 sm:pb-32">
        <Reveal>
          <h2 className={h2}>On the rigs now</h2>
          <div className="mt-10">
            <RigStatus />
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-20 sm:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className={h2}>{monthly.track}, {monthly.month}</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-smoke">
              {monthly.record.driver} set a {monthly.record.time} on {monthly.record.date}, beating {monthly.record.beat}&apos;s
              record. {monthly.laps} laps from {monthly.drivers} drivers this month.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <div className="font-label grid grid-cols-[2rem_1fr_auto] gap-x-4 pb-4 text-[11px] text-ash sm:grid-cols-[2rem_1fr_1fr_auto]">
              <span>Pos</span>
              <span>Driver</span>
              <span className="hidden sm:block">Car</span>
              <span className="text-right">Time</span>
            </div>
            <ol>
              {monthly.rows.map((r) => (
                <li key={r.pos} className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 py-2.5 text-[15px] sm:grid-cols-[2rem_1fr_1fr_auto]">
                  <span className="font-mono text-ash">{r.pos}</span>
                  <span className={r.pos === 1 ? "font-semibold text-white" : "text-bone"}>{r.driver}</span>
                  <span className="hidden text-smoke sm:block">{r.car}</span>
                  <span className={`text-right font-mono ${r.pos === 1 ? "font-semibold text-white" : "text-bone/85"}`}>{r.time}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20 sm:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/barcelona-long-exposure.jpg"
                  alt="Light trails through a chicane at Circuit de Barcelona-Catalunya at dusk"
                  fill
                  quality={85}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[13px] text-ash">Circuit de Barcelona-Catalunya.</figcaption>
            </figure>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:pt-4">
            <h2 className={h2}>Track of the month</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-smoke">
              September is Barcelona. Learn the long right of turn three, get the final chicane right, and see if you can
              be the fastest this month.
            </p>
            <div className="mt-6">
              <Button href="/book">Take on Barcelona</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title={["Think you can take the top spot?"]} />
    </>
  );
}
