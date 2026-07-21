"use client";

import { useTransition } from "react";
import { HiCheck, HiOutlinePencil, HiPlus } from "react-icons/hi";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/utils/shadcn";
import { togglePaid } from "@/app/(admin)/admin/(protected)/financiero/tarjetas/actions";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  CreditCard, Statement, StatementWithAdvances, Adjustment, CreditLimitChange,
  periodLabel, formatAmount, currencySymbol,
  amountEntries, mergeAmounts, cellStatus, statusTextClass, computeSettlement,
  currentCreditLimit, computeAvailableCredit, monthEnd, MONTH_ABBR,
} from "./status";

interface Props {
  cards:              CreditCard[];
  statements:         StatementWithAdvances[];
  adjustments:        Adjustment[];
  creditLimitChanges: CreditLimitChange[];
  periods:            string[];
  currentPeriod:      string;
  focusPeriod:        string;  // #1: the period the summary card is highlighting
  today:              string;
  onEditStatement:    (card: CreditCard, period: string, statement?: Statement) => void;
  onEditCard:         (card: CreditCard) => void;
  onAddAdjustment:    (period: string) => void;
  onEditAdjustment:   (period: string, adjustment: Adjustment) => void;
}

// ─── Format a cycle date range compactly: "8 ENE – 6 FEB" ────────────────────

function formatCycleRange(start: string, end: string): string {
  const s = new Date(start + "T12:00:00");
  const e = new Date(end   + "T12:00:00");
  const sd = s.getDate();
  const ed = e.getDate();
  const sm = MONTH_ABBR[s.getMonth()];
  const em = MONTH_ABBR[e.getMonth()];
  return sm === em ? `${sd}–${ed} ${sm}` : `${sd} ${sm} – ${ed} ${em}`;
}

// ─── Shared micro-button class for "pill" actions ──────────────────────────────

const pillBtn =
  "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] border border-transparent " +
  "cursor-pointer transition-colors hover:bg-zinc-800 hover:border-zinc-700";

// ─── Column accent helpers (#1) ───────────────────────────────────────────────

// Background tint only — applied to every body cell in the focus column
function focusColBg(focusPeriod: string, currentPeriod: string): string {
  return focusPeriod < currentPeriod ? "bg-red-950/15" : "bg-sky-950/15";
}

// Bottom-border accent — applied only to the header cell of the focus column
function focusColHeaderBorder(focusPeriod: string, currentPeriod: string): string {
  return focusPeriod < currentPeriod
    ? "border-b-2 border-red-500/60"
    : "border-b-2 border-sky-500/60";
}

// ─── Cell ─────────────────────────────────────────────────────────────────────

