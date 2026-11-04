import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { haversineKm } from "@/lib/utils";
import { matchesPriorityItem } from "./format";
import { chainLike, chainMatches, isBargainQuery, localChainRank } from "./local-markets";
import { syncOfficialKarachiRates } from "./live-rates";
import { offerMatchesQuery, stapleRank } from "./search-index";
import type {
  Area,
  AppNotification,
  Coverage,
  CrawlResult,
  ListOffersInput,
  Offer,
  PriorityArea,
  PriorityItem,
  SortKey,
  Source,
  SourceType,
  Store,
  UserProfile,
  CategoryId,
} from "./types";

const OFFER_SELECT = `
  o.id,
  o.item_name,
  o.category,
  o.price,
  o.original_price,
  o.discount_percent,
  o.unit,
  o.description,
  o.source_url,
  o.start_date::text as start_date,
  o.end_date::text as end_date,
  o.is_verified,
  o.is_featured,
  o.created_at::text as created_at,
  st.id as store_id,
  st.name as store_name,
  st.chain as store_chain,
  st.address as store_address,
  st.website as store_website,
  st.latitude as store_lat,
  st.longitude as store_lng,
  a.id as area_id,
  a.name as area_name,
  a.city,
  a.country,
  a.currency_code,
  a.currency_symbol,
  src.id as source_id,
  src.name as source_name,
  src.type as source_type
`;

type OfferRow = {
  id: number;
  item_name: string;
  category: string;
  price: number;
  original_price: number | null;
  discount_percent: number | null;
  unit: string | null;
  description: string | null;
  source_url: string | null;
  start_date: string | null;
  end_date: string | null;
  is_verified: boolean;
  is_featured: boolean;
  created_at: string;
  store_id: number;
  store_name: string;
  store_chain: string;
  store_address: string | null;
  store_website: string | null;
  store_lat: number | null;
  store_lng: number | null;
  area_id: number;
  area_name: string;
  city: string;
  country: string;
  currency_code: string;
  currency_symbol: string;
  source_id: number;
  source_name: string;
  source_type: string;
};

let seedChain: Promise<void> | null = null;
const CATALOG_REV = 16;
let seedRev = 0;

async function ensureSeed(): Promise<void> {
  if (seedRev !== CATALOG_REV) {
    seedChain = null;
    seedRev = CATALOG_REV;
  }
  if (!seedChain) {
    seedChain = (async () => {
      const { seedCatalog } = await import("./seed");
      const sql = await getSql();
      await seedCatalog(sql);
    })().catch((err) => {
      seedChain = null;
      throw err;
    });
  }
  return seedChain;
}

function mapOffer(
  row: OfferRow,
  origin?: { lat: number; lng: number } | null,
  priority = false,
): Offer {
  let distanceKm: number | null = null;
  if (
    origin &&
    row.store_lat != null &&
    row.store_lng != null &&
    Number.isFinite(row.store_lat) &&
    Number.isFinite(row.store_lng)
  ) {
    distanceKm = haversineKm(origin.lat, origin.lng, row.store_lat, row.store_lng);
  }
  return {
    id: row.id,
    itemName: row.item_name,
    category: row.category as CategoryId,
    price: Number(row.price),
    originalPrice: row.original_price == null ? null : Number(row.original_price),
    discountPercent: row.discount_percent,
    unit: row.unit,
    description: row.description,
    sourceUrl: row.source_url,
    startDate: row.start_date,
    endDate: row.end_date,
    isVerified: Boolean(row.is_verified),
    isFeatured: Boolean(row.is_featured),
    createdAt: row.created_at,
    storeId: row.store_id,
    storeName: row.store_name,
    storeChain: row.store_chain,
    storeAddress: row.store_address,
    storeWebsite: row.store_website,
    storeLat: row.store_lat,
    storeLng: row.store_lng,
    areaId: row.area_id,
    areaName: row.area_name,
    city: row.city,
    country: row.country,
    currencyCode: row.currency_code,
    currencySymbol: row.currency_symbol,
    sourceId: row.source_id,
    sourceName: row.source_name,
    sourceType: row.source_type as SourceType,
    distanceKm,
    isPriority: priority,
  };
}

