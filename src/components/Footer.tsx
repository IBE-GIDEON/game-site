import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, InstagramLogo, XLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { hours, nav, site } from "@/lib/site";

const fmt = (h: number) => `${h > 12 ? h - 12 : h}${h >= 12 ? "pm" : "am"}`;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="md:col-span-5">
          <Image src="/brand/logo-stacked-mono.webp" alt={site.name} width={1263} height={845} unoptimized className="h-24 w-auto" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-smoke">
            A premium racing simulator venue in the centre of Peterborough. Professional rigs, real circuits, proper
            competition.
          </p>
          <div className="mt-8 flex gap-2">
            {[
              { href: site.social.instagram, label: "Instagram", Icon: InstagramLogo },
              { href: site.social.facebook, label: "Facebook", Icon: FacebookLogo },
              { href: site.social.x, label: "X", Icon: XLogo },
              { href: site.whatsapp, label: "WhatsApp", Icon: WhatsappLogo },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-[2px] border border-white/10 bg-white/[0.03] text-smoke transition-all duration-300 hover:border-white/25 hover:text-white"
              >
                <Icon size={18} />
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
                    {hours[d].open === null ? "Closed" : `${fmt(hours[d].open!)} – ${fmt(hours[d].close!)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-[12px] text-ash sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.legal} · Company no. {site.companyNo}
          </span>
          <span>Opened {site.opened} · Peterborough, UK</span>
        </div>
      </div>
    </footer>
  );
}
