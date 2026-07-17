"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* Прозрачный → тёмный: следим за сентинелом в самом верху страницы,
     без слушателя scroll */
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "24px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Блокируем скролл под мобильным меню */
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-px w-px" />
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "bg-bg/85 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-20">
          <Link
            href="#"
            className="font-display text-xl tracking-tight text-ink"
            onClick={() => setOpen(false)}
          >
            Акватория ветра
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-sm text-sub transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={site.phoneHref}
              className="text-sm text-sub transition-colors hover:text-ink"
            >
              {site.phone}
            </a>
            <a
              href="#booking"
              className="rounded-lg bg-cta px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow active:scale-[0.98]"
            >
              Забронировать
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-bg/97 px-6 pb-10 pt-28 backdrop-blur-lg lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="border-b border-line py-4 font-display text-3xl text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex flex-col gap-4">
              <a href={site.phoneHref} className="text-lg text-sub">
                {site.phone}
              </a>
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-cta px-8 py-4 text-center font-semibold text-white"
              >
                Забронировать выход
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
