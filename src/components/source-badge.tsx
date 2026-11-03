import {
  Camera,
  Globe,
  Hash,
  Image,
  MapPin,
  MessageCircle,
  MessageSquare,
  Newspaper,
  PenLine,
  Search,
  Send,
  Users,
  Video,
} from "lucide-react";
import { SOURCE_LABELS } from "@/lib/offers/categories";
import type { SourceType } from "@/lib/offers/types";
import { Badge } from "./ui/badge";

const ICONS: Record<SourceType, typeof Globe> = {
  website: Globe,
  facebook: Users,
  instagram: Camera,
  twitter: Hash,
  whatsapp: MessageCircle,
  pinterest: Image,
  search: Search,
  local: MapPin,
  tiktok: Video,
  telegram: Send,
  flyer: Newspaper,
  forum: MessageSquare,
  manual: PenLine,
};

export function SourceBadge({ type }: { type: SourceType }) {
  const Icon = ICONS[type] ?? Globe;
  return (
    <Badge tone="muted" className="gap-1">
      <Icon className="size-3" strokeWidth={2} />
      {SOURCE_LABELS[type]}
    </Badge>
  );
}
