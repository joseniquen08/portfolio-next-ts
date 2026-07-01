import { redirect } from "next/navigation";

// Redirect /admin/laboral → first submodule
export default function LaboralPage() {
  redirect("/admin/laboral/tareas");
}
