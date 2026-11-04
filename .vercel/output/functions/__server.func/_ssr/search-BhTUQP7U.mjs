import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn } from "./utils-DL0OCngi.mjs";
import { _ as Search, p as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as Route$3, v as listStores } from "./router-ny48Fa3Z.mjs";
import { t as Input } from "./input-BZxaWNiG.mjs";
import { t as Button } from "./button-CdVRdV7b.mjs";
import { t as Skeleton } from "./skeleton-BiJ-i5hr.mjs";
import { a as SOURCE_LABELS, s as isForYouCategory } from "./categories-C_PyKy0I.mjs";
import { n as QUICK_SEARCHES, u as spellingHint } from "./format-CLSKePSg.mjs";
import { t as EmptyState } from "./empty-state-Dy6laBx_.mjs";
import { t as useLocationStore } from "./location-store-fdDqKGdW.mjs";
import { o as isChainQuery } from "./local-markets-ciOB0wuY.mjs";
import { t as OfferCard } from "./offer-card-CbVvZ8a2.mjs";
import { a as useLocationFilters, i as SlideUp, n as SearchBar, o as useOffers, r as SearchChips, s as withinRadius, t as CategoryPills } from "./use-offers-B8RQ3OrW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BhTUQP7U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SORTS = [
	{
		id: "nearby",
		label: "Closest"
	},
	{
		id: "recent",
		label: "Newest"
	},
	{
		id: "discount",
		label: "Biggest cut"
	},
	{
		id: "price",
		label: "Lowest price"
	},
	{
		id: "ending",
		label: "Ending soon"
	}
];
function SearchPage() {
	const { q: qParam, mode } = Route$3.useSearch();
	const itemMode = mode === "item";
	const navigate = useNavigate();
	const loc = useLocationStore();
	const base = useLocationFilters();
	const [q, setQ] = (0, import_react.useState)(qParam ?? "");
	(0, import_react.useEffect)(() => {
		setQ(qParam ?? "");
	}, [qParam]);
	const [category, setCategory] = (0, import_react.useState)();
	const [sort, setSort] = (0, import_react.useState)("nearby");
	const [sourceType, setSourceType] = (0, import_react.useState)();
	const [storeId, setStoreId] = (0, import_react.useState)();
	const [maxKm, setMaxKm] = (0, import_react.useState)();
	const [maxPrice, setMaxPrice] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const storesQ = useQuery({
		queryKey: ["stores", loc.city],
		queryFn: () => listStores({ data: { city: loc.city ?? void 0 } })
	});
	const offersQ = useOffers({
		...base,
		search: q.trim() || void 0,
		category: itemMode ? void 0 : category,
		sort,
		sourceType,
		storeId,
		maxKm,
		maxPrice: maxPrice ? Number(maxPrice) : void 0
	});
	const raw = offersQ.data ?? [];
	const chainHunt = isChainQuery(q);
	const forYou = raw.filter((o) => isForYouCategory(o.category));
	const grocery = raw.filter((o) => !isForYouCategory(o.category));
	const groceryScope = chainHunt ? {
		offers: grocery,
		expanded: grocery.some((o) => (o.distanceKm ?? 99) > 2)
	} : withinRadius(grocery, maxKm);
	const offers = [...forYou, ...groceryScope.offers];
	const expanded = groceryScope.expanded;
	const hint = q.trim() ? spellingHint(q) : null;
	const place = loc.areaName ?? loc.city ?? "you";
	const cityLabel = loc.city ?? place;
	const where = offersQ.isPending ? "Searching…" : chainHunt ? `${offers.length} real ${q.trim()} branch${offers.length === 1 ? "" : "es"} · nearest first, with the portal on the card` : forYou.length === 0 ? expanded ? `Nothing within 2 km of ${place} · ${offers.length} farther offer${offers.length === 1 ? "" : "s"}` : `${offers.length} within ${maxKm ?? 2} km of ${place}` : groceryScope.offers.length === 0 ? `${forYou.length} for you in ${cityLabel}` : expanded ? `${forYou.length} for you in ${cityLabel} · ${groceryScope.offers.length} farther grocery offer${groceryScope.offers.length === 1 ? "" : "s"}` : `${groceryScope.offers.length} within ${maxKm ?? 2} km of ${place} · ${forYou.length} for you`;
	function setMode(next) {
		navigate({
			to: "/search",
			search: {
				q: q.trim() || void 0,
				mode: next === "item" ? "item" : void 0
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-8 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 grid grid-cols-2 rounded-xl bg-surface-2 p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode("deals"),
					className: cn("h-10 rounded-lg text-sm font-medium", !itemMode ? "bg-surface text-fg shadow-(--shadow-card)" : "text-muted"),
					children: "Nearby deals"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode("item"),
					className: cn("h-10 rounded-lg text-sm font-medium", itemMode ? "bg-surface text-fg shadow-(--shadow-card)" : "text-muted"),
					children: "Find an item"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {
						value: q,
						onChange: setQ,
						placeholder: itemMode ? "Item name — tamato, chiken, ٹماٹر" : "دودھ، چاول، سبزی…  milk, rice"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(true),
					className: "grid size-11 place-items-center rounded-lg border border-border bg-surface",
					"aria-label": "Filters",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" })
				})]
			}),
			itemMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
				children: QUICK_SEARCHES.map((s) => {
					const active = q.toLowerCase() === s.label.toLowerCase();
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setQ(active ? "" : s.label),
						className: cn("flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm", active ? "border-secondary bg-secondary-soft text-pin" : "border-border bg-surface text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							dir: "auto",
							children: s.ur
						})]
					}, s.label);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchChips, {
				value: q,
				onSelect: setQ
			}),
			itemMode ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPills, {
					value: category,
					onChange: setCategory
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
				children: SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSort(s.id),
					className: `h-9 shrink-0 rounded-full px-3 text-xs font-medium ${sort === s.id ? "bg-fg text-bg" : "bg-surface-2 text-muted"}`,
					children: s.label
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted",
				children: [
					offersQ.isPending ? "Searching…" : where,
					itemMode ? " · names only, spelling can be off" : " · اردو، हिंदी, English, or emoji",
					hint ? ` · matched ${hint}` : ""
				]
			}),
			itemMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "Store sites, Facebook, Twitter, WhatsApp, Instagram, Pinterest, web search, and local listings."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-3",
				children: offersQ.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" })
				] }) : itemMode && !q.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Search,
					title: "Search one item",
					body: "Type the name in English, Urdu, or Hindi. No icon needed — a misspelled name still matches."
				}) : offers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Search,
					title: itemMode ? "No item under that name" : "No matching offers",
					body: itemMode ? "Try the plain name. A missing letter is fine — tamato still finds tomato." : expanded ? "Nothing in range or farther for this filter." : "Try another item, or switch to Find an item if the spelling is off."
				}) : offers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, { offer: o }, o.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideUp, {
				open,
				onClose: () => setOpen(false),
				title: "Filters",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["Max price", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1",
								inputMode: "decimal",
								value: maxPrice,
								onChange: (e) => setMaxPrice(e.target.value),
								placeholder: "Any"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["Distance", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm",
								value: maxKm ?? "",
								onChange: (e) => setMaxKm(e.target.value ? Number(e.target.value) : void 0),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "2 km, then farther"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "2",
										children: "Only within 2 km"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "5",
										children: "Within 5 km"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "10",
										children: "Within 10 km"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["Store", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm",
								value: storeId ?? "",
								onChange: (e) => setStoreId(e.target.value ? Number(e.target.value) : void 0),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "All stores"
								}), (storesQ.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: s.name
								}, s.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: ["Source", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm",
								value: sourceType ?? "",
								onChange: (e) => setSourceType(e.target.value || void 0),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "All sources"
								}), Object.keys(SOURCE_LABELS).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: SOURCE_LABELS[k]
								}, k))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: () => setOpen(false),
							children: "Apply"
						})
					]
				})
			})
		]
	});
}
//#endregion
export { SearchPage as component };
