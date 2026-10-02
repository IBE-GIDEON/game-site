import Link from "next/link";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { raceNight, sessions } from "@/lib/site";

const duration = (m: number) => (m >= 60 ? `${m / 60} hour${m > 60 ? "s" : ""}` : `${m} minutes`);

export default function Sessions() {
  return (
    <section className="container-x py-20 sm:py-32" id="pricing">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] text-white">Prices</h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-smoke">
            Per driver. We set the seat, wheel and assists up for you, so you&apos;re on track in minutes.
          </p>
          <div className="mt-6">
            <Button href="/book">Book online</Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-8">
          <ul>
            {sessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/book?session=${s.id}`}
                  className="group flex items-baseline justify-between gap-6 py-4 transition-colors sm:py-5"
                >
                  <span>
                    <span className="block text-[17px] text-white transition-colors group-hover:text-signal-bright sm:text-[19px]">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-ash">
                      {duration(s.minutes)}, {s.rig.toLowerCase()} rig
                    </span>
                  </span>
                  <span className="font-mono text-[20px] text-white sm:text-[22px]">£{s.price}</span>
                </Link>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-6 py-4 sm:py-5">
              <span>
                <span className="block text-[17px] text-white sm:text-[19px]">Friday race night</span>
                <span className="mt-0.5 block text-[13px] text-ash">7pm to 11pm, tournament entry</span>
              </span>
              <span className="font-mono text-[20px] text-white sm:text-[22px]">£{raceNight.price}</span>
            </li>
          </ul>
          <p className="mt-6 text-[14px] text-smoke">
            Parties and team days are priced by group.{" "}
            <Link href="/events" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              See packages
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
