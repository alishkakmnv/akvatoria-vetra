"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { hero as heroContent } from "@/lib/content";

const Water = dynamic(() => import("./water").then((m) => m.Water), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const intro = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.23, 1, 0.32, 1] as const },
  }),
};

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* Параллакс при скролле: яхта и текст уходят с разной скоростью */
  useGSAP(
    () => {
      if (reduce) return;
      const st = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(photo.current, { yPercent: 12, ease: "none", scrollTrigger: st });
      gsap.to(text.current, { yPercent: -18, ease: "none", scrollTrigger: st });
    },
    { scope: root, dependencies: [reduce] }
  );

  return (
    <section ref={root} className="relative min-h-[100dvh] overflow-hidden">
      {/* Слой 1: вода Three.js */}
      <div className="absolute inset-0" aria-hidden>
        <Water />
      </div>

      {/* Слой 2: яхта наезжает из правого края под диагональю,
          парус обрезан за границей вьюпорта */}
      <div
        ref={photo}
        aria-hidden
        className="absolute -right-[14%] -top-[38%] hidden h-[150%] w-[62%] md:block"
        style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <Image
          src="/images/scraped/hero-sail-2.jpg"
          alt=""
          fill
          priority
          sizes="70vw"
          className="grade-warm object-cover object-[55%_top]"
        />
        {/* Солнечный отсвет на парусе */}
        <div className="absolute inset-0 mix-blend-soft-light [background:radial-gradient(ellipse_at_78%_18%,rgba(255,255,255,0.7),transparent_62%)]" />
        {/* Растворение диагонали в фон и тёмный низ для читаемости */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
      </div>

      {/* Яхта на мобиле — фоном под текстом */}
      <div aria-hidden className="absolute inset-0 md:hidden">
        <Image
          src="/images/scraped/hero-sail-2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="grade-warm object-cover object-[55%_30%] opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/70" />
      </div>

      {/* Слой 3: текст, смещён влево и частично перекрывает фото */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl items-center px-6 lg:px-20">
        <div ref={text} className="max-w-[46rem] pb-24 pt-24 md:pb-16">
          <motion.h1
            custom={0}
            variants={intro}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="font-display text-[clamp(3rem,7.5vw,5.75rem)] font-medium leading-[1.05] tracking-tight text-ink [text-shadow:0_2px_24px_rgba(244,247,250,0.8)]"
          >
            Отдых под
            <br />
            парусом на{" "}
            <em className="pb-1 italic leading-[1.1] text-amber">Волге</em>
          </motion.h1>

          <motion.p
            custom={1}
            variants={intro}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="mt-7 max-w-lg text-lg leading-relaxed text-sub md:text-xl"
          >
            {heroContent.offer}
          </motion.p>

          <motion.div
            custom={2}
            variants={intro}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#booking"
              className="rounded-lg bg-cta px-8 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-glow active:scale-[0.98]"
            >
              Забронировать выход
            </a>
            <a
              href={site.phoneHref}
              className="rounded-lg border border-ink/20 bg-elev/60 px-8 py-4 font-medium text-ink backdrop-blur-sm transition-colors duration-200 hover:border-cta/60"
            >
              {site.phone}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Тонкий scroll-хинт */}
      {!reduce && (
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        >
          <motion.span
            className="block h-12 w-px bg-gradient-to-b from-transparent via-cta/70 to-transparent"
            animate={{ opacity: [0.25, 1, 0.25], y: [0, 6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </section>
  );
}
