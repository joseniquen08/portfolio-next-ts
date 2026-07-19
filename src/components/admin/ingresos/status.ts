import { Tables } from "@/types/database.types";
import { isBefore, parseISO, startOfDay } from "date-fns";

export type Job = Tables<"jobs">;
export type IncomeEntry = Tables<"income_entries">;
export type CollectedFilter = "all" | "collected" | "pending" | "overdue";

// A date due today is not yet overdue — compare start-of-day boundaries,
// not the raw instant (isPast() would flag "due today" as overdue from
// midnight onward).
export function isOverdue(e: IncomeEntry): boolean {
  if (e.is_paid || !e.expected_date) return false;
  return isBefore(startOfDay(parseISO(e.expected_date)), startOfDay(new Date()));
}

export function collectedBadge(e: IncomeEntry): { label: string; className: string } {
  if (e.is_paid) return { label: "Cobrado", className: "text-emerald-400" };
  if (isOverdue(e)) return { label: "Vencido", className: "text-red-400" };
  return { label: "Pendiente", className: "text-zinc-400" };
}

/** Format number as "1,200.00" — matches the tarjetas submodule convention. */
export function formatAmount(n: number): string {
  return n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  PEN: "S/",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export const CURRENCY_CODES = Object.keys(CURRENCY_SYMBOLS);

/** Currency symbol from ISO code. Falls back to the code itself. */
export function currencySymbol(currency: string | null | undefined): string {
  if (!currency) return "$";
  return CURRENCY_SYMBOLS[currency] ?? currency;
}

export function matchesStatusFilter(e: IncomeEntry, filter: CollectedFilter): boolean {
  if (filter === "all") return true;
  if (filter === "collected") return e.is_paid;
  if (filter === "overdue") return isOverdue(e);
  return !e.is_paid && !isOverdue(e); // pending
}

/** Sum `amount` grouped by `currency`, sorted by currency code. */
export function totalsByCurrency(entries: IncomeEntry[]): [string, number][] {
  const totals: Record<string, number> = {};
  for (const e of entries) {
    totals[e.currency] = (totals[e.currency] ?? 0) + e.amount;
  }
  return Object.entries(totals).sort(([a], [b]) => a.localeCompare(b));
}

/** Sorts by `expected_date` descending (most recent first); entries without
 * an `expected_date` interleave using `created_at` instead of being pushed
 * to the end. */
export function sortEntries(entries: IncomeEntry[]): IncomeEntry[] {
  const key = (e: IncomeEntry) => e.expected_date ?? e.created_at.slice(0, 10);
  return [...entries].sort((a, b) => {
    const dateDiff = key(b).localeCompare(key(a));
    if (dateDiff !== 0) return dateDiff;
    return b.created_at.localeCompare(a.created_at);
  });
}

/** "Julio 2026" style label for a "YYYY-MM" key. */
export function monthLabel(yyyymm: string): string {
  const [y, m] = yyyymm.split("-");
  const d = new Date(parseInt(y), parseInt(m) - 1, 1);
  const label = d.toLocaleDateString("es-PE", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/** Groups already-sorted entries into month buckets keyed by `mes_esperado`,
 * preserving each bucket's incoming (ascending) order, but with the buckets
 * themselves ordered most-recent-month-first. */
export function groupByMonth(entries: IncomeEntry[]): { key: string; entries: IncomeEntry[] }[] {
  const groups = new Map<string, IncomeEntry[]>();
  for (const e of entries) {
    const key = e.mes_esperado;
    const bucket = groups.get(key);
    if (bucket) bucket.push(e);
    else groups.set(key, [e]);
  }
  return Array.from(groups, ([key, entries]) => ({ key, entries })).sort((a, b) =>
    b.key.localeCompare(a.key)
  );
}
