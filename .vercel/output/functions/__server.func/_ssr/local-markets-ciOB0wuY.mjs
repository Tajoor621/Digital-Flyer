//#region node_modules/.nitro/vite/services/ssr/assets/local-markets-ciOB0wuY.js
/** Neighbourhood chains Pakistani and Pathan families actually use. Lower rank wins inside 2 km. */
var RANK = [
	[/talal|madina|madeena|faaz|day to day|dream land|night to night|viva|west zone/i, 0],
	[/official|local|sabzi|utility/i, 1],
	[/imtiaz|kifayah|naheed|chase|metro|bin hashim/i, 2]
];
function localChainRank(chain) {
	const name = chain ?? "";
	for (const [re, rank] of RANK) if (re.test(name)) return rank;
	return 5;
}
function isNeighbourhoodChain(chain) {
	return localChainRank(chain) <= 2;
}
var CHAIN_NEEDLES = [
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
	["naheed", "naheed"]
];
/** SQL ILIKE fragment when the query is a real chain, not a grocery item. */
function chainLike(query) {
	if (!query) return null;
	const q = query.trim().toLowerCase().replace(/\s+/g, " ");
	const compact = q.replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
	for (const [needle, like] of CHAIN_NEEDLES) {
		const n = needle.replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
		if (n.length >= 4 && (q.includes(needle) || compact.includes(n)) || q === needle) return like;
	}
	return null;
}
function isBargainQuery(query) {
	if (!query) return false;
	const q = query.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
	return q.includes("1to10") || q === "onetoten" || q === "onetotens" || q === "sasta" || q === "cheap" || q === "lowest" || q === "discount" || q.includes("سستا") || q.includes("ارزان");
}
function isChainQuery(query) {
	return chainLike(query) != null || isBargainQuery(query);
}
function chainMatches(chain, storeName, query) {
	const q = query.trim().toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g, "");
	if (q.length < 4) return false;
	return `${chain} ${storeName}`.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g, "").includes(q);
}
var BAZAAR_PINS = [
	{
		area: "Al Murar",
		label: "Deira · 2 km"
	},
	{
		area: "Al Nahda Dubai",
		label: "Day to Day Nahda"
	},
	{
		area: "Al Nahda",
		label: "Sharjah Nahda"
	},
	{
		area: "Al Fahidi",
		label: "Talal Fahidi"
	},
	{
		area: "Muhaisnah",
		label: "Sonapur"
	},
	{
		area: "Al Bustan",
		label: "Ajman Day to Day"
	},
	{
		area: "Al Jerf",
		label: "Al Jerf"
	},
	{
		area: "Clifton",
		label: "Karachi rates"
	}
];
function groceryMapUrl(lat, lng) {
	return `https://www.google.com/maps/search/grocery+store+supermarket+general+store/@${lat},${lng},15z`;
}
function neighbourhoodMapUrl(lat, lng) {
	return `https://www.google.com/maps/search/${encodeURIComponent("Talal Market OR Faaz Supermarket OR Day to Day OR Dream Land OR Viva OR West Zone OR Madina supermarket")}/@${lat},${lng},14z`;
}
//#endregion
export { isBargainQuery as a, localChainRank as c, groceryMapUrl as i, neighbourhoodMapUrl as l, chainLike as n, isChainQuery as o, chainMatches as r, isNeighbourhoodChain as s, BAZAAR_PINS as t };
