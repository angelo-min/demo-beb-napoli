"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
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
  Instagram,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  type LucideIcon,
} from "lucide-react";
import { BookingSection } from "@/components/public/booking-section";
import type { Room } from "@/lib/booking-store";

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
  heroImages?: string[];
  photos: string[];
  services: ServiceConfig[];
  nearbyKeys: string[];
  rules: FlexibleRules | StructuredRules;
  rooms?: Room[];
}

function GalleryItem({
  src,
  alt,
  index,
  onClick,
}: {
  src: string;
  alt: string;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className="group relative mb-3 block w-full overflow-hidden rounded-lg break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm">
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

export function PropertyPage({ config }: { config: PropertyConfig }) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  // Hero slideshow
  useEffect(() => {
    if (!config.heroImages || config.heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % config.heroImages!.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [config.heroImages]);

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

          <LanguageSwitcher />
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 md:px-8">
          {/* Background slideshow */}
          {config.heroImages && config.heroImages.length > 0 && (
            <>
              {config.heroImages.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  className="object-cover transition-opacity duration-[2000ms] ease-in-out"
                  style={{ opacity: i === heroIndex ? 1 : 0 }}
                  sizes="100vw"
                  priority={i === 0}
                />
              ))}
              <div className="absolute inset-0 z-10 bg-black/50" />
            </>
          )}
          {!config.heroImages?.length && (
            <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          )}

          <div className={`relative z-20 mx-auto max-w-4xl text-center ${config.heroImages?.length ? "text-white" : ""}`}>
            <p className={`mb-4 text-sm font-medium uppercase tracking-[0.3em] md:text-base ${config.heroImages?.length ? "text-white/80" : "text-primary"}`}>
              {t(config.heroSubtitleKey)}
            </p>

            <h1 className={`font-serif text-5xl font-medium leading-tight tracking-tight md:text-7xl lg:text-8xl ${config.heroImages?.length ? "text-white" : "text-foreground"}`}>
              <span className="text-balance">{t(config.nameKey)}</span>
            </h1>

            <div className={`mx-auto mt-2 h-px w-24 md:mt-4 md:w-32 ${config.heroImages?.length ? "bg-white/40" : "bg-primary/40"}`} />

            <p className={`mx-auto mt-8 max-w-2xl text-base leading-relaxed md:mt-10 md:text-lg ${config.heroImages?.length ? "text-white/80" : "text-muted-foreground"}`}>
              {t(config.heroDescriptionKey)}
            </p>

            {/* Rating & Price */}
            <div className="mt-8 flex items-center justify-center gap-8">
              <div className={`flex items-center gap-2 ${config.heroImages?.length ? "text-white" : "text-accent"}`}>
                <Star className={`h-5 w-5 ${config.heroImages?.length ? "fill-white" : "fill-accent"}`} />
                <span className="text-sm font-medium">{t(config.ratingKey)}</span>
              </div>
              <div className={`h-4 w-px ${config.heroImages?.length ? "bg-white/30" : "bg-border"}`} />
              <span className={`text-sm font-medium ${config.heroImages?.length ? "text-white" : "text-foreground"}`}>{t(config.priceKey)}</span>
            </div>

            {/* Primary CTA — Book Now */}
            <div className="mt-10">
              <a
                href="#booking"
                className={`inline-flex items-center gap-2 rounded-sm px-10 py-3.5 text-sm font-medium uppercase tracking-widest transition-colors ${config.heroImages?.length ? "bg-white text-black hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
              >
                <span>{t("property.book")}</span>
              </a>
            </div>
            <p className={`mt-3 text-xs ${config.heroImages?.length ? "text-white/60" : "text-muted-foreground"}`}>
              {t("whatsapp.badge")}
            </p>

            <div className="mt-12 md:mt-16">
              <a
                href="#overview"
                className={`inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest transition-colors ${config.heroImages?.length ? "text-white/80 hover:text-white" : "text-foreground hover:text-primary"}`}
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

        {/* Photo Gallery — Animated Masonry */}
        {config.photos.length > 0 && (
          <section className="bg-secondary/30 px-6 py-20 md:px-8 md:py-32">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center md:mb-16">
                <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
                  {t("property.gallery")}
                </h2>
                <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
              </div>

              <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
                {config.photos.map((src, i) => (
                  <GalleryItem
                    key={src}
                    src={src}
                    alt={`${t(config.nameKey)} — ${i + 1}`}
                    index={i}
                    onClick={() => openLightbox(i)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Lightbox with animated transitions */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={closeLightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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

              <motion.div
                key={lightboxIndex}
                className="relative max-h-[85vh] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <Image
                  src={config.photos[lightboxIndex]}
                  alt={`${t(config.nameKey)} — ${lightboxIndex + 1}`}
                  width={1200}
                  height={800}
                  className="max-h-[85vh] w-auto rounded-lg object-contain"
                />
                <p className="mt-3 text-center text-sm text-white/60">
                  {lightboxIndex + 1} / {config.photos.length}
                </p>
              </motion.div>

              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Services Section */}
        <section className="px-6 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
                {t("property.services")}
              </h2>
              <div className="mx-auto mt-4 h-px w-16 bg-primary/40" />
            </div>

            <div className="flex flex-wrap justify-center gap-6">
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

        {/* Booking Section */}
        <BookingSection
          propertyId={config.id as "alegria" | "casamomi"}
          rooms={config.rooms}
          bookingUrl={config.bookingUrl}
          airbnbUrl={config.airbnbUrl}
        />
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
