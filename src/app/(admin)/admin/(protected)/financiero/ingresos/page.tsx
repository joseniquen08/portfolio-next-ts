export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { IngresosView } from "@/components/admin/ingresos/IngresosView";

export default async function IngresosPage() {
  const supabase = await createClient();

  const [{ data: jobs }, { data: entries }] = await Promise.all([
    supabase.from("jobs").select("*").order("sort_order", { ascending: true }),
    supabase.from("income_entries").select("*").order("sort_order", { ascending: true }),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Ingresos</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Registra y da seguimiento a los ingresos de cada trabajo
        </p>
      </div>

      <IngresosView jobs={jobs ?? []} entries={entries ?? []} />
    </div>
  );
}
