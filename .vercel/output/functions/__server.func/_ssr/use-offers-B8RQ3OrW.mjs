import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn } from "./utils-DL0OCngi.mjs";
import { _ as Search, t as X } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { O as useCurrentUserState, f as listOffers, p as listOffersPersonalized } from "./router-ny48Fa3Z.mjs";
import { t as Input } from "./input-BZxaWNiG.mjs";
import { t as CATEGORIES } from "./categories-C_PyKy0I.mjs";
import { n as QUICK_SEARCHES } from "./format-CLSKePSg.mjs";
import { t as useLocationStore } from "./location-store-fdDqKGdW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-offers-B8RQ3OrW.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPills({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		children: CATEGORIES.map((c) => {
			const active = value === c.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(active ? void 0 : c.id),
				className: cn("flex h-10 shrink-0 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors duration-150", active ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface text-fg hover:bg-surface-2"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: c.emoji
				}), c.label]
			}, c.id);
		})
	});
}
function SearchBar({ value, onChange, onSubmit, placeholder = "دودھ، چاول، سبزی…  milk, rice, 🥬" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => {
			e.preventDefault();
			onSubmit?.();
		},
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			dir: "auto",
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "rounded-xl pl-10",
			"aria-label": "Search offers"
		})]
	});
}
function SearchChips({ value, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		children: QUICK_SEARCHES.map((s) => {
			const active = value === s.q || value === s.label;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelect(active ? "" : s.q),
				className: cn("flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm", active ? "border-secondary bg-secondary-soft text-pin" : "border-border bg-surface text-fg"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: s.emoji
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: s.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						dir: "auto",
						children: [
							s.ur,
							" · ",
							s.hi
						]
					})
				]
			}, s.q);
		})
	});
}
function SlideUp({ open, onClose, title, children }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close",
			className: "absolute inset-0 bg-fg/40",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-x-0 bottom-0 mx-auto max-w-lg rounded-t-2xl bg-surface p-4 pb-8 shadow-(--shadow-float)",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2",
					"aria-label": "Close sheet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), children]
		})]
	});
}
function withinRadius(offers, maxKm) {
	if (maxKm != null) return {
		offers: offers.filter((o) => o.distanceKm == null || o.distanceKm <= maxKm),
		expanded: false
	};
	const near = offers.filter((o) => o.distanceKm != null && o.distanceKm <= 2);
	if (near.length > 0) return {
		offers: near,
		expanded: false
	};
	if (offers.length > 0) return {
		offers,
		expanded: true
	};
	return {
		offers: [],
		expanded: false
	};
}
function useLocationFilters() {
	const loc = useLocationStore();
	return {
		city: loc.city ?? void 0,
		areaId: loc.areaId ?? void 0,
		originLat: loc.lat ?? void 0,
		originLng: loc.lng ?? void 0
	};
}
function useOffers(extra = {}, enabled = true) {
	const filters = {
		...useLocationFilters(),
		...extra
	};
	const { user, isPending } = useCurrentUserState();
	return useQuery({
		queryKey: [
			"offers",
			filters,
			user?.id ?? "guest"
		],
		enabled: enabled && !isPending,
		queryFn: () => user ? listOffersPersonalized({ data: filters }) : listOffers({ data: filters })
	});
}
//#endregion
export { useLocationFilters as a, SlideUp as i, SearchBar as n, useOffers as o, SearchChips as r, withinRadius as s, CategoryPills as t };
