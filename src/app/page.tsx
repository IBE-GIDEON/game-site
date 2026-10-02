import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Hardware from "@/components/home/Hardware";
import TimingSection from "@/components/home/TimingSection";
import Sessions from "@/components/home/Sessions";
import RaceNight from "@/components/home/RaceNight";
import EventsTeaser from "@/components/home/EventsTeaser";
import Gallery from "@/components/home/Gallery";
import Reviews from "@/components/home/Reviews";
import Visit from "@/components/Visit";
import CtaBand from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Hardware />
      <TimingSection />
      <Sessions />
      <RaceNight />
      <EventsTeaser />
      <Gallery />
      <Reviews />
      <Visit />
      <CtaBand />
    </>
  );
}
