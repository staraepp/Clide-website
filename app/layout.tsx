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
    "clide is free, open-source system-wide dictation for Mac with 36 local models, eight transcription engines, and explicit control over when audio leaves your machine.",
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
        {/*
          Arms the scroll animations before paint, and disarms them if the
          animation script never reports ready. Without the failsafe a blocked
          or failed site.js left every section at opacity:0 — a blank page.
        */}
        <Script id="arm-reveal" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js-anim');
setTimeout(function(){
  if(!window.__clideRevealReady){document.documentElement.classList.remove('js-anim');}
},2500);`}
        </Script>
        <Script src="/site.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
