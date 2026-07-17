/**
 * Метки атрибуции трафферов: ?traffer= и ?src= в ссылках из TikTok/Reels/Telegram.
 * Запоминаются в sessionStorage при входе, чтобы дожить до отправки заявки.
 * Паттерн перенесён с основного сайта azian.
 */

const KEYS = ["traffer", "src"] as const;
const PREFIX = "akvatoria_";

export type TrafficTags = { traffer: string; src: string };

/** Сохранить метки из текущего URL (вызывается при входе на сайт) */
export function captureTraffic() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of KEYS) {
      const value = params.get(key);
      if (value) sessionStorage.setItem(PREFIX + key, value.slice(0, 100));
    }
  } catch {
    /* sessionStorage недоступен в некоторых приватных режимах — метки просто не сохранятся */
  }
}

/** Метки для payload заявки: приоритет у текущего URL, затем — сохранённые при входе */
export function getTraffic(): TrafficTags {
  if (typeof window === "undefined") return { traffer: "", src: "" };
  try {
    const params = new URLSearchParams(window.location.search);
    const read = (key: (typeof KEYS)[number]) =>
      params.get(key) || sessionStorage.getItem(PREFIX + key) || "";
    return { traffer: read("traffer"), src: read("src") };
  } catch {
    return { traffer: "", src: "" };
  }
}
