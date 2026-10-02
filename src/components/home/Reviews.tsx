import { GoogleLogo, Star } from "@phosphor-icons/react/dist/ssr";
import { Eyebrow, MaskHeading } from "@/components/ui/Reveal";
import { reviews } from "@/lib/site";

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="panel flex w-[300px] shrink-0 flex-col p-6 sm:w-[380px] sm:p-7">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-amber">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} weight="fill" />
          ))}
        </div>
        <GoogleLogo size={16} className="text-ash" />
      </div>
      <blockquote className="mt-5 flex-1 text-[16px] leading-relaxed text-bone/90">&ldquo;{r.text}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
        <span className="grid size-9 place-items-center rounded-[2px] bg-gradient-to-br from-steel to-graphite text-[13px] font-medium text-bone ring-1 ring-white/10">
          {r.name[0]}
        </span>
        <div>
          <div className="text-[14px] text-bone">{r.name}</div>
          <div className="text-[12px] text-ash">{r.when}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const row = [...reviews, ...reviews];
  return (
    <section className="overflow-hidden py-28 sm:py-36">
      <div className="container-x mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Eyebrow className="mb-6">From the pit wall</Eyebrow>
          <MaskHeading lines={["Five stars,", <span key="2" className="text-white/50">lap after lap.</span>]} className="text-[clamp(2.2rem,5.4vw,4.6rem)] text-white" />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[13px] text-smoke">
            <div className="flex gap-0.5 text-amber">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} weight="fill" />
              ))}
            </div>
            <div className="mt-1">Five-star reviews on Google</div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-32" />
        <div className="flex">
          <div className="flex shrink-0 animate-marquee gap-4 pr-4 [animation-duration:60s] hover:[animation-play-state:paused]">
            {row.map((r, i) => (
              <Card key={i} r={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
