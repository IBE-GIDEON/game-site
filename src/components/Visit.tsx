import { Clock } from "@phosphor-icons/react/dist/ssr";
import { MapsIcon, ParkingIcon, PhoneIcon } from "@/components/ui/BrandIcons";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import OpenStatus from "@/components/OpenStatus";
import { hours, site } from "@/lib/site";

const fmt = (h: number) => `${h > 12 ? h - 12 : h}${h >= 12 ? "pm" : "am"}`;

export default function Visit() {
  return (
    <section className="container-x py-20 sm:py-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow className="mb-6">Visit us</Eyebrow>
          <MaskHeading lines={["In the heart of", "Peterborough"]} className="text-[clamp(1.98rem,4.2vw,3.53rem)] text-white" />
          <Reveal>
            <OpenStatus className="mt-8" />
          </Reveal>

          <div className="mt-10 space-y-px overflow-hidden border border-white/[0.07] bg-white/[0.07]">
            {[
              { Icon: MapsIcon, title: "Address", body: site.address.join(", ") },
              { Icon: ParkingIcon, title: "Parking", body: "Monk Stone House Car Park, PE1 1SA. Pay with RingGo." },
              { Icon: PhoneIcon, title: "Call or WhatsApp", body: site.phone },
            ].map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.06} className="flex gap-4 bg-ink p-5">
                <span className="mt-0.5 grid w-6 shrink-0 place-items-start">
                  <Icon size={22} />
                </span>
                <div>
                  <div className="text-[13px] text-ash">{title}</div>
                  <div className="mt-1 text-[15px] text-bone">{body}</div>
                </div>
              </Reveal>
            ))}
            <Reveal className="flex gap-4 bg-ink p-5">
              <Clock size={22} className="mt-0.5 w-6 shrink-0 text-smoke" />
              <div className="flex-1">
                <div className="text-[13px] text-ash">Opening hours</div>
                <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-[14px]">
                  {[3, 4, 5, 6, 0, 1].map((d) => (
                    <li key={d} className="flex justify-between text-smoke">
                      <span>{hours[d].day.slice(0, 3)}</span>
                      <span className="tabular font-mono text-[12px] text-bone/80">
                        {hours[d].open === null ? "Closed" : `${fmt(hours[d].open!)} to ${fmt(hours[d].close!)}`}
                      </span>
                    </li>
                  ))}
                  <li className="flex justify-between text-smoke">
                    <span>Tue</span>
                    <span className="font-mono text-[12px] text-bone/80">Closed</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`} variant="outline">
              Get directions
            </Button>
            <Button href={site.whatsapp} variant="ghost">
              Message on WhatsApp
            </Button>
          </div>
        </div>

        <Reveal className="lg:col-span-7" y={40}>
          <div className="relative h-full min-h-[260px] overflow-hidden sm:min-h-[420px] border border-white/[0.07]">
            <iframe
              title="Map showing Racecraft Sim in Peterborough"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=16&output=embed`}
              className="absolute inset-0 h-full w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.35)_brightness(0.9)_contrast(1.05)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
            <div className="glass absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-[2px] p-4 sm:right-auto">
              <div className="flex items-center gap-3">
                <MapsIcon size={28} />
                <div>
                  <div className="text-[14px] text-white">Racecraft Sim</div>
                  <div className="text-[12px] text-smoke">{site.address.join(", ")}</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
