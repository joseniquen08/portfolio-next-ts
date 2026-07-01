import Link from "next/link";
import { adminModules } from "@/lib/admin/modules";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-1">Panel</h1>
      <p className="text-sm text-zinc-500 mb-8">Bienvenido, José.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminModules.map((mod) => {
          const Icon = mod.icon;
          return (
          <div
            key={mod.slug}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <Icon className="w-4 h-4 text-zinc-400 shrink-0" />
              <h2 className="text-sm font-semibold text-white">{mod.title}</h2>
            </div>
            <ul className="space-y-1">
              {mod.submodules.map((sub) => (
                <li key={sub.slug}>
                  <Link
                    href={sub.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    → {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          );
        })}
      </div>
    </div>
  );
}
