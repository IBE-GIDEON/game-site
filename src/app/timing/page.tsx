import type { Metadata } from "next";
import Image from "next/image";
import { ChartLine, Flag, Trophy, UsersThree } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import LiveTiming from "@/components/live/LiveTiming";
import RigStatus from "@/components/live/RigStatus";
import Button from "@/components/ui/Button";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import CtaBand from "@/components/CtaBand";
import { monthly, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Live timing and leaderboards",
  description: "Live lap times, rig status and the monthly venue leaderboard at Racecraft Sim, Peterborough.",
};

export default function TimingPage() {
  return (
    <>
      <PageHero
        title={["The pit wall", <span key="2" className="text-white/50">in your pocket</span>]}
        intro="Every lap at Racecraft Sim is captured automatically in real time. Watch the session live, check which rigs are free, then chase the monthly record."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={site.driverPortal} icon={false}>Open my driver data</Button>
          <Button href="/book" variant="outline" icon={false}>
            Book a rig
          </Button>
        </div>
      </PageHero>

      <section className="container-x space-y-4 pb-16 sm:pb-32">
        <Reveal y={40}>
          <LiveTiming />
        </Reveal>
        <Reveal y={40}>
          <RigStatus />
        </Reveal>
      </section>

      <section className="container-x pb-16 sm:pb-32">
        <div className="mb-10 sm:mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-6">Monthly leaderboard</Eyebrow>
            <MaskHeading
              lines={[`${monthly.track} ${monthly.month}`, <span key="2" className="text-white/50">The record fell on the 29th</span>]}
              className="text-[clamp(1.8rem,3.86vw,3.19rem)] text-white"
            />
          </div>
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[16px] leading-relaxed text-smoke lg:ml-auto">
              {monthly.record.driver} posted a {monthly.record.time} on {monthly.record.date} and broke {monthly.record.beat}&apos;s
              record. Every lap set at the venue counts toward the month&apos;s standings.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="panel overflow-hidden">
              <div className="grid grid-cols-[40px_1fr_auto] gap-x-4 border-b border-white/[0.07] px-5 py-3 text-[11px] text-ash sm:grid-cols-[48px_1.1fr_1.2fr_auto_auto] sm:px-7">
                <span>Pos</span>
                <span>Driver</span>
                <span className="hidden sm:block">Car</span>
                <span className="hidden text-right sm:block">Date</span>
                <span className="text-right">Time</span>
              </div>
              <ol>
                {monthly.rows.map((r) => (
                  <li
                    key={r.pos}
                    className="grid grid-cols-[40px_1fr_auto] items-center gap-x-4 border-b border-white/[0.05] px-5 py-4 transition-colors last:border-b-0 hover:bg-white/[0.02] sm:grid-cols-[48px_1.1fr_1.2fr_auto_auto] sm:px-7"
                  >
                    <span
                      className={
                        r.pos === 1
                          ? "grid size-7 place-items-center rounded-[2px] bg-amber/15 font-mono text-[12px] text-amber ring-1 ring-amber/30"
                          : r.pos <= 3
                            ? "grid size-7 place-items-center rounded-[2px] bg-white/[0.06] font-mono text-[12px] text-bone"
                            : "pl-2 font-mono text-[12px] text-ash"
                      }
                    >
                      {r.pos}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[15px] text-bone">{r.driver}</div>
                      <div className="truncate text-[12px] text-ash sm:hidden">{r.car}</div>
                    </div>
                    <span className="hidden truncate text-[14px] text-smoke sm:block">{r.car}</span>
                    <span className="hidden text-right font-mono text-[12px] text-ash sm:block">{r.date}</span>
                    <span className={`tabular text-right font-mono text-[14px] ${r.pos === 1 ? "text-purple" : "text-bone"}`}>{r.time}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:col-span-4">
            <Reveal delay={0.06}>
              <div className="relative overflow-hidden border border-purple/25 bg-[linear-gradient(160deg,rgb(169_112_255/0.18),rgb(169_112_255/0.02)_60%)] p-7">
                <div className="flex items-center justify-between text-[12px] text-smoke">
                  <span className="flex items-center gap-1.5">
                    <Trophy size={14} weight="fill" className="text-amber" />
                    New track record
                  </span>
                  <span>{monthly.record.date}</span>
                </div>
                <div className="tabular mt-6 font-mono text-[44px] leading-none text-white">{monthly.record.time}</div>
                <div className="mt-3 text-[14px] text-smoke">by {monthly.record.driver}, Ferrari SF70H</div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { Icon: ChartLine, v: monthly.laps, l: "lap times this month" },
                  { Icon: UsersThree, v: monthly.drivers, l: "drivers competing" },
                ].map(({ Icon, v, l }) => (
                  <div key={l} className="panel p-5">
                    <Icon size={20} className="text-signal" />
                    <div className="font-display mt-6 text-[2rem] text-white">{v}</div>
                    <div className="mt-1 text-[12px] text-smoke">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-32">
        <Reveal>
          <div className="group relative isolate grid overflow-hidden border border-white/[0.08] lg:grid-cols-2">
            <div className="relative min-h-[320px]">
              <Image
                src="/images/barcelona-long-exposure.jpg"
                alt="Light trails through a chicane at Circuit de Barcelona-Catalunya at dusk"
                fill
                quality={85}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.6s] group-hover:scale-105"
              />
            </div>
            <div className="panel flex flex-col justify-center p-8 sm:p-12">
              <span className="flex items-center gap-2 text-[13px] text-smoke">
                <Flag size={16} className="text-signal" />
                September track of the month
              </span>
              <h2 className="font-display mt-6 text-[clamp(1.8rem,3.36vw,2.86rem)] text-white">Circuit de Barcelona-Catalunya</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-smoke">
                New month, new circuit, new challenge. Learn the long right of turn three, nail the final chicane and see if you
                can be the fastest in September.
              </p>
              <div className="mt-9">
                <Button href="/book" icon={false}>Take on Barcelona</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand title={["Think you can", "take the top spot?"]} />
    </>
  );
}
