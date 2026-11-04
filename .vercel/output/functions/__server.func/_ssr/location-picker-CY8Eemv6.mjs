import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn } from "./utils-DL0OCngi.mjs";
import { E as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/location-picker-CY8Eemv6.js
var import_jsx_runtime = require_jsx_runtime();
function groupAreas(areas) {
	const map = /* @__PURE__ */ new Map();
	for (const a of areas) {
		const list = map.get(a.city) ?? [];
		list.push(a);
		map.set(a.city, list);
	}
	const CITY_ORDER = [
		"Dubai",
		"Sharjah",
		"Ajman",
		"Karachi",
		"Lahore",
		"Islamabad",
		"London",
		"New York"
	];
	return [...map.entries()].sort((a, b) => {
		const ia = CITY_ORDER.indexOf(a[0]);
		const ib = CITY_ORDER.indexOf(b[0]);
		return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
	}).map(([city, list]) => ({
		city,
		country: list[0]?.country ?? "",
		currencyCode: list[0]?.currencyCode ?? "",
		currencySymbol: list[0]?.currencySymbol ?? "",
		areas: list
	}));
}
function LocationPicker({ areas, city, areaId, onSelectCity, onSelectArea }) {
	const groups = groupAreas(areas);
	const current = groups.find((g) => g.city === city);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-h-[70vh] flex-col gap-4 overflow-y-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-2",
			children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onSelectCity(g.city, g.areas[0]),
				className: cn("flex min-h-14 items-center justify-between rounded-xl border px-4 text-left", city === g.city ? "border-primary bg-primary-soft" : "border-border bg-surface hover:bg-surface-2"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display text-sm font-semibold",
					children: g.city
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: g.country
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: cn("size-4", city === g.city ? "text-primary" : "text-subtle") })]
			}, g.city))
		}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted",
			children: "Area"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onSelectArea(null),
				className: cn("h-10 rounded-full border px-3 text-sm font-medium", areaId == null ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface"),
				children: "Whole city"
			}), current.areas.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onSelectArea(a),
				className: cn("h-10 rounded-full border px-3 text-sm font-medium", areaId === a.id ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface"),
				children: a.name
			}, a.id))]
		})] }) : null]
	});
}
//#endregion
export { LocationPicker as t };
