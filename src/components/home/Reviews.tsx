import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/lib/site";

const picks = [reviews[4], reviews[1], reviews[2]];

export default function Reviews() {
  return (
    <section className="container-x py-20 sm:py-32">
      <div className="grid gap-12 md:grid-cols-3 md:gap-10">
        {picks.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08} className={i === 2 ? "hidden md:block" : undefined}>
            <figure>
              <blockquote className="font-statement text-[clamp(1.25rem,1.9vw,1.6rem)] text-white">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[13px] text-ash">{r.name}, Google review</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
