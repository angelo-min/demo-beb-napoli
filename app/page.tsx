"use client";

import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PropertiesSection } from "@/components/properties-section";
import { GalleryMarquee } from "@/components/gallery-marquee";
import { WhySection } from "@/components/why-section";
import { HomeCta } from "@/components/home-cta";
import { Footer } from "@/components/footer";
import { CurveDivider } from "@/components/section-divider";

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <PropertiesSection />
          <GalleryMarquee />
          <CurveDivider variant="primary" />
          <WhySection />
          <CurveDivider variant="secondary" />
          <HomeCta />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
