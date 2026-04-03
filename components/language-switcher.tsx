"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage, publicLanguages, publicLanguageLabels, type Language } from "@/lib/i18n";

const languageNames: Record<Language, string> = {
  it: "Italiano",
  en: "English",
  fr: "Français",
  es: "Español",
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 items-center gap-1 rounded-full border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        aria-label="Switch language"
      >
        {publicLanguageLabels[language]}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[140px] rounded-sm border border-border bg-background py-1 shadow-lg">
          {publicLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                language === lang
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <span className="w-5 font-medium">{publicLanguageLabels[lang]}</span>
              <span>{languageNames[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
