"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/server";

const PATH = "/admin/financiero/tarjetas";

// ─── Credit Cards ─────────────────────────────────────────────────────────────

export async function createCard(data: {
  name: string;
  color?: string | null;
  default_payment_day: number;
  default_cycle_start_day: number;
  default_cycle_end_day: number;
  currencies: string[];
  sort_order: number;
}) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("credit_cards").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function updateCard(
  id: string,
  data: {
    name?: string;
    color?: string;
    default_payment_day?: number;
    default_cycle_start_day?: number;
    default_cycle_end_day?: number;
    currencies?: string[];
    sort_order?: number;
  }
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("credit_cards")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function reorderCards(orderedIds: string[]) {
  const supabase = await requireAdmin();
  const { error } = await supabase.rpc("reorder_credit_cards", {
    ordered_ids: orderedIds,
  });
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function deleteCard(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("credit_cards").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

// ─── Statements ───────────────────────────────────────────────────────────────

export async function upsertStatement(data: {
  card_id:     string;
  period:      string; // "YYYY-MM-01"
  amounts:     Record<string, number>;
  due_date:    string | null;
  cycle_start: string | null;
  cycle_end:   string | null;
  is_estimated: boolean;
  is_paid:      boolean;
}) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("card_statements")
    .upsert(data, { onConflict: "card_id,period" });
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function togglePaid(
  card_id: string,
  period: string,
  is_paid: boolean
) {
  const supabase = await requireAdmin();
  // Marcar como pagado también limpia el flag estimado
  const update: { is_paid: boolean; is_estimated?: boolean } = { is_paid };
  if (is_paid) update.is_estimated = false;
  const { error } = await supabase
    .from("card_statements")
    .update(update)
    .eq("card_id", card_id)
    .eq("period", period);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function toggleEstimated(
  card_id: string,
  period: string,
  is_estimated: boolean
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("card_statements")
    .update({ is_estimated })
    .eq("card_id", card_id)
    .eq("period", period);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function deleteStatement(card_id: string, period: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("card_statements")
    .delete()
    .eq("card_id", card_id)
    .eq("period", period);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

// ─── Period adjustments ───────────────────────────────────────────────────────

export async function upsertAdjustment(data: {
  id?: string;
  period: string;
  amount: number;
  note: string | null;
}) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("period_adjustments")
    .upsert(data, { onConflict: "id" });
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function deleteAdjustment(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("period_adjustments")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}
