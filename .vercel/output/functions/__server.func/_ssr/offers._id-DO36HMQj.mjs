import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as haversineKm, o as formatKm } from "./utils-DL0OCngi.mjs";
import { E as MapPin, L as Clock, N as ExternalLink, W as ArrowLeft, h as Share2, l as Star } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { O as useCurrentUserState, a as addPriorityItem, c as getOfferPersonalized, n as Route$1, s as getOffer } from "./router-ny48Fa3Z.mjs";
import { t as Button } from "./button-CdVRdV7b.mjs";
import { t as Skeleton } from "./skeleton-BiJ-i5hr.mjs";
import { a as formatMoney, i as endingLabel, l as relativeTime, o as itemLocal, r as categoryLabel } from "./format-CLSKePSg.mjs";
import { i as StoreMark, n as CategoryIcon, r as SourceBadge, t as Badge } from "./store-mark-B-LlWiZF.mjs";
import { t as useLocationStore } from "./location-store-fdDqKGdW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers._id-DO36HMQj.js
var import_jsx_runtime = require_jsx_runtime();
function OfferDetail() {
	const { id } = Route$1.useParams();
	const numId = Number(id);
	const { user, isPending } = useCurrentUserState();
	const loc = useLocationStore();
	const qc = useQueryClient();
	const offerQ = useQuery({
		queryKey: [
			"offer",
			numId,
			user?.id ?? "guest"
		],
		enabled: Number.isFinite(numId) && !isPending,
		queryFn: () => user ? getOfferPersonalized({ data: numId }) : getOffer({ data: numId })
	});
	const watch = useMutation({
		mutationFn: (name) => addPriorityItem({ data: { itemName: name } }),
		onSuccess: () => {
			toast.success("Added to your watch list");
			qc.invalidateQueries({ queryKey: ["priority-items"] });
		},
		onError: () => toast.error("Sign in to watch items")
	});
	const offer = offerQ.data;
	if (offerQ.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-4 h-48 rounded-xl" })]
	});
	if (!offer) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 pt-10 text-center text-sm text-muted",
		children: "This offer is gone."
	});
	const detail = offer;
	const dist = loc.lat != null && loc.lng != null && detail.storeLat != null && detail.storeLng != null ? formatKm(haversineKm(loc.lat, loc.lng, detail.storeLat, detail.storeLng)) : formatKm(detail.distanceKm);
	const local = itemLocal(detail.itemName, detail.description);
	const precise = [
		detail.storeAddress,
		detail.areaName,
		detail.city
	].filter((part) => Boolean(part)).filter((part, i, all) => all.indexOf(part) === i).join(", ");
	const ending = endingLabel(detail.endDate);
	const maps = detail.storeLat != null && detail.storeLng != null ? `https://www.google.com/maps/search/?api=1&query=${detail.storeLat},${detail.storeLng}` : detail.storeAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(detail.storeAddress)}` : null;
	async function share() {
		const text = `${detail.itemName} at ${detail.storeName} — ${formatMoney(detail.price, detail.currencySymbol, detail.currencyCode, detail.unit)}`;
		try {
			if (navigator.share) await navigator.share({
				title: "My Offers",
				text
			});
			else {
				await navigator.clipboard.writeText(text);
				toast.success("Copied offer details");
			}
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1 px-2 pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "grid size-11 place-items-center rounded-lg hover:bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-sm font-semibold",
				children: "Offer"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pt-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-card)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center bg-primary-soft py-10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, {
							id: offer.category,
							className: "size-16"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									detail.discountPercent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: "secondary",
										children: [detail.discountPercent, "% off"]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "primary",
										children: categoryLabel(detail.category)
									}),
									detail.isVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "accent",
										children: "Verified"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Needs review" }),
									detail.isPriority ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "secondary",
										children: "Priority"
									}) : null,
									ending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "secondary",
										children: ending
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-3 font-display text-2xl font-semibold leading-tight tracking-tight",
								children: [local.emoji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "me-1.5",
									children: local.emoji
								}) : null, detail.itemName]
							}),
							local.ur || local.hi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								dir: "auto",
								children: [local.ur, local.hi].filter(Boolean).join(" · ")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 flex items-start gap-1.5 text-sm font-medium text-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-3.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [precise, dist].filter(Boolean).join(" · ") })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-baseline gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-3xl font-semibold tabular-nums text-primary-deep",
										children: formatMoney(detail.price, detail.currencySymbol, detail.currencyCode, detail.unit)
									}),
									detail.originalPrice != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm tabular-nums text-subtle line-through",
										children: formatMoney(detail.originalPrice, detail.currencySymbol, detail.currencyCode)
									}) : null,
									detail.unit && detail.unit !== "portal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted",
										children: detail.unit
									}) : null
								]
							}),
							detail.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted",
								children: detail.description
							}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-xl border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreMark, { chain: detail.storeChain }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold",
							children: detail.storeName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: detail.storeAddress ?? detail.areaName
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-3 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
									dist ?? detail.areaName,
									", ",
									detail.city
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
									"Listed ",
									relativeTime(detail.createdAt)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { type: detail.sourceType })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: () => watch.mutate(detail.itemName),
							variant: "soft",
							disabled: watch.isPending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4" }), "Watch this item"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								onClick: share,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share"]
							}), maps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: maps,
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), "Map"]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								disabled: true,
								children: "Map"
							})]
						}),
						detail.sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: detail.sourceUrl,
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), "Open source"]
							})
						}) : null
					]
				})
			]
		})]
	});
}
//#endregion
export { OfferDetail as component };
