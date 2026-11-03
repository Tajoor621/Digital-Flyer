/** Neighbourhood chains Pakistani and Pathan families actually use. Lower rank wins inside 2 km. */
const RANK: [RegExp, number][] = [
  [/talal|madina|madeena|faaz|day to day|dream land|night to night|viva|west zone/i, 0],
  [/official|local|sabzi|utility/i, 1],
  [/imtiaz|kifayah|naheed|chase|metro|bin hashim/i, 2],
];

export function localChainRank(chain: string | null | undefined): number {
  const name = chain ?? "";
  for (const [re, rank] of RANK) {
    if (re.test(name)) return rank;
  }
  return 5;
}

export function isNeighbourhoodChain(chain: string | null | undefined): boolean {
  return localChainRank(chain) <= 2;
}

const CHAIN_NEEDLES: [string, string][] = [
  ["talal", "talal"],
  ["طلال", "talal"],
  ["madina", "madina"],
  ["madeena", "madina"],
  ["مدینہ", "madina"],
  ["مدینه", "madina"],
  ["faaz", "faaz"],
  ["فاز", "faaz"],
  ["day to day", "day to day"],
  ["daytoday", "day to day"],
  ["dream land", "dream"],
  ["dreamland", "dream"],
  ["night to night", "night to night"],
  ["nighttonight", "night to night"],
  ["viva", "viva"],
  ["west zone", "west zone"],
  ["westzone", "west zone"],
  ["imtiaz", "imtiaz"],
  ["kifayah", "kifayah"],
  ["naheed", "naheed"],
];

/** SQL ILIKE fragment when the query is a real chain, not a grocery item. */
export function chainLike(query: string | undefined): string | null {
  if (!query) return null;
  const q = query.trim().toLowerCase().replace(/\s+/g, " ");
  const compact = q.replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
  for (const [needle, like] of CHAIN_NEEDLES) {
    const n = needle.replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
    if ((n.length >= 4 && (q.includes(needle) || compact.includes(n))) || q === needle) return like;
  }
  return null;
}

export function isBargainQuery(query: string | undefined): boolean {
  if (!query) return false;
  const q = query.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
  return (
    q.includes("1to10") ||
    q === "onetoten" ||
    q === "onetotens" ||
    q === "sasta" ||
    q === "cheap" ||
    q === "lowest" ||
    q === "discount" ||
    q.includes("سستا") ||
    q.includes("ارزان")
  );
}

export function isChainQuery(query: string | undefined): boolean {
  return chainLike(query) != null || isBargainQuery(query);
}

export function chainMatches(chain: string, storeName: string, query: string): boolean {
  const q = query.trim().toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
  if (q.length < 4) return false;
  const blob = `${chain} ${storeName}`.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
  return blob.includes(q);
}

export const BAZAAR_PINS: { area: string; label: string }[] = [
  { area: "Al Murar", label: "Deira · 2 km" },
  { area: "Al Nahda Dubai", label: "Day to Day Nahda" },
  { area: "Al Nahda", label: "Sharjah Nahda" },
  { area: "Al Fahidi", label: "Talal Fahidi" },
  { area: "Muhaisnah", label: "Sonapur" },
  { area: "Al Bustan", label: "Ajman Day to Day" },
  { area: "Al Jerf", label: "Al Jerf" },
  { area: "Clifton", label: "Karachi rates" },
];

export function groceryMapUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/grocery+store+supermarket+general+store/@${lat},${lng},15z`;
}

export function neighbourhoodMapUrl(lat: number, lng: number): string {
  const q = encodeURIComponent(
    "Talal Market OR Faaz Supermarket OR Day to Day OR Dream Land OR Viva OR West Zone OR Madina supermarket",
  );
  return `https://www.google.com/maps/search/${q}/@${lat},${lng},14z`;
}
