"use client";

import { cn } from "@/utils/shadcn";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Job, CollectedFilter } from "./status";

interface Props {
  jobs:           Job[];
  activeJobId:    string | null;
  onJobChange:    (jobId: string | null) => void;
  activeStatus:   CollectedFilter;
  onStatusChange: (status: CollectedFilter) => void;
}

const STATUS_OPTIONS: { key: CollectedFilter; label: string }[] = [
  { key: "all",       label: "Todos" },
  { key: "collected", label: "Cobrado" },
  { key: "pending",   label: "Pendiente" },
  { key: "overdue",   label: "Vencido" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs transition-colors cursor-pointer",
        active
          ? "border-zinc-500 bg-zinc-800 text-white"
          : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
      )}
    >
      {children}
    </button>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] font-medium text-zinc-600 uppercase tracking-wider">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function IncomeFilters({
  jobs,
  activeJobId,
  onJobChange,
  activeStatus,
  onStatusChange,
}: Props) {
  const hasActiveFilters = activeJobId !== null || activeStatus !== "all";

  function clearAll() {
    onJobChange(null);
    onStatusChange("all");
  }

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex flex-wrap items-end gap-4">
        <FilterGroup label="Trabajo">
          <Select
            value={activeJobId ?? "all"}
            onValueChange={(v) => onJobChange(v === "all" ? null : v)}
          >
            <SelectTrigger className="h-8 w-44 bg-zinc-900 border-zinc-800 text-xs text-zinc-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              <SelectItem value="all">Todos los trabajos</SelectItem>
              {jobs.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: job.color ?? "#6b7280" }}
                    />
                    {job.name}
                    {!job.is_active && (
                      <span className="text-zinc-600 text-xs">(inactivo)</span>
                    )}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterGroup>

        <FilterGroup label="Estado">
          {STATUS_OPTIONS.map((opt) => (
            <Chip key={opt.key} active={activeStatus === opt.key} onClick={() => onStatusChange(opt.key)}>
              {opt.label}
            </Chip>
          ))}
        </FilterGroup>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-8 text-xs text-zinc-500 hover:text-white hover:bg-zinc-800 cursor-pointer"
          >
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
