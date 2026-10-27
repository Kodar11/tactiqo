import type { Metadata } from "next";

import { HeroSection } from "@/components/home/hero-section";
import {
  AudienceSection,
  DemoSection,
  FinalCTA,
  LearningLoop,
  PhilosophySection,
  ProductShowcase,
} from "@/components/home/sections";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Tactiqo — Think beyond your next move" },
  description: site.description,
  alternates: site.url ? { canonical: "/" } : undefined,
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <DemoSection />
      <LearningLoop />
      <ProductShowcase />
      <AudienceSection />
      <PhilosophySection />
      <FinalCTA />
    </>
  );
}
