import { Cube, Gauge, Monitor, Ranking, SteeringWheel, Trophy, Vibrate, VirtualReality } from "@phosphor-icons/react/dist/ssr";

const items = [
  { Icon: SteeringWheel, label: "Direct-drive wheelbases" },
  { Icon: Gauge, label: "Load-cell braking" },
  { Icon: Cube, label: "Rigid aluminium cockpits" },
  { Icon: Monitor, label: "Ultrawide racing displays" },
  { Icon: Vibrate, label: "Full motion rig" },
  { Icon: VirtualReality, label: "VR upgrade" },
  { Icon: Ranking, label: "Live leaderboards" },
  { Icon: Trophy, label: "Weekly tournaments" },
];

export default function SpecMarquee() {
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-white/[0.07] bg-carbon/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex overflow-hidden">
        <ul className="flex shrink-0 animate-marquee items-center gap-12 pr-12 hover:[animation-play-state:paused]">
          {row.map(({ Icon, label }, i) => (
            <li key={i} className="flex shrink-0 items-center gap-3 text-[15px] text-smoke" aria-hidden={i >= items.length}>
              <Icon size={20} className="text-signal" />
              <span className="whitespace-nowrap">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
