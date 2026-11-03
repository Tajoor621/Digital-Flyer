import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="size-7" strokeWidth={1.75} />
      </span>
      <h2 className="font-display text-lg font-semibold text-fg">{title}</h2>
      <p className="max-w-xs text-sm leading-relaxed text-muted">{body}</p>
      {action}
    </div>
  );
}
