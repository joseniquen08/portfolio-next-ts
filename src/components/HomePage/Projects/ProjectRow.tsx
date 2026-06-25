import { Badge } from "@/components/ui/badge";
import { ProjectType } from "@/types";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { HiOutlineEye, HiOutlineGlobeAlt } from "react-icons/hi";
import { SiGithub } from "react-icons/si";

const tooltipTheme = {
  arrow: {
    style: {
      dark: "bg-gray-300 dark:bg-custom-dark-accent",
    },
  },
  style: {
    dark: "bg-gray-300 text-custom-light-text dark:bg-custom-dark-accent dark:text-custom-dark-text",
  },
};

export const ProjectRow = ({
  badges,
  period,
  slug,
  title,
  description,
  icons,
  web,
  github,
}: ProjectType) => {
  return (
    <li className="relative pl-5">
      {/* Punto del timeline */}
      <span className="absolute -left-[5px] top-[6px] w-2.5 h-2.5 rounded-full border-2 border-custom-light-accent dark:border-custom-dark-accent-text bg-custom-light-accent dark:bg-custom-dark-accent-text" />

      {/* Periodo + rol */}
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="font-mono text-xs text-custom-light-text/50 dark:text-custom-dark-text/50 tracking-wider">
          {period}
        </span>
        {badges.map(({ name }, i) => (
          <Badge key={i} variant="role" className="rounded-full text-[10px] py-0">
            {name}
          </Badge>
        ))}
      </div>

      {/* Título */}
      <p className="font-display font-semibold text-sm text-custom-light-accent dark:text-custom-dark-text leading-snug mb-1">
        {title}
      </p>

      {/* Descripción */}
      <p className="text-xs text-custom-light-text/60 dark:text-custom-dark-text/60 leading-relaxed mb-3">
        {description.es}
      </p>

      {/* Iconos de tecnología + acciones */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Tech icons — monocromáticos */}
        <div className="flex flex-wrap gap-2 [&_svg]:w-[20px] [&_svg]:h-[20px] text-custom-light-text/70 dark:text-custom-dark-text/70 [&_svg]:fill-current [&_path]:fill-current">
          {icons.map(({ name, icon }, i) => (
            <Tooltip key={i} content={name} theme={tooltipTheme} placement="bottom">
              <span className="opacity-70 hover:opacity-100 transition-opacity">
                {icon}
              </span>
            </Tooltip>
          ))}
        </div>

        {/* Action buttons — planos */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <a
            href={web}
            target="_blank"
            rel="noreferrer"
            className="p-1 text-custom-light-text/50 dark:text-custom-dark-text/50 hover:text-custom-light-accent dark:hover:text-custom-dark-accent-text transition-colors duration-200"
          >
            <HiOutlineGlobeAlt className="w-4 h-4" />
          </a>
          {github !== "" && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="p-1 text-custom-light-text/50 dark:text-custom-dark-text/50 hover:text-custom-light-accent dark:hover:text-custom-dark-accent-text transition-colors duration-200"
            >
              <SiGithub className="w-4 h-4" />
            </a>
          )}
          <Link
            href={`/project/${slug}`}
            className="p-1 text-custom-light-text/50 dark:text-custom-dark-text/50 hover:text-custom-light-accent dark:hover:text-custom-dark-accent-text transition-colors duration-200"
          >
            <HiOutlineEye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </li>
  );
};
