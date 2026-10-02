import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LiveTiming from "@/components/live/LiveTiming";

export default function TimingSection() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="container-x relative">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-6">Live timing</Eyebrow>
            <MaskHeading
              lines={["Every lap timed.", <span key="2" className="text-white/50">Every driver ranked.</span>]}
              className="text-[clamp(2.2rem,5.4vw,4.6rem)] text-white"
            />
          </div>
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[16px] leading-relaxed text-smoke lg:ml-auto">
              Your data is captured automatically from the moment you leave the pit lane. Sector times, lap
              history and the venue leaderboard, live on the screens and on your phone.
            </p>
            <div className="mt-6 lg:flex lg:justify-end">
              <Button href="/timing" variant="outline">
                Open full timing screen
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal y={40}>
          <LiveTiming compact />
        </Reveal>
      </div>
    </section>
  );
}
