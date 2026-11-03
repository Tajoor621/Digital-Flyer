-- My Offers catalog + per-user priorities / notifications

create table if not exists areas (
  id serial primary key,
  name text not null,
  city text not null,
  country text not null,
  currency_code text not null,
  currency_symbol text not null,
  latitude double precision not null,
  longitude double precision not null,
  radius_km double precision not null default 5,
  created_at timestamptz not null default now()
);

create table if not exists stores (
  id serial primary key,
  name text not null,
  chain text not null,
  address text,
  latitude double precision,
  longitude double precision,
  area_id int not null references areas(id),
  website text,
  created_at timestamptz not null default now()
);

create table if not exists sources (
  id serial primary key,
  name text not null,
  type text not null,
  base_url text,
  area_id int references areas(id),
  crawl_frequency_minutes int not null default 60,
  last_crawled_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists offers (
  id serial primary key,
  store_id int not null references stores(id),
  area_id int not null references areas(id),
  source_id int not null references sources(id),
  item_name text not null,
  category text not null,
  price double precision not null,
  original_price double precision,
  discount_percent int,
  unit text,
  description text,
  source_url text,
  start_date date,
  end_date date,
  is_verified boolean not null default false,
  is_featured boolean not null default false,
  dedup_hash text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists user_profiles (
  user_id text primary key,
  area_id int references areas(id),
  city text,
  notify_enabled boolean not null default true,
  notify_priority_only boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists priority_items (
  id serial primary key,
  user_id text not null,
  item_name text not null,
  category text,
  created_at timestamptz not null default now()
);

create unique index if not exists priority_items_user_name
  on priority_items (user_id, item_name);

create table if not exists priority_areas (
  id serial primary key,
  user_id text not null,
  area_id int not null references areas(id) on delete cascade,
  created_at timestamptz not null default now()
);

create unique index if not exists priority_areas_user_area
  on priority_areas (user_id, area_id);

create table if not exists notification_log (
  id serial primary key,
  user_id text not null,
  offer_id int references offers(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  sent_at timestamptz not null default now()
);

create unique index if not exists notification_user_offer
  on notification_log (user_id, offer_id);

create table if not exists crawl_runs (
  id serial primary key,
  source_id int references sources(id),
  status text not null,
  offers_found int not null default 0,
  offers_new int not null default 0,
  notes text,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create index if not exists offers_area_idx on offers (area_id);
create index if not exists offers_city_created_idx on offers (created_at desc);
create index if not exists offers_category_idx on offers (category);
create index if not exists offers_store_idx on offers (store_id);
create index if not exists notification_user_idx on notification_log (user_id, sent_at desc);
create index if not exists stores_area_idx on stores (area_id);
create index if not exists sources_type_idx on sources (type);
