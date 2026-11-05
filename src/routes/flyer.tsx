import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/lib/use-hydrated";
import { useLocationStore } from "@/lib/location-store";
import { SOURCE_LABELS, isForYouCategory } from "@/lib/offers/categories";
import { formatMoney } from "@/lib/offers/format";
import { KITCHEN_SECTIONS, stapleRank } from "@/lib/offers/search-index";
import { withinRadius } from "@/lib/offers/radius";
import { useOffers } from "@/lib/offers/use-offers";
import type { Offer } from "@/lib/offers/types";

export const Route = createFileRoute("/flyer")({
  head: () => ({
    meta: [
      { title: "Neighbourhood flyer · My Offers" },
      {
        name: "description",
        content:
          "A one-page reading of sabzi, milk, meat, and pantry tags near you. Every deal. Everywhere. Just for you.",
      },
    ],
  }),
  component: FlyerPage,
});

function lineText(offer: Offer): string {
  const money = formatMoney(offer.price, offer.currencySymbol, offer.currencyCode, offer.unit);
  const unit = offer.unit && offer.unit !== "portal" ? ` ${offer.unit}` : "";
  return `${offer.itemName}${unit} — ${money} at ${offer.storeName}`;
}

function FlyerPage() {
  const loc = useLocationStore();
  const hydrated = useHydrated();
  const offersQ = useOffers({ sort: "price" });
  const [sharing, setSharing] = useState(false);
  const place = loc.areaName ?? loc.city ?? "your neighbourhood";
  const when = hydrated
    ? new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })
    : "";

  const offers = offersQ.data ?? [];
  const grocery = offers.filter((offer) => !isForYouCategory(offer.category) && offer.unit !== "portal");
  const scope = withinRadius(grocery);
  const priced = scope.offers.filter((offer) => offer.price > 0);
  const sections = KITCHEN_SECTIONS.map((section) => ({
    ...section,
    items: priced
      .filter((offer) => stapleRank(offer.itemName, offer.description, offer.category) === section.rank)
      .sort((a, b) => a.price - b.price),
  })).filter((section) => section.items.length > 0);
  const other = priced.filter((offer) => stapleRank(offer.itemName, offer.description, offer.category) >= 9);
  const forYou = offers.filter((offer) => isForYouCategory(offer.category));

  async function share() {
    const blocks = sections.map((section) => {
      const rows = section.items.slice(0, 8).map((offer) => `• ${lineText(offer)}`);
      return `${section.title}\n${rows.join("\n")}`;
    });
    const text = [`My Offers — ${place}`, when, "Every deal. Everywhere. Just for you.", "", ...blocks]
      .filter(Boolean)
      .join("\n");
    setSharing(true);
    try {
      if (navigator.share) await navigator.share({ title: `My Offers flyer · ${place}`, text });
      else {
        await navigator.clipboard.writeText(text);
        toast.success("Flyer copied");
      }
    } catch {
      /* user cancelled share */
    } finally {
      setSharing(false);
    }
  }

  return (
    <main className="px-4 pb-8 pt-5">
      <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-card)">
        <header className="border-b border-dashed border-border bg-primary-soft px-4 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-primary-deep">My Offers</p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight">Neighbourhood flyer</h1>
          <p className="mt-1 text-sm text-fg">Every deal. Everywhere. Just for you.</p>
          <p className="mt-2 text-sm text-muted">
            {place}
            {when ? ` · ${when}` : ""}
            {scope.expanded ? " · next tags beyond 2 km" : " · within 2 km first"}
          </p>
        </header>

        <div className="flex gap-2 px-4 py-3 print:hidden">
          <Button type="button" variant="outline" className="flex-1" onClick={() => window.print()}>
            <Printer className="size-4" />
            Print
          </Button>
          <Button type="button" className="flex-1" onClick={() => void share()} disabled={sharing}>
            <Share2 className="size-4" />
            Share
          </Button>
        </div>

        {offersQ.isPending ? (
          <div className="space-y-3 px-4 pb-4">
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
          </div>
        ) : offersQ.isError ? (
          <p className="px-4 pb-4 text-sm text-muted" role="alert">
            The catalogue didn’t load.{" "}
            <button type="button" className="font-medium text-primary" onClick={() => void offersQ.refetch()}>
              Try again
            </button>
          </p>
        ) : sections.length === 0 && other.length === 0 ? (
          <p className="px-4 pb-4 text-sm text-muted">
            No printed shelf price for {place} yet. A store portal stays off this sheet until a tag is copied in.
          </p>
        ) : (
          <div className="px-4 pb-4">
            {sections.map((section) => (
              <section key={section.rank} className="mt-4">
                <h2 className="font-display text-sm font-semibold">
                  <span className="me-1" aria-hidden>
                    {section.emoji}
                  </span>
                  {section.title}
                </h2>
                <p className="text-xs text-muted" dir="auto">
                  {section.ur} · {section.hi}
                </p>
                <ul className="mt-1 divide-y divide-border">
                  {section.items.map((offer) => (
                    <FlyerRow key={offer.id} offer={offer} />
                  ))}
                </ul>
              </section>
            ))}
            {other.length > 0 ? (
              <section className="mt-4">
                <h2 className="font-display text-sm font-semibold">Also on the sheet</h2>
                <ul className="mt-1 divide-y divide-border">
                  {other.map((offer) => (
                    <FlyerRow key={offer.id} offer={offer} />
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        )}

        {forYou.length > 0 ? (
          <section className="border-t border-dashed border-border px-4 py-4">
            <h2 className="font-display text-sm font-semibold">For you</h2>
            <p className="text-xs text-muted">Free AI tools, vacations, and air tickets stay in their own lane.</p>
            <ul className="mt-2 space-y-2">
              {forYou.slice(0, 6).map((offer) => (
                <li key={offer.id}>
                  <Link
                    to="/offers/$id"
                    params={{ id: String(offer.id) }}
                    className="text-sm font-medium text-primary"
                  >
                    {offer.itemName}
                  </Link>
                  <span className="text-xs text-muted"> · {offer.storeName}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <footer className="border-t border-border px-4 py-3 text-xs text-muted">
          Tags already in My Offers for {place}. A chain shelf can sit above a mandi rate — the row names the store
          and the source.
        </footer>
      </article>
    </main>
  );
}

function FlyerRow({ offer }: { offer: Offer }) {
  const unit = offer.unit && offer.unit !== "portal" ? offer.unit : null;
  return (
    <li>
      <Link
        to="/offers/$id"
        params={{ id: String(offer.id) }}
        className="flex items-baseline justify-between gap-3 py-3"
      >
        <span className="min-w-0">
          <span className="block text-sm font-medium">{offer.itemName}</span>
          <span className="block truncate text-xs text-muted">
            {[offer.storeName, unit, SOURCE_LABELS[offer.sourceType]].filter(Boolean).join(" · ")}
          </span>
        </span>
        <span className="shrink-0 font-display text-sm font-semibold tabular-nums text-primary-deep">
          {formatMoney(offer.price, offer.currencySymbol, offer.currencyCode, offer.unit)}
        </span>
      </Link>
    </li>
  );
}
