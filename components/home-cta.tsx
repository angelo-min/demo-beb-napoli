"use client";

import { useLanguage } from "@/lib/i18n";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { Reveal, AnimatedLine } from "@/components/motion";
import { motion } from "framer-motion";

export function HomeCta() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-8 md:py-36">
      {/* Decorative accent */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-3xl" />

      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            {t("home.cta.title")}
          </h2>
        </Reveal>
        <AnimatedLine className="mx-auto mt-4 h-px w-16 bg-primary/40" delay={0.4} />
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("home.cta.desc")}
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href="#"
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#25D366] px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white shadow-lg shadow-[#25D366]/20 transition-colors hover:bg-[#1fb855]"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t("whatsapp.cta")}</span>
            </motion.a>
            <motion.a
              href="tel:+390000000000"
              className="inline-flex items-center gap-2.5 rounded-lg bg-primary px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Phone className="h-4 w-4" />
              <span>{t("phone.cta")}</span>
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-10">
            <a
              href="mailto:info@mmstudios.it"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>info@mmstudios.it</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
