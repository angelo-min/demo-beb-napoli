"use client";

import { useLanguage } from "@/lib/i18n";
import { PropertyCard } from "./property-card";

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
    <section id="properties" className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            {t("properties.title")}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.nameKey} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
}
