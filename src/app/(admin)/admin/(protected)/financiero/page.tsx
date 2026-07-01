import { redirect } from "next/navigation";

// Redirect /admin/financiero → first submodule
export default function FinancieroPage() {
  redirect("/admin/financiero/tarjetas");
}
