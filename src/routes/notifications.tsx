import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useEffect } from "react";
import { EmptyState } from "@/components/empty-state";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useHydrated } from "@/lib/use-hydrated";
import { relativeTime } from "@/lib/offers/format";
import { listNotifications, markNotificationsRead } from "@/lib/offers/queries";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Alerts · My Offers" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const { user, isPending } = useCurrentUserState();
  const hydrated = useHydrated();
  const qc = useQueryClient();
  const notesQ = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => listNotifications(),
    enabled: Boolean(user),
  });
  const mark = useMutation({
    mutationFn: () => markNotificationsRead(),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  useEffect(() => {
    if (user && notesQ.data?.some((n) => !n.readAt)) mark.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, notesQ.data]);

  if (!hydrated || isPending) return <main className="px-4 pt-8 text-sm text-muted">Loading…</main>;
  if (!user) return <RedirectToSignIn />;

  const notes = notesQ.data ?? [];

  return (
    <main className="px-4 pb-8 pt-5">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Alerts</h1>
      <p className="mt-1 text-sm text-muted">
        New offers that match your watch list or pinned neighbourhoods.
      </p>
      {notes.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="You’re all caught up"
          body="When a scan finds something you watch, it shows up here."
        />
      ) : (
        <ul className="mt-4 space-y-2">
          {notes.map((n) => (
            <li key={n.id}>
              {n.offerId ? (
                <Link
                  to="/offers/$id"
                  params={{ id: String(n.offerId) }}
                  className="block rounded-xl border border-border bg-surface p-4"
                >
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="mt-1 text-sm text-muted">{n.body}</p>
                  <p className="mt-2 text-xs text-subtle">{relativeTime(n.sentAt)}</p>
                </Link>
              ) : (
                <div className="rounded-xl border border-border bg-surface p-4">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="mt-1 text-sm text-muted">{n.body}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
