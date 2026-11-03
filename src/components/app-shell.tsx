import { useQuery } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listNotifications } from "@/lib/offers/queries";
import { BottomNav } from "./bottom-nav";

const BARE = new Set(["/login", "/onboarding"]);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [hydrated, setHydrated] = useState(false);
  const { user, isPending } = useCurrentUserState();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const notes = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => listNotifications(),
    enabled: Boolean(user) && !isPending,
  });
  const unread = (notes.data ?? []).filter((n) => !n.readAt).length;

  if (BARE.has(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="app-ambient min-h-dvh">
      <div className="relative mx-auto min-h-dvh max-w-lg bg-bg pb-20 shadow-(--shadow-card)">
        {hydrated ? null : (
          <span className="sr-only">My Offers — Every deal. Everywhere. Just for you.</span>
        )}
        {children}
        <BottomNav unread={unread} />
      </div>
    </div>
  );
}
