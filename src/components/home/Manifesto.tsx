"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Eyebrow, Reveal } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";

const TEXT_SHORT = "This isn't arcade racing. Identical flagship rigs, maintained like race cars.";
const TEXT =
  "This isn't arcade racing. Racecraft Sim was founded by a professional engineer to give you an authentic professional-grade sim racing experience without compromise. Identical flagship rigs, maintained like race cars, in a room that feels closer to a paddock than a games venue.";

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

function ScrollText({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

export default function Manifesto() {
  return (
    <section className="container-x py-20 sm:py-36 lg:py-44">
      <div className="grid gap-6 sm:gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow>Not an arcade</Eyebrow>
        </div>
        <div className="lg:col-span-9">
          <ScrollText text={TEXT_SHORT} className="font-statement text-[1.6rem] text-white sm:hidden" />
          <ScrollText text={TEXT} className="font-statement hidden text-[clamp(1.45rem,3.3vw,2.85rem)] text-white sm:block" />

          <div className="mt-10 grid grid-cols-2 sm:mt-20 gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="bg-ink p-5 sm:p-8">
                <div className="font-display tabular text-[clamp(2.16rem,3.78vw,3.02rem)] text-white">
                  <CountUp to={s.value} />
                  <span className="text-signal">{s.suffix}</span>
                </div>
                <div className="mt-2 text-[13px] text-smoke sm:mt-3 sm:text-[14px]">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
