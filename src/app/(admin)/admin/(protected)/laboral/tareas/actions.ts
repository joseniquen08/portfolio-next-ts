"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/server";

const PATH = "/admin/laboral/tareas";

// ─── Jobs ───────────────────────────────────────────────────────────────────────

export async function createJob(data: {
  name: string;
  color?: string | null;
  sort_order: number;
}) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("jobs").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function updateJob(
  id: string,
  data: {
    name?: string;
    color?: string | null;
    is_active?: boolean;
    sort_order?: number;
  }
) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("jobs").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function reorderJobs(orderedIds: string[]) {
  const supabase = await requireAdmin();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("jobs").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath(PATH);
}

export async function deleteJob(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

// ─── Tasks ──────────────────────────────────────────────────────────────────────

export async function createTask(data: {
  job_id: string;
  title: string;
  description?: string | null;
  status?: string;
  priority?: string;
  due_date?: string | null;
  sort_order: number;
}) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("tasks").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function updateTask(
  id: string,
  data: {
    job_id?: string;
    title?: string;
    description?: string | null;
    priority?: string;
    due_date?: string | null;
  }
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("tasks")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function deleteTask(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

// Moves a task to a new status column and/or position within it (drag & drop).
export async function moveTask(taskId: string, status: string, orderedIdsInStatus: string[]) {
  const supabase = await requireAdmin();
  await Promise.all([
    supabase
      .from("tasks")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", taskId),
    ...orderedIdsInStatus.map((id, index) =>
      supabase.from("tasks").update({ sort_order: index }).eq("id", id)
    ),
  ]);
  revalidatePath(PATH);
}
