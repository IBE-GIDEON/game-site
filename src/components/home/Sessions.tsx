"use client";

import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Clock, SteeringWheel, Vibrate } from "@phosphor-icons/react";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import { sessions } from "@/lib/site";

export default function Sessions() {
  return (
    <section className="container-x py-28 sm:py-36" id="pricing">
      <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-6">Sessions & pricing</Eyebrow>
          <MaskHeading
            lines={["Pick your stint.", <span key="2" className="text-white/50">We'll set up the rest.</span>]}
            className="text-[clamp(2.2rem,5.4vw,4.6rem)] text-white"
          />
        </div>
        <Reveal className="lg:col-span-5">
          <p className="max-w-md text-[16px] leading-relaxed text-smoke lg:ml-auto">
            Seat, wheel and pedals adjusted to you, assists tuned to your level. First lap or thousandth, you&apos;ll
            be on track within minutes.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  <span className="absolute right-6 top-6 rounded-[2px] bg-signal px-2.5 py-1 text-[11px] font-medium text-white">
                    Most booked
                  </span>
                )}
                <span className="flex items-center gap-2 text-[13px] text-smoke">
                  {s.rig === "Motion" ? <Vibrate size={16} className="text-signal" /> : <SteeringWheel size={16} className="text-signal" />}
                  {s.rig} rig
                </span>
                <h3 className="mt-10 text-[20px] font-medium text-white">{s.name}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-[13px] text-ash">
                  <Clock size={14} />
                  {s.minutes >= 60 ? `${s.minutes / 60} hour${s.minutes > 60 ? "s" : ""}` : `${s.minutes} minutes`}
                </div>
                <div className="font-display mt-8 text-[3.4rem] text-white">
                  <span className="align-top text-[1.4rem] text-smoke">£</span>
                  {s.price}
                </div>
                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-smoke">{s.blurb}</p>
                <span className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-5 text-[14px] text-bone">
                  Book this session
                  <ArrowRight size={16} className="text-smoke transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </span>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4">
        <div className="panel flex flex-col items-start justify-between gap-4 px-7 py-6 sm:flex-row sm:items-center">
          <p className="text-[15px] text-smoke">
            <span className="text-bone">Groups, parties and corporate.</span> Packages for up to 30 drivers, private hire
            and tournament formats.
          </p>
          <Link href="/events" className="group flex items-center gap-2 text-[14px] text-bone">
            See event packages
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