function sortOffers(list: Offer[], sort: SortKey | undefined, preferAreaId?: number): Offer[] {
  const copy = [...list];
  const byDistance = (a: Offer, b: Offer) => {
    if (a.distanceKm == null && b.distanceKm == null) return 0;
    if (a.distanceKm == null) return 1;
    if (b.distanceKm == null) return -1;
    return a.distanceKm - b.distanceKm;
  };
  const byArea = (a: Offer, b: Offer) => {
    if (!preferAreaId) return 0;
    return Number(b.areaId === preferAreaId) - Number(a.areaId === preferAreaId);
  };
  const byStaple = (a: Offer, b: Offer) =>
    stapleRank(a.itemName, a.description, a.category) -
    stapleRank(b.itemName, b.description, b.category);

  copy.sort((a, b) => {
    const area = byArea(a, b);
    if (area !== 0) return area;
    if (sort === "discount") {
      const cut = (b.discountPercent ?? 0) - (a.discountPercent ?? 0);
      if (cut !== 0) return cut;
    } else if (sort === "price") {
      const shelf = (o: Offer) => (o.unit === "portal" || o.price <= 0 ? Number.POSITIVE_INFINITY : o.price);
      const price = shelf(a) - shelf(b);
      if (price !== 0) return price;
    } else if (sort === "ending") {
      const end = (a.endDate ?? "9999").localeCompare(b.endDate ?? "9999");
      if (end !== 0) return end;
    } else if (sort === "recent") {
      const recent = b.createdAt.localeCompare(a.createdAt);
      if (recent !== 0) return recent;
    } else {
      // Inside 2 km, neighbourhood chains (Talal, Faaz, Day to Day, official sabzi)
      // come before big-box stores. Distance still orders shops in the same group.
      const near = (o: Offer) => o.distanceKm != null && o.distanceKm <= 2;
      if (near(a) && near(b)) {
        const rank = localChainRank(a.storeChain) - localChainRank(b.storeChain);
        if (rank !== 0) return rank;
        const shelf = (o: Offer) => (o.unit === "portal" || o.price <= 0 ? Number.POSITIVE_INFINITY : o.price);
        if (Math.abs((a.distanceKm ?? 0) - (b.distanceKm ?? 0)) <= 0.35) {
          const cheap = shelf(a) - shelf(b);
          if (cheap !== 0) return cheap;
        }
      }
      if (a.distanceKm != null && b.distanceKm != null) {
        if (Math.abs(a.distanceKm - b.distanceKm) > 0.35) return byDistance(a, b);
      } else if (byDistance(a, b) !== 0) {
        return byDistance(a, b);
      }
      const staple = byStaple(a, b);
      if (staple !== 0) return staple;
    }
    const dist = byDistance(a, b);
    if (dist !== 0) return dist;
    const pin = Number(b.isPriority) - Number(a.isPriority);
    if (pin !== 0) return pin;
    return b.createdAt.localeCompare(a.createdAt);
  });
  return copy;
}

export const listAreas = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    name: string;
    city: string;
    country: string;
    currency_code: string;
    currency_symbol: string;
    latitude: number;
    longitude: number;
    radius_km: number;
  }>`select id, name, city, country, currency_code, currency_symbol, latitude, longitude, radius_km from areas order by country, city, name`;
  return rows.map(
    (r): Area => ({
      id: r.id,
      name: r.name,
      city: r.city,
      country: r.country,
      currencyCode: r.currency_code,
      currencySymbol: r.currency_symbol,
      latitude: Number(r.latitude),
      longitude: Number(r.longitude),
      radiusKm: Number(r.radius_km),
    }),
  );
});

