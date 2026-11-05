import assert from "node:assert/strict";
import test from "node:test";
import { lowestShelf, otherShops, shelfReading } from "./shelf.ts";
import type { Offer } from "./types.ts";

function offer(partial: Partial<Offer> & Pick<Offer, "id" | "itemName" | "price">): Offer {
  return {
    category: "dairy",
    originalPrice: null,
    discountPercent: null,
    unit: "1L",
    description: null,
    sourceUrl: null,
    startDate: null,
    endDate: null,
    isVerified: true,
    isFeatured: false,
    createdAt: "2026-11-01T00:00:00.000Z",
    storeId: partial.id,
    storeName: "Shop",
    storeChain: "local",
    storeAddress: null,
    storeWebsite: null,
    storeLat: null,
    storeLng: null,
    areaId: 1,
    areaName: "Clifton",
    city: "Karachi",
    country: "Pakistan",
    currencyCode: "PKR",
    currencySymbol: "Rs",
    sourceId: 1,
    sourceName: "Shelf",
    sourceType: "flyer",
    distanceKm: 1,
    isPriority: false,
    ...partial,
  };
}

test("lowestShelf picks the cheapest printed tag and skips portals", () => {
  const lines = lowestShelf(
    [
      offer({ id: 1, itemName: "Olpers milk", price: 250, storeName: "Far" }),
      offer({ id: 2, itemName: "Milk 1 litre", price: 210, storeName: "Near" }),
      offer({ id: 3, itemName: "Milk portal", price: 90, unit: "portal", storeName: "Web" }),
      offer({ id: 4, itemName: "Chicken", price: 40, category: "meat" }),
    ],
    [{ itemName: "Milk" }],
  );
  assert.equal(lines.length, 1);
  assert.equal(lines[0]?.offer?.id, 2);
});

test("shelfReading sums one currency and refuses a mix", () => {
  const same = shelfReading([
    { itemName: "Milk", offer: offer({ id: 1, itemName: "Milk", price: 200 }) },
    { itemName: "Rice", offer: offer({ id: 2, itemName: "Rice", price: 150, category: "pantry" }) },
  ]);
  assert.equal(same?.total, 350);
  assert.equal(same?.count, 2);
  assert.equal(same?.currencyCode, "PKR");

  const mixed = shelfReading([
    { itemName: "Milk", offer: offer({ id: 1, itemName: "Milk", price: 2, currencyCode: "AED" }) },
    { itemName: "Rice", offer: offer({ id: 2, itemName: "Rice", price: 150 }) },
  ]);
  assert.equal(mixed, null);
  assert.equal(shelfReading([{ itemName: "Tea", offer: null }]), null);
});

test("otherShops lists cheaper matching tags and drops the open offer", () => {
  const current = offer({ id: 2, itemName: "Tomatoes 1kg", price: 85, category: "produce" });
  const shops = otherShops(
    [
      current,
      offer({ id: 1, itemName: "Tomato", price: 70, category: "produce", storeName: "Mandi" }),
      offer({ id: 3, itemName: "Milk", price: 40 }),
    ],
    current,
  );
  assert.deepEqual(
    shops.map((row) => row.id),
    [1],
  );
});
