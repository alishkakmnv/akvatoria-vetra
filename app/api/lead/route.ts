import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Приём заявок с формы брони.
 * Пишет лид в Supabase (таблица leads) и шлёт пуш в Telegram-группу.
 * Паттерн перенесён с azian: обрезка полей, ретрай при миграции чата.
 * Ключи — в .env.local и в env-переменных Vercel (см. .env.local.example).
 */

type LeadPayload = {
  source?: string;
  name?: string;
  phone?: string;
  city?: string;
  date?: string;
  traffer?: string;
  src?: string;
  page?: string;
};

/* Срез по code points, а не по UTF-16 code units:
   эмодзи на границе лимита не разваливается на суррогатную пару */
function clean(value: unknown, max = 200): string {
  if (typeof value !== "string") return "";
  return [...value.trim()].slice(0, max).join("");
}

export async function POST(req: Request) {
  let raw: LeadPayload;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const lead = {
    source: clean(raw.source, 20) || "booking",
    name: clean(raw.name, 120),
    phone: clean(raw.phone, 40),
    city: clean(raw.city, 40),
    date: clean(raw.date, 20),
    traffer: clean(raw.traffer, 100),
    src: clean(raw.src, 100),
    page: clean(raw.page, 200),
  };

  /* Та же планка, что и в клиентской валидации */
  if (lead.name.length < 2 || lead.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const [supabaseOk, telegramOk] = await Promise.all([
    saveToSupabase(lead),
    sendToTelegram(lead),
  ]);

  /* Успех, если сработал хотя бы один настроенный канал */
  if (supabaseOk || telegramOk) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json(
    { ok: false, error: "delivery_failed" },
    { status: 502 }
  );
}

async function saveToSupabase(lead: Record<string, string>): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false },
    });
    const { error } = await supabase.from("leads").insert({
      source: lead.source,
      name: lead.name,
      phone: lead.phone,
      city: lead.city,
      trip_date: lead.date || null,
      traffer: lead.traffer || null,
      src: lead.src || null,
      page: lead.page || null,
    });
    if (error) {
      console.error("[lead] Supabase insert:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] Supabase недоступен:", err);
    return false;
  }
}

async function sendToTelegram(lead: Record<string, string>): Promise<boolean> {
  const token = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) return false;

  const lines = [
    "⛵ Новая бронь — Акватория ветра",
    "",
    `👤 Имя: ${lead.name}`,
    `📱 Телефон: ${lead.phone}`,
    `🏙 Город: ${lead.city || "не указан"}`,
  ];
  if (lead.date) lines.push(`📅 Дата: ${lead.date}`);
  const attribution = [
    lead.traffer && `Траффер: ${lead.traffer}`,
    lead.src && `Источник: ${lead.src}`,
    lead.page && `Страница: ${lead.page}`,
  ]
    .filter(Boolean)
    .join(" | ");
  if (attribution) lines.push(`📊 ${attribution}`);

  try {
    return await pushTelegram(token, chatId, lines.join("\n"));
  } catch (err) {
    console.error("[lead] Telegram недоступен:", err);
    return false;
  }
}

/* Если группу апгрейдили до супергруппы, Telegram присылает новый chat_id
   (-100…) в parameters.migrate_to_chat_id — ретраим на него сразу */
async function pushTelegram(
  token: string,
  chatId: string,
  text: string
): Promise<boolean> {
  const call = (id: string) =>
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ chat_id: id, text }),
      signal: AbortSignal.timeout(8000),
    });

  let res = await call(chatId);
  if (res.ok) return true;

  const body = await res.text();
  console.error(`[lead] Telegram error ${res.status}: ${body}`);

  let migratedId: number | undefined;
  try {
    migratedId = JSON.parse(body)?.parameters?.migrate_to_chat_id;
  } catch {
    /* тело не JSON — миграции нет */
  }
  if (!migratedId) return false;

  console.error(
    `[lead] группа переехала в супергруппу, ретрай с chat_id ${migratedId} — обнови TG_CHAT_ID`
  );
  res = await call(String(migratedId));
  if (!res.ok) {
    console.error(`[lead] ретрай не прошёл ${res.status}: ${await res.text()}`);
    return false;
  }
  return true;
}
