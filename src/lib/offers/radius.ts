/** 2000 metres. Near deals win; farther ones appear only when this circle is empty. */
export const NEAR_RADIUS_KM = 2;

export function withinRadius<T extends { distanceKm: number | null }>(
  offers: T[],
  maxKm?: number,
): { offers: T[]; expanded: boolean } {
  if (maxKm != null) {
    return {
      offers: offers.filter((o) => o.distanceKm == null || o.distanceKm <= maxKm),
      expanded: false,
    };
  }
  const near = offers.filter((o) => o.distanceKm != null && o.distanceKm <= NEAR_RADIUS_KM);
  if (near.length > 0) return { offers: near, expanded: false };
  if (offers.length > 0) return { offers, expanded: true };
  return { offers: [], expanded: false };
}
