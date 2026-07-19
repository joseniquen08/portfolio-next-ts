"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { es } from "date-fns/locale";
import { HiCheck, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { cn } from "@/utils/shadcn";
import { toggleCollected, deleteIncomeEntry } from "@/app/(admin)/admin/(protected)/financiero/ingresos/actions";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Job,
  IncomeEntry,
  collectedBadge,
  currencySymbol,
  formatAmount,
  isOverdue,
} from "./status";

const DATE_LABEL_CLASS = "shrink-0 w-14 text-[10px] font-medium uppercase tracking-wider";

interface Props {
  entry:   IncomeEntry;
  job?:    Job;
  onEdit:  (entry: IncomeEntry) => void;
}

export function IncomeRow({ entry, job, onEdit }: Props) {
  const [isPending, startTransition] = useTransition();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const badge = collectedBadge(entry);

  function commitToggle(is_paid: boolean, paid_date: string | null) {
    startTransition(async () => {
      try {
        await toggleCollected(entry.id, is_paid, paid_date);
        toast.success(is_paid ? "Marcado como cobrado" : "Marcado como pendiente");
      } catch {
        toast.error("No se pudo actualizar. Intenta de nuevo.");
      }
    });
  }

  function handleToggle() {
    if (entry.is_paid) {
      commitToggle(false, null);
      return;
    }
    setPickedDate(new Date());
    setPickerOpen(true);
  }

  function handleConfirmPaidDate() {
    setPickerOpen(false);
    commitToggle(true, format(pickedDate, "yyyy-MM-dd"));
  }

  function handleDelete() {
    if (!window.confirm("¿Eliminar este ingreso? Esta acción no se puede deshacer.")) return;
    startTransition(async () => {
      try {
        await deleteIncomeEntry(entry.id);
        toast.success("Ingreso eliminado");
      } catch {
        toast.error("No se pudo eliminar. Intenta de nuevo.");
      }
    });
  }

  return (
    <TableRow className="border-zinc-800/50 hover:bg-zinc-900/40 transition-colors group">
      <TableCell className="px-2 py-2.5">
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverAnchor asChild>
            <button
              onClick={handleToggle}
              disabled={isPending}
              title={entry.is_paid ? "Marcar como pendiente" : "Marcar como cobrado"}
              className={cn(
                "shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors border cursor-pointer",
                entry.is_paid
                  ? "bg-emerald-600/80 border-emerald-600 text-white"
                  : "border-zinc-700 text-zinc-700 hover:border-zinc-500 hover:text-zinc-400"
              )}
            >
              <HiCheck className="w-3 h-3" />
            </button>
          </PopoverAnchor>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={pickedDate}
              onSelect={(date) => date && setPickedDate(date)}
            />
            <div className="border-t border-zinc-700 p-2">
              <Button
                type="button"
                size="sm"
                onClick={handleConfirmPaidDate}
                className="w-full bg-white text-zinc-900 hover:bg-white/90 cursor-pointer"
              >
                Confirmar {format(pickedDate, "d 'de' MMMM yyyy", { locale: es })}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </TableCell>

      <TableCell className="px-3 py-2.5">
        <span className="text-sm text-white">{entry.description || "—"}</span>
      </TableCell>

      <TableCell className="px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          {job?.color && (
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: job.color }}
            />
          )}
          <span className="text-xs text-zinc-500 whitespace-nowrap">{job?.name ?? "—"}</span>
        </div>
      </TableCell>

      <TableCell className="px-3 py-2.5 text-xs whitespace-nowrap">
        <div className="flex flex-col justify-center gap-1 min-h-9">
          {entry.expected_date && (
            <span
              title="Fecha esperada de cobro"
              className={cn(
                "flex items-baseline gap-1",
                isOverdue(entry) ? "text-red-400" : "text-zinc-500"
              )}
            >
              <span
                className={cn(
                  DATE_LABEL_CLASS,
                  isOverdue(entry) ? "text-red-500/80" : "text-zinc-700"
                )}
              >
                Esperado
              </span>
              {format(parseISO(entry.expected_date), "d MMM yyyy", { locale: es })}
            </span>
          )}
          {entry.paid_date && (
            <span className="flex items-baseline gap-1 text-zinc-500">
              <span className={cn(DATE_LABEL_CLASS, "text-zinc-700")}>Cobrado</span>
              {format(parseISO(entry.paid_date), "d MMM yyyy", { locale: es })}
              {entry.expected_date && (() => {
                const diff = differenceInCalendarDays(
                  parseISO(entry.paid_date),
                  parseISO(entry.expected_date)
                );
                if (diff === 0) return null;
                return (
                  <span className={cn("ml-0.5", diff < 0 ? "text-emerald-400" : "text-amber-400")}>
                    ({diff > 0 ? "+" : ""}
                    {diff} {Math.abs(diff) === 1 ? "día" : "días"})
                  </span>
                );
              })()}
            </span>
          )}
          {!entry.expected_date && !entry.paid_date && (
            <span className="text-zinc-700">—</span>
          )}
        </div>
      </TableCell>

      <TableCell className="px-3 py-2.5 text-right">
        <span className="font-sans text-sm tabular-nums text-white">
          {currencySymbol(entry.currency)}&nbsp;{formatAmount(entry.amount)}
        </span>
      </TableCell>

      <TableCell className="px-3 py-2.5">
        <span className={cn("text-xs font-medium", badge.className)}>{badge.label}</span>
      </TableCell>

      <TableCell className="px-2 py-2.5">
        <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(entry)}
            disabled={isPending}
            aria-label="Editar ingreso"
            title="Editar ingreso"
            className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiOutlinePencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Eliminar ingreso"
            title="Eliminar ingreso"
            className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-600 hover:bg-red-950/30 hover:text-red-400 transition-colors cursor-pointer"
          >
            <HiOutlineTrash className="w-3.5 h-3.5" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
