"use client";

import { useMemo, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { IncomeFilters } from "./IncomeFilters";
import { IncomeTable } from "./IncomeTable";
import { IncomeDialog } from "./IncomeDialog";
import { Job, IncomeEntry, CollectedFilter, matchesStatusFilter, sortEntries } from "./status";

interface Props {
  jobs:    Job[];
  entries: IncomeEntry[];
}

export function IngresosView({ jobs, entries }: Props) {
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<CollectedFilter>("all");
  const [dialog, setDialog] = useState<{ open: boolean; entry?: IncomeEntry }>({ open: false });

  const filteredEntries = useMemo(() => {
    const filtered = entries.filter((e) => {
      if (activeJobId && e.job_id !== activeJobId) return false;
      if (!matchesStatusFilter(e, activeStatus)) return false;
      return true;
    });
    return sortEntries(filtered);
  }, [entries, activeJobId, activeStatus]);

  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center">
        <p className="text-sm font-medium text-white mb-1">
          Aún no tienes trabajos registrados
        </p>
        <p className="text-xs text-zinc-500 max-w-xs mx-auto">
          Crea un trabajo desde el módulo de Tareas para poder registrar ingresos.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <IncomeFilters
          jobs={jobs}
          activeJobId={activeJobId}
          onJobChange={setActiveJobId}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setDialog({ open: true })}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-0 gap-1.5 h-8"
        >
          <HiPlus className="w-3.5 h-3.5" />
          Nuevo ingreso
        </Button>
      </div>

      <IncomeTable
        jobs={jobs}
        entries={filteredEntries}
        allEntries={entries}
        onEdit={(entry) => setDialog({ open: true, entry })}
      />

      <IncomeDialog
        open={dialog.open}
        entry={dialog.entry}
        jobs={jobs}
        entries={entries}
        nextSortOrder={entries.length}
        onClose={() => setDialog({ open: false })}
      />
    </div>
  );
}
