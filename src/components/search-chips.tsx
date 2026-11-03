import { QUICK_SEARCHES } from "@/lib/offers/search-index";
import { cn } from "@/lib/utils";

export function SearchChips({
  value,
  onSelect,
}: {
  value?: string;
  onSelect: (q: string) => void;
}) {
  return (
    <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {QUICK_SEARCHES.map((s) => {
        const active = value === s.q || value === s.label;
        return (
          <button
            key={s.q}
            type="button"
            onClick={() => onSelect(active ? "" : s.q)}
            className={cn(
              "flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm",
              active
                ? "border-secondary bg-secondary-soft text-pin"
                : "border-border bg-surface text-fg",
            )}
          >
            <span aria-hidden>{s.emoji}</span>
            <span className="font-medium">{s.label}</span>
            <span className="text-xs text-muted" dir="auto">
              {s.ur} · {s.hi}
            </span>
          </button>
        );
      })}
    </div>
  );
}
