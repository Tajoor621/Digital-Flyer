import { formatDistanceToNowStrict, differenceInCalendarDays, parseISO } from "date-fns";
import type { CategoryId } from "./types";
import { CATEGORY_MAP } from "./categories";
import { offerMatchesQuery } from "./search-index";

export function formatMoney(
  amount: number,
  symbol: string,
  code: string,
  unit?: string | null,
): string {
  if (unit === "portal") return "See live price";
  if (amount === 0) return "Free";
  const digits = amount < 10 && !Number.isInteger(amount) ? 2 : amount < 100 ? 2 : 0;
  try {
    const formatted = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code,
      minimumFractionDigits: digits,
      maximumFractionDigits: 2,
    }).format(amount);
    if (formatted.includes(code) || /[£$€]/.test(formatted) || formatted.includes("Rs")) return formatted;
    return `${symbol} ${amount.toFixed(2)}`;
  } catch {
    return `${symbol} ${amount.toFixed(2)}`;
  }
}

export function relativeTime(iso: string): string {
  try {
    const d = parseISO(iso);
    return formatDistanceToNowStrict(d, { addSuffix: true });
  } catch {
    return "";
  }
}

export function endingLabel(endDate: string | null): string | null {
  if (!endDate) return null;
  try {
    const days = differenceInCalendarDays(parseISO(endDate), new Date());
    if (days < 0) return "Ended";
    if (days === 0) return "Ends today";
    if (days === 1) return "Ends tomorrow";
    if (days <= 3) return `${days} days left`;
    return null;
  } catch {
    return null;
  }
}

export function categoryLabel(id: string): string {
  return CATEGORY_MAP[id as CategoryId]?.label ?? id;
}

export function matchesPriorityItem(
  haystack: string,
  needles: { itemName: string; category?: string | null }[],
  offerCategory?: string,
  description?: string | null,
): boolean {
  return needles.some((p) => {
    const needle = p.itemName.trim();
    if (!needle) return false;
    if (offerMatchesQuery(haystack, description ?? null, offerCategory ?? "", needle)) return true;
    return Boolean(p.category && offerCategory && p.category === offerCategory);
  });
}
