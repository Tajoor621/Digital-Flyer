import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn, o as formatKm } from "./utils-DL0OCngi.mjs";
import { E as MapPin, L as Clock, b as Pin } from "../_libs/lucide-react.mjs";
import { r as CATEGORY_PHOTOS, s as isForYouCategory } from "./categories-C_PyKy0I.mjs";
import { a as formatMoney, i as endingLabel, l as relativeTime, o as itemLocal } from "./format-CLSKePSg.mjs";
import { i as StoreMark, n as CategoryIcon, r as SourceBadge, t as Badge } from "./store-mark-B-LlWiZF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offer-card-CbVvZ8a2.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryThumb({ id, className }) {
	const src = CATEGORY_PHOTOS[id];
	if (src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		className: cn("object-cover", className)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("grid place-items-center bg-primary-soft text-primary", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, {
			id,
			className: "size-7"
		})
	});
}
function OfferCard({ offer, compact = false, featured = false, kicker = "Nearest" }) {
	const ending = endingLabel(offer.endDate);
	const km = formatKm(offer.distanceKm);
	const money = formatMoney(offer.price, offer.currencySymbol, offer.currencyCode, offer.unit);
	const unitLabel = offer.unit && offer.unit !== "portal" ? offer.unit : null;
	const local = offer.unit === "portal" ? {
		emoji: "🏪",
		ur: null,
		hi: null
	} : itemLocal(offer.itemName, offer.description);
	const precise = offer.storeAddress?.trim() || [offer.areaName, offer.city].filter(Boolean).join(", ");
	const place = isForYouCategory(offer.category) ? precise : [precise, km].filter(Boolean).join(" · ");
	if (featured) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/offers/$id",
		params: { id: String(offer.id) },
		className: "block overflow-hidden rounded-2xl border border-primary/20 bg-surface shadow-(--shadow-card) transition-transform duration-150 active:scale-[0.99]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-44 overflow-hidden bg-primary-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryThumb, {
					id: offer.category,
					className: "size-full"
				}),
				offer.discountPercent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute right-3 top-3 grid size-14 place-items-center rounded-xl bg-secondary text-sm font-semibold text-secondary-fg shadow-(--shadow-float)",
					children: [offer.discountPercent, "%"]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-fg",
					children: kicker
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1 text-sm font-medium text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: place
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mt-1 font-display text-lg font-semibold leading-snug",
					children: [local.emoji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "me-1",
						children: local.emoji
					}) : null, offer.itemName]
				}),
				local.ur || local.hi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted",
					dir: "auto",
					children: [local.ur, local.hi].filter(Boolean).join(" · ")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 truncate text-sm text-muted",
					children: offer.storeName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold tabular-nums text-primary-deep",
						children: money
					}), offer.originalPrice != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tabular-nums text-subtle line-through",
						children: [formatMoney(offer.originalPrice, offer.currencySymbol, offer.currencyCode), unitLabel ? ` · ${unitLabel}` : ""]
					}) : unitLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: unitLabel
					}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { type: offer.sourceType }), ending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "secondary",
							children: ending
						}) : null]
					})]
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/offers/$id",
		params: { id: String(offer.id) },
		className: cn("block rounded-xl border border-border bg-surface p-4 shadow-(--shadow-card) transition-transform duration-150 active:scale-[0.99]", offer.isPriority && "border-secondary/40 ring-1 ring-secondary/20"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryThumb, {
				id: offer.category,
				className: "size-14 shrink-0 rounded-lg"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1 text-xs font-medium text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: place
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-sm font-semibold leading-snug text-fg",
							children: [local.emoji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "me-1",
								children: local.emoji
							}) : null, offer.itemName]
						}), offer.description?.toLowerCase().includes("bachat") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "secondary",
							className: "shrink-0",
							children: "Mandi"
						}) : offer.discountPercent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "secondary",
							className: "shrink-0 tabular-nums",
							children: [offer.discountPercent, "% off"]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex items-center gap-2 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreMark, {
							chain: offer.storeChain,
							className: "size-6 rounded-sm text-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: offer.storeName
						})]
					}),
					local.ur || local.hi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						dir: "auto",
						children: [local.ur, local.hi].filter(Boolean).join(" · ")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-semibold tabular-nums text-primary-deep",
								children: money
							}),
							offer.originalPrice != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tabular-nums text-subtle line-through",
								children: formatMoney(offer.originalPrice, offer.currencySymbol, offer.currencyCode)
							}) : null,
							unitLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: unitLabel
							}) : null
						]
					})
				]
			})]
		}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted",
			children: [
				offer.isPriority ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: "secondary",
					className: "gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3" }), "Priority"]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { type: offer.sourceType }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), relativeTime(offer.createdAt)]
				}),
				ending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: ending === "Ends today" || ending === "Ends tomorrow" ? "secondary" : "muted",
					children: ending
				}) : null
			]
		}) : null]
	});
}
//#endregion
export { OfferCard as t };
