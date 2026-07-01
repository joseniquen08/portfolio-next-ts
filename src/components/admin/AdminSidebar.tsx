"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineHome, HiMenu, HiX } from "react-icons/hi";
import { adminModules } from "@/lib/admin/modules";
import { cn } from "@/utils/shadcn";
import { LogoutButton } from "./LogoutButton";

// ─── Shared nav content ───────────────────────────────────────────────────────

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Header */}
      <div className="px-4 py-5 border-b border-zinc-800 shrink-0">
        <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">Panel</p>
        <p className="text-sm font-semibold text-white mt-0.5">José Ñiquen</p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <Link
          href="/admin"
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
            pathname === "/admin"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
          )}
        >
          <HiOutlineHome className="w-4 h-4 shrink-0" />
          Inicio
        </Link>

        {adminModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div key={mod.slug} className="mt-3">
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                {mod.title}
              </p>
              {mod.submodules.map((sub) => (
                <Link
                  key={sub.slug}
                  href={sub.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname.startsWith(sub.href)
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {sub.title}
                </Link>
              ))}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-zinc-800 shrink-0">
        <LogoutButton />
      </div>
    </>
  );
}

// ─── Sidebar (exported) ───────────────────────────────────────────────────────

export function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on navigation
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Desktop sidebar (lg+) ─────────────────────────────────────── */}
      <aside className="hidden lg:flex w-56 shrink-0 border-r border-zinc-800 bg-zinc-950 flex-col h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* ── Mobile topbar (< lg) ──────────────────────────────────────── */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950">
        <div>
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase leading-none">Panel</p>
          <p className="text-sm font-semibold text-white leading-tight">José Ñiquen</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="w-9 h-9 flex items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <HiMenu className="w-5 h-5" />
        </button>
      </header>

      {/* ── Mobile drawer + overlay ───────────────────────────────────── */}
      {/* Overlay */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer panel */}
      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800",
          "flex flex-col transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button */}
        <div className="flex items-center justify-end px-3 pt-3 shrink-0">
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <HiX className="w-4 h-4" />
          </button>
        </div>

        <NavContent onNavigate={() => setOpen(false)} />
      </aside>
    </>
  );
}
