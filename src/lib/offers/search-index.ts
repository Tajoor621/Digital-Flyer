import type { CategoryId } from "./types";

export type SearchGroup = {
  id: string;
  category?: CategoryId;
  terms: string[];
};

/**
 * English + Urdu + Hindi + romanization + emoji aliases for kitchen staples.
 * Searching any term in a group matches every item that belongs to it.
 */
export const SEARCH_GROUPS: SearchGroup[] = [
  {
    id: "vegetables",
    category: "produce",
    terms: [
      "vegetable", "vegetables", "sabzi", "sabziyan", "sabziyaan", "sabji", "sabjiyan",
      "سبزی", "سبزیاں", "سبزي", "सब्ज़ी", "सब्जी", "सब्ज़ियाँ",
      "🥬",
    ],
  },
  {
    id: "tomato",
    category: "produce",
    terms: ["tomato", "tomatoes", "tamatar", "tamater", "ٹماٹر", "टमाटर", "ټماټر", "رومي", "بانجان رومي", "🍅"],
  },
  {
    id: "onion",
    category: "produce",
    terms: ["onion", "onions", "pyaz", "pyaaz", "piyaz", "pyaj", "پیاز", "پياز", "प्याज", "🧅"],
  },
  {
    id: "potato",
    category: "produce",
    terms: ["potato", "potatoes", "aloo", "alu", "aalu", "آلو", "الو", "आलू", "کچالو", "🥔"],
  },
  {
    id: "chilli",
    category: "produce",
    terms: [
      "chilli", "chili", "chilies", "mirch", "mircha",
      "ہری مرچ", "لال مرچ", "مرچ", "हरी मिर्च", "लाल मिर्च", "🌶️",
    ],
  },
  {
    id: "garlic",
    category: "produce",
    terms: ["garlic", "lehsan", "lahsun", "لہسن", "लहसुन", "🧄"],
  },
  {
    id: "ginger",
    category: "produce",
    terms: ["ginger", "adrak", "ادرک", "अदरक", "🫚"],
  },
  {
    id: "okra",
    category: "produce",
    terms: ["okra", "bhindi", "lady finger", "ladyfinger", "بھنڈی", "भिंडी"],
  },
  {
    id: "spinach",
    category: "produce",
    terms: ["spinach", "palak", "saag", "پالک", "ساگ", "पालक"],
  },
  {
    id: "banana",
    category: "produce",
    terms: ["banana", "bananas", "kela", "kela", "کیلا", "केला", "🍌"],
  },
  {
    id: "apple",
    category: "produce",
    terms: ["apple", "apples", "seb", "سیب", "सेब", "🍎", "🍏"],
  },
  {
    id: "rice",
    category: "pantry",
    terms: [
      "rice", "chawal", "basmati", "sella", "kernel",
      "چاول", "باسمتی", "चावल", "बासमती", "وریجې", "🍚",
    ],
  },
  {
    id: "lentils",
    category: "pantry",
    terms: [
      "lentil", "lentils", "pulse", "pulses", "daal", "dal", "daalain",
      "masoor", "moong", "mong", "chana", "chickpea", "chickpeas", "maash", "toor", "arhar",
      "دال", "مسور", "مونگ", "چنا", "ماش", "दाल", "मसूर", "मूंग", "चना", "🫘",
    ],
  },
  {
    id: "atta",
    category: "pantry",
    terms: ["atta", "flour", "wheat", "aata", "آٹا", "आटा", "गेहूं", "اوړه", "🌾"]
  },
  {
    id: "oil",
    category: "pantry",
    terms: [
      "oil", "tel", "cooking oil", "sunflower", "canola",
      "تیل", "کھانے کا تیل", "तेल", "غوړي", "🫒",
    ],
  },
  {
    id: "ghee",
    category: "pantry",
    terms: ["ghee", "desi ghee", "گھی", "گھیہ", "घी", "غوړي", "🫙"],
  },
  {
    id: "sugar",
    category: "pantry",
    terms: ["sugar", "cheeni", "chini", "چینی", "चीनी", "بوره", "🍬"],
  },
  {
    id: "salt",
    category: "pantry",
    terms: ["salt", "namak", "نمک", "नमक", "مالګه", "🧂"],
  },
  {
    id: "spice",
    category: "pantry",
    terms: [
      "spice", "spices", "masala", "haldi", "turmeric", "jeera", "garam masala", "dhaniya powder",
      "مسالہ", "ہلدی", "گرم مسالہ", "मसाला", "हल्दी", "गरम मसाला", "🍛",
    ],
  },
  {
    id: "tea",
    category: "beverages",
    terms: ["tea", "chai", "lipton", "tapal", "چائے", "چای", "चाय", "🍵"],
  },
  {
    id: "milk",
    category: "dairy",
    terms: [
      "milk", "doodh", "dudh", "dood", "olper", "olpers", "milkpak", "milkp", "haleeb", "nido", "dairy",
      "دودھ", "دوده", "दूध", "شیدې", "🥛",
    ],
  },
  {
    id: "yogurt",
    category: "dairy",
    terms: ["yogurt", "yoghurt", "dahi", "دہی", "दही", "🥣"],
  },
  {
    id: "eggs",
    category: "dairy",
    terms: ["egg", "eggs", "anda", "anday", "انڈہ", "انڈے", "अंडा", "अंडे", "هګۍ", "🥚"],
  },
  {
    id: "chicken",
    category: "meat",
    terms: [
      "chicken", "murgh", "murghi", "murgi", "broiler",
      "چکن", "مرغی", "مرغ", "चिकन", "मुर्गी", "چرګ", "🐔", "🍗",
    ],
  },
  {
    id: "mutton",
    category: "meat",
    terms: ["mutton", "lamb", "bakra", "goat", "بکرا", "بکرے کا گوشت", "मटन", "🐐", "🍖"],
  },
  {
    id: "beef",
    category: "meat",
    terms: ["beef", "cow", "keema", "qeeema", "qeemah", "steak", "mince", "minced", "گائے", "قیمہ", "बीफ", "कीमा", "🐄"],
  },
  {
    id: "meat",
    category: "meat",
    terms: ["meat", "gosht", "گوشت", "मांस", "غوښه", "🥩"],
  },
  {
    id: "softdrink",
    category: "beverages",
    terms: [
      "soft drink", "softdrink", "soft drinks", "softdrinks", "cold drink", "cold drinks",
      "coldrink", "thanda", "soda", "coke", "cola", "sprite", "fanta", "pakola", "pepsi",
      "7up", "sting", "dew",
      "مشروب", "مشروبات", "ٹھنڈا", "کوک", "कोल्ड ड्रिंक", "ठंडा", "🥤", "🧃",
    ],
  },
  {
    id: "bread",
    category: "bakery",
    terms: ["bread", "roti", "naan", "nan", "chapati", "dodai", "روٹی", "نان", "چپاتی", "रोटी", "نان", "ډوډۍ", "🍞", "🫓"],
  },
  {
    id: "water",
    category: "beverages",
    terms: ["water", "pani", "پانی", "पानी", "💧", "🚰"],
  },
  {
    id: "fish",
    category: "meat",
    terms: ["fish", "machli", "machhli", "rohu", "surmai", "salmon", "prawn", "shrimp", "jhinga", "مچھلی", "मछली", "🐟"],
  },
  {
    id: "butter",
    category: "dairy",
    terms: ["butter", "makhan", "مکھن", "मक्खन", "🧈"],
  },
  {
    id: "paneer",
    category: "dairy",
    terms: ["paneer", "panir", "پنیر", "पनीर"],
  },
  {
    id: "coriander",
    category: "produce",
    terms: ["coriander", "cilantro", "dhania", "dhaniya", "دھنیا", "धनिया", "🌿"],
  },
  {
    id: "mint",
    category: "produce",
    terms: ["mint", "pudina", "پودینہ", "पुदीना"],
  },
  {
    id: "lemon",
    category: "produce",
    terms: ["lemon", "lime", "nimbu", "leemu", "لیموں", "नींबू", "🍋"],
  },
  {
    id: "carrot",
    category: "produce",
    terms: ["carrot", "carrots", "gajar", "گاجر", "गाजर", "🥕"],
  },
  {
    id: "cucumber",
    category: "produce",
    terms: ["cucumber", "kheera", "kheera", "کھیرا", "खीरा", "🥒"],
  },
  {
    id: "eggplant",
    category: "produce",
    terms: ["eggplant", "aubergine", "brinjal", "baingan", "bengan", "بینگن", "बैंगन", "🍆"],
  },
  {
    id: "peas",
    category: "produce",
    terms: ["peas", "matar", "مٹر", "मटर", "🫛"],
  },
  {
    id: "cauliflower",
    category: "produce",
    terms: ["cauliflower", "phool gobi", "phoolgobi", "gobhi", "پھول گوبھی", "फूल गोभी", "🥦"],
  },
  {
    id: "cabbage",
    category: "produce",
    terms: ["cabbage", "band gobi", "patta gobi", "بند گوبھی", "पत्ता गोभी"],
  },
  {
    id: "capsicum",
    category: "produce",
    terms: ["capsicum", "bell pepper", "shimla mirch", "shimla", "شملہ مرچ", "शिमला मिर्च", "🫑"],
  },
  {
    id: "dates",
    category: "produce",
    terms: ["dates", "date", "khajoor", "khajur", "کھجور", "खजूर", "🌴"],
  },
  {
    id: "lauki",
    category: "produce",
    terms: ["lauki", "loki", "kaddu", "gourd", "bottle gourd", "لوکی", "کدو", "लौकी", "कद्दू"],
  },
  {
    id: "karela",
    category: "produce",
    terms: ["karela", "bitter gourd", "کریلا", "करेला"],
  },
  {
    id: "imli",
    category: "pantry",
    terms: ["imli", "tamarind", "املی", "इमली"],
  },
  {
    id: "besan",
    category: "pantry",
    terms: ["besan", "gram flour", "چنے کا آٹا", "بیسن", "बेसन"],
  },
  {
    id: "sooji",
    category: "pantry",
    terms: ["sooji", "suji", "semolina", "rava", "سوجی", "सूजी"],
  },
  {
    id: "aiapp",
    category: "digital",
    terms: ["🤖"],
  },
  {
    id: "aiapps",
    category: "digital",
    terms: [
      "ai app", "ai apps", "subscription", "subscriptions", "free ai",
      "سبسکرپشن", "اے آئی", "एआई", "सब्सक्रिप्शन",
    ],
  },
  {
    id: "chatgpt",
    category: "digital",
    terms: ["chatgpt", "chat gpt", "gpt"],
  },
  {
    id: "claude",
    category: "digital",
    terms: ["claude"],
  },
  {
    id: "gemini",
    category: "digital",
    terms: ["gemini", "gemini advanced"],
  },
  {
    id: "cursor",
    category: "digital",
    terms: ["cursor pro", "cursor"],
  },
  {
    id: "perplexity",
    category: "digital",
    terms: ["perplexity"],
  },
  {
    id: "copilot",
    category: "digital",
    terms: ["copilot", "github copilot"],
  },
  {
    id: "vacation",
    category: "vacation",
    terms: ["🏖️"],
  },
  {
    id: "holiday",
    category: "vacation",
    terms: [
      "vacation", "vacations", "holiday", "holidays", "family trip",
      "چھٹی", "چھٹیاں", "خاندانی", "छुट्टी",
    ],
  },
  {
    id: "hunza",
    category: "vacation",
    terms: ["hunza", "ہنزہ", "हंज़ा"],
  },
  {
    id: "murree",
    category: "vacation",
    terms: ["murree", "مری", "मरी"],
  },
  {
    id: "swat",
    category: "vacation",
    terms: ["swat", "سوات", "स्वात"],
  },
  {
    id: "skardu",
    category: "vacation",
    terms: ["skardu", "سکردو", "स्कर्दू"],
  },
  {
    id: "dubaistay",
    category: "vacation",
    terms: ["dubai family", "dubai hotel", "دبئی قیام", "दुबई होटल"],
  },
  {
    id: "flight",
    category: "flights",
    terms: [
      "flight", "flights", "air ticket", "air tickets", "airticket", "airfare", "airline",
      "ticket", "tickets", "ٹکٹ", "فلائٹ", "टिकट", "फ्लाइट", "✈️",
    ],
  },
];

