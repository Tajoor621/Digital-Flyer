import type { CategoryId, SourceType } from "./types";

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  emoji: string;
}[] = [
  { id: "produce", label: "Vegetables", emoji: "🥬" },
  { id: "dairy", label: "Milk & eggs", emoji: "🥛" },
  { id: "meat", label: "Meat", emoji: "🥩" },
  { id: "bakery", label: "Bakery", emoji: "🍞" },
  { id: "pantry", label: "Rice & daal", emoji: "🍚" },
  { id: "frozen", label: "Frozen", emoji: "❄️" },
  { id: "beverages", label: "Drinks", emoji: "🥤" },
  { id: "snacks", label: "Snacks", emoji: "🍪" },
  { id: "household", label: "Home", emoji: "🏠" },
  { id: "personal", label: "Care", emoji: "🤍" },
  { id: "digital", label: "AI apps", emoji: "🤖" },
  { id: "vacation", label: "Vacations", emoji: "🏖️" },
  { id: "flights", label: "Flights", emoji: "✈️" },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, (typeof CATEGORIES)[number]>;

export const CATEGORY_PHOTOS: Partial<Record<CategoryId, string>> = {
  produce: "/categories/produce.jpg",
  dairy: "/categories/dairy.jpg",
  meat: "/categories/meat.jpg",
  bakery: "/categories/bakery.jpg",
  pantry: "/categories/pantry.jpg",
  frozen: "/categories/frozen.jpg",
  beverages: "/categories/beverages.jpg",
};

export const FOR_YOU_SECTIONS: {
  id: CategoryId;
  title: string;
  ur: string;
  hi: string;
  emoji: string;
}[] = [
  { id: "digital", title: "Free AI subscriptions", ur: "مفت اے آئی", hi: "फ्री एआई", emoji: "🤖" },
  { id: "vacation", title: "Free vacations", ur: "مفت چھٹیاں", hi: "फ्री छुट्टी", emoji: "🏖️" },
  { id: "flights", title: "Air tickets", ur: "ہوائی ٹکٹ", hi: "एयर टिकट", emoji: "✈️" },
];

export function isForYouCategory(id: string): boolean {
  return id === "digital" || id === "vacation" || id === "flights";
}

export const SOURCE_LABELS: Record<SourceType, string> = {
  website: "Store site",
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
  whatsapp: "WhatsApp",
  pinterest: "Pinterest",
  search: "Web search",
  local: "Local",
  tiktok: "TikTok",
  telegram: "Telegram",
  flyer: "Digital flyer",
  forum: "Forum",
  manual: "Community",
};

export const SUGGESTED_WATCHES: { name: string; emoji: string }[] = [
  { name: "Vegetables", emoji: "🥬" },
  { name: "Pulses", emoji: "🫘" },
  { name: "Rice", emoji: "🍚" },
  { name: "Meat", emoji: "🥩" },
  { name: "Milk", emoji: "🥛" },
  { name: "Soft drinks", emoji: "🥤" },
  { name: "Atta", emoji: "🌾" },
  { name: "Cooking oil", emoji: "🫒" },
  { name: "Ghee", emoji: "🫙" },
  { name: "Sugar", emoji: "🍬" },
  { name: "Salt", emoji: "🧂" },
  { name: "Tea", emoji: "🍵" },
  { name: "Eggs", emoji: "🥚" },
  { name: "Yogurt", emoji: "🥣" },
  { name: "Chicken", emoji: "🐔" },
  { name: "Onions", emoji: "🧅" },
  { name: "Tomatoes", emoji: "🍅" },
  { name: "Potatoes", emoji: "🥔" },
  { name: "Spices", emoji: "🍛" },
  { name: "Roti", emoji: "🫓" },
  { name: "Besan", emoji: "🫘" },
  { name: "Lauki", emoji: "🥬" },
  { name: "AI apps", emoji: "🤖" },
  { name: "Vacations", emoji: "🏖️" },
  { name: "Air tickets", emoji: "✈️" },
];
