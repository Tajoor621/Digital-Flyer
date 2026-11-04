import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn } from "./utils-DL0OCngi.mjs";
import { H as Bell, R as ClipboardList, v as Radar, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as useCurrentUser, O as useCurrentUserState, T as saveProfile, _ as listSources, l as getProfile, o as getCoverage } from "./router-ny48Fa3Z.mjs";
import { t as Button } from "./button-CdVRdV7b.mjs";
import { t as useHydrated } from "./use-hydrated-C8D_C3xV.mjs";
import { a as SOURCE_LABELS } from "./categories-C_PyKy0I.mjs";
import { l as relativeTime } from "./format-CLSKePSg.mjs";
import { n as UserButton } from "./gates-fteW0ldA.mjs";
import { t as useLocationStore } from "./location-store-fdDqKGdW.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BGZWm3pZ.js
var import_jsx_runtime = require_jsx_runtime();
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent transition-colors", "data-[state=checked]:bg-primary data-[state=unchecked]:bg-border", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-6 translate-x-0.5 rounded-full bg-surface shadow-sm transition-transform data-[state=checked]:translate-x-5" })
	});
}
function ProfilePage() {
	const { user, isPending } = useCurrentUserState();
	const hydrated = useHydrated();
	const display = useCurrentUser();
	const loc = useLocationStore();
	const qc = useQueryClient();
	const profileQ = useQuery({
		queryKey: ["profile", user?.id],
		queryFn: () => getProfile(),
		enabled: Boolean(user)
	});
	const sourcesQ = useQuery({
		queryKey: ["sources"],
		queryFn: () => listSources()
	});
	const coverageQ = useQuery({
		queryKey: ["coverage", loc.city],
		queryFn: () => getCoverage({ data: { city: loc.city ?? void 0 } })
	});
	const save = useMutation({
		mutationFn: (patch) => saveProfile({ data: patch }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["profile"] });
			toast.success("Saved");
		}
	});
	async function enablePush() {
		if (!("Notification" in window)) {
			toast.error("This browser does not support notifications.");
			return;
		}
		if (await Notification.requestPermission() === "granted") {
			toast.success("Browser alerts enabled for this device");
			new Notification("My Offers", { body: "We’ll ping you when a watched item drops." });
		} else toast.error("Notifications were blocked.");
	}
	const profile = profileQ.data;
	const coverage = coverageQ.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-8 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "You"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-border bg-surface p-4",
				children: [
					!hydrated || isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-40 animate-pulse rounded-full bg-surface-2" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Sign in to save watches across devices."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Sign in"
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted",
						children: [
							"Shopping in ",
							loc.areaName ? `${loc.areaName}, ` : "",
							loc.city ?? "an unknown city"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "outline",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/onboarding",
							children: "Change city"
						})
					}),
					display?.primaryEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: display.primaryEmail
					}) : null
				]
			}),
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 font-display text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), " Alerts"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Notify on new matches"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "In-app alerts when a scan finds a watch-list hit"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: profile?.notifyEnabled ?? true,
							onCheckedChange: (v) => save.mutate({ notifyEnabled: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Priority only"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Skip deals that are not on your list or area pins"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: profile?.notifyPriorityOnly ?? true,
							onCheckedChange: (v) => save.mutate({ notifyPriorityOnly: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 w-full",
						variant: "outline",
						type: "button",
						onClick: enablePush,
						children: "Enable device notifications"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/submit",
					className: "rounded-xl border border-border bg-surface p-4 text-sm font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "mb-2 size-5 text-primary" }), "Submit a deal"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/review",
					className: "rounded-xl border border-border bg-surface p-4 text-sm font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mb-2 size-5 text-accent" }),
						"Review queue",
						coverage?.pendingReview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-xs text-muted",
							children: [coverage.pendingReview, " pending"]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5 rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 font-display text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-4" }), " Coverage"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: coverage ? `${coverage.activeSources} collectors · last scan ${coverage.lastCrawledAt ? relativeTime(coverage.lastCrawledAt) : "pending"}` : "Loading coverage…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: (sourcesQ.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: SOURCE_LABELS[s.type]
							})]
						}, s.id))
					})
				]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
