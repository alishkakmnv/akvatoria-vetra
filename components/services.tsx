import Image from "next/image";
import { services } from "@/lib/content";
import { Reveal } from "./reveal";

/* Асимметричная раскладка: два featured-направления крупно,
   четыре мельче с ритмом, широкая полоса путешествий внизу */

export function Services() {
  const [walk, school] = services.featured;
  return (
    <section id="services" className="scroll-mt-20 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <Reveal>
          <h2 className="max-w-xl font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.1] text-ink">
            {services.heading}
          </h2>
        </Reveal>

        {/* Featured: 7/5 со смещением второй карточки вниз */}
        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <ServiceFeatured {...walk} />
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-5 md:mt-16">
            <ServiceFeatured {...school} />
          </Reveal>
        </div>

        {/* Остальные: типографические карточки с ценой, смещённая колонка */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.rest.map((item, i) => (
            <Reveal
              key={item.title}
              delay={0.06 * i}
              className={i % 2 === 1 ? "lg:mt-10" : ""}
            >
              <article className="flex h-full flex-col rounded-2xl border border-line bg-elev p-7 shadow-long transition-colors duration-300 hover:border-cta/40">
                <h3 className="font-display text-xl leading-snug text-ink md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-semibold text-cta">
                  {item.price}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-sub">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Путешествия — широкая горизонтальная полоса, ломает ритм сетки */}
        <Reveal className="mt-6">
          <article className="group relative overflow-hidden rounded-2xl border border-line shadow-long">
            <div className="relative grid md:grid-cols-12">
              <div className="relative h-56 md:col-span-5 md:h-auto">
                <Image
                  src={services.travel.image}
                  alt="Марина на Эгейском побережье Турции"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="grade-warm object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-elev max-md:bg-gradient-to-t max-md:from-elev max-md:to-transparent" />
              </div>
              <div className="bg-elev p-8 md:col-span-7 md:p-10">
                <h3 className="font-display text-2xl text-ink">
                  {services.travel.title}
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-sub">
                  {services.travel.text}
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceFeatured({
  title,
  price,
  text,
  image,
  pos,
}: (typeof services.featured)[number]) {
  return (
    <article className="group flex h-[26rem] flex-col overflow-hidden rounded-2xl border border-line bg-elev shadow-long md:h-[30rem]">
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className={`grade-warm object-cover ${pos} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
        />
      </div>
      <div className="p-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-display text-2xl text-ink md:text-3xl">
            {title}
          </h3>
          <p className="font-semibold text-cta">{price}</p>
        </div>
        <p className="mt-3 max-w-md leading-relaxed text-sub">{text}</p>
      </div>
    </article>
  );
}
