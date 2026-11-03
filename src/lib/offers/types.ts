export const CATEGORY_IDS = [
  "produce",
  "dairy",
  "meat",
  "bakery",
  "pantry",
  "frozen",
  "beverages",
  "snacks",
  "household",
  "personal",
  "digital",
  "vacation",
  "flights",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export const SOURCE_TYPES = [
  "website",
  "facebook",
  "instagram",
  "twitter",
  "whatsapp",
  "pinterest",
  "search",
  "local",
  "tiktok",
  "telegram",
  "flyer",
  "forum",
  "manual",
] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];

export type SortKey = "nearby" | "recent" | "discount" | "price" | "ending";

export type Area = {
  id: number;
  name: string;
  city: string;
  country: string;
  currencyCode: string;
  currencySymbol: string;
  latitude: number;
  longitude: number;
  radiusKm: number;
};

export type Store = {
  id: number;
  name: string;
  chain: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  areaId: number;
  website: string | null;
};

export type Source = {
  id: number;
  name: string;
  type: SourceType;
  baseUrl: string | null;
  areaId: number | null;
  crawlFrequencyMinutes: number;
  lastCrawledAt: string | null;
  active: boolean;
};

export type Offer = {
  id: number;
  itemName: string;
  category: CategoryId;
  price: number;
  originalPrice: number | null;
  discountPercent: number | null;
  unit: string | null;
  description: string | null;
  sourceUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: string;
  storeId: number;
  storeName: string;
  storeChain: string;
  storeAddress: string | null;
  storeWebsite: string | null;
  storeLat: number | null;
  storeLng: number | null;
  areaId: number;
  areaName: string;
  city: string;
  country: string;
  currencyCode: string;
  currencySymbol: string;
  sourceId: number;
  sourceName: string;
  sourceType: SourceType;
  distanceKm: number | null;
  isPriority: boolean;
};

export type PriorityItem = {
  id: number;
  itemName: string;
  category: CategoryId | null;
  createdAt: string;
};

export type PriorityArea = {
  id: number;
  areaId: number;
  name: string;
  city: string;
  createdAt: string;
};

export type AppNotification = {
  id: number;
  offerId: number | null;
  title: string;
  body: string;
  readAt: string | null;
  sentAt: string;
};

export type UserProfile = {
  userId: string;
  areaId: number | null;
  city: string | null;
  notifyEnabled: boolean;
  notifyPriorityOnly: boolean;
};

export type Coverage = {
  sourceCount: number;
  activeSources: number;
  offerCount: number;
  lastCrawledAt: string | null;
  pendingReview: number;
};

export type CrawlResult = {
  scanned: number;
  inserted: number;
  duplicates: number;
  notified: number;
  log: string[];
};

export type ListOffersInput = {
  city?: string;
  areaId?: number;
  search?: string;
  category?: string;
  storeId?: number;
  sourceType?: string;
  minPrice?: number;
  maxPrice?: number;
  maxKm?: number;
  sort?: SortKey;
  verifiedOnly?: boolean;
  originLat?: number;
  originLng?: number;
  includeUnverified?: boolean;
};
