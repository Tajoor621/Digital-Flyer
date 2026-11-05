import { offerMatchesQuery } from "./search-index.ts";
import type { Offer } from "./types.ts";

export type ShelfLine = {
  itemName: string;
  offer: Offer | null;
};

export type ShelfTotal = {
  currencyCode: string;
  currencySymbol: string;
  total: number;
  count: number;
};

function pricedTag(offer: Offer): boolean {
  return offer.price > 0 && offer.unit !== "portal";
}

/** Printed tags whose name matches the way someone asks at the counter. */
export function matchingTags(offers: Offer[], query: string): Offer[] {
  const q = query.trim();
  if (!q) return [];
  return offers.filter(
    (offer) =>
      pricedTag(offer) &&
      offerMatchesQuery(offer.itemName, offer.description, offer.category, q),
  );
}

/** Lowest printed tag already in the catalogue for each watched item. */
export function lowestShelf(offers: Offer[], watches: { itemName: string }[]): ShelfLine[] {
  return watches.map((watch) => {
    const matches = matchingTags(offers, watch.itemName).sort((a, b) => a.price - b.price);
    return { itemName: watch.itemName, offer: matches[0] ?? null };
  });
}

/**
 * Sum of those lowest tags when they share a currency.
 * Units are not normalised, so this is a reading, not a checkout total.
 */
export function shelfReading(lines: ShelfLine[]): ShelfTotal | null {
  const priced = lines.flatMap((line) => (line.offer ? [line.offer] : []));
  if (priced.length === 0) return null;
  const currencyCode = priced[0].currencyCode;
  if (priced.some((offer) => offer.currencyCode !== currencyCode)) return null;
  return {
    currencyCode,
    currencySymbol: priced[0].currencySymbol,
    total: priced.reduce((sum, offer) => sum + offer.price, 0),
    count: priced.length,
  };
}

/** Other shops' printed tags for the same item, cheapest first. */
export function otherShops(offers: Offer[], current: Offer): Offer[] {
  return matchingTags(offers, current.itemName)
    .filter((offer) => offer.id !== current.id)
    .sort((a, b) => a.price - b.price || (a.distanceKm ?? 99) - (b.distanceKm ?? 99));
}
