"use client";

import { LanguageProvider } from "@/lib/i18n";
import { PropertyPage } from "@/components/property-page";

const alegriaConfig = {
  id: "alegria",
  nameKey: "alegria.name",
  heroSubtitleKey: "alegria.hero.subtitle",
  heroDescriptionKey: "alegria.hero.description",
  addressKey: "alegria.address",
  overviewKey: "alegria.overview.text",
  priceKey: "alegria.price",
  ratingKey: "alegria.rating",
  bookingUrl: "#",
  airbnbUrl: "#",
  heroImages: [
    "/sebastian-leonhardt-PkWac9CLWVA-unsplash.jpg",
    "/alessio-bachetti-Kgv2UxpU3cM-unsplash.jpg",
  ],
  photos: [
    "/villa-serena/01-exterior.jpg",
    "/villa-serena/02-terrace.jpg",
    "/villa-serena/03-view.jpg",
    "/villa-serena/04-bedroom.jpg",
    "/villa-serena/05-bedroom2.jpg",
    "/villa-serena/06-living.jpg",
    "/villa-serena/07-kitchen.jpg",
    "/villa-serena/08-bathroom.jpg",
  ],
  services: [
    { titleKey: "alegria.service.terrace", descKey: "alegria.service.terrace.desc", icon: "mountain" },
    { titleKey: "alegria.service.wifi", descKey: "alegria.service.wifi.desc", icon: "wifi" },
    { titleKey: "alegria.service.parking", descKey: "alegria.service.parking.desc", icon: "car" },
    { titleKey: "alegria.service.ac", descKey: "alegria.service.ac.desc", icon: "thermometer" },
  ],
  nearbyKeys: [
    "alegria.nearby.sentiero",
    "alegria.nearby.amalfi",
    "alegria.nearby.conca",
    "alegria.nearby.piazza",
  ],
  rules: {
    type: "flexible" as const,
    textKey: "alegria.rules.text",
  },
};

export default function VillaSerenaPage() {
  return (
    <LanguageProvider>
      <PropertyPage config={alegriaConfig} />
    </LanguageProvider>
  );
}
