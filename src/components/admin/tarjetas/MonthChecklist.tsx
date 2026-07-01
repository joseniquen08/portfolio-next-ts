"use client";

import { useTransition } from "react";
import { HiCheck, HiPlus } from "react-icons/hi";
import { cn } from "@/utils/shadcn";
import { togglePaid } from "@/app/(admin)/admin/(protected)/financiero/tarjetas/actions";
import {
  CreditCard, Statement,
  formatAmount, currencySymbol, amountEntries, cellStatus, statusTextClass,
  resolveDueDate, daysUntil, daysLabel, urgencyClass,
} from "./status";

interface Props {
  cards:           CreditCard[];
  statements:      Statement[];
  currentPeriod:   string;
  today:           string;
  onEditStatement: (card: CreditCard, period: string, statement?: Statement) => void;
}

export function MonthChecklist({
  cards, statements, currentPeriod, today, onEditStatement,
}: Props) {
  const [, startTransition] = useTransition();
  const currentStatements   = statements.filter((s) => s.period === currentPeriod);

  function getStatement(cardId: string) {
    return currentStatements.find((s) => s.card_id === cardId);
  }

  function handleTogglePaid(cardId: string, s: Statement) {
    startTransition(() => togglePaid(cardId, currentPeriod, !s.is_paid));
  }

  return (
    <div className="space-y-2">
      {cards.map((card) => {
        const stmt   = getStatement(card.id);
        const status = cellStatus(stmt, today);

        const due  = stmt ? resolveDueDate(stmt, card, currentPeriod) : null;
        const days = due ? daysUntil(due, today) : null;

        return (
          <div
            key={card.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-4 py-3.5 transition-colors",
              status === "pagado"   ? "border-emerald-900/40 bg-emerald-950/20" :
              status === "vencido"  ? "border-red-900/30 bg-red-950/10" :
              status === "estimado" ? "border-amber-900/40 bg-amber-950/15" :
              status === "por_pagar" ? "border-sky-900/40 bg-sky-950/15" :
              "border-zinc-800 bg-zinc-900/40"
            )}
          >
            {/* Card info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {card.color && (
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: card.color }}
                  />
                )}
                <span className="text-sm font-medium text-zinc-200 truncate">{card.name}</span>
              </div>

              {/* Subtext: due date or paid status */}
              {status === "pagado" ? (
                <p className="text-xs text-emerald-600 mt-0.5">Pagado</p>
              ) : due && days !== null ? (
                <p className={cn("text-xs mt-0.5", urgencyClass(days))}>
                  {daysLabel(days)}
                </p>
              ) : status === "estimado" ? (
                <p className="text-xs text-amber-700 mt-0.5">Monto estimado</p>
              ) : (
                <p className="text-xs text-zinc-600 mt-0.5">Sin fecha de vencimiento</p>
              )}
            </div>

            {/* Amount or register button */}
            {stmt ? (
              <button
                onClick={() => onEditStatement(card, currentPeriod, stmt)}
                className="text-right shrink-0 rounded-md px-2 py-1 cursor-pointer hover:bg-zinc-800 transition-colors"
                title="Editar estado de cuenta"
              >
                {amountEntries(stmt.amounts).map(([cur, amt]) => (
                  <p key={cur} className={cn(
                    "text-sm font-sans font-semibold tabular-nums leading-tight",
                    statusTextClass(status, true)
                  )}>
                    {currencySymbol(cur)}&nbsp;{formatAmount(amt)}
                  </p>
                ))}
              </button>
            ) : (
              <button
                onClick={() => onEditStatement(card, currentPeriod)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 shrink-0",
                  "text-xs text-zinc-500 border border-zinc-700 cursor-pointer",
                  "hover:text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600",
                  "transition-colors"
                )}
              >
                <HiPlus className="w-3 h-3" />
                Registrar
              </button>
            )}

            {/* Paid toggle — large touch target */}
            {stmt && (
              <button
                onClick={() => handleTogglePaid(card.id, stmt)}
                title={stmt.is_paid ? "Desmarcar como pagado" : "Marcar como pagado"}
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors border cursor-pointer",
                  stmt.is_paid
                    ? "bg-emerald-600/80 border-emerald-600 text-white"
                    : status === "vencido"
                    ? "border-red-800 text-zinc-700 hover:border-red-500 hover:bg-red-950/20 hover:text-red-400"
                    : "border-zinc-700 text-zinc-700 hover:border-zinc-400 hover:text-zinc-300"
                )}
              >
                <HiCheck className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
