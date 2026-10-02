import type { Metadata, Viewport } from "next";
import { DM_Sans, Fragment_Mono, Instrument_Serif } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import { ScrollMeter } from "@/components/ScrollMeter";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fragment-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "clide — open-source dictation for Mac",
  description:
    "clide is free, open-source system-wide dictation for Mac. Three on-device engines, 39 local models you install yourself, and no account, cloud, or API keys.",
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fragmentMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteNav />
        <ScrollMeter />
        <div id="main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