export function stapleRank(itemName: string, description: string | null, category: string): number {
  if (category === "digital") return 6;
  if (category === "vacation") return 7;
  if (category === "flights") return 8;
  const blob = `${itemName} ${description ?? ""}`;
  const ids = new Set(groupsFor(blob).map((g) => g.id));
  const has = (...keys: string[]) => keys.some((k) => ids.has(k));
  const drySpice = isDrySpice(blob);
  if (
    has(
      "vegetables",
      "tomato",
      "onion",
      "potato",
      "chilli",
      "garlic",
      "ginger",
      "okra",
      "spinach",
      "coriander",
      "mint",
      "lemon",
      "carrot",
      "cucumber",
      "eggplant",
      "peas",
      "cauliflower",
      "cabbage",
      "capsicum",
      "lauki",
      "karela",
    ) &&
    !(drySpice && (has("chilli") || has("spice")))
  ) {
    return 0;
  }
  if (has("rice", "lentils")) return 1;
  if (has("meat", "chicken", "mutton", "beef", "fish") || category === "meat") return 2;
  if (has("milk")) return 3;
  if (has("softdrink")) return 4;
  if (
    drySpice ||
    has("atta", "oil", "ghee", "sugar", "salt", "spice", "eggs", "yogurt", "tea", "bread", "butter", "paneer", "besan", "sooji", "imli")
  ) {
    return 5;
  }
  return 9;
}

