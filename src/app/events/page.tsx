import type { Metadata } from "next";
import { Cake, Briefcase, Check, ChatCircleText, CalendarCheck, FlagCheckered } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import EnquiryForm from "@/components/EnquiryForm";
import Faq from "@/components/ui/Faq";
import { eventFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Parties and corporate events",
  description:
    "Birthday parties from £180 and corporate team building for up to 24 racers. Tournament formats, live leaderboards and event hosting at Racecraft Sim, Peterborough.",
};

const packages = [
  {
    id: "birthdays",
    Icon: Cake,
    label: "Birthday parties",
    price: "From £180",
    title: ["Their best birthday", "on the grid"],
    body:
      "Something fun, competitive and different. Practice sessions, qualifying, racing and a live leaderboard, all in a premium sim racing environment. Whether it's for children, teenagers or adults, we tailor the experience to your group.",
    points: ["Exclusive racing simulator party", "Perfect for kids, teens and adults", "Live leaderboard and podium", "Cake is welcome"],
    image: "/images/venue-kids-racing.jpg",
    alt: "Young drivers racing side by side at a birthday party",
  },
  {
    id: "corporate",
    Icon: Briefcase,
    label: "Corporate and team building",
    price: "Up to 24 racers",
    title: ["Team building", "they'll actually talk about"],
    body:
      "Team building, staff socials, client entertainment, networking and work celebrations. Tournament-style formats, live leaderboards, event hosting and flexible packages give your team a professional but fun environment to relax and compete.",
    points: ["Tournament race formats", "Event hosting and briefing", "Live leaderboards on screen", "Private hire available"],
    image: "/images/venue-team-photo.jpg",
    alt: "A corporate team at Racecraft Sim",
  },
];

const steps = [
  { Icon: ChatCircleText, title: "Enquire", body: "Tell us your group size, date and what you're planning." },
  { Icon: CalendarCheck, title: "Confirm", body: "We confirm availability and send your invoice. A deposit secures the slot." },
  { Icon: FlagCheckered, title: "Race day", body: "Arrive a little early, get briefed, and enjoy the experience." },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Parties and corporate"
        title={["Bring the whole grid", <span key="2" className="text-white/50">We&apos;ll run race control</span>]}
        intro="Premium sim racing for birthdays, groups and team events, with professional rigs, simple packages and a venue built for unforgettable competition."
        image="/images/venue-team-photo.jpg"
        imageAlt="A group celebrating at Racecraft Sim"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#enquire" size="lg">
            Request availability
          </Button>
          <Button href="#how-it-works" variant="outline" size="lg" icon={false}>
            How it works
          </Button>
        </div>
      </PageHero>

      {packages.map((p, i) => (
        <section key={p.id} id={p.id} className="container-x scroll-mt-24 py-14 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={i % 2 ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}>
              <ParallaxImage src={p.image} alt={p.alt} className="aspect-[4/3] border border-white/[0.07]" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <div className="lg:col-span-6">
              <Reveal>
                <div className="mb-7 flex items-center gap-3">
                  <span className="glass grid size-11 place-items-center rounded-[2px]">
                    <p.Icon size={20} />
                  </span>
                  <span className="text-[14px] text-smoke">{p.label}</span>
                  <span className="rounded-[2px] bg-signal/15 px-3 py-1 text-[12px] text-signal-bright ring-1 ring-signal/30">{p.price}</span>
                </div>
              </Reveal>
              <MaskHeading lines={[p.title[0], <span key="2" className="text-white/50">{p.title[1]}</span>]} className="text-[clamp(1.8rem,3.7vw,3.02rem)] text-white" />
              <Reveal>
                <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-smoke">{p.body}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-[15px] text-bone">
                      <span className="grid size-6 shrink-0 place-items-center rounded-[2px] bg-white/[0.06] text-pb">
                        <Check size={13} weight="bold" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section id="how-it-works" className="scroll-mt-24 border-y border-white/[0.07] bg-carbon/40 py-16 sm:py-32">
        <div className="container-x">
          <div className="mb-10 sm:mb-14 max-w-3xl">
            <Eyebrow className="mb-6">How it works</Eyebrow>
            <MaskHeading lines={["Three steps", <span key="2" className="text-white/50">to lights out</span>]} className="text-[clamp(1.8rem,3.7vw,3.02rem)] text-white" />
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08}>
                <div className="glass relative h-full overflow-hidden p-8">
                  <span className="font-display pointer-events-none absolute -right-2 -top-6 text-[8rem] text-white/[0.04]">{i + 1}</span>
                  <Icon size={26} className="text-signal" />
                  <h3 className="mt-12 text-[20px] font-medium text-white">
                    <span className="mr-2 font-mono text-[13px] text-ash">Step {i + 1}</span>
                    {title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-smoke">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="enquire" className="container-x scroll-mt-24 py-16 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-6">Booking enquiry</Eyebrow>
            <MaskHeading lines={["Tell us about", "your event"]} className="text-[clamp(1.8rem,3.36vw,2.69rem)] text-white" />
            <Reveal>
              <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-smoke">
                Share a few details and we&apos;ll come back with availability and a quote. No commitment until you confirm.
              </p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-8" y={40}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-6">FAQ</Eyebrow>
            <MaskHeading lines={["Questions", "before the grid"]} className="text-[clamp(1.8rem,3.36vw,2.69rem)] text-white" />
          </div>
          <Reveal className="lg:col-span-8">
            <Faq items={eventFaqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
