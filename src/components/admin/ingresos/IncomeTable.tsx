"use client";

import { Fragment } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { IncomeRow } from "./IncomeRow";
import {
  Job,
  IncomeEntry,
  currencySymbol,
  formatAmount,
  totalsByCurrency,
  groupByMonth,
  monthLabel,
} from "./status";

interface Props {
  jobs:       Job[];
  entries:    IncomeEntry[];
  allEntries: IncomeEntry[];
  onEdit:     (entry: IncomeEntry) => void;
}

export function IncomeTable({ jobs, entries, allEntries, onEdit }: Props) {
  const jobsById = new Map(jobs.map((j) => [j.id, j]));

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center">
        <p className="text-sm font-medium text-white mb-1">No hay ingresos que coincidan</p>
        <p className="text-xs text-zinc-500 max-w-xs mx-auto">
          Ajusta los filtros o registra un nuevo ingreso.
        </p>
      </div>
    );
  }

  const collectedTotals = totalsByCurrency(entries.filter((e) => e.is_paid));
  const pendingTotals = totalsByCurrency(entries.filter((e) => !e.is_paid));
  const groups = groupByMonth(entries);

  return (
    <div className="rounded-lg border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="w-9 px-2 py-2.5" />
              <TableHead className="px-3 py-2.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Descripción
              </TableHead>
              <TableHead className="w-[130px] px-3 py-2.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Trabajo
              </TableHead>
              <TableHead className="w-[190px] px-3 py-2.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Fecha
              </TableHead>
              <TableHead className="w-[110px] px-3 py-2.5 text-xs font-medium text-zinc-500 uppercase tracking-wider text-right">
                Monto
              </TableHead>
              <TableHead className="w-[90px] px-3 py-2.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Estado
              </TableHead>
              <TableHead className="w-16 py-2.5" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {groups.map((group, i) => (
              <Fragment key={group.key}>
                <TableRow className="border-0 hover:bg-transparent">
                  <TableCell
                    colSpan={7}
                    className={i === 0 ? "px-3 pt-2 pb-1.5" : "px-3 pt-4 pb-1.5"}
                  >
                    <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-wider">
                      {monthLabel(group.key)}
                    </span>
                  </TableCell>
                </TableRow>
                {group.entries.map((entry) => (
                  <IncomeRow
                    key={entry.id}
                    entry={entry}
                    job={jobsById.get(entry.job_id)}
                    allEntries={allEntries}
                    onEdit={onEdit}
                  />
                ))}
              </Fragment>
            ))}

            <TableRow className="border-0">
              <TableCell colSpan={7} className="h-px p-0 bg-zinc-800" />
            </TableRow>

            <TableRow className="bg-zinc-900/40 border-0 hover:bg-zinc-900/40">
              <TableCell colSpan={4} className="px-3 py-2.5">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Total
                </span>
              </TableCell>
              <TableCell colSpan={3} className="px-3 py-2.5">
                <div className="flex flex-col gap-1 items-end">
                  {collectedTotals.map(([cur, amt]) => (
                    <span key={`c-${cur}`} className="text-xs tabular-nums text-emerald-400">
                      Cobrado: {currencySymbol(cur)}&nbsp;{formatAmount(amt)}
                    </span>
                  ))}
                  {pendingTotals.map(([cur, amt]) => (
                    <span key={`p-${cur}`} className="text-xs tabular-nums text-zinc-400">
                      Pendiente: {currencySymbol(cur)}&nbsp;{formatAmount(amt)}
                    </span>
                  ))}
                  {collectedTotals.length === 0 && pendingTotals.length === 0 && (
                    <span className="text-xs text-zinc-700">—</span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
