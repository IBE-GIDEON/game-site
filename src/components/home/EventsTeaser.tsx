import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Cake } from "@phosphor-icons/react/dist/ssr";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";

const cards = [
  {
    href: "/events#birthdays",
    Icon: Cake,
    kicker: "From £180",
    title: "Birthday parties",
    body: "Practice, qualifying and a proper race with a live leaderboard. Tailored for kids, teens and adults.",
    src: "/images/venue-kids-racing.jpg",
    alt: "Young drivers racing side by side at a birthday party",
  },
  {
    href: "/events#corporate",
    Icon: Briefcase,
    kicker: "Up to 24 racers",
    title: "Corporate & team building",
    body: "Tournament formats, hosted events and client entertainment that people actually talk about on Monday.",
    src: "/images/venue-team-photo.jpg",
    alt: "A corporate team posing in front of the Racecraft Sim logo wall",
  },
];

export default function EventsTeaser() {
  return (
    <section className="container-x py-28 sm:py-36">
      <div className="mb-14 max-w-3xl">
        <Eyebrow className="mb-6">Parties & corporate</Eyebrow>
        <MaskHeading
          lines={["Bring the whole grid.", <span key="2" className="text-white/50">We&apos;ll run race control.</span>]}
          className="text-[clamp(2.2rem,5.4vw,4.6rem)] text-white"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <Link
              href={c.href}
              className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden border border-white/[0.07] p-7 sm:aspect-[5/4] sm:p-9"
            >
              <Image
                src={c.src}
                alt={c.alt}
                fill
                quality={85}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="-z-10 object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <div className="absolute left-7 top-7 flex items-center gap-2 sm:left-9 sm:top-9">
                <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-bone/85">
                  <c.Icon size={16} className="text-signal" />
                  {c.kicker}
                </span>
              </div>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] text-white">{c.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-smoke">{c.body}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center border border-white/25 transition-colors duration-300 group-hover:border-signal group-hover:bg-signal">
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
