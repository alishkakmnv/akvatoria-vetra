/** Контакты и навигация — единая точка правды (данные с akvatoriavetra.ru) */
export const site = {
  name: "Акватория ветра",
  phone: "+7 (963) 109-00-97",
  phoneHref: "tel:+79631090097",
  /* Второй номер из новостей клуба — актуальность уточнить у клиента */
  phoneSecond: "+7 (965) 639-45-93",
  whatsapp: "https://wa.me/79631090097",
  vk: "https://vk.com/akvatoriavetra_sar",
  hours: "Ежедневно 10:00–22:00",
  address: "г. Саратов, ул. Набережная (Новая набережная)",
  cities: ["Саратов", "Пенза"] as const,
};

export const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Флот", href: "#fleet" },
  { label: "Обучение", href: "#training" },
  { label: "Команда", href: "#team" },
  { label: "Цены", href: "#pricing" },
  { label: "Контакты", href: "#booking" },
];