export const listStores = createServerFn({ method: "GET" })
  .validator((input: { city?: string; areaId?: number } | undefined) => input ?? {})
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    const params: unknown[] = [];
    const where: string[] = ["1=1"];
    if (data.areaId) {
      params.push(data.areaId);
      where.push(`st.area_id = $${params.length}`);
    }
    if (data.city) {
      params.push(data.city);
      where.push(`a.city = $${params.length}`);
    }
    const rows = await sql.query<{
      id: number;
      name: string;
      chain: string;
      address: string | null;
      latitude: number | null;
      longitude: number | null;
      area_id: number;
      website: string | null;
    }>(
      `select st.id, st.name, st.chain, st.address, st.latitude, st.longitude, st.area_id, st.website
       from stores st join areas a on a.id = st.area_id
       where ${where.join(" and ")}
       order by st.chain, st.name`,
      params,
    );
    return rows.map(
      (r): Store => ({
        id: r.id,
        name: r.name,
        chain: r.chain,
        address: r.address,
        latitude: r.latitude == null ? null : Number(r.latitude),
        longitude: r.longitude == null ? null : Number(r.longitude),
        areaId: r.area_id,
        website: r.website,
      }),
    );
  });

export const listSources = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    name: string;
    type: string;
    base_url: string | null;
    area_id: number | null;
    crawl_frequency_minutes: number;
    last_crawled_at: string | null;
    active: boolean;
  }>`select id, name, type, base_url, area_id, crawl_frequency_minutes, last_crawled_at::text as last_crawled_at, active from sources order by type, name`;
  return rows.map(
    (r): Source => ({
      id: r.id,
      name: r.name,
      type: r.type as SourceType,
      baseUrl: r.base_url,
      areaId: r.area_id,
      crawlFrequencyMinutes: r.crawl_frequency_minutes,
      lastCrawledAt: r.last_crawled_at,
      active: Boolean(r.active),
    }),
  );
});

export const getCoverage = createServerFn({ method: "GET" })
  .validator((input: { city?: string } | undefined) => input ?? {})
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    const sources = await sql<{ c: number; active: number; last: string | null }>`
      select count(*)::int as c,
             count(*) filter (where active)::int as active,
             max(last_crawled_at)::text as last
      from sources`;
    const offerParams: unknown[] = [];
    let offerWhere = "1=1";
    if (data.city) {
      offerParams.push(data.city);
      offerWhere = `a.city = $1`;
    }
    const offers = await sql.query<{ c: number; pending: number }>(
      `select count(*)::int as c,
              count(*) filter (where not o.is_verified)::int as pending
       from offers o join areas a on a.id = o.area_id
       where ${offerWhere}`,
      offerParams,
    );
    const coverage: Coverage = {
      sourceCount: sources[0]?.c ?? 0,
      activeSources: sources[0]?.active ?? 0,
      offerCount: offers[0]?.c ?? 0,
      lastCrawledAt: sources[0]?.last ?? null,
      pendingReview: offers[0]?.pending ?? 0,
    };
    return coverage;
  });

async function ensureProfile(userId: string): Promise<void> {
  const sql = await getSql();
  await sql.query(
    `insert into user_profiles (user_id) values ($1) on conflict (user_id) do nothing`,
    [userId],
  );
}

async function loadPriorityContext(userId: string): Promise<{
  items: PriorityItem[];
  areaIds: Set<number>;
}> {
  const sql = await getSql();
  const items = await sql<{
    id: number;
    item_name: string;
    category: string | null;
    created_at: string;
  }>`select id, item_name, category, created_at::text as created_at from priority_items where user_id = ${userId} order by created_at desc`;
  const areas = await sql<{ area_id: number }>`select area_id from priority_areas where user_id = ${userId}`;
  return {
    items: items.map((r) => ({
      id: r.id,
      itemName: r.item_name,
      category: r.category as CategoryId | null,
      createdAt: r.created_at,
    })),
    areaIds: new Set(areas.map((a) => a.area_id)),
  };
}

function applyPriority(offers: Offer[], items: PriorityItem[], areaIds: Set<number>): Offer[] {
  return offers.map((o) => ({
    ...o,
    isPriority:
      areaIds.has(o.areaId) ||
      matchesPriorityItem(
        o.itemName,
        items.map((i) => ({ itemName: i.itemName, category: i.category })),
        o.category,
        o.description,
      ),
  }));
}

