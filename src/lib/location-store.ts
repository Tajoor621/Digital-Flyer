import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SavedLocation = {
  onboarded: boolean;
  city: string | null;
  country: string | null;
  areaId: number | null;
  areaName: string | null;
  lat: number | null;
  lng: number | null;
  currencyCode: string;
  currencySymbol: string;
};

type LocationState = SavedLocation & {
  setLocation: (loc: Partial<SavedLocation> & { onboarded?: boolean }) => void;
  reset: () => void;
};

const defaults: SavedLocation = {
  onboarded: true,
  city: "Dubai",
  country: "United Arab Emirates",
  areaId: 23,
  areaName: "Al Murar",
  lat: 25.2675,
  lng: 55.3117,
  currencyCode: "AED",
  currencySymbol: "AED",
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      ...defaults,
      setLocation: (loc) => set((s) => ({ ...s, ...loc })),
      reset: () => set({ ...defaults }),
    }),
    { name: "my-offers-location-v7" },
  ),
);
