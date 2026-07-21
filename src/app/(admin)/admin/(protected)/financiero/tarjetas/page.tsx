export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { TarjetasMatrix } from "@/components/admin/tarjetas/TarjetasMatrix";
import {
  resolveView,
  buildWindow,
  currentMonthPeriod,
  shiftPeriod,
  VIEW_PREF_KEY,
} from "@/components/admin/tarjetas/periods";

export default async function TarjetasPage() {
  const supabase = await createClient();

  // Load view preference from DB
  const { data: { user } } = await supabase.auth.getUser();
  const { data: prefRow } = user
    ? await supabase
        .from("admin_preferences")
        .select("value")
        .eq("user_id", user.id)
        .eq("key", VIEW_PREF_KEY)
        .single()
    : { data: null };

  const view        = resolveView(prefRow?.value ?? null);
  const periods     = buildWindow(view.end, view.range);
  const currentReal = currentMonthPeriod();
  const today       = new Date().toISOString().split("T")[0];

  // Fetch union: window + ±3 months around current real month
  // The ±3 horizon lets selectSummaryPeriod find overdue or upcoming periods
  // even when the user navigated the table away from the current month.
  const horizonMonths = Array.from({ length: 7 }, (_, i) => shiftPeriod(currentReal, i - 3));
  const allMonths  = [...new Set([...periods, ...horizonMonths])].sort();
  const fetchStart = allMonths[0];
  const fetchEnd   = allMonths[allMonths.length - 1];

  const [{ data: cards }, { data: statements }, { data: adjustments }, { data: creditLimitChanges }] =
    await Promise.all([
      supabase
        .from("credit_cards")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("card_statements")
        .select("*, advances:statement_advances(*)")
        .gte("period", fetchStart)
        .lte("period", fetchEnd),
      supabase
        .from("period_adjustments")
        .select("*")
        .gte("period", fetchStart)
        .lte("period", fetchEnd),
      supabase
        .from("credit_limit_changes")
        .select("*")
        .order("effective_date", { ascending: false }),
    ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Tarjetas de crédito</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Controla cuánto pagas y qué vence cada mes
        </p>
      </div>

      <TarjetasMatrix
        cards={cards ?? []}
        statements={statements ?? []}
        adjustments={adjustments ?? []}
        creditLimitChanges={creditLimitChanges ?? []}
        periods={periods}
        currentPeriod={currentReal}
        today={today}
        view={view}
      />
    </div>
  );
}
