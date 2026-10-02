import Image from "next/image";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { raceNight, site } from "@/lib/site";

export default function RaceNight() {
  return (
    <section className="container-x py-20 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/venue-full-grid.jpg"
                alt="A full grid of drivers racing side by side under the Racecraft Sim logo wall"
                fill
                quality={85}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-ash">A full grid on a Friday night.</figcaption>
          </figure>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:pt-4">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] text-white">Friday race night</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-smoke">
            One car, one track, sixteen drivers. Qualifying sets the grid, heats and semi-finals decide the final, and
            everyone gets at least two hours of racing. £{raceNight.price} to enter.
          </p>
          <dl className="mt-8 grid grid-cols-[4rem_1fr] gap-y-2 text-[14px]">
            {raceNight.schedule.map((s) => (
              <div key={s.time} className="contents">
                <dt className="font-mono text-ash">{s.time}</dt>
                <dd className="text-bone">{s.title}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <Button href={site.bookingUrl}>Enter this Friday</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
