import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import OpenStatus from "@/components/OpenStatus";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a session",
  description: "Book a sim racing session at Racecraft Sim, Peterborough. 30 minutes from £15, motion rig from £35, Friday race night £30.",
};

/**
 * One screen, no page scroll. Desktop: photo left, form right.
 * Phones: the same photo becomes a blurred background behind the form.
 */
export default function BookPage() {
  return (
    <section className="relative h-[100dvh] overflow-hidden lg:grid lg:grid-cols-2">
      <div className="absolute inset-0 lg:relative">
        <Image
          src="/images/venue-driver-window.jpg"
          alt="A driver on a Racecraft Sim rig by the front window"
          fill
          preload
          quality={80}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="scale-110 object-cover blur-xl brightness-[0.38] lg:scale-100 lg:blur-none lg:brightness-90"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/85 via-ink/5 to-ink/70 lg:block" />
        <div className="absolute bottom-10 left-10 hidden max-w-sm lg:block">
          <div className="text-[15px] text-white">{site.address.join(", ")}</div>
          <OpenStatus className="mt-2" />
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col pt-16 sm:pt-[72px]">
        <div className="no-scrollbar flex flex-1 flex-col justify-center overflow-y-auto px-5 py-6 sm:px-10 lg:px-14">
          <Suspense fallback={<div className="mx-auto h-[560px] w-full max-w-[540px] animate-pulse bg-white/[0.03]" />}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
