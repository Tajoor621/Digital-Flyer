import {
  Apple,
  Beef,
  Coffee,
  Cookie,
  Croissant,
  Heart,
  Milk,
  Snowflake,
  Plane,
  Sparkles,
  SprayCan,
  TreePalm,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import type { CategoryId } from "@/lib/offers/types";

const MAP: Record<CategoryId, LucideIcon> = {
  produce: Apple,
  dairy: Milk,
  meat: Beef,
  bakery: Croissant,
  pantry: Wheat,
  frozen: Snowflake,
  beverages: Coffee,
  snacks: Cookie,
  household: SprayCan,
  personal: Heart,
  digital: Sparkles,
  vacation: TreePalm,
  flights: Plane,
};

export function CategoryIcon({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const Icon = MAP[id as CategoryId] ?? Apple;
  return <Icon className={className} strokeWidth={1.75} />;
}