const TERM_INDEX = new Map<string, SearchGroup>();
for (const g of SEARCH_GROUPS) {
  for (const t of g.terms) TERM_INDEX.set(norm(t), g);
}

/** Parent chips (سبزی، گوشت) fan out to the staples inside them, not the whole aisle. */
const FAMILY: Record<string, readonly string[]> = {
  vegetables: [
    "vegetables",
    "tomato",
    "onion",
    "potato",
    "chilli",
    "garlic",
    "ginger",
    "okra",
    "spinach",
    "coriander",
    "mint",
    "lemon",
    "carrot",
    "cucumber",
    "eggplant",
    "peas",
    "cauliflower",
    "cabbage",
    "capsicum",
    "lauki",
    "karela",
  ],
  meat: ["meat", "chicken", "mutton", "beef", "fish"],
  aiapp: ["aiapps", "chatgpt", "claude", "gemini", "cursor", "perplexity", "copilot"],
  vacation: ["holiday", "hunza", "murree", "swat", "skardu", "dubaistay"],
};

/** Kept so a meat watch still covers the meat aisle (steak, salmon) without dragging fruit into سبزی. */
export const BROAD_GROUPS = new Set<string>(["meat"]);

function isDrySpice(text: string): boolean {
  return /powder|masala|haldi|پاؤڈر|پودر|पाउडर|मसाल|हलदी/.test(norm(text));
}

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u0640/g, "")
    .replace(/[\u064B-\u065F]/g, "");
}

