import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CheckCircle2, ClipboardList, Radar } from "lucide-react";
import { toast } from "sonner";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { useHydrated } from "@/lib/use-hydrated";
import { useLocationStore } from "@/lib/location-store";
import { getCoverage, getProfile, listSources, saveProfile } from "@/lib/offers/queries";
import { SOURCE_LABELS } from "@/lib/offers/categories";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { relativeTime } from "@/lib/offers/format";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user, isPending } = useCurrentUserState();
  const hydrated = useHydrated();
  const display = useCurrentUser();
  const loc = useLocationStore();
  const qc = useQueryClient();

  const profileQ = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfile(),
    enabled: Boolean(user),
  });
  const sourcesQ = useQuery({ queryKey: ["sources"], queryFn: () => listSources() });
  const coverageQ = useQuery({
    queryKey: ["coverage", loc.city],
    queryFn: () => getCoverage({ data: { city: loc.city ?? undefined } }),
  });

  const save = useMutation({
    mutationFn: (patch: { notifyEnabled?: boolean; notifyPriorityOnly?: boolean }) =>
      saveProfile({ data: patch }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Saved");
    },
  });

  async function enablePush() {
    if (!("Notification" in window)) {
      toast.error("This browser does not support notifications.");
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      toast.success("Browser alerts enabled for this device");
      new Notification("My Offers", { body: "We’ll ping you when a watched item drops." });
    } else toast.error("Notifications were blocked.");
  }

  const profile = profileQ.data;
  const coverage = coverageQ.data;

  return (
    <main className="px-4 pb-8 pt-5">
      <h1 className="font-display text-2xl font-semibold tracking-tight">You</h1>
      <div className="mt-4 rounded-xl border border-border bg-surface p-4">
        {!hydrated || isPending ? (
          <div className="h-8 w-40 animate-pulse rounded-full bg-surface-2" />
        ) : user ? (
          <UserButton />
        ) : (
          <div>
            <p className="text-sm text-muted">Sign in to save watches across devices.</p>
            <Button className="mt-3" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        )}
        <p className="mt-3 text-xs text-muted">
          Shopping in {loc.areaName ? `${loc.areaName}, ` : ""}
          {loc.city ?? "an unknown city"}
        </p>
        <Button className="mt-3" variant="outline" size="sm" asChild>
          <Link to="/onboarding">Change city</Link>
        </Button>
        {display?.primaryEmail ? (
          <p className="text-xs text-subtle">{display.primaryEmail}</p>
        ) : null}
      </div>

      {user ? (
        <section className="mt-5 rounded-xl border border-border bg-surface p-4">
          <h2 className="flex items-center gap-2 font-display text-sm font-semibold">
            <Bell className="size-4" /> Alerts
          </h2>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Notify on new matches</p>
              <p className="text-xs text-muted">In-app alerts when a scan finds a watch-list hit</p>
            </div>
            <Switch
              checked={profile?.notifyEnabled ?? true}
              onCheckedChange={(v) => save.mutate({ notifyEnabled: v })}
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Priority only</p>
              <p className="text-xs text-muted">Skip deals that are not on your list or area pins</p>
            </div>
            <Switch
              checked={profile?.notifyPriorityOnly ?? true}
              onCheckedChange={(v) => save.mutate({ notifyPriorityOnly: v })}
            />
          </div>
          <Button className="mt-4 w-full" variant="outline" type="button" onClick={enablePush}>
            Enable device notifications
          </Button>
        </section>
      ) : null}

      <section className="mt-5 grid grid-cols-2 gap-2">
        <Link
          to="/submit"
          className="rounded-xl border border-border bg-surface p-4 text-sm font-medium"
        >
          <ClipboardList className="mb-2 size-5 text-primary" />
          Submit a deal
        </Link>
        <Link
          to="/review"
          className="rounded-xl border border-border bg-surface p-4 text-sm font-medium"
        >
          <CheckCircle2 className="mb-2 size-5 text-accent" />
          Review queue
          {coverage?.pendingReview ? (
            <span className="mt-1 block text-xs text-muted">{coverage.pendingReview} pending</span>
          ) : null}
        </Link>
      </section>

      <section className="mt-5 rounded-xl border border-border bg-surface p-4">
        <h2 className="flex items-center gap-2 font-display text-sm font-semibold">
          <Radar className="size-4" /> Coverage
        </h2>
        <p className="mt-2 text-sm text-muted">
          {coverage
            ? `${coverage.activeSources} collectors · last scan ${coverage.lastCrawledAt ? relativeTime(coverage.lastCrawledAt) : "pending"}`
            : "Loading coverage…"}
        </p>
        <ul className="mt-3 space-y-2">
          {(sourcesQ.data ?? []).map((s) => (
            <li key={s.id} className="flex items-center justify-between text-sm">
              <span>{s.name}</span>
              <span className="text-xs text-muted">{SOURCE_LABELS[s.type]}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
