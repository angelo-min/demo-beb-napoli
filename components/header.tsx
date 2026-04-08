"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 md:px-8 transition-all duration-500 ${
          scrolled ? "py-3 md:py-4" : "py-5 md:py-6"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className={`font-serif text-xl font-medium tracking-wide md:text-2xl transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            style={!scrolled ? { textShadow: "0 1px 8px rgba(0,0,0,0.5)" } : undefined}
          >
            Dimore Mediterranee
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LanguageSwitcher variant={scrolled ? "dark" : "light"} />
        </motion.div>
      </nav>
    </header>
  );
}