function escapeReg(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenize(q: string): string[] {
  const tokens = q
    .split(/[\s,./+|]+/)
    .map((t) => t.trim())
    .filter(Boolean);
  const emojis = q.match(/\p{Extended_Pictographic}/gu) ?? [];
  return [...tokens, ...emojis];
}

/** Latin aliases match whole words so "dal" does not hit "cathedral" or "egg" hit "eggplant". */
function containsTerm(hay: string, term: string): boolean {
  const nt = norm(term);
  if (nt.length < 2) return false;
  if (hay === nt) return true;
  const original = term.normalize("NFC");
  const nonLatin = /[^\u0000-\u007f]/.test(nt);
  const emoji = /\p{Extended_Pictographic}/u.test(original);
  if (nonLatin || emoji) return hay.includes(nt);
  return new RegExp(`(?:^|[^a-z0-9])${escapeReg(nt)}(?:[^a-z0-9]|$)`, "i").test(hay);
}

const PARENT_IDS = new Set(Object.keys(FAMILY));

function scriptOf(s: string): "emoji" | "latin" | "arabic" | "deva" | "other" {
  if (/\p{Extended_Pictographic}/u.test(s)) return "emoji";
  if (/[\u0600-\u06FF]/.test(s)) return "arabic";
  if (/[\u0900-\u097F]/.test(s)) return "deva";
  if (/[a-z]/i.test(s)) return "latin";
  return "other";
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 3;
  const row = new Array<number>(n + 1);
  for (let j = 0; j <= n; j++) row[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = row[j] ?? 0;
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min((row[j] ?? 0) + 1, (row[j - 1] ?? 0) + 1, prev + cost);
      prev = tmp;
    }
  }
  return row[n] ?? 3;
}

