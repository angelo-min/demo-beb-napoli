"use client";

import { useLanguage } from "@/lib/i18n";
import { CreditCard, Heart, MapPin, Leaf } from "lucide-react";
import { Reveal, AnimatedLine, Stagger, StaggerItem } from "@/components/motion";
import { motion } from "framer-motion";

const features = [
  { titleKey: "why.direct.title", descKey: "why.direct.desc", icon: CreditCard },
  { titleKey: "why.family.title", descKey: "why.family.desc", icon: Heart },
  { titleKey: "why.location.title", descKey: "why.location.desc", icon: MapPin },
  { titleKey: "why.eco.title", descKey: "why.eco.desc", icon: Leaf },
];

export function WhySection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-secondary/30 px-6 py-24 md:px-8 md:py-36">
      {/* Decorative background circles */}
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-accent/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center md:mb-20">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
              {t("why.title")}
            </h2>
          </Reveal>
          <AnimatedLine className="mx-auto mt-4 h-px w-16 bg-primary/40" delay={0.4} />
        </div>

        <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.15}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.titleKey}>
                <motion.div
                  className="group flex flex-col items-center text-center"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="mt-6 font-serif text-lg font-medium text-foreground">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(feature.descKey)}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
