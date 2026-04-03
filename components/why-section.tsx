"use client";

import { useLanguage } from "@/lib/i18n";
import { CreditCard, Heart, MapPin, Leaf } from "lucide-react";

const features = [
  { titleKey: "why.direct.title", descKey: "why.direct.desc", icon: CreditCard },
  { titleKey: "why.family.title", descKey: "why.family.desc", icon: Heart },
  { titleKey: "why.location.title", descKey: "why.location.desc", icon: MapPin },
  { titleKey: "why.eco.title", descKey: "why.eco.desc", icon: Leaf },
];

export function WhySection() {
  const { t } = useLanguage();

  return (
    <section className="bg-secondary/30 px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            {t("why.title")}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.titleKey} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-medium text-foreground">
                  {t(feature.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(feature.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
