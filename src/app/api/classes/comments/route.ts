import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("class_comments")
    .select(`id, user_name, user_url_profile, rating, comment`);

  return Response.json({ data });
}
