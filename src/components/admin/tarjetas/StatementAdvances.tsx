"use client";

import { useState, useTransition } from "react";
import { HiPlus, HiX } from "react-icons/hi";
import { toast } from "sonner";
import { cn } from "@/utils/shadcn";
import {
  createAdvance,
  deleteAdvance,
} from "@/app/(admin)/admin/(protected)/financiero/tarjetas/actions";
import { CurrencyInput } from "./CurrencyInput";
import { DatePickerField } from "./DatePickerField";
import { StatementWithAdvances, computeSettlement, currencySymbol, formatAmount } from "./status";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  /** Edit-mode only: an existing statement must already be saved. */
  statement?:  StatementWithAdvances;
  currencies:  readonly string[];
}

/**
 * Advances/adelantos sub-list for StatementDialog.
 * Add/delete call the server actions directly with their own transition —
 * they are NOT part of the parent form's react-hook-form state/submit.
 */
export function StatementAdvances({ statement, currencies }: Props) {
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount]     = useState(0);
  const [currency, setCurrency] = useState<string>(currencies[0] ?? "PEN");
  const [date, setDate]         = useState<string | undefined>(undefined);
  const [note, setNote]         = useState("");

  if (!statement) {
    return (
      <div>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
          Adelantos
        </p>
        <p className="text-xs text-zinc-600">
          Guarda el estado de cuenta para registrar adelantos.
        </p>
      </div>
    );
  }

  const advances   = statement.advances ?? [];
  const settlement = computeSettlement(statement.amounts, advances);

  function resetForm() {
    setAmount(0);
    setNote("");
    setDate(undefined);
  }

  function handleAdd() {
    if (amount <= 0 || !date) {
      toast.error("Completa monto y fecha");
      return;
    }
    startTransition(async () => {
      try {
        await createAdvance({
          statement_id: statement!.id,
          amount,
          currency,
          advance_date: date!,
          note: note.trim() || null,
        });
        toast.success("Adelanto registrado");
        resetForm();
      } catch {
        toast.error("No se pudo guardar. Intenta de nuevo.");
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteAdvance(id);
        toast.success("Adelanto eliminado");
      } catch {
        toast.error("No se pudo eliminar. Intenta de nuevo.");
      }
    });
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
        Adelantos
      </p>

      {/* Per-currency coverage */}
      {Object.keys(settlement.perCurrency).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(settlement.perCurrency).map(([cur, cov]) => (
            <span
              key={cur}
              className={cn(
                "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] border",
                cov.isCovered
                  ? "text-emerald-400 border-emerald-800/60 bg-emerald-950/30"
                  : "text-teal-400 border-teal-800/60 bg-teal-950/30"
              )}
            >
              {currencySymbol(cur)}&nbsp;{formatAmount(cov.covered)} / {formatAmount(cov.required)}
              {cov.excess > 0 && ` · +${formatAmount(cov.excess)} sobrepago`}
            </span>
          ))}
        </div>
      )}

      {/* List */}
      <div className="space-y-1.5">
        {advances.length === 0 && (
          <p className="text-xs text-zinc-600">Sin adelantos registrados.</p>
        )}
        {advances.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between gap-2 rounded-md border border-zinc-800 px-2.5 py-1.5"
          >
            <div className="min-w-0">
              <p className="text-xs text-zinc-300 tabular-nums">
                {currencySymbol(a.currency)}&nbsp;{formatAmount(Number(a.amount))}
              </p>
              <p className="text-[10px] text-zinc-600 truncate">
                {a.advance_date}{a.note ? ` · ${a.note}` : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(a.id)}
              disabled={isPending}
              className={cn(
                "shrink-0 w-6 h-6 flex items-center justify-center rounded",
                "text-zinc-600 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
              )}
              title="Eliminar adelanto"
            >
              <HiX className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Add form */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-2">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="h-16 w-auto shrink-0 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 text-xs font-semibold text-white cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              {currencies.map((c) => (
                <SelectItem key={c} value={c} className="focus:bg-zinc-700 focus:text-white">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-1 min-w-0">
            <CurrencyInput
              value={amount}
              onChange={setAmount}
              symbol={currencySymbol(currency)}
            />
          </div>
        </div>
        <DatePickerField value={date} onChange={setDate} placeholder="Fecha del adelanto" />
        <Input
          placeholder="Nota (opcional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 text-xs h-9"
        />
        <Button
          type="button"
          onClick={handleAdd}
          disabled={isPending}
          size="sm"
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-0 gap-1.5 cursor-pointer"
        >
          <HiPlus className="w-3.5 h-3.5" />
          Registrar adelanto
        </Button>
      </div>
    </div>
  );
}
