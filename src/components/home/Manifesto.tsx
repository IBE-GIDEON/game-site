"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Eyebrow, Reveal } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";

const TEXT =
  "This isn't arcade racing. Racecraft Sim was founded by a professional engineer with one goal: an authentic, professional-grade sim racing experience without compromise. Identical flagship rigs, maintained like race cars, in a room that feels closer to a paddock than a games venue.";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

const stats = [
  { value: 8, suffix: "", label: "identical flagship rigs" },
  { value: 30, suffix: "", label: "drivers per private event" },
  { value: 16, suffix: "", label: "racers every Friday night" },
  { value: 2, suffix: "hr", label: "typical reply to enquiries" },
];

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = TEXT.split(" ");

  return (
    <section className="container-x py-28 sm:py-36 lg:py-44">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow>Not an arcade</Eyebrow>
        </div>
        <div className="lg:col-span-9">
          <p ref={ref} className="font-display text-[clamp(1.6rem,3.6vw,3.15rem)] !leading-[1.12] text-white">
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>

          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="bg-ink p-6 sm:p-8">
                <div className="font-display tabular text-[clamp(2.4rem,4.5vw,3.6rem)] text-white">
                  <CountUp to={s.value} />
                  <span className="text-signal">{s.suffix}</span>
                </div>
                <div className="mt-3 text-[14px] text-smoke">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
