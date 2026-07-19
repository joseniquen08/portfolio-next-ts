"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { HiCheck, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { cn } from "@/utils/shadcn";
import { toggleCollected, deleteIncomeEntry } from "@/app/(admin)/admin/(protected)/financiero/ingresos/actions";
import { TableRow, TableCell } from "@/components/ui/table";
import { Job, IncomeEntry, collectedBadge, currencySymbol, formatAmount } from "./status";

interface Props {
  entry:   IncomeEntry;
  job?:    Job;
  onEdit:  (entry: IncomeEntry) => void;
}

export function IncomeRow({ entry, job, onEdit }: Props) {
  const [isPending, startTransition] = useTransition();
  const badge = collectedBadge(entry);

  function handleToggle() {
    startTransition(async () => {
      try {
        await toggleCollected(entry.id, !entry.is_paid);
        toast.success(entry.is_paid ? "Marcado como pendiente" : "Marcado como cobrado");
      } catch {
        toast.error("No se pudo actualizar. Intenta de nuevo.");
      }
    });
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
      <TableCell className="px-2 py-3">
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
      </TableCell>

      <TableCell className="px-3 py-3">
        <span className="text-sm text-white">{entry.description || "—"}</span>
      </TableCell>

      <TableCell className="px-3 py-3">
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

      <TableCell className="px-3 py-3 text-zinc-500 text-xs whitespace-nowrap">
        {format(parseISO(entry.entry_date), "d MMM yyyy", { locale: es })}
      </TableCell>

      <TableCell className="px-3 py-3 text-right">
        <span className="font-sans text-sm tabular-nums text-white">
          {currencySymbol(entry.currency)}&nbsp;{formatAmount(entry.amount)}
        </span>
      </TableCell>

      <TableCell className="px-3 py-3">
        <span className={cn("text-xs font-medium", badge.className)}>{badge.label}</span>
      </TableCell>

      <TableCell className="px-2 py-3">
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
