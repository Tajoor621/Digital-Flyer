import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useHydrated } from "@/lib/use-hydrated";
import { SUGGESTED_WATCHES } from "@/lib/offers/categories";
import { formatMoney } from "@/lib/offers/format";
import { lowestShelf, shelfReading } from "@/lib/offers/shelf";
import { useOffers } from "@/lib/offers/use-offers";
import {
  addPriorityArea,
  addPriorityItem,
  listAreas,
  listPriorityAreas,
  listPriorityItems,
  removePriorityArea,
  removePriorityItem,
} from "@/lib/offers/queries";
import { useLocationStore } from "@/lib/location-store";

export const Route = createFileRoute("/priorities")({
  head: () => ({ meta: [{ title: "Watch list · My Offers" }] }),
  component: PrioritiesPage,
});

function PrioritiesPage() {
  const { user, isPending } = useCurrentUserState();
  const hydrated = useHydrated();
  const loc = useLocationStore();
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const offersQ = useOffers({}, Boolean(user));

  const itemsQ = useQuery({
    queryKey: ["priority-items", user?.id],
    queryFn: () => listPriorityItems(),
    enabled: Boolean(user),
  });
  const areasQ = useQuery({
    queryKey: ["priority-areas", user?.id],
    queryFn: () => listPriorityAreas(),
    enabled: Boolean(user),
  });
  const allAreas = useQuery({ queryKey: ["areas"], queryFn: () => listAreas() });

  const addItem = useMutation({
    mutationFn: (itemName: string) => addPriorityItem({ data: { itemName } }),
    onSuccess: () => {
      setName("");
      void qc.invalidateQueries({ queryKey: ["priority-items"] });
    },
  });
  const delItem = useMutation({
    mutationFn: (id: number) => removePriorityItem({ data: id }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["priority-items"] }),
  });
  const addArea = useMutation({
    mutationFn: (areaId: number) => addPriorityArea({ data: areaId }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["priority-areas"] }),
  });
  const delArea = useMutation({
    mutationFn: (id: number) => removePriorityArea({ data: id }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["priority-areas"] }),
  });

  if (!hydrated || isPending) return <main className="px-4 pt-8 text-sm text-muted">Loading…</main>;
  if (!user) return <RedirectToSignIn />;

  const items = itemsQ.data ?? [];
  const priAreas = areasQ.data ?? [];
  const cityAreas = (allAreas.data ?? []).filter((a) => !loc.city || a.city === loc.city);
  const watchedAreaIds = new Set(priAreas.map((a) => a.areaId));

  return (
    <main className="px-4 pb-8 pt-5">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Watch list</h1>
      <p className="mt-1 text-sm text-muted">
        Vegetables, daal, rice, meat, milk, cold drinks, and the rest of a Pakistani kitchen.
        Nearest shop stays first — watches are badged, not bumped above a closer deal.
      </p>

      <form
        className="mt-5 flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          addItem.mutate(name.trim());
        }}
      >
        <div className="min-w-0 flex-1">
          <label htmlFor="watch-item" className="mb-1 block text-sm font-medium">
            Add an item
          </label>
          <Input
            id="watch-item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="دودھ، چاول، سبزی… or milk, rice"
            dir="auto"
          />
        </div>
        <Button type="submit" disabled={addItem.isPending}>
          Add
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTED_WATCHES.filter(
          (s) => !items.some((i) => i.itemName.toLowerCase() === s.name.toLowerCase()),
        ).map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => addItem.mutate(s.name)}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-surface-2 px-3 text-xs font-medium text-fg"
          >
            <span aria-hidden>{s.emoji}</span>
            {s.name}
          </button>
        ))}
      </div>

      <section className="mt-6">
        <h2 className="font-display text-sm font-semibold">Items</h2>
        {items.length === 0 ? (
          <EmptyState
            icon={Star}
            title="Nothing on the list yet"
            body="Add staples you buy every week. We’ll pin and notify when they go on offer."
          />
        ) : (
          <ul className="mt-2 divide-y divide-border rounded-xl border border-border bg-surface">
            {items.map((item) => (
              <li key={item.id} className="flex min-h-14 items-center justify-between px-4">
                <span className="text-sm font-medium">{item.itemName}</span>
                <button
                  type="button"
                  className="grid size-11 place-items-center text-muted hover:text-danger"
                  aria-label={`Remove ${item.itemName}`}
                  onClick={() => delItem.mutate(item.id)}
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {items.length > 0 ? (
        <ShelfReading pending={offersQ.isPending} offers={offersQ.data ?? []} watches={items} />
      ) : null}

      <section className="mt-8">
        <h2 className="font-display text-sm font-semibold">Neighbourhoods</h2>
        <p className="mt-1 text-xs text-muted">Pin whole areas so every deal there floats first.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {cityAreas.map((a) => {
            const watching = watchedAreaIds.has(a.id);
            const row = priAreas.find((p) => p.areaId === a.id);
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => {
                  if (watching && row) delArea.mutate(row.id);
                  else addArea.mutate(a.id);
                }}
                aria-pressed={watching}
                className={`inline-flex h-10 items-center gap-1 rounded-full border px-3 text-sm ${
                  watching
                    ? "border-secondary bg-secondary-soft text-pin"
                    : "border-border bg-surface"
                }`}
              >
                <MapPin className="size-3.5" />
                {a.name}
              </button>
            );
          })}
        </div>
        {cityAreas.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Pick a city on Home first.</p>
        ) : null}
      </section>
    </main>
  );
}

function ShelfReading({
  pending,
  offers,
  watches,
}: {
  pending: boolean;
  offers: Parameters<typeof lowestShelf>[0];
  watches: { itemName: string }[];
}) {
  const lines = lowestShelf(offers, watches);
  const reading = shelfReading(lines);
  return (
    <section className="mt-8">
      <h2 className="font-display text-sm font-semibold">Lowest tags</h2>
      <p className="mt-1 text-xs text-muted">
        The cheapest printed price already on file for each watch. Shops and units differ, so a sum is a
        reading, not a bill.
      </p>
      {pending ? (
        <p className="mt-3 text-sm text-muted">Checking nearby tags…</p>
      ) : (
        <ul className="mt-2 divide-y divide-border rounded-xl border border-border bg-surface">
          {lines.map((line) => (
            <li key={line.itemName} className="flex min-h-14 items-center justify-between gap-3 px-4 py-2">
              <span className="text-sm font-medium">{line.itemName}</span>
              {line.offer ? (
                <Link
                  to="/offers/$id"
                  params={{ id: String(line.offer.id) }}
                  className="text-right text-sm text-primary"
                >
                  <span className="block font-semibold tabular-nums">
                    {formatMoney(
                      line.offer.price,
                      line.offer.currencySymbol,
                      line.offer.currencyCode,
                      line.offer.unit,
                    )}
                  </span>
                  <span className="block text-xs text-muted">{line.offer.storeName}</span>
                </Link>
              ) : (
                <span className="text-xs text-muted">No printed tag nearby</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {reading ? (
        <p className="mt-2 text-sm text-muted">
          Those {reading.count} tags add up to{" "}
          <span className="font-semibold tabular-nums text-fg">
            {formatMoney(reading.total, reading.currencySymbol, reading.currencyCode)}
          </span>
          .
        </p>
      ) : null}
    </section>
  );
}
