import { faq } from "@/lib/content";
import { Reveal } from "./reveal";

/* FAQ — карта возражений: шкипер, безопасность, дети, цена, погода.
   Нативный details/summary, без JS */

export function Faq() {
  return (
    <section className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.1] text-ink">
              {faq.heading}
            </h2>
            <p className="mt-6 leading-relaxed text-sub">
              Не нашли свой вопрос? Позвоните, шкипер ответит быстрее, чем вы
              дочитаете этот блок.
            </p>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            {faq.items.map((item, i) => (
              <Reveal key={item.q} delay={0.04 * i}>
                <details className="group border-b border-line py-2 open:pb-6">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 text-lg font-medium text-ink transition-colors hover:text-cta-text [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden
                      className="shrink-0 font-display text-2xl leading-none text-cta-text transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl leading-relaxed text-sub">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
