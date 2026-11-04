import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/location-store-fdDqKGdW.js
var defaults = {
	onboarded: true,
	city: "Dubai",
	country: "United Arab Emirates",
	areaId: 23,
	areaName: "Al Murar",
	lat: 25.2675,
	lng: 55.3117,
	currencyCode: "AED",
	currencySymbol: "AED"
};
var useLocationStore = create()(persist((set) => ({
	...defaults,
	setLocation: (loc) => set((s) => ({
		...s,
		...loc
	})),
	reset: () => set({ ...defaults })
}), { name: "my-offers-location-v7" }));
//#endregion
export { useLocationStore as t };
