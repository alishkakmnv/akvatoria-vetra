import Image from "next/image";
import { fleet } from "@/lib/content";
import { Reveal } from "./reveal";

/* Флот: реальные лодки клуба, ховер раскрывает ТТХ (grid-rows, чистый CSS) */

export function Fleet() {
  return (
    <section id="fleet" className="scroll-mt-20 bg-bg-2 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.1] text-ink">
              Флот, который
              <br />
              <em className="italic text-amber">хочется трогать</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-sub">{fleet.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {fleet.boats.map((boat, i) => (
            <Reveal key={boat.name} delay={0.07 * (i % 2)}>
              <article
                tabIndex={0}
                className="group overflow-hidden rounded-2xl border border-line bg-elev shadow-long outline-none transition-colors duration-300 hover:border-cta/40 focus-visible:border-cta/60"
              >
                <div className="relative h-64 overflow-hidden md:h-72">
                  <Image
                    src={boat.image}
                    alt={`${boat.type} ${boat.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-elev to-transparent" />
                  <p className="caption absolute left-6 top-6 rounded bg-elev/75 px-2 py-1 !text-ink backdrop-blur-sm">
                    {boat.type}
                  </p>
                </div>

                <div className="p-7 pt-2">
                  <h3 className="font-display text-2xl text-ink">
                    {boat.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sub">
                    {boat.note}
                  </p>

                  {/* ТТХ раскрываются на ховер/фокус */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <dl className="mt-5 flex gap-8 border-t border-line pt-5">
                        {boat.specs.map(([k, v]) => (
                          <div key={k}>
                            <dt className="caption">{k}</dt>
                            <dd className="mt-1 font-medium text-ink">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <p className="text-sub">
            Не знаете, какая лодка подойдёт?{" "}
            <a href="#booking" className="link-underline font-medium text-ink">
              Забронировать выход
            </a>{" "}
            — шкипер подберёт под вашу компанию.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
