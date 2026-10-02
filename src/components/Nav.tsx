"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { List, X } from "@phosphor-icons/react";
import { nav, site } from "@/lib/site";
import Button from "./ui/Button";
import OpenStatus from "./OpenStatus";

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={clsx(
            "border-b transition-[background-color,border-color] duration-500",
            scrolled || open ? "border-white/[0.08] bg-ink/[0.97]" : "border-transparent bg-transparent",
          )}
        >
          <nav className="container-x flex h-16 items-center justify-between sm:h-[72px]" aria-label="Main">
            <Link href="/" className="relative z-10 shrink-0" aria-label={`${site.name} home`}>
              <Image src="/brand/logo-lockup.webp" alt={site.name} width={1094} height={300} preload unoptimized className="h-9 w-auto sm:h-10" />
            </Link>

            <ul className="hidden h-full items-center gap-8 lg:flex">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="h-full">
                    <Link
                      href={item.href}
                      className={clsx(
                        "relative flex h-full items-center text-[14px] transition-colors duration-300",
                        active ? "text-white" : "text-smoke hover:text-white",
                      )}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-0 -bottom-px h-[2px] bg-signal"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <OpenStatus className="mr-3 hidden xl:flex" />
              <div className="hidden sm:block">
                <Button href="/book" size="md">
                  Book a session
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="relative z-10 grid size-11 place-items-center rounded-[2px] border border-white/15 text-bone transition-colors hover:border-white/40 lg:hidden"
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X size={20} /> : <List size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="container-x flex flex-1 flex-col justify-between pb-8 pt-28">
              <ul className="flex flex-col">
                {[{ href: "/", label: "Home" }, ...nav, { href: "/book", label: "Book a session" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-white/[0.07]"
                  >
                    <Link
                      href={item.href}
                      className={clsx(
                        "font-display flex items-center justify-between py-5 text-[clamp(1.75rem,8vw,2.75rem)]",
                        pathname === item.href ? "text-white" : "text-smoke",
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-xs tracking-normal text-ash">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10 space-y-4 text-sm text-smoke"
              >
                <OpenStatus />
                <p>
                  {site.address.join(", ")}
                  <br />
                  <a href={site.phoneHref} className="text-bone">
                    {site.phone}
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
