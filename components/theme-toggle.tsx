"use client";

import { useEffect, useState } from "react";

const KEY = "akvatoria-theme";
type Theme = "light" | "dark";

/** Переключатель светлой/тёмной версии: обе палитры живут в globals.css,
    выбор хранится в localStorage, атрибут ставится на <html> */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Theme | null;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* приватный режим — тема просто не сохранится */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg border border-line px-4 py-2 text-sm text-sub transition-colors hover:border-cta/50 hover:text-ink"
    >
      {theme === "light" ? "Тёмная версия" : "Светлая версия"}
    </button>
  );
}
