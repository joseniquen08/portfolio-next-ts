"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  HiChevronLeft, HiChevronRight, HiEye, HiEyeOff,
} from "react-icons/hi";
import { cn } from "@/utils/shadcn";
import {
  ViewState, ViewRange,
  shiftPeriod, currentMonthPeriod,
  windowLabel, serializeView, VIEW_PREF_KEY,
} from "./periods";
import { savePreference } from "@/app/(admin)/admin/(protected)/actions";

interface Props {
  view:    ViewState;
  periods: string[];
}

const RANGES: ViewRange[] = [3, 6, 12];

export function MonthControls({ view, periods }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Optimistic view: updates instantly on click; reverts if the save fails
  const [optimisticView, setOptimisticView] = useOptimistic(view);

  const realNow           = currentMonthPeriod();
  // Use optimistic view to compute derived values so controls respond instantly
  const optimisticPeriods = Array.from({ length: optimisticView.range }, (_, i) =>
    shiftPeriod(optimisticView.end, -(optimisticView.range - 1 - i))
  );
  const windowContainsNow = optimisticPeriods.includes(realNow);
  const label             = windowLabel(optimisticPeriods);

  function navigate(patch: Partial<ViewState>) {
    const next: ViewState = { ...optimisticView, ...patch };
    startTransition(async () => {
      setOptimisticView(next);
      await savePreference(VIEW_PREF_KEY, serializeView(next), "/admin/financiero/tarjetas");
      router.refresh();
    });
  }

  const btnBase =
    "flex items-center justify-center rounded-md border transition-colors cursor-pointer";
  const btnZinc = cn(
    "border-transparent text-zinc-500 hover:text-white hover:bg-zinc-800 hover:border-zinc-700",
    isPending && "opacity-50 pointer-events-none"
  );

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">

      {/* ── Navigation ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Double ‹‹ — jump full range */}
        <button
          onClick={() => navigate({ end: shiftPeriod(optimisticView.end, -optimisticView.range) })}
          title={`Retroceder ${optimisticView.range} meses`}
          className={cn(btnBase, btnZinc, "p-1.5")}
        >
          <HiChevronLeft className="w-4 h-4 -mr-1.5" />
          <HiChevronLeft className="w-4 h-4" />
        </button>

        {/* Single ‹ — 1 month back */}
        <button
          onClick={() => navigate({ end: shiftPeriod(optimisticView.end, -1) })}
          title="Mes anterior"
          className={cn(btnBase, btnZinc, "p-1.5")}
        >
          <HiChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-medium text-zinc-400 px-1.5 min-w-[112px] text-center tabular-nums select-none">
          {label}
        </span>

        {/* Single › — 1 month forward */}
        <button
          onClick={() => navigate({ end: shiftPeriod(optimisticView.end, 1) })}
          title="Mes siguiente"
          className={cn(btnBase, btnZinc, "p-1.5")}
        >
          <HiChevronRight className="w-4 h-4" />
        </button>

        {/* Double ›› — jump full range */}
        <button
          onClick={() => navigate({ end: shiftPeriod(optimisticView.end, optimisticView.range) })}
          title={`Avanzar ${optimisticView.range} meses`}
          className={cn(btnBase, btnZinc, "p-1.5")}
        >
          <HiChevronRight className="w-4 h-4 -mr-1.5" />
          <HiChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── «Hoy» — only when window doesn't contain today ──────────── */}
      {!windowContainsNow && (
        <button
          onClick={() => navigate({ end: realNow })}
          className={cn(
            btnBase,
            "border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 px-2.5 py-1 text-xs",
            isPending && "opacity-50 pointer-events-none"
          )}
        >
          Hoy
        </button>
      )}

      <div className="flex-1 min-w-0" />

      {/* ── Range pills ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 shrink-0">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => navigate({ range: r })}
            className={cn(
              btnBase,
              "px-2.5 py-1 text-xs",
              optimisticView.range === r
                ? "border-zinc-500 bg-zinc-800 text-white"
                : "border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-300",
              isPending && "opacity-50 pointer-events-none"
            )}
          >
            {r}
          </button>
        ))}
        <span className="text-[10px] text-zinc-600 ml-0.5 select-none">meses</span>
      </div>

      {/* ── Hide empty toggle ────────────────────────────────────────── */}
      <button
        onClick={() => navigate({ hide: !optimisticView.hide })}
        title={optimisticView.hide ? "Mostrando solo meses con datos" : "Ocultar meses sin registros"}
        className={cn(
          "shrink-0",
          btnBase,
          "gap-1.5 px-2.5 py-1 text-xs",
          optimisticView.hide
            ? "border-sky-800 bg-sky-950/30 text-sky-400 hover:bg-sky-950/50"
            : "border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-300",
          isPending && "opacity-50 pointer-events-none"
        )}
      >
        {optimisticView.hide
          ? <HiEyeOff className="w-3.5 h-3.5 shrink-0" />
          : <HiEye    className="w-3.5 h-3.5 shrink-0" />
        }
        {optimisticView.hide ? "Vacíos ocultos" : "Ocultar vacíos"}
      </button>
    </div>
  );
}
