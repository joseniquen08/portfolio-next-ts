"use client";

import { useState, useTransition } from "react";
import { HiPlus, HiX } from "react-icons/hi";
import { toast } from "sonner";
import { cn } from "@/utils/shadcn";
import {
  createLimitChange,
  deleteLimitChange,
} from "@/app/(admin)/admin/(protected)/financiero/tarjetas/actions";
import { CurrencyInput } from "./CurrencyInput";
import { DatePickerField } from "./DatePickerField";
import { CreditLimitChange, currentCreditLimit, currencySymbol, formatAmount } from "./status";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  cardId:     string;
  currencies: readonly string[];
  /** All limit-change rows for this card, any order. */
  changes:    CreditLimitChange[];
}

/**
 * Credit-limit change history, embedded in CardDialog edit mode. Each row is
 * a validity range: NULL start = "Inicial" (unknown/unbounded start), NULL
 * end = "Actual" (currently in effect). Adding a new record automatically
 * splits/closes the range it falls into — see add_credit_limit_change().
 * Add/delete call the server actions directly, no update (matches design).
 */
export function CreditLimitHistory({ cardId, currencies, changes }: Props) {
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount]     = useState(0);
  const [currency, setCurrency] = useState<string>(currencies[0] ?? "PEN");
  const [date, setDate]         = useState<string | undefined>(undefined);
  const [note, setNote]         = useState("");

  // NULL start_date ("Inicial") sorts as the oldest entry.
  const sorted  = [...changes].sort((a, b) => (b.start_date ?? "").localeCompare(a.start_date ?? ""));
  const current = currentCreditLimit(changes);
  const isFirstEver = changes.length === 0;

  function resetForm() {
    setAmount(0);
    setNote("");
    setDate(undefined);
  }

  function handleAdd() {
    if (amount <= 0) {
      toast.error("Ingresa un monto");
      return;
    }
    if (!isFirstEver && !date) {
      toast.error("Ingresa la fecha de inicio");
      return;
    }
    if (date && changes.some((c) => c.start_date === date)) {
      toast.error("Ya existe un cambio registrado con esa fecha de inicio.");
      return;
    }
    startTransition(async () => {
      try {
        await createLimitChange({
          card_id: cardId,
          amount,
          currency,
          start_date: date ?? null,
          note: note.trim() || null,
        });
        toast.success("Cambio de línea registrado");
        resetForm();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "No se pudo guardar. Intenta de nuevo.");
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteLimitChange(id);
        toast.success("Cambio eliminado");
      } catch {
        toast.error("No se pudo eliminar. Intenta de nuevo.");
      }
    });
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
        Historial de línea de crédito
      </p>

      {current && (
        <p className="text-sm text-zinc-300">
          Línea actual:{" "}
          <span className="font-semibold tabular-nums">
            {currencySymbol(current.currency)}&nbsp;{formatAmount(current.amount)}
          </span>
        </p>
      )}

      {/* List */}
      <div className="space-y-1.5 max-h-40 overflow-y-auto">
        {sorted.length === 0 && (
          <p className="text-xs text-zinc-600">Sin cambios registrados.</p>
        )}
        {sorted.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between gap-2 rounded-md border border-zinc-800 px-2.5 py-1.5"
          >
            <div className="min-w-0">
              <p className="text-xs text-zinc-300 tabular-nums">
                {currencySymbol(c.currency)}&nbsp;{formatAmount(Number(c.amount))}
              </p>
              <p className="text-[10px] text-zinc-600 truncate">
                {c.start_date ?? "Inicial"} → {c.end_date ?? "Actual"}{c.note ? ` · ${c.note}` : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(c.id)}
              disabled={isPending}
              className={cn(
                "shrink-0 w-6 h-6 flex items-center justify-center rounded",
                "text-zinc-600 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
              )}
              title="Eliminar cambio"
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
        <DatePickerField
          value={date}
          onChange={setDate}
          placeholder={isFirstEver ? "Fecha de inicio (opcional)" : "Fecha de inicio"}
        />
        {isFirstEver && (
          <p className="text-[10px] text-zinc-600">
            Déjalo vacío si no sabes desde cuándo aplica — se marca como &quot;Inicial&quot; y cubre todo el historial hasta que agregues un cambio con fecha.
          </p>
        )}
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
          Registrar cambio
        </Button>
      </div>
    </div>
  );
}
