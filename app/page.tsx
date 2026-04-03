"use client";

import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PropertiesSection } from "@/components/properties-section";
import { WhySection } from "@/components/why-section";
import { HomeCta } from "@/components/home-cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <PropertiesSection />
          <WhySection />
          <HomeCta />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