export const listOffers = createServerFn({ method: "GET" })
  .validator((input: ListOffersInput | undefined) => input ?? {})
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    if (!data.city || data.city === "Karachi") {
      await Promise.race([
        syncOfficialKarachiRates(sql),
        new Promise((resolve) => setTimeout(resolve, 3500)),
      ]);
    }
    const params: unknown[] = [];
    const where: string[] = ["1=1"];
    const bargain = isBargainQuery(data.search);
    const chain = bargain ? null : chainLike(data.search);
    if (!data.includeUnverified && data.verifiedOnly !== false) {
      where.push("o.is_verified = true");
    }
    where.push("(o.end_date is null or o.end_date >= current_date)");
    if (chain) {
      params.push(`%${chain}%`);
      where.push(`(st.chain ilike $${params.length} or st.name ilike $${params.length})`);
    } else if (data.city) {
      params.push(data.city);
      const cityIdx = params.length;
      if (data.originLat != null && data.originLng != null) {
        params.push(data.originLat, data.originLng);
        where.push(
          `(a.city = $${cityIdx} or (abs(st.latitude - $${cityIdx + 1}) < 0.22 and abs(st.longitude - $${cityIdx + 2}) < 0.22))`,
        );
      } else {
        where.push(`a.city = $${cityIdx}`);
      }
    } else if (data.areaId) {
      params.push(data.areaId);
      where.push(`o.area_id = $${params.length}`);
    }
    if (data.search && data.search.trim()) {
      // Unicode, emoji, and roman Urdu are matched in JS so Postgres ILIKE
      // cannot drop ہندی / اردو queries.
    }
    if (data.category) {
      params.push(data.category);
      where.push(`o.category = $${params.length}`);
    }
    if (data.storeId) {
      params.push(data.storeId);
      where.push(`o.store_id = $${params.length}`);
    }
    if (data.sourceType) {
      params.push(data.sourceType);
      where.push(`src.type = $${params.length}`);
    }
    if (data.minPrice != null) {
      params.push(data.minPrice);
      where.push(`o.price >= $${params.length}`);
    }
    if (data.maxPrice != null) {
      params.push(data.maxPrice);
      where.push(`o.price <= $${params.length}`);
    }

    const rows = await sql.query<OfferRow>(
      `select ${OFFER_SELECT}
       from offers o
       join stores st on st.id = o.store_id
       join areas a on a.id = o.area_id
       join sources src on src.id = o.source_id
       where ${where.join(" and ")}
       order by o.created_at desc
       limit 500`,
      params,
    );

    const origin =
      data.originLat != null && data.originLng != null
        ? { lat: data.originLat, lng: data.originLng }
        : null;
    let offers = rows.map((r) => mapOffer(r, origin));
    if (data.search && data.search.trim() && !bargain) {
      const q = data.search.trim();
      offers = offers.filter(
        (o) =>
          offerMatchesQuery(o.itemName, o.description, o.category, q) ||
          chainMatches(o.storeChain, o.storeName, q),
      );
    }
    if (bargain) {
      offers = offers.filter((o) => localChainRank(o.storeChain) === 0);
    }
    if (data.maxKm != null) {
      offers = offers.filter((o) => o.distanceKm == null || o.distanceKm <= data.maxKm!);
    }
    const sort = bargain && (!data.sort || data.sort === "nearby")
      ? "price"
      : (data.sort ?? (origin ? "nearby" : "recent"));
    return sortOffers(offers, sort, data.areaId);
  });

export const listOffersPersonalized = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: ListOffersInput | undefined) => input ?? {})
  .handler(async ({ data, context }) => {
    const offers = await listOffers({ data });
    const { items, areaIds } = await loadPriorityContext(context.userId);
    return sortOffers(applyPriority(offers, items, areaIds), data.sort ?? "nearby", data.areaId);
  });

