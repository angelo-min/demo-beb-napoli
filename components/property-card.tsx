"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyCardProps {
  nameKey: string;
  locationKey: string;
  descriptionKey: string;
  href: string;
  coverImage: string;
}

export function PropertyCard({
  nameKey,
  locationKey,
  descriptionKey,
  href,
  coverImage,
}: PropertyCardProps) {
  const { t } = useLanguage();

  const isInternal = href.startsWith("/");
  const linkProps = isInternal
    ? {}
    : { target: "_blank" as const, rel: "noopener noreferrer" };
  const LinkComponent = isInternal ? Link : "a";

  return (
    <motion.article
      className="group relative flex flex-col overflow-hidden rounded-lg bg-card shadow-sm"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Image
            src={coverImage}
            alt={t(nameKey)}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

        {/* Text on image */}
        <div className="absolute bottom-5 left-6 right-6">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70">
            {t(locationKey)}
          </p>
          <h3 className="mt-1.5 font-serif text-2xl font-medium text-white md:text-3xl">
            {t(nameKey)}
          </h3>
        </div>

        {/* Hover corner accent */}
        <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/0 backdrop-blur-none transition-all duration-500 group-hover:bg-white/20 group-hover:backdrop-blur-sm">
          <ArrowUpRight className="h-4 w-4 text-white opacity-0 transition-all duration-500 group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <p className="text-base leading-relaxed text-muted-foreground">
          {t(descriptionKey)}
        </p>

        <LinkComponent
          href={href}
          {...linkProps}
          className="mt-auto inline-flex items-center gap-2 self-start text-sm font-medium uppercase tracking-widest text-foreground transition-all duration-300"
        >
          <span className="relative">
            {t("properties.cta")}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </LinkComponent>
      </div>
    </motion.article>
  );
}
