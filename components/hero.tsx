"use client";

import { useLanguage } from "@/lib/i18n";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { TextReveal, AnimatedLine, Reveal } from "@/components/motion";

const heroImages = [
  "/grafi-jeremiah-I1MBKpoC61k-unsplash.jpg",
  "/sebastian-leonhardt-PkWac9CLWVA-unsplash.jpg",
  "/alessio-bachetti-Kgv2UxpU3cM-unsplash.jpg",
  "/riccardo-tuninato-qIjfxufh5F0-unsplash.jpg",
  "/victor-malyushev-VZ6SBoDU7EU-unsplash.jpg",
  "/vytenis-malisauskas-X4Y755WM_ug-unsplash.jpg",
];

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Slideshow background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: imageScale }}>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current}
            src={heroImages[current]}
            alt="Mediterranean landscape"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/60 to-black/75" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-8"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.p
          className="mb-6 text-sm font-medium uppercase tracking-[0.4em] text-white/70 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <h1
          className="font-serif text-5xl font-medium leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
        >
          <TextReveal text={t("hero.tagline")} delay={0.5} />
        </h1>

        <AnimatedLine
          className="mx-auto mt-6 h-px w-24 bg-white/50 md:mt-8 md:w-32"
          delay={1.2}
        />

        <Reveal delay={1.4} direction="up">
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:mt-10 md:text-lg">
            {t("hero.description")}
          </p>
        </Reveal>

        <Reveal delay={1.6} direction="up">
          <div className="mt-12 md:mt-16">
            <a
              href="#properties"
              className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-white/80 transition-colors hover:text-white"
            >
              <span>{t("properties.title")}</span>
              <motion.svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </motion.svg>
            </a>
          </div>
        </Reveal>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
