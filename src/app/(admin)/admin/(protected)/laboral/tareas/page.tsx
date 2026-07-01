export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { TareasBoard } from "@/components/admin/tareas/TareasBoard";

export default async function TareasPage() {
  const supabase = await createClient();

  const [{ data: jobs }, { data: tasks }] = await Promise.all([
    supabase.from("jobs").select("*").order("sort_order", { ascending: true }),
    supabase.from("tasks").select("*").order("sort_order", { ascending: true }),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-white">Tareas</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Organiza tus tareas entre los distintos trabajos
        </p>
      </div>

      <TareasBoard jobs={jobs ?? []} tasks={tasks ?? []} />
    </div>
  );
}
