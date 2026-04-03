"use client";

import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 pt-24 md:px-8">
      {/* Decorative element */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary md:text-base">
          {t("hero.subtitle")}
        </p>

        <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="text-balance">{t("hero.tagline")}</span>
        </h1>

        <div className="mx-auto mt-2 h-px w-24 bg-primary/40 md:mt-4 md:w-32" />

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-10 md:text-lg">
          {t("hero.description")}
        </p>

        <div className="mt-12 md:mt-16">
          <a
            href="#properties"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:text-primary"
          >
            <span>{t("properties.title")}</span>
            <svg
              className="h-4 w-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
