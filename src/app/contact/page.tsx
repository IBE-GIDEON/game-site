import type { Metadata } from "next";
import { Envelope, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/ui/Faq";
import Visit from "@/components/Visit";
import { Eyebrow, MaskHeading, Reveal } from "@/components/ui/Reveal";
import { generalFaqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Bookings, corporate enquiries, partnerships or general questions. Call, WhatsApp or email Racecraft Sim in Peterborough.",
};

const channels = [
  { Icon: Phone, label: "Call", value: site.phone, href: site.phoneHref },
  { Icon: WhatsappLogo, label: "WhatsApp", value: "Message us", href: site.whatsapp },
  { Icon: Envelope, label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["Talk to", <span key="2" className="text-white/50">race control.</span>]}
        intro="Bookings, corporate enquiries, partnerships or general questions. We usually reply within two hours."
      />

      <section className="container-x pb-24 sm:pb-32">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="grid content-start gap-4 lg:col-span-4">
            {channels.map(({ Icon, label, value, href }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass group flex items-center gap-4 p-5 transition-colors duration-300 hover:bg-white/[0.09]"
                >
                  <span className="grid size-12 place-items-center rounded-[2px] bg-signal/10 text-signal-bright ring-1 ring-signal/20 transition-colors duration-300 group-hover:bg-signal group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span>
                    <span className="block text-[12px] text-ash">{label}</span>
                    <span className="block text-[16px] text-white">{value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="lg:col-span-8" y={40}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-6">FAQ</Eyebrow>
            <MaskHeading lines={["Good to know", "before you go."]} className="text-[clamp(2rem,4vw,3.2rem)] text-white" />
          </div>
          <Reveal className="lg:col-span-8">
            <Faq items={generalFaqs} />
          </Reveal>
        </div>
      </section>

      <Visit />
    </>
  );
}
