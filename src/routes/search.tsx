import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryPills } from "@/components/category-pills";
import { EmptyState } from "@/components/empty-state";
import { OfferCard } from "@/components/offer-card";
import { SearchBar } from "@/components/search-bar";
import { SearchChips } from "@/components/search-chips";
import { SlideUp } from "@/components/slide-up";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { SOURCE_LABELS, isForYouCategory } from "@/lib/offers/categories";
import { listStores } from "@/lib/offers/queries";
import { isChainQuery } from "@/lib/offers/local-markets";
import { withinRadius } from "@/lib/offers/radius";
import { QUICK_SEARCHES, spellingHint } from "@/lib/offers/search-index";
import type { SortKey, SourceType } from "@/lib/offers/types";
import { useLocationFilters, useOffers } from "@/lib/offers/use-offers";
import { useLocationStore } from "@/lib/location-store";
import { cn } from "@/lib/utils";

type SearchParams = { q?: string; mode?: "item" };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
    mode: s.mode === "item" ? "item" : undefined,
  }),
  component: SearchPage,
});

const SORTS: { id: SortKey; label: string }[] = [
  { id: "nearby", label: "Closest" },
  { id: "recent", label: "Newest" },
  { id: "discount", label: "Biggest cut" },
  { id: "price", label: "Lowest price" },
  { id: "ending", label: "Ending soon" },
];

