"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { MapsIcon, PhoneIcon, WhatsAppIcon } from "./ui/BrandIcons";
import { useLenis } from "lenis/react";
import { nav, site } from "@/lib/site";
import Button from "./ui/Button";

const mobileLinks = [{ href: "/", label: "Home" }, ...nav];

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

  const lenis = useLenis();
  const close = () => setOpen(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    // lock the page behind the menu (Lenis drives scrolling, so stop it too)
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

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
                        "font-label relative flex h-full items-center text-[12.5px] transition-colors duration-300",
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
                aria-controls="mobile-menu"
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
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-x flex flex-1 flex-col overflow-y-auto pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-20 sm:pt-24">
              <ul className="border-t border-white/[0.08]">
                {mobileLinks.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i + 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-white/[0.08]"
                    >
                      <Link href={item.href} onClick={close} className="group flex items-center justify-between py-[18px]">
                        <span className="flex items-center gap-3">
                          <span className={clsx("h-5 w-[3px]", active ? "bg-signal" : "bg-white/10")} />
                          <span className={clsx("font-display text-[22px]", active ? "text-white" : "text-bone/80")}>{item.label}</span>
                        </span>
                        <ArrowRight size={18} className="text-ash transition-transform group-active:translate-x-1" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.45 }}
                className="mt-auto space-y-3 pt-10"
              >
                <Button href="/book" size="lg" className="w-full">
                  Book a session
                </Button>
                <div className="grid grid-cols-3 pt-2">
                  {[
                    { href: site.phoneHref, label: "Call", Icon: PhoneIcon },
                    { href: site.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
                    {
                      href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`,
                      label: "Directions",
                      Icon: MapsIcon,
                    },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex flex-col items-center gap-2 py-2 text-[12px] text-bone transition-opacity active:opacity-60"
                    >
                      <Icon />
                      {label}
                    </a>
                  ))}
                </div>
                <div className="pt-2 text-center text-[12px] text-ash">
                  {site.address.join(", ")}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