function fuzzyLimit(len: number): number {
  if (len >= 6) return 2;
  if (len >= 4) return 1;
  return 0;
}

/** One or two wrong letters still land on the staple. Emoji is optional. */
function fuzzyGroupForToken(token: string): SearchGroup | undefined {
  const n = norm(token);
  const kind = scriptOf(n);
  if (kind === "emoji" || kind === "other") return;
  const limit = kind === "latin" ? fuzzyLimit(n.length) : n.length >= 3 ? 1 : 0;
  if (!limit) return;
  let best: { g: SearchGroup; d: number; len: number } | undefined;
  for (const g of SEARCH_GROUPS) {
    if (PARENT_IDS.has(g.id)) continue;
    for (const t of g.terms) {
      if (scriptOf(t) !== kind) continue;
      const nt = norm(t);
      if (kind === "latin" && nt.length < 4) continue;
      if (Math.abs(nt.length - n.length) > limit) continue;
      const d = editDistance(n, nt);
      if (d <= 0 || d > limit) continue;
      if (!best || d < best.d || (d === best.d && nt.length > best.len)) {
        best = { g, d, len: nt.length };
      }
    }
  }
  return best?.g;
}

export function groupsFor(text: string): SearchGroup[] {
  const n = norm(text);
  if (!n) return [];
  const found = new Map<string, SearchGroup>();
  for (const tok of tokenize(text)) {
    const hit = TERM_INDEX.get(norm(tok));
    if (hit) found.set(hit.id, hit);
  }
  for (const g of SEARCH_GROUPS) {
    if (found.has(g.id)) continue;
    if (g.terms.some((t) => containsTerm(n, t))) found.set(g.id, g);
  }
  for (const tok of tokenize(text)) {
    if (TERM_INDEX.has(norm(tok))) continue;
    const fuzzy = fuzzyGroupForToken(tok);
    if (fuzzy && !found.has(fuzzy.id)) found.set(fuzzy.id, fuzzy);
  }
  return [...found.values()];
}

/** Shown when the typed name is close, but not an exact alias. */
export function spellingHint(query: string): string | null {
  const q = query.trim();
  if (q.length < 3 || /\p{Extended_Pictographic}/u.test(q)) return null;
  if (/talal|madina|faaz|viva|west zone|day to day|dream land|night to night|imtiaz|kifayah|naheed/i.test(q)) {
    return null;
  }
  const groups = groupsFor(q);
  const g = groups.find((item) => !PARENT_IDS.has(item.id)) ?? groups[0];
  if (!g) return null;
  const nq = norm(q);
  const exact = g.terms.some((t) => {
    const nt = norm(t);
    return nt === nq || (nt.length >= 3 && containsTerm(nq, t));
  });
  if (exact) return null;
  return g.terms.find((t) => /^[a-z][a-z -]{2,}$/i.test(t)) ?? g.id;
}

/** The most specific staple on a card — so 🍅 finds tomatoes, not every سبزی. */
export function bestGroup(text: string): SearchGroup | undefined {
  const groups = groupsFor(text);
  return groups.find((g) => !PARENT_IDS.has(g.id)) ?? groups[0];
}

function expandedIds(groups: SearchGroup[]): Set<string> {
  const ids = new Set<string>();
  for (const g of groups) {
    ids.add(g.id);
    for (const child of FAMILY[g.id] ?? []) ids.add(child);
  }
  return ids;
}