function SearchPage() {
  const { q: qParam, mode } = Route.useSearch();
  const itemMode = mode === "item";
  const navigate = useNavigate();
  const loc = useLocationStore();
  const base = useLocationFilters();
  const [q, setQ] = useState(qParam ?? "");
  useEffect(() => {
    setQ(qParam ?? "");
  }, [qParam]);
  const [category, setCategory] = useState<string | undefined>();
  const [sort, setSort] = useState<SortKey>("nearby");
  const [sourceType, setSourceType] = useState<string | undefined>();
  const [storeId, setStoreId] = useState<number | undefined>();
  const [maxKm, setMaxKm] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [open, setOpen] = useState(false);

  const storesQ = useQuery({
    queryKey: ["stores", loc.city],
    queryFn: () => listStores({ data: { city: loc.city ?? undefined } }),
  });

  const offersQ = useOffers({
    ...base,
    search: q.trim() || undefined,
    category: itemMode ? undefined : category,
    sort,
    sourceType,
    storeId,
    maxKm,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  const raw = offersQ.data ?? [];
  const chainHunt = isChainQuery(q);
  const forYou = raw.filter((o) => isForYouCategory(o.category));
  const grocery = raw.filter((o) => !isForYouCategory(o.category));
  const groceryScope = chainHunt
    ? { offers: grocery, expanded: grocery.some((o) => (o.distanceKm ?? 99) > 2) }
    : withinRadius(grocery, maxKm);
  const offers = [...forYou, ...groceryScope.offers];
  const expanded = groceryScope.expanded;
  const hint = q.trim() ? spellingHint(q) : null;
  const place = loc.areaName ?? loc.city ?? "you";
  const cityLabel = loc.city ?? place;
  const where = offersQ.isPending
    ? "Searching…"
    : chainHunt
      ? `${offers.length} real ${q.trim()} branch${offers.length === 1 ? "" : "es"} · nearest first, with the portal on the card`
      : forYou.length === 0
      ? expanded
        ? `Nothing within 2 km of ${place} · ${offers.length} farther offer${offers.length === 1 ? "" : "s"}`
        : `${offers.length} within ${maxKm ?? 2} km of ${place}`
      : groceryScope.offers.length === 0
        ? `${forYou.length} for you in ${cityLabel}`
        : expanded
          ? `${forYou.length} for you in ${cityLabel} · ${groceryScope.offers.length} farther grocery offer${groceryScope.offers.length === 1 ? "" : "s"}`
          : `${groceryScope.offers.length} within ${maxKm ?? 2} km of ${place} · ${forYou.length} for you`;

  function setMode(next: "item" | "deals") {
    void navigate({
      to: "/search",
      search: { q: q.trim() || undefined, mode: next === "item" ? "item" : undefined },
    });
  }

  return (
    <main className="px-4 pb-8 pt-5">
      <div className="mb-3 grid grid-cols-2 rounded-xl bg-surface-2 p-1">
        <button
          type="button"
          onClick={() => setMode("deals")}
          className={cn(
            "h-10 rounded-lg text-sm font-medium",
            !itemMode ? "bg-surface text-fg shadow-(--shadow-card)" : "text-muted",
          )}
        >
          Nearby deals
        </button>
        <button
          type="button"
          onClick={() => setMode("item")}
          className={cn(
            "h-10 rounded-lg text-sm font-medium",
            itemMode ? "bg-surface text-fg shadow-(--shadow-card)" : "text-muted",
          )}
        >
          Find an item
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <SearchBar
            value={q}
            onChange={setQ}
            placeholder={
              itemMode ? "Item name — tamato, chiken, ٹماٹر" : "دودھ، چاول، سبزی…  milk, rice"
            }
          />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="grid size-11 place-items-center rounded-lg border border-border bg-surface"
          aria-label="Filters"
        >
          <SlidersHorizontal className="size-4" />
        </button>
      </div>

      {itemMode ? (
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {QUICK_SEARCHES.map((s) => {
            const active = q.toLowerCase() === s.label.toLowerCase();
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => setQ(active ? "" : s.label)}
                className={cn(
                  "flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm",
                  active ? "border-secondary bg-secondary-soft text-pin" : "border-border bg-surface text-fg",
                )}
              >
                <span className="font-medium">{s.label}</span>
                <span className="text-xs text-muted" dir="auto">
                  {s.ur}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <SearchChips value={q} onSelect={setQ} />
      )}

      {itemMode ? null : (
        <div className="mt-4">
          <CategoryPills value={category} onChange={setCategory} />
        </div>
      )}

      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SORTS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSort(s.id)}
            className={`h-9 shrink-0 rounded-full px-3 text-xs font-medium ${
              sort === s.id ? "bg-fg text-bg" : "bg-surface-2 text-muted"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted">
        {offersQ.isPending
          ? "Searching…"
          : where}
        {itemMode ? " · names only, spelling can be off" : " · اردو، हिंदी, English, or emoji"}
        {hint ? ` · matched ${hint}` : ""}
      </p>
      {itemMode ? (
        <p className="mt-1 text-xs text-muted">
          Store sites, Facebook, Twitter, WhatsApp, Instagram, Pinterest, web search, and local listings.
        </p>
      ) : null}

      <div className="mt-3 space-y-3">
        {offersQ.isPending ? (
          <>
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </>
        ) : itemMode && !q.trim() ? (
          <EmptyState
            icon={SearchIcon}
            title="Search one item"
            body="Type the name in English, Urdu, or Hindi. No icon needed — a misspelled name still matches."
          />
        ) : offers.length === 0 ? (
          <EmptyState
            icon={SearchIcon}
            title={itemMode ? "No item under that name" : "No matching offers"}
            body={
              itemMode
                ? "Try the plain name. A missing letter is fine — tamato still finds tomato."
                : expanded
                  ? "Nothing in range or farther for this filter."
                  : "Try another item, or switch to Find an item if the spelling is off."
            }
          />
        ) : (
          offers.map((o) => <OfferCard key={o.id} offer={o} />)
        )}
      </div>

      <SlideUp open={open} onClose={() => setOpen(false)} title="Filters">
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Max price
            <Input
              className="mt-1"
              inputMode="decimal"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Any"
            />
          </label>
          <label className="block text-sm font-medium">
            Distance
            <select
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={maxKm ?? ""}
              onChange={(e) => setMaxKm(e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="">2 km, then farther</option>
              <option value="2">Only within 2 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
            </select>
          </label>
          <label className="block text-sm font-medium">
            Store
            <select
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={storeId ?? ""}
              onChange={(e) => setStoreId(e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="">All stores</option>
              {(storesQ.data ?? []).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Source
            <select
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={sourceType ?? ""}
              onChange={(e) => setSourceType(e.target.value || undefined)}
            >
              <option value="">All sources</option>
              {(Object.keys(SOURCE_LABELS) as SourceType[]).map((k) => (
                <option key={k} value={k}>
                  {SOURCE_LABELS[k]}
                </option>
              ))}
            </select>
          </label>
          <Button className="w-full" onClick={() => setOpen(false)}>
            Apply
          </Button>
        </div>
      </SlideUp>
    </main>
  );
}