function MatrixCell({
  card, period, statement, currentPeriod, focusPeriod, today, onEdit,
}: {
  card:          CreditCard;
  period:        string;
  statement:     StatementWithAdvances | undefined;
  currentPeriod: string;
  focusPeriod:   string;
  today:         string;
  onEdit:        () => void;
}) {
  const [, startTransition] = useTransition();
  const settlement = statement
    ? computeSettlement(statement.amounts, statement.advances ?? [])
    : undefined;
  const status    = cellStatus(statement, today, settlement);
  const hasExcess = !!settlement && Object.keys(settlement.excess).length > 0;
  const isCurrent = period === currentPeriod;
  const isFocus   = period === focusPeriod && period !== currentPeriod;

  function handleTogglePaid(e: React.MouseEvent) {
    e.stopPropagation();
    if (!statement) return;
    startTransition(() => togglePaid(card.id, period, !statement.is_paid));
  }

  const cellBg = cn(
    isCurrent && "bg-zinc-900/30",
    isFocus   && focusColBg(focusPeriod, currentPeriod)
  );

  // Pre-compute due date parts for display
  const dueDateObj = statement?.due_date
    ? new Date(statement.due_date + "T12:00:00")
    : null;
  const dueDayStr = dueDateObj
    ? `vence ${dueDateObj.getDate()} ${MONTH_ABBR[dueDateObj.getMonth()]}`
    : null;

  if (!statement) {
    return (
      // Empty cell: centered to match the centered metadata in data cells
      <TableCell className={cn("px-3 py-3 text-center min-w-[6.5rem]", cellBg)}>
        <button
          onClick={onEdit}
          title="Registrar estado de cuenta para este mes"
          className={cn(
            "inline-flex items-center gap-1 rounded px-1.5 py-0.5 border",
            "text-[10px] text-zinc-700 border-zinc-800 cursor-pointer",
            "hover:text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700",
            "transition-colors"
          )}
        >
          <HiPlus className="w-3 h-3" />
          <span>Registrar</span>
        </button>
      </TableCell>
    );
  }

  return (
    <TableCell className={cn("px-3 py-3 min-w-[6.5rem]", cellBg)}>
      {/* Single vertical axis: amount+checkbox centered as a unit, metadata centered below */}
      <div
        onClick={onEdit}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onEdit()}
        className="group w-full cursor-pointer outline-none flex flex-col items-center gap-1"
        title="Editar estado de cuenta"
      >
        {/* Amounts + paid toggle — centered as a unit */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end gap-px">
            {/* show non-zero entries; fall back to first entry (dimmed) if all zero */}
            {(() => {
              const entries = amountEntries(statement.amounts);
              const nonZero = entries.filter(([, amt]) => amt !== 0);
              const display = nonZero.length > 0 ? nonZero : entries.slice(0, 1);
              return display.map(([cur, amt]) => (
                <span
                  key={cur}
                  className={cn(
                    "font-sans text-sm tabular-nums",
                    amt === 0 ? "text-zinc-600" : statusTextClass(status, isCurrent)
                  )}
                >
                  {currencySymbol(cur)}&nbsp;{formatAmount(amt)}
                </span>
              ));
            })()}
          </div>

          <button
            onClick={handleTogglePaid}
            title={statement.is_paid ? "Desmarcar como pagado" : "Marcar como pagado"}
            className={cn(
              "shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors border cursor-pointer",
              statement.is_paid
                ? "bg-emerald-600/80 border-emerald-600 text-white"
                : status === "vencido"
                ? "border-red-800 text-zinc-700 hover:border-red-500 hover:text-red-400"
                : "border-zinc-700 text-zinc-700 hover:border-zinc-500 hover:text-zinc-400"
            )}
          >
            <HiCheck className="w-3 h-3" />
          </button>
        </div>

        {/* Sobrepago badge — shown when advances overshoot the owed amount in at least one currency */}
        {hasExcess && (
          <span
            title="Adelanto supera el monto adeudado en al menos una moneda"
            className="inline-flex items-center rounded px-1 py-0.5 text-[9px] leading-none text-teal-400 border border-teal-800/60 bg-teal-950/30"
          >
            sobrepago
          </span>
        )}

        {/* Metadata — centered on the same axis as the amount+checkbox row */}
        {(dueDayStr || (statement.cycle_start && statement.cycle_end)) && (
          <div className={cn(
            "text-[10px] text-center leading-tight",
            status === "vencido" ? "text-red-700" : "text-zinc-500"
          )}>
            {dueDayStr && <div>{dueDayStr}</div>}
            {/* Cycle range: slides down and fades in on row hover */}
            {statement.cycle_start && statement.cycle_end && (
              <div className="opacity-0 translate-y-[-4px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                {formatCycleRange(statement.cycle_start, statement.cycle_end)}
              </div>
            )}
          </div>
        )}
      </div>
    </TableCell>
  );
}

// ─── Sortable card row ────────────────────────────────────────────────────────

