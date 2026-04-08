"use client";

import { useLanguage } from "@/lib/i18n";
import { Instagram, Mail } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/30 px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Stagger
          className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left"
          staggerDelay={0.15}
        >
          {/* Brand */}
          <StaggerItem className="flex flex-col items-center gap-3 md:items-start">
            <h3 className="font-serif text-2xl font-medium text-foreground">
              {t("footer.brand")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem className="flex flex-col items-center gap-4 md:items-end">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              {t("footer.contact")}
            </h4>
            <a
              href="mailto:info@mmstudios.it"
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>info@mmstudios.it</span>
            </a>
          </StaggerItem>

          {/* Social */}
          <StaggerItem className="flex flex-col items-center gap-4 md:items-end">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              {t("footer.follow")}
            </h4>
            <a
              href="#"
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span>@bbdemonapoli</span>
            </a>
          </StaggerItem>
        </Stagger>

        {/* Copyright */}
        <Reveal delay={0.3}>
          <div className="mt-14 border-t border-border pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} B&amp;B Demo Napoli. {t("footer.rights")}.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