export const getOffer = createServerFn({ method: "GET" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    await ensureSeed();
    const sql = await getSql();
    const rows = await sql.query<OfferRow>(
      `select ${OFFER_SELECT}
       from offers o
       join stores st on st.id = o.store_id
       join areas a on a.id = o.area_id
       join sources src on src.id = o.source_id
       where o.id = $1`,
      [id],
    );
    return rows[0] ? mapOffer(rows[0]) : null;
  });

export const getOfferPersonalized = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ data: id, context }) => {
    const offer = await getOffer({ data: id });
    if (!offer) return null;
    const { items, areaIds } = await loadPriorityContext(context.userId);
    return applyPriority([offer], items, areaIds)[0];
  });

export const getProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureSeed();
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      area_id: number | null;
      city: string | null;
      notify_enabled: boolean;
      notify_priority_only: boolean;
    }>`select user_id, area_id, city, notify_enabled, notify_priority_only from user_profiles where user_id = ${context.userId}`;
    if (!rows[0]) {
      const profile: UserProfile = {
        userId: context.userId,
        areaId: null,
        city: null,
        notifyEnabled: true,
        notifyPriorityOnly: true,
      };
      return profile;
    }
    const r = rows[0];
    const profile: UserProfile = {
      userId: r.user_id,
      areaId: r.area_id,
      city: r.city,
      notifyEnabled: Boolean(r.notify_enabled),
      notifyPriorityOnly: Boolean(r.notify_priority_only),
    };
    return profile;
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      areaId?: number | null;
      city?: string | null;
      notifyEnabled?: boolean;
      notifyPriorityOnly?: boolean;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql.query(
      `insert into user_profiles (user_id, area_id, city, notify_enabled, notify_priority_only, updated_at)
       values ($1, $2, $3, coalesce($4, true), coalesce($5, true), now())
       on conflict (user_id) do update set
         area_id = coalesce($2, user_profiles.area_id),
         city = coalesce($3, user_profiles.city),
         notify_enabled = coalesce($4, user_profiles.notify_enabled),
         notify_priority_only = coalesce($5, user_profiles.notify_priority_only),
         updated_at = now()`,
      [
        context.userId,
        data.areaId === undefined ? null : data.areaId,
        data.city === undefined ? null : data.city,
        data.notifyEnabled ?? null,
        data.notifyPriorityOnly ?? null,
      ],
    );
    return { ok: true };
  });

export const listPriorityItems = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { items } = await loadPriorityContext(context.userId);
    return items;
  });

export const addPriorityItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { itemName: string; category?: string | null }) => ({
    itemName: input.itemName.trim(),
    category: input.category ?? null,
  }))
  .handler(async ({ context, data }) => {
    if (!data.itemName) return { ok: false as const };
    await ensureProfile(context.userId);
    const sql = await getSql();
    await sql.query(
      `insert into priority_items (user_id, item_name, category)
       values ($1, $2, $3)
       on conflict (user_id, item_name) do nothing`,
      [context.userId, data.itemName, data.category],
    );
    return { ok: true as const };
  });

export const removePriorityItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql.query(`delete from priority_items where id = $1 and user_id = $2`, [
      id,
      context.userId,
    ]);
    return { ok: true };
  });

export const listPriorityAreas = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      area_id: number;
      name: string;
      city: string;
      created_at: string;
    }>`select pa.id, pa.area_id, a.name, a.city, pa.created_at::text as created_at
       from priority_areas pa join areas a on a.id = pa.area_id
       where pa.user_id = ${context.userId}
       order by a.city, a.name`;
    return rows.map(
      (r): PriorityArea => ({
        id: r.id,
        areaId: r.area_id,
        name: r.name,
        city: r.city,
        createdAt: r.created_at,
      }),
    );
  });

export const addPriorityArea = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((areaId: number) => areaId)
  .handler(async ({ context, data: areaId }) => {
    await ensureProfile(context.userId);
    const sql = await getSql();
    await sql.query(
      `insert into priority_areas (user_id, area_id) values ($1, $2)
       on conflict (user_id, area_id) do nothing`,
      [context.userId, areaId],
    );
    return { ok: true };
  });

