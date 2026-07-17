import Image from "next/image";
import { skippers } from "@/lib/content";
import { Reveal } from "./reveal";

/* Три шкипера: реальные фото и регалии со страницы «Команда».
   Смещённый ритм вместо ровного ряда */

export function Instructors() {
  return (
    <section id="team" className="scroll-mt-20 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.1] text-ink">
            За штурвалом люди,
            <br />а не сервис
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {skippers.people.map((s, i) => (
            <Reveal
              key={s.name}
              delay={0.08 * i}
              className={i === 1 ? "md:translate-y-12" : ""}
            >
              <article className="group overflow-hidden rounded-2xl border border-line bg-elev shadow-long transition-colors duration-300 hover:border-cta/40">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={s.image}
                    alt={`Шкипер ${s.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-elev via-transparent to-transparent" />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl text-ink">{s.name}</h3>
                  <p className="mt-1 text-sm font-medium text-cta">
                    {s.experience}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-sub">
                    {s.line}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