export function expandSearch(q: string): { likes: string[]; categories: CategoryId[] } {
  const raw = q.trim();
  if (!raw) return { likes: [], categories: [] };
  const groups = groupsFor(raw);
  const likes = new Set<string>();
  const categories = new Set<CategoryId>();
  likes.add(raw);
  const latin = raw.replace(/\p{Extended_Pictographic}/gu, "").trim();
  if (latin && latin !== raw) likes.add(latin);
  for (const id of expandedIds(groups)) {
    const g = SEARCH_GROUPS.find((x) => x.id === id);
    if (!g) continue;
    if (g.category && BROAD_GROUPS.has(g.id)) categories.add(g.category);
    for (const t of g.terms) {
      if (/\p{Extended_Pictographic}/u.test(t)) continue;
      if (t.length >= 3 || /[^\u0000-\u007f]/.test(t)) likes.add(t);
    }
    likes.add(g.id);
  }
  const list = [...likes].filter((t) => t.trim().length > 0).slice(0, 24);
  return { likes: list, categories: [...categories] };
}

export function offerMatchesQuery(
  itemName: string,
  description: string | null,
  category: string,
  query: string,
): boolean {
  const q = query.trim();
  if (!q) return true;
  const blob = `${itemName} ${description ?? ""}`;
  const qGroups = groupsFor(q);
  if (qGroups.length) {
    const wanted = expandedIds(qGroups);
    let offerGroups = groupsFor(blob);
    const vegParentOnly = qGroups.every((g) => g.id === "vegetables");
    if (vegParentOnly && isDrySpice(blob)) {
      offerGroups = offerGroups.filter((g) => g.id !== "chilli");
    }
    if (offerGroups.some((g) => wanted.has(g.id))) return true;
    if (qGroups.some((g) => g.id === "meat" && category === "meat")) return true;
  }
  const nq = norm(q).replace(/\p{Extended_Pictographic}/gu, "").trim();
  if (nq.length >= 2 && containsTerm(norm(blob), nq)) return true;
  const limit = fuzzyLimit(nq.length);
  if (limit > 0) {
    const words = norm(blob).split(/[^a-z0-9\u0600-\u06ff\u0900-\u097f]+/).filter((w) => w.length >= 4);
    if (words.some((w) => Math.abs(w.length - nq.length) <= limit && editDistance(w, nq) <= limit)) {
      return true;
    }
  }
  return false;
}

const ARABIC = /[\u0600-\u06FF]/;
const DEVANAGARI = /[\u0900-\u097F]/;
const EMOJI = /\p{Extended_Pictographic}/u;

