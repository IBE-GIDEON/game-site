import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const kit = [
  { title: "Direct-drive wheels", body: "Every kerb and every slide arrives at your hands the moment it happens." },
  { title: "Load-cell pedals", body: "You brake by pressure, the way a real race car works." },
  { title: "Aluminium cockpits", body: "Rigid frames with no flex, so every input is exact." },
  { title: "Ultrawide screens", body: "Enough field of view to judge an apex properly." },
  { title: "Motion and VR", body: "Our premium rig moves with the car. VR on request. From £35." },
];

export default function Hardware() {
  return (
    <section className="container-x pb-20 sm:pb-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/venue-rig-closeup.jpg"
                alt="Drivers on Racecraft Sim rigs during a session"
                fill
                quality={85}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-ash">On the rigs at Midgate House.</figcaption>
          </figure>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:pt-4">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] text-white">The kit</h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-smoke">
            The same class of equipment serious sim racers and professional drivers use.
          </p>
          <ol className="mt-10 space-y-6">
            {kit.map((k, i) => (
              <li key={k.title} className="grid grid-cols-[2rem_1fr] gap-x-2">
                <span className="font-mono text-[13px] text-ash">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-[16px] font-medium text-white">{k.title}</div>
                  <div className="mt-1 text-[14px] leading-relaxed text-smoke">{k.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