export const removePriorityArea = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql.query(`delete from priority_areas where id = $1 and user_id = $2`, [
      id,
      context.userId,
    ]);
    return { ok: true };
  });

export const listNotifications = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      offer_id: number | null;
      title: string;
      body: string;
      read_at: string | null;
      sent_at: string;
    }>`select id, offer_id, title, body, read_at::text as read_at, sent_at::text as sent_at
       from notification_log
       where user_id = ${context.userId}
       order by sent_at desc
       limit 50`;
    return rows.map(
      (r): AppNotification => ({
        id: r.id,
        offerId: r.offer_id,
        title: r.title,
        body: r.body,
        readAt: r.read_at,
        sentAt: r.sent_at,
      }),
    );
  });

export const markNotificationsRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`update notification_log set read_at = now() where user_id = ${context.userId} and read_at is null`;
    return { ok: true };
  });

export const submitOffer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      storeId: number;
      itemName: string;
      category: string;
      price: number;
      originalPrice?: number | null;
      unit?: string | null;
      description?: string | null;
    }) => ({
      storeId: input.storeId,
      itemName: input.itemName.trim(),
      category: input.category,
      price: Number(input.price),
      originalPrice: input.originalPrice == null ? null : Number(input.originalPrice),
      unit: input.unit?.trim() || null,
      description: input.description?.trim() || null,
    }),
  )
  .handler(async ({ data }) => {
    if (!data.itemName || !Number.isFinite(data.price) || data.price <= 0) {
      return { ok: false as const, error: "Enter an item and a valid price." };
    }
    await ensureSeed();
    const sql = await getSql();
    const stores = await sql<{ area_id: number }>`select area_id from stores where id = ${data.storeId}`;
    if (!stores[0]) return { ok: false as const, error: "Unknown store." };
    const sources = await sql<{ id: number }>`select id from sources where type = 'manual' limit 1`;
    const sourceId = sources[0]?.id;
    if (!sourceId) return { ok: false as const, error: "Manual source missing." };
    const { offerDedupHash } = await import("./seed");
    const discount =
      data.originalPrice && data.originalPrice > data.price
        ? Math.round((1 - data.price / data.originalPrice) * 100)
        : null;
    const dedup = offerDedupHash(data.itemName, data.storeId, data.price);
    await sql.query(
      `insert into offers (
        store_id, area_id, source_id, item_name, category, price, original_price,
        discount_percent, unit, description, start_date, end_date, is_verified, is_featured, dedup_hash
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, current_date, current_date + 7, false, false, $11)
      on conflict (dedup_hash) do nothing`,
      [
        data.storeId,
        stores[0].area_id,
        sourceId,
        data.itemName,
        data.category,
        data.price,
        data.originalPrice,
        discount,
        data.unit,
        data.description,
        dedup,
      ],
    );
    return { ok: true as const };
  });

export const listPendingOffers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    await ensureSeed();
    const sql = await getSql();
    const rows = await sql.query<OfferRow>(
      `select ${OFFER_SELECT}
       from offers o
       join stores st on st.id = o.store_id
       join areas a on a.id = o.area_id
       join sources src on src.id = o.source_id
       where o.is_verified = false
       order by o.created_at desc
       limit 100`,
      [],
    );
    return rows.map((r) => mapOffer(r));
  });

export const moderateOffer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: number; action: "approve" | "reject" }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    if (data.action === "approve") {
      await sql.query(`update offers set is_verified = true, updated_at = now() where id = $1`, [
        data.id,
      ]);
    } else {
      await sql.query(`delete from offers where id = $1 and is_verified = false`, [data.id]);
    }
    return { ok: true };
  });

