"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getTraffic } from "@/lib/traffic";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";

type Status = "idle" | "loading" | "success" | "error";

export function Booking() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const reduce = useReducedMotion();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const city = String(data.get("city") ?? "");
    const date = String(data.get("date") ?? "");

    /* Та же планка, что и на сервере */
    const next: typeof errors = {};
    if (name.length < 2) next.name = "Напишите, как к вам обращаться";
    if (phone.replace(/\D/g, "").length < 10)
      next.phone = "Нужен номер целиком, с кодом города";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "booking",
          name,
          phone,
          city,
          date,
          page: window.location.pathname,
          ...getTraffic(),
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="booking"
      className="relative scroll-mt-20 overflow-hidden py-28 md:py-40"
    >
      {/* Дневной кадр клуба: яхта с фирменным гиком на светлой воде */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/scraped/hero-main-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="grade-mist object-cover object-[center_40%] opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-20">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.1] text-ink">
              Вода уже ждёт.
              <br />
              <em className="italic text-amber">Выберите день</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm leading-relaxed text-sub">
              Оставьте заявку, и шкипер перезвонит в течение часа: подберём
              яхту, время и маршрут под вашу компанию.
            </p>
            <a
              href={site.phoneHref}
              className="link-underline mt-8 inline-block text-lg text-ink"
            >
              {site.phone}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-2xl border border-line bg-elev/90 p-8 shadow-long backdrop-blur-md md:p-10">
            {status === "success" ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="py-10 text-center"
              >
                <p className="font-display text-3xl text-ink">
                  Заявка у шкипера
                </p>
                <p className="mx-auto mt-4 max-w-xs leading-relaxed text-sub">
                  Перезвоним в течение часа и подтвердим выход. До встречи на
                  воде!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Имя" error={errors.name}>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Как к вам обращаться"
                      aria-invalid={Boolean(errors.name)}
                      className="input"
                    />
                  </Field>
                  <Field label="Телефон" error={errors.phone}>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+7 ___ ___-__-__"
                      aria-invalid={Boolean(errors.phone)}
                      className="input"
                    />
                  </Field>
                  <Field label="Город">
                    <select name="city" className="input" defaultValue="Саратов">
                      {site.cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Дата выхода">
                    <input name="date" type="date" min={today} className="input" />
                  </Field>
                </div>

                {status === "error" && (
                  <p role="alert" className="mt-5 text-sm font-medium text-error">
                    Не получилось отправить. Позвоните нам напрямую:{" "}
                    <a href={site.phoneHref} className="underline">
                      {site.phone}
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-8 w-full rounded-lg bg-cta px-8 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-glow active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                >
                  {status === "loading" ? "Отправляем…" : "Забронировать выход"}
                </button>
                <p className="mt-4 text-center text-sm text-mut">
                  Без предоплаты: бронь подтверждает шкипер по телефону
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* Стили инпутов — локально, чтобы не тащить в глобал */}
      <style>{`
        .input {
          width: 100%;
          border-radius: 8px;
          border: 1px solid var(--t-input-border);
          background: var(--color-bg);
          padding: 0.875rem 1rem;
          color: var(--color-ink);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input::placeholder { color: var(--color-mut); }
        .input:focus {
          outline: none;
          border-color: var(--color-cta);
          box-shadow: 0 0 0 3px var(--t-focus-ring);
        }
        .input[aria-invalid="true"] {
          border-color: color-mix(in srgb, var(--t-error) 60%, transparent);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="caption mb-2 block">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm text-error">{error}</span>}
    </label>
  );
}
