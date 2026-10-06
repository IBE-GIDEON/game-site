import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import MobileBookBar from "@/components/MobileBookBar";
import FooterGate from "@/components/FooterGate";

// One family for the whole site, matching the logo wordmark: Saira's bold italic
// (widened) for display type, upright Saira for reading and data.
// Self-hosted and cut down to the axis ranges and characters the site uses
// (wght/wdth instanced, Latin only): 65KB for both files instead of 209KB.
const saira = localFont({
  src: [
    { path: "../fonts/saira-upright.woff2", weight: "400 700", style: "normal" },
    { path: "../fonts/saira-italic.woff2", weight: "600 750", style: "italic" },
  ],
  variable: "--font-saira",
  display: "swap",
  adjustFontFallback: "Arial",
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
    <html lang="en-GB" className={saira.variable}>
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
          <FooterGate>
            <Footer />
          </FooterGate>
          <MobileBookBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
