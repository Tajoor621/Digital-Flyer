import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { H as Bell } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { O as useCurrentUserState, d as listNotifications, y as markNotificationsRead } from "./router-ny48Fa3Z.mjs";
import { t as useHydrated } from "./use-hydrated-C8D_C3xV.mjs";
import { l as relativeTime } from "./format-CLSKePSg.mjs";
import { t as EmptyState } from "./empty-state-Dy6laBx_.mjs";
import { t as RedirectToSignIn } from "./gates-fteW0ldA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-CfjAsdZq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	const { user, isPending } = useCurrentUserState();
	const hydrated = useHydrated();
	const qc = useQueryClient();
	const notesQ = useQuery({
		queryKey: ["notifications", user?.id],
		queryFn: () => listNotifications(),
		enabled: Boolean(user)
	});
	const mark = useMutation({
		mutationFn: () => markNotificationsRead(),
		onSuccess: () => void qc.invalidateQueries({ queryKey: ["notifications"] })
	});
	(0, import_react.useEffect)(() => {
		if (user && notesQ.data?.some((n) => !n.readAt)) mark.mutate();
	}, [user, notesQ.data]);
	if (!hydrated || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 pt-8 text-sm text-muted",
		children: "Loading…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const notes = notesQ.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-8 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "Alerts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "New offers that match your watch list or pinned neighbourhoods."
			}),
			notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Bell,
				title: "You’re all caught up",
				body: "When a scan finds something you watch, it shows up here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: n.offerId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/offers/$id",
					params: { id: String(n.offerId) },
					className: "block rounded-xl border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: n.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-subtle",
							children: relativeTime(n.sentAt)
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: n.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: n.body
					})]
				}) }, n.id))
			})
		]
	});
}
//#endregion
export { NotificationsPage as component };
