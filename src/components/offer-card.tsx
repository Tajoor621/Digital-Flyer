import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Pin } from "lucide-react";
import { endingLabel, formatMoney, relativeTime } from "@/lib/offers/format";
import { isForYouCategory } from "@/lib/offers/categories";
import { itemLocal } from "@/lib/offers/search-index";
import type { Offer } from "@/lib/offers/types";
import { cn, formatKm } from "@/lib/utils";
import { CategoryThumb } from "./category-thumb";
import { SourceBadge } from "./source-badge";
import { StoreMark } from "./store-mark";
import { Badge } from "./ui/badge";

export function OfferCard({
  offer,
  compact = false,
  featured = false,
  kicker = "Nearest",
}: {
  offer: Offer;
  compact?: boolean;
  featured?: boolean;
  kicker?: string;
}) {
  const ending = endingLabel(offer.endDate);
  const km = formatKm(offer.distanceKm);
  const money = formatMoney(offer.price, offer.currencySymbol, offer.currencyCode, offer.unit);
  const unitLabel = offer.unit && offer.unit !== "portal" ? offer.unit : null;
  const local =
    offer.unit === "portal"
      ? { emoji: "🏪", ur: null, hi: null }
      : itemLocal(offer.itemName, offer.description);
  const precise =
    offer.storeAddress?.trim() ||
    [offer.areaName, offer.city].filter(Boolean).join(", ");
  const place = isForYouCategory(offer.category)
    ? precise
    : [precise, km].filter(Boolean).join(" · ");

  if (featured) {
    return (
      <Link
        to="/offers/$id"
        params={{ id: String(offer.id) }}
        className="block overflow-hidden rounded-2xl border border-primary/20 bg-surface shadow-(--shadow-card) transition-transform duration-150 active:scale-[0.99]"
      >
        <div className="relative h-44 overflow-hidden bg-primary-soft">
          <CategoryThumb id={offer.category} className="size-full" />
          {offer.discountPercent ? (
            <span className="absolute right-3 top-3 grid size-14 place-items-center rounded-xl bg-secondary text-sm font-semibold text-secondary-fg shadow-(--shadow-float)">
              {offer.discountPercent}%
            </span>
          ) : null}
          <p className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-fg">
            {kicker}
          </p>
        </div>
        <div className="px-4 py-4">
          <p className="flex items-center gap-1 text-sm font-medium text-fg">
            <MapPin className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{place}</span>
          </p>
            <h3 className="mt-1 font-display text-lg font-semibold leading-snug">
            {local.emoji ? (
              <span className="me-1" aria-hidden>
                {local.emoji}
              </span>
            ) : null}
            {offer.itemName}
          </h3>
          {local.ur || local.hi ? (
            <p className="mt-0.5 text-sm text-muted" dir="auto">
              {[local.ur, local.hi].filter(Boolean).join(" · ")}
            </p>
          ) : null}
          <p className="mt-0.5 truncate text-sm text-muted">{offer.storeName}</p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-2xl font-semibold tabular-nums text-primary-deep">{money}</p>
              {offer.originalPrice != null ? (
                <p className="text-xs tabular-nums text-subtle line-through">
                  {formatMoney(offer.originalPrice, offer.currencySymbol, offer.currencyCode)}
                  {unitLabel ? ` · ${unitLabel}` : ""}
                </p>
              ) : unitLabel ? (
                <p className="text-xs text-subtle">{unitLabel}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <SourceBadge type={offer.sourceType} />
              {ending ? <Badge tone="secondary">{ending}</Badge> : null}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/offers/$id"
      params={{ id: String(offer.id) }}
      className={cn(
        "block rounded-xl border border-border bg-surface p-4 shadow-(--shadow-card) transition-transform duration-150 active:scale-[0.99]",
        offer.isPriority && "border-secondary/40 ring-1 ring-secondary/20",
      )}
    >
      <div className="flex gap-3">
        <CategoryThumb id={offer.category} className="size-14 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-xs font-medium text-fg">
            <MapPin className="size-3 shrink-0 text-primary" />
            <span className="truncate">{place}</span>
          </p>
          <div className="mt-1 flex items-start justify-between gap-2">
            <h3 className="font-display text-sm font-semibold leading-snug text-fg">
              {local.emoji ? (
                <span className="me-1" aria-hidden>
                  {local.emoji}
                </span>
              ) : null}
              {offer.itemName}
            </h3>
            {offer.description?.toLowerCase().includes("bachat") ? (
              <Badge tone="secondary" className="shrink-0">
                Mandi
              </Badge>
            ) : offer.discountPercent ? (
              <Badge tone="secondary" className="shrink-0 tabular-nums">
                {offer.discountPercent}% off
              </Badge>
            ) : null}
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted">
            <StoreMark chain={offer.storeChain} className="size-6 rounded-sm text-xs" />
            <span className="truncate">{offer.storeName}</span>
          </div>
          {local.ur || local.hi ? (
            <p className="mt-1 text-xs text-muted" dir="auto">
              {[local.ur, local.hi].filter(Boolean).join(" · ")}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-display text-lg font-semibold tabular-nums text-primary-deep">{money}</span>
            {offer.originalPrice != null ? (
              <span className="text-xs tabular-nums text-subtle line-through">
                {formatMoney(offer.originalPrice, offer.currencySymbol, offer.currencyCode)}
              </span>
            ) : null}
            {unitLabel ? <span className="text-xs text-subtle">{unitLabel}</span> : null}
          </div>
        </div>
      </div>
      {!compact ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
          {offer.isPriority ? (
            <Badge tone="secondary" className="gap-1">
              <Pin className="size-3" />
              Priority
            </Badge>
          ) : null}
          <SourceBadge type={offer.sourceType} />
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {relativeTime(offer.createdAt)}
          </span>
          {ending ? (
            <Badge tone={ending === "Ends today" || ending === "Ends tomorrow" ? "secondary" : "muted"}>
              {ending}
            </Badge>
          ) : null}
        </div>
      ) : null}
    </Link>
  );
}
