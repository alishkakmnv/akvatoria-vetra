"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* Карусель крупных пул-квот: авто-скролл с паузой на ховере (DESIGN.md).
   Отзывы — реальные, с сайта клиента (data/akvatoria-scraped.json) */

import { quotes } from "@/lib/content";

const AUTOPLAY_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || reduce) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      AUTOPLAY_MS
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduce]);

  const q = quotes[index];

  return (
    <section
      className="bg-bg-2 py-28 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Кавычка-акцент слева, цитата на широкой колонке */}
          <div aria-hidden className="hidden lg:col-span-2 lg:block">
            <span className="font-display text-[9rem] leading-none text-amber/25">
              «
            </span>
          </div>

          <div className="lg:col-span-10">
            <div className="min-h-[16rem] md:min-h-[14rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="max-w-4xl font-display text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.2] text-ink">
                    {q.text}
                  </p>
                  <footer className="mt-8 text-sub">
                    {q.author}
                    <span className="text-mut"> · {q.city}</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-3">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Отзыв ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className="flex h-11 w-8 items-center justify-center"
                >
                  <span
                    className={`block h-px transition-all duration-300 ${
                      i === index ? "w-8 bg-cta" : "w-4 bg-mut/60"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
