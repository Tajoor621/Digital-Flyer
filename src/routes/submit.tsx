import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useHydrated } from "@/lib/use-hydrated";
import { CATEGORIES } from "@/lib/offers/categories";
import { listStores, submitOffer } from "@/lib/offers/queries";
import { useLocationStore } from "@/lib/location-store";

export const Route = createFileRoute("/submit")({
  head: () => ({ meta: [{ title: "Submit a price · My Offers" }] }),
  component: SubmitPage,
});

function SubmitPage() {
  const { user, isPending } = useCurrentUserState();
  const hydrated = useHydrated();
  const loc = useLocationStore();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const storesQ = useQuery({
    queryKey: ["stores", loc.city],
    queryFn: () => listStores({ data: { city: loc.city ?? undefined } }),
    enabled: Boolean(user),
  });
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("produce");
  const [storeId, setStoreId] = useState<number | "">("");
  const [price, setPrice] = useState("");
  const [original, setOriginal] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  const submit = useMutation({
    mutationFn: () =>
      submitOffer({
        data: {
          storeId: Number(storeId),
          itemName,
          category,
          price: Number(price),
          originalPrice: original ? Number(original) : null,
          unit: unit || null,
          description: description || null,
        },
      }),
    onSuccess: (res) => {
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Submitted for review");
      void qc.invalidateQueries();
      navigate({ to: "/review" });
    },
  });

  if (!hydrated || isPending) return <main className="px-4 pt-8 text-sm text-muted">Loading…</main>;
  if (!user) return <RedirectToSignIn />;

  return (
    <main className="px-4 pb-8 pt-5">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Submit a deal</h1>
      <p className="mt-1 text-sm text-muted">
        Spotted something the crawlers missed? Send it in — it stays hidden until it’s reviewed.
      </p>
      <form
        className="mt-5 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!storeId) {
            toast.error("Pick a store");
            return;
          }
          submit.mutate();
        }}
      >
        <label className="block text-sm font-medium">
          Item
          <Input
            className="mt-1"
            required
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Tomatoes, doodh, chicken"
          />
        </label>
        <label className="block text-sm font-medium">
          Category
          <select
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Store
          <select
            required
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value ? Number(e.target.value) : "")}
          >
            <option value="">Choose a store</option>
            {(storesQ.data ?? []).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-sm font-medium">
            Sale price
            <Input
              className="mt-1"
              required
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="85"
            />
          </label>
          <label className="block text-sm font-medium">
            Was
            <Input
              className="mt-1"
              inputMode="decimal"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Optional"
            />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Unit
          <Input
            className="mt-1"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="1kg, 2L…"
          />
        </label>
        <label className="block text-sm font-medium">
          Notes
          <Input
            className="mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />
        </label>
        <Button type="submit" className="w-full" disabled={submit.isPending}>
          {submit.isPending ? "Sending…" : "Submit for review"}
        </Button>
      </form>
    </main>
  );
}
