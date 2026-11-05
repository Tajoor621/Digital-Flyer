import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Home, Search, Star, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/priorities", label: "Watch", icon: Star },
  { to: "/notifications", label: "Alerts", icon: Bell },
  { to: "/profile", label: "You", icon: UserRound },
] as const;

export function BottomNav({ unread = 0 }: { unread?: number }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-sm print:hidden"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {ITEMS.map((item) => {
          const active =
            item.to === "/"
              ? pathname === "/"
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-14 min-w-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium",
                active ? "text-primary" : "text-muted",
              )}
            >
              <span className="relative">
                <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                {item.to === "/notifications" && unread > 0 ? (
                  <span className="absolute -right-1.5 -top-1 grid min-w-4 place-items-center rounded-full bg-secondary px-1 text-xs font-semibold text-secondary-fg">
                    <span className="sr-only">{unread} unread</span>
                    <span aria-hidden>{unread > 9 ? "9+" : unread}</span>
                  </span>
                ) : null}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
