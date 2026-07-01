import type { IconType } from "react-icons";
import { HiOutlineCreditCard, HiOutlineBriefcase } from "react-icons/hi";

export interface AdminSubmodule {
  slug: string;
  title: string;
  href: string;
}

export interface AdminModule {
  slug: string;
  title: string;
  icon: IconType;
  href: string;
  submodules: AdminSubmodule[];
}

/**
 * Central registry of admin panel modules.
 * Adding a new module = add an entry here + create the route folder.
 */
export const adminModules: AdminModule[] = [
  {
    slug: "financiero",
    title: "Financiero",
    icon: HiOutlineCreditCard,
    href: "/admin/financiero",
    submodules: [
      {
        slug: "tarjetas",
        title: "Tarjetas de crédito",
        href: "/admin/financiero/tarjetas",
      },
    ],
  },
  {
    slug: "laboral",
    title: "Laboral",
    icon: HiOutlineBriefcase,
    href: "/admin/laboral",
    submodules: [
      {
        slug: "tareas",
        title: "Tareas",
        href: "/admin/laboral/tareas",
      },
    ],
  },
];
