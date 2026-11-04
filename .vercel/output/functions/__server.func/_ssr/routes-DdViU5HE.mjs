import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { B as ChevronDown, H as Bell, l as Star, v as Radar } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { O as useCurrentUserState, d as listNotifications, g as listPriorityItems, o as getCoverage, u as listAreas, w as runCrawl } from "./router-ny48Fa3Z.mjs";
import { t as Button } from "./button-CdVRdV7b.mjs";
import { t as Skeleton } from "./skeleton-BiJ-i5hr.mjs";
import { t as useHydrated } from "./use-hydrated-C8D_C3xV.mjs";
import { i as FOR_YOU_SECTIONS, s as isForYouCategory } from "./categories-C_PyKy0I.mjs";
import { d as stapleRank, l as relativeTime, t as KITCHEN_SECTIONS } from "./format-CLSKePSg.mjs";
import { t as EmptyState } from "./empty-state-Dy6laBx_.mjs";
import { t as useLocationStore } from "./location-store-fdDqKGdW.mjs";
import { t as LocationPicker } from "./location-picker-CY8Eemv6.mjs";
import { i as groceryMapUrl, l as neighbourhoodMapUrl, s as isNeighbourhoodChain, t as BAZAAR_PINS } from "./local-markets-ciOB0wuY.mjs";
import { t as OfferCard } from "./offer-card-CbVvZ8a2.mjs";
import { i as SlideUp, n as SearchBar, o as useOffers, r as SearchChips, s as withinRadius, t as CategoryPills } from "./use-offers-B8RQ3OrW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DdViU5HE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function timeOfDayLabel() {
	const h = (/* @__PURE__ */ new Date()).getHours();
	if (h < 12) return "Morning deals";
	if (h < 17) return "Afternoon deals";
	return "Evening deals";
}
function uniqueStores(list) {
	const map = /* @__PURE__ */ new Map();
	for (const o of list) {
		const prev = map.get(o.storeId);
		if (!prev || (o.distanceKm ?? 99) < (prev.distanceKm ?? 99)) map.set(o.storeId, o);
	}
	return [...map.values()].sort((a, b) => (a.distanceKm ?? 99) - (b.distanceKm ?? 99));
}
function Home() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const loc = useLocationStore();
	const setLocation = useLocationStore((s) => s.setLocation);
	const { user, isPending } = useCurrentUserState();
	const [q, setQ] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)();
	const [locOpen, setLocOpen] = (0, import_react.useState)(false);
	const [scanOpen, setScanOpen] = (0, import_react.useState)(false);
	const [scanLog, setScanLog] = (0, import_react.useState)([]);
	const hydrated = useHydrated();
	const [greeting, setGreeting] = (0, import_react.useState)("Today's deals");
	(0, import_react.useEffect)(() => {
		setGreeting(timeOfDayLabel());
	}, []);
	const areasQ = useQuery({
		queryKey: ["areas"],
		queryFn: () => listAreas()
	});
	const coverageQ = useQuery({
		queryKey: ["coverage", loc.city],
		queryFn: () => getCoverage({ data: { city: loc.city ?? void 0 } })
	});
	const offersQ = useOffers({
		category,
		search: q.trim() || void 0,
		sort: "nearby"
	});
	const priQ = useQuery({
		queryKey: ["priority-items", user?.id],
		queryFn: () => listPriorityItems(),
		enabled: Boolean(user) && !isPending
	});
	const notesQ = useQuery({
		queryKey: ["notifications", user?.id],
		queryFn: () => listNotifications(),
		enabled: Boolean(user) && !isPending
	});
	const crawl = useMutation({
		mutationFn: () => runCrawl({ data: { city: loc.city ?? void 0 } }),
		onSuccess: async (res) => {
			setScanLog(res.log);
			await qc.invalidateQueries();
			if (res.inserted === 0) toast("Sources scanned — no new unique offers this pass.");
			else toast.success(`${res.inserted} new offer${res.inserted === 1 ? "" : "s"} indexed`);
		},
		onError: () => toast.error("Sign in to trigger a live source scan.")
	});
	const offers = offersQ.data ?? [];
	const forYou = offers.filter((o) => isForYouCategory(o.category));
	const portals = offers.filter((o) => o.unit === "portal");
	const grocery = offers.filter((o) => !isForYouCategory(o.category) && o.unit !== "portal");
	const groceryScope = withinRadius(grocery);
	const nearPortals = portals.filter((o) => o.distanceKm != null && o.distanceKm <= 2);
	const expanded = groceryScope.expanded && nearPortals.length === 0;
	const scoped = groceryScope.expanded && !expanded ? [] : groceryScope.offers;
	const sections = KITCHEN_SECTIONS.map((section) => ({
		...section,
		items: scoped.filter((o) => stapleRank(o.itemName, o.description, o.category) === section.rank).sort((a, b) => {
			const shelf = (o) => o.unit === "portal" || o.price <= 0 ? Number.POSITIVE_INFINITY : o.price;
			return shelf(a) - shelf(b);
		})
	})).filter((section) => section.items.length > 0);
	const otherHere = scoped.filter((o) => stapleRank(o.itemName, o.description, o.category) >= 9);
	const placeLabel = loc.areaName ?? loc.city ?? "you";
	const marketOffers = uniqueStores([...nearPortals, ...scoped.filter((o) => isNeighbourhoodChain(o.storeChain) && (o.distanceKm ?? 99) <= 2)]);
	const lowest = [...scoped].filter((o) => o.price > 0 && o.unit !== "portal" && isNeighbourhoodChain(o.storeChain) && (o.distanceKm ?? 99) <= 2).sort((a, b) => a.price - b.price).slice(0, 8);
	const headingPlace = expanded ? "beyond 2 km" : placeLabel;
	const unread = (notesQ.data ?? []).filter((n) => !n.readAt).length;
	const coverage = coverageQ.data;
	const authReady = hydrated && !isPending;
	function applyArea(city, area, sample) {
		const locn = area ?? sample;
		setLocation({
			onboarded: true,
			city,
			country: locn.country,
			areaId: area?.id ?? null,
			areaName: area?.name ?? null,
			lat: locn.latitude,
			lng: locn.longitude,
			currencyCode: locn.currencyCode,
			currencySymbol: locn.currencySymbol
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-8 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/app-icon.png",
						alt: "My Offers",
						className: "size-10 rounded-lg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setLocOpen(true),
						className: "text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs font-medium uppercase tracking-wide text-muted",
							children: greeting
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 font-display text-base font-semibold",
							children: [loc.areaName ? loc.areaName : loc.city ?? "Choose city", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-subtle" })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [authReady && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-lg hover:bg-surface-2",
						"aria-label": "Scan sources",
						onClick: () => {
							setScanOpen(true);
							setScanLog(["Connecting collectors…"]);
							crawl.mutate();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-5 text-primary" })
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/notifications",
						className: "relative grid size-11 place-items-center rounded-lg hover:bg-surface-2",
						"aria-label": "Alerts",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2 top-2 size-2 rounded-full bg-secondary" }) : null]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {
						value: q,
						onChange: setQ,
						onSubmit: () => navigate({
							to: "/search",
							search: { q }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Within 2 km first"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							search: { mode: "item" },
							className: "font-medium text-primary",
							children: "Find an item"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchChips, {
						value: q,
						onSelect: (next) => {
							setQ(next);
							if (next) navigate({
								to: "/search",
								search: { q: next }
							});
						}
					})
				]
			}),
			coverage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted",
				children: [
					coverage.activeSources,
					" live sources · ",
					coverage.offerCount,
					" offers · 2 km first",
					coverage.lastCrawledAt ? ` · scanned ${relativeTime(coverage.lastCrawledAt)}` : ""
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted",
				children: [
					"Indexing grocery sources in ",
					loc.city ?? "your city",
					"…"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPills, {
					value: category,
					onChange: setCategory
				})
			}),
			authReady && user && priQ.data && priQ.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-sm font-semibold",
						children: "Watching"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/priorities",
						className: "text-xs font-medium text-primary",
						children: "Edit"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: priQ.data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setQ(p.itemName),
						className: "h-10 shrink-0 rounded-full bg-secondary-soft px-3 text-sm font-medium text-pin",
						children: p.itemName
					}, p.id))
				})]
			}) : authReady && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/login",
				className: "mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-10 place-items-center rounded-lg bg-primary-soft text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: "Watch سبزی، دال، گوشت، دودھ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Sign in to pin vegetables, daal, meat, milk, and cold drinks."
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 h-16",
				"aria-hidden": true
			}),
			offersQ.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" })
				]
			}) : offersQ.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Radar,
				title: "Couldn’t load offers",
				body: "The catalog is still warming up. Try another city or scan again in a moment.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void offersQ.refetch(),
					children: "Retry"
				})
			}) : offers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Radar,
				title: "No offers in this area yet",
				body: "Switch neighbourhoods or run a source scan after you sign in.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => setLocOpen(true),
					children: "Change city"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 rounded-xl bg-secondary-soft px-3 py-2 text-sm text-pin",
					children: [
						"Nothing within 2 km of ",
						placeLabel,
						". Showing the next grocery deals out of range."
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-sm font-semibold",
							children: "Markets within 2 km"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 text-xs text-muted",
							dir: "auto",
							children: [
								loc.city === "Karachi" ? "Official Karachi list for sabzi, meat, milk, and daal. The lower number is the mandi or bachat rate. A superstore shelf can be higher." : "Printed prices inside 2 km only. West Zone fresh board 28–30 Oct, and Day to Day Union from 29 Oct. Talal, Madina, and Faaz open on their portal until that shop prints a tag.",
								" ",
								"پښتون او پاکستاني کورنۍ"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
							children: BAZAAR_PINS.map((pin) => {
								const area = (areasQ.data ?? []).find((a) => a.name === pin.area);
								const on = loc.areaName === pin.area;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !area,
									onClick: () => {
										if (!area) return;
										applyArea(area.city, area, area);
									},
									className: `h-10 shrink-0 rounded-full px-3 text-xs font-medium ${on ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg"}`,
									children: pin.label
								}, pin.area);
							})
						}),
						marketOffers.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: marketOffers.map((o) => {
								const href = o.storeWebsite || o.sourceUrl;
								const km = o.distanceKm == null ? "" : `${o.distanceKm < .15 ? "Nearby" : `${o.distanceKm.toFixed(1)} km`}`;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: href ?? void 0,
									target: "_blank",
									rel: "noreferrer",
									className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-sm font-medium",
											children: o.storeName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-xs text-muted",
											children: [o.storeAddress, km].filter(Boolean).join(" · ")
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-xs font-medium text-primary",
										children: "Open"
									})]
								}, o.storeId);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-xl bg-surface-2 px-3 py-2 text-xs text-muted",
							children: [
								"None of those shops sit inside 2 km of ",
								placeLabel,
								". Open Deira, Day to Day Nahda, Ajman, Sonapur, or Karachi rates."
							]
						}),
						lowest.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-medium",
								children: "Lowest printed prices"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
								children: lowest.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-[17.5rem] shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
										offer: o,
										compact: true
									})
								}, o.id))
							})]
						}) : null,
						loc.lat != null && loc.lng != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: groceryMapUrl(loc.lat, loc.lng),
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-full bg-primary-soft px-3 py-2 text-xs font-medium text-primary",
								children: "Every grocery & general store"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: neighbourhoodMapUrl(loc.lat, loc.lng),
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-full bg-surface-2 px-3 py-2 text-xs font-medium text-fg",
								children: "Talal, Faaz, Day to Day…"
							})]
						}) : null
					]
				}),
				sections.length === 0 && otherHere.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-xl bg-surface-2 px-3 py-3 text-sm text-muted",
					children: "No printed shelf price inside 2 km today. Open a store above — that portal is the real price. A tag is shown here only after it is copied from the store or the official list."
				}) : null,
				forYou.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-sm font-semibold",
							children: ["For you in ", loc.city ?? placeLabel]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-xs text-muted",
							dir: "auto",
							children: "Free AI subscriptions, family vacations, and air tickets from your city · آپ کے لیے"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-5",
							children: FOR_YOU_SECTIONS.map((section) => {
								const items = forYou.filter((o) => o.category === section.id);
								if (!items.length) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "me-1",
											"aria-hidden": true,
											children: section.emoji
										}), section.title]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mb-2 text-xs text-muted",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bdi", { children: section.ur }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												children: " · "
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bdi", { children: section.hi })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
										children: items.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-[17.5rem] shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
												offer: o,
												compact: true
											})
										}, o.id))
									})
								] }, section.id);
							})
						})
					]
				}) : null,
				sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-sm font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "me-1",
									"aria-hidden": true,
									children: section.emoji
								}),
								section.title,
								" ",
								expanded ? headingPlace : `in ${headingPlace}`
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 text-xs text-muted",
							dir: "auto",
							children: [
								section.ur,
								" · ",
								section.hi,
								" · closest address first"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: section.items.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
								offer: o,
								featured: i === 0 && section.rank === sections[0]?.rank,
								kicker: o.description?.toLowerCase().includes("bachat") ? "Mandi rate" : expanded ? "Beyond 2 km" : `${placeLabel} · closest`
							}, o.id))
						})
					]
				}, section.rank)),
				otherHere.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-2 font-display text-sm font-semibold",
						children: ["Also ", expanded ? headingPlace : `in ${placeLabel}`]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: otherHere.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, { offer: o }, o.id))
					})]
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SlideUp, {
				open: locOpen,
				onClose: () => setLocOpen(false),
				title: "Your area",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationPicker, {
					areas: areasQ.data ?? [],
					city: loc.city,
					areaId: loc.areaId,
					onSelectCity: (c, sample) => applyArea(c, null, sample),
					onSelectArea: (a) => {
						const sample = (areasQ.data ?? []).find((x) => x.city === (a?.city ?? loc.city));
						if (!sample && !a) return;
						applyArea(a?.city ?? loc.city ?? sample.city, a, a ?? sample);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: () => setLocOpen(false),
					children: "Done"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SlideUp, {
				open: scanOpen,
				onClose: () => setScanOpen(false),
				title: "Source scan",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "Collectors check store sites, Facebook, Twitter, WhatsApp, Instagram, Pinterest, web search, and local listings, then keep the unique ones."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-2 font-mono text-xs text-muted",
						children: (crawl.isPending ? [...scanLog, "Still collecting…"] : scanLog).map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, i))
					}),
					authReady && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Sign in to run a live crawl across store sites and social sources."
					}) : null
				]
			})
		]
	});
}
//#endregion
export { Home as component };
