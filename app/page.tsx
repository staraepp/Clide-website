import { Features } from "@/components/Features";
import { GetStarted } from "@/components/GetStarted";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ModelsRail } from "@/components/ModelsRail";
import { OpenSourceBand } from "@/components/OpenSourceBand";
import { Pipeline } from "@/components/Pipeline";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Pipeline />
      <Features />
      <ModelsRail />
      <GetStarted />
      <OpenSourceBand />
    </main>
  );
}
