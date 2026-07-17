import Image from "next/image";
import { cities } from "@/lib/content";
import { Reveal } from "./reveal";

/* Две локации клуба: асимметричная пара 7/5 поверх реального фото регаты */

export function Cities() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/scraped/club-regatta-1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="grade-warm object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/75 to-bg" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-20">
        <Reveal>
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.1] text-ink">
            {cities.heading}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <article className="h-full rounded-2xl border border-line bg-elev/70 p-8 backdrop-blur-sm md:p-10">
              <h3 className="font-display text-3xl text-ink">
                {cities.saratov.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-sub">
                {cities.saratov.text}
              </p>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="caption">Адрес</dt>
                  <dd className="mt-1 text-ink">{cities.saratov.address}</dd>
                </div>
                <div>
                  <dt className="caption">Часы</dt>
                  <dd className="mt-1 text-ink">{cities.saratov.hours}</dd>
                </div>
              </dl>
            </article>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-5 md:mt-14">
            <article className="h-full rounded-2xl border border-line bg-elev/70 p-8 backdrop-blur-sm md:p-10">
              <h3 className="font-display text-3xl text-ink">
                {cities.penza.title}
              </h3>
              <p className="mt-4 leading-relaxed text-sub">
                {cities.penza.text}
              </p>
              <dl className="mt-8">
                <dt className="caption">Адрес</dt>
                <dd className="mt-1 text-ink">{cities.penza.address}</dd>
              </dl>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
