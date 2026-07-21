import { Tables } from "@/types/database.types";

export type CreditCard = Tables<"credit_cards">;
export type Statement  = Tables<"card_statements">;
export type Adjustment = Tables<"period_adjustments">;

export const MONTH_NAMES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

export const MONTH_ABBR = [
  "ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC",
];

/** "YYYY-MM-01" → "ENE 2026" */
export function periodLabel(period: string): string {
  const [y, m] = period.split("-");
  return `${MONTH_ABBR[parseInt(m) - 1]} ${y}`;
}

/** "YYYY-MM-01" → "Junio 2026" */
export function periodTitle(period: string): string {
  const [y, m] = period.split("-");
  return `${MONTH_NAMES[parseInt(m) - 1]} ${y}`;
}

/** Format number as "1,200.00" */
export function formatAmount(n: number): string {
  return n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  PEN: "S/",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

/** Currency symbol from ISO code. Falls back to the code itself. */
export function currencySymbol(currency: string | null | undefined): string {
  if (!currency) return "S/";
  return CURRENCY_SYMBOLS[currency] ?? currency;
}

/**
 * Extract `[currency, amount]` pairs from the JSONB `amounts` field.
 * Always sorted by currency code for consistent display order.
 */
export function amountEntries(amounts: unknown): [string, number][] {
  if (!amounts || typeof amounts !== "object" || Array.isArray(amounts)) return [];
  return (Object.entries(amounts as Record<string, unknown>)
    .filter(([, v]) => typeof v === "number")
    .map(([k, v]) => [k, v as number] as [string, number]))
    .sort(([a], [b]) => a.localeCompare(b));
}

/** Sum all amounts across currencies. Use only for single-currency contexts. */
export function totalAmount(amounts: unknown): number {
  return amountEntries(amounts).reduce((sum, [, v]) => sum + v, 0);
}

/** Merge multiple `amounts` JSONB values into one Record, summing per currency. */
export function mergeAmounts(list: unknown[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const a of list) {
    for (const [cur, val] of amountEntries(a)) {
      result[cur] = (result[cur] ?? 0) + val;
    }
  }
  return result;
}

export type Advance = Tables<"statement_advances">;

/**
 * `Statement` extended with its (optional) advances.
 * Real data is populated by the PostgREST embed added in PR 3 (`page.tsx`);
 * until then callers may omit it and settlement logic treats it as empty.
 */
export type StatementWithAdvances = Statement & { advances?: Advance[] };

/**
 * Per-currency coverage of a statement's owed amount by its advances.
 * `required`/`covered` are only computed for currencies present in `owed` or `paid`.
 */
export interface CurrencyCoverage {
  required: number;
  covered: number;
  isCovered: boolean;
  excess: number;
}

export interface SettlementResult {
  perCurrency: Record<string, CurrencyCoverage>;
  /** True only when every currency with owed > 0 is individually covered. */
  fullyCovered: boolean;
  hasAdvances: boolean;
  /** Per-currency sobrepago (excess > 0 only). */
  excess: Record<string, number>;
}

/** Cent-integer conversion to avoid float drift when comparing amounts. */
const cents = (n: number): number => Math.round(n * 100);

/** Sum advance amounts grouped by currency. */
export function sumAdvancesByCurrency(
  advances: Pick<Advance, "amount" | "currency">[]
): Record<string, number> {
  const acc: Record<string, number> = {};
  for (const a of advances) {
    acc[a.currency] = (acc[a.currency] ?? 0) + Number(a.amount);
  }
  return acc;
}

/**
 * Compute per-currency settlement coverage of a statement's `amounts` by its advances.
 * Currencies are evaluated INDEPENDENTLY — never summed/blended together.
 */
export function computeSettlement(
  amounts: unknown,
  advances: Pick<Advance, "amount" | "currency">[]
): SettlementResult {
  const owed = Object.fromEntries(amountEntries(amounts).filter(([, v]) => v > 0));
  const paid = sumAdvancesByCurrency(advances);
  const currencies = new Set([...Object.keys(owed), ...Object.keys(paid)]);

  const perCurrency: Record<string, CurrencyCoverage> = {};
  const excess: Record<string, number> = {};
  let fully = true;

  for (const cur of currencies) {
    const required = owed[cur] ?? 0;
    const covered = paid[cur] ?? 0;
    const isCovered = cents(covered) >= cents(required);
    const exc = Math.max(0, covered - required);
    perCurrency[cur] = { required, covered, isCovered, excess: exc };
    if (exc > 0) excess[cur] = exc;
    if (required > 0 && !isCovered) fully = false;
  }

  const hasRequired = Object.keys(owed).length > 0;
  const hasAdvances = Object.values(paid).some((v) => v > 0);

  return { perCurrency, fullyCovered: hasRequired && fully, hasAdvances, excess };
}

export type CellStatus = "pagado" | "vencido" | "parcial" | "estimado" | "por_pagar" | "sin_registrar";

/** Primary status for coloring a matrix cell.
 *  Precedence: pagado › vencido › parcial › estimado › por_pagar
 *  Note: vencido wins over parcial/estimado (urgency takes priority).
 *  `settlement` is optional — callers that don't pass it never resolve "parcial"
 *  and keep prior behavior (e.g. before advances data is wired through). */
export function cellStatus(
  statement: Statement | undefined,
  today: string,
  settlement?: SettlementResult
): CellStatus {
  if (!statement)           return "sin_registrar";
  if (statement.is_paid)    return "pagado";
  if (statement.due_date && statement.due_date < today) return "vencido";
  if (settlement?.hasAdvances && !settlement.fullyCovered) return "parcial";
  if (statement.is_estimated) return "estimado";
  return "por_pagar";
}

/**
 * Tailwind text-color class for a CellStatus.
 * Pass isCurrent = true for the current-month column/row to get a slightly
 * brighter shade of sky blue (sky-300 vs sky-400).
 */
export function statusTextClass(status: CellStatus, isCurrent = false): string {
  switch (status) {
    case "pagado":    return "text-emerald-400";
    case "vencido":   return "text-red-400";
    case "parcial":   return "text-teal-400";
    case "estimado":  return "text-amber-400";
    case "por_pagar": return isCurrent ? "text-sky-300" : "text-sky-400";
    default:          return "text-zinc-300";
  }
}

/** Days from today to dateStr. Negative = past. */
export function daysUntil(dateStr: string, today: string): number {
  const a = new Date(today + "T12:00:00");
  const b = new Date(dateStr + "T12:00:00");
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Resolve the effective due date for a statement + card + period.
 * Uses statement.due_date if present; otherwise derives it from card.default_payment_day.
 */
export function resolveDueDate(
  statement: Statement,
  card: CreditCard,
  period: string
): string | null {
  if (statement.due_date) return statement.due_date;
  if (!card.default_payment_day) return null;
  const [y, m] = period.split("-");
  const maxDay = new Date(parseInt(y), parseInt(m), 0).getDate();
  const day = Math.min(card.default_payment_day, maxDay);
  return `${y}-${m}-${String(day).padStart(2, "0")}`;
}

/** Human-readable label for days until a date */
export function daysLabel(days: number): string {
  if (days < 0) return `vencido hace ${Math.abs(days)} ${Math.abs(days) === 1 ? "día" : "días"}`;
  if (days === 0) return "vence hoy";
  if (days === 1) return "vence mañana";
  return `vence en ${days} días`;
}

/**
 * Select which period the MonthSummary should focus on.
 *
 * Priority:
 *  1. Oldest period with an overdue (unpaid + past due-date) statement.
 *  2. Nearest period >= currentPeriod that still has pending (unpaid) statements.
 *  3. currentPeriod (all caught up).
 */
export function selectSummaryPeriod(
  cards: CreditCard[],
  statements: Statement[],
  currentPeriod: string,
  today: string,
): string {
  // Index cards by id for quick lookup
  const cardById = Object.fromEntries(cards.map((c) => [c.id, c]));

  // Collect all unique periods from statements
  const periods = [...new Set(statements.map((s) => s.period))].sort();

  // 1. Overdue: unpaid statement with resolved due-date < today (past periods)
  const overduePeriods: string[] = [];
  for (const period of periods) {
    const stmts = statements.filter((s) => s.period === period && !s.is_paid);
    const hasOverdue = stmts.some((s) => {
      const card = cardById[s.card_id];
      if (!card) return false;
      const due = resolveDueDate(s, card, period);
      return due !== null && due < today;
    });
    if (hasOverdue) overduePeriods.push(period);
  }
  if (overduePeriods.length > 0) return overduePeriods[0]; // oldest

  // 2. Forward pending: nearest period >= currentPeriod with unpaid statements
  const forwardPending = periods
    .filter((p) => p >= currentPeriod)
    .find((p) => statements.some((s) => s.period === p && !s.is_paid));
  if (forwardPending) return forwardPending;

  // 3. All caught up
  return currentPeriod;
}

export type CreditLimitChange = Tables<"credit_limit_changes">;

/** "YYYY-MM-01" → "YYYY-MM-DD" of the last day of that month. */
function monthEnd(period: string): string {
  const [y, m] = period.split("-");
  const maxDay = new Date(parseInt(y), parseInt(m), 0).getDate();
  return `${y}-${m}-${String(maxDay).padStart(2, "0")}`;
}

/**
 * Derive the credit limit in effect as of `asOf`: the row whose validity
 * range covers that date (`start_date` NULL or <= asOf, AND `end_date`
 * NULL or > asOf). Without `asOf`, returns the currently-open row
 * (`end_date IS NULL`). Returns null when no row's range covers the date —
 * a genuinely unknown period, never guessed. Pure/derived — never stored.
 */
export function currentCreditLimit(
  changes: Pick<CreditLimitChange, "amount" | "currency" | "start_date" | "end_date">[],
  asOf?: string
): { amount: number; currency: string } | null {
  const match = asOf
    ? changes.find((c) =>
        (c.start_date === null || c.start_date <= asOf) &&
        (c.end_date === null || c.end_date > asOf)
      )
    : changes.find((c) => c.end_date === null);
  return match ? { amount: Number(match.amount), currency: match.currency } : null;
}

/**
 * "Línea disponible" (available credit) for a card in a given period:
 * the credit limit in effect as of that period's month-end −
 * (that period's statement total − advances covering it), evaluated in
 * the limit's own currency per the auto-settlement rule.
 * Returns null when there's no credit-limit range covering that period.
 */
export function computeAvailableCredit(
  creditLimitChanges: Pick<CreditLimitChange, "amount" | "currency" | "start_date" | "end_date">[],
  statement: StatementWithAdvances | undefined,
  period?: string
): { amount: number; currency: string } | null {
  const limit = currentCreditLimit(creditLimitChanges, period ? monthEnd(period) : undefined);
  if (!limit) return null;
  if (!statement) return limit;

  const owed = amountEntries(statement.amounts).find(([cur]) => cur === limit.currency)?.[1] ?? 0;
  const settlement = computeSettlement(statement.amounts, statement.advances ?? []);
  const covered = settlement.perCurrency[limit.currency]?.covered ?? 0;
  const outstanding = Math.max(0, owed - covered);

  return { amount: limit.amount - outstanding, currency: limit.currency };
}

/** Tailwind text-color class for urgency */
export function urgencyClass(days: number): string {
  if (days < 0)  return "text-red-400";    // vencido — rojo exclusivo
  if (days <= 3) return "text-orange-400"; // urgente pero a tiempo
  if (days <= 7) return "text-amber-400";  // próximo
  return "text-zinc-300";                  // holgado
}
