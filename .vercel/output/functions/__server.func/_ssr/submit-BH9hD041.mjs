import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as submitOffer, O as useCurrentUserState, v as listStores } from "./router-ny48Fa3Z.mjs";
import { t as Input } from "./input-BZxaWNiG.mjs";
import { t as Button } from "./button-CdVRdV7b.mjs";
import { t as useHydrated } from "./use-hydrated-C8D_C3xV.mjs";
import { t as CATEGORIES } from "./categories-C_PyKy0I.mjs";
import { t as RedirectToSignIn } from "./gates-fteW0ldA.mjs";
import { t as useLocationStore } from "./location-store-fdDqKGdW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submit-BH9hD041.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SubmitPage() {
	const { user, isPending } = useCurrentUserState();
	const hydrated = useHydrated();
	const loc = useLocationStore();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const storesQ = useQuery({
		queryKey: ["stores", loc.city],
		queryFn: () => listStores({ data: { city: loc.city ?? void 0 } }),
		enabled: Boolean(user)
	});
	const [itemName, setItemName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("produce");
	const [storeId, setStoreId] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [original, setOriginal] = (0, import_react.useState)("");
	const [unit, setUnit] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const submit = useMutation({
		mutationFn: () => submitOffer({ data: {
			storeId: Number(storeId),
			itemName,
			category,
			price: Number(price),
			originalPrice: original ? Number(original) : null,
			unit: unit || null,
			description: description || null
		} }),
		onSuccess: (res) => {
			if (!res.ok) {
				toast.error(res.error);
				return;
			}
			toast.success("Submitted for review");
			qc.invalidateQueries();
			navigate({ to: "/review" });
		}
	});
	if (!hydrated || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 pt-8 text-sm text-muted",
		children: "Loading…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-8 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "Submit a deal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Spotted something the crawlers missed? Send it in — it stays hidden until it’s reviewed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-5 space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					if (!storeId) {
						toast.error("Pick a store");
						return;
					}
					submit.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						value: itemName,
						onChange: (e) => setItemName(e.target.value),
						placeholder: "Item name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm",
						value: category,
						onChange: (e) => setCategory(e.target.value),
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.label
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						required: true,
						className: "h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm",
						value: storeId,
						onChange: (e) => setStoreId(e.target.value ? Number(e.target.value) : ""),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Store"
						}), (storesQ.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.name
						}, s.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							inputMode: "decimal",
							value: price,
							onChange: (e) => setPrice(e.target.value),
							placeholder: "Sale price"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "decimal",
							value: original,
							onChange: (e) => setOriginal(e.target.value),
							placeholder: "Was"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: unit,
						onChange: (e) => setUnit(e.target.value),
						placeholder: "Unit — 1kg, 2L…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						placeholder: "Notes (optional)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: submit.isPending,
						children: submit.isPending ? "Sending…" : "Submit for review"
					})
				]
			})
		]
	});
}
//#endregion
export { SubmitPage as component };
