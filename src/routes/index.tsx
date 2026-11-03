import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, Radar, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CategoryPills } from "@/components/category-pills";
import { EmptyState } from "@/components/empty-state";
import { LocationPicker } from "@/components/location-picker";
import { OfferCard } from "@/components/offer-card";
import { SearchBar } from "@/components/search-bar";
import { SearchChips } from "@/components/search-chips";
import { SlideUp } from "@/components/slide-up";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useHydrated } from "@/lib/use-hydrated";
import { useLocationStore } from "@/lib/location-store";
import { relativeTime } from "@/lib/offers/format";
import { FOR_YOU_SECTIONS, isForYouCategory } from "@/lib/offers/categories";
import { KITCHEN_SECTIONS, stapleRank } from "@/lib/offers/search-index";
import { BAZAAR_PINS, groceryMapUrl, isNeighbourhoodChain, neighbourhoodMapUrl } from "@/lib/offers/local-markets";
import { withinRadius } from "@/lib/offers/radius";
import {
  getCoverage,
  listAreas,
  listNotifications,
  listPriorityItems,
  runCrawl,
} from "@/lib/offers/queries";
import { useOffers } from "@/lib/offers/use-offers";
import type { Area, Offer } from "@/lib/offers/types";

export const Route = createFileRoute("/")({ component: Home });

function timeOfDayLabel() {
  const h = new Date().getHours();
  if (h < 12) return "Morning deals";
  if (h < 17) return "Afternoon deals";
  return "Evening deals";
}

function uniqueStores(list: Offer[]): Offer[] {
  const map = new Map<number, Offer>();
  for (const o of list) {
    const prev = map.get(o.storeId);
    if (!prev || (o.distanceKm ?? 99) < (prev.distanceKm ?? 99)) map.set(o.storeId, o);
  }
  return [...map.values()].sort((a, b) => (a.distanceKm ?? 99) - (b.distanceKm ?? 99));
}

