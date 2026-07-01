/** Key used in `admin_preferences` table to store the view state. */
export const VIEW_PREF_KEY = "tarjetas_view";

export type ViewRange = 3 | 6 | 12;

export interface ViewState {
  range: ViewRange;
  /** Rightmost period in the window, "YYYY-MM-01" */
  end:  string;
  hide: boolean;
}

const MONTH_ABBR = [
  "ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC",
];

/** "YYYY-MM-01" for the current real month. Always call server-side or inside useEffect to avoid hydration mismatch. */
export function currentMonthPeriod(): string {
  const now = new Date();
  const y   = now.getFullYear();
  const m   = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}-01`;
}

/** Shift a "YYYY-MM-01" period by N months (negative = backwards). */
export function shiftPeriod(period: string, months: number): string {
  const [y, m] = period.split("-").map(Number);
  const d  = new Date(y, m - 1 + months, 1);
  const ny = d.getFullYear();
  const nm = String(d.getMonth() + 1).padStart(2, "0");
  return `${ny}-${nm}-01`;
}

/** Build an ordered array of "YYYY-MM-01" strings for `range` months ending at (and including) `end`. */
export function buildWindow(end: string, range: number): string[] {
  const periods: string[] = [];
  for (let i = range - 1; i >= 0; i--) {
    periods.push(shiftPeriod(end, -i));
  }
  return periods;
}

// ─── View resolution ──────────────────────────────────────────────────────────

function isValidPeriod(s: string): boolean {
  return /^\d{4}-\d{2}-01$/.test(s);
}

function normalizeEnd(s: string | undefined): string | null {
  if (!s) return null;
  const clean = s.length === 7 ? `${s}-01` : s;
  return isValidPeriod(clean) ? clean : null;
}

function parseRange(s: string): ViewRange | null {
  if (s === "3")  return 3;
  if (s === "6")  return 6;
  if (s === "12") return 12;
  return null;
}

/**
 * Resolve the active view from the saved DB preference, falling back to defaults.
 * `savedValue` is the raw `value` jsonb column from `admin_preferences`.
 */
export function resolveView(savedValue: unknown): ViewState {
  if (savedValue && typeof savedValue === "object") {
    const obj   = savedValue as Record<string, unknown>;
    const range = parseRange(String(obj.r ?? ""));
    const end   = normalizeEnd(typeof obj.end === "string" ? obj.end : undefined);
    return {
      range: range ?? 6,
      end:   end   ?? currentMonthPeriod(),
      hide:  obj.hide === 1 || obj.hide === true,
    };
  }
  return { range: 6, end: currentMonthPeriod(), hide: false };
}

/** Serialize view state as a plain object for DB storage. */
export function serializeView(view: ViewState): { r: number; end: string; hide: number } {
  return { r: view.range, end: view.end.slice(0, 7), hide: view.hide ? 1 : 0 };
}

/** "ENE 26 – JUN 26" style label for a window. */
export function windowLabel(periods: string[]): string {
  if (periods.length === 0) return "";
  const fmt = (p: string) => {
    const [y, m] = p.split("-");
    return `${MONTH_ABBR[parseInt(m) - 1]} ${y.slice(2)}`;
  };
  if (periods.length === 1) return fmt(periods[0]);
  return `${fmt(periods[0])} – ${fmt(periods[periods.length - 1])}`;
}
