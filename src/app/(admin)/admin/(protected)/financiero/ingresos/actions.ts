"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/server";

const PATH = "/admin/financiero/ingresos";

export async function createIncomeEntry(data: {
  job_id: string;
  payment_type: string;
  linked_final_id?: string | null;
  description?: string | null;
  amount: number;
  currency: string;
  mes_esperado: string;
  expected_date?: string | null;
  sort_order: number;
}) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("income_entries").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function updateIncomeEntry(
  id: string,
  data: {
    job_id?: string;
    payment_type?: string;
    linked_final_id?: string | null;
    description?: string | null;
    amount?: number;
    currency?: string;
    mes_esperado?: string;
    expected_date?: string | null;
    sort_order?: number;
  }
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("income_entries")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function deleteIncomeEntry(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("income_entries")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function toggleCollected(
  id: string,
  is_paid: boolean,
  paid_date: string | null
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("income_entries")
    .update({ is_paid, paid_date })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}
