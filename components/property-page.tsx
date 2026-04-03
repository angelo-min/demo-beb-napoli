"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import {
  Mountain,
  Coffee,
  Flower2,
  Sun,
  Wifi,
  Car,
  Thermometer,
  Zap,
  Leaf,
  Tv,
  Shield,
  ArrowUpDown,
  Lock,
  Bike,
  UtensilsCrossed,
  MapPin,
  Star,
  Clock,
  ArrowLeft,
  ExternalLink,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  X,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  mountain: Mountain,
  coffee: Coffee,
  flower: Flower2,
  sun: Sun,
  wifi: Wifi,
  car: Car,
  thermometer: Thermometer,
  zap: Zap,
  leaf: Leaf,
  tv: Tv,
  shield: Shield,
  arrowUpDown: ArrowUpDown,
  lock: Lock,
  bike: Bike,
  utensils: UtensilsCrossed,
};

interface ServiceConfig {
  titleKey: string;
  descKey: string;
  icon: string;
}

interface FlexibleRules {
  type: "flexible";
  textKey: string;
}

interface StructuredRules {
  type: "structured";
  checkinKey: string;
  checkoutKey: string;
  items: string[];
}

export interface PropertyConfig {
  id: string;
  nameKey: string;
  heroSubtitleKey: string;
  heroDescriptionKey: string;
  addressKey: string;
  overviewKey: string;
  priceKey: string;
  ratingKey: string;
  bookingUrl: string;
  airbnbUrl: string;
  photos: string[];
  services: ServiceConfig[];
  nearbyKeys: string[];
  rules: FlexibleRules | StructuredRules;
}

export function PropertyPage({ config }: { config: PropertyConfig }) {
  const { language, setLanguage, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + config.photos.length) % config.photos.length : null));
  }, [config.photos.length]);
  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % config.photos.length : null));
  }, [config.photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto]);

  const toggleLanguage = () => {
    setLanguage(language === "it" ? "en" : "it");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8 md:py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-serif text-xl font-medium tracking-wide text-foreground md:text-2xl">
              {t("property.backHome")}
            </span>
          </Link>

          <button
            onClick={toggleLanguage}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            aria-label={`Switch to ${language === "it" ? "English" : "Italian"}`}
          >
            {language === "it" ? "EN" : "IT"}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 pt-24 md:px-8">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary md:text-base">
              {t(config.heroSubtitleKey)}
            </p>

            <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
              <span className="text-balance">{t(config.nameKey)}</span>
            </h1>

            <div className="mx-auto mt-2 h-px w-24 bg-primary/40 md:mt-4 md:w-32" />

            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-10 md:text-lg">
              {t(config.heroDescriptionKey)}
            </p>

            {/* Rating & Price */}
            <div className="mt-8 flex items-center justify-center gap-8">
              <div className="flex items-center gap-2 text-accent">
                <Star className="h-5 w-5 fill-accent" />
                <span className="text-sm font-medium">{t(config.ratingKey)}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm font-medium text-foreground">{t(config.priceKey)}</span>
            </div>

            {/* Primary CTA — WhatsApp & Call */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={`https://wa.me/393382266190?text=${encodeURIComponent(t(`whatsapp.${config.id}.message`))}`}
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
            <p className="mt-3 text-xs text-muted-foreground">
              {t("whatsapp.badge")}
            </p>

            {/* Secondary CTA — Booking platforms */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href={config.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>Booking.com</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-border">|</span>
              <a
                href={config.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>Airbnb</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-12 md:mt-16">
              <a
                href="#overview"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:text-primary"
              >
                <span>{t("property.overview")}</span>
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

        {/* Overview Section */}
        <section id="overview" className="px-6 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
                {t("property.overview")}
              </h2>
              <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
            </div>

            <p className="text-center text-base leading-relaxed text-muted-foreground md:text-lg">
              {t(config.overviewKey)}
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">{t(config.addressKey)}</span>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        {config.photos.length > 0 && (
          <section className="bg-secondary/30 px-6 py-20 md:px-8 md:py-32">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center md:mb-16">
                <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
                  {t("property.gallery")}
                </h2>
                <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
              </div>

              <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
                {config.photos.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => openLightbox(i)}
                    className="mb-4 block w-full overflow-hidden rounded-sm break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Image
                      src={src}
                      alt={`${t(config.nameKey)} — ${i + 1}`}
                      width={600}
                      height={400}
                      className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={config.photos[lightboxIndex]}
                alt={`${t(config.nameKey)} — ${lightboxIndex + 1}`}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto rounded-sm object-contain"
              />
              <p className="mt-3 text-center text-sm text-white/60">
                {lightboxIndex + 1} / {config.photos.length}
              </p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Services Section */}
        <section className="px-6 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
                {t("property.services")}
              </h2>
              <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {config.services.map((service) => {
                const Icon = iconMap[service.icon] || Star;
                return (
                  <div
                    key={service.titleKey}
                    className="group flex gap-4 rounded-sm bg-card p-6 transition-all duration-300 hover:bg-background"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {t(service.titleKey)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {t(service.descKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Nearby Section */}
        <section className="bg-secondary/30 px-6 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
                {t("property.nearby")}
              </h2>
              <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
            </div>

            <div className="space-y-4">
              {config.nearbyKeys.map((key) => (
                <div
                  key={key}
                  className="flex items-start gap-4 rounded-sm bg-card p-5 transition-colors hover:bg-secondary/50"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {t(key)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section className="px-6 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
                {t("property.rules")}
              </h2>
              <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
            </div>

            {config.rules.type === "flexible" ? (
              <p className="text-center text-base leading-relaxed text-muted-foreground">
                {t(config.rules.textKey)}
              </p>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                  <div className="flex items-center gap-3 rounded-sm bg-card px-6 py-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        {t("property.checkin")}
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {t(config.rules.checkinKey)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-sm bg-card px-6 py-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        {t("property.checkout")}
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {t(config.rules.checkoutKey)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {config.rules.items.map((ruleKey) => (
                    <span
                      key={ruleKey}
                      className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
                    >
                      {t(ruleKey)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Book Now CTA */}
        <section className="px-6 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
              {t("property.book")}
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t(config.heroDescriptionKey)}
            </p>

            {/* Primary CTA — WhatsApp & Call */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={`https://wa.me/393382266190?text=${encodeURIComponent(t(`whatsapp.${config.id}.message`))}`}
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
            <p className="mt-3 text-xs text-muted-foreground">
              {t("whatsapp.label")}
            </p>

            {/* Secondary — Booking platforms */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href={config.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>Booking.com</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-border">|</span>
              <a
                href={config.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>Airbnb</span>
                <ExternalLink className="h-3.5 w-3.5" />
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
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 px-6 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
            <div className="flex flex-col items-center gap-3 md:items-start">
              <Link href="/" className="font-serif text-2xl font-medium text-foreground">
                {t("footer.brand")}
              </Link>
              <p className="text-sm text-muted-foreground">
                {t("footer.tagline")}
              </p>
            </div>

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

          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} Dimore Mediterranee. {t("footer.rights")}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
