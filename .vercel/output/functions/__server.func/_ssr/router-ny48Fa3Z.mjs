import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
import { i as cn, t as authMiddleware } from "./utils-DL0OCngi.mjs";
import { n as auth } from "./server-BgVz7Ttb.mjs";
import { H as Bell, _ as Search, a as UserRound, k as House, l as Star, o as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ny48Fa3Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function QueryProvider({ children }) {
	const [client] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		staleTime: 2e4,
		refetchOnWindowFocus: false,
		retry: 1
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children
	});
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listAreas = createServerFn({ method: "GET" }).handler(createSsrRpc("55c0425331b0e59deb40179c7bb803b82e290e3aa516ce6ef00f12d6e5cd0a5c"));
var listStores = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(createSsrRpc("c53c2e4af1d701ee7209be32ff67e8991bcc7da7becb68a7f3dbcb7b335d0923"));
var listSources = createServerFn({ method: "GET" }).handler(createSsrRpc("26e6e750320506f942112d31b2b28c99572355a6e6f953dbc4a12e206007fb16"));
var getCoverage = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(createSsrRpc("cd79699c80efd44b7f6feb0b56238be9e044750453b15c77932c88bc06b1ace4"));
var listOffers = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(createSsrRpc("ec50814d981802ce9dcf85e2ee244e8f672ab725c4779921a326d7208d3260f7"));
var listOffersPersonalized = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => input ?? {}).handler(createSsrRpc("b9768476fb09f1b330c91949715b86033383e4b4f7fcdfecbf558f44ecccaf4d"));
var getOffer = createServerFn({ method: "GET" }).validator((id) => id).handler(createSsrRpc("1e812c11b11b075d8d5227180f5668395764cc60e48197458cb00c217b48795f"));
var getOfferPersonalized = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("60c5d405ab0b77dcce7f70c253aa0b82dc6036fe989721cb5d2c2a4020a8d117"));
var getProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("84908c73252a1f731a5e5e474fd845e136aaafee53e254bf73989314ee38df71"));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("6ede440a5854679fc926071b75962a975ae89f2997e03c77eb4ac5774e989b0a"));
var listPriorityItems = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6cecfaa23114f8666db3e0da78e54a38d46290b10b01fbc7b6d96dd9939483f1"));
var addPriorityItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	itemName: input.itemName.trim(),
	category: input.category ?? null
})).handler(createSsrRpc("035ed538baf268321ead3f9480965b2cf471952783174f62b2fa8079173a9268"));
var removePriorityItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("83417b7e3040c883516e455ef42d397e34ca71025b221bfa322df42c50d61975"));
var listPriorityAreas = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("fca7e156ee066ea68acfa36530dbb6461c55bdba3e6abf2719af559e6f179537"));
var addPriorityArea = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((areaId) => areaId).handler(createSsrRpc("045d327abea08393edfa369958b4c80c1185cfc98b6a813ed5ed9f3cc7c3a622"));
var removePriorityArea = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("5737bfb335e6ec7b4d6590d840ce577070a94a47f78740b9eaaacc1c9c25b7d6"));
var listNotifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("db4ff0ec55d649d10958998f804152c712672ae06de777473667eee4eb326c77"));
var markNotificationsRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("782e37afb6ba635413a35bb4d116bee22ce2da0c48d51c47e4b1bfb2a588bcba"));
var submitOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	storeId: input.storeId,
	itemName: input.itemName.trim(),
	category: input.category,
	price: Number(input.price),
	originalPrice: input.originalPrice == null ? null : Number(input.originalPrice),
	unit: input.unit?.trim() || null,
	description: input.description?.trim() || null
})).handler(createSsrRpc("ebe7002a25e04bc4fd9619fe6df444cefbb6d9751ffac8778f37cce758b667ec"));
var listPendingOffers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("10b5a1975e47b06e1730b7bb43f054690d0cc96e0dcf96ce6dba26a81d615943"));
var moderateOffer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("84797d44524860b091e52443f69b25c1789e125eb72706714abe4427de2e7882"));
var runCrawl = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input ?? {}).handler(createSsrRpc("a141b66614b601741884a84fd831bcd02e4a9c9bf588549996fb8f0f26c023de"));
var nearbyArea = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("39df8ef92ea2f2b2970e5221e9e956f3e1d1d39774a6a476411438e3c39e154f"));
var ITEMS = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/search",
		label: "Search",
		icon: Search
	},
	{
		to: "/priorities",
		label: "Watch",
		icon: Star
	},
	{
		to: "/notifications",
		label: "Alerts",
		icon: Bell
	},
	{
		to: "/profile",
		label: "You",
		icon: UserRound
	}
];
function BottomNav({ unread = 0 }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]",
			children: ITEMS.map((item) => {
				const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("relative flex min-h-14 min-w-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", active ? "text-primary" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: active ? 2.2 : 1.8
						}), item.to === "/notifications" && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -right-1.5 -top-1 grid min-w-4 place-items-center rounded-full bg-secondary px-1 text-[9px] font-semibold text-secondary-fg",
							children: unread > 9 ? "9+" : unread
						}) : null]
					}), item.label]
				}, item.to);
			})
		})
	});
}
var BARE = /* @__PURE__ */ new Set(["/login", "/onboarding"]);
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const { user, isPending } = useCurrentUserState();
	(0, import_react.useEffect)(() => {
		setHydrated(true);
	}, []);
	const unread = (useQuery({
		queryKey: ["notifications", user?.id],
		queryFn: () => listNotifications(),
		enabled: Boolean(user) && !isPending
	}).data ?? []).filter((n) => !n.readAt).length;
	if (BARE.has(pathname)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "app-ambient min-h-dvh",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto min-h-dvh max-w-lg bg-bg pb-20 shadow-(--shadow-card)",
			children: [
				hydrated ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "My Offers — Every deal. Everywhere. Just for you."
				}),
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, { unread })
			]
		})
	});
}
var styles_default = "/assets/styles-B3C6_oA5.css";
var APP_NAME = "My Offers";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Every deal. Everywhere. Just for you."
			},
			{
				name: "theme-color",
				content: "#16A34A"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "top-center",
					richColors: true
				})] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$9 = () => import("./routes-DdViU5HE.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./login-cqB2tTNq.mjs");
