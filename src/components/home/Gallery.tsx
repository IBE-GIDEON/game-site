import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

// A plain editorial spread. Varied sizes, short captions, nothing moving.
const shots = [
  { src: "/images/venue-start-screens.jpg", caption: "Start your engines.", span: "lg:col-span-7", ratio: "aspect-[4/3]" },
  { src: "/images/venue-driver-window.jpg", caption: "Rig by the window.", span: "lg:col-span-5", ratio: "aspect-[4/5]" },
  { src: "/images/venue-lounge.jpg", caption: "The lounge.", span: "lg:col-span-4", ratio: "aspect-[4/5]", hideMobile: true },
  { src: "/images/barcelona-long-exposure.jpg", caption: "Barcelona, this month's track.", span: "lg:col-span-8", ratio: "aspect-[3/2]" },
];

export default function Gallery() {
  return (
    <section className="container-x py-20 sm:py-32">
      <Reveal>
        <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] text-white">7 Midgate House</h2>
      </Reveal>
      <div className="mt-10 grid gap-x-6 gap-y-10 lg:grid-cols-12 lg:items-end">
        {shots.map((s) => (
          <Reveal key={s.src} className={`${s.span} ${s.hideMobile ? "hidden lg:block" : ""}`}>
            <figure>
              <div className={`relative overflow-hidden ${s.ratio}`}>
                <Image src={s.src} alt={s.caption} fill quality={85} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-[13px] text-ash">{s.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
