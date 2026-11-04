import { CATEGORIES } from "@/lib/offers/categories";
import { cn } from "@/lib/utils";

export function CategoryPills({
  value,
  onChange,
}: {
  value?: string;
  onChange: (id: string | undefined) => void;
}) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATEGORIES.map((c) => {
        const active = value === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(active ? undefined : c.id)}
            className={cn(
              "flex h-10 shrink-0 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors duration-150",
              active
                ? "border-primary bg-primary text-primary-fg"
                : "border-border bg-surface text-fg hover:bg-surface-2",
            )}
          >
            <span aria-hidden>{c.emoji}</span>
            {c.label}
          </button>
        );
      })}
    </div>
  );
}