import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, ExternalLink, MapPin, Share2, Star } from "lucide-react";
import { toast } from "sonner";
import { CategoryIcon } from "@/components/category-icon";
import { SourceBadge } from "@/components/source-badge";
import { StoreMark } from "@/components/store-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { categoryLabel, endingLabel, formatMoney, relativeTime } from "@/lib/offers/format";
import { itemLocal } from "@/lib/offers/search-index";
import { otherShops } from "@/lib/offers/shelf";
import { addPriorityItem, getOffer, getOfferPersonalized } from "@/lib/offers/queries";
import { useOffers } from "@/lib/offers/use-offers";
import { useLocationStore } from "@/lib/location-store";
import type { Offer } from "@/lib/offers/types";
import { formatKm, haversineKm } from "@/lib/utils";

export const Route = createFileRoute("/offers/$id")({
  head: () => ({ meta: [{ title: "Offer · My Offers" }] }),
  component: OfferDetail,
});

function OfferDetail() {
  const { id } = Route.useParams();
  const numId = Number(id);
  const { user, isPending } = useCurrentUserState();
  const loc = useLocationStore();
  const qc = useQueryClient();

  const offerQ = useQuery({
    queryKey: ["offer", numId, user?.id ?? "guest"],
    enabled: Number.isFinite(numId) && !isPending,
    queryFn: () =>
      user ? getOfferPersonalized({ data: numId }) : getOffer({ data: numId }),
  });

  const watch = useMutation({
    mutationFn: (name: string) => addPriorityItem({ data: { itemName: name } }),
    onSuccess: () => {
      toast.success("Added to your watch list");
      void qc.invalidateQueries({ queryKey: ["priority-items"] });
    },
    onError: () => toast.error("Sign in to watch items"),
  });

  const peersQ = useOffers(
    { search: offerQ.data?.itemName, sort: "price" },
    Boolean(offerQ.data?.itemName),
  );

  const offer = offerQ.data;
  if (offerQ.isPending) {
    return (
      <main className="px-4 pt-5">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="mt-4 h-48 rounded-xl" />
      </main>
    );
  }
  if (!offer) {
    return (
      <main className="px-4 pt-10 text-center text-sm text-muted">This offer is gone.</main>
    );
  }
  const detail = offer;

  const dist =
    loc.lat != null && loc.lng != null && detail.storeLat != null && detail.storeLng != null
      ? formatKm(haversineKm(loc.lat, loc.lng, detail.storeLat, detail.storeLng))
      : formatKm(detail.distanceKm);
  const local = itemLocal(detail.itemName, detail.description);
  const precise = [detail.storeAddress, detail.areaName, detail.city]
    .filter((part): part is string => Boolean(part))
    .filter((part, i, all) => all.indexOf(part) === i)
    .join(", ");
  const ending = endingLabel(detail.endDate);
  const maps =
    detail.storeLat != null && detail.storeLng != null
      ? `https://www.google.com/maps/search/?api=1&query=${detail.storeLat},${detail.storeLng}`
      : detail.storeAddress
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(detail.storeAddress)}`
        : null;

  async function share() {
    const text = `${detail.itemName} at ${detail.storeName} — ${formatMoney(detail.price, detail.currencySymbol, detail.currencyCode, detail.unit)}`;
    try {
      if (navigator.share) await navigator.share({ title: "My Offers", text });
      else {
        await navigator.clipboard.writeText(text);
        toast.success("Copied offer details");
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <main className="pb-8">
      <div className="flex items-center gap-1 px-2 pt-3">
        <Link
          to="/"
          aria-label="Back to home"
          className="grid size-11 place-items-center rounded-lg hover:bg-surface-2"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <span className="font-display text-sm font-semibold">Offer</span>
      </div>

      <div className="px-4 pt-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-card)">
          <div className="flex items-center justify-center bg-primary-soft py-10 text-primary">
            <CategoryIcon id={offer.category} className="size-16" />
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {detail.discountPercent ? (
                <Badge tone="secondary">{detail.discountPercent}% off</Badge>
              ) : null}
              <Badge tone="primary">{categoryLabel(detail.category)}</Badge>
              {detail.isVerified ? <Badge tone="accent">Verified</Badge> : <Badge>Needs review</Badge>}
              {detail.isPriority ? <Badge tone="secondary">Priority</Badge> : null}
              {ending ? <Badge tone="secondary">{ending}</Badge> : null}
            </div>
            <h1 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">
              {local.emoji ? (
                <span className="me-1.5" aria-hidden>
                  {local.emoji}
                </span>
              ) : null}
              {detail.itemName}
            </h1>
            {local.ur || local.hi ? (
              <p className="mt-1 text-sm text-muted" dir="auto">
                {[local.ur, local.hi].filter(Boolean).join(" · ")}
              </p>
            ) : null}
            <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-fg">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <span>
                {[precise, dist].filter(Boolean).join(" · ")}
              </span>
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold tabular-nums text-primary-deep">
                {formatMoney(detail.price, detail.currencySymbol, detail.currencyCode, detail.unit)}
              </span>
              {detail.originalPrice != null ? (
                <span className="text-sm tabular-nums text-subtle line-through">
                  {formatMoney(detail.originalPrice, detail.currencySymbol, detail.currencyCode)}
                </span>
              ) : null}
              {detail.unit && detail.unit !== "portal" ? (
                <span className="text-sm text-muted">{detail.unit}</span>
              ) : null}
            </div>
            {detail.description ? (
              <p className="mt-3 text-sm leading-relaxed text-muted">{detail.description}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center gap-3">
            <StoreMark chain={detail.storeChain} />
            <div>
              <p className="font-display text-sm font-semibold">{detail.storeName}</p>
              <p className="text-xs text-muted">{detail.storeAddress ?? detail.areaName}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {dist ?? detail.areaName}, {detail.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              Listed {relativeTime(detail.createdAt)}
            </span>
            <SourceBadge type={detail.sourceType} />
          </div>
        </div>

        <SameItemShops current={detail} offers={peersQ.data ?? []} pending={peersQ.isPending} />

        <div className="mt-4 grid gap-2">
          <Button
            type="button"
            onClick={() => watch.mutate(detail.itemName)}
            variant="soft"
            disabled={watch.isPending}
          >
            <Star className="size-4" />
            Watch this item
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" onClick={share}>
              <Share2 className="size-4" />
              Share
            </Button>
            {maps ? (
              <Button type="button" variant="outline" asChild>
                <a href={maps} target="_blank" rel="noreferrer">
                  <MapPin className="size-4" />
                  Map
                </a>
              </Button>
            ) : (
              <Button type="button" variant="outline" disabled>
                Map
              </Button>
            )}
          </div>
          {detail.sourceUrl ? (
            <Button type="button" variant="outline" asChild>
              <a href={detail.sourceUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="size-4" />
                Open source
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  );
}

function SameItemShops({
  current,
  offers,
  pending,
}: {
  current: Offer;
  offers: Offer[];
  pending: boolean;
}) {
  const shops = otherShops(offers, current).slice(0, 6);
  if (!pending && shops.length === 0) return null;
  return (
    <section className="mt-4 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-display text-sm font-semibold">Same item nearby</h2>
      <p className="mt-1 text-xs text-muted">Other printed tags for this item, cheapest first.</p>
      {pending && shops.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Checking other shops…</p>
      ) : (
        <ul className="mt-2 divide-y divide-border">
          {shops.map((row) => (
            <li key={row.id}>
              <Link
                to="/offers/$id"
                params={{ id: String(row.id) }}
                className="flex items-baseline justify-between gap-3 py-3"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{row.itemName}</span>
                  <span className="block truncate text-xs text-muted">
                    {[row.storeName, row.areaName, formatKm(row.distanceKm)].filter(Boolean).join(" · ")}
                  </span>
                </span>
                <span className="shrink-0 font-display text-sm font-semibold tabular-nums text-primary-deep">
                  {formatMoney(row.price, row.currencySymbol, row.currencyCode, row.unit)}
                  {row.price < current.price ? <span className="sr-only"> Lower than this tag</span> : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
