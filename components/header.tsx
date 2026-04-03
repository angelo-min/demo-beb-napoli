"use client";

import Link from "next/link";
import { useLanguage, publicLanguages, publicLanguageLabels } from "@/lib/i18n";

export function Header() {
  const { language, setLanguage } = useLanguage();

  const cycleLanguage = () => {
    const idx = publicLanguages.indexOf(language);
    const next = publicLanguages[(idx + 1) % publicLanguages.length];
    setLanguage(next);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8 md:py-6">
        <Link
          href="/"
          className="font-serif text-xl font-medium tracking-wide text-foreground md:text-2xl"
        >
          Dimore Mediterranee
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={cycleLanguage}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            aria-label="Switch language"
          >
            {publicLanguageLabels[language]}
          </button>
        </div>
      </nav>
    </header>
  );
}
