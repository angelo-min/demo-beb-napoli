"use client";

import { useLanguage } from "@/lib/i18n";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/30 px-6 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h3 className="font-serif text-2xl font-medium text-foreground">
              {t("footer.brand")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              {t("footer.contact")}
            </h4>
            <a
              href="mailto:info@dimoremediterranee.it"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span>info@dimoremediterranee.it</span>
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              {t("footer.follow")}
            </h4>
            <a
              href="https://instagram.com/dimoremediterranee"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram className="h-4 w-4" />
              <span>@dimoremediterranee</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Dimore Mediterranee. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
