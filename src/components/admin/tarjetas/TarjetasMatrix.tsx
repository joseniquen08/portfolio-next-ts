"use client";

import { useState, useEffect, useTransition } from "react";
import { HiChevronRight, HiPlus } from "react-icons/hi";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { cn } from "@/utils/shadcn";
import { reorderCards } from "@/app/(admin)/admin/(protected)/financiero/tarjetas/actions";
import { CardDialog }       from "./CardDialog";
import { StatementDialog }  from "./StatementDialog";
import { AdjustmentDialog } from "./AdjustmentDialog";
import { MonthSummary }     from "./MonthSummary";
import { MatrixTable }      from "./MatrixTable";
import { MonthChecklist }   from "./MonthChecklist";
import { MonthControls }    from "./MonthControls";
import { Button }           from "@/components/ui/button";
import { CreditCard, Statement, StatementWithAdvances, Adjustment, selectSummaryPeriod } from "./status";
import { ViewState } from "./periods";

interface Props {
  cards:         CreditCard[];
  statements:    StatementWithAdvances[];
  adjustments:   Adjustment[];
  periods:       string[]; // "YYYY-MM-01"[] — the full navigated window
  currentPeriod: string;   // real current month, always fixed regardless of navigation
  today:         string;   // "YYYY-MM-DD", computed server-side
  view:          ViewState;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function TarjetasMatrix({ cards, statements, adjustments, periods, currentPeriod, today, view }: Props) {
  // Local ordered copy — updated optimistically on drag
  const [orderedCards, setOrderedCards] = useState(cards);
  const [, startTransition] = useTransition();

  // Keep in sync when server props change (card added, deleted, etc.)
  useEffect(() => { setOrderedCards(cards); }, [cards]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = orderedCards.findIndex((c) => c.id === active.id);
    const newIndex = orderedCards.findIndex((c) => c.id === over.id);
    const reordered = arrayMove(orderedCards, oldIndex, newIndex);
    setOrderedCards(reordered);
    startTransition(() => reorderCards(reordered.map((c) => c.id)));
  }

  // Compute visible periods: if hide=true, drop periods with no data (but always keep currentPeriod)
  function periodHasData(p: string): boolean {
    return (
      statements.some((s) => s.period === p) ||
      adjustments.some((a) => a.period === p)
    );
  }
  const visiblePeriods = view.hide
    ? periods.filter((p) => p === currentPeriod || periodHasData(p))
    : periods;

  // Computed once here and shared with MatrixTable so both components mark the same focus column
  const focusPeriod = selectSummaryPeriod(orderedCards, statements, currentPeriod, today);

  const [cardDialog, setCardDialog] = useState<{
    open: boolean; card?: CreditCard;
  }>({ open: false });

  const [statementDialog, setStatementDialog] = useState<{
    open: boolean; card?: CreditCard; period?: string; statement?: Statement;
  }>({ open: false });

  const [adjustmentDialog, setAdjustmentDialog] = useState<{
    open: boolean; period?: string; adjustment?: Adjustment;
  }>({ open: false });

  function openEditStatement(card: CreditCard, period: string, statement?: Statement) {
    setStatementDialog({ open: true, card, period, statement });
  }
  function openEditCard(card: CreditCard) {
    setCardDialog({ open: true, card });
  }

  return (
    <div>
      {orderedCards.length === 0 ? (
        /* ── Empty state ─────────────────────────────────────────────── */
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center">
          <p className="text-sm font-medium text-white mb-1">
            Aún no tienes tarjetas registradas
          </p>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-5">
            Agrega tus tarjetas de crédito y registra el monto a pagar cada mes. Puedes marcar pagado directamente desde la tabla.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCardDialog({ open: true })}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-0 gap-1.5"
          >
            <HiPlus className="w-3.5 h-3.5" />
            Nueva tarjeta
          </Button>
        </div>
      ) : (
        <>
          {/* ── Month summary panel ─────────────────────────────────────── */}
          <MonthSummary
            cards={orderedCards}
            statements={statements}
            adjustments={adjustments}
            currentPeriod={currentPeriod}
            today={today}
          />

          {/* ── Month controls ──────────────────────────────────────────── */}
          <MonthControls view={view} periods={periods} />

          {/* ── Section header + action ─────────────────────────────────── */}
          <div className="flex items-center justify-between mt-3 mb-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-sm font-medium text-zinc-300">Historial de pagos</h2>
              <div className="flex items-center gap-2.5 text-[10px] text-zinc-600">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  pagado
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                  vencido
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                  parcial
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                  estimado
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block" />
                  por pagar
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCardDialog({ open: true })}
              className="text-zinc-500 hover:text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs h-8 gap-1.5"
            >
              <HiPlus className="w-3.5 h-3.5" />
              Nueva tarjeta
            </Button>
          </div>

          {visiblePeriods.length === 0 ? (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-6 py-10 text-center">
              <p className="text-sm text-zinc-500">No hay registros en este rango.</p>
              <p className="text-xs text-zinc-600 mt-1">
                Desactiva «Ocultar vacíos» o navega a otro rango para ver todos los meses.
              </p>
            </div>
          ) : (
            <>
              {/* ── Desktop: full matrix ─────────────────────────────────── */}
              <div className="hidden md:block">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <MatrixTable
                    cards={orderedCards}
                    statements={statements}
                    adjustments={adjustments}
                    periods={visiblePeriods}
                    currentPeriod={currentPeriod}
                    focusPeriod={focusPeriod}
                    today={today}
                    onEditStatement={openEditStatement}
                    onEditCard={openEditCard}
                    onAddAdjustment={(p) => setAdjustmentDialog({ open: true, period: p })}
                    onEditAdjustment={(p, adj) => setAdjustmentDialog({ open: true, period: p, adjustment: adj })}
                  />
                </DndContext>
              </div>

              {/* ── Mobile: checklist + collapsible matrix ───────────────── */}
              <div className="md:hidden space-y-4">
                <MonthChecklist
                  cards={orderedCards}
                  statements={statements}
                  currentPeriod={currentPeriod}
                  today={today}
                  onEditStatement={openEditStatement}
                />

                <HistoryToggle>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <MatrixTable
                      cards={orderedCards}
                      statements={statements}
                      adjustments={adjustments}
                      periods={visiblePeriods}
                      currentPeriod={currentPeriod}
                      focusPeriod={focusPeriod}
                      today={today}
                      onEditStatement={openEditStatement}
                      onEditCard={openEditCard}
                      onAddAdjustment={(p) => setAdjustmentDialog({ open: true, period: p })}
                      onEditAdjustment={(p, adj) => setAdjustmentDialog({ open: true, period: p, adjustment: adj })}
                    />
                  </DndContext>
                </HistoryToggle>
              </div>
            </>
          )}
        </>
      )}

      {/* ── Dialogs ───────────────────────────────────────────────────── */}
      <CardDialog
        open={cardDialog.open}
        card={cardDialog.card}
        nextSortOrder={cards.length}
        onClose={() => setCardDialog({ open: false })}
      />
      <StatementDialog
        open={statementDialog.open}
        card={statementDialog.card}
        period={statementDialog.period}
        statement={statementDialog.statement}
        onClose={() => setStatementDialog({ open: false })}
      />
      <AdjustmentDialog
        open={adjustmentDialog.open}
        period={adjustmentDialog.period}
        adjustment={adjustmentDialog.adjustment}
        onClose={() => setAdjustmentDialog({ open: false })}
      />
    </div>
  );
}

// ─── Helper: collapsible "Ver historial" trigger (mobile) ─────────────────────

function HistoryToggle({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-zinc-800",
          "text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50",
          "transition-colors cursor-pointer"
        )}
      >
        <span>Ver historial de meses anteriores</span>
        <HiChevronRight
          className={cn("w-4 h-4 text-zinc-600 transition-transform", open && "rotate-90")}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
