import { HiCheckCircle, HiClock } from "react-icons/hi";
import { cn } from "@/utils/shadcn";
import {
  CreditCard, Statement, Adjustment,
  periodTitle, formatAmount, currencySymbol,
  amountEntries, resolveDueDate, daysUntil, daysLabel, urgencyClass,
  selectSummaryPeriod,
} from "./status";

interface Props {
  cards:         CreditCard[];
  statements:    Statement[];
  adjustments:   Adjustment[];
  currentPeriod: string;
  today:         string;
}

interface CurrencyTotals {
  total:   number;
  paid:    number;
  pending: number;
}

export function MonthSummary({ cards, statements, adjustments, currentPeriod, today }: Props) {
  // Dynamic focus: may differ from currentPeriod based on urgency/paid state
  const focusPeriod = selectSummaryPeriod(cards, statements, currentPeriod, today);
  const isFocused   = focusPeriod !== currentPeriod;
  const focusIsPast = focusPeriod < currentPeriod;

  const currentStatements  = statements.filter((s) => s.period === focusPeriod);
  const currentAdjustments = adjustments.filter((a) => a.period === focusPeriod);

  // Aggregate per-currency totals across all statements
  const byCurrency: Record<string, CurrencyTotals> = {};
  for (const s of currentStatements) {
    for (const [cur, amt] of amountEntries(s.amounts)) {
      if (!byCurrency[cur]) byCurrency[cur] = { total: 0, paid: 0, pending: 0 };
      byCurrency[cur].total += amt;
      if (s.is_paid) byCurrency[cur].paid += amt;
      else           byCurrency[cur].pending += amt;
    }
  }

  // Adjustments are currency-agnostic (single number); show them separately
  const adjTotal = currentAdjustments.reduce((sum, a) => sum + a.amount, 0);

  const currencyEntries = Object.entries(byCurrency).sort(([a], [b]) => a.localeCompare(b));
  const totalCount = currentStatements.length;
  const paidCount  = currentStatements.filter((s) => s.is_paid).length;
  const allPaid    = totalCount > 0 && paidCount === totalCount;

  // #10: detect truly overdue statements (unpaid + past due date)
  const cardById = Object.fromEntries(cards.map((c) => [c.id, c]));
  const hasOverdue = currentStatements.some((s) => {
    if (s.is_paid) return false;
    const card = cardById[s.card_id];
    if (!card) return false;
    const due = resolveDueDate(s, card, focusPeriod);
    return due !== null && due < today;
  });

  // Find the unpaid statement with the nearest due date
  type NextDue = { cardName: string; days: number };
  let nextDue: NextDue | null = null;
  for (const s of currentStatements) {
    if (s.is_paid) continue;
    const card = cards.find((c) => c.id === s.card_id);
    if (!card) continue;
    const due = resolveDueDate(s, card, focusPeriod);
    if (!due) continue;
    const days = daysUntil(due, today);
    if (!nextDue || days < nextDue.days) {
      nextDue = { cardName: card.name, days };
    }
  }

  // ── Badge copy ─────────────────────────────────────────────────────────────
  let badgeText: string | null = null;
  let badgeClass = "text-zinc-500";
  if (isFocused) {
    const currentLabel = periodTitle(currentPeriod);
    const focusLabel   = periodTitle(focusPeriod);
    if (focusIsPast) {
      badgeText  = `Pago pendiente de ${focusLabel}`;
      badgeClass = "text-red-400";
    } else {
      badgeText  = `${currentLabel} al día · mostrando ${focusLabel}`;
      badgeClass = "text-zinc-500";
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold text-white">{periodTitle(focusPeriod)}</h2>
          {badgeText && (
            <p className={cn("text-[11px] mt-0.5", badgeClass)}>{badgeText}</p>
          )}
        </div>
        {totalCount > 0 && (
          <span className="text-xs text-zinc-500 mt-0.5 shrink-0">
            {totalCount} {totalCount === 1 ? "tarjeta registrada" : "tarjetas registradas"}
          </span>
        )}
      </div>

      {totalCount === 0 ? (
        <p className="text-xs text-zinc-600">Sin estados registrados para este mes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* ── 1. Por pagar ───────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Por pagar</p>
              {/* #10: overdue chip */}
              {hasOverdue && !allPaid && (
                <span className="text-[10px] text-red-400 font-medium">● Vencido</span>
              )}
            </div>
            {allPaid ? (
              <p className="text-2xl font-semibold text-emerald-400">—</p>
            ) : currencyEntries.length > 0 ? (
              <div className="space-y-0.5">
                {currencyEntries.map(([cur, totals]) => (
                  <p
                    key={cur}
                    // #10: pending amount turns red when truly overdue
                    className={cn(
                      "text-2xl font-semibold tabular-nums leading-tight",
                      hasOverdue ? "text-red-400" : "text-white"
                    )}
                  >
                    {currencySymbol(cur)}&nbsp;{formatAmount(totals.pending)}
                  </p>
                ))}
                {adjTotal !== 0 && (
                  <p className="text-xs text-zinc-500 mt-1">
                    {adjTotal >= 0 ? "+" : ""}{formatAmount(adjTotal)} en ajustes
                  </p>
                )}
                {/* #2: only show "de X este mes" when there are partial payments */}
                {paidCount > 0 && (
                  <p className="text-xs text-zinc-600 mt-1">
                    de{" "}
                    {currencyEntries.map(([cur, t], i) => (
                      <span key={cur}>
                        {i > 0 && " · "}
                        {currencySymbol(cur)}&nbsp;{formatAmount(t.total)}
                      </span>
                    ))}
                    {" "}este mes
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-zinc-600">Sin montos</p>
            )}
          </div>

          {/* ── 2. Progreso ────────────────────────────────────────────── */}
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Pagadas</p>
            <p className="text-2xl font-semibold text-white mb-3">
              {paidCount}{" "}
              <span className="text-sm font-normal text-zinc-500">de {totalCount}</span>
            </p>
            {/* segmented progress bar — ordered by card row; paid = card color, all done = all green */}
            {(() => {
              const barStatements = [...currentStatements].sort(
                (a, b) => cards.findIndex((c) => c.id === a.card_id) - cards.findIndex((c) => c.id === b.card_id)
              );
              return (
                <div className="flex gap-1">
                  {barStatements.map((s) => {
                    const card = cards.find((c) => c.id === s.card_id);
                    const paidColor = allPaid ? undefined : card?.color;
                    return (
                      <div
                        key={s.id}
                        className={cn(
                          "flex-1 h-1.5 rounded-full transition-colors duration-500",
                          s.is_paid ? (paidColor ? "" : "bg-emerald-500") : "bg-zinc-800"
                        )}
                        style={s.is_paid && paidColor ? { backgroundColor: paidColor } : undefined}
                      />
                    );
                  })}
                </div>
              );
            })()}
            {paidCount > 0 && currencyEntries.length > 0 && (
              <p className="text-[11px] text-zinc-600 mt-1.5">
                {currencyEntries.map(([cur, t], i) => (
                  <span key={cur}>
                    {i > 0 && " · "}
                    Pagado {currencySymbol(cur)}&nbsp;{formatAmount(t.paid)}
                  </span>
                ))}
              </p>
            )}
          </div>

          {/* ── 3. Próximo vencimiento ─────────────────────────────────── */}
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
              Próximo vencimiento
            </p>
            {allPaid ? (
              <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                <HiCheckCircle className="w-4 h-4 shrink-0" />
                Todo al día
              </p>
            ) : nextDue ? (
              <>
                <p className={cn("flex items-center gap-1.5 text-base font-semibold", urgencyClass(nextDue.days))}>
                  <HiClock className="w-4 h-4 shrink-0" />
                  {nextDue.cardName}
                </p>
                <p className={cn("text-sm mt-0.5", urgencyClass(nextDue.days))}>
                  {daysLabel(nextDue.days)}
                </p>
              </>
            ) : (
              <p className="text-sm text-zinc-600">Sin fecha registrada</p>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
