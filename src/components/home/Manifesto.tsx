import { Reveal } from "@/components/ui/Reveal";

export default function Manifesto() {
  return (
    <section className="container-x py-20 sm:py-32">
      <Reveal className="max-w-4xl lg:ml-[16.6%]">
        <p className="font-statement text-[clamp(1.45rem,2.9vw,2.5rem)] text-white">
          This isn&apos;t arcade racing. Racecraft Sim was founded by a professional engineer with a lifelong passion
          for motorsport, and every rig in the room is identical, set up properly and looked after like a race car.
        </p>
        <p className="mt-8 text-[15px] text-smoke">
          Eight rigs. Up to thirty drivers for private events. Racing every Friday night.
        </p>
      </Reveal>
    </section>
  );
}
