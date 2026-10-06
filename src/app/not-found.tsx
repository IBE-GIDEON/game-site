import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-32">
      <span className="font-mono text-[13px] text-signal-bright">Error 404</span>
      <h1 className="font-display mt-6 text-[clamp(2.34rem,5.88vw,5.04rem)] text-white">
        Off track.
        <span className="block text-white/50">This page isn&apos;t on the map.</span>
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Back to the pits</Button>
        <Button href="/book" variant="outline" icon={false}>
          Book a session
        </Button>
      </div>
    </section>
  );
}
