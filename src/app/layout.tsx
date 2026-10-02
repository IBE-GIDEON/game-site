import type { Metadata, Viewport } from "next";
import { Barlow, Saira } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

// Saira: squared motorsport-timing forms, used semi-condensed for headlines, lap times and data labels.
const saira = Saira({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-saira",
  display: "swap",
});

// Barlow: DIN-style engineering grotesque for body copy and UI.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.racecraftsim.co.uk"),
  title: {
    default: "Racecraft Sim | Premium Sim Racing in Peterborough",
    template: "%s | Racecraft Sim",
  },
  description:
    "Peterborough's premium racing simulator venue. Direct-drive rigs, load-cell pedals and ultrawide displays for solo sessions, Friday race nights, birthday parties and corporate events.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Racecraft Sim",
    images: [{ url: "/images/venue-race-night.jpg", width: 2500, height: 1875 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${saira.variable} ${barlow.variable}`}>
      <body className="grain min-h-dvh">
        <Loader />
        <SmoothScroll>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[70] -translate-y-20 rounded-[2px] bg-white px-4 py-2 text-sm text-ink focus:translate-y-0"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
