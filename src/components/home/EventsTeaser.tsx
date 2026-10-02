import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  {
    href: "/events#birthdays",
    title: "Birthday parties",
    body: "Practice, qualifying and a proper race with a live leaderboard. For kids, teens and adults. From £180.",
    src: "/images/venue-kids-racing.jpg",
    alt: "Young drivers racing side by side at a birthday party",
    link: "Birthday packages",
  },
  {
    href: "/events#corporate",
    title: "Team days",
    body: "Tournament formats, hosting and live leaderboards for up to 24 racers. Something your team will talk about.",
    src: "/images/venue-team-photo.jpg",
    alt: "A corporate team at Racecraft Sim",
    link: "Corporate packages",
  },
];

export default function EventsTeaser() {
  return (
    <section className="container-x py-20 sm:py-32">
      <Reveal>
        <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] text-white">Parties and team days</h2>
      </Reveal>
      <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-10">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.08}>
            <Link href={it.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={it.src} alt={it.alt} fill quality={85} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-5 text-[19px] font-medium text-white">{it.title}</h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-smoke">{it.body}</p>
              <span className="mt-4 inline-block text-[14px] text-white underline decoration-white/30 underline-offset-4 transition group-hover:decoration-white">
                {it.link}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
