"use client";

import Link from "next/link";
import clsx from "clsx";
import { Clock, SteeringWheel, Vibrate } from "@phosphor-icons/react";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import { sessions } from "@/lib/site";

export default function Sessions() {
  return (
    <section className="container-x py-20 sm:py-36" id="pricing">
      <div className="mb-10 sm:mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-6">Sessions and pricing</Eyebrow>
          <MaskHeading
            lines={["Pick your stint", <span key="2" className="text-white/50">We'll set up the rest</span>]}
            className="text-[clamp(1.98rem,4.54vw,3.86rem)] text-white"
          />
        </div>
        <Reveal className="hidden sm:block lg:col-span-5">
          <p className="max-w-md text-[16px] leading-relaxed text-smoke lg:ml-auto">
            Seat, wheel and pedals adjusted to you, assists tuned to your level. First lap or thousandth, you&apos;ll
            be on track within minutes.
          </p>
        </Reveal>
      </div>

      {/* phones: a compact price list */}
      <ul className="border-t border-white/[0.08] sm:hidden">
        {sessions.map((s) => (
          <li key={s.id} className="border-b border-white/[0.08]">
            <Link href={`/book?session=${s.id}`} className="flex items-center gap-4 py-4 active:bg-white/[0.03]">
              <span className="grid size-10 shrink-0 place-items-center rounded-[2px] border border-white/10 text-signal">
                {s.rig === "Motion" ? <Vibrate size={18} /> : <SteeringWheel size={18} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-label block text-[13px] text-white">
                  {s.name}
                  {s.featured && <span className="ml-2 text-signal-bright">Popular</span>}
                </span>
                <span className="mt-0.5 block text-[12px] text-ash">
                  {s.minutes >= 60 ? `${s.minutes / 60} hr` : `${s.minutes} min`} on the {s.rig.toLowerCase()} rig
                </span>
              </span>
              <span className="font-display text-[1.6rem] text-white">£{s.price}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {sessions.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.07}>
            <div className="h-full">
              <Link
                href={`/book?session=${s.id}`}
                className={clsx(
                  "group relative flex h-full flex-col overflow-hidden p-7 transition-colors duration-500",
                  s.featured
                    ? "border border-signal/50 bg-carbon"
                    : "panel hover:border-white/15",
                )}
              >
                {s.featured && (
                  <span className="font-label absolute right-6 top-6 rounded-[2px] bg-signal px-2.5 py-1 text-[10.5px] text-white">
                    Most booked
                  </span>
                )}
                <span className="flex items-center gap-2 text-[13px] text-smoke">
                  {s.rig === "Motion" ? <Vibrate size={16} className="text-signal" /> : <SteeringWheel size={16} className="text-signal" />}
                  {s.rig} rig
                </span>
                <h3 className="font-display mt-10 text-[1.35rem] text-white">{s.name}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-[13px] text-ash">
                  <Clock size={14} />
                  {s.minutes >= 60 ? `${s.minutes / 60} hour${s.minutes > 60 ? "s" : ""}` : `${s.minutes} minutes`}
                </div>
                <div className="font-display mt-8 text-[3.4rem] text-white">
                  <span className="align-top text-[1.4rem] text-smoke">£</span>
                  {s.price}
                </div>
                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-smoke">{s.blurb}</p>
                <span className="font-label mt-8 flex items-center justify-between border-t border-white/[0.08] pt-5 text-[12px] text-bone">
                  Book this session
                </span>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4">
        <div className="panel mt-4 flex flex-col items-start justify-between gap-3 px-5 py-5 sm:mt-0 sm:flex-row sm:items-center sm:gap-4 sm:px-7 sm:py-6">
          <p className="text-[14px] text-smoke sm:text-[15px]">
            <span className="text-bone">Groups, parties and corporate.</span> Packages for up to 30 drivers, private hire
            and tournament formats.
          </p>
          <Link href="/events" className="font-label group flex items-center gap-2 text-[12px] text-bone">
            See event packages
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