function SortableCardRow({
  card, periods, currentPeriod, focusPeriod, today, creditLimitChanges,
  getStatement, onEditStatement, onEditCard,
}: {
  card:               CreditCard;
  periods:            string[];
  currentPeriod:      string;
  focusPeriod:        string;
  today:              string;
  creditLimitChanges: CreditLimitChange[];
  getStatement:       (cardId: string, period: string) => StatementWithAdvances | undefined;
  onEditStatement:    (card: CreditCard, period: string, statement?: Statement) => void;
  onEditCard:         (card: CreditCard) => void;
}) {
  const {
    attributes, listeners, setNodeRef,
    transform, transition, isDragging,
  } = useSortable({ id: card.id });

  // Credit limit in effect for the current period (point-in-time) — the
  // reliable figure, since it comes from what the user explicitly registered.
  const cardLimitChanges = creditLimitChanges.filter((c) => c.card_id === card.id);
  const creditLimit = currentCreditLimit(cardLimitChanges, monthEnd(currentPeriod));
  // "Línea disponible" is only ever an approximation — it can't reflect same-day
  // spending the user hasn't registered in a statement yet.
  const availableCredit = computeAvailableCredit(
    cardLimitChanges,
    getStatement(card.id, currentPeriod),
    currentPeriod
  );

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        position: "relative",
        zIndex: isDragging ? 1 : undefined,
      }}
      // #9: stronger row highlight (20→40) for easier horizontal scanning
      className="border-zinc-800/50 hover:bg-zinc-900/40 transition-colors group"
      {...attributes}
    >
      {/* Drag handle — #3: hidden on desktop until hover; always visible on mobile */}
      {/* #6: sticky first column */}
      <TableCell className="px-2 py-3 w-6 sticky left-0 z-10 bg-zinc-950 group-hover:bg-zinc-900/40 transition-colors">
        <span
          {...listeners}
          className={cn(
            "flex flex-col items-center justify-center gap-[3px] w-4 h-6 rounded cursor-grab active:cursor-grabbing",
            "text-zinc-700 hover:text-zinc-400 transition-colors select-none",
            // #3: always visible on mobile (no hover state), fade-in on desktop hover
            "opacity-100 md:opacity-0 md:group-hover:opacity-100"
          )}
          title="Arrastrar para reordenar"
          aria-label="Arrastrar"
        >
          <span className="flex gap-[3px]">
            <span className="w-[3px] h-[3px] rounded-full bg-current" />
            <span className="w-[3px] h-[3px] rounded-full bg-current" />
          </span>
          <span className="flex gap-[3px]">
            <span className="w-[3px] h-[3px] rounded-full bg-current" />
            <span className="w-[3px] h-[3px] rounded-full bg-current" />
          </span>
          <span className="flex gap-[3px]">
            <span className="w-[3px] h-[3px] rounded-full bg-current" />
            <span className="w-[3px] h-[3px] rounded-full bg-current" />
          </span>
        </span>
      </TableCell>

      {/* Card name — #6: sticky second column */}
      <TableCell className="px-4 py-3 sticky left-6 z-10 bg-zinc-950 group-hover:bg-zinc-900/40 transition-colors">
        <div className="flex items-center gap-2">
          {card.color && (
            <span
              className="w-2.5 h-2.5 rounded-sm ring-1 ring-white/15 shrink-0"
              style={{ backgroundColor: card.color }}
            />
          )}
          <span className="text-sm font-medium text-zinc-200 whitespace-nowrap">
            {card.name}
          </span>
        </div>
        {creditLimit && (
          <div className="mt-0.5 space-y-0.5">
            <p className="text-[11px] text-zinc-500 whitespace-nowrap">
              Línea {currencySymbol(creditLimit.currency)}&nbsp;{formatAmount(creditLimit.amount)}
            </p>
            {availableCredit && (
              <p className="text-[11px] text-zinc-600 whitespace-nowrap">
                Disp. aprox. {currencySymbol(availableCredit.currency)}&nbsp;{formatAmount(availableCredit.amount)}
              </p>
            )}
          </div>
        )}
      </TableCell>

      {periods.map((p) => (
        <MatrixCell
          key={p}
          card={card}
          period={p}
          statement={getStatement(card.id, p)}
          currentPeriod={currentPeriod}
          focusPeriod={focusPeriod}
          today={today}
          onEdit={() => onEditStatement(card, p, getStatement(card.id, p))}
        />
      ))}

      {/* Edit card button */}
      <TableCell className="px-2 py-3">
        <button
          onClick={() => onEditCard(card)}
          aria-label={`Editar ${card.name}`}
          title={`Editar ${card.name}`}
          className={cn(
            "w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer",
            "text-zinc-600 opacity-40 group-hover:opacity-100",
            "hover:bg-zinc-800 hover:text-zinc-300 hover:opacity-100"
          )}
        >
          <HiOutlinePencil className="w-3.5 h-3.5" />
        </button>
      </TableCell>
    </TableRow>
  );
}

