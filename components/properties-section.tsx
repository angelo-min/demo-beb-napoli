"use client";

import { useLanguage } from "@/lib/i18n";
import { PropertyCard } from "./property-card";
import { Reveal, AnimatedLine, Stagger, StaggerItem } from "@/components/motion";

const properties = [
  {
    nameKey: "alegria.name",
    locationKey: "alegria.location",
    descriptionKey: "alegria.description",
    href: "/alegria",
    coverImage: "/alegria/049031C9-C0B7-4499-8196-9EE80FC2F19B.JPG",
  },
  {
    nameKey: "casamomi.name",
    locationKey: "casamomi.location",
    descriptionKey: "casamomi.description",
    href: "/casamomi",
    coverImage: "/casa-momi/232F863B-66EB-49FB-B525-57EE967BEA79.JPG",
  },
];

export function PropertiesSection() {
  const { t } = useLanguage();

  return (
    <section id="properties" className="px-6 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center md:mb-20">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
              {t("properties.title")}
            </h2>
          </Reveal>
          <AnimatedLine className="mx-auto mt-4 h-px w-16 bg-primary/40" delay={0.4} />
        </div>

        <Stagger className="grid gap-8 md:grid-cols-2 md:gap-10" staggerDelay={0.2}>
          {properties.map((property) => (
            <StaggerItem key={property.nameKey}>
              <PropertyCard {...property} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
