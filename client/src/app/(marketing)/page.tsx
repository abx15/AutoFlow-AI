import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { LiveDemo } from "@/components/marketing/LiveDemo";
import { Stats } from "@/components/marketing/Stats";
import { Pricing } from "@/components/marketing/Pricing";
import { CTA } from "@/components/marketing/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <LiveDemo />
      <Pricing />
      <CTA />
    </>
  );
}