// ─── Main table ────────────────────────────────────────────────────────────────

export function MatrixTable({
  cards, statements, adjustments, creditLimitChanges, periods, currentPeriod, focusPeriod, today,
  onEditStatement, onEditCard, onAddAdjustment, onEditAdjustment,
}: Props) {
  function getStatement(cardId: string, period: string) {
    return statements.find((s) => s.card_id === cardId && s.period === period);
  }
  function getAdjustments(period: string) {
    return adjustments.filter((a) => a.period === period);
  }
  function periodTotals(period: string): Record<string, number> {
    const stmtAmounts = cards
      .map((c) => getStatement(c.id, period)?.amounts)
      .filter(Boolean);
    return mergeAmounts(stmtAmounts);
  }
  function periodPaidCount(period: string) {
    return cards.filter((c) => getStatement(c.id, period)?.is_paid).length;
  }
  function periodStatementCount(period: string) {
    return cards.filter((c) => !!getStatement(c.id, period)).length;
  }
  function isAllPaid(period: string) {
    const relevant = cards.filter((c) => getStatement(c.id, period));
    return relevant.length > 0 && relevant.every((c) => getStatement(c.id, period)?.is_paid);
  }

  const focusIsPast = focusPeriod < currentPeriod;

  return (
    <div className="rounded-lg border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              {/* #6: sticky header cells */}
              <TableHead className="w-6 px-2 sticky left-0 z-20 bg-zinc-950" />
              <TableHead className="px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider w-36 whitespace-nowrap sticky left-6 z-20 bg-zinc-950">
                Tarjeta
              </TableHead>
              {periods.map((p, i) => {
                const isCurrent = p === currentPeriod;
                const isFocus   = p === focusPeriod && p !== currentPeriod;
                const year      = p.slice(0, 4);
                const prevYear  = i > 0 ? periods[i - 1].slice(0, 4) : null;
                const showYear  = i === 0 || year !== prevYear;
                const [, m]     = p.split("-");
                const monthAbbr = MONTH_ABBR[parseInt(m) - 1];
                return (
                  <TableHead
                    key={p}
                    className={cn(
                      "px-3 py-3 text-center text-xs uppercase tracking-wider whitespace-nowrap min-w-[6.5rem]",
                      // today's month — white underline accent
                      isCurrent && "text-white font-semibold bg-zinc-900/30 border-b-2 border-zinc-400",
                      // focus month — colour underline accent + bg tint (border only in header)
                      isFocus && cn(
                        "font-semibold",
                        focusIsPast ? "text-red-400" : "text-sky-400",
                        focusColBg(focusPeriod, currentPeriod),
                        focusColHeaderBorder(focusPeriod, currentPeriod)
                      ),
                      !isCurrent && !isFocus && "text-zinc-500 font-medium"
                    )}
                  >
                    <div>
                      {monthAbbr}
                      {showYear && (
                        <span className="text-zinc-600 font-normal ml-1">{year}</span>
                      )}
                    </div>
                    {/* #4: micro-label to disambiguate today vs focus */}
                    {isCurrent && (
                      <div className="text-[9px] font-medium tracking-wider mt-0.5 text-zinc-400 normal-case">
                        hoy
                      </div>
                    )}
                    {isFocus && (
                      <div className={cn(
                        "text-[9px] font-medium tracking-wider mt-0.5 normal-case",
                        focusIsPast ? "text-red-400" : "text-sky-400"
                      )}>
                        {focusIsPast ? "pendiente" : "en foco"}
                      </div>
                    )}
                  </TableHead>
                );
              })}
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>

          <TableBody>
            <SortableContext
              items={cards.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {cards.map((card) => (
                <SortableCardRow
                  key={card.id}
                  card={card}
                  periods={periods}
                  currentPeriod={currentPeriod}
                  focusPeriod={focusPeriod}
                  today={today}
                  creditLimitChanges={creditLimitChanges}
                  getStatement={getStatement}
                  onEditStatement={onEditStatement}
                  onEditCard={onEditCard}
                />
              ))}
            </SortableContext>

            {/* Separator */}
            <TableRow className="border-0">
              <TableCell colSpan={periods.length + 3} className="h-px p-0 bg-zinc-800" />
            </TableRow>

            {/* TOTAL row */}
            <TableRow className="bg-zinc-900/40 border-0 hover:bg-zinc-900/40">
              {/* #6: sticky TOTAL label columns */}
              <TableCell className="px-2 sticky left-0 z-10 bg-zinc-900/40" />
              <TableCell className="px-4 py-3 sticky left-6 z-10 bg-zinc-900/40">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Total
                </span>
              </TableCell>

              {periods.map((p) => {
                const totals    = periodTotals(p);
                const allEntries   = Object.entries(totals).sort(([a], [b]) => a.localeCompare(b));
                const nonZeroTotal = allEntries.filter(([, amt]) => amt !== 0);
                const totalEntries = nonZeroTotal.length > 0 ? nonZeroTotal : allEntries.slice(0, 1);
                const paid     = isAllPaid(p);
                const paidCnt  = periodPaidCount(p);
                const stmtCnt  = periodStatementCount(p);
                const adjs     = getAdjustments(p);
                const isCurrent = p === currentPeriod;
                const isFocus   = p === focusPeriod && p !== currentPeriod;

                return (
                  <TableCell
                    key={p}
                    className={cn(
                      "px-3 py-3 text-center align-top min-w-[6.5rem]",
                      isCurrent && "bg-zinc-900/30",
                      isFocus   && focusColBg(focusPeriod, currentPeriod)
                    )}
                  >
                    <div className="flex flex-col items-center gap-px">
                      {totalEntries.map(([cur, amt]) => (
                        <span
                          key={cur}
                          className={cn(
                            "font-sans text-sm font-semibold tabular-nums",
                            paid ? "text-emerald-400" : isCurrent ? "text-white" : "text-zinc-300"
                          )}
                        >
                          {currencySymbol(cur)}&nbsp;{formatAmount(amt)}
                        </span>
                      ))}
                      {totalEntries.length === 0 && (
                        <span className="text-zinc-700 text-sm">—</span>
                      )}
                    </div>

                    {stmtCnt > 0 && (
                      <div className={cn(
                        "text-[10px] mt-0.5 text-center",
                        // #8: raised contrast zinc-600→zinc-500
                        paid ? "text-emerald-600" : "text-zinc-500"
                      )}>
                        {paid ? "Todas pagadas" : `${paidCnt} de ${stmtCnt}`}
                      </div>
                    )}

                    {/* Adjustment chips */}
                    <div className="flex flex-col items-center gap-0.5 mt-1">
                      {adjs.map((adj) => (
                        <button
                          key={adj.id}
                          onClick={() => onEditAdjustment(p, adj)}
                          title={adj.note ?? "Ajuste"}
                          className={cn(
                            pillBtn,
                            adj.amount < 0 ? "text-red-400/70 hover:text-red-300" : "text-emerald-400/70 hover:text-emerald-300"
                          )}
                        >
                          {adj.amount >= 0 && "+"}
                          {formatAmount(adj.amount)}
                          {adj.note && (
                            <span className="text-zinc-600 max-w-[64px] truncate">{adj.note}</span>
                          )}
                        </button>
                      ))}

                      <button
                        onClick={() => onAddAdjustment(p)}
                        title="Agregar ajuste al total del mes"
                        className={cn(pillBtn, "text-zinc-600 hover:text-zinc-300")}
                      >
                        <HiPlus className="w-2.5 h-2.5" />
                        ajuste
                      </button>
                    </div>
                  </TableCell>
                );
              })}
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
