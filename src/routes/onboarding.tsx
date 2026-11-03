import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LocateFixed } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LocationPicker } from "@/components/location-picker";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocationStore } from "@/lib/location-store";
import { listAreas, nearbyArea } from "@/lib/offers/queries";
import type { Area } from "@/lib/offers/types";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

function Onboarding() {
  const navigate = useNavigate();
  const setLocation = useLocationStore((s) => s.setLocation);
  const areasQ = useQuery({ queryKey: ["areas"], queryFn: () => listAreas() });
  const areas = areasQ.data ?? [];
  const [city, setCity] = useState<string | null>(null);
  const [area, setArea] = useState<Area | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (!city && areas.length) setCity("Dubai");
  }, [areas, city]);

  function commit(nextCity: string, nextArea: Area | null, sample: Area) {
    const loc = nextArea ?? sample;
    setLocation({
      onboarded: true,
      city: nextCity,
      country: loc.country,
      areaId: nextArea?.id ?? null,
      areaName: nextArea?.name ?? null,
      lat: loc.latitude,
      lng: loc.longitude,
      currencyCode: loc.currencyCode,
      currencySymbol: loc.currencySymbol,
    });
    navigate({ to: "/" });
  }

  async function useGps() {
    if (!navigator.geolocation) {
      toast.error("Location is not available on this device.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const found = await nearbyArea({
            data: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          });
          if (!found) {
            toast.error("No coverage near you yet — pick a city.");
            return;
          }
          setLocation({
            onboarded: true,
            city: found.area.city,
            country: found.area.country,
            areaId: found.area.id,
            areaName: found.area.name,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            currencyCode: found.area.currencyCode,
            currencySymbol: found.area.currencySymbol,
          });
          toast.success(`Locked onto ${found.area.name}, ${found.area.city}`);
          navigate({ to: "/" });
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        toast.error("Could not read GPS. Choose a city instead.");
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  const sample = areas.find((a) => a.city === city) ?? areas[0];

  return (
    <main className="min-h-dvh bg-primary text-primary-fg">
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-10 pt-12">
        <img src="/app-icon.png" alt="" className="size-16 rounded-2xl shadow-(--shadow-float)" />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-fg/80">
          My Offers
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight">
          Every deal.
          <br />
          Everywhere.
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-fg/85">
          Grocery offers from store sites, digital flyers, and public social posts in your city —
          pinned to what you actually buy.
        </p>

        <div className="mt-8 rounded-2xl bg-surface p-4 text-fg shadow-(--shadow-float)">
          <p className="font-display text-sm font-semibold">Where should we look?</p>
          <p className="mt-1 text-xs text-muted">
            Karachi, Lahore, and Islamabad first — then Dubai, London, and New York. Pick a
            neighbourhood or lock GPS.
          </p>
          <div className="mt-3">
            {areasQ.isPending ? (
              <div className="space-y-2">
                <Skeleton className="h-14 rounded-xl" />
                <Skeleton className="h-14 rounded-xl" />
                <Skeleton className="h-14 rounded-xl" />
              </div>
            ) : (
              <LocationPicker
                areas={areas}
                city={city}
                areaId={area?.id ?? null}
                onSelectCity={(c) => {
                  setCity(c);
                  setArea(null);
                }}
                onSelectArea={setArea}
              />
            )}
          </div>
          <div className="mt-4 grid gap-2">
            <Button
              type="button"
              disabled={!city || !sample}
              onClick={() => city && sample && commit(city, area, sample)}
            >
              Show offers
            </Button>
            <Button type="button" variant="outline" onClick={useGps} disabled={locating}>
              <LocateFixed className="size-4" />
              {locating ? "Finding you…" : "Use my location"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