var Route$9 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./notifications-CfjAsdZq.mjs");
var Route$8 = createFileRoute("/notifications")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./onboarding-C2fAHyIk.mjs");
var Route$7 = createFileRoute("/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./priorities-Dj4f1SUp.mjs");
var Route$6 = createFileRoute("/priorities")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./profile-BGZWm3pZ.mjs");
var Route$5 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./review-BtNU2Sug.mjs");
var Route$4 = createFileRoute("/review")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./search-BhTUQP7U.mjs");
var Route$3 = createFileRoute("/search")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : void 0,
		mode: s.mode === "item" ? "item" : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./submit-BH9hD041.mjs");
var Route$2 = createFileRoute("/submit")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./offers._id-DO36HMQj.mjs");
var Route$1 = createFileRoute("/offers/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	LoginRoute: Route$9.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$11
	}),
	NotificationsRoute: Route$8.update({
		id: "/notifications",
		path: "/notifications",
		getParentRoute: () => Route$11
	}),
	OnboardingRoute: Route$7.update({
		id: "/onboarding",
		path: "/onboarding",
		getParentRoute: () => Route$11
	}),
	PrioritiesRoute: Route$6.update({
		id: "/priorities",
		path: "/priorities",
		getParentRoute: () => Route$11
	}),
	ProfileRoute: Route$5.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$11
	}),
	ReviewRoute: Route$4.update({
		id: "/review",
		path: "/review",
		getParentRoute: () => Route$11
	}),
	SearchRoute: Route$3.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$11
	}),
	SubmitRoute: Route$2.update({
		id: "/submit",
		path: "/submit",
		getParentRoute: () => Route$11
	}),
	OffersIdRoute: Route$1.update({
		id: "/offers/$id",
		path: "/offers/$id",
		getParentRoute: () => Route$11
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { removePriorityItem as C, useCurrentUser as D, submitOffer as E, useCurrentUserState as O, removePriorityArea as S, saveProfile as T, listSources as _, addPriorityItem as a, moderateOffer as b, getOfferPersonalized as c, listNotifications as d, listOffers as f, listPriorityItems as g, listPriorityAreas as h, addPriorityArea as i, getProfile as l, listPendingOffers as m, Route$1 as n, getCoverage as o, listOffersPersonalized as p, Route$3 as r, getOffer as s, router_exports as t, listAreas as u, listStores as v, runCrawl as w, nearbyArea as x, markNotificationsRead as y };
