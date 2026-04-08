"use client";

import { LanguageProvider } from "@/lib/i18n";
import { PropertyPage } from "@/components/property-page";
import type { Room } from "@/lib/booking-store";

const casamomiConfig = {
  id: "casamomi",
  nameKey: "casamomi.name",
  heroSubtitleKey: "casamomi.hero.subtitle",
  heroDescriptionKey: "casamomi.hero.description",
  addressKey: "casamomi.address",
  overviewKey: "casamomi.overview.text",
  priceKey: "casamomi.price",
  ratingKey: "casamomi.rating",
  bookingUrl: "#",
  airbnbUrl: "#",
  heroImages: [
    "/casa-blu/01-living.jpg",
    "/naples-hero.jpg",
    "/grafi-jeremiah-I1MBKpoC61k-unsplash.jpg",
  ],
  photos: [
    "/casa-blu/01-living.jpg",
    "/casa-blu/02-kitchen.jpg",
    "/casa-blu/03-bedroom.jpg",
    "/casa-blu/04-bedroom2.jpg",
    "/casa-blu/05-interior.jpg",
    "/casa-blu/06-bathroom.jpg",
  ],
  services: [
    { titleKey: "casamomi.service.wifi", descKey: "casamomi.service.wifi.desc", icon: "wifi" },
    { titleKey: "casamomi.service.ac", descKey: "casamomi.service.ac.desc", icon: "thermometer" },
    { titleKey: "casamomi.service.kitchen", descKey: "casamomi.service.kitchen.desc", icon: "utensils" },
    { titleKey: "casamomi.service.tv", descKey: "casamomi.service.tv.desc", icon: "tv" },
    { titleKey: "casamomi.service.safe", descKey: "casamomi.service.safe.desc", icon: "shield" },
    { titleKey: "casamomi.service.elevator", descKey: "casamomi.service.elevator.desc", icon: "arrowUpDown" },
    { titleKey: "casamomi.service.security", descKey: "casamomi.service.security.desc", icon: "lock" },
    { titleKey: "casamomi.service.parking", descKey: "casamomi.service.parking.desc", icon: "car" },
    { titleKey: "casamomi.service.rental", descKey: "casamomi.service.rental.desc", icon: "bike" },
  ],
  nearbyKeys: [
    "casamomi.nearby.mergellina",
    "casamomi.nearby.lungomare",
    "casamomi.nearby.castel",
    "casamomi.nearby.plebiscito",
    "casamomi.nearby.museo",
  ],
  rules: {
    type: "structured" as const,
    checkinKey: "casamomi.rules.checkin",
    checkoutKey: "casamomi.rules.checkout",
    items: [
      "casamomi.rules.nosmoking",
      "casamomi.rules.nopets",
      "casamomi.rules.noparty",
      "casamomi.rules.age",
    ],
  },
  rooms: ["gold", "silver", "whole"] as Room[],
};

export default function CasaBluPage() {
  return (
    <LanguageProvider>
      <PropertyPage config={casamomiConfig} />
    </LanguageProvider>
  );
}
