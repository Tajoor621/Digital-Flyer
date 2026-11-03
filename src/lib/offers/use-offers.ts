import { useQuery } from "@tanstack/react-query";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useLocationStore } from "@/lib/location-store";
import { listOffers, listOffersPersonalized } from "./queries";
import type { ListOffersInput } from "./types";

export function useLocationFilters(): ListOffersInput {
  const loc = useLocationStore();
  return {
    city: loc.city ?? undefined,
    areaId: loc.areaId ?? undefined,
    originLat: loc.lat ?? undefined,
    originLng: loc.lng ?? undefined,
  };
}

export function useOffers(extra: ListOffersInput = {}, enabled = true) {
  const base = useLocationFilters();
  const filters = { ...base, ...extra };
  const { user, isPending } = useCurrentUserState();
  return useQuery({
    queryKey: ["offers", filters, user?.id ?? "guest"],
    enabled: enabled && !isPending,
    queryFn: () =>
      user ? listOffersPersonalized({ data: filters }) : listOffers({ data: filters }),
  });
}
