import ParallaxImage from "@/components/ui/ParallaxImage";
import { MaskHeading, Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function CtaBand({
  title = ["Your grid slot", "is waiting"],
  body = "Sessions from £15. Wednesday to Sunday in central Peterborough. Walk-ins welcome when rigs are free.",
  image = "/images/barcelona-long-exposure.jpg",
}: {
  title?: string[];
  body?: string;
  image?: string;
}) {
  return (
    <section className="container-x pb-24 pt-8 sm:pb-32">
      <div className="relative isolate overflow-hidden border border-white/[0.08]">
        <div className="absolute inset-0 -z-10">
          <ParallaxImage src={image} alt="" className="h-full w-full" sizes="100vw" strength={12} />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(8_8_10/0.92)_20%,rgb(8_8_10/0.55)_60%,rgb(8_8_10/0.2))]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_0%_100%,rgb(227_16_28/0.25),transparent_60%)]" />
        <div className="px-6 py-14 sm:px-12 sm:py-28 lg:px-16 lg:py-32">
          <MaskHeading lines={title} className="max-w-3xl text-[clamp(2.16rem,5.38vw,4.7rem)] text-white" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-smoke sm:text-[18px]">{body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/book" size="lg" icon={false}>
                Book a session
              </Button>
              <Button href={site.phoneHref} variant="outline" size="lg">
                Call {site.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
