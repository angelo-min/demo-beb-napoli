"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Reveal, AnimatedLine } from "@/components/motion";

const topRow = [
  "/alegria/06B3A47C-83F1-4BE6-A3D7-0ABE0FD337A0.JPG",
  "/grafi-jeremiah-I1MBKpoC61k-unsplash.jpg",
  "/alegria/353E72DD-45D1-4200-813A-807B58B3C564.JPG",
  "/riccardo-tuninato-qIjfxufh5F0-unsplash.jpg",
  "/casa-momi/2446EC54-EE51-4B78-85E0-87BAF8636238.JPG",
  "/sebastian-leonhardt-PkWac9CLWVA-unsplash.jpg",
  "/alegria/2634CC9D-24B2-4702-B936-261A1D0AA4E5.JPG",
  "/casa-momi/232F863B-66EB-49FB-B525-57EE967BEA79.JPG",
  "/victor-malyushev-VZ6SBoDU7EU-unsplash.jpg",
];

const bottomRow = [
  "/casa-momi/092EC8A7-B283-460A-8E02-A2B623D5A50B_4_5005_c.jpeg",
  "/alessio-bachetti-Kgv2UxpU3cM-unsplash.jpg",
  "/alegria/36BDB849-704C-4803-8212-752819869E3D.JPG",
  "/vytenis-malisauskas-X4Y755WM_ug-unsplash.jpg",
  "/casa-momi/054C569E-BD67-42FE-8F3E-C8E7468518DC_4_5005_c.jpeg",
  "/alegria/0D847BFA-8851-486D-96B7-E1E597AD023F.JPG",
  "/casa-momi/136C6F01-0ED0-49AD-A24E-C685E2982E93_4_5005_c.jpeg",
  "/alegria/57380F2C-A553-4059-82FA-DCFC85036F45.JPG",
  "/casa-momi/05D1B51E-A98A-4D52-BD54-FB87AE598275_4_5005_c.jpeg",
  "/alegria/3C7596B1-4FFA-4028-930B-107970288F74.JPG",
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
