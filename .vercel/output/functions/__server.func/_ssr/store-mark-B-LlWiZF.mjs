import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as cn, n as chainInitials, r as chainSlug } from "./utils-DL0OCngi.mjs";
import { A as Heart, C as Milk, E as MapPin, F as Cookie, G as Apple, I as Coffee, M as Globe, O as Image, P as Croissant, S as Newspaper, T as MessageCircle, U as Beef, V as Camera, _ as Search, d as Sparkles, f as Snowflake, g as Send, i as Users, j as Hash, n as Wheat, r as Video, s as TreePalm, u as SprayCan, w as MessageSquare, x as PenLine, y as Plane } from "../_libs/lucide-react.mjs";
import { a as SOURCE_LABELS } from "./categories-C_PyKy0I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-mark-B-LlWiZF.js
var import_jsx_runtime = require_jsx_runtime();
var MAP = {
	produce: Apple,
	dairy: Milk,
	meat: Beef,
	bakery: Croissant,
	pantry: Wheat,
	frozen: Snowflake,
	beverages: Coffee,
	snacks: Cookie,
	household: SprayCan,
	personal: Heart,
	digital: Sparkles,
	vacation: TreePalm,
	flights: Plane
};
function CategoryIcon({ id, className }) {
	const Icon = MAP[id] ?? Apple;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className,
		strokeWidth: 1.75
	});
}
function Badge({ className, tone = "muted", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
			muted: "bg-surface-2 text-muted",
			primary: "bg-primary-soft text-primary-deep",
			secondary: "bg-secondary-soft text-pin",
			accent: "bg-accent-soft text-accent",
			danger: "bg-danger-soft text-danger"
		}[tone], className),
		...props
	});
}
var ICONS = {
	website: Globe,
	facebook: Users,
	instagram: Camera,
	twitter: Hash,
	whatsapp: MessageCircle,
	pinterest: Image,
	search: Search,
	local: MapPin,
	tiktok: Video,
	telegram: Send,
	flyer: Newspaper,
	forum: MessageSquare,
	manual: PenLine
};
function SourceBadge({ type }) {
	const Icon = ICONS[type] ?? Globe;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		tone: "muted",
		className: "gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-3",
			strokeWidth: 2
		}), SOURCE_LABELS[type]]
	});
}
function StoreMark({ chain, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("grid size-10 shrink-0 place-items-center rounded-md text-xs font-semibold tracking-tight", `chain-${chainSlug(chain)}`, className),
		"aria-hidden": true,
		children: chainInitials(chain)
	});
}
//#endregion
export { StoreMark as i, CategoryIcon as n, SourceBadge as r, Badge as t };
