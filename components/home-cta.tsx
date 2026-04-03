"use client";

import { useLanguage } from "@/lib/i18n";
import { MessageCircle, Phone, Mail } from "lucide-react";

export function HomeCta() {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
          {t("home.cta.title")}
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("home.cta.desc")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://wa.me/393382266190"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-[#1fb855]"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{t("whatsapp.cta")}</span>
          </a>
          <a
            href="tel:+393382266190"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" />
            <span>{t("phone.cta")}</span>
          </a>
        </div>

        <div className="mt-8">
          <a
            href="mailto:info@dimoremediterranee.it"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            <span>info@dimoremediterranee.it</span>
          </a>
        </div>
      </div>
    </section>
  );
}
