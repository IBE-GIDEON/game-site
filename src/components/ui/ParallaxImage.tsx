"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";

export default function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  strength = 10,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  strength?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={clsx("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-x-0 -inset-y-[12%]" style={{ y }}>
        <Image src={src} alt={alt} fill sizes={sizes} quality={85} preload={priority} className={clsx("object-cover", imgClassName)} />
      </motion.div>
    </div>
  );
}
