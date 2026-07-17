import { pricing } from "@/lib/content";
import { Reveal } from "./reveal";

/* Три формата выхода на воду: средний — якорь (accent) */

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-bg-2 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <Reveal>
          <h2 className="max-w-xl font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.1] text-ink">
            {pricing.heading}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={0.08 * i}>
              <article
                className={`flex h-full flex-col rounded-2xl border p-8 shadow-long transition-colors duration-300 md:p-9 ${
                  tier.accent
                    ? "border-cta/50 bg-elev lg:-translate-y-4"
                    : "border-line bg-elev hover:border-cta/30"
                }`}
              >
                <h3 className="font-display text-2xl text-ink">{tier.name}</h3>
                <p className="mt-5 font-display text-4xl text-amber">
                  {tier.price}
                </p>
                <p className="mt-1 text-sm text-mut">{tier.unit}</p>
                <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
                  {tier.features.map((f) => (
                    <li key={f} className="text-base leading-relaxed text-sub">
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className={`mt-8 rounded-lg px-6 py-3.5 text-center font-semibold transition-all duration-200 active:scale-[0.98] ${
                    tier.accent
                      ? "bg-cta text-white hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-glow"
                      : "border border-ink/20 text-ink hover:border-cta/60"
                  }`}
                >
                  {tier.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="text-sm text-mut">
            Цены с сайта клуба, подтверждаются шкипером при бронировании.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
