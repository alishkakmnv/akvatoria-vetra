import Image from "next/image";
import { training } from "@/lib/content";
import { Reveal } from "./reveal";

/* Featured-блок обучения: фото уходит за левый край,
   текст на смещённой правой колонке */

export function Training() {
  return (
    <section id="training" className="scroll-mt-20 overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-6">
            {/* Обрезка за край — часть языка DESIGN.md */}
            <div className="relative -ml-6 h-[24rem] overflow-hidden rounded-r-2xl border-y border-r border-line shadow-long md:h-[32rem] lg:-ml-20">
              <Image
                src={training.image}
                alt="Ученица школы яхтинга в спасательном жилете у паруса «Акватории ветра»"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="grade-warm object-cover object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg/45" />
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.1] text-ink">
                Настоящему яхтингу
                <br />
                учат на воде
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              {training.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 leading-relaxed text-sub first:mt-7">
                  {p}
                </p>
              ))}
              <p className="mt-6 font-semibold text-cta-text">
                {training.priceLine}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href="#booking"
                className="mt-9 inline-block rounded-lg bg-cta px-8 py-4 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-glow active:scale-[0.98]"
              >
                {training.cta}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
