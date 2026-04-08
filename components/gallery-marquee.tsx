"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Reveal, AnimatedLine } from "@/components/motion";

const topRow = [
  "/sebastian-leonhardt-PkWac9CLWVA-unsplash.jpg",
  "/grafi-jeremiah-I1MBKpoC61k-unsplash.jpg",
  "/villa-serena/02-terrace.jpg",
  "/riccardo-tuninato-qIjfxufh5F0-unsplash.jpg",
  "/casa-blu/01-living.jpg",
  "/sebastian-leonhardt-PkWac9CLWVA-unsplash.jpg",
  "/villa-serena/03-view.jpg",
  "/casa-blu/02-kitchen.jpg",
  "/victor-malyushev-VZ6SBoDU7EU-unsplash.jpg",
];

const bottomRow = [
  "/casa-blu/03-bedroom.jpg",
  "/alessio-bachetti-Kgv2UxpU3cM-unsplash.jpg",
  "/villa-serena/04-bedroom.jpg",
  "/vytenis-malisauskas-X4Y755WM_ug-unsplash.jpg",
  "/casa-blu/06-bathroom.jpg",
  "/villa-serena/06-living.jpg",
  "/naples-hero.jpg",
  "/villa-serena/08-bathroom.jpg",
  "/casa-blu/05-interior.jpg",
  "/villa-serena/07-kitchen.jpg",
];

function MarqueeRow({
  images,
  direction = "left",
  duration = 40,
}: {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}) {
  // Double the images for seamless loop
  const doubled = [...images, ...images];

  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-4"
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-48 w-72 shrink-0 overflow-hidden rounded-lg md:h-56 md:w-80 lg:h-64 lg:w-96"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function GalleryMarquee() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-36">
      <div className="mb-16 text-center md:mb-20">
        <Reveal>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
            {t("gallery.title")}
          </h2>
        </Reveal>
        <AnimatedLine className="mx-auto mt-4 h-px w-16 bg-primary/40" delay={0.4} />
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow images={topRow} direction="left" duration={45} />
        <MarqueeRow images={bottomRow} direction="right" duration={50} />
      </div>
    </section>
  );
}
