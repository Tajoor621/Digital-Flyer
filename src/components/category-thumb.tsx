import { CATEGORY_PHOTOS } from "@/lib/offers/categories";
import type { CategoryId } from "@/lib/offers/types";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "./category-icon";

export function CategoryThumb({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const src = CATEGORY_PHOTOS[id as CategoryId];
  if (src) {
    return <img src={src} alt="" className={cn("object-cover", className)} />;
  }
  return (
    <span className={cn("grid place-items-center bg-primary-soft text-primary", className)}>
      <CategoryIcon id={id} className="size-7" />
    </span>
  );
}
