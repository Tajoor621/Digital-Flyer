import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/empty-state";
import { OfferCard } from "@/components/offer-card";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useHydrated } from "@/lib/use-hydrated";
import { listPendingOffers, moderateOffer } from "@/lib/offers/queries";

export const Route = createFileRoute("/review")({ component: ReviewPage });

function ReviewPage() {
  const { user, isPending } = useCurrentUserState();
  const hydrated = useHydrated();
  const qc = useQueryClient();
  const pendingQ = useQuery({
    queryKey: ["pending-offers"],
    queryFn: () => listPendingOffers(),
    enabled: Boolean(user),
  });
  const mod = useMutation({
    mutationFn: (input: { id: number; action: "approve" | "reject" }) =>
      moderateOffer({ data: input }),
    onSuccess: (_, vars) => {
      toast.success(vars.action === "approve" ? "Published" : "Removed");
      void qc.invalidateQueries();
    },
  });

  if (!hydrated || isPending) return <main className="px-4 pt-8 text-sm text-muted">Loading…</main>;
  if (!user) return <RedirectToSignIn />;

  const pending = pendingQ.data ?? [];

  return (
    <main className="px-4 pb-8 pt-5">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Review</h1>
      <p className="mt-1 text-sm text-muted">
        Social posts and community submissions wait here before they hit the public feed.
      </p>
      {pending.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="Queue is clear"
          body="New social crawls and shopper submissions will land here."
        />
      ) : (
        <div className="mt-4 space-y-4">
          {pending.map((o) => (
            <div key={o.id} className="space-y-2">
              <OfferCard offer={o} />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="soft"
                  disabled={mod.isPending}
                  onClick={() => mod.mutate({ id: o.id, action: "approve" })}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  disabled={mod.isPending}
                  onClick={() => mod.mutate({ id: o.id, action: "reject" })}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
