"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Eyebrow, MaskHeading } from "@/components/ui/Reveal";
import { useReady } from "@/lib/ready";

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: ReactNode[];
  intro?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  const ready = useReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className={
        image
          ? "relative flex min-h-[62svh] items-end overflow-hidden pb-12 pt-28 sm:min-h-[78svh] sm:pb-20 sm:pt-36"
          : "relative overflow-hidden pb-10 pt-32 sm:pb-16 sm:pt-48"
      }
    >
      {image && (
        <>
          <motion.div className="absolute inset-0" style={{ y }}>
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={ready ? { scale: 1, opacity: 1 } : undefined}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={image} alt={imageAlt} fill preload quality={85} sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.7),rgb(0_0_0/0.45)_40%,#000000_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_0%_100%,rgb(0_0_0/0.85),transparent_60%)]" />
        </>
      )}
      {!image && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
      )}
      <div className="container-x relative">
        <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 0.8 }}>
          <Eyebrow className="mb-7">{eyebrow}</Eyebrow>
        </motion.div>
        <MaskHeading as="h1" play={ready} lines={title} className="max-w-5xl text-[clamp(2.34rem,5.88vw,5.25rem)] text-white" />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-[16px] leading-relaxed text-smoke sm:text-[18px]"
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