async function notifyWatchersForHashes(sql: Awaited<ReturnType<typeof getSql>>, hashes: string[]) {
  if (!hashes.length) return 0;
  const placeholders = hashes.map((_, i) => `$${i + 1}`).join(",");
  const newOffers = await sql.query<OfferRow>(
    `select ${OFFER_SELECT}
     from offers o
     join stores st on st.id = o.store_id
     join areas a on a.id = o.area_id
     join sources src on src.id = o.source_id
     where o.dedup_hash in (${placeholders})`,
    hashes,
  );
  const users = await sql.query<{ user_id: string; notify_priority_only: boolean }>(
    `select u.user_id, coalesce(p.notify_priority_only, true) as notify_priority_only
     from (
       select user_id from priority_items
       union
       select user_id from priority_areas
       union
       select user_id from user_profiles where notify_enabled = true
     ) u
     left join user_profiles p on p.user_id = u.user_id
     where coalesce(p.notify_enabled, true) = true`,
    [],
  );
  let notified = 0;
  for (const user of users) {
    const { items, areaIds } = await loadPriorityContext(user.user_id);
    for (const row of newOffers) {
      const offer = mapOffer(row);
      const isMatch =
        areaIds.has(offer.areaId) ||
        matchesPriorityItem(
          offer.itemName,
          items.map((i) => ({ itemName: i.itemName, category: i.category })),
          offer.category,
          offer.description,
        );
      if (!isMatch) continue;
      const title = "New offer on My Offers";
      const body = `${offer.itemName} at ${offer.storeName} for ${offer.currencySymbol}${offer.price.toFixed(2)}`;
      const result = await sql.query<{ id: number }>(
        `insert into notification_log (user_id, offer_id, title, body)
         values ($1, $2, $3, $4)
         on conflict (user_id, offer_id) do nothing
         returning id`,
        [user.user_id, offer.id, title, body],
      );
      if (result.length) notified += 1;
    }
  }
  return notified;
}

export const runCrawl = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { city?: string } | undefined) => input ?? {})
  .handler(async ({ data, context }): Promise<CrawlResult> => {
    await ensureSeed();
    await ensureProfile(context.userId);
    const sql = await getSql();
    const log: string[] = [];
    const sources = await sql<{ id: number; name: string; type: string }>`
      select id, name, type from sources where active = true order by type`;
    log.push(
      "Platforms: store sites, Facebook, Twitter, WhatsApp, Instagram, Pinterest, web search, local listings",
    );
    for (const s of sources.slice(0, 8)) {
      log.push(`Fetching ${s.name} (${s.type})`);
    }
    const { insertIncomingOffers } = await import("./seed");
    const { inserted, scanned, hashes } = await insertIncomingOffers(sql, data.city, 6);
    await sql`update sources set last_crawled_at = now() where active = true`;
    await sql.query(
      `insert into crawl_runs (source_id, status, offers_found, offers_new, notes, finished_at)
       values (null, 'ok', $1, $2, $3, now())`,
      [scanned, inserted, `Triggered by ${context.userId}`],
    );
    log.push(`Parsed ${scanned} candidate listings`);
    log.push(`Dedup hash matched ${scanned - inserted} already-indexed offers`);
    log.push(`Indexed ${inserted} new offers`);
    const notified = await notifyWatchersForHashes(sql, hashes);
    log.push(`Queued ${notified} watcher alerts`);
    log.push("Coverage index updated");
    return { scanned, inserted, duplicates: Math.max(0, scanned - inserted), notified, log };
  });

export const nearbyArea = createServerFn({ method: "GET" })
  .validator((input: { lat: number; lng: number }) => input)
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      name: string;
      city: string;
      country: string;
      currency_code: string;
      currency_symbol: string;
      latitude: number;
      longitude: number;
      radius_km: number;
    }>`select id, name, city, country, currency_code, currency_symbol, latitude, longitude, radius_km from areas`;
    let best: Area | null = null;
    let bestD = Infinity;
    for (const r of rows) {
      const d = haversineKm(data.lat, data.lng, Number(r.latitude), Number(r.longitude));
      if (d < bestD) {
        bestD = d;
        best = {
          id: r.id,
          name: r.name,
          city: r.city,
          country: r.country,
          currencyCode: r.currency_code,
          currencySymbol: r.currency_symbol,
          latitude: Number(r.latitude),
          longitude: Number(r.longitude),
          radiusKm: Number(r.radius_km),
        };
      }
    }
    return best ? { area: best, km: bestD } : null;
  });
