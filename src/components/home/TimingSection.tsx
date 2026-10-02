import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import LiveTiming from "@/components/live/LiveTiming";

export default function TimingSection() {
  return (
    <section className="container-x py-20 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] text-white">Live timing</h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-smoke">
            Every lap at the venue is timed and ranked. This is today&apos;s session at Barcelona.
          </p>
          <div className="mt-6">
            <Button href="/timing" variant="outline">
              Full timing
            </Button>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-8">
          <LiveTiming compact />
        </Reveal>
      </div>
    </section>
  );
}
