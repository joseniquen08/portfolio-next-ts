import { TechnologyType } from "@/types";
import Link from "next/link";

export function CardTech({ slug, name, icon }: TechnologyType) {
  return (
    <Link
      href={`/classes/${slug}`}
      className="group w-60 h-36 p-3 flex items-end rounded-lg bg-custom-light-text/5 dark:bg-custom-dark-text/5 relative overflow-hidden cursor-pointer"
    >
      <p className="font-semibold dark:text-custom-dark-text">{name}</p>
      <div className="absolute -z-10 -top-4 right-0 group-hover:scale-125 transition-all ease-out duration-500">
        {icon}
      </div>
    </Link>
  );
}
