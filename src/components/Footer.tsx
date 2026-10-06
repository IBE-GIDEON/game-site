import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, XIcon } from "@/components/ui/BrandIcons";
import { hours, nav, site } from "@/lib/site";

const fmt = (h: number) => `${h > 12 ? h - 12 : h}${h >= 12 ? "pm" : "am"}`;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="md:col-span-5">
          <Image src="/brand/logo-stacked-mono-sm.webp" alt={site.name} width={320} height={214} unoptimized className="h-24 w-auto" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-smoke">
            A premium racing simulator venue in the centre of Peterborough. Professional rigs, real circuits, proper
            competition.
          </p>
          <div className="mt-8 flex items-center gap-6">
            {[
              { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
              { href: site.social.x, label: "X", Icon: XIcon },
              { href: site.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="transition-opacity duration-300 hover:opacity-75"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          <div>
            <h3 className="font-label text-[11.5px] text-ash">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/book", label: "Book a session" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-smoke transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-label text-[11.5px] text-ash">Visit</h3>
            <address className="mt-4 text-[15px] not-italic leading-relaxed text-smoke">
              {site.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <div className="mt-4 space-y-1 text-[15px]">
              <a href={`mailto:${site.email}`} className="block text-smoke hover:text-white">
                {site.email}
              </a>
              <a href={site.phoneHref} className="block text-smoke hover:text-white">
                {site.phone}
              </a>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-label text-[11.5px] text-ash">Hours</h3>
            <ul className="mt-4 space-y-1.5 text-[14px]">
              {[3, 4, 5, 6, 0, 1, 2].map((d) => (
                <li key={d} className="flex justify-between gap-4 text-smoke">
                  <span>{hours[d].day.slice(0, 3)}</span>
                  <span className="tabular font-mono text-[13px]">
                    {hours[d].open === null ? "Closed" : `${fmt(hours[d].open!)} to ${fmt(hours[d].close!)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* oversized wordmark, clipped by the bottom edge */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <div className="font-display -mb-[0.2em] whitespace-nowrap text-center text-[13.5vw] leading-none text-white/[0.035]">
          RACECRAFT
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-[12px] text-ash sm:flex-row">
          <span className="flex flex-wrap gap-x-6 gap-y-1">
            <span>© {new Date().getFullYear()} {site.legal}</span>
            <span>Company number {site.companyNo}</span>
          </span>
          <span>Opened {site.opened} in Peterborough</span>
        </div>
      </div>
    </footer>
  );
}
