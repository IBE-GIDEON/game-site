import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export default function CtaBand({
  title = ["Book a rig."],
  body = "Sessions from £15, Wednesday to Sunday. Walk-ins welcome when rigs are free.",
}: {
  title?: string[];
  body?: string;
  image?: string;
}) {
  return (
    <section className="container-x pb-24 pt-8 sm:pb-36">
      <Reveal>
        <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] text-white">{title.join(" ")}</h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-smoke sm:text-[16px]">{body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/book" size="lg">
            Book a session
          </Button>
          <a href={site.phoneHref} className="text-[15px] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            or call {site.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
