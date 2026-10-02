import { Reveal } from "@/components/ui/Reveal";
import OpenStatus from "@/components/OpenStatus";
import { hours, site } from "@/lib/site";

const fmt = (h: number) => `${h > 12 ? h - 12 : h}${h >= 12 ? "pm" : "am"}`;
const order = [3, 4, 5, 6, 0, 1, 2];

export default function Visit() {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`;
  return (
    <section className="container-x py-20 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] text-white">Find us</h2>
          <OpenStatus className="mt-4" />

          <div className="mt-8 grid grid-cols-2 gap-8 text-[15px] leading-relaxed">
            <div>
              <div className="text-[13px] text-ash">Address</div>
              <address className="mt-2 not-italic text-bone">
                {site.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a href={directions} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[14px] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                Directions
              </a>
            </div>
            <div>
              <div className="text-[13px] text-ash">Contact</div>
              <a href={site.phoneHref} className="mt-2 block text-bone hover:text-white">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block break-all text-bone hover:text-white">
                {site.email}
              </a>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-[13px] text-ash">Opening hours</div>
            <dl className="mt-2 grid max-w-xs grid-cols-[1fr_auto] gap-y-1 text-[14px]">
              {order.map((d) => (
                <div key={d} className="contents">
                  <dt className="text-smoke">{hours[d].day}</dt>
                  <dd className="text-right text-bone">
                    {hours[d].open === null ? "Closed" : `${fmt(hours[d].open!)} – ${fmt(hours[d].close!)}`}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-ash">
            Parking: Monk Stone House Car Park, PE1 1SA, paid with RingGo.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[480px]">
            <iframe
              title="Map showing Racecraft Sim in Peterborough"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=16&output=embed`}
              className="absolute inset-0 h-full w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0)_brightness(0.85)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
