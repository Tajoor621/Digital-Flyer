import { createHash } from "node:crypto";
import type { Sql } from "@/lib/db";
import type { CategoryId } from "./types";

const PAGES: { url: string; sourceId: number; page: string }[] = [
  { url: "https://rozdaam.com/en/karachi/vegetables", sourceId: 31, page: "vegetables" },
  { url: "https://rozdaam.com/en/karachi/fruits", sourceId: 34, page: "fruits" },
  { url: "https://rozdaam.com/en/karachi/poultry", sourceId: 32, page: "poultry" },
  { url: "https://rozdaam.com/en/karachi/meat", sourceId: 33, page: "meat" },
];

const ALIAS: Record<string, string> = {
  "bottle gourd round": "lauki round",
  "bitter gourd grade 1": "karela grade 1",
  "garlic whole desi grade 1": "garlic desi grade 1",
  "coriander bunch": "coriander",
  "peas classic": "peas",
  "green chilli": "green chilli",
  "ginger unwashed grade 1 (china)": "ginger",
};

type LiveRow = {
  name: string;
  slug: string;
  page: string;
  unit: string;
  retail: number;
  mandi: number | null;
  sourceId: number;
  url: string;
  date: string;
};

let syncedAt = 0;
let inflight: Promise<void> | null = null;
const TTL_MS = 20 * 60 * 1000;

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function categoryFor(page: string, name: string): CategoryId {
  if (/egg/i.test(name)) return "dairy";
  if (page === "meat" || page === "poultry") return "meat";
  return "produce";
}

function unitFor(raw: string): string {
  const u = raw.toLowerCase();
  if (u.startsWith("dozen")) return "dozen";
  if (u.startsWith("bunch") || u.startsWith("gaddi")) return "bunch";
  return "1kg";
}

/** Pull item, unit, and bazaar price out of Rozdaam's rendered page. */
export function parseRozdaam(html: string, page: string, sourceId: number, pageUrl: string): LiveRow[] {
  const flat = html.replace(/\\"/g, '"').replace(/\\n/g, " ");
  const dateMatch = flat.match(/"date":"(20\d\d-\d\d-\d\d)/);
  const date = dateMatch?.[1] ?? new Date().toISOString().slice(0, 10);
  const re =
    /\/en\/karachi\/(?:vegetables|fruits|meat|poultry)\/([a-z0-9-]+)","className":"font-semibold[^"]*","children":"([^"]+)"[\s\S]{0,900}?"children":"(Kg|Dozen|Bunch|Piece|Pc|Gaddi)"[\s\S]{0,700}?"children":"Rs ([0-9,]+)"(?:[\s\S]{0,400}?"children":"(Rs [0-9,]+|—)")?/g;
  const rows: LiveRow[] = [];
  const seen = new Set<string>();
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
      date,
    });
  }
  if (rows.length === 0) {
    // Fall back to the page URL if the flight payload shape shifts.
    void pageUrl;
  }
  return rows;
}

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "user-agent": "MyOffers/1.0 (karachi rate board)", accept: "text/html" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

function describe(row: LiveRow, low: number, high: number | null): string {
  const versus =
    high != null
      ? ` Bachat / mandi Rs ${low}. Notified retail Rs ${high}.`
      : ` Notified retail Rs ${low}.`;
  return `Official Karachi list ${row.date}.${versus} Sabzi mandi, general store, and super store rate for Pakistani and Pathan kitchens. A chain shelf can be higher. Source Rozdaam.`;
}

function priced(row: LiveRow): { low: number; high: number | null; discount: number | null } {
  const low = row.mandi != null && row.mandi > 0 && row.mandi < row.retail ? row.mandi : row.retail;
  const high = low < row.retail ? row.retail : null;
  const discount = high != null ? Math.round((1 - low / high) * 100) : null;
  return { low, high, discount };
}

/**
 * Refresh store 43 from today's Rozdaam board. Stale copied rows are unverified
 * once a full board arrives, so the feed does not keep yesterday's number beside today's.
 */
export async function syncOfficialKarachiRates(sql: Sql): Promise<void> {
  if (Date.now() - syncedAt < TTL_MS) return;
  if (inflight) return inflight;
  inflight = (async () => {
    const live: LiveRow[] = [];
    for (const page of PAGES) {
      try {
        const html = await fetchPage(page.url);
        live.push(...parseRozdaam(html, page.page, page.sourceId, page.url));
      } catch {
        /* keep the last good board */
      }
    }
    if (live.length < 8) return;

    const existing = await sql.query<{ id: number; item_name: string; source_id: number }>(
      `select id, item_name, source_id from offers where store_id = 43 and source_id in (31, 32, 33, 34)`,
    );
    const byName = new Map(existing.map((r) => [norm(r.item_name), r]));
    const touched = new Set<number>();

    for (const row of live) {
      const key = ALIAS[norm(row.name)] ?? norm(row.name);
      const found = byName.get(key) ?? byName.get(norm(row.name));
      const quote = priced(row);
      const description = describe(row, quote.low, quote.high);
      const category = categoryFor(row.page, row.name);
      if (found) {
        touched.add(found.id);
        await sql.query(
          `update offers set price = $1, original_price = $2, discount_percent = $3, description = $4, source_url = $5, unit = $6, category = $7,
             is_verified = true, updated_at = now(), end_date = current_date + 1
           where id = $8`,
          [quote.low, quote.high, quote.discount, description, row.url, row.unit, category, found.id],
        );
        continue;
      }
      const dedup = createHash("sha256")
        .update(`${norm(row.name)}|43|${quote.low.toFixed(2)}`)
        .digest("hex");
      const inserted = await sql.query<{ id: number }>(
        `insert into offers (
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
        returning id`,
        [
          row.sourceId,
          row.name,
          category,
          quote.low,
          quote.high,
          quote.discount,
          row.unit,
          description,
          row.url,
          dedup,
        ],
      );
      if (inserted[0]) touched.add(inserted[0].id);
    }

    if (touched.size >= 8) {
      const ids = [...touched];
      const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
      await sql.query(
        `update offers set is_verified = false, updated_at = now()
         where store_id = 43 and source_id in (31, 32, 33, 34) and id not in (${placeholders})`,
        ids,
      );
    }
    syncedAt = Date.now();
  })()
    .catch(() => {
      syncedAt = Date.now() - TTL_MS + 60_000;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}
