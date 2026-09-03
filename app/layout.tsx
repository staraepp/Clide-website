import type { Metadata } from "next";
import { Montserrat, DM_Sans, Fragment_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-montserrat",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fragment-mono",
});

export const metadata: Metadata = {
  title: "clide — open-source speech to text",
  description:
    "clide is a free, open-source speech-to-text app for Mac. Bring your own models — Whisper, Parakeet, Vosk, Moonshine — everything runs locally on your machine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${dmSans.variable} ${fragmentMono.variable}`}
    >
      <body>
        {children}
        <Script src="/site.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
