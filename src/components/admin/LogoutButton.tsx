"use client";

import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="w-full justify-start gap-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900"
    >
      <HiOutlineLogout className="w-4 h-4 shrink-0" />
      Cerrar sesión
    </Button>
  );
}
