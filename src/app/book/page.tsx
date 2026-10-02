import type { Metadata } from "next";
import { Suspense } from "react";
import { Gift } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import BookingWidget from "@/components/BookingWidget";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { giftCards, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a session",
  description: "Book a sim racing session at Racecraft Sim, Peterborough. 30 minutes from £15, motion rig from £35, Friday race night £30.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a session"
        title={["Lock in", <span key="2" className="text-white/50">your grid slot.</span>]}
        intro="Choose your experience, pick a time and you're set. Seat, wheel and assists are adjusted for you on arrival."
      />

      <section className="container-x pb-24 sm:pb-32">
        <Suspense fallback={<div className="h-[640px] animate-pulse bg-white/[0.03]" />}>
          <BookingWidget />
        </Suspense>
      </section>

      <section className="container-x pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-6">Gift cards</Eyebrow>
            <MaskHeading lines={["The gift of racing.", <span key="2" className="text-white/50">More than a present.</span>]} className="text-[clamp(2rem,4.4vw,3.6rem)] text-white" />
            <Reveal>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-smoke">
                Delivered by email and valid for 180 days from purchase. The recipient books whenever suits them.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {giftCards.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.07}>
                <div className="group relative aspect-[3/4] overflow-hidden border border-white/10 bg-carbon p-6 transition-colors duration-500 hover:border-white/30">
                  <span className="absolute inset-x-0 top-0 h-[3px] bg-signal" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <Gift size={22} className="text-signal-bright" />
                      <span className="font-mono text-[10px] text-ash">RACECRAFT SIM</span>
                    </div>
                    <div>
                      <div className="font-display text-[2.6rem] text-white">£{g.price}</div>
                      <div className="mt-1 text-[15px] text-bone">{g.name}</div>
                      <div className="text-[12px] text-ash">{g.detail}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal className="sm:col-span-3">
              <Button href={site.bookingUrl} variant="outline">
                Buy a gift card
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
