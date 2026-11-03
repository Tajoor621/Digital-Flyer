import { MapPin } from "lucide-react";
import type { Area } from "@/lib/offers/types";
import { cn } from "@/lib/utils";

export function groupAreas(areas: Area[]) {
  const map = new Map<string, Area[]>();
  for (const a of areas) {
    const list = map.get(a.city) ?? [];
    list.push(a);
    map.set(a.city, list);
  }
  const CITY_ORDER = ["Dubai", "Sharjah", "Ajman", "Karachi", "Lahore", "Islamabad", "London", "New York"];
  return [...map.entries()]
    .sort((a, b) => {
      const ia = CITY_ORDER.indexOf(a[0]);
      const ib = CITY_ORDER.indexOf(b[0]);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    })
    .map(([city, list]) => ({
      city,
      country: list[0]?.country ?? "",
      currencyCode: list[0]?.currencyCode ?? "",
      currencySymbol: list[0]?.currencySymbol ?? "",
      areas: list,
    }));
}

export function LocationPicker({
  areas,
  city,
  areaId,
  onSelectCity,
  onSelectArea,
}: {
  areas: Area[];
  city: string | null;
  areaId: number | null;
  onSelectCity: (city: string, sample: Area) => void;
  onSelectArea: (area: Area | null) => void;
}) {
  const groups = groupAreas(areas);
  const current = groups.find((g) => g.city === city);

  return (
    <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto">
      <div className="grid gap-2">
        {groups.map((g) => (
          <button
            key={g.city}
            type="button"
            onClick={() => onSelectCity(g.city, g.areas[0])}
            className={cn(
              "flex min-h-14 items-center justify-between rounded-xl border px-4 text-left",
              city === g.city
                ? "border-primary bg-primary-soft"
                : "border-border bg-surface hover:bg-surface-2",
            )}
          >
            <span>
              <span className="block font-display text-sm font-semibold">{g.city}</span>
              <span className="text-xs text-muted">{g.country}</span>
            </span>
            <MapPin className={cn("size-4", city === g.city ? "text-primary" : "text-subtle")} />
          </button>
        ))}
      </div>
      {current ? (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">Area</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSelectArea(null)}
              className={cn(
                "h-10 rounded-full border px-3 text-sm font-medium",
                areaId == null
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border bg-surface",
              )}
            >
              Whole city
            </button>
            {current.areas.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onSelectArea(a)}
                className={cn(
                  "h-10 rounded-full border px-3 text-sm font-medium",
                  areaId === a.id
                    ? "border-primary bg-primary text-primary-fg"
                    : "border-border bg-surface",
                )}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
