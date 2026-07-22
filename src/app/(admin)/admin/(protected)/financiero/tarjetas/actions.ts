"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/server";
import { computeSettlement } from "@/components/admin/tarjetas/status";

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
  const { data: card, error } = await supabase
    .from("credit_cards")
    .insert(data)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
  return card;
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
  insurance_amount: number;
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

// ─── Statement Advances ─────────────────────────────────────────────────────

export async function createAdvance(data: {
  statement_id: string;
  amount: number;
  currency: string;
  advance_date: string;
  note?: string | null;
}) {
  const supabase = await requireAdmin();
  const { error: insertError } = await supabase
    .from("statement_advances")
    .insert(data);
  if (insertError) throw new Error(insertError.message);

  // Re-read the statement + all its advances to evaluate auto-settlement.
  const { data: statement, error: statementError } = await supabase
    .from("card_statements")
    .select("id, amounts")
    .eq("id", data.statement_id)
    .single();
  if (statementError) throw new Error(statementError.message);

  const { data: advances, error: advancesError } = await supabase
    .from("statement_advances")
    .select("amount, currency")
    .eq("statement_id", data.statement_id);
  if (advancesError) throw new Error(advancesError.message);

  const settlement = computeSettlement(statement.amounts, advances ?? []);
  if (settlement.fullyCovered) {
    // Auto-flip only — one-directional, never un-flip on delete.
    const { error: updateError } = await supabase
      .from("card_statements")
      .update({ is_paid: true, is_estimated: false })
      .eq("id", data.statement_id);
    if (updateError) throw new Error(updateError.message);
  }

  revalidatePath(PATH);
}

export async function deleteAdvance(id: string) {
  const supabase = await requireAdmin();

  const { data: advance, error: advanceError } = await supabase
    .from("statement_advances")
    .select("statement_id")
    .eq("id", id)
    .single();
  if (advanceError) throw new Error(advanceError.message);

  const { data: statement, error: statementError } = await supabase
    .from("card_statements")
    .select("id, amounts, is_paid")
    .eq("id", advance.statement_id)
    .single();
  if (statementError) throw new Error(statementError.message);

  const { data: advancesBefore, error: advancesError } = await supabase
    .from("statement_advances")
    .select("id, amount, currency")
    .eq("statement_id", advance.statement_id);
  if (advancesError) throw new Error(advancesError.message);

  const { error: deleteError } = await supabase
    .from("statement_advances")
    .delete()
    .eq("id", id);
  if (deleteError) throw new Error(deleteError.message);

  // If this delete broke the coverage that was backing "pagado", un-flip it.
  // A "pagado" that was never actually backed by full advance coverage
  // (a genuine manual override) is left untouched.
  const advancesAfter = advancesBefore.filter((a) => a.id !== id);
  const wasCovered = computeSettlement(statement.amounts, advancesBefore).fullyCovered;
  const stillCovered = computeSettlement(statement.amounts, advancesAfter).fullyCovered;
  if (statement.is_paid && wasCovered && !stillCovered) {
    const { error: updateError } = await supabase
      .from("card_statements")
      .update({ is_paid: false })
      .eq("id", advance.statement_id);
    if (updateError) throw new Error(updateError.message);
  }

  revalidatePath(PATH);
}

// ─── Credit Limit Changes ───────────────────────────────────────────────────

export async function createLimitChange(data: {
  card_id: string;
  amount: number;
  currency: string;
  /** null = "Inicial" — only accepted when the card has no history yet. */
  start_date: string | null;
  note?: string | null;
}) {
  const supabase = await requireAdmin();
  const { error } = await supabase.rpc("add_credit_limit_change", {
    p_card_id: data.card_id,
    p_amount: data.amount,
    p_currency: data.currency,
    // The generated RPC arg types don't know start_date/note are nullable at
    // the DB level (Postgres function params carry no NOT NULL signal to codegen).
    p_start_date: data.start_date as string,
    p_note: (data.note ?? null) as string,
  });
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}

export async function deleteLimitChange(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.rpc("delete_credit_limit_change", { p_id: id });
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
}