function Home() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const loc = useLocationStore();
  const setLocation = useLocationStore((s) => s.setLocation);
  const { user, isPending } = useCurrentUserState();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const [locOpen, setLocOpen] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [scanLog, setScanLog] = useState<string[]>([]);
  const hydrated = useHydrated();
  const [greeting, setGreeting] = useState("Today's deals");

  useEffect(() => {
    setGreeting(timeOfDayLabel());
  }, []);

  const areasQ = useQuery({ queryKey: ["areas"], queryFn: () => listAreas() });
  const coverageQ = useQuery({
    queryKey: ["coverage", loc.city],
    queryFn: () => getCoverage({ data: { city: loc.city ?? undefined } }),
  });
  const offersQ = useOffers({ category, search: q.trim() || undefined, sort: "nearby" });
  const priQ = useQuery({
    queryKey: ["priority-items", user?.id],
    queryFn: () => listPriorityItems(),
    enabled: Boolean(user) && !isPending,
  });
  const notesQ = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => listNotifications(),
    enabled: Boolean(user) && !isPending,
  });

  const crawl = useMutation({
    mutationFn: () => runCrawl({ data: { city: loc.city ?? undefined } }),
    onSuccess: async (res) => {
      setScanLog(res.log);
      await qc.invalidateQueries();
      if (res.inserted === 0) toast("Sources scanned — no new unique offers this pass.");
      else toast.success(`${res.inserted} new offer${res.inserted === 1 ? "" : "s"} indexed`);
    },
    onError: () => toast.error("Sign in to trigger a live source scan."),
  });

  const offers = offersQ.data ?? [];
  const forYou = offers.filter((o) => isForYouCategory(o.category));
  const portals = offers.filter((o) => o.unit === "portal");
  const grocery = offers.filter((o) => !isForYouCategory(o.category) && o.unit !== "portal");
  const groceryScope = withinRadius(grocery);
  const nearPortals = portals.filter((o) => o.distanceKm != null && o.distanceKm <= 2);
  const expanded = groceryScope.expanded && nearPortals.length === 0;
  const scoped = groceryScope.expanded && !expanded ? [] : groceryScope.offers;
  const sections = KITCHEN_SECTIONS.map((section) => ({
    ...section,
    items: scoped
      .filter((o) => stapleRank(o.itemName, o.description, o.category) === section.rank)
      .sort((a, b) => {
        const shelf = (o: (typeof scoped)[number]) =>
          o.unit === "portal" || o.price <= 0 ? Number.POSITIVE_INFINITY : o.price;
        return shelf(a) - shelf(b);
      }),
  })).filter((section) => section.items.length > 0);
  const otherHere = scoped.filter((o) => stapleRank(o.itemName, o.description, o.category) >= 9);
  const placeLabel = loc.areaName ?? loc.city ?? "you";
  const marketOffers = uniqueStores([
    ...nearPortals,
    ...scoped.filter(
      (o) => isNeighbourhoodChain(o.storeChain) && (o.distanceKm ?? 99) <= 2,
    ),
  ]);
  const lowest = [...scoped]
    .filter(
      (o) =>
        o.price > 0 &&
        o.unit !== "portal" &&
        isNeighbourhoodChain(o.storeChain) &&
        (o.distanceKm ?? 99) <= 2,
    )
    .sort((a, b) => a.price - b.price)
    .slice(0, 8);
  const headingPlace = expanded ? "beyond 2 km" : placeLabel;
  const unread = (notesQ.data ?? []).filter((n) => !n.readAt).length;
  const coverage = coverageQ.data;
  const authReady = hydrated && !isPending;

  function applyArea(city: string, area: Area | null, sample: Area) {
    const locn = area ?? sample;
    setLocation({
      onboarded: true,
      city,
      country: locn.country,
      areaId: area?.id ?? null,
      areaName: area?.name ?? null,
      lat: locn.latitude,
      lng: locn.longitude,
      currencyCode: locn.currencyCode,
      currencySymbol: locn.currencySymbol,
    });
  }

  return (
    <main className="px-4 pb-8 pt-5">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src="/app-icon.png" alt="My Offers" className="size-10 rounded-lg" />
          <button type="button" onClick={() => setLocOpen(true)} className="text-left">
            <span className="block text-xs font-medium uppercase tracking-wide text-muted">
              {greeting}
            </span>
            <span className="flex items-center gap-1 font-display text-base font-semibold">
              {loc.areaName ? loc.areaName : (loc.city ?? "Choose city")}
              <ChevronDown className="size-4 text-subtle" />
            </span>
          </button>
        </div>
        <div className="flex items-center gap-1">
          {authReady && user ? (
            <button
              type="button"
              className="grid size-11 place-items-center rounded-lg hover:bg-surface-2"
              aria-label="Scan sources"
              onClick={() => {
                setScanOpen(true);
                setScanLog(["Connecting collectors…"]);
                crawl.mutate();
              }}
            >
              <Radar className="size-5 text-primary" />
            </button>
          ) : null}
          <Link
            to="/notifications"
            className="relative grid size-11 place-items-center rounded-lg hover:bg-surface-2"
            aria-label="Alerts"
          >
            <Bell className="size-5" />
            {unread > 0 ? (
              <span className="absolute right-2 top-2 size-2 rounded-full bg-secondary" />
            ) : null}
          </Link>
        </div>
      </header>

      <div className="mt-4">
        <SearchBar
          value={q}
          onChange={setQ}
          onSubmit={() => navigate({ to: "/search", search: { q } })}
        />
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-muted">Within 2 km first</span>
          <Link to="/search" search={{ mode: "item" }} className="font-medium text-primary">
            Find an item
          </Link>
        </div>
        <SearchChips
          value={q}
          onSelect={(next) => {
            setQ(next);
            if (next) navigate({ to: "/search", search: { q: next } });
          }}
        />
      </div>

      {coverage ? (
        <p className="mt-3 text-xs text-muted">
          {coverage.activeSources} live sources · {coverage.offerCount} offers · 2 km first
          {coverage.lastCrawledAt ? ` · scanned ${relativeTime(coverage.lastCrawledAt)}` : ""}
        </p>
      ) : (
        <p className="mt-3 text-xs text-muted">Indexing grocery sources in {loc.city ?? "your city"}…</p>
      )}

      <div className="mt-4">
        <CategoryPills value={category} onChange={setCategory} />
      </div>

      {authReady && user && priQ.data && priQ.data.length > 0 ? (
        <section className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">Watching</h2>
            <Link to="/priorities" className="text-xs font-medium text-primary">
              Edit
            </Link>
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {priQ.data.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setQ(p.itemName)}
                className="h-10 shrink-0 rounded-full bg-secondary-soft px-3 text-sm font-medium text-pin"
              >
                {p.itemName}
              </button>
            ))}
          </div>
        </section>
      ) : authReady && !user ? (
        <Link
          to="/login"
          className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-primary-soft text-primary">
            <Star className="size-5" />
          </span>
          <span className="text-sm">
            <span className="block font-medium">Watch سبزی، دال، گوشت، دودھ</span>
            <span className="text-muted">Sign in to pin vegetables, daal, meat, milk, and cold drinks.</span>
          </span>
        </Link>
      ) : (
        <div className="mt-5 h-16" aria-hidden />
      )}

      {offersQ.isPending ? (
        <div className="mt-5 space-y-3">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
      ) : offersQ.isError ? (
        <EmptyState
          icon={Radar}
          title="Couldn’t load offers"
          body="The catalog is still warming up. Try another city or scan again in a moment."
          action={
            <Button type="button" variant="outline" onClick={() => void offersQ.refetch()}>
              Retry
            </Button>
          }
        />
      ) : offers.length === 0 ? (
        <EmptyState
          icon={Radar}
          title="No offers in this area yet"
          body="Switch neighbourhoods or run a source scan after you sign in."
          action={
            <Button type="button" onClick={() => setLocOpen(true)}>
              Change city
            </Button>
          }
        />
      ) : (
        <>
          {expanded ? (
            <p className="mt-5 rounded-xl bg-secondary-soft px-3 py-2 text-sm text-pin">
              Nothing within 2 km of {placeLabel}. Showing the next grocery deals out of range.
            </p>
          ) : null}
          <section className="mt-5">
            <h2 className="font-display text-sm font-semibold">Markets within 2 km</h2>
            <p className="mb-2 text-xs text-muted" dir="auto">
              {loc.city === "Karachi"
                ? "Official Karachi list for sabzi, meat, milk, and daal. The lower number is the mandi or bachat rate. A superstore shelf can be higher."
                : "Printed prices inside 2 km only. West Zone fresh board 28–30 Oct, and Day to Day Union from 29 Oct. Talal, Madina, and Faaz open on their portal until that shop prints a tag."}{" "}
              پښتون او پاکستاني کورنۍ
            </p>
            <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {BAZAAR_PINS.map((pin) => {
                const area = (areasQ.data ?? []).find((a) => a.name === pin.area);
                const on = loc.areaName === pin.area;
                return (
                  <button
                    key={pin.area}
                    type="button"
                    disabled={!area}
                    onClick={() => {
                      if (!area) return;
                      applyArea(area.city, area, area);
                    }}
                    className={`h-10 shrink-0 rounded-full px-3 text-xs font-medium ${
                      on ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg"
                    }`}
                  >
                    {pin.label}
                  </button>
                );
              })}
            </div>
            {marketOffers.length > 0 ? (
              <div className="space-y-2">
                {marketOffers.map((o) => {
                  const href = o.storeWebsite || o.sourceUrl;
                  const km = o.distanceKm == null ? "" : `${o.distanceKm < 0.15 ? "Nearby" : `${o.distanceKm.toFixed(1)} km`}`;
                  return (
                    <a
                      key={o.storeId}
                      href={href ?? undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-3"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{o.storeName}</span>
                        <span className="block truncate text-xs text-muted">
                          {[o.storeAddress, km].filter(Boolean).join(" · ")}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs font-medium text-primary">Open</span>
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-xl bg-surface-2 px-3 py-2 text-xs text-muted">
                None of those shops sit inside 2 km of {placeLabel}. Open Deira, Day to Day Nahda,
                Ajman, Sonapur, or Karachi rates.
              </p>
            )}
            {lowest.length > 0 ? (
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-medium">Lowest printed prices</h3>
                <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {lowest.map((o) => (
                    <div key={o.id} className="w-[17.5rem] shrink-0">
                      <OfferCard offer={o} compact />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {loc.lat != null && loc.lng != null ? (
              <div className="mt-2 flex flex-wrap gap-2">
                <a
                  href={groceryMapUrl(loc.lat, loc.lng)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary-soft px-3 py-2 text-xs font-medium text-primary"
                >
                  Every grocery & general store
                </a>
                <a
                  href={neighbourhoodMapUrl(loc.lat, loc.lng)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-surface-2 px-3 py-2 text-xs font-medium text-fg"
                >
                  Talal, Faaz, Day to Day…
                </a>
              </div>
            ) : null}
          </section>
          {sections.length === 0 && otherHere.length === 0 ? (
            <p className="mt-4 rounded-xl bg-surface-2 px-3 py-3 text-sm text-muted">
              No printed shelf price inside 2 km today. Open a store above — that portal is the real
              price. A tag is shown here only after it is copied from the store or the official list.
            </p>
          ) : null}
          {forYou.length > 0 ? (
            <section className="mt-5">
              <h2 className="font-display text-sm font-semibold">For you in {loc.city ?? placeLabel}</h2>
              <p className="mb-3 text-xs text-muted" dir="auto">
                Free AI subscriptions, family vacations, and air tickets from your city · آپ کے لیے
              </p>
              <div className="space-y-5">
                {FOR_YOU_SECTIONS.map((section) => {
                  const items = forYou.filter((o) => o.category === section.id);
                  if (!items.length) return null;
                  return (
                    <div key={section.id}>
                      <h3 className="text-sm font-medium">
                        <span className="me-1" aria-hidden>
                          {section.emoji}
                        </span>
                        {section.title}
                      </h3>
                      <p className="mb-2 text-xs text-muted">
                        <bdi>{section.ur}</bdi>
                        <span aria-hidden> · </span>
                        <bdi>{section.hi}</bdi>
                      </p>
                      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {items.map((o) => (
                          <div key={o.id} className="w-[17.5rem] shrink-0">
                            <OfferCard offer={o} compact />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}
          {sections.map((section) => (
            <section key={section.rank} className="mt-6">
              <h2 className="font-display text-sm font-semibold">
                <span className="me-1" aria-hidden>
                  {section.emoji}
                </span>
                {section.title} {expanded ? headingPlace : `in ${headingPlace}`}
              </h2>
              <p className="mb-2 text-xs text-muted" dir="auto">
                {section.ur} · {section.hi} · closest address first
              </p>
              <div className="space-y-3">
                {section.items.map((o, i) => (
                  <OfferCard
                    key={o.id}
                    offer={o}
                    featured={i === 0 && section.rank === sections[0]?.rank}
                    kicker={
                      o.description?.toLowerCase().includes("bachat")
                        ? "Mandi rate"
                        : expanded
                          ? "Beyond 2 km"
                          : `${placeLabel} · closest`
                    }
                  />
                ))}
              </div>
            </section>
          ))}
          {otherHere.length > 0 ? (
            <section className="mt-6">
              <h2 className="mb-2 font-display text-sm font-semibold">
                Also {expanded ? headingPlace : `in ${placeLabel}`}
              </h2>
              <div className="space-y-3">
                {otherHere.map((o) => (
                  <OfferCard key={o.id} offer={o} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}

      <SlideUp open={locOpen} onClose={() => setLocOpen(false)} title="Your area">
        <LocationPicker
          areas={areasQ.data ?? []}
          city={loc.city}
          areaId={loc.areaId}
          onSelectCity={(c, sample) => applyArea(c, null, sample)}
          onSelectArea={(a) => {
            const sample = (areasQ.data ?? []).find((x) => x.city === (a?.city ?? loc.city));
            if (!sample && !a) return;
            applyArea(a?.city ?? loc.city ?? sample!.city, a, a ?? sample!);
          }}
        />
        <Button className="mt-4 w-full" onClick={() => setLocOpen(false)}>
          Done
        </Button>
      </SlideUp>

      <SlideUp open={scanOpen} onClose={() => setScanOpen(false)} title="Source scan">
        <p className="mb-3 text-sm text-muted">
          Collectors check store sites, Facebook, Twitter, WhatsApp, Instagram, Pinterest, web
          search, and local listings, then keep the unique ones.
        </p>
        <ol className="space-y-2 font-mono text-xs text-muted">
          {(crawl.isPending ? [...scanLog, "Still collecting…"] : scanLog).map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
        {authReady && !user ? (
          <p className="mt-3 text-sm text-muted">
            Sign in to run a live crawl across store sites and social sources.
          </p>
        ) : null}
      </SlideUp>
    </main>
  );
}
