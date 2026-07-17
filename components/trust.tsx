import { trust } from "@/lib/content";
import { Reveal } from "./reveal";

/* Строка доверия сразу под hero: только реальные цифры с сайта клуба */
export function Trust() {
  return (
    <section className="border-y border-line bg-bg-2/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-3 lg:px-20">
        {trust.map((item, i) => (
          <Reveal key={item.value} delay={0.06 * i}>
            <div className="flex items-baseline gap-4 sm:block">
              <p className="font-display text-3xl text-amber md:text-4xl">
                {item.value}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-sub">
                {item.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
