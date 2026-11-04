import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as LocateFixed } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { u as listAreas, x as nearbyArea } from "./router-ny48Fa3Z.mjs";
import { t as Button } from "./button-CdVRdV7b.mjs";
import { t as Skeleton } from "./skeleton-BiJ-i5hr.mjs";
import { t as useLocationStore } from "./location-store-fdDqKGdW.mjs";
import { t as LocationPicker } from "./location-picker-CY8Eemv6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-C2fAHyIk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Onboarding() {
	const navigate = useNavigate();
	const setLocation = useLocationStore((s) => s.setLocation);
	const areasQ = useQuery({
		queryKey: ["areas"],
		queryFn: () => listAreas()
	});
	const areas = areasQ.data ?? [];
	const [city, setCity] = (0, import_react.useState)(null);
	const [area, setArea] = (0, import_react.useState)(null);
	const [locating, setLocating] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!city && areas.length) setCity("Dubai");
	}, [areas, city]);
	function commit(nextCity, nextArea, sample) {
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
			currencySymbol: loc.currencySymbol
		});
		navigate({ to: "/" });
	}
	async function useGps() {
		if (!navigator.geolocation) {
			toast.error("Location is not available on this device.");
			return;
		}
		setLocating(true);
		navigator.geolocation.getCurrentPosition(async (pos) => {
			try {
				const found = await nearbyArea({ data: {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				} });
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
					currencySymbol: found.area.currencySymbol
				});
				toast.success(`Locked onto ${found.area.name}, ${found.area.city}`);
				navigate({ to: "/" });
			} finally {
				setLocating(false);
			}
		}, () => {
			setLocating(false);
			toast.error("Could not read GPS. Choose a city instead.");
		}, {
			enableHighAccuracy: true,
			timeout: 8e3
		});
	}
	const sample = areas.find((a) => a.city === city) ?? areas[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-primary text-primary-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-10 pt-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/app-icon.png",
					alt: "",
					className: "size-16 rounded-2xl shadow-(--shadow-float)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-fg/80",
					children: "My Offers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 font-display text-3xl font-semibold leading-tight tracking-tight",
					children: [
						"Every deal.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Everywhere."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-sm text-sm leading-relaxed text-primary-fg/85",
					children: "Grocery offers from store sites, digital flyers, and public social posts in your city — pinned to what you actually buy."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-2xl bg-surface p-4 text-fg shadow-(--shadow-float)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold",
							children: "Where should we look?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Karachi, Lahore, and Islamabad first — then Dubai, London, and New York. Pick a neighbourhood or lock GPS."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: areasQ.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 rounded-xl" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 rounded-xl" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 rounded-xl" })
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationPicker, {
								areas,
								city,
								areaId: area?.id ?? null,
								onSelectCity: (c) => {
									setCity(c);
									setArea(null);
								},
								onSelectArea: setArea
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								disabled: !city || !sample,
								onClick: () => city && sample && commit(city, area, sample),
								children: "Show offers"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								onClick: useGps,
								disabled: locating,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, { className: "size-4" }), locating ? "Finding you…" : "Use my location"]
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Onboarding as component };
