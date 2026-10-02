import type { Metadata } from "next";
import { Cube, Gauge, Monitor, SteeringWheel, Briefcase, Flag, UsersThree, Wrench, Sparkle, ShieldCheck, Target } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import Visit from "@/components/Visit";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The venue",
  description: "Racecraft Sim was built by an engineer for people who care about how driving actually feels. Meet Peterborough's premium sim racing venue.",
};

const kit = [
  { Icon: SteeringWheel, title: "Direct-drive steering", body: "Instant, detailed force feedback straight from the wheelbase motor." },
  { Icon: Gauge, title: "Load-cell braking", body: "Brake by pressure, so muscle memory transfers to a real car." },
  { Icon: Cube, title: "Rigid aluminium cockpits", body: "No flex, no wobble, no wasted input." },
  { Icon: Monitor, title: "Ultrawide racing displays", body: "A wide field of view for judging apexes and gaps." },
];

const principles = [
  { Icon: ShieldCheck, title: "Equipment consistency", body: "Every rig is identical. Your lap time is yours, not the hardware's." },
  { Icon: Wrench, title: "Minimal downtime", body: "Kit is maintained like race cars, checked before every session." },
  { Icon: Sparkle, title: "Clean presentation", body: "A refined, professional room. Nothing tired, nothing sticky." },
  { Icon: Target, title: "Calm, focused driving", body: "Space to concentrate, so you can find the last tenth." },
];

const audiences = [
  { Icon: Flag, title: "Sim racing enthusiasts", body: "Chasing lap time on hardware you can't fit at home." },
  { Icon: SteeringWheel, title: "Motorsport fans", body: "Drive the circuits you watch every race weekend." },
  { Icon: UsersThree, title: "Friends & groups", body: "Head-to-head racing with a live leaderboard." },
  { Icon: Briefcase, title: "Corporate teams", body: "Team building and client events that stand out." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The venue"
        title={["Created for people who", <span key="2" className="text-white/50">care how driving feels.</span>]}
        intro="A premium racing simulation centre in Peterborough, built from the ground up with one goal: an authentic, professional-grade sim racing experience, without compromise."
        image="/images/venue-floor-wide.jpg"
        imageAlt="The Racecraft Sim venue floor with rows of rigs"
      />

      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-6">Our story</Eyebrow>
            <MaskHeading lines={["Built by engineers.", <span key="2" className="text-white/50">Designed for drivers.</span>]} className="text-[clamp(2rem,4.4vw,3.6rem)] text-white" />
            <Reveal>
              <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-smoke">
                <p>
                  Racecraft Sim was founded by a professional engineer with a lifelong passion for motorsport and simulation
                  technology. Every decision, from hardware selection to rig layout, was made with consistency, reliability and
                  realism at its core.
                </p>
                <p>
                  The result is an experience that feels natural, intuitive and deeply immersive, whether it&apos;s your first lap or
                  your thousandth. This isn&apos;t arcade racing. This is precision, immersion and performance.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="panel mt-10 flex items-center justify-between px-6 py-5">
                <div>
                  <div className="text-[12px] text-ash">Opened</div>
                  <div className="mt-1 text-[18px] text-white">{site.opened}</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] text-ash">Follow along</div>
                  <a href={site.social.instagram} target="_blank" rel="noreferrer" className="mt-1 block text-[15px] text-bone hover:text-white">
                    @racecraftsimpm
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ParallaxImage
              src="/images/venue-lounge.jpg"
              alt="The driver lounge with armchairs by the window"
              className="aspect-[4/5] border border-white/[0.07] sm:aspect-[5/4]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="container-x pb-24 sm:pb-32">
        <Reveal>
          <h2 className="mb-8 text-[13px] text-ash">The same class of equipment trusted by serious sim racers and professional drivers</h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {kit.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.06} className="bg-ink p-7 sm:p-8">
              <Icon size={26} className="text-signal" />
              <h3 className="mt-10 text-[18px] font-medium text-white">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-smoke">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-carbon/40 py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-6">Quality before quantity</Eyebrow>
            <MaskHeading lines={["A premium experience,", <span key="2" className="text-white/50">not a gimmick.</span>]} className="text-[clamp(2rem,4.4vw,3.6rem)] text-white" />
            <Reveal>
              <p className="mt-8 max-w-md text-[16px] leading-relaxed text-smoke">
                We run a small number of identical, flagship rigs so every driver gets the same high standard. There are no
                &ldquo;basic&rdquo; setups, no worn-out equipment and no compromises. It&apos;s sim racing done properly.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {principles.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="glass h-full p-7">
                  <Icon size={24} weight="duotone" className="text-bone" />
                  <h3 className="mt-8 text-[17px] font-medium text-white">{title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-smoke">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24 sm:py-32">
        <div className="mb-12 max-w-3xl">
          <Eyebrow className="mb-6">Who it&apos;s for</Eyebrow>
          <MaskHeading lines={["Closer to a paddock", <span key="2" className="text-white/50">than a gaming venue.</span>]} className="text-[clamp(2rem,4.4vw,3.6rem)] text-white" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="panel group h-full p-7 transition-colors duration-500 hover:border-signal/30">
                <span className="grid size-12 place-items-center rounded-[2px] bg-signal/10 text-signal-bright ring-1 ring-signal/20 transition-colors duration-500 group-hover:bg-signal group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-10 text-[17px] font-medium text-white">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-smoke">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-display text-[clamp(1.5rem,3.2vw,2.6rem)] !leading-[1.15] text-white">
              &ldquo;We invest in professional-grade equipment, maintain it properly, and deliver a consistent experience across every rig, because details matter.&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-[14px] text-smoke">Our values, Racecraft Sim</figcaption>
          </figure>
        </Reveal>
      </section>

      <Visit />
      <CtaBand />
    </>
  );
}