/** Short local label so every card can be searched in English, Urdu, Hindi, or by emoji. */
export function itemLocal(
  itemName: string,
  description: string | null,
): { emoji: string; ur: string | null; hi: string | null } {
  const g = bestGroup(`${itemName} ${description ?? ""}`);
  const bits = (description ?? "")
    .split(/[·•|]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const short = (t: string) => t.length <= 18 && !(ARABIC.test(t) && DEVANAGARI.test(t));
  const blob = norm(`${itemName} ${description ?? ""}`);
  const fromGroup = (script: RegExp) => {
    const terms = g?.terms.filter((t) => script.test(t) && short(t)) ?? [];
    const contained = terms.find((t) => blob.includes(norm(t)));
    if (contained) return contained;
    if (/red|lal|لال/.test(blob)) return terms.find((t) => /لال|लाल/.test(t)) ?? terms[0] ?? null;
    return terms[0] ?? null;
  };
  const ur = bits.find((s) => ARABIC.test(s) && short(s)) ?? fromGroup(ARABIC);
  const hi = bits.find((s) => DEVANAGARI.test(s) && short(s)) ?? fromGroup(DEVANAGARI);
  const emoji = g?.terms.find((t) => EMOJI.test(t)) ?? "";
  return { emoji, ur, hi };
}

export const KITCHEN_SECTIONS: { rank: number; title: string; ur: string; hi: string; emoji: string }[] = [
  { rank: 0, title: "Vegetables", ur: "سبزی", hi: "सब्ज़ी", emoji: "🥬" },
  { rank: 1, title: "Pulses and rice", ur: "دال اور چاول", hi: "दाल और चावल", emoji: "🍚" },
  { rank: 2, title: "Meat", ur: "گوشت", hi: "मांस", emoji: "🥩" },
  { rank: 3, title: "Milk", ur: "دودھ", hi: "दूध", emoji: "🥛" },
  { rank: 4, title: "Soft drinks", ur: "مشروبات", hi: "ड्रिंक", emoji: "🥤" },
  { rank: 5, title: "Daily kitchen", ur: "روزمرہ", hi: "रसोई", emoji: "🫓" },
];
export const QUICK_SEARCHES: { q: string; emoji: string; label: string; ur: string; hi: string }[] = [
  { q: "🥬", emoji: "🥬", label: "Vegetables", ur: "سبزی", hi: "सब्ज़ी" },
  { q: "🫘", emoji: "🫘", label: "Pulses", ur: "دال", hi: "दाल" },
  { q: "🍚", emoji: "🍚", label: "Rice", ur: "چاول", hi: "चावल" },
  { q: "🥩", emoji: "🥩", label: "Meat", ur: "گوشت", hi: "मांस" },
  { q: "🥛", emoji: "🥛", label: "Milk", ur: "دودھ", hi: "दूध" },
  { q: "🥤", emoji: "🥤", label: "Soft drinks", ur: "مشروبات", hi: "ड्रिंक" },
  { q: "🌾", emoji: "🌾", label: "Atta", ur: "آٹا", hi: "आटा" },
  { q: "🫒", emoji: "🫒", label: "Oil", ur: "تیل", hi: "तेल" },
  { q: "🫙", emoji: "🫙", label: "Ghee", ur: "گھی", hi: "घी" },
  { q: "🍵", emoji: "🍵", label: "Tea", ur: "چائے", hi: "चाय" },
  { q: "🥚", emoji: "🥚", label: "Eggs", ur: "انڈے", hi: "अंडे" },
  { q: "🥣", emoji: "🥣", label: "Yogurt", ur: "دہی", hi: "दही" },
  { q: "🍛", emoji: "🍛", label: "Masala", ur: "مسالہ", hi: "मसाला" },
  { q: "🍅", emoji: "🍅", label: "Tomato", ur: "ٹماٹر", hi: "टमाटर" },
  { q: "🧅", emoji: "🧅", label: "Onion", ur: "پیاز", hi: "प्याज" },
  { q: "🥔", emoji: "🥔", label: "Potato", ur: "آلو", hi: "आलू" },
  { q: "🐔", emoji: "🐔", label: "Chicken", ur: "مرغی", hi: "मुर्गी" },
  { q: "Day to Day", emoji: "🛒", label: "Day to Day", ur: "ڈے ٹو ڈے", hi: "डे टू डे" },
  { q: "Talal", emoji: "🏪", label: "Talal", ur: "طلال", hi: "तलाल" },
  { q: "Madina", emoji: "🏪", label: "Madina", ur: "مدینہ", hi: "मदीना" },
  { q: "Faaz", emoji: "🏪", label: "Faaz", ur: "فاز", hi: "फाज़" },
  { q: "Dream Land", emoji: "🏪", label: "Dream Land", ur: "ڈریم لینڈ", hi: "ड्रीम लैंड" },
  { q: "Viva", emoji: "🏪", label: "Viva", ur: "ویوا", hi: "विवा" },
  { q: "West Zone", emoji: "🏪", label: "West Zone", ur: "ویسٹ زون", hi: "वेस्ट ज़ोन" },
  { q: "Night to Night", emoji: "🏪", label: "Night to Night", ur: "نائٹ ٹو نائٹ", hi: "नाइट टू नाइट" },
  { q: "1 to 10", emoji: "🏷️", label: "1 to 10 shops", ur: "ون ٹو ٹین", hi: "वन टू टेन" },
  { q: "sasta", emoji: "🏷️", label: "Lowest", ur: "سستا", hi: "सस्ता" },
  { q: "🤖", emoji: "🤖", label: "AI apps", ur: "اے آئی", hi: "एआई" },
  { q: "🏖️", emoji: "🏖️", label: "Vacations", ur: "چھٹی", hi: "छुट्टी" },
  { q: "✈️", emoji: "✈️", label: "Air tickets", ur: "ٹکٹ", hi: "टिकट" },
];
