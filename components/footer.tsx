import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl text-ink">Акватория ветра</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-mut">
              Яхт-клуб на Волге: Саратов и Пенза. {site.hours}.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-sub transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={site.phoneHref}
              className="font-medium text-ink transition-colors hover:text-cta"
            >
              {site.phone}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sub transition-colors hover:text-ink"
            >
              WhatsApp
            </a>
            <a
              href={site.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sub transition-colors hover:text-ink"
            >
              ВКонтакте
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-mut">
          © {new Date().getFullYear()} Акватория ветра · {site.address}
        </p>
      </div>
    </footer>
  );
}
