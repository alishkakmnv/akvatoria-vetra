-- Таблица заявок с формы брони «Акватория ветра»
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'booking',
  name text not null,
  phone text not null,
  city text,
  trip_date date,
  traffer text,
  src text,
  page text
);

-- Пишем только сервисным ключом из API-роута; анонимного доступа нет
alter table public.leads enable row level security;
