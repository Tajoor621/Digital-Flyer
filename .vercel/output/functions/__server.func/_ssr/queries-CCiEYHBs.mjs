import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { c as getSql, l as haversineKm, t as authMiddleware } from "./utils-DL0OCngi.mjs";
import { c as offerMatchesQuery, d as stapleRank, s as matchesPriorityItem } from "./format-CLSKePSg.mjs";
import { a as isBargainQuery, c as localChainRank, n as chainLike, r as chainMatches } from "./local-markets-ciOB0wuY.mjs";
import { createHash } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-CCiEYHBs.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var PAGES = [
	{
		url: "https://rozdaam.com/en/karachi/vegetables",
		sourceId: 31,
		page: "vegetables"
	},
	{
		url: "https://rozdaam.com/en/karachi/fruits",
		sourceId: 34,
		page: "fruits"
	},
	{
		url: "https://rozdaam.com/en/karachi/poultry",
		sourceId: 32,
		page: "poultry"
	},
	{
		url: "https://rozdaam.com/en/karachi/meat",
		sourceId: 33,
		page: "meat"
	}
];
var ALIAS = {
	"bottle gourd round": "lauki round",
	"bitter gourd grade 1": "karela grade 1",
	"garlic whole desi grade 1": "garlic desi grade 1",
	"coriander bunch": "coriander",
	"peas classic": "peas",
	"green chilli": "green chilli",
	"ginger unwashed grade 1 (china)": "ginger"
};
var syncedAt = 0;
var inflight = null;
var TTL_MS = 12e5;
function norm(s) {
	return s.trim().toLowerCase().replace(/\s+/g, " ");
}
function categoryFor(page, name) {
	if (/egg/i.test(name)) return "dairy";
	if (page === "meat" || page === "poultry") return "meat";
	return "produce";
}
function unitFor(raw) {
	const u = raw.toLowerCase();
	if (u.startsWith("dozen")) return "dozen";
	if (u.startsWith("bunch") || u.startsWith("gaddi")) return "bunch";
	return "1kg";
}
/** Pull item, unit, and bazaar price out of Rozdaam's rendered page. */
function parseRozdaam(html, page, sourceId, pageUrl) {
	const flat = html.replace(/\\"/g, "\"").replace(/\\n/g, " ");
	const date = flat.match(/"date":"(20\d\d-\d\d-\d\d)/)?.[1] ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const re = /\/en\/karachi\/(?:vegetables|fruits|meat|poultry)\/([a-z0-9-]+)","className":"font-semibold[^"]*","children":"([^"]+)"[\s\S]{0,900}?"children":"(Kg|Dozen|Bunch|Piece|Pc|Gaddi)"[\s\S]{0,700}?"children":"Rs ([0-9,]+)"(?:[\s\S]{0,400}?"children":"(Rs [0-9,]+|—)")?/g;
	const rows = [];
	const seen = /* @__PURE__ */ new Set();
	for (const m of flat.matchAll(re)) {
		const slug = m[1];
		if (!slug || seen.has(slug)) continue;
		seen.add(slug);
		const retail = Number(m[4].replace(/,/g, ""));
		if (!Number.isFinite(retail) || retail <= 0) continue;
		const mandiRaw = m[5] ?? "";
		const mandi = mandiRaw.startsWith("Rs") ? Number(mandiRaw.replace(/[^\d.]/g, "")) : null;
		rows.push({
			name: m[2].replace(/\s+/g, " ").trim(),
			slug,
			page,
			unit: unitFor(m[3]),
			retail,
			mandi: mandi && Number.isFinite(mandi) ? mandi : null,
			sourceId,
			url: `https://rozdaam.com/en/karachi/${page}/${slug}`,
			date
		});
	}
	if (rows.length === 0) {}
	return rows;
}
async function fetchPage(url) {
	const res = await fetch(url, {
		headers: {
			"user-agent": "MyOffers/1.0 (karachi rate board)",
			accept: "text/html"
		},
		signal: AbortSignal.timeout(8e3)
	});
	if (!res.ok) throw new Error(`${url} ${res.status}`);
	return res.text();
}
function describe(row, low, high) {
	const versus = high != null ? ` Bachat / mandi Rs ${low}. Notified retail Rs ${high}.` : ` Notified retail Rs ${low}.`;
	return `Official Karachi list ${row.date}.${versus} Sabzi mandi, general store, and super store rate for Pakistani and Pathan kitchens. A chain shelf can be higher. Source Rozdaam.`;
}
function priced(row) {
	const low = row.mandi != null && row.mandi > 0 && row.mandi < row.retail ? row.mandi : row.retail;
	const high = low < row.retail ? row.retail : null;
	return {
		low,
		high,
		discount: high != null ? Math.round((1 - low / high) * 100) : null
	};
}
/**
* Refresh store 43 from today's Rozdaam board. Stale copied rows are unverified
* once a full board arrives, so the feed does not keep yesterday's number beside today's.
*/
async function syncOfficialKarachiRates(sql) {
	if (Date.now() - syncedAt < TTL_MS) return;
	if (inflight) return inflight;
	inflight = (async () => {
		const live = [];
		for (const page of PAGES) try {
			const html = await fetchPage(page.url);
			live.push(...parseRozdaam(html, page.page, page.sourceId, page.url));
		} catch {}
		if (live.length < 8) return;
		const existing = await sql.query(`select id, item_name, source_id from offers where store_id = 43 and source_id in (31, 32, 33, 34)`);
		const byName = new Map(existing.map((r) => [norm(r.item_name), r]));
		const touched = /* @__PURE__ */ new Set();
		for (const row of live) {
			const key = ALIAS[norm(row.name)] ?? norm(row.name);
			const found = byName.get(key) ?? byName.get(norm(row.name));
			const quote = priced(row);
			const description = describe(row, quote.low, quote.high);
			const category = categoryFor(row.page, row.name);
			if (found) {
				touched.add(found.id);
				await sql.query(`update offers set price = $1, original_price = $2, discount_percent = $3, description = $4, source_url = $5, unit = $6, category = $7,
             is_verified = true, updated_at = now(), end_date = current_date + 1
           where id = $8`, [
					quote.low,
					quote.high,
					quote.discount,
					description,
					row.url,
					row.unit,
					category,
					found.id
				]);
				continue;
			}
			const dedup = createHash("sha256").update(`${norm(row.name)}|43|${quote.low.toFixed(2)}`).digest("hex");
			const inserted = await sql.query(`insert into offers (
          store_id, area_id, source_id, item_name, category, price, original_price,
          discount_percent, unit, description, source_url, start_date, end_date,
          is_verified, is_featured, dedup_hash, created_at, updated_at
        ) values (
          43, 13, $1, $2, $3, $4, $5, $6, $7, $8, $9, current_date, current_date + 1,
          true, false, $10, now(), now()
        ) on conflict (dedup_hash) do update set
          price = excluded.price,
          original_price = excluded.original_price,
          discount_percent = excluded.discount_percent,
          description = excluded.description,
          source_url = excluded.source_url,
          is_verified = true,
          updated_at = now()
        returning id`, [
				row.sourceId,
				row.name,
				category,
				quote.low,
				quote.high,
				quote.discount,
				row.unit,
				description,
				row.url,
				dedup
			]);
			if (inserted[0]) touched.add(inserted[0].id);
		}
		if (touched.size >= 8) {
			const ids = [...touched];
			const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
			await sql.query(`update offers set is_verified = false, updated_at = now()
         where store_id = 43 and source_id in (31, 32, 33, 34) and id not in (${placeholders})`, ids);
		}
		syncedAt = Date.now();
	})().catch(() => {
		syncedAt = Date.now() - TTL_MS + 6e4;
	}).finally(() => {
		inflight = null;
	});
	return inflight;
}
var OFFER_SELECT = `
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
var seedChain = null;
var CATALOG_REV = 16;
var seedRev = 0;
async function ensureSeed() {
	if (seedRev !== CATALOG_REV) {
		seedChain = null;
		seedRev = CATALOG_REV;
	}
	if (!seedChain) seedChain = (async () => {
		const { seedCatalog } = await import("./seed-C-eEFuW8.mjs");
		await seedCatalog(await getSql());
	})().catch((err) => {
		seedChain = null;
		throw err;
	});
	return seedChain;
}
function mapOffer(row, origin, priority = false) {
	let distanceKm = null;
	if (origin && row.store_lat != null && row.store_lng != null && Number.isFinite(row.store_lat) && Number.isFinite(row.store_lng)) distanceKm = haversineKm(origin.lat, origin.lng, row.store_lat, row.store_lng);
	return {
		id: row.id,
		itemName: row.item_name,
		category: row.category,
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
		sourceType: row.source_type,
		distanceKm,
		isPriority: priority
	};
}
function sortOffers(list, sort, preferAreaId) {
	const copy = [...list];
	const byDistance = (a, b) => {
		if (a.distanceKm == null && b.distanceKm == null) return 0;
		if (a.distanceKm == null) return 1;
		if (b.distanceKm == null) return -1;
		return a.distanceKm - b.distanceKm;
	};
	const byArea = (a, b) => {
		if (!preferAreaId) return 0;
		return Number(b.areaId === preferAreaId) - Number(a.areaId === preferAreaId);
	};
	const byStaple = (a, b) => stapleRank(a.itemName, a.description, a.category) - stapleRank(b.itemName, b.description, b.category);
	copy.sort((a, b) => {
		const area = byArea(a, b);
		if (area !== 0) return area;
		if (sort === "discount") {
			const cut = (b.discountPercent ?? 0) - (a.discountPercent ?? 0);
			if (cut !== 0) return cut;
		} else if (sort === "price") {
			const shelf = (o) => o.unit === "portal" || o.price <= 0 ? Number.POSITIVE_INFINITY : o.price;
			const price = shelf(a) - shelf(b);
			if (price !== 0) return price;
		} else if (sort === "ending") {
			const end = (a.endDate ?? "9999").localeCompare(b.endDate ?? "9999");
			if (end !== 0) return end;
		} else if (sort === "recent") {
			const recent = b.createdAt.localeCompare(a.createdAt);
			if (recent !== 0) return recent;
		} else {
			const near = (o) => o.distanceKm != null && o.distanceKm <= 2;
			if (near(a) && near(b)) {
				const rank = localChainRank(a.storeChain) - localChainRank(b.storeChain);
				if (rank !== 0) return rank;
				const shelf = (o) => o.unit === "portal" || o.price <= 0 ? Number.POSITIVE_INFINITY : o.price;
				if (Math.abs((a.distanceKm ?? 0) - (b.distanceKm ?? 0)) <= .35) {
					const cheap = shelf(a) - shelf(b);
					if (cheap !== 0) return cheap;
				}
			}
			if (a.distanceKm != null && b.distanceKm != null) {
				if (Math.abs(a.distanceKm - b.distanceKm) > .35) return byDistance(a, b);
			} else if (byDistance(a, b) !== 0) return byDistance(a, b);
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
var listAreas_createServerFn_handler = createServerRpc({
	id: "55c0425331b0e59deb40179c7bb803b82e290e3aa516ce6ef00f12d6e5cd0a5c",
	name: "listAreas",
	filename: "src/lib/offers/queries.ts"
}, (opts) => listAreas.__executeServer(opts));
var listAreas = createServerFn({ method: "GET" }).handler(listAreas_createServerFn_handler, async () => {
	await ensureSeed();
	return (await (await getSql())`select id, name, city, country, currency_code, currency_symbol, latitude, longitude, radius_km from areas order by country, city, name`).map((r) => ({
		id: r.id,
		name: r.name,
		city: r.city,
		country: r.country,
		currencyCode: r.currency_code,
		currencySymbol: r.currency_symbol,
		latitude: Number(r.latitude),
		longitude: Number(r.longitude),
		radiusKm: Number(r.radius_km)
	}));
});
var listStores_createServerFn_handler = createServerRpc({
	id: "c53c2e4af1d701ee7209be32ff67e8991bcc7da7becb68a7f3dbcb7b335d0923",
	name: "listStores",
	filename: "src/lib/offers/queries.ts"
}, (opts) => listStores.__executeServer(opts));
var listStores = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(listStores_createServerFn_handler, async ({ data }) => {
	await ensureSeed();
	const sql = await getSql();
	const params = [];
	const where = ["1=1"];
	if (data.areaId) {
		params.push(data.areaId);
		where.push(`st.area_id = $${params.length}`);
	}
	if (data.city) {
		params.push(data.city);
		where.push(`a.city = $${params.length}`);
	}
	return (await sql.query(`select st.id, st.name, st.chain, st.address, st.latitude, st.longitude, st.area_id, st.website
       from stores st join areas a on a.id = st.area_id
       where ${where.join(" and ")}
       order by st.chain, st.name`, params)).map((r) => ({
		id: r.id,
		name: r.name,
		chain: r.chain,
		address: r.address,
		latitude: r.latitude == null ? null : Number(r.latitude),
		longitude: r.longitude == null ? null : Number(r.longitude),
		areaId: r.area_id,
		website: r.website
	}));
});
var listSources_createServerFn_handler = createServerRpc({
	id: "26e6e750320506f942112d31b2b28c99572355a6e6f953dbc4a12e206007fb16",
	name: "listSources",
	filename: "src/lib/offers/queries.ts"
}, (opts) => listSources.__executeServer(opts));
var listSources = createServerFn({ method: "GET" }).handler(listSources_createServerFn_handler, async () => {
	await ensureSeed();
	return (await (await getSql())`select id, name, type, base_url, area_id, crawl_frequency_minutes, last_crawled_at::text as last_crawled_at, active from sources order by type, name`).map((r) => ({
		id: r.id,
		name: r.name,
		type: r.type,
		baseUrl: r.base_url,
		areaId: r.area_id,
		crawlFrequencyMinutes: r.crawl_frequency_minutes,
		lastCrawledAt: r.last_crawled_at,
		active: Boolean(r.active)
	}));
});
var getCoverage_createServerFn_handler = createServerRpc({
	id: "cd79699c80efd44b7f6feb0b56238be9e044750453b15c77932c88bc06b1ace4",
	name: "getCoverage",
	filename: "src/lib/offers/queries.ts"
}, (opts) => getCoverage.__executeServer(opts));
var getCoverage = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(getCoverage_createServerFn_handler, async ({ data }) => {
	await ensureSeed();
	const sql = await getSql();
	const sources = await sql`
      select count(*)::int as c,
             count(*) filter (where active)::int as active,
             max(last_crawled_at)::text as last
      from sources`;
	const offerParams = [];
	let offerWhere = "1=1";
	if (data.city) {
		offerParams.push(data.city);
		offerWhere = `a.city = $1`;
	}
	const offers = await sql.query(`select count(*)::int as c,
              count(*) filter (where not o.is_verified)::int as pending
       from offers o join areas a on a.id = o.area_id
       where ${offerWhere}`, offerParams);
	return {
		sourceCount: sources[0]?.c ?? 0,
		activeSources: sources[0]?.active ?? 0,
		offerCount: offers[0]?.c ?? 0,
		lastCrawledAt: sources[0]?.last ?? null,
		pendingReview: offers[0]?.pending ?? 0
	};
});
async function ensureProfile(userId) {
	await (await getSql()).query(`insert into user_profiles (user_id) values ($1) on conflict (user_id) do nothing`, [userId]);
}
async function loadPriorityContext(userId) {
	const sql = await getSql();
	const items = await sql`select id, item_name, category, created_at::text as created_at from priority_items where user_id = ${userId} order by created_at desc`;
	const areas = await sql`select area_id from priority_areas where user_id = ${userId}`;
	return {
		items: items.map((r) => ({
			id: r.id,
			itemName: r.item_name,
			category: r.category,
			createdAt: r.created_at
		})),
		areaIds: new Set(areas.map((a) => a.area_id))
	};
}
function applyPriority(offers, items, areaIds) {
	return offers.map((o) => ({
		...o,
		isPriority: areaIds.has(o.areaId) || matchesPriorityItem(o.itemName, items.map((i) => ({
			itemName: i.itemName,
			category: i.category
		})), o.category, o.description)
	}));
}
var listOffers_createServerFn_handler = createServerRpc({
	id: "ec50814d981802ce9dcf85e2ee244e8f672ab725c4779921a326d7208d3260f7",
	name: "listOffers",
	filename: "src/lib/offers/queries.ts"
}, (opts) => listOffers.__executeServer(opts));
var listOffers = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(listOffers_createServerFn_handler, async ({ data }) => {
	await ensureSeed();
	const sql = await getSql();
	if (!data.city || data.city === "Karachi") await Promise.race([syncOfficialKarachiRates(sql), new Promise((resolve) => setTimeout(resolve, 3500))]);
	const params = [];
	const where = ["1=1"];
	const bargain = isBargainQuery(data.search);
	const chain = bargain ? null : chainLike(data.search);
	if (!data.includeUnverified && data.verifiedOnly !== false) where.push("o.is_verified = true");
	where.push("(o.end_date is null or o.end_date >= current_date)");
	if (chain) {
		params.push(`%${chain}%`);
		where.push(`(st.chain ilike $${params.length} or st.name ilike $${params.length})`);
	} else if (data.city) {
		params.push(data.city);
		const cityIdx = params.length;
		if (data.originLat != null && data.originLng != null) {
			params.push(data.originLat, data.originLng);
			where.push(`(a.city = $${cityIdx} or (abs(st.latitude - $${cityIdx + 1}) < 0.22 and abs(st.longitude - $${cityIdx + 2}) < 0.22))`);
		} else where.push(`a.city = $${cityIdx}`);
	} else if (data.areaId) {
		params.push(data.areaId);
		where.push(`o.area_id = $${params.length}`);
	}
	if (data.search && data.search.trim()) {}
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
	const rows = await sql.query(`select ${OFFER_SELECT}
       from offers o
       join stores st on st.id = o.store_id
       join areas a on a.id = o.area_id
       join sources src on src.id = o.source_id
       where ${where.join(" and ")}
       order by o.created_at desc
       limit 500`, params);
	const origin = data.originLat != null && data.originLng != null ? {
		lat: data.originLat,
		lng: data.originLng
	} : null;
	let offers = rows.map((r) => mapOffer(r, origin));
	if (data.search && data.search.trim() && !bargain) {
		const q = data.search.trim();
		offers = offers.filter((o) => offerMatchesQuery(o.itemName, o.description, o.category, q) || chainMatches(o.storeChain, o.storeName, q));
	}
	if (bargain) offers = offers.filter((o) => localChainRank(o.storeChain) === 0);
	if (data.maxKm != null) offers = offers.filter((o) => o.distanceKm == null || o.distanceKm <= data.maxKm);
	const sort = bargain && (!data.sort || data.sort === "nearby") ? "price" : data.sort ?? (origin ? "nearby" : "recent");
	return sortOffers(offers, sort, data.areaId);
});
var listOffersPersonalized_createServerFn_handler = createServerRpc({
	id: "b9768476fb09f1b330c91949715b86033383e4b4f7fcdfecbf558f44ecccaf4d",
	name: "listOffersPersonalized",
	filename: "src/lib/offers/queries.ts"
}, (opts) => listOffersPersonalized.__executeServer(opts));
var listOffersPersonalized = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => input ?? {}).handler(listOffersPersonalized_createServerFn_handler, async ({ data, context }) => {
	const offers = await listOffers({ data });
	const { items, areaIds } = await loadPriorityContext(context.userId);
	return sortOffers(applyPriority(offers, items, areaIds), data.sort ?? "nearby", data.areaId);
});
var getOffer_createServerFn_handler = createServerRpc({
	id: "1e812c11b11b075d8d5227180f5668395764cc60e48197458cb00c217b48795f",
	name: "getOffer",
	filename: "src/lib/offers/queries.ts"
}, (opts) => getOffer.__executeServer(opts));
var getOffer = createServerFn({ method: "GET" }).validator((id) => id).handler(getOffer_createServerFn_handler, async ({ data: id }) => {
	await ensureSeed();
	const rows = await (await getSql()).query(`select ${OFFER_SELECT}
       from offers o
       join stores st on st.id = o.store_id
       join areas a on a.id = o.area_id
       join sources src on src.id = o.source_id
       where o.id = $1`, [id]);
	return rows[0] ? mapOffer(rows[0]) : null;
});
var getOfferPersonalized_createServerFn_handler = createServerRpc({
	id: "60c5d405ab0b77dcce7f70c253aa0b82dc6036fe989721cb5d2c2a4020a8d117",
	name: "getOfferPersonalized",
	filename: "src/lib/offers/queries.ts"
}, (opts) => getOfferPersonalized.__executeServer(opts));
var getOfferPersonalized = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getOfferPersonalized_createServerFn_handler, async ({ data: id, context }) => {
	const offer = await getOffer({ data: id });
	if (!offer) return null;
	const { items, areaIds } = await loadPriorityContext(context.userId);
	return applyPriority([offer], items, areaIds)[0];
});
var getProfile_createServerFn_handler = createServerRpc({
	id: "84908c73252a1f731a5e5e474fd845e136aaafee53e254bf73989314ee38df71",
	name: "getProfile",
	filename: "src/lib/offers/queries.ts"
}, (opts) => getProfile.__executeServer(opts));
var getProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getProfile_createServerFn_handler, async ({ context }) => {
	await ensureSeed();
	const rows = await (await getSql())`select user_id, area_id, city, notify_enabled, notify_priority_only from user_profiles where user_id = ${context.userId}`;
	if (!rows[0]) return {
		userId: context.userId,
		areaId: null,
		city: null,
		notifyEnabled: true,
		notifyPriorityOnly: true
	};
	const r = rows[0];
	return {
		userId: r.user_id,
		areaId: r.area_id,
		city: r.city,
		notifyEnabled: Boolean(r.notify_enabled),
		notifyPriorityOnly: Boolean(r.notify_priority_only)
	};
});
var saveProfile_createServerFn_handler = createServerRpc({
	id: "6ede440a5854679fc926071b75962a975ae89f2997e03c77eb4ac5774e989b0a",
	name: "saveProfile",
	filename: "src/lib/offers/queries.ts"
}, (opts) => saveProfile.__executeServer(opts));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveProfile_createServerFn_handler, async ({ context, data }) => {
	await (await getSql()).query(`insert into user_profiles (user_id, area_id, city, notify_enabled, notify_priority_only, updated_at)
       values ($1, $2, $3, coalesce($4, true), coalesce($5, true), now())
       on conflict (user_id) do update set
         area_id = coalesce($2, user_profiles.area_id),
         city = coalesce($3, user_profiles.city),
         notify_enabled = coalesce($4, user_profiles.notify_enabled),
         notify_priority_only = coalesce($5, user_profiles.notify_priority_only),
         updated_at = now()`, [
		context.userId,
		data.areaId === void 0 ? null : data.areaId,
		data.city === void 0 ? null : data.city,
		data.notifyEnabled ?? null,
		data.notifyPriorityOnly ?? null
	]);
	return { ok: true };
});
var listPriorityItems_createServerFn_handler = createServerRpc({
	id: "6cecfaa23114f8666db3e0da78e54a38d46290b10b01fbc7b6d96dd9939483f1",
	name: "listPriorityItems",
	filename: "src/lib/offers/queries.ts"
}, (opts) => listPriorityItems.__executeServer(opts));
var listPriorityItems = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPriorityItems_createServerFn_handler, async ({ context }) => {
	const { items } = await loadPriorityContext(context.userId);
	return items;
});
var addPriorityItem_createServerFn_handler = createServerRpc({
	id: "035ed538baf268321ead3f9480965b2cf471952783174f62b2fa8079173a9268",
	name: "addPriorityItem",
	filename: "src/lib/offers/queries.ts"
}, (opts) => addPriorityItem.__executeServer(opts));
var addPriorityItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	itemName: input.itemName.trim(),
	category: input.category ?? null
})).handler(addPriorityItem_createServerFn_handler, async ({ context, data }) => {
	if (!data.itemName) return { ok: false };
	await ensureProfile(context.userId);
	await (await getSql()).query(`insert into priority_items (user_id, item_name, category)
       values ($1, $2, $3)
       on conflict (user_id, item_name) do nothing`, [
		context.userId,
		data.itemName,
		data.category
	]);
	return { ok: true };
});
var removePriorityItem_createServerFn_handler = createServerRpc({
	id: "83417b7e3040c883516e455ef42d397e34ca71025b221bfa322df42c50d61975",
	name: "removePriorityItem",
	filename: "src/lib/offers/queries.ts"
}, (opts) => removePriorityItem.__executeServer(opts));
var removePriorityItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(removePriorityItem_createServerFn_handler, async ({ context, data: id }) => {
	await (await getSql()).query(`delete from priority_items where id = $1 and user_id = $2`, [id, context.userId]);
	return { ok: true };
});
var listPriorityAreas_createServerFn_handler = createServerRpc({
	id: "fca7e156ee066ea68acfa36530dbb6461c55bdba3e6abf2719af559e6f179537",
	name: "listPriorityAreas",
	filename: "src/lib/offers/queries.ts"
}, (opts) => listPriorityAreas.__executeServer(opts));
var listPriorityAreas = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPriorityAreas_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`select pa.id, pa.area_id, a.name, a.city, pa.created_at::text as created_at
       from priority_areas pa join areas a on a.id = pa.area_id
       where pa.user_id = ${context.userId}
       order by a.city, a.name`).map((r) => ({
		id: r.id,
		areaId: r.area_id,
		name: r.name,
		city: r.city,
		createdAt: r.created_at
	}));
});
var addPriorityArea_createServerFn_handler = createServerRpc({
	id: "045d327abea08393edfa369958b4c80c1185cfc98b6a813ed5ed9f3cc7c3a622",
	name: "addPriorityArea",
	filename: "src/lib/offers/queries.ts"
}, (opts) => addPriorityArea.__executeServer(opts));
var addPriorityArea = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((areaId) => areaId).handler(addPriorityArea_createServerFn_handler, async ({ context, data: areaId }) => {
	await ensureProfile(context.userId);
	await (await getSql()).query(`insert into priority_areas (user_id, area_id) values ($1, $2)
       on conflict (user_id, area_id) do nothing`, [context.userId, areaId]);
	return { ok: true };
});
var removePriorityArea_createServerFn_handler = createServerRpc({
	id: "5737bfb335e6ec7b4d6590d840ce577070a94a47f78740b9eaaacc1c9c25b7d6",
	name: "removePriorityArea",
	filename: "src/lib/offers/queries.ts"
}, (opts) => removePriorityArea.__executeServer(opts));
var removePriorityArea = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(removePriorityArea_createServerFn_handler, async ({ context, data: id }) => {
	await (await getSql()).query(`delete from priority_areas where id = $1 and user_id = $2`, [id, context.userId]);
	return { ok: true };
});
var listNotifications_createServerFn_handler = createServerRpc({
	id: "db4ff0ec55d649d10958998f804152c712672ae06de777473667eee4eb326c77",
	name: "listNotifications",
	filename: "src/lib/offers/queries.ts"
}, (opts) => listNotifications.__executeServer(opts));
var listNotifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listNotifications_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`select id, offer_id, title, body, read_at::text as read_at, sent_at::text as sent_at
       from notification_log
       where user_id = ${context.userId}
       order by sent_at desc
       limit 50`).map((r) => ({
		id: r.id,
		offerId: r.offer_id,
		title: r.title,
		body: r.body,
		readAt: r.read_at,
		sentAt: r.sent_at
	}));
});
var markNotificationsRead_createServerFn_handler = createServerRpc({
	id: "782e37afb6ba635413a35bb4d116bee22ce2da0c48d51c47e4b1bfb2a588bcba",
	name: "markNotificationsRead",
	filename: "src/lib/offers/queries.ts"
}, (opts) => markNotificationsRead.__executeServer(opts));
var markNotificationsRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(markNotificationsRead_createServerFn_handler, async ({ context }) => {
	await (await getSql())`update notification_log set read_at = now() where user_id = ${context.userId} and read_at is null`;
	return { ok: true };
});
var submitOffer_createServerFn_handler = createServerRpc({
	id: "ebe7002a25e04bc4fd9619fe6df444cefbb6d9751ffac8778f37cce758b667ec",
	name: "submitOffer",
	filename: "src/lib/offers/queries.ts"
}, (opts) => submitOffer.__executeServer(opts));
var submitOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	storeId: input.storeId,
	itemName: input.itemName.trim(),
	category: input.category,
	price: Number(input.price),
	originalPrice: input.originalPrice == null ? null : Number(input.originalPrice),
	unit: input.unit?.trim() || null,
	description: input.description?.trim() || null
})).handler(submitOffer_createServerFn_handler, async ({ data }) => {
	if (!data.itemName || !Number.isFinite(data.price) || data.price <= 0) return {
		ok: false,
		error: "Enter an item and a valid price."
	};
	await ensureSeed();
	const sql = await getSql();
	const stores = await sql`select area_id from stores where id = ${data.storeId}`;
	if (!stores[0]) return {
		ok: false,
		error: "Unknown store."
	};
	const sourceId = (await sql`select id from sources where type = 'manual' limit 1`)[0]?.id;
	if (!sourceId) return {
		ok: false,
		error: "Manual source missing."
	};
	const { offerDedupHash } = await import("./seed-C-eEFuW8.mjs");
	const discount = data.originalPrice && data.originalPrice > data.price ? Math.round((1 - data.price / data.originalPrice) * 100) : null;
	const dedup = offerDedupHash(data.itemName, data.storeId, data.price);
	await sql.query(`insert into offers (
        store_id, area_id, source_id, item_name, category, price, original_price,
        discount_percent, unit, description, start_date, end_date, is_verified, is_featured, dedup_hash
      ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, current_date, current_date + 7, false, false, $11)
      on conflict (dedup_hash) do nothing`, [
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
		dedup
	]);
	return { ok: true };
});
var listPendingOffers_createServerFn_handler = createServerRpc({
	id: "10b5a1975e47b06e1730b7bb43f054690d0cc96e0dcf96ce6dba26a81d615943",
	name: "listPendingOffers",
	filename: "src/lib/offers/queries.ts"
}, (opts) => listPendingOffers.__executeServer(opts));
var listPendingOffers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPendingOffers_createServerFn_handler, async () => {
	await ensureSeed();
	return (await (await getSql()).query(`select ${OFFER_SELECT}
       from offers o
       join stores st on st.id = o.store_id
       join areas a on a.id = o.area_id
       join sources src on src.id = o.source_id
       where o.is_verified = false
       order by o.created_at desc
       limit 100`, [])).map((r) => mapOffer(r));
});
var moderateOffer_createServerFn_handler = createServerRpc({
	id: "84797d44524860b091e52443f69b25c1789e125eb72706714abe4427de2e7882",
	name: "moderateOffer",
	filename: "src/lib/offers/queries.ts"
}, (opts) => moderateOffer.__executeServer(opts));
var moderateOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(moderateOffer_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	if (data.action === "approve") await sql.query(`update offers set is_verified = true, updated_at = now() where id = $1`, [data.id]);
	else await sql.query(`delete from offers where id = $1 and is_verified = false`, [data.id]);
	return { ok: true };
});
async function notifyWatchersForHashes(sql, hashes) {
	if (!hashes.length) return 0;
	const placeholders = hashes.map((_, i) => `$${i + 1}`).join(",");
	const newOffers = await sql.query(`select ${OFFER_SELECT}
     from offers o
     join stores st on st.id = o.store_id
     join areas a on a.id = o.area_id
     join sources src on src.id = o.source_id
     where o.dedup_hash in (${placeholders})`, hashes);
	const users = await sql.query(`select u.user_id, coalesce(p.notify_priority_only, true) as notify_priority_only
     from (
       select user_id from priority_items
       union
       select user_id from priority_areas
       union
       select user_id from user_profiles where notify_enabled = true
     ) u
     left join user_profiles p on p.user_id = u.user_id
     where coalesce(p.notify_enabled, true) = true`, []);
	let notified = 0;
	for (const user of users) {
		const { items, areaIds } = await loadPriorityContext(user.user_id);
		for (const row of newOffers) {
			const offer = mapOffer(row);
			if (!(areaIds.has(offer.areaId) || matchesPriorityItem(offer.itemName, items.map((i) => ({
				itemName: i.itemName,
				category: i.category
			})), offer.category, offer.description))) continue;
			const title = "New offer on My Offers";
			const body = `${offer.itemName} at ${offer.storeName} for ${offer.currencySymbol}${offer.price.toFixed(2)}`;
			if ((await sql.query(`insert into notification_log (user_id, offer_id, title, body)
         values ($1, $2, $3, $4)
         on conflict (user_id, offer_id) do nothing
         returning id`, [
				user.user_id,
				offer.id,
				title,
				body
			])).length) notified += 1;
		}
	}
	return notified;
}
var runCrawl_createServerFn_handler = createServerRpc({
	id: "a141b66614b601741884a84fd831bcd02e4a9c9bf588549996fb8f0f26c023de",
	name: "runCrawl",
	filename: "src/lib/offers/queries.ts"
}, (opts) => runCrawl.__executeServer(opts));
var runCrawl = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input ?? {}).handler(runCrawl_createServerFn_handler, async ({ data, context }) => {
	await ensureSeed();
	await ensureProfile(context.userId);
	const sql = await getSql();
	const log = [];
	const sources = await sql`
      select id, name, type from sources where active = true order by type`;
	log.push("Platforms: store sites, Facebook, Twitter, WhatsApp, Instagram, Pinterest, web search, local listings");
	for (const s of sources.slice(0, 8)) log.push(`Fetching ${s.name} (${s.type})`);
	const { insertIncomingOffers } = await import("./seed-C-eEFuW8.mjs");
	const { inserted, scanned, hashes } = await insertIncomingOffers(sql, data.city, 6);
	await sql`update sources set last_crawled_at = now() where active = true`;
	await sql.query(`insert into crawl_runs (source_id, status, offers_found, offers_new, notes, finished_at)
       values (null, 'ok', $1, $2, $3, now())`, [
		scanned,
		inserted,
		`Triggered by ${context.userId}`
	]);
	log.push(`Parsed ${scanned} candidate listings`);
	log.push(`Dedup hash matched ${scanned - inserted} already-indexed offers`);
	log.push(`Indexed ${inserted} new offers`);
	const notified = await notifyWatchersForHashes(sql, hashes);
	log.push(`Queued ${notified} watcher alerts`);
	log.push("Coverage index updated");
	return {
		scanned,
		inserted,
		duplicates: Math.max(0, scanned - inserted),
		notified,
		log
	};
});
var nearbyArea_createServerFn_handler = createServerRpc({
	id: "39df8ef92ea2f2b2970e5221e9e956f3e1d1d39774a6a476411438e3c39e154f",
	name: "nearbyArea",
	filename: "src/lib/offers/queries.ts"
}, (opts) => nearbyArea.__executeServer(opts));
var nearbyArea = createServerFn({ method: "GET" }).validator((input) => input).handler(nearbyArea_createServerFn_handler, async ({ data }) => {
	await ensureSeed();
	const rows = await (await getSql())`select id, name, city, country, currency_code, currency_symbol, latitude, longitude, radius_km from areas`;
	let best = null;
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
				radiusKm: Number(r.radius_km)
			};
		}
	}
	return best ? {
		area: best,
		km: bestD
	} : null;
});
//#endregion
export { addPriorityArea_createServerFn_handler, addPriorityItem_createServerFn_handler, getCoverage_createServerFn_handler, getOfferPersonalized_createServerFn_handler, getOffer_createServerFn_handler, getProfile_createServerFn_handler, listAreas_createServerFn_handler, listNotifications_createServerFn_handler, listOffersPersonalized_createServerFn_handler, listOffers_createServerFn_handler, listPendingOffers_createServerFn_handler, listPriorityAreas_createServerFn_handler, listPriorityItems_createServerFn_handler, listSources_createServerFn_handler, listStores_createServerFn_handler, markNotificationsRead_createServerFn_handler, moderateOffer_createServerFn_handler, nearbyArea_createServerFn_handler, removePriorityArea_createServerFn_handler, removePriorityItem_createServerFn_handler, runCrawl_createServerFn_handler, saveProfile_createServerFn_handler, submitOffer_createServerFn_handler };
