"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/server";
import type { Json } from "@/types/database.types";

/**
 * Upsert a key/value preference for the authenticated admin user.
 * The `value` must be JSON-serializable.
 */
export async function savePreference(key: string, value: Json, path?: string): Promise<void> {
  const supabase = await requireAdmin();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from("admin_preferences").upsert(
    { user_id: user.id, key, value, updated_at: new Date().toISOString() },
    { onConflict: "user_id,key" }
  );

  if (error) {
    console.error("[savePreference] upsert failed:", error.message, error.details);
    return;
  }

  if (path) revalidatePath(path);
}
