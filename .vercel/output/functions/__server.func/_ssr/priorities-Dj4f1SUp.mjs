import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as MapPin, c as Trash2, l as Star } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { C as removePriorityItem, O as useCurrentUserState, S as removePriorityArea, a as addPriorityItem, g as listPriorityItems, h as listPriorityAreas, i as addPriorityArea, u as listAreas } from "./router-ny48Fa3Z.mjs";
import { t as Input } from "./input-BZxaWNiG.mjs";
import { t as Button } from "./button-CdVRdV7b.mjs";
import { t as useHydrated } from "./use-hydrated-C8D_C3xV.mjs";
import { o as SUGGESTED_WATCHES } from "./categories-C_PyKy0I.mjs";
import { t as EmptyState } from "./empty-state-Dy6laBx_.mjs";
import { t as RedirectToSignIn } from "./gates-fteW0ldA.mjs";
import { t as useLocationStore } from "./location-store-fdDqKGdW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/priorities-Dj4f1SUp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrioritiesPage() {
	const { user, isPending } = useCurrentUserState();
	const hydrated = useHydrated();
	const loc = useLocationStore();
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)("");
	const itemsQ = useQuery({
		queryKey: ["priority-items", user?.id],
		queryFn: () => listPriorityItems(),
		enabled: Boolean(user)
	});
	const areasQ = useQuery({
		queryKey: ["priority-areas", user?.id],
		queryFn: () => listPriorityAreas(),
		enabled: Boolean(user)
	});
	const allAreas = useQuery({
		queryKey: ["areas"],
		queryFn: () => listAreas()
	});
	const addItem = useMutation({
		mutationFn: (itemName) => addPriorityItem({ data: { itemName } }),
		onSuccess: () => {
			setName("");
			qc.invalidateQueries({ queryKey: ["priority-items"] });
		}
	});
	const delItem = useMutation({
		mutationFn: (id) => removePriorityItem({ data: id }),
		onSuccess: () => void qc.invalidateQueries({ queryKey: ["priority-items"] })
	});
	const addArea = useMutation({
		mutationFn: (areaId) => addPriorityArea({ data: areaId }),
		onSuccess: () => void qc.invalidateQueries({ queryKey: ["priority-areas"] })
	});
	const delArea = useMutation({
		mutationFn: (id) => removePriorityArea({ data: id }),
		onSuccess: () => void qc.invalidateQueries({ queryKey: ["priority-areas"] })
	});
	if (!hydrated || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 pt-8 text-sm text-muted",
		children: "Loading…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const items = itemsQ.data ?? [];
	const priAreas = areasQ.data ?? [];
	const cityAreas = (allAreas.data ?? []).filter((a) => !loc.city || a.city === loc.city);
	const watchedAreaIds = new Set(priAreas.map((a) => a.areaId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-8 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "Watch list"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Vegetables, daal, rice, meat, milk, cold drinks, and the rest of a Pakistani kitchen. Nearest shop stays first — watches are badged, not bumped above a closer deal."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-5 flex gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					if (!name.trim()) return;
					addItem.mutate(name.trim());
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "دودھ، چاول، سبزی… or milk, rice",
					dir: "auto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: addItem.isPending,
					children: "Add"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: SUGGESTED_WATCHES.filter((s) => !items.some((i) => i.itemName.toLowerCase() === s.name.toLowerCase())).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => addItem.mutate(s.name),
					className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-surface-2 px-3 text-xs font-medium text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: s.emoji
					}), s.name]
				}, s.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-sm font-semibold",
					children: "Items"
				}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Star,
					title: "Nothing on the list yet",
					body: "Add staples you buy every week. We’ll pin and notify when they go on offer."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-border rounded-xl border border-border bg-surface",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex min-h-14 items-center justify-between px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: item.itemName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center text-muted hover:text-danger",
							"aria-label": `Remove ${item.itemName}`,
							onClick: () => delItem.mutate(item.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-sm font-semibold",
						children: "Neighbourhoods"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Pin whole areas so every deal there floats first."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: cityAreas.map((a) => {
							const watching = watchedAreaIds.has(a.id);
							const row = priAreas.find((p) => p.areaId === a.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									if (watching && row) delArea.mutate(row.id);
									else addArea.mutate(a.id);
								},
								className: `inline-flex h-10 items-center gap-1 rounded-full border px-3 text-sm ${watching ? "border-secondary bg-secondary-soft text-pin" : "border-border bg-surface"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), a.name]
							}, a.id);
						})
					}),
					cityAreas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Pick a city on Home first."
					}) : null
				]
			})
		]
	});
}
//#endregion
export { PrioritiesPage as component };
