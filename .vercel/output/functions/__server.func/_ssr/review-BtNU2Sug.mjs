import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as ShieldCheck } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { O as useCurrentUserState, b as moderateOffer, m as listPendingOffers } from "./router-ny48Fa3Z.mjs";
import { t as Button } from "./button-CdVRdV7b.mjs";
import { t as useHydrated } from "./use-hydrated-C8D_C3xV.mjs";
import { t as EmptyState } from "./empty-state-Dy6laBx_.mjs";
import { t as RedirectToSignIn } from "./gates-fteW0ldA.mjs";
import { t as OfferCard } from "./offer-card-CbVvZ8a2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-BtNU2Sug.js
var import_jsx_runtime = require_jsx_runtime();
function ReviewPage() {
	const { user, isPending } = useCurrentUserState();
	const hydrated = useHydrated();
	const qc = useQueryClient();
	const pendingQ = useQuery({
		queryKey: ["pending-offers"],
		queryFn: () => listPendingOffers(),
		enabled: Boolean(user)
	});
	const mod = useMutation({
		mutationFn: (input) => moderateOffer({ data: input }),
		onSuccess: (_, vars) => {
			toast.success(vars.action === "approve" ? "Published" : "Removed");
			qc.invalidateQueries();
		}
	});
	if (!hydrated || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 pt-8 text-sm text-muted",
		children: "Loading…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const pending = pendingQ.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-8 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "Review"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Social posts and community submissions wait here before they hit the public feed."
			}),
			pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: ShieldCheck,
				title: "Queue is clear",
				body: "New social crawls and shopper submissions will land here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-4",
				children: pending.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, { offer: o }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "soft",
							disabled: mod.isPending,
							onClick: () => mod.mutate({
								id: o.id,
								action: "approve"
							}),
							children: "Approve"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: mod.isPending,
							onClick: () => mod.mutate({
								id: o.id,
								action: "reject"
							}),
							children: "Reject"
						})]
					})]
				}, o.id))
			})
		]
	});
}
//#endregion
export { ReviewPage as component };
