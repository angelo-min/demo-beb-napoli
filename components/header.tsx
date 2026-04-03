"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8 md:py-6">
        <Link
          href="/"
          className="font-serif text-xl font-medium tracking-wide text-foreground md:text-2xl"
        >
          Dimore Mediterranee
        </Link>

        <LanguageSwitcher />
      </nav>
    </header>
  );
}
