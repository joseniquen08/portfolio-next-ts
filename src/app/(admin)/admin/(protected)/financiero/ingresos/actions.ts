"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/server";

const PATH = "/admin/financiero/ingresos";

type IncomeType = "recurring" | "one_off";

// Mirrors the income_entries_type_dates_chk CHECK constraint so the UI gets a
// clear error before hitting the DB, instead of a raw Postgres constraint error.
function assertTypeDates(
  type: IncomeType,
  period?: string | null,
  entry_date?: string | null
) {
  if (type === "recurring" && !period) {
    throw new Error("Recurring entries require a period");
  }
  if (type === "one_off" && !entry_date) {
    throw new Error("One-off entries require an entry date");
  }
}

export async function createIncomeEntry(data: {
  job_id: string;
  income_type: IncomeType;
  description?: string | null;
  amount: number;
  currency: string;
  period?: string | null;
  entry_date?: string | null;
  expected_date?: string | null;
  sort_order: number;
}) {
  assertTypeDates(data.income_type, data.period, data.entry_date);
  const supabase = await requireAdmin();
  const { error } = await supabase.from("income_entries").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function updateIncomeEntry(
  id: string,
  data: {
    job_id?: string;
    income_type?: IncomeType;
    description?: string | null;
    amount?: number;
    currency?: string;
    period?: string | null;
    entry_date?: string | null;
    expected_date?: string | null;
    sort_order?: number;
  }
) {
  const supabase = await requireAdmin();
  const patch: typeof data = { ...data };

  // A partial payload can omit period/entry_date. Resolve against the stored
  // row so we validate the EFFECTIVE state, and clear the previous type's
  // now-irrelevant field — the CHECK constraint only requires the new type's
  // field to be present, it does not force the old one to null.
  if (data.income_type) {
    const { data: cur, error: selectError } = await supabase
      .from("income_entries")
      .select("income_type, period, entry_date")
      .eq("id", id)
      .single();
    if (selectError) throw new Error(selectError.message);

    const effPeriod = data.period !== undefined ? data.period : cur.period;
    const effEntryDate =
      data.entry_date !== undefined ? data.entry_date : cur.entry_date;
    assertTypeDates(data.income_type, effPeriod, effEntryDate);

    if (data.income_type !== cur.income_type) {
      if (data.income_type === "one_off") patch.period = null;
      if (data.income_type === "recurring") patch.entry_date = null;
    }
  }

  const { error } = await supabase
    .from("income_entries")
    .update(patch)
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

export async function toggleCollected(id: string, is_paid: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("income_entries")
    .update({
      is_paid,
      paid_date: is_paid ? new Date().toISOString().slice(0, 10) : null,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}
