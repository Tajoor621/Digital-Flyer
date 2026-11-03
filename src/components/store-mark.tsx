import { chainInitials, chainSlug, cn } from "@/lib/utils";

export function StoreMark({ chain, className }: { chain: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-md text-xs font-semibold tracking-tight",
        `chain-${chainSlug(chain)}`,
        className,
      )}
      aria-hidden
    >
      {chainInitials(chain)}
    </span>
  );
}
