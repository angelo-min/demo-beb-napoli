"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { ArrowUpRight } from "lucide-react";

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
    <article className="group relative flex flex-col overflow-hidden rounded-sm bg-card transition-all duration-300 hover:bg-secondary/50">
      {/* Cover image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={coverImage}
          alt={t(nameKey)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
            {t(locationKey)}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-medium text-white md:text-3xl">
            {t(nameKey)}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-8">
        <p className="text-base leading-relaxed text-muted-foreground">
          {t(descriptionKey)}
        </p>

        <LinkComponent
          href={href}
          {...linkProps}
          className="mt-2 inline-flex items-center gap-2 self-start border-b border-foreground/0 pb-1 text-sm font-medium uppercase tracking-widest text-foreground transition-all duration-300 hover:border-foreground"
        >
          <span>{t("properties.cta")}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </LinkComponent>
      </div>
    </article>
  );
}
